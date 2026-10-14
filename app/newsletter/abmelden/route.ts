import { NextResponse } from "next/server";

import { newsletterAktiv, tokenPruefen } from "@/lib/newsletter";
import { kontaktSperren, type SchrittErgebnis } from "@/lib/newsletter-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function weiter(req: Request, s: string, erg: SchrittErgebnis) {
  return NextResponse.redirect(new URL(`/newsletter/abgemeldet?s=${s}&erg=${erg}`, req.url), 303);
}

// Abmeldung mit einem Klick, ohne Anmeldung und ohne Rueckfrage (Link in jeder Ausgabe).
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const daten = newsletterAktiv() ? tokenPruefen(token, "abmelden") : null;
  if (!daten) return weiter(req, "x", "ungueltig");
  try {
    return weiter(req, daten.s, await kontaktSperren(daten));
  } catch (err) {
    console.error("[newsletter] Abmeldung fehlgeschlagen:", err instanceof Error ? err.message : err);
    return weiter(req, daten.s, "ungueltig");
  }
}
