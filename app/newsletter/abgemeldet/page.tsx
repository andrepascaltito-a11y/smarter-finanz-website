import type { Metadata } from "next";

import { NewsletterSeite } from "@/components/NewsletterSeite";
import { ABMELDEN_TEXTE, UNGUELTIG_NEUTRAL } from "@/lib/newsletter-texte";
import legal from "../../legal.module.css";

export const metadata: Metadata = { title: "Abgemeldet | Smarter Finanz", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Keine Werbung und kein Abwerbe-Angebot auf dieser Seite (Mia).
export default async function Page({ searchParams }: { searchParams: Promise<{ s?: string; erg?: string }> }) {
  const { s, erg } = await searchParams;
  const segment = s === "gewerbe" || s === "privat" ? s : null;
  if (segment && erg === "technisch") {
    return (
      <NewsletterSeite titel="Abmeldung nicht ausgeführt">
        <p className={legal.lead}>{ABMELDEN_TEXTE[segment].technisch}</p>
      </NewsletterSeite>
    );
  }
  if (!segment || (erg !== "ok" && erg !== "bereits")) {
    const t = segment ? ABMELDEN_TEXTE[segment] : null;
    return (
      <NewsletterSeite titel="Link ungültig">
        <p className={legal.lead}>{t ? t.ungueltig : UNGUELTIG_NEUTRAL}</p>
      </NewsletterSeite>
    );
  }
  const t = ABMELDEN_TEXTE[segment];
  return (
    <NewsletterSeite titel={t.titel}>
      <p className={legal.lead}>{erg === "ok" ? t.text : t.bereits}</p>
    </NewsletterSeite>
  );
}
