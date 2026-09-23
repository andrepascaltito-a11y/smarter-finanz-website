import { NextResponse } from "next/server";

import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/consent";
import { forwardToEspoCrm } from "@/lib/espocrm";
import { checkRateLimit } from "@/lib/ratelimit";
import { isValidEmail, isValidGermanPhone, isValidName } from "@/lib/validation";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000;

function tooLong(v: unknown, max: number): boolean {
  return typeof v === "string" && v.length > max;
}

function validatePrivatperson(body: Partial<PrivatpersonPayload>): string[] {
  const errors: string[] = [];
  if (!body.vorname || !isValidName(body.vorname)) errors.push("vorname ungueltig");
  if (!body.nachname || !isValidName(body.nachname)) errors.push("nachname ungueltig");
  if (tooLong(body.vorname, 80) || tooLong(body.nachname, 80)) errors.push("name zu lang");
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

  const payload = { ...body } as LeadPayload;
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

  return NextResponse.json({ ok: true });
}
