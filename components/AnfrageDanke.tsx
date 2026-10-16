"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

import type { DankeText } from "@/lib/danke-texte";
import {
  ERREICHBARKEIT_FORMEN,
  ERREICHBARKEIT_TAGE,
  ERREICHBARKEIT_ZEITEN,
  type Erreichbarkeit,
  type Option,
} from "@/lib/erreichbarkeit";
import styles from "./anfrage-danke.module.css";

// Kontaktdaten wie im Impressum
const TELEFON = "+49 170 8784889";
const TELEFON_LINK = "tel:+491708784889";
const MAIL = "a.tito@smarterfinanz.de";

// [TELEFON], [MAIL] und [ERSTINFO] in den Texten werden zu Links, {firmenname} und {thema} zu der Eingabe der Person
// (als Text, React maskiert ihn).
function mitKontakt(text: string): ReactNode {
  return text.split(/(\[TELEFON\]|\[MAIL\]|\[ERSTINFO\])/).map((teil, i) => {
    if (teil === "[TELEFON]") return <a key={i} href={TELEFON_LINK}>{TELEFON}</a>;
    if (teil === "[MAIL]") return <a key={i} href={`mailto:${MAIL}`}>{MAIL}</a>;
    if (teil === "[ERSTINFO]") return <a key={i} href="/erstinformation">Erstinformation ansehen</a>;
    return <Fragment key={i}>{teil}</Fragment>;
  });
}

function fuelle(text: string, werte: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => werte[k] ?? "");
}

function labelsVon(ids: string[], liste: Option[]): string[] {
  return ids.map((id) => liste.find((o) => o.id === id)?.label ?? id);
}

// Bestaetigung nach dem Absenden des Anfrageformulars. Ersetzt das Formular an derselben Stelle,
// scrollt sich ins Bild und setzt den Fokus auf die Ueberschrift (Tastatur und Screenreader).
// Texte: lib/danke-texte.ts (Wortlaut von Mia, rechtlich von Rita geprueft).
export function AnfrageDanke({
  text,
  zusatz,
  firmenname,
  thema,
  erreichbarkeit,
}: {
  text: DankeText;
  zusatz?: string | null;
  firmenname?: string;
  thema?: string | null;
  erreichbarkeit?: Erreichbarkeit | null;
}) {
  const kopfRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = kopfRef.current;
    if (!el) return;
    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.closest("[data-danke]")?.scrollIntoView({ behavior: reduziert ? "auto" : "smooth", block: "start" });
    el.focus({ preventScroll: true });
  }, []);

  const firma = (firmenname ?? "").trim();
  const kern = firma && text.kernMitFirma ? fuelle(text.kernMitFirma, { firmenname: firma }) : text.kern;
  // Bei "Sonstiges" gibt es kein sinnvolles Thema zum Wiederholen
  const themaZeile = text.kernZusatzThema && thema && thema !== "Sonstiges" ? fuelle(text.kernZusatzThema, { thema }) : null;

  const echo = erreichbarkeit
    ? {
        chips: [
          ...labelsVon(erreichbarkeit.tage, ERREICHBARKEIT_TAGE),
          ...labelsVon(erreichbarkeit.zeiten, ERREICHBARKEIT_ZEITEN),
          ...(erreichbarkeit.form ? labelsVon([erreichbarkeit.form], ERREICHBARKEIT_FORMEN) : []),
        ],
        hinweis: erreichbarkeit.hinweis.trim(),
      }
    : null;
  const zeigeEcho = !!text.echoTitel && !!echo && (echo.chips.length > 0 || echo.hinweis.length > 0);
  const persoenlich = erreichbarkeit?.form === "persoenlich";

  return (
    <div className={styles.danke} data-danke>
      <div className={styles.kopf}>
        <svg className={styles.haken} viewBox="0 0 64 64" aria-hidden="true">
          <circle className={styles.kreis} cx="32" cy="32" r="29" />
          <path className={styles.strich} d="M19 33.5l9.5 9.5L46 23.5" />
        </svg>
        <div>
          <span className={styles.eyebrow}>{text.eyebrow}</span>
          <h2 ref={kopfRef} tabIndex={-1}>{text.titel}</h2>
          <p className={styles.kern}>{kern}</p>
          {themaZeile ? <p className={styles.thema}>{themaZeile}</p> : null}
        </div>
      </div>

      {zeigeEcho && echo ? (
        <section className={styles.echo} aria-labelledby="danke-echo">
          <h3 id="danke-echo">{text.echoTitel}</h3>
          {echo.chips.length > 0 ? (
            <ul className={styles.chips}>
              {echo.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}
          {echo.hinweis ? <p className={styles.echoHinweis}>Hinweis: {echo.hinweis}</p> : null}
        </section>
      ) : null}

      <section className={styles.block} aria-labelledby="danke-schritte">
        <h3 id="danke-schritte">{text.schritteTitel}</h3>
        <ol className={styles.schritte}>
          {text.schritte.map((s, i) => (
            <li key={s.titel} style={{ animationDelay: `${0.35 + i * 0.14}s` }}>
              <span className={styles.nr} aria-hidden="true">{i + 1}</span>
              <div>
                <strong>{s.titel}</strong>
                <p>{s.text}</p>
                {s.zusatzPersoenlich && persoenlich ? <p className={styles.klein}>{s.zusatzPersoenlich}</p> : null}
                {s.hinweis ? <p className={styles.klein}>{mitKontakt(s.hinweis)}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.zwei}>
        <section className={styles.karte} aria-labelledby="danke-nutzen">
          <h3 id="danke-nutzen">{text.nutzenTitel}</h3>
          <ul>
            {text.nutzen.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className={styles.schluss}>{text.nutzenSchluss}</p>
        </section>
        <section className={styles.karte} aria-labelledby="danke-vorbereiten">
          <h3 id="danke-vorbereiten">{text.vorbereitenTitel}</h3>
          <p>{text.vorbereitenEinleitung}</p>
          <ul>
            {text.vorbereiten.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className={styles.klein}>{text.vorbereitenHinweis}</p>
        </section>
      </div>

      <aside className={styles.person} aria-label={text.personLabel}>
        <Image src="/andre-tito.jpg" alt={text.fotoAlt} width={160} height={200} sizes="96px" quality={80} className={styles.foto} />
        <div className={styles.personText}>
          <span className={styles.personLabel}>{text.personLabel}</span>
          <strong>André Tito</strong>
          <span className={styles.rolle}>{text.personRolle}</span>
          <p>{text.personText}</p>
          <span className={styles.reg}>{text.personRegister}</span>
          <a className={styles.mehr} href="/ueber-andre">Mehr über André Tito</a>
        </div>
        <div className={styles.eilt}>
          <span>{text.eiltTitel}</span>
          <p>{mitKontakt(text.eiltText)}</p>
          {text.eiltKalender ? <a href="/privat#termin">{text.eiltKalender}</a> : null}
        </div>
      </aside>

      {zusatz ? <p className={styles.zusatz}>{zusatz}</p> : null}
    </div>
  );
}
