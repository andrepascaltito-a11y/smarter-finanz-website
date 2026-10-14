"use client";

import { useRef } from "react";

import {
  BEWERTUNGEN,
  BEWERTUNGEN_STAND,
  BEWERTUNGEN_TEXTE,
  BEWERTUNGEN_TEXTE_ALLGEMEIN,
  GOOGLE_PROFIL_URL,
  sichtbareBewertungen,
  type Bewertung,
  type Zielgruppe,
} from "@/lib/bewertungen";
import styles from "./bewertungen.module.css";

function datumDe(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Rondell ohne Autoplay: Wischen/Scrollen oder Pfeiltasten. Rendert nichts, solange weniger als
// MIN_ANZAHL gepruefte Bewertungen der Zielgruppe vorliegen (siehe lib/bewertungen.ts).
export function Bewertungen({ zielgruppe, daten = BEWERTUNGEN }: { zielgruppe: Zielgruppe; daten?: Bewertung[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const liste = sichtbareBewertungen(zielgruppe, daten);
  if (liste.length === 0) return null;
  const t = BEWERTUNGEN_TEXTE[zielgruppe];
  const a = BEWERTUNGEN_TEXTE_ALLGEMEIN;
  const quelle = BEWERTUNGEN_STAND ? `Quelle: Google, Stand ${datumDe(BEWERTUNGEN_STAND)}` : "Quelle: Google";

  function schiebe(richtung: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const karte = el.querySelector("li");
    const schritt = (karte?.getBoundingClientRect().width ?? 320) + 18;
    el.scrollBy({ left: richtung * schritt, behavior: "smooth" });
  }

  return (
    <section className={styles.section} aria-label={t.bereich}>
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow">{a.eyebrow}</span>
          <h2>{t.titel}</h2>
          <p>{t.einleitung}</p>
        </div>
        <div className={styles.rondell} role="region" aria-roledescription={a.rolle} aria-label={t.bereich}>
          <div
            ref={trackRef}
            className={styles.track}
            tabIndex={0}
            aria-label={a.tastatur}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); schiebe(1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); schiebe(-1); }
            }}
          >
            <ul style={{ display: "contents", listStyle: "none", margin: 0, padding: 0 }}>
              {liste.map((b, n) => (
                <li key={b.id} className={styles.card} aria-label={a.position(n + 1, liste.length)}>
                  {b.sterne ? (
                    <div className={styles.stars} role="img" aria-label={`${b.sterne} von 5 Sternen`}>
                      {"★".repeat(b.sterne)}{"☆".repeat(5 - b.sterne)}
                    </div>
                  ) : null}
                  <blockquote className={styles.text} style={{ margin: 0 }}>„{b.text}“</blockquote>
                  <div className={styles.meta}>
                    <strong>{b.anzeigename}</strong>
                    <span>
                      {datumDe(b.datum)} ·{" "}
                      <a href={b.quelleUrl} target="_blank" rel="noopener noreferrer">{quelle}</a>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.nav}>
            <button type="button" className={styles.btn} onClick={() => schiebe(-1)} aria-label={a.zurueck}>‹</button>
            <button type="button" className={styles.btn} onClick={() => schiebe(1)} aria-label={a.weiter}>›</button>
            {GOOGLE_PROFIL_URL ? (
              <a
                className={styles.profil}
                href={GOOGLE_PROFIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a.linkAria}
              >
                {a.link}
              </a>
            ) : null}
          </div>
          <p className={styles.bedienung}>{a.bedienung}</p>
        </div>
      </div>
    </section>
  );
}
