"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ThemenIcon, type ThemaIcon } from "./themen-icons";
import styles from "./themen-rondell.module.css";

export type Thema = { t: string; d: string; icon?: ThemaIcon };

// Rondell ohne Autoplay (gleiches Muster wie Bewertungen): Wischen, Pfeiltasten oder die beiden Knoepfe.
// Die Liste bleibt eine echte <ul>, jede Karte ein <li>, damit Screenreader und Suchmaschinen alle Themen sehen.
export function ThemenRondell({ themen, bereich }: { themen: Thema[]; bereich: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [sicht, setSicht] = useState({ von: 1, bis: 1, anfang: true, ende: false });

  const messen = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const karten = Array.from(el.children) as HTMLElement[];
    const links = el.scrollLeft;
    const rechts = links + el.clientWidth;
    let von = 0;
    let bis = 0;
    karten.forEach((k, i) => {
      const k0 = k.offsetLeft - el.offsetLeft;
      const k1 = k0 + k.offsetWidth;
      const sichtbar = Math.min(k1, rechts) - Math.max(k0, links);
      if (sichtbar >= k.offsetWidth * 0.6) {
        if (von === 0) von = i + 1;
        bis = i + 1;
      }
    });
    if (von === 0) { von = 1; bis = 1; }
    setSicht({ von, bis, anfang: links <= 4, ende: links + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    messen();
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(messen);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [messen]);

  function schiebe(richtung: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const karte = el.children[0] as HTMLElement | undefined;
    const schritt = (karte?.getBoundingClientRect().width ?? 320) + 18;
    // Auf Desktop um eine volle Seite (alle sichtbaren Karten), auf dem Handy um eine Karte
    const proSeite = Math.max(1, Math.round(el.clientWidth / schritt));
    el.scrollBy({ left: richtung * schritt * proSeite, behavior: "smooth" });
  }

  const anteil = Math.round((sicht.bis / themen.length) * 100);

  return (
    <div className={styles.rondell} role="region" aria-roledescription="Karussell" aria-label={bereich}>
      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label={`${bereich}. Mit den Pfeiltasten nach links und rechts blättern.`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); schiebe(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); schiebe(-1); }
        }}
      >
        {themen.map((x, i) => (
          <li key={x.t} className={styles.karte}>
            <div className={styles.kopf} aria-hidden="true">
              {x.icon ? <span className={styles.icon}><ThemenIcon name={x.icon} /></span> : <span />}
              <span className={styles.nr}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3>{x.t}</h3>
            <p>{x.d}</p>
          </li>
        ))}
      </ul>
      <div className={styles.nav}>
        <div className={styles.knoepfe}>
          <button type="button" className={styles.btn} onClick={() => schiebe(-1)} disabled={sicht.anfang} aria-label="Vorherige Themen">‹</button>
          <button type="button" className={styles.btn} onClick={() => schiebe(1)} disabled={sicht.ende} aria-label="Nächste Themen">›</button>
        </div>
        <div className={styles.fortschritt} aria-hidden="true">
          <span style={{ width: `${anteil}%` }} />
        </div>
        <span className={styles.zaehler} aria-hidden="true">
          {sicht.von === sicht.bis ? sicht.bis : `${sicht.von} bis ${sicht.bis}`} von {themen.length}
        </span>
      </div>
    </div>
  );
}
