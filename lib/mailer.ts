// Benachrichtigungs-Mail bei einer Gewerbe-Anfrage, per Gmail-SMTP mit dem
// bestehenden Konto. Aktiv sobald SMTP_USER und SMTP_APP_PASSWORD gesetzt
// sind, sonst No-op (gleiches Muster wie forwardToEspoCrm).
//
// Absender: MAIL_FROM (optional). smarterfinanz.de ist im Workspace nur Alias-Domain, die Anmeldung
// per App-Passwort laeuft dann ueber das Hauptkonto (SMTP_USER), der sichtbare Absender ist die
// Alias-Adresse (MAIL_FROM, z. B. a.tito@smarterfinanz.de). Ohne MAIL_FROM gilt SMTP_USER.

import nodemailer from "nodemailer";

import { formatErreichbarkeit } from "@/lib/erreichbarkeit";
import { ERSTINFO_MAIL_BETREFF, ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE } from "@/lib/erstinformation";
import type { GewerbePayload } from "@/lib/types";

export async function sendGewerbeBenachrichtigung(payload: GewerbePayload): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  const to = process.env.NOTIFY_EMAIL_TO || user;

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

  const text =
    `Neue Gewerbe-Anfrage ueber die Website.\n\n` +
    `Firma: ${payload.firmenname}\n` +
    `Ansprechpartner: ${payload.ansprechpartnerVorname} ${payload.ansprechpartnerNachname}\n` +
    `Telefon: ${payload.telefon}\n` +
    `E-Mail: ${payload.email}\n` +
    (payload.branche ? `Branche: ${payload.branche}\n` : "") +
    (formatErreichbarkeit(payload.erreichbarkeit)
      ? `Erreichbarkeit (Terminwunsch): ${formatErreichbarkeit(payload.erreichbarkeit)}\n`
      : "");

  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    subject: `Neue Gewerbe-Anfrage: ${payload.firmenname}`,
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
