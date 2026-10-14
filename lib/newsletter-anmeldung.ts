// Newsletter (VORBEREITUNG): Anmeldung aus dem Kontaktformular. Speichert die (noch unbestaetigte)
// Einwilligung als OFFENE Anfrage am CRM-Kontakt und verschickt die Double-Opt-in-Mail. Wirkt nur bei aktivem
// Newsletter. Rueckgabe sagt dem Formular, was wirklich passiert ist (Ritas E10: Erfolgstext muss stimmen).

import { sendDoiMail } from "@/lib/mailer";
import { adressHash, newsletterAktiv, siteBasis, tokenErzeugen } from "@/lib/newsletter";
import { istSammeladresse } from "@/lib/newsletter-adresse";
import { doiProtokollieren, kontaktAnmelden } from "@/lib/newsletter-crm";
import { NEWSLETTER_CHECKBOX } from "@/lib/newsletter-texte";
import type { LeadPayload } from "@/lib/types";

export type NewsletterErgebnis =
  | "mailGesendet" // Bestaetigungsmail ist raus
  | "keineMail" // Anmeldung nicht wirksam (aus, Sammeladresse, CRM oder SMTP fehlt), nichts versprechen
  | "bereitsBestaetigt" // Adresse ist schon eingetragen
  | "kuerzlichGesendet"; // Mail ging vor weniger als 24 Stunden schon raus

export async function starteNewsletterAnmeldung(payload: LeadPayload, accountId?: string): Promise<NewsletterErgebnis> {
  if (!newsletterAktiv()) {
    console.warn("[newsletter] Checkbox gesetzt, Newsletter ist aber nicht aktiv. Einwilligung NICHT gespeichert.");
    return "keineMail";
  }
  if (istSammeladresse(payload.email)) {
    console.warn("[newsletter] Sammeladresse, Newsletter-Anmeldung ignoriert (Anfrage selbst laeuft normal).");
    return "keineMail";
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
    return "keineMail";
  }
  if (ergebnis.status === "bereitsBestaetigt") return "bereitsBestaetigt";
  if (ergebnis.status === "kuerzlichGesendet") return "kuerzlichGesendet";

  // Der Link zeigt auf genau diese offene Anfrage (Zeitpunkt) und nennt die Adresse nur als Pruefsumme.
  const token = tokenErzeugen({
    k: "doi",
    c: ergebnis.id,
    h: adressHash(payload.email),
    s: segment,
    t: ergebnis.anfrageZeit.getTime(),
  });
  const basis = siteBasis();
  const gesendet = await sendDoiMail(payload.email.trim(), segment, {
    vorname,
    nachname,
    datum: jetzt.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin" }),
    bestaetigungslink: `${basis}/newsletter/bestaetigen?token=${encodeURIComponent(token)}`,
    datenschutzlink: `${basis}/datenschutz#newsletter`,
  });
  await doiProtokollieren(ergebnis.id, gesendet).catch(() => console.warn("[newsletter] DOI-Protokoll nicht gespeichert."));
  if (!gesendet) {
    console.error(`[newsletter] Double-Opt-in-Mail nicht versendet (SMTP fehlt), Kontakt ${ergebnis.id} manuell nachfassen.`);
    return "keineMail";
  }
  return "mailGesendet";
}
