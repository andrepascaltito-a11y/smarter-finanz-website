// Konsistenzpruefung fuer lib/tilgungsrechner.ts, ohne Test-Framework (Konvention im Repo).
// Aufruf: node lib/tilgungsrechner.check.mjs
import { rechne, annuitaetMonat, restschuldAnnuitaet, sparrateGleicheBelastung, monatsRendite, steuerAufGewinn } from "./tilgungsrechner.ts";

let fehler = 0;
function nahe(name, ist, soll, tol = 0.01) {
  const ok = Math.abs(ist - soll) <= tol;
  if (!ok) { fehler++; console.error(`FEHLER ${name}: ist ${ist}, soll ${soll}`); } else console.log(`ok ${name}: ${ist.toFixed(2)}`);
}

// Invarianten
const ann25 = annuitaetMonat(300000, 25, 4);
nahe("Annuitaet 300000/25/4", ann25, 1583.51, 0.01);
nahe("Restschuld nach Laufzeit ist null", restschuldAnnuitaet(300000, ann25, 4, 300), 0, 0.01);
nahe("Sparrate gleiche Belastung", sparrateGleicheBelastung(300000, 25, 4), ann25 - 1000, 1e-9);

const basis = { darlehen: 300000, laufzeitJahre: 25, sollzinsProzent: 4, sparrateMonat: ann25 - 1000, renditeProzent: 0, kostenProzent: 0, aktienEtf: true };
const e0 = rechne(basis);
nahe("0 Prozent: Depot gleich Einzahlungen", e0.depotNachSteuer, e0.einzahlungen, 1e-6);
nahe("0 Prozent: keine Steuer", e0.steuer, 0, 1e-9);
nahe("Zinsen endfaellig 25 Jahre", e0.zinsenEndfaellig, 300000, 1e-6);
nahe("Zinsen Annuitaet 25 Jahre", e0.zinsenAnnuitaet, ann25 * 300 - 300000, 1e-6);
nahe("Monatsrendite 12 Monate ergeben Jahresrendite", Math.pow(1 + monatsRendite(5, 0), 12) - 1, 0.05, 1e-12);
nahe("Steuer Aktien-ETF", steuerAufGewinn(200000, 100000, true), 100000 * 0.7 * 0.26375, 1e-9);
nahe("Steuer sonstige Fonds", steuerAufGewinn(200000, 100000, false), 100000 * 0.26375, 1e-9);
nahe("Steuer bei Verlust", steuerAufGewinn(80000, 100000, true), 0, 1e-12);

const e5 = rechne({ ...basis, renditeProzent: 5 });
console.log("5 Prozent, 25 Jahre: Depot nach Steuern", e5.depotNachSteuer.toFixed(0), "Ueberschuss/Luecke", e5.ueberschussOderLuecke.toFixed(0));

// Testvektoren von Klara (Vault 03-Marketing/Content/rechner-testvektoren-2026-10-30.json, erzeugt mit rechnung-msci-world-sparplan-2026-10-30.py)
import { readFileSync, existsSync } from "node:fs";
const VEKTOREN = process.env.HOME + "/FairKV-OS/03-Marketing/Content/rechner-testvektoren-2026-10-30.json";
if (existsSync(VEKTOREN)) {
  const d = JSON.parse(readFileSync(VEKTOREN, "utf-8"));
  for (const f of d.faelle) {
    const i = f.eingabe;
    if (i.steuersatz !== 0.26375 || ![0, 0.3].includes(i.teilfreistellung)) { fehler++; console.error("Vektor mit anderem Steuermodell", f.id); continue; }
    const r = rechne({
      darlehen: i.darlehen, laufzeitJahre: i.laufzeit_jahre, sollzinsProzent: i.sollzins * 100, sparrateMonat: i.sparrate,
      renditeProzent: i.rendite_vor_kosten * 100, kostenProzent: i.kosten_pa * 100, aktienEtf: i.teilfreistellung === 0.3,
      annuitaetVorgabe: i.annuitaetsrate_vorgabe ?? undefined,
    });
    const x = f.erwartet;
    const paare = [
      ["annuitaetsrate", r.annuitaetMonat], ["restschuld_annuitaet", r.restschuldAnnuitaetEnde], ["zinsen_gesamt_annuitaet", r.zinsenAnnuitaet],
      ["zinsen_gesamt_endfaellig", r.zinsenEndfaellig], ["mehrzinsen", r.mehrzinsen], ["einzahlungen_gesamt", r.einzahlungen],
      ["depot_vor_steuern", r.depotVorSteuer], ["gewinn", r.gewinn], ["steuer", r.steuer], ["depot_nach_steuern", r.depotNachSteuer],
      ["ueberschuss_luecke_endfaellig", r.ueberschussOderLuecke],
    ];
    for (const [k, ist] of paare) {
      if (i.annuitaetsrate_vorgabe && k === "annuitaetsrate") continue; // dort ist die Rate vorgegeben
      nahe(`${f.id} ${k}`, ist, x[k], 0.01);
    }
  }
} else {
  console.log("Testvektoren nicht gefunden, nur Invarianten geprueft");
}

if (fehler) { console.error(fehler + " Fehler"); process.exit(1); } else console.log("alle Pruefungen bestanden");
