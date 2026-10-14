import { NextResponse } from "next/server";

import { newsletterAktiv, tokenPruefen } from "@/lib/newsletter";
import { kontaktSperren, type SchrittErgebnis } from "@/lib/newsletter-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function weiter(req: Request, s: string, erg: SchrittErgebnis | "technisch") {
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
    console.error(`[newsletter] ABMELDUNG FEHLGESCHLAGEN (Kontakt ${daten.c}), bitte manuell sperren:`, err instanceof Error ? err.message : err);
    // Opt-out muss wirken (Art. 21 Abs. 3 DSGVO): Fehler sichtbar machen und den Ausweg per Mail nennen.
    return weiter(req, daten.s, "technisch");
  }
}
