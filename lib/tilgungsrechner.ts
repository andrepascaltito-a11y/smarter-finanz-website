// Rechenkern fuer den ETF-Tilgungsrechner im Privatratgeber ("Endfaelliges Darlehen mit ETF-Sparplan").
// Reine Funktionen ohne React, damit sie ohne Test-Framework per `node lib/tilgungsrechner.check.mjs` geprueft werden koennen.
// Annahmen (alle im Artikel genannt, nichts davon ist eine Prognose):
//  - Darlehen: fester Sollzins, monatliche Verzinsung (Zins geteilt durch zwoelf), Annuitaet mit fester Rate.
//  - Endfaellig: nur Zinsen, die Schuld bleibt gleich.
//  - Sparplan: Einzahlung jeweils am Monatsende, Jahresrendite nach Kosten wird geometrisch auf Monate verteilt.
//  - Steuer nur beim Verkauf: Gewinn mal (70 Prozent bei Aktien-ETF, sonst 100 Prozent) mal 26,375 Prozent
//    (Abgeltungsteuer mit Solidaritaetszuschlag, ohne Kirchensteuer), ohne Sparer-Pauschbetrag, ohne Vorabpauschale.

export const STEUERSATZ = 0.26375;
export const TEILFREISTELLUNG_AKTIEN = 0.3;

export type Eingabe = {
  darlehen: number;
  laufzeitJahre: number;
  sollzinsProzent: number;
  sparrateMonat: number;
  /** Jahresrendite des Sparplans vor laufenden Kosten und vor Steuern, in Prozent */
  renditeProzent: number;
  /** laufende Kosten des Sparplans pro Jahr, in Prozent (wird von der Rendite abgezogen) */
  kostenProzent: number;
  /** Aktien-ETF (30 Prozent Teilfreistellung) */
  aktienEtf: boolean;
  /** Nur fuer Pruefungen: feste Rate der Annuitaet statt der exakten Annuitaetenrate */
  annuitaetVorgabe?: number;
};

export type Punkt = { jahr: number; depotNachSteuer: number; restschuldAnnuitaet: number };

export type Ergebnis = {
  annuitaetMonat: number;
  zinsMonat: number;
  /** Zinsen plus Sparrate pro Monat */
  gesamtbelastungMonat: number;
  einzahlungen: number;
  /** Restschuld der Annuitaet am Ende (bei exakter Rate null) */
  restschuldAnnuitaetEnde: number;
  depotVorSteuer: number;
  gewinn: number;
  steuer: number;
  depotNachSteuer: number;
  /** Depot nach Steuern minus Darlehen: plus = Ueberschuss, minus = Luecke */
  ueberschussOderLuecke: number;
  zinsenEndfaellig: number;
  zinsenAnnuitaet: number;
  mehrzinsen: number;
  verlauf: Punkt[];
};

export function annuitaetMonat(darlehen: number, laufzeitJahre: number, sollzinsProzent: number): number {
  const n = laufzeitJahre * 12;
  const r = sollzinsProzent / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return darlehen / n;
  return (darlehen * r) / (1 - Math.pow(1 + r, -n));
}

export function restschuldAnnuitaet(darlehen: number, rate: number, sollzinsProzent: number, monate: number): number {
  const r = sollzinsProzent / 100 / 12;
  let rest = darlehen;
  for (let m = 0; m < monate; m++) {
    rest = rest * (1 + r) - rate;
    if (rest <= 0) return 0;
  }
  return rest;
}

/** Monatsrendite aus Jahresrendite minus Jahreskosten, geometrisch umgerechnet. */
export function monatsRendite(renditeProzent: number, kostenProzent: number): number {
  const netto = Math.max(renditeProzent - kostenProzent, -99);
  return Math.pow(1 + netto / 100, 1 / 12) - 1;
}

export function steuerAufGewinn(depotWert: number, einzahlungen: number, aktienEtf: boolean): number {
  const gewinn = depotWert - einzahlungen;
  if (gewinn <= 0) return 0;
  return gewinn * (aktienEtf ? 1 - TEILFREISTELLUNG_AKTIEN : 1) * STEUERSATZ;
}

/** Sparrate, bei der Zinsen plus Sparrate genau so viel kosten wie die Annuitaetenrate (gleiche Gesamtbelastung). */
export function sparrateGleicheBelastung(darlehen: number, laufzeitJahre: number, sollzinsProzent: number): number {
  const zins = (darlehen * sollzinsProzent) / 100 / 12;
  return Math.max(annuitaetMonat(darlehen, laufzeitJahre, sollzinsProzent) - zins, 0);
}

export function rechne(e: Eingabe): Ergebnis {
  const n = Math.round(e.laufzeitJahre * 12);
  const zinsMonat = (e.darlehen * e.sollzinsProzent) / 100 / 12;
  const ann = e.annuitaetVorgabe ?? annuitaetMonat(e.darlehen, e.laufzeitJahre, e.sollzinsProzent);
  const rm = monatsRendite(e.renditeProzent, e.kostenProzent);

  const verlauf: Punkt[] = [];
  let depot = 0;
  for (let m = 0; m <= n; m++) {
    if (m > 0) depot = depot * (1 + rm) + e.sparrateMonat;
    if (m % 12 === 0) {
      const einz = e.sparrateMonat * m;
      verlauf.push({
        jahr: m / 12,
        depotNachSteuer: depot - steuerAufGewinn(depot, einz, e.aktienEtf),
        restschuldAnnuitaet: restschuldAnnuitaet(e.darlehen, ann, e.sollzinsProzent, m),
      });
    }
  }
  const einzahlungen = e.sparrateMonat * n;
  const steuer = steuerAufGewinn(depot, einzahlungen, e.aktienEtf);
  const depotNachSteuer = depot - steuer;
  const zinsenEndfaellig = zinsMonat * n;
  const restEnde = restschuldAnnuitaet(e.darlehen, ann, e.sollzinsProzent, n);
  const zinsenAnnuitaet = ann * n - (e.darlehen - restEnde);
  return {
    annuitaetMonat: ann,
    zinsMonat,
    gesamtbelastungMonat: zinsMonat + e.sparrateMonat,
    einzahlungen,
    restschuldAnnuitaetEnde: restEnde,
    depotVorSteuer: depot,
    gewinn: depot - einzahlungen,
    steuer,
    depotNachSteuer,
    ueberschussOderLuecke: depotNachSteuer - e.darlehen,
    zinsenEndfaellig,
    zinsenAnnuitaet,
    mehrzinsen: zinsenEndfaellig - zinsenAnnuitaet,
    verlauf,
  };
}
