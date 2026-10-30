// Referenzrenditen fuer die Schaltflaechen im Tilgungsrechner (components/TilgungsRechner.tsx).
// Quelle: Deutsches Aktieninstitut, MSCI-World-Rendite-Dreieck fuer monatliche Geldanlage, Stand 31.12.2025
// (https://www.dai.de/fileadmin/user_upload/251231_MSCI_World-Rendite-Dreick_50_Jahre_Sparplan_Web.pdf).
// Sparplaene mit gleichen Monatsbetraegen in Euro (vor 1999 D-Mark), MSCI World Bruttoindex, vor Kosten und Steuern,
// Start und Ende im Dezember. Werte nach Klaras Nachtrag (Vault 03-Marketing/Content/Klara-Faktenblock-Nachtrag-MSCI-World-und-Police-2026-10-30.md,
// Abschnitt DAI): 25 Jahre 26 Plaene (Start 1975 bis 2000) Mittel 8,0, schlechtester 3,8, bester 13,8;
// 30 Jahre 21 Plaene (Start 1975 bis 1995) Mittel 7,9, schlechtester 6,2, bester 10,1.
// Es werden nur diese Kennzahlen gezeigt, keine Indexreihe (MSCI-Nutzungsbedingungen).

export type MsciPreset = { label: string; prozent: number; jahre: number };

export const MSCI_PRESETS: MsciPreset[] = [
  { label: "25 Jahre sparen, Durchschnitt aller Sparpläne", prozent: 8.0, jahre: 25 },
  { label: "25 Jahre sparen, schlechtester Sparplan", prozent: 3.8, jahre: 25 },
  { label: "30 Jahre sparen, Durchschnitt aller Sparpläne", prozent: 7.9, jahre: 30 },
  { label: "30 Jahre sparen, schlechtester Sparplan", prozent: 6.2, jahre: 30 },
];

export const MSCI_QUELLE =
  "Quelle: Deutsches Aktieninstitut, MSCI-World-Rendite-Dreieck, Stand 31.12.2025. Sparpläne mit gleichen Monatsbeträgen, Start jeweils im Dezember, 1975 bis 2000 (25 Jahre) beziehungsweise 1975 bis 1995 (30 Jahre), Bruttoindex in Euro, bis 1998 in D-Mark, vor Kosten und vor Steuern, auch vor den Steuern auf Dividenden im Ausland. Ein ETF liegt meist etwas darunter.";
