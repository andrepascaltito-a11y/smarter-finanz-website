import { NextResponse } from "next/server";

import { CONSENT_TEXT, CONSENT_VERSION, ERSTINFO_VERSION } from "@/lib/consent";
import { HINWEIS_MAX, bereinigeErreichbarkeit } from "@/lib/erreichbarkeit";
import { forwardToEspoCrm } from "@/lib/espocrm";
import { formatErreichbarkeit } from "@/lib/erreichbarkeit";
import { sendErstinformation, sendLeadBenachrichtigung } from "@/lib/mailer";
import { formularErgebnis, starteNewsletterAnmeldung, type NewsletterErgebnis } from "@/lib/newsletter-anmeldung";
import { checkRateLimit } from "@/lib/ratelimit";
import { isValidEmail, isValidGermanPhone, isValidName } from "@/lib/validation";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload, Thema } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000;

// Identisch zum Thema-Union-Typ in lib/types.ts. Dort gibt es keine Laufzeit-
// Liste dieser Werte, daher hier lokal dupliziert fuer die Server-Validierung.
const ERLAUBTE_THEMEN: Thema[] = [
  "Steueroptimierung",
  "Versicherungsvergleich",
  "Altersvorsorge und Investment",
  "Finanzierung und Umschuldung",
  "Sonstiges",
];

function tooLong(v: unknown, max: number): boolean {
  return typeof v === "string" && v.length > max;
}

function validatePrivatperson(body: Partial<PrivatpersonPayload>): string[] {
  const errors: string[] = [];
  if (!body.vorname || !isValidName(body.vorname)) errors.push("vorname ungueltig");
  if (!body.nachname || !isValidName(body.nachname)) errors.push("nachname ungueltig");
  if (tooLong(body.vorname, 80) || tooLong(body.nachname, 80)) errors.push("name zu lang");
  if (!body.thema || !ERLAUBTE_THEMEN.includes(body.thema)) errors.push("thema ungueltig");
  return errors;
}

function validateGewerbe(body: Partial<GewerbePayload>): string[] {
  const errors: string[] = [];
  if (!body.firmenname || !isValidName(body.firmenname)) errors.push("firmenname ungueltig");
  if (!body.ansprechpartnerVorname || !isValidName(body.ansprechpartnerVorname))
    errors.push("ansprechpartnerVorname ungueltig");
  if (!body.ansprechpartnerNachname || !isValidName(body.ansprechpartnerNachname))
    errors.push("ansprechpartnerNachname ungueltig");
  if (tooLong(body.firmenname, 150)) errors.push("firmenname zu lang");
  if (tooLong(body.ansprechpartnerVorname, 80) || tooLong(body.ansprechpartnerNachname, 80)) errors.push("name zu lang");
  if (tooLong(body.branche, 150)) errors.push("branche zu lang");
  if (body.erreichbarkeit && tooLong(body.erreichbarkeit.hinweis, HINWEIS_MAX * 2)) errors.push("hinweis zu lang");
  return errors;
}

function validate(body: Partial<LeadPayload>): string[] {
  const errors: string[] = [];
  if (body.art !== "privatperson" && body.art !== "gewerbe") errors.push("art ungueltig");
  if (!body.email || !isValidEmail(body.email)) errors.push("email ungueltig");
  if (!body.telefon || !isValidGermanPhone(body.telefon)) errors.push("telefon ungueltig");
  if (body.consent !== true) errors.push("consent fehlt (muss true sein)");
  if (body.erstinfoZustimmung !== true) errors.push("erstinfoZustimmung fehlt (muss true sein)");
  if (tooLong(body.email, 254)) errors.push("email zu lang");
  if (tooLong(body.telefon, 32)) errors.push("telefon zu lang");

  if (body.art === "privatperson") errors.push(...validatePrivatperson(body));
  if (body.art === "gewerbe") errors.push(...validateGewerbe(body));

  return errors;
}

