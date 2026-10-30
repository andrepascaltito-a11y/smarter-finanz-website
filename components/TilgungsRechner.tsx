"use client";

import { useId, useMemo, useState } from "react";
import { MSCI_PRESETS, MSCI_QUELLE } from "../lib/msci-referenz";
import { rechne, sparrateGleicheBelastung, type Eingabe } from "../lib/tilgungsrechner";
import styles from "./tilgungsrechner.module.css";

const START = { darlehen: "300000", laufzeit: 25, zins: 4, rendite: 5.2, kosten: 0.2 };

const euro = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const prozent = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const e0 = (n: number) => euro.format(Math.round(n));

function zahl(text: string, min: number, max: number, fallback: number): number {
  const n = Number(text.replace(",", "."));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

function schoenesMaximum(wert: number): number {
  const schritt = wert > 600000 ? 200000 : wert > 300000 ? 100000 : wert > 150000 ? 50000 : 25000;
  return Math.ceil(wert / schritt) * schritt;
}

export function TilgungsRechner() {
  const id = useId();
  const [darlehenText, setDarlehenText] = useState(START.darlehen);
  const [laufzeit, setLaufzeit] = useState(START.laufzeit);
  const [zins, setZins] = useState(START.zins);
  const [rendite, setRendite] = useState(START.rendite);
  const [kosten, setKosten] = useState(START.kosten);
  const [aktienEtf, setAktienEtf] = useState(true);
  const [sparrateEigen, setSparrateEigen] = useState(false);
  const [sparrateText, setSparrateText] = useState("");

  const darlehen = zahl(darlehenText, 10000, 2000000, 300000);
  const sparrateAuto = sparrateGleicheBelastung(darlehen, laufzeit, zins);
  const sparrate = sparrateEigen ? zahl(sparrateText, 0, 20000, 0) : sparrateAuto;

  const eingabe: Eingabe = {
    darlehen,
    laufzeitJahre: laufzeit,
    sollzinsProzent: zins,
    sparrateMonat: sparrate,
    renditeProzent: rendite,
    kostenProzent: kosten,
    aktienEtf,
  };
  const erg = useMemo(
    () => rechne(eingabe),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darlehen, laufzeit, zins, sparrate, rendite, kosten, aktienEtf],
  );

  function zuruecksetzen() {
    setDarlehenText(START.darlehen);
    setLaufzeit(START.laufzeit);
    setZins(START.zins);
    setRendite(START.rendite);
    setKosten(START.kosten);
    setAktienEtf(true);
    setSparrateEigen(false);
    setSparrateText("");
  }

  // Diagramm
  const B = 640;
  const H = 300;
  const L = 58;
  const R = 14;
  const T = 14;
  const U = 34;
  const yMax = schoenesMaximum(Math.max(darlehen, ...erg.verlauf.map((p) => p.depotNachSteuer)) * 1.02);
  const x = (jahr: number) => L + (jahr / Math.max(laufzeit, 1)) * (B - L - R);
  const y = (wert: number) => T + (1 - wert / yMax) * (H - T - U);
  const linie = (werte: number[]) => erg.verlauf.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.jahr).toFixed(1)},${y(werte[i]).toFixed(1)}`).join(" ");
  const depotLinie = linie(erg.verlauf.map((p) => p.depotNachSteuer));
  const restLinie = linie(erg.verlauf.map((p) => p.restschuldAnnuitaet));
  const schuldY = y(darlehen);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);
  const xSchritt = laufzeit > 20 ? 5 : 2;
  const xTicks: number[] = [];
  for (let j = 0; j <= laufzeit; j += xSchritt) xTicks.push(j);

  const ueber = erg.ueberschussOderLuecke >= 0;
  const aktivesPreset = MSCI_PRESETS.find((p) => p.jahre === laufzeit && Math.round(p.prozent * 10) / 10 === rendite);
  const beschreibung =
    `Liniendiagramm über ${laufzeit} Jahre. Am Ende liegt der ETF-Sparplan nach Steuern bei ${e0(erg.depotNachSteuer)} Euro, ` +
    `das Darlehen beträgt ${e0(darlehen)} Euro.`;

  return (
    <section className={styles.rechner} aria-labelledby={`${id}-titel`}>
      <h3 id={`${id}-titel`}>Rechne selbst</h3>
      <p className={styles.intro}>
        Ändere die Werte und sieh, was passiert. Das ist ein Rechenbeispiel mit frei gewählten Annahmen, keine Vorhersage und kein Angebot. Auch der Zins ist frei gewählt. Welchen Zins du bekommst, hängt von Bank, Zinsbindung und deiner Lage ab.
      </p>

      <div className={styles.felder}>
        <label className={styles.feld}>
          <span>Darlehen (Euro)</span>
          <input type="number" inputMode="numeric" min={10000} max={2000000} step={10000} value={darlehenText} onChange={(e) => setDarlehenText(e.target.value)} />
        </label>
        <label className={styles.feld}>
          <span>Laufzeit: <strong>{laufzeit} Jahre</strong></span>
          <input type="range" min={10} max={35} step={1} value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))} />
        </label>
        <label className={styles.feld}>
          <span>Zins im Jahr, fest: <strong>{prozent.format(zins)} %</strong></span>
          <input type="range" min={1} max={8} step={0.1} value={zins} onChange={(e) => setZins(Number(e.target.value))} />
        </label>
        <label className={styles.feld}>
          <span>Rendite im Jahr, vor Kosten und vor Steuern: <strong>{prozent.format(rendite)} %</strong></span>
          <input type="range" min={0} max={10} step={0.1} value={rendite} onChange={(e) => setRendite(Number(e.target.value))} />
        </label>
        <label className={styles.feld}>
          <span>Kosten im Jahr (Fondskosten, Steuern auf Dividenden im Ausland): <strong>{prozent.format(kosten)} %</strong></span>
          <input type="range" min={0} max={2} step={0.1} value={kosten} onChange={(e) => setKosten(Number(e.target.value))} />
        </label>
        <div className={styles.feld}>
          <label htmlFor={`${id}-sparrate`}>Sparrate im Monat (Euro)</label>
          <input
            id={`${id}-sparrate`}
            type="number"
            inputMode="numeric"
            min={0}
            max={20000}
            step={10}
            value={sparrateEigen ? sparrateText : String(Math.round(sparrateAuto))}
            onChange={(e) => {
              setSparrateEigen(true);
              setSparrateText(e.target.value);
            }}
            aria-describedby={`${id}-rate`}
          />
          <small id={`${id}-rate`}>
            {sparrateEigen ? (
              <>
                Von dir festgelegt.{" "}
                <button type="button" className={styles.link} onClick={() => setSparrateEigen(false)}>
                  Wieder automatisch
                </button>
              </>
            ) : (
              "Automatisch so gewählt, dass Zinsen plus Sparrate so viel kosten wie die normale Rate. Du kannst sie ändern."
            )}
          </small>
        </div>
        <label className={styles.haken}>
          <input type="checkbox" checked={aktienEtf} onChange={(e) => setAktienEtf(e.target.checked)} />
          <span>Aktien-ETF (30 Prozent des Gewinns bleiben steuerfrei, wenn der Fonds als Aktienfonds gilt)</span>
        </label>
      </div>

      {MSCI_PRESETS.length > 0 && (
        <div className={styles.presets}>
          <p>Rückblick einsetzen (Sparpläne in den MSCI World). Beim Anklicken stellt der Rechner auch die Laufzeit und die Kosten ein, bei den Kosten mit 1,0 Prozent als grober Annahme für Fondskosten und Steuern auf Dividenden im Ausland:</p>
          <div className={styles.chips}>
            {MSCI_PRESETS.map((p) => (
              <button key={p.label} type="button" className={styles.chip} onClick={() => { setRendite(Math.round(p.prozent * 10) / 10); setLaufzeit(p.jahre); setKosten(1); }}>
                {p.label}: {prozent.format(p.prozent)} %
              </button>
            ))}
          </div>
          <p>Wertentwicklungen der Vergangenheit sind kein verlässlicher Indikator für künftige Ergebnisse.</p>
          <p className={styles.klein}>{MSCI_QUELLE}</p>
        </div>
      )}

      <div className={styles.diagramm}>
        <svg viewBox={`0 0 ${B} ${H}`} role="img" aria-label={beschreibung}>
          <title>ETF-Sparplan nach Steuern gegen Darlehen</title>
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={L} x2={B - R} y1={y(t)} y2={y(t)} className={styles.gitter} />
              <text x={L - 8} y={y(t) + 4} textAnchor="end" className={styles.achse}>{euro.format(t / 1000)}</text>
            </g>
          ))}
          {xTicks.map((j) => (
            <text key={j} x={x(j)} y={H - 12} textAnchor="middle" className={styles.achse}>{j}</text>
          ))}
          <text x={B - R} y={H - 1} textAnchor="end" className={styles.achse}>Jahre</text>
          <text x={B - R} y={T - 2} textAnchor="end" className={styles.achse}>in 1.000 Euro</text>
          <path d={restLinie} className={styles.rest} fill="none" />
          <line x1={L} x2={B - R} y1={schuldY} y2={schuldY} className={styles.schuld} />
          <path d={depotLinie} className={styles.depot} fill="none" />
        </svg>
        <ul className={styles.legende}>
          <li><i className={styles.swDepot} /> ETF-Sparplan nach Steuern (wenn du an diesem Tag verkaufst)</li>
          <li><i className={styles.swSchuld} /> Darlehen beim endfälligen Darlehen (bleibt gleich)</li>
          <li><i className={styles.swRest} /> Restschuld bei normaler Tilgung</li>
        </ul>
      </div>

      <div className={styles.ergebnis} aria-live="polite">
        <p className={ueber ? styles.gut : styles.luecke}>
          Nach {laufzeit} Jahren: ETF-Sparplan nach Steuern <strong>{e0(erg.depotNachSteuer)} Euro</strong>, Darlehen <strong>{e0(darlehen)} Euro</strong>.{" "}
          {ueber ? <>Es bleiben <strong>{e0(erg.ueberschussOderLuecke)} Euro</strong> übrig.</> : <>Es fehlen <strong>{e0(-erg.ueberschussOderLuecke)} Euro</strong>.</>}
        </p>
        {aktivesPreset && (
          <p className={styles.hinweis}>
            Das ist ein Blick zurück: „{aktivesPreset.label}“ in den MSCI World, vor Kosten und Steuern. Die Vergangenheit ist kein verlässlicher Hinweis auf die Zukunft. Dein Sparplan kann mehr oder weniger bringen.
          </p>
        )}
        <ul>
          <li>
            Im Monat: {e0(erg.zinsMonat)} Euro Zinsen plus {e0(sparrate)} Euro Sparrate = <strong>{e0(erg.gesamtbelastungMonat)} Euro</strong>. Die normale Rate wäre {e0(erg.annuitaetMonat)} Euro.
          </li>
          <li>
            Zinsen insgesamt: {e0(erg.zinsenEndfaellig)} Euro, bei normaler Tilgung {e0(erg.zinsenAnnuitaet)} Euro, also {e0(erg.mehrzinsen)} Euro {erg.mehrzinsen >= 0 ? "mehr" : "weniger"}.
          </li>
          <li>
            Eingezahlt hast du {e0(erg.einzahlungen)} Euro. Auf den Gewinn zahlst du {e0(erg.steuer)} Euro Steuer.
          </li>
        </ul>
        {sparrate * 12 < darlehen * 0.02 && (
          <p className={styles.hinweis}>
            Eine Bank kann eine Mindestsparrate verlangen. In einem Bankmuster für Policen sind es zum Beispiel 2 Prozent der Darlehenssumme im Jahr, hier {e0((darlehen * 0.02) / 12)} Euro im Monat. Frag deine Bank.
          </p>
        )}
        {laufzeit > 15 && (
          <p className={styles.hinweis}>
            Bei den meisten Krediten ist der Zins fünf, zehn oder 15 Jahre fest. Längere Bindungen gibt es, sie kosten einen etwas höheren Zins. Danach gilt ein neuer Zins, der hier nicht gerechnet ist.
          </p>
        )}
        <button type="button" className={styles.zurueck} onClick={zuruecksetzen}>Auf das Beispiel zurücksetzen</button>
      </div>

      <p className={styles.klein}>
        So wird gerechnet: fester Zins, Einzahlung am Monatsende, Verkauf am Ende. Die Rendite abzüglich der Kosten gilt als Jahreswert und wird gleichmäßig auf die Monate verteilt. Steuer nur beim Verkauf: 26,375 Prozent auf den Gewinn
        (Abgeltungsteuer mit Solidaritätszuschlag, ohne Kirchensteuer), bei Aktien-ETFs auf 70 Prozent des Gewinns. Bei einem Verlust wird keine Steuer gerechnet. Nicht eingerechnet ist der Freibetrag für Kapitalerträge von 1.000 Euro im Jahr (Sparer-Pauschbetrag), der die Steuer etwas senken würde. Nicht eingerechnet ist auch die Vorabpauschale: Sie zieht Steuer zeitlich vor und würde die Beträge etwas verschlechtern. Die Zinsen sind vor Steuern angegeben. Eine mögliche Steuerersparnis durch den Zinsabzug bei Vermietung ist nicht eingerechnet. Wie viel Steuer du zahlst, hängt von deiner Lage ab und kann sich ändern. Alle Werte sind Annahmen. Das Ergebnis sagt nichts über die künftige Entwicklung und ist kein Angebot und keine Empfehlung.
      </p>
    </section>
  );
}
