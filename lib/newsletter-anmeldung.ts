// Newsletter (VORBEREITUNG): Anmeldung aus dem Kontaktformular. Speichert die (noch unbestaetigte)
// Einwilligung am CRM-Kontakt und verschickt die Double-Opt-in-Mail. Wirkt nur bei aktivem Newsletter.

import { sendDoiMail } from "@/lib/mailer";
import { newsletterAktiv, siteBasis, tokenErzeugen } from "@/lib/newsletter";
import { kontaktAnmelden } from "@/lib/newsletter-crm";
import { NEWSLETTER_CHECKBOX } from "@/lib/newsletter-texte";
import type { LeadPayload } from "@/lib/types";

export async function starteNewsletterAnmeldung(payload: LeadPayload, accountId?: string): Promise<void> {
  if (!newsletterAktiv()) {
    console.warn("[newsletter] Checkbox gesetzt, Newsletter ist aber nicht aktiv. Einwilligung NICHT gespeichert.");
    return;
  }
  const segment = payload.art === "gewerbe" ? "gewerbe" : "privat";
  const vorname = payload.art === "gewerbe" ? payload.ansprechpartnerVorname : payload.vorname;
  const nachname = payload.art === "gewerbe" ? payload.ansprechpartnerNachname : payload.nachname;
  const jetzt = new Date();

  const ergebnis = await kontaktAnmelden({
    segment,
    vorname,
    nachname,
    email: payload.email,
    accountId,
    textVersion: NEWSLETTER_CHECKBOX[segment].version,
    zeitpunkt: jetzt,
  });
  if (!ergebnis) {
    console.error("[newsletter] CRM nicht konfiguriert. Anmeldung nicht gespeichert, keine Bestaetigungsmail.");
    return;
  }
  if (ergebnis.bereitsBestaetigt) return;

  const token = tokenErzeugen({ k: "doi", c: ergebnis.id, e: payload.email.trim().toLowerCase(), s: segment, t: jetzt.getTime() });
  const basis = siteBasis();
  const gesendet = await sendDoiMail(payload.email.trim(), segment, {
    vorname,
    nachname,
    datum: jetzt.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin" }),
    bestaetigungslink: `${basis}/newsletter/bestaetigen?token=${encodeURIComponent(token)}`,
    datenschutzlink: `${basis}/datenschutz#newsletter`,
  });
  if (!gesendet) console.error("[newsletter] Double-Opt-in-Mail nicht versendet (SMTP fehlt), bitte manuell nachsenden:", payload.email);
}
