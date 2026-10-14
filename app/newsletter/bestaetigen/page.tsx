import type { Metadata } from "next";

import { NewsletterSeite } from "@/components/NewsletterSeite";
import { DOI_MAX_ALTER_MS, newsletterAktiv, tokenPruefen } from "@/lib/newsletter";
import { BESTAETIGEN_TEXTE, UNGUELTIG_NEUTRAL } from "@/lib/newsletter-texte";
import legal from "../../legal.module.css";

export const metadata: Metadata = { title: "E-Mail-Adresse bestätigen | Smarter Finanz", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Zwischenschritt mit Schaltflaeche: Der Link aus der Mail loest NICHT selbst die Bestaetigung aus,
// damit Sicherheits-Scanner in Postfaechern keine Einwilligung "anklicken" (siehe lib/newsletter-texte.ts).
export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const daten = newsletterAktiv() && token ? tokenPruefen(token, "doi", DOI_MAX_ALTER_MS) : null;
  if (!daten) {
    return (
      <NewsletterSeite titel="Link ungültig">
        <p className={legal.lead}>{UNGUELTIG_NEUTRAL}</p>
      </NewsletterSeite>
    );
  }
  const t = BESTAETIGEN_TEXTE[daten.s];
  return (
    <NewsletterSeite titel={t.vorstufeTitel}>
      <p className={legal.lead}>{t.vorstufeText}</p>
      <form method="post" action="/newsletter/bestaetigen/senden">
        <input type="hidden" name="token" value={token} />
        <button type="submit" className="btn btn-gold" style={{ alignItems: "center" }}>
          {t.schaltflaeche}
        </button>
      </form>
    </NewsletterSeite>
  );
}
