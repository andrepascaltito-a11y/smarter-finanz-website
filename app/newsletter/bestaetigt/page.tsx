import type { Metadata } from "next";

import { NewsletterSeite } from "@/components/NewsletterSeite";
import { BESTAETIGEN_TEXTE, UNGUELTIG_NEUTRAL } from "@/lib/newsletter-texte";
import legal from "../../legal.module.css";

export const metadata: Metadata = { title: "E-Mail-Adresse bestätigt | Smarter Finanz", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ s?: string; erg?: string }> }) {
  const { s, erg } = await searchParams;
  const segment = s === "gewerbe" || s === "privat" ? s : null;
  if (!segment || (erg !== "ok" && erg !== "bereits")) {
    const t = segment ? BESTAETIGEN_TEXTE[segment] : null;
    return (
      <NewsletterSeite titel="Link ungültig">
        <p className={legal.lead}>{t ? t.ungueltig : UNGUELTIG_NEUTRAL}</p>
      </NewsletterSeite>
    );
  }
  const t = BESTAETIGEN_TEXTE[segment];
  return (
    <NewsletterSeite titel={t.titel}>
      <p className={legal.lead}>{erg === "ok" ? t.text : t.bereits}</p>
    </NewsletterSeite>
  );
}