// Trimmt alle vom Nutzer eingegebenen String-Felder, bevor sie an EspoCRM
// weitergeleitet werden. isValidEmail/isValidName pruefen zwar bereits den
// getrimmten Wert, weitergeleitet wurde bisher aber der ungetrimmte Rohwert
// (fuehrende/folgende Leerzeichen koennen bei EspoCRM einen stillen
// Validierungsfehler ausloesen bzw. bei firmenname einen Firmensuche-Treffer
// verhindern und so eine Dublette erzeugen, siehe lib/espocrm.ts).
function trimLeadPayload(payload: LeadPayload): LeadPayload {
  const email = payload.email.trim();
  const telefon = payload.telefon.trim();

  if (payload.art === "privatperson") {
    return {
      ...payload,
      email,
      telefon,
      vorname: payload.vorname.trim(),
      nachname: payload.nachname.trim(),
    };
  }

  return {
    ...payload,
    email,
    telefon,
    firmenname: payload.firmenname.trim(),
    ansprechpartnerVorname: payload.ansprechpartnerVorname.trim(),
    ansprechpartnerNachname: payload.ansprechpartnerNachname.trim(),
    branche: payload.branche.trim(),
    erreichbarkeit: bereinigeErreichbarkeit(payload.erreichbarkeit),
  };
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(req: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = (await req.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungueltiges JSON im Request-Body." },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte versuche es in einer Minute erneut." },
      { status: 429 },
    );
  }

  const honeypotFilled = typeof body.hp === "string" && body.hp.trim() !== "";
  const tooFast =
    typeof body.formStartedAt === "number" &&
    body.formStartedAt > 0 &&
    Date.now() - body.formStartedAt < MIN_FILL_MS;
  if (honeypotFilled || tooFast) {
    console.warn(
      `[lead] Verdaechtige Einsendung verworfen (${honeypotFilled ? "honeypot" : "timing"}).`,
    );
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Bitte ueberpruefe deine Eingaben.", errors },
      { status: 400 },
    );
  }

  const payload = trimLeadPayload({ ...body } as LeadPayload);
  // Serverseitig kanonisiert: Client-Werte fuer Consent-Text/Version werden
  // ignoriert, Zeitpunkt ist der Empfang der Anfrage (Formular ist einstufig,
  // Checkbox-Klick und Absenden liegen praktisch im selben Moment).
  payload.consentText = CONSENT_TEXT;
  payload.consentTextVersion = CONSENT_VERSION;
  payload.consentTimestamp = new Date().toISOString();
  // Gesendete Variante mitschreiben: Inhalt gleich, Gewerbe in Sie-Fassung (Mia, 14.10.2026).
  payload.erstinfoVersion = payload.art === "gewerbe" ? `${ERSTINFO_VERSION}-sie` : ERSTINFO_VERSION;
  payload.erstinfoTimestamp = payload.consentTimestamp;

  let crmErgebnis: { accountId?: string } = {};
  try {
    crmErgebnis = await forwardToEspoCrm(payload);
  } catch (err) {
    console.error(
      "[lead] EspoCRM-Weiterleitung fehlgeschlagen:",
      err instanceof Error ? err.message : err,
    );
  }

  // Erstinformation (Begruessungsmail mit PDF). Scheitert der Versand, steht das gut sichtbar in der Benachrichtigung
  // an Andre, damit niemand die Bestaetigungsseite mit dem Versprechen sieht, aber kein Dokument bekommt.
  let erstinfoVersendet = false;
  try {
    const mitAngaben = payload.art === "gewerbe" && formatErreichbarkeit(payload.erreichbarkeit) !== "";
    erstinfoVersendet = await sendErstinformation(payload.email, payload.art, mitAngaben);
    if (!erstinfoVersendet) console.error("[lead] Erstinformation nicht versendet (SMTP fehlt), bitte manuell nachsenden (Anfrage im CRM).");
  } catch (err) {
    console.error(
      "[lead] Erstinformations-Mail fehlgeschlagen:",
      err instanceof Error ? err.message : err,
    );
  }

  // Optional: Newsletter-Einwilligung (eigene Checkbox). Fehler hier duerfen die Anfrage nicht gefaehrden.
  // Das Ergebnis geht ans Formular zurueck, damit der Erfolgstext nur verspricht, was wirklich passiert ist.
  let newsletterErgebnis: NewsletterErgebnis | undefined;
  if (payload.newsletter === true) {
    try {
      newsletterErgebnis = await starteNewsletterAnmeldung(payload, crmErgebnis.accountId);
    } catch (err) {
      console.error("[lead] Newsletter-Anmeldung fehlgeschlagen:", err instanceof Error ? err.message : err);
      newsletterErgebnis = "fehler";
    }
  }

  // Jede Anfrage erscheint zusaetzlich als E-Mail bei Andre (unabhaengig davon, ob das CRM erreichbar war).
  try {
    await sendLeadBenachrichtigung(payload, newsletterErgebnis, erstinfoVersendet);
  } catch (err) {
    console.error("[lead] Benachrichtigung fehlgeschlagen:", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ ok: true, ...(newsletterErgebnis ? { newsletter: formularErgebnis(newsletterErgebnis) } : {}) });
}
