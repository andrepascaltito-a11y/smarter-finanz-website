import { NextResponse } from "next/server";

import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/consent";
import { forwardToEspoCrm } from "@/lib/espocrm";
import { sendGewerbeBenachrichtigung } from "@/lib/mailer";
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
  if (tooLong(body.branche, 150)) errors.push("branche zu lang");
  return errors;
}

function validate(body: Partial<LeadPayload>): string[] {
  const errors: string[] = [];
  if (body.art !== "privatperson" && body.art !== "gewerbe") errors.push("art ungueltig");
  if (!body.email || !isValidEmail(body.email)) errors.push("email ungueltig");
  if (!body.telefon || !isValidGermanPhone(body.telefon)) errors.push("telefon ungueltig");
  if (body.consent !== true) errors.push("consent fehlt (muss true sein)");
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

  try {
    await forwardToEspoCrm(payload);
  } catch (err) {
    console.error(
      "[lead] EspoCRM-Weiterleitung fehlgeschlagen:",
      err instanceof Error ? err.message : err,
    );
  }

  if (payload.art === "gewerbe") {
    try {
      await sendGewerbeBenachrichtigung(payload);
    } catch (err) {
      console.error(
        "[lead] Gewerbe-Benachrichtigung fehlgeschlagen:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  return NextResponse.json({ ok: true });
}
