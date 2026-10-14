// Benachrichtigungs-Mail bei jeder neuen Anfrage (Gewerbe und Privat), per Gmail-SMTP mit dem
// bestehenden Konto. Aktiv sobald SMTP_USER und SMTP_APP_PASSWORD gesetzt
// sind, sonst No-op (gleiches Muster wie forwardToEspoCrm).
//
// Absender: MAIL_FROM (optional). smarterfinanz.de ist im Workspace nur Alias-Domain, die Anmeldung
// per App-Passwort laeuft dann ueber das Hauptkonto (SMTP_USER), der sichtbare Absender ist die
// Alias-Adresse (MAIL_FROM, z. B. a.tito@smarterfinanz.de). Ohne MAIL_FROM gilt SMTP_USER.

import nodemailer from "nodemailer";

import { formatErreichbarkeit } from "@/lib/erreichbarkeit";
import { DOI_BETREFF, doiMailText, type Segment } from "@/lib/newsletter-texte";
import { ERSTINFO_MAIL_BETREFF, ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE } from "@/lib/erstinformation";
import type { LeadPayload } from "@/lib/types";

// Standard-Empfaenger fuer neue Anfragen: Andres SmarterFinanz-Adresse (ueberschreibbar per NOTIFY_EMAIL_TO).
const STANDARD_EMPFAENGER = "a.tito@smarterfinanz.de";

function anfrageMail(payload: LeadPayload): { subject: string; text: string } {
  const newsletter =
    payload.newsletter === true ? "Newsletter-Wunsch: ja, Bestaetigungsmail (Double-Opt-in) wurde angestossen\n" : "";
  if (payload.art === "gewerbe") {
    return {
      subject: `Neue Gewerbe-Anfrage: ${payload.firmenname}`,
      text:
        `Neue Gewerbe-Anfrage ueber die Website.\n\n` +
        `Firma: ${payload.firmenname}\n` +
        `Ansprechpartner: ${payload.ansprechpartnerVorname} ${payload.ansprechpartnerNachname}\n` +
        `Telefon: ${payload.telefon}\n` +
        `E-Mail: ${payload.email}\n` +
        (payload.branche ? `Branche: ${payload.branche}\n` : "") +
        (formatErreichbarkeit(payload.erreichbarkeit)
          ? `Erreichbarkeit (Terminwunsch): ${formatErreichbarkeit(payload.erreichbarkeit)}\n`
          : "") +
        newsletter,
    };
  }
  return {
    subject: `Neue Privat-Anfrage: ${payload.vorname} ${payload.nachname}${payload.thema ? ` (${payload.thema})` : ""}`,
    text:
      `Neue Privat-Anfrage ueber die Website.\n\n` +
      `Name: ${payload.vorname} ${payload.nachname}\n` +
      `Telefon: ${payload.telefon}\n` +
      `E-Mail: ${payload.email}\n` +
      (payload.thema ? `Thema: ${payload.thema}\n` : "") +
      newsletter,
  };
}

// Benachrichtigung ueber JEDE neue Anfrage (Gewerbe und Privat) per E-Mail, unabhaengig vom CRM.
// Antworten gehen direkt an die Adresse des Interessenten (replyTo).
export async function sendLeadBenachrichtigung(payload: LeadPayload): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  const to = process.env.NOTIFY_EMAIL_TO || STANDARD_EMPFAENGER;

  if (!user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[mailer] SMTP_USER/SMTP_APP_PASSWORD nicht gesetzt, Benachrichtigung uebersprungen.",
      );
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const { subject, text } = anfrageMail(payload);
  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
}

// Bestaetigungsmail an den Kunden mit der Erstinformation (§ 16 Abs. 2 Nr. 2 VersVermV:
// Adresse und genaue Fundstelle werden elektronisch mitgeteilt). Gibt true zurueck, wenn versendet.
export async function sendErstinformation(
  to: string,
  art: "privatperson" | "gewerbe" = "privatperson",
): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[mailer] SMTP nicht konfiguriert, Erstinformations-Mail NICHT versendet.");
    return false;
  }
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    replyTo: process.env.MAIL_FROM || user,
    subject: art === "gewerbe" ? ERSTINFO_MAIL_BETREFF.gewerbe : ERSTINFO_MAIL_BETREFF.privatperson,
    text: art === "gewerbe" ? ERSTINFO_MAIL_TEXT_SIE : ERSTINFO_MAIL_TEXT,
  });
  return true;
}

// Double-Opt-in-Mail fuer den Newsletter (VORBEREITUNG). Neutral, ohne Werbung, getrennt von der Erstinformation.
export async function sendDoiMail(
  to: string,
  segment: Segment,
  daten: { vorname: string; nachname: string; datum: string; bestaetigungslink: string; datenschutzlink: string },
): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[mailer] SMTP nicht konfiguriert, Double-Opt-in-Mail NICHT versendet.");
    return false;
  }
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const absender = process.env.MAIL_FROM || user;
  await transporter.sendMail({
    from: absender,
    to,
    replyTo: absender,
    subject: DOI_BETREFF,
    text: doiMailText(segment, daten),
  });
  return true;
}
