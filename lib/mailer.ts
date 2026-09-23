// Benachrichtigungs-Mail bei einer Gewerbe-Anfrage, per Gmail-SMTP mit dem
// bestehenden Konto. Aktiv sobald SMTP_USER und SMTP_APP_PASSWORD gesetzt
// sind, sonst No-op (gleiches Muster wie forwardToEspoCrm).

import nodemailer from "nodemailer";

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
    (payload.branche ? `Branche: ${payload.branche}\n` : "");

  await transporter.sendMail({
    from: user,
    to,
    subject: `Neue Gewerbe-Anfrage: ${payload.firmenname}`,
    text,
  });
}
