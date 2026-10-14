// Google-Bewertungen fuer die Website. Bewusst von Hand gepflegt (keine Google-API, kein Widget).
//
// Regeln (Mia/Rita, 14.10.2026):
// - Nur echte Bewertungen, wortlaut wie im Google-Profil, mit Datum und Quelle.
// - `geprueft: true` setzt Andre erst, nachdem er den Eintrag im Google-Profil selbst gesehen hat.
// - Der Block erscheint erst ab MIN_ANZAHL gepruefter Bewertungen der jeweiligen Zielgruppe.
//   Davor wird nichts gerendert (keine Ueberschrift, kein Platzhalter).
// - Auf der eigenen Seite KEIN AggregateRating/Review-Markup (Selbstbewertung, siehe Mia-Abstimmung).

export type Zielgruppe = "gewerbe" | "privat";

export interface Bewertung {
  id: string;
  zielgruppe: Zielgruppe;
  /** Anzeigename, wie er oeffentlich bei Google steht. */
  anzeigename: string;
  /** Originaltext der Bewertung. */
  text: string;
  /** Datum der Bewertung, ISO (JJJJ-MM-TT). */
  datum: string;
  /** Sterne dieser Einzelbewertung (1 bis 5), nur setzen, wenn bei Google sichtbar. */
  sterne?: number;
  /** Direktlink zur Bewertung bzw. zum Google-Profil. */
  quelleUrl: string;
  geprueft: boolean;
}

export const MIN_ANZAHL = 3;

// Link zum Google-Unternehmensprofil, sobald freigegeben.
export const GOOGLE_PROFIL_URL = "";

export const BEWERTUNGEN: Bewertung[] = [];

export function sichtbareBewertungen(zielgruppe: Zielgruppe, alle: Bewertung[] = BEWERTUNGEN): Bewertung[] {
  const passend = alle.filter((b) => b.zielgruppe === zielgruppe && b.geprueft && b.text.trim() && b.quelleUrl);
  return passend.length >= MIN_ANZAHL ? passend : [];
}

// Stand-Datum (JJJJ-MM-TT): Tag, an dem Andre das Google-Profil zuletzt mit der Anzeige abgeglichen hat.
// Leer lassen, bis Bewertungen vorliegen.
export const BEWERTUNGEN_STAND = "";

// Texte (Mia, 14.10.2026): Gewerbe Sie, Privat du. Ueberschriften "Betriebe" bzw. "Kundinnen und Kunden"
// nur verwenden, wenn die gezeigten Bewertungen tatsaechlich aus dieser Gruppe stammen (Feld zielgruppe).
export const BEWERTUNGEN_TEXTE: Record<Zielgruppe, { titel: string; einleitung: string; bereich: string }> = {
  gewerbe: {
    titel: "Das sagen Betriebe über uns",
    einleitung: "Rückmeldungen aus unserem öffentlichen Google-Profil, so wie sie dort stehen.",
    bereich: "Bewertungen von Betrieben aus dem Google-Profil von Smarter Finanz",
  },
  privat: {
    titel: "Das sagen Kundinnen und Kunden über uns",
    einleitung: "Rückmeldungen aus unserem öffentlichen Google-Profil, so wie sie dort stehen.",
    bereich: "Bewertungen von Kundinnen und Kunden aus dem Google-Profil von Smarter Finanz",
  },
};

// Fuer beide Zielgruppen gleich (kein Pronomen).
export const BEWERTUNGEN_TEXTE_ALLGEMEIN = {
  eyebrow: "Stimmen",
  rolle: "Karussell",
  link: "Alle Bewertungen bei Google ansehen",
  linkAria: "Alle Bewertungen im Google-Profil von Smarter Finanz ansehen, öffnet in neuem Tab",
  zurueck: "Vorherige Bewertung",
  weiter: "Nächste Bewertung",
  bedienung: "Zum Blättern wischen oder die Pfeile nutzen.",
  tastatur: "Mit den Pfeiltasten zwischen den Bewertungen wechseln.",
  position: (n: number, gesamt: number) => `Bewertung ${n} von ${gesamt}`,
};
