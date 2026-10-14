// Newsletter (VORBEREITUNG): Anmeldung aus dem Kontaktformular. Speichert die (noch unbestaetigte)
// Einwilligung als OFFENE Anfrage am CRM-Kontakt und verschickt die Double-Opt-in-Mail. Wirkt nur bei aktivem
// Newsletter. Rueckgabe: das genaue Ergebnis fuer die interne Benachrichtigung an Andre (Rita N14). Dem
// anonymen Absender des Formulars wird davon nur das gemeldet, was keine fremden Daten verraet (Rita N5),
// siehe formularErgebnis().

import { sendDoiMail } from "@/lib/mailer";
import { adressHash, newsletterAktiv, siteBasis, tokenErzeugen } from "@/lib/newsletter";
import { istSammeladresse } from "@/lib/newsletter-adresse";
import { doiProtokollieren, kontaktAnmelden } from "@/lib/newsletter-crm";
import { NEWSLETTER_CHECKBOX } from "@/lib/newsletter-texte";
import type { LeadPayload } from "@/lib/types";

export type NewsletterErgebnis =
  | "mailGesendet" // Bestaetigungsmail ist raus
  | "nichtAktiv" // Newsletter nicht freigeschaltet oder Konfiguration unvollstaendig
  | "sammeladresse" // Anmeldung bewusst ignoriert
  | "fehler" // CRM oder Mailversand fehlgeschlagen
  | "bereitsBestaetigt" // Adresse ist schon eingetragen
  | "kuerzlichGesendet"; // Mail ging vor Kurzem schon raus, keine zweite

// Was das Formular dem Absender anzeigen darf. Gesendet, bereits bestaetigt und kuerzlich gesendet sind von aussen
// nicht zu unterscheiden, sonst liesse sich fuer jede Adresse abfragen, ob sie Abonnent ist.
export type FormularErgebnis = "pruefen" | "sammeladresse" | "keineMail";

export function formularErgebnis(e: NewsletterErgebnis): FormularErgebnis {
  if (e === "mailGesendet" || e === "bereitsBestaetigt" || e === "kuerzlichGesendet") return "pruefen";
  if (e === "sammeladresse") return "sammeladresse";
  return "keineMail";
}

export async function starteNewsletterAnmeldung(payload: LeadPayload, accountId?: string): Promise<NewsletterErgebnis> {
  if (!newsletterAktiv()) {
    console.warn("[newsletter] Checkbox gesetzt, Newsletter ist aber nicht aktiv. Einwilligung NICHT gespeichert.");
    return "nichtAktiv";
  }
  if (istSammeladresse(payload.email)) {
    console.warn("[newsletter] Sammeladresse, Newsletter-Anmeldung ignoriert (Anfrage selbst laeuft normal).");
    return "sammeladresse";
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
    return "fehler";
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
  let gesendet = false;
  try {
    gesendet = await sendDoiMail(payload.email.trim(), segment, {
      datum: jetzt.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin" }),
      bestaetigungslink: `${basis}/newsletter/bestaetigen?token=${encodeURIComponent(token)}`,
      datenschutzlink: `${basis}/datenschutz#newsletter`,
    });
  } catch (err) {
    // Versandfehler fangen (Rita N6): protokollieren, ohne Adresse loggen (Fehlertexte koennen sie enthalten).
    console.error(`[newsletter] Double-Opt-in-Mail an Kontakt ${ergebnis.id} nicht versendet (Versandfehler).`);
  }
  await doiProtokollieren(ergebnis.id, gesendet).catch(() => console.warn("[newsletter] DOI-Protokoll nicht gespeichert."));
  if (!gesendet) {
    console.error(`[newsletter] Double-Opt-in-Mail nicht versendet, Kontakt ${ergebnis.id} manuell nachfassen.`);
    return "fehler";
  }
  return "mailGesendet";
}
