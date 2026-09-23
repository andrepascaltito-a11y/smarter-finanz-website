"use client";

import { useRef } from "react";

const CAL_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2qCAe4ZzdcDtamI_z-cK_WiMy5xoC37m87kU06hj_cw28Adfsl9l7wcXq4JB8rgQiZNvlMuIwO?gv=true";

export function TerminConsent() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  function loadCalendar() {
    if (frameRef.current) {
      frameRef.current.src = CAL_URL;
      frameRef.current.style.display = "block";
    }
    if (buttonRef.current) buttonRef.current.style.display = "none";
    if (textRef.current) textRef.current.style.display = "none";
  }

  return (
    <div className="cal-consent" id="cal-consent">
      <span className="eyebrow on-dark" style={{ justifyContent: "center" }}>
        Google Terminplanung
      </span>
      <p ref={textRef}>
        Für die Terminbuchung binden wir die <strong>Google-Terminplanung</strong> ein. Dabei
        wird eine Verbindung zu Google-Servern hergestellt und es können Cookies gesetzt werden.
        Mit „Kalender laden" stimmst du dem gemäß unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a> zu.
      </p>
      <button
        ref={buttonRef}
        className="btn btn-gold"
        style={{ alignItems: "center" }}
        onClick={loadCalendar}
      >
        Kalender laden &amp; Termin wählen
      </button>
      <iframe ref={frameRef} id="cal-frame" title="Terminbuchung Smarter Finanz" loading="lazy" />
      <p style={{ marginTop: "16px", fontSize: "13px" }}>
        <a
          href="https://calendar.app.google/r9puziwnCVcHJDLy5"
          target="_blank"
          rel="noopener"
        >
          Alternativ: Termin direkt bei Google buchen ↗
        </a>
      </p>
    </div>
  );
}

export function StandortMap() {
  const wrapRef = useRef<HTMLDivElement>(null);

  function loadMap() {
    if (wrapRef.current) {
      wrapRef.current.innerHTML =
        '<iframe title="Standort Smarter Finanz" width="100%" height="100%" style="border:0;min-height:300px" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=9.70%2C51.96%2C9.90%2C52.02&layer=mapnik&marker=51.985,9.80"></iframe>';
    }
  }

  return (
    <div className="map-wrap" id="map-consent" ref={wrapRef}>
      <div
        className="ph"
        style={{
          height: "100%",
          minHeight: "300px",
          borderStyle: "solid",
          borderColor: "#e7e2d4",
          background: "#eef1ec",
          color: "var(--muted)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Karte (OpenStreetMap) wird aus Datenschutzgründen erst nach deiner Zustimmung geladen.</span>
        <button
          className="btn btn-green"
          style={{ marginTop: "6px", alignItems: "center", padding: "10px 18px" }}
          onClick={loadMap}
        >
          Karte laden
        </button>
      </div>
    </div>
  );
}
