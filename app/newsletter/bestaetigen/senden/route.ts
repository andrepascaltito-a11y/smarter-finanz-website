import { NextResponse } from "next/server";

import { DOI_MAX_ALTER_MS, newsletterAktiv, tokenPruefen } from "@/lib/newsletter";
import { kontaktBestaetigen, type SchrittErgebnis } from "@/lib/newsletter-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function weiter(req: Request, s: string, erg: SchrittErgebnis) {
  return NextResponse.redirect(new URL(`/newsletter/bestaetigt?s=${s}&erg=${erg}`, req.url), 303);
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = typeof form?.get("token") === "string" ? (form!.get("token") as string) : "";
  const daten = newsletterAktiv() ? tokenPruefen(token, "doi", DOI_MAX_ALTER_MS) : null;
  if (!daten) return weiter(req, "x", "ungueltig");
  try {
    return weiter(req, daten.s, await kontaktBestaetigen(daten));
  } catch (err) {
    console.error("[newsletter] Bestaetigung fehlgeschlagen:", err instanceof Error ? err.message : err);
    return weiter(req, daten.s, "ungueltig");
  }
}
