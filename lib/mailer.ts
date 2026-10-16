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
import { baueBegruessungsMail } from "@/lib/begruessung-mail";
import { BEGRUESSUNG_TEXTE } from "@/lib/begruessung-texte";
import { ERSTINFO_PDF_BASE64, ERSTINFO_PDF_DATEINAME } from "@/lib/erstinformation-pdf.generated";
import type { LeadPayload } from "@/lib/types";

// Standard-Empfaenger fuer neue Anfragen: Andres SmarterFinanz-Adresse (ueberschreibbar per NOTIFY_EMAIL_TO).
const STANDARD_EMPFAENGER = "a.tito@smarterfinanz.de";

// Was mit dem Newsletter-Wunsch tatsaechlich passiert ist (Rita N14): Andre soll nicht annehmen, eine
// Einwilligung liege vor, wenn die Anmeldung ignoriert wurde oder fehlschlug.
const NEWSLETTER_ZEILEN: Record<string, string> = {
  mailGesendet: "Newsletter-Wunsch: ja, Bestaetigungsmail (Double-Opt-in) wurde versendet. Einwilligung gilt erst nach dem Klick der Person.\n",
  bereitsBestaetigt: "Newsletter-Wunsch: angekreuzt, Adresse ist bereits bestaetigt eingetragen, keine neue Mail.\n",
  kuerzlichGesendet: "Newsletter-Wunsch: angekreuzt, Bestaetigungsmail ging vor Kurzem schon raus (oder Adresse ist gesperrt), keine zweite Mail.\n",
  sammeladresse: "Newsletter-Wunsch: angekreuzt, aber Sammeladresse (info@ o. Ae.), Anmeldung bewusst ignoriert.\n",
  fehler: "Newsletter-Wunsch: angekreuzt, aber die Anmeldung ist FEHLGESCHLAGEN (CRM oder Mailversand). Bitte nachfassen.\n",
  nichtAktiv: "Newsletter-Wunsch: angekreuzt, Newsletter ist nicht aktiv, KEINE Einwilligung gespeichert.\n",
};

const ERSTINFO_FEHLT_ZEILE =
  "ACHTUNG: Die Erstinformation (Begruessungsmail mit PDF) wurde an diese Person NICHT versendet. Bitte von Hand nachsenden, sonst fehlt ihr ein gesetzlich vorgeschriebenes Dokument.\n\n";

function anfrageMail(payload: LeadPayload, newsletterErgebnis?: string): { subject: string; text: string } {
  const newsletter =
    payload.newsletter === true
      ? NEWSLETTER_ZEILEN[newsletterErgebnis ?? "nichtAktiv"] ?? NEWSLETTER_ZEILEN.nichtAktiv
      : "";
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
export async function sendLeadBenachrichtigung(payload: LeadPayload, newsletterErgebnis?: string, erstinfoVersendet = true): Promise<void> {
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

  const mail = anfrageMail(payload, newsletterErgebnis);
  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    replyTo: payload.email,
    subject: erstinfoVersendet ? mail.subject : `[Erstinformation fehlt] ${mail.subject}`,
    text: erstinfoVersendet ? mail.text : ERSTINFO_FEHLT_ZEILE + mail.text,
  });
}

// Begruessungsmail an den Kunden. Die Erstinformation haengt als PDF an (§ 15 VersVermV, Textform auf dauerhaftem
// Datentraeger), im Mailkoerper stehen die Begruessung, der Hinweis auf den Anhang und die dauerhafte Fundstelle auf der
// Website (§ 16 Abs. 2 Nr. 2 VersVermV). Gibt true zurueck, wenn versendet.
export async function sendErstinformation(
  to: string,
  art: "privatperson" | "gewerbe" = "privatperson",
  mitAngaben = false,
): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[mailer] SMTP nicht konfiguriert, Erstinformations-Mail NICHT versendet.");
    return false;
  }
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const { subject, text, html } = baueBegruessungsMail(BEGRUESSUNG_TEXTE[art], art, mitAngaben);
  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    replyTo: process.env.MAIL_FROM || user,
    subject,
    text,
    html,
    attachments: [
      {
        filename: ERSTINFO_PDF_DATEINAME,
        content: Buffer.from(ERSTINFO_PDF_BASE64[art], "base64"),
        contentType: "application/pdf",
      },
    ],
  });
  return true;
}

// Double-Opt-in-Mail fuer den Newsletter (VORBEREITUNG). Neutral, ohne Werbung, getrennt von der Erstinformation.
export async function sendDoiMail(
  to: string,
  segment: Segment,
  daten: { datum: string; bestaetigungslink: string; datenschutzlink: string },
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
