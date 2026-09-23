# Privatperson/Gewerbe-Formular Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die statische smarter-finanz-website auf Next.js umstellen und um ein zweigeteiltes Kontaktformular (Privatperson/Gewerbe) erweitern, das Anfragen ins bestehende EspoCRM (crm.fairkv.de) überträgt.

**Architecture:** Next.js App Router Projekt (gleicher Stack wie die FairKV-Website unter `/Users/andretito/Desktop/FairKV Webseite`). Die drei bestehenden Seiten werden 1:1 als React-Seiten nachgebaut. Ein neuer Formular-Bereich mit einer Weiche Privatperson/Gewerbe postet an eine neue API-Route, die je nach Zweig einen Lead oder einen Firmen-Account/Notiz in EspoCRM anlegt.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, kein Tailwind (die Seite hat ihr eigenes handgeschriebenes CSS mit CSS-Variablen), kein Framer Motion (nicht benötigt), `@upstash/ratelimit` + `@upstash/redis` für Rate-Limiting (optional konfiguriert, mit In-Memory-Fallback).

## Global Constraints

- Bestehende Inhalte (Hero, Stats, Manifesto, Services, Partners, Vorteile, Unternehmer, App, Einschätzung, Ueber, FAQ, Standort, Termin, Footer, Impressum, Datenschutz) werden **eins zu eins** übernommen, keine gestalterische Änderung, keine Textänderung.
- Referenz-Repo für Next.js-Konventionen: `/Users/andretito/Desktop/FairKV Webseite` (separates Projekt, NICHT importieren, nur als Vorbild lesen).
- Telefonnummern werden vor dem Versand an EspoCRM immer ins E.164-Format umgewandelt (`+49…`), das hat sich am 2026-09-23 bei der FairKV-Website als notwendig herausgestellt (EspoCRM lehnt andere Formate mit einer Validierungsfehlermeldung ab, die sonst unbemerkt bleibt).
- EspoCRM-Zugangsdaten (`ESPOCRM_API_URL`, `ESPOCRM_API_KEY`) werden ausschließlich als Vercel-Umgebungsvariable gesetzt, niemals im Repo oder im Code.
- Kein bezahlter bzw. neuer Traffic-Kanal ist Teil dieses Plans, das ist separat mit André zu besprechen.
- Dash-freies Schreiben in allen neu verfassten Kommentaren/Texten (keine stilistischen „–"/„—", Komma oder Punkt stattdessen).
- André zieht das Repo lokal von `~/Desktop/smarter-finanz-website`, alle Pfade in diesem Plan sind relativ dazu, sofern nicht anders angegeben.

---

### Task 1: Next.js-Grundgerüst

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Modify: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/globals.css` (nur Grundgerüst, Inhalt kommt in Task 2)

**Interfaces:**
- Produces: das Next.js-Projekt-Skelett, auf dem alle folgenden Tasks aufbauen. `app/layout.tsx` exportiert `RootLayout`, das `children: React.ReactNode` rendert.

- [ ] **Step 1: package.json anlegen**

```json
{
  "name": "smarter-finanz-website",
  "version": "1.0.0",
  "private": true,
  "description": "Smarter Finanz – Website mit Kontaktformular (Privatperson/Gewerbe)",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@upstash/ratelimit": "^2.0.8",
    "@upstash/redis": "^1.38.0",
    "next": "^15.5.19",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "typescript": "^5.6.3"
  }
}
```

- [ ] **Step 2: tsconfig.json anlegen**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: next.config.mjs anlegen**

Kein Meta-Pixel, keine externe Tracking-Domain nötig (anders als bei FairKV), daher eine einfache, strenge CSP ohne Facebook-Ausnahmen. Google Calendar/Maps werden per iframe eingebunden, daher `frame-src` entsprechend freigeben.

```javascript
/** @type {import('next').NextConfig} */

const isHttpsDeploy = process.env.VERCEL === "1";
const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devEval}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-src 'self' https://calendar.google.com https://*.google.com https://www.openstreetmap.org",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isHttpsDeploy ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isHttpsDeploy
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
```

- [ ] **Step 4: .gitignore ergänzen**

Bestehenden Inhalt von `.gitignore` lesen und um die Next.js-typischen Einträge ergänzen (nicht ersetzen, nur ergänzen):

```
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local
.env.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 5: app/layout.tsx anlegen (Grundgerüst, Inhalt der Kopfzeilen-Metadaten kommt aus dem bestehenden index.html-Head)**

Vor diesem Schritt `index.html` Zeilen 1 bis 30 lesen (Title, Meta-Description, OG-Tags, das `<script type="application/ld+json">`-Block mit dem InsuranceAgency-Schema, die Google-Fonts-Links für Cormorant Garamond/Inter/Jost). Diese Werte wortgleich übernehmen.

```tsx
import type { Metadata } from "next";

import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Smarter Finanz",
  description:
    "Unabhängige Finanz und Versicherungsberatung auf Augenhöhe im Raum Hannover.",
  url: "https://www.smarterfinanz.de/",
  telephone: "+49 170 8784889",
  email: "a.tito@smarterfinanz.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Glenetalstr. 101A",
    postalCode: "31061",
    addressLocality: "Alfeld",
    addressCountry: "DE",
  },
  areaServed: "Raum Hannover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smarterfinanz.de"),
  title: "Smarter Finanz – Finanzberatung auf Augenhöhe | Versicherungsmakler Raum Hannover",
  description:
    "Smarter Finanz: unabhängige Finanz und Versicherungsberatung im Raum Hannover. Weniger Steuern, klug Vermögen aufbauen, Versicherungen optimieren, ehrlich, transparent, auf Augenhöhe. Kostenloses Erstgespräch.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Smarter Finanz – Finanzberatung auf Augenhöhe",
    description:
      "Unabhängig, ehrlich, transparent: weniger Steuern, strategischer Vermögensaufbau und optimale Absicherung. Kostenloses Erstgespräch.",
    url: "https://www.smarterfinanz.de/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600;700&family=Jost:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: app/globals.css als leere Datei mit einem Platzhalter-Kommentar anlegen**

```css
/* Wird in Task 2 mit dem kompletten bestehenden Style-Block aus index.html gefuellt. */
```

- [ ] **Step 7: Abhängigkeiten installieren und Dev-Server prüfen**

```bash
npm install
npm run dev
```

Erwartet: Server startet ohne Fehler auf Port 3000, die Seite zeigt eine leere `<body>` (Inhalt kommt in Task 2). Danach Server mit Strg+C beenden.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs .gitignore app/layout.tsx app/globals.css
git commit -m "Next.js-Grundgeruest fuer die Website aufsetzen"
```

---

### Task 2: Bestehende Seiten migrieren (1:1)

**Files:**
- Create: `app/page.tsx`
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (Icon-Referenz statt Base64-Favicon direkt im Head, siehe Schritt 2)
- Read (nicht verändern): `index.html`, `impressum.html`, `datenschutz.html` (bleiben als Referenz im Repo liegen, werden am Ende dieses Tasks gelöscht, siehe letzter Schritt)

**Interfaces:**
- Produces: `app/page.tsx` exportiert die Startseiten-Komponente. Sie enthält alle bestehenden Sections (`hero`, `stats`, `manifesto`, `services`, `partners`, `vorteile`, `unternehmer`, `app`, `einschaetzung`, `ueber`, `faq`, `standort`, `termin`) sowie den Footer, alle mit denselben `className`-Werten wie im Original, damit `app/globals.css` sie unverändert stylt. Die Sections `standort` (Karte) und `termin` (Kalender) enthalten `"use client"`-Unterkomponenten für `loadMap`/`loadCalendar` (siehe Schritt 5). Task 6 fügt in diese Datei den neuen Formular-Bereich ein, ohne bestehende Sections zu entfernen.

- [ ] **Step 1: Kompletten `<style>`-Block aus index.html in app/globals.css übertragen**

`index.html` öffnen, den gesamten Inhalt zwischen `<style>` und `</style>` (beginnt bei `:root{` kurz nach Zeile 30, endet kurz vor `</style>` bei etwa Zeile 259, exakte Zeilen beim Lesen der Datei bestätigen) unverändert in `app/globals.css` einfügen. Kein Zeichen ändern, das ist reines CSS und braucht keine Konvertierung.

Am Ende von `app/globals.css` ergänzen (globaler Reset, den Next.js sonst nicht setzt):

```css
html, body {
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 2: Favicon als Datei statt Inline-Base64**

Das bestehende `<link rel="icon" ... href="data:image/png;base64,...">` in `index.html` Zeile 8 enthält ein Base64-PNG. Diesen Base64-String extrahieren und als `app/icon.png` speichern (per kleinem Einmal-Skript dekodieren, zum Beispiel `node -e "require('fs').writeFileSync('app/icon.png', Buffer.from('<base64-string-ohne-praefix>', 'base64'))"`). Next.js erkennt `app/icon.png` automatisch als Favicon, keine weitere Konfiguration in `layout.tsx` nötig. Der `<link rel="icon">`-Eintrag aus dem manuellen `<head>` in Task 1 Schritt 5 bleibt entfernt (war dort nicht gesetzt).

- [ ] **Step 3: app/page.tsx anlegen: Kopf- und Hero-Bereich**

`index.html` ab `<body>` (Zeile 260) bis einschließlich der `hero`-Section (Zeile 288 bis 303) lesen. Als JSX übertragen mit folgenden mechanischen Regeln, die für die gesamte restliche Migration gelten:

- `class="…"` wird zu `className="…"`
- `for="…"` wird zu `htmlFor="…"`
- Selbstschließende Tags ohne schließendes Pendant (`<img …>`, `<input …>`, `<br>`) bekommen einen Schrägstrich (`<img … />`)
- `style="key:value;key2:value2"` (Inline-Style-Strings) werden zu `style={{key: 'value', key2: 'value2'}}` (camelCase-Property-Namen, Werte als String)
- `onclick="funktionsname()"` wird zu `onClick={funktionsname}` (die Funktion muss dafür im selben Client-Component-Scope existieren, siehe Schritt 5)
- HTML-Kommentare (`<!-- … -->`) werden zu JSX-Kommentaren (`{/* … */}`) oder ganz entfernt, falls sie nur zur Gliederung dienten
- `&amp;`, `&auml;` und ähnliche HTML-Entities bleiben als Text unverändert (JSX rendert sie korrekt)
- SVG-Inline-Elemente (`<svg>…</svg>`) werden unverändert als JSX übernommen, nur `class` zu `className`

Kopf- und Navigationsbereich (`<header id="top">`, Zeilen 262 bis 286) sowie die `hero`-Section werden nach diesen Regeln direkt in `app/page.tsx` übertragen, als Teil einer Komponente `export default function HomePage()`.

- [ ] **Step 4: app/page.tsx fortsetzen: alle übrigen Sections bis Footer**

Nacheinander `stats` (304 bis 313), `manifesto` (314 bis 321), `services` (322 bis 354), `partners` (355 bis 373), `vorteile` (374 bis 396), `unternehmer` (397 bis 411, enthält das große Base64-Hintergrundbild im `style`-Attribut von `.u-bg`, dieses als String-Wert in `style={{backgroundImage: "url('data:image/webp;base64,…')"}}` übernehmen, keine Kürzung), `app` (412 bis 429), `einschaetzung` (430 bis 440), `ueber` (441 bis 454), `faq` (455 bis 466), `standort` (467 bis 489) und `termin` (490 bis 508) sowie den `<footer class="foot">` (ab Zeile 510 bis vor `</body>`) nach denselben Regeln übertragen. Jede Section bleibt in derselben Reihenfolge wie im Original.

- [ ] **Step 5: Client-Interaktivität für Karte und Kalender als eigene Komponente**

Erstellen: `components/InteractiveSections.tsx`

Die Handler `loadMap` und `loadCalendar` brauchen Zugriff auf den DOM und müssen deshalb in einer `"use client"`-Komponente leben. `index.html` Zeilen ab `function loadCalendar(){` bis `function loadMap(){…}` (im Script-Block kurz vor `</script>`, siehe die beiden Funktionskörper) exakt in dieses neue Modul übernehmen, als React-Refs statt `document.getElementById`:

```tsx
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
```

Die `CAL_URL`-Konstante oben ist bereits der echte Wert aus `index.html` Zeile 551, unverändert übernehmen.

In `app/page.tsx` werden die Original-Inhalte der `standort`-Section (der `<div class="map-wrap" id="map-consent">…</div>`-Teil) durch `<StandortMap />` ersetzt, und der `<div class="cal-consent" id="cal-consent">…</div>`-Teil der `termin`-Section durch `<TerminConsent />`. Der Rest beider Sections (Überschriften, umgebender Text, Kontakt-Card) bleibt als normales JSX in `app/page.tsx` bestehen.

Mobiles Menü (`document.querySelectorAll('.mobile-menu a')…` am Ende des Original-Scripts sowie der Burger-Button `onclick` in Zeile 275) ebenfalls in eine kleine `"use client"`-Komponente `components/MobileMenu.tsx` übertragen, mit `useState` für den offenen/geschlossenen Zustand statt direkter DOM-Manipulation:

```tsx
"use client";

import { useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen((v) => !v), close: () => setOpen(false) };
}
```

Diesen Hook in `app/page.tsx` im Header-Bereich verwenden, `style={{display: open ? 'flex' : 'none'}}` statt der ursprünglichen `document.getElementById('mm').style.display=…`-Zeile.

- [ ] **Step 6: impressum/page.tsx und datenschutz/page.tsx**

`impressum.html` und `datenschutz.html` vollständig lesen. Beide sind einfacher als `index.html` (keine Interaktivität, kein Formular), nur Kopf, Inhalt, Footer. Nach denselben Regeln wie in Schritt 3 als `app/impressum/page.tsx` und `app/datenschutz/page.tsx` übertragen, jeweils mit einem eigenen `export const metadata: Metadata = { title: "…" }` passend zum jeweiligen `<title>` aus dem Original-Head.

- [ ] **Step 7: Alten statischen Content entfernen**

```bash
git rm index.html impressum.html datenschutz.html
```

- [ ] **Step 8: Lokal prüfen**

```bash
npm run dev
```

Im Browser `http://localhost:3000/`, `http://localhost:3000/impressum` und `http://localhost:3000/datenschutz` öffnen. Gegen einen vorherigen Screenshot oder die GitHub-Historie der drei HTML-Dateien optisch vergleichen: Schriften, Farben, Bilder, FAQ-Akkordeon (Klick öffnet/schließt), „Karte laden" (zeigt danach die OpenStreetMap-Karte), „Kalender laden" (zeigt danach das Google-Calendar-iframe) müssen alle wie vorher funktionieren.

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx app/impressum/page.tsx app/datenschutz/page.tsx app/globals.css app/layout.tsx app/icon.png components/InteractiveSections.tsx components/MobileMenu.tsx
git commit -m "Bestehende Seiten 1:1 auf Next.js migrieren"
```

---

### Task 3: lib-Fundament (Typen, Consent, Rate-Limiting, Validierung)

**Files:**
- Create: `lib/types.ts`
- Create: `lib/consent.ts`
- Create: `lib/ratelimit.ts`
- Create: `lib/validation.ts`

**Interfaces:**
- Produces: `PrivatpersonPayload`, `GewerbePayload`, `LeadPayload` (Union der beiden) Typen aus `lib/types.ts`. `CONSENT_TEXT: string`, `CONSENT_VERSION: string` aus `lib/consent.ts`. `checkRateLimit(ip: string): Promise<boolean>` aus `lib/ratelimit.ts`. `isValidName`, `isValidEmail`, `isValidGermanPhone`, `toE164Phone`, `normalizePhone` aus `lib/validation.ts`. Diese Funktionen und Typen werden von Task 4, 5 und 6 konsumiert.

- [ ] **Step 1: lib/types.ts**

```typescript
// Zentrale Typdefinitionen fuer das Smarter-Finanz-Kontaktformular.

export type Thema =
  | "Steueroptimierung"
  | "Versicherungsvergleich"
  | "Altersvorsorge und Investment"
  | "Finanzierung und Umschuldung"
  | "Sonstiges";

interface BasisPayload {
  email: string;
  telefon: string;
  consent: boolean;
  // Server setzt diese Felder serverseitig, Client-Werte werden ignoriert.
  consentTimestamp?: string;
  consentTextVersion?: string;
  consentText?: string;
  // Anti-Spam (serverseitig ausgewertet, nicht weitergeleitet).
  hp?: string;
  formStartedAt?: number;
}

export interface PrivatpersonPayload extends BasisPayload {
  art: "privatperson";
  vorname: string;
  nachname: string;
  thema: Thema | null;
}

export interface GewerbePayload extends BasisPayload {
  art: "gewerbe";
  firmenname: string;
  ansprechpartnerVorname: string;
  ansprechpartnerNachname: string;
  branche: string;
}

export type LeadPayload = PrivatpersonPayload | GewerbePayload;
```

- [ ] **Step 2: lib/consent.ts**

```typescript
// Einwilligungstext und Versionierung, exakt wie im Formular angezeigt.
// Bei jeder inhaltlichen Aenderung des Textes die Version hochzaehlen, damit
// im CRM nachvollziehbar bleibt, welcher Wortlaut eingewilligt wurde.

export const CONSENT_VERSION = "smarterfinanz-consent-2026-09-v1";

export const CONSENT_TEXT =
  "Ja, ich moechte kostenlos und unverbindlich telefonisch, per E-Mail und per WhatsApp " +
  "beraten werden. Ich willige ein, dass Smarter Finanz mich dazu unter den angegebenen " +
  "Kontaktdaten kontaktiert. Diese Einwilligung kann ich jederzeit mit Wirkung fuer die " +
  "Zukunft widerrufen. Es gilt die Datenschutzerklaerung.";
```

- [ ] **Step 3: lib/ratelimit.ts**

Identisch zum bestehenden Muster bei FairKV (`/Users/andretito/Desktop/FairKV Webseite/lib/ratelimit.ts`), nur der Upstash-Prefix ist projektspezifisch:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Verteiltes Rate-Limiting ueber Upstash, aktiv sobald
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN gesetzt sind.
// Ohne Konfiguration greift ein In-Memory-Fallback (pro Server-Instanz,
// best effort), kombiniert mit Honeypot/Timing genuegt das als Baseline.

const WINDOW_MS = 60_000;
const LIMIT = 5; // Anfragen pro IP / 60 s

let upstash: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstash = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(LIMIT, "60 s"),
    prefix: "smarterfinanz:lead",
    analytics: false,
  });
}

const hits = new Map<string, number[]>();

function memoryLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length <= LIMIT;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!ip) return true;
  if (upstash) {
    try {
      const { success } = await upstash.limit(ip);
      return success;
    } catch {
      return memoryLimit(ip);
    }
  }
  return memoryLimit(ip);
}
```

- [ ] **Step 4: lib/validation.ts**

```typescript
// Validierungs-Helfer, geteilt zwischen Client (UI-Feedback) und Server (/api/lead).

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  const v = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s/().\-–]/g, "");
}

export function isValidGermanPhone(value: string): boolean {
  const n = normalizePhone(value);
  if (/^\+49\d{6,13}$/.test(n)) return true;
  if (/^0049\d{6,13}$/.test(n)) return true;
  if (/^0\d{6,13}$/.test(n)) return true;
  return false;
}

// Wandelt eine validierte deutsche Telefonnummer (0…, 0049… oder +49…) ins
// E.164-Format um (+49…), das EspoCRMs PhoneNumber-Feld verlangt. Ohne diese
// Umwandlung lehnt EspoCRM die Anfrage mit einem Validierungsfehler ab, den
// die Website nicht anzeigt (nur intern geloggt), siehe die FairKV-Website
// am 2026-09-23 fuer den Vorfall, der das aufgedeckt hat.
export function toE164Phone(value: string): string {
  let digits = normalizePhone(value).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("0049")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "49" + digits.slice(1);
  return `+${digits}`;
}
```

- [ ] **Step 5: Typprüfung**

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler (diese Dateien werden noch von niemandem importiert, reine Syntaxprüfung).

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts lib/consent.ts lib/ratelimit.ts lib/validation.ts
git commit -m "lib-Fundament fuer das Kontaktformular anlegen"
```

---

### Task 4: lib/espocrm.ts mit den zwei Zweigen

**Files:**
- Create: `lib/espocrm.ts`
- Test: `lib/espocrm.test.mjs` (einfaches Node-Assert-Skript, kein Test-Framework, siehe Begruendung in Task 7)

**Interfaces:**
- Consumes: `LeadPayload`, `PrivatpersonPayload`, `GewerbePayload` aus `lib/types.ts` (Task 3); `toE164Phone` aus `lib/validation.ts` (Task 3).
- Produces: `forwardToEspoCrm(payload: LeadPayload): Promise<void>`, konsumiert von Task 5 (`app/api/lead/route.ts`).

- [ ] **Step 1: lib/espocrm.ts**

```typescript
// Weiterleitung eines Formular-Eintrags ins EspoCRM. Aktiv sobald
// ESPOCRM_API_URL und ESPOCRM_API_KEY gesetzt sind, sonst No-op.
// Schlaegt nie hart fehl, Fehler werden im aufrufenden Handler geloggt.

import { toE164Phone } from "@/lib/validation";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload } from "@/lib/types";

// Andre (Admin) im Produktions-EspoCRM, dieselbe User-ID wie bei der
// FairKV-Website (lib/espocrm.ts dort, DEFAULT_ASSIGNED_USER_ID).
const DEFAULT_ASSIGNED_USER_ID = "6a4526fc06043f992";

function headersFor(apiKey: string): Record<string, string> {
  return { "Content-Type": "application/json", "X-Api-Key": apiKey };
}

async function forwardPrivatperson(
  base: string,
  headers: Record<string, string>,
  payload: PrivatpersonPayload,
): Promise<void> {
  const body = {
    firstName: payload.vorname,
    lastName: payload.nachname,
    emailAddress: payload.email,
    phoneNumber: toE164Phone(payload.telefon),
    assignedUserId: DEFAULT_ASSIGNED_USER_ID,
    description: payload.thema ? `Thema: ${payload.thema}` : null,
    // Dieselben drei Custom Fields, die auch die FairKV-Website auf dem
    // Lead-Entity befuellt (DSGVO-Nachweis, welcher Wortlaut wann eingewilligt wurde).
    consentZeitpunkt: payload.consentTimestamp,
    consentVersion: payload.consentTextVersion,
    consentText: payload.consentText,
  };
  const res = await fetch(`${base}/api/v1/Lead`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EspoCRM Lead antwortete mit ${res.status}: ${text.slice(0, 500)}`);
  }
}

// Sucht eine Firma per Namensfilter. "Eindeutig" bedeutet: genau ein Treffer,
// dieselbe Regel wie in Kais lade_firma (kai_crm.py im FairKV-OS-Vault).
async function findeEindeutigeFirma(
  base: string,
  headers: Record<string, string>,
  firmenname: string,
): Promise<string | null> {
  const params = new URLSearchParams({
    maxSize: "5",
    textFilter: firmenname,
    select: "id,name",
  });
  const res = await fetch(`${base}/api/v1/Account?${params.toString()}`, { headers });
  if (!res.ok) return null;
  const data = (await res.json()) as { list?: { id: string }[] };
  const treffer = data.list ?? [];
  return treffer.length === 1 ? treffer[0].id : null;
}

async function schreibeNotiz(
  base: string,
  headers: Record<string, string>,
  accountId: string,
  payload: GewerbePayload,
): Promise<void> {
  const text =
    `Website-Kontakt: ${payload.ansprechpartnerVorname} ${payload.ansprechpartnerNachname}, ` +
    `Telefon ${toE164Phone(payload.telefon)}, E-Mail ${payload.email}` +
    (payload.branche ? `, Branche: ${payload.branche}` : "") +
    ` (Einwilligung ${payload.consentTextVersion} am ${payload.consentTimestamp} erteilt)`;
  const res = await fetch(`${base}/api/v1/Note`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "Post",
      parentType: "Account",
      parentId: accountId,
      post: text,
    }),
  });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(`EspoCRM Note antwortete mit ${res.status}: ${bodyText.slice(0, 500)}`);
  }
}

async function legeNeueFirmaAn(
  base: string,
  headers: Record<string, string>,
  payload: GewerbePayload,
): Promise<string> {
  const body = {
    name: payload.firmenname,
    phoneNumber: toE164Phone(payload.telefon),
    emailAddress: payload.email,
    description: payload.branche ? `Branche: ${payload.branche}` : null,
    assignedUserId: DEFAULT_ASSIGNED_USER_ID,
  };
  const res = await fetch(`${base}/api/v1/Account`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EspoCRM Account antwortete mit ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = (await res.json()) as { id: string };
  return data.id;
}

async function forwardGewerbe(
  base: string,
  headers: Record<string, string>,
  payload: GewerbePayload,
): Promise<void> {
  const bestehendeId = await findeEindeutigeFirma(base, headers, payload.firmenname);
  const accountId = bestehendeId ?? (await legeNeueFirmaAn(base, headers, payload));
  await schreibeNotiz(base, headers, accountId, payload);
}

export async function forwardToEspoCrm(payload: LeadPayload): Promise<void> {
  const base = process.env.ESPOCRM_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.ESPOCRM_API_KEY;

  if (!base || !apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[lead] ESPOCRM_API_URL/ESPOCRM_API_KEY nicht gesetzt, CRM-Weiterleitung uebersprungen.",
      );
    }
    return;
  }

  const headers = headersFor(apiKey);
  if (payload.art === "privatperson") {
    await forwardPrivatperson(base, headers, payload);
  } else {
    await forwardGewerbe(base, headers, payload);
  }
}
```

- [ ] **Step 2: Typprüfung**

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler.

- [ ] **Step 3: Commit**

```bash
git add lib/espocrm.ts
git commit -m "EspoCRM-Anbindung mit Privatperson- und Gewerbe-Zweig bauen"
```

---

### Task 5: app/api/lead/route.ts

**Files:**
- Create: `app/api/lead/route.ts`

**Interfaces:**
- Consumes: `checkRateLimit` (Task 3), `CONSENT_TEXT`/`CONSENT_VERSION` (Task 3), `isValidName`/`isValidEmail`/`isValidGermanPhone` (Task 3), `forwardToEspoCrm` (Task 4), `LeadPayload`/`PrivatpersonPayload`/`GewerbePayload` (Task 3).
- Produces: `POST`-Handler unter `/api/lead`, konsumiert vom Formular aus Task 6.

- [ ] **Step 1: app/api/lead/route.ts**

```typescript
import { NextResponse } from "next/server";

import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/consent";
import { forwardToEspoCrm } from "@/lib/espocrm";
import { checkRateLimit } from "@/lib/ratelimit";
import { isValidEmail, isValidGermanPhone, isValidName } from "@/lib/validation";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000;

function tooLong(v: unknown, max: number): boolean {
  return typeof v === "string" && v.length > max;
}

function validatePrivatperson(body: Partial<PrivatpersonPayload>): string[] {
  const errors: string[] = [];
  if (!body.vorname || !isValidName(body.vorname)) errors.push("vorname ungueltig");
  if (!body.nachname || !isValidName(body.nachname)) errors.push("nachname ungueltig");
  if (tooLong(body.vorname, 80) || tooLong(body.nachname, 80)) errors.push("name zu lang");
  return errors;
}

function validateGewerbe(body: Partial<GewerbePayload>): string[] {
  const errors: string[] = [];
  if (!body.firmenname || !isValidName(body.firmenname)) errors.push("firmenname ungueltig");
  if (!body.ansprechpartnerVorname || !isValidName(body.ansprechpartnerVorname))
    errors.push("ansprechpartnerVorname ungueltig");
  if (!body.ansprechpartnerNachname || !isValidName(body.ansprechpartnerNachname))
    errors.push("ansprechpartnerNachname ungueltig");
  if (tooLong(body.firmenname, 150)) errors.push("firmenname zu lang");
  if (tooLong(body.branche, 150)) errors.push("branche zu lang");
  return errors;
}

function validate(body: Partial<LeadPayload>): string[] {
  const errors: string[] = [];
  if (body.art !== "privatperson" && body.art !== "gewerbe") errors.push("art ungueltig");
  if (!body.email || !isValidEmail(body.email)) errors.push("email ungueltig");
  if (!body.telefon || !isValidGermanPhone(body.telefon)) errors.push("telefon ungueltig");
  if (body.consent !== true) errors.push("consent fehlt (muss true sein)");
  if (tooLong(body.email, 254)) errors.push("email zu lang");
  if (tooLong(body.telefon, 32)) errors.push("telefon zu lang");

  if (body.art === "privatperson") errors.push(...validatePrivatperson(body));
  if (body.art === "gewerbe") errors.push(...validateGewerbe(body));

  return errors;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(req: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = (await req.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungueltiges JSON im Request-Body." },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte versuche es in einer Minute erneut." },
      { status: 429 },
    );
  }

  const honeypotFilled = typeof body.hp === "string" && body.hp.trim() !== "";
  const tooFast =
    typeof body.formStartedAt === "number" &&
    body.formStartedAt > 0 &&
    Date.now() - body.formStartedAt < MIN_FILL_MS;
  if (honeypotFilled || tooFast) {
    console.warn(
      `[lead] Verdaechtige Einsendung verworfen (${honeypotFilled ? "honeypot" : "timing"}).`,
    );
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Bitte ueberpruefe deine Eingaben.", errors },
      { status: 400 },
    );
  }

  const payload = { ...body } as LeadPayload;
  // Serverseitig kanonisiert: Client-Werte fuer Consent-Text/Version werden
  // ignoriert, Zeitpunkt ist der Empfang der Anfrage (Formular ist einstufig,
  // Checkbox-Klick und Absenden liegen praktisch im selben Moment).
  payload.consentText = CONSENT_TEXT;
  payload.consentTextVersion = CONSENT_VERSION;
  payload.consentTimestamp = new Date().toISOString();

  try {
    await forwardToEspoCrm(payload);
  } catch (err) {
    console.error(
      "[lead] EspoCRM-Weiterleitung fehlgeschlagen:",
      err instanceof Error ? err.message : err,
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Typprüfung**

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler.

- [ ] **Step 3: Lokaler manueller Test ohne EspoCRM-Zugangsdaten**

```bash
npm run dev
```

In einem zweiten Terminal:

```bash
curl -s -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"art":"privatperson","vorname":"Max","nachname":"Muster","email":"max@example.com","telefon":"01512345678","thema":"Steueroptimierung","consent":true,"formStartedAt":0}'
```

Erwartet: `{"ok":true}`, im Terminal des `npm run dev`-Prozesses erscheint die Warnung `ESPOCRM_API_URL/ESPOCRM_API_KEY nicht gesetzt` (weil lokal noch keine Zugangsdaten hinterlegt sind, das ist zu diesem Zeitpunkt korrekt).

- [ ] **Step 4: Commit**

```bash
git add app/api/lead/route.ts
git commit -m "API-Route fuer das Kontaktformular bauen"
```

---

### Task 6: Formular-UI mit der Weiche

**Files:**
- Create: `components/KontaktFormular.tsx`
- Modify: `app/page.tsx` (neue Section einfügen)
- Modify: `app/globals.css` (neue Formular-Styles ergänzen, passend zu den bestehenden CSS-Variablen)

**Interfaces:**
- Consumes: `LeadPayload`, `Thema` (Task 3), `POST /api/lead` (Task 5).
- Produces: `<KontaktFormular />`, eingebunden in `app/page.tsx` als neue Section `id="kontakt"`, direkt vor der bestehenden `termin`-Section.

- [ ] **Step 1: Formular-Styles zu app/globals.css hinzufügen**

Am Ende der Datei ergänzen, mit denselben CSS-Variablen wie der Rest der Seite (`--cream`, `--green`, `--gold`, `--radius`, `--sans` etc., siehe Task 2 Schritt 1):

```css
.kontakt-section{background:var(--cream-2);padding:96px 0}
.kontakt-tabs{display:flex;gap:12px;justify-content:center;margin-bottom:32px}
.kontakt-tab{font-family:var(--sans);font-weight:600;padding:12px 28px;border-radius:999px;border:1px solid #e7e2d4;background:#fff;cursor:pointer;color:var(--muted)}
.kontakt-tab.active{background:var(--green);color:var(--cream);border-color:var(--green)}
.kontakt-form{max-width:560px;margin:0 auto;display:grid;gap:16px}
.kontakt-form label{display:block;font-family:var(--sans);font-weight:600;font-size:14px;margin-bottom:6px;color:var(--text-dark)}
.kontakt-form input,.kontakt-form select{width:100%;padding:12px 14px;border-radius:10px;border:1px solid #e7e2d4;font-family:var(--sans);font-size:15px;background:#fff}
.kontakt-form .row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.kontakt-form .consent-row{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--muted)}
.kontakt-form .hp{position:absolute;left:-9999px}
.kontakt-form button[type="submit"]{margin-top:8px}
.kontakt-status{margin-top:16px;font-family:var(--sans);font-size:14px}
.kontakt-status.error{color:#b23a3a}
.kontakt-status.success{color:var(--emerald)}
```

- [ ] **Step 2: components/KontaktFormular.tsx**

```tsx
"use client";

import { useState } from "react";

import type { GewerbePayload, LeadPayload, PrivatpersonPayload, Thema } from "@/lib/types";

const THEMEN: Thema[] = [
  "Steueroptimierung",
  "Versicherungsvergleich",
  "Altersvorsorge und Investment",
  "Finanzierung und Umschuldung",
  "Sonstiges",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function KontaktFormular() {
  const [art, setArt] = useState<"privatperson" | "gewerbe">("privatperson");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [thema, setThema] = useState<Thema | "">("");
  const [firmenname, setFirmenname] = useState("");
  const [ansprechpartnerVorname, setAnsprechpartnerVorname] = useState("");
  const [ansprechpartnerNachname, setAnsprechpartnerNachname] = useState("");
  const [branche, setBranche] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const basis = { email, telefon, consent, hp, formStartedAt: startedAt };
    const payload: LeadPayload =
      art === "privatperson"
        ? ({
            ...basis,
            art: "privatperson",
            vorname,
            nachname,
            thema: thema || null,
          } satisfies PrivatpersonPayload)
        : ({
            ...basis,
            art: "gewerbe",
            firmenname,
            ansprechpartnerVorname,
            ansprechpartnerNachname,
            branche,
          } satisfies GewerbePayload);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    }
  }

  if (status === "success") {
    return (
      <p className="kontakt-status success">
        Danke für deine Anfrage. Wir melden uns in Kürze bei dir.
      </p>
    );
  }

  return (
    <div>
      <div className="kontakt-tabs">
        <button
          type="button"
          className={`kontakt-tab${art === "privatperson" ? " active" : ""}`}
          onClick={() => setArt("privatperson")}
        >
          Privatperson
        </button>
        <button
          type="button"
          className={`kontakt-tab${art === "gewerbe" ? " active" : ""}`}
          onClick={() => setArt("gewerbe")}
        >
          Unternehmer:in
        </button>
      </div>

      <form className="kontakt-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="hp"
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />

        {art === "privatperson" ? (
          <>
            <div className="row2">
              <div>
                <label htmlFor="vorname">Vorname</label>
                <input
                  id="vorname"
                  type="text"
                  required
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="nachname">Nachname</label>
                <input
                  id="nachname"
                  type="text"
                  required
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="thema">Thema</label>
              <select
                id="thema"
                value={thema}
                onChange={(e) => setThema(e.target.value as Thema)}
              >
                <option value="">Bitte wählen</option>
                {THEMEN.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="firmenname">Firmenname</label>
              <input
                id="firmenname"
                type="text"
                required
                value={firmenname}
                onChange={(e) => setFirmenname(e.target.value)}
              />
            </div>
            <div className="row2">
              <div>
                <label htmlFor="ap-vorname">Ansprechpartner Vorname</label>
                <input
                  id="ap-vorname"
                  type="text"
                  required
                  value={ansprechpartnerVorname}
                  onChange={(e) => setAnsprechpartnerVorname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ap-nachname">Ansprechpartner Nachname</label>
                <input
                  id="ap-nachname"
                  type="text"
                  required
                  value={ansprechpartnerNachname}
                  onChange={(e) => setAnsprechpartnerNachname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="branche">Branche</label>
              <input
                id="branche"
                type="text"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="row2">
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="telefon">Telefon</label>
            <input
              id="telefon"
              type="tel"
              required
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
            />
          </div>
        </div>

        <label className="consent-row">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            Ja, ich möchte kostenlos und unverbindlich kontaktiert werden. Es gilt die{" "}
            <a href="/datenschutz">Datenschutzerklärung</a>.
          </span>
        </label>

        <button type="submit" className="btn btn-gold" disabled={status === "submitting"}>
          {status === "submitting" ? "Wird gesendet…" : "Unverbindlich anfragen"}
        </button>

        {status === "error" && errorMessage && (
          <p className="kontakt-status error">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
```

- [ ] **Step 3: In app/page.tsx einbinden**

`KontaktFormular` importieren und eine neue Section direkt vor der bestehenden `<section className="termin section" id="termin">` einfügen:

```tsx
<section className="kontakt-section" id="kontakt">
  <div className="wrap">
    <span className="eyebrow" style={{ justifyContent: "center" }}>
      Unverbindliche Anfrage
    </span>
    <h2 style={{ textAlign: "center" }}>Lieber erst unverbindlich anfragen?</h2>
    <p className="lead" style={{ margin: "10px auto 32px", textAlign: "center" }}>
      Sag uns kurz, worum es geht, wir melden uns bei dir zurück.
    </p>
    <KontaktFormular />
  </div>
</section>
```

Bestehende Sections bleiben davon unberührt, nur die neue Section wird ergänzt.

- [ ] **Step 4: Lokal prüfen**

```bash
npm run dev
```

Im Browser beide Formular-Zweige durchklicken (Tab wechseln, Felder wechseln entsprechend), leeres Absenden testen (Browser-native Pflichtfeld-Validierung greift durch `required`), dann ein gültiges Beispiel absenden. Im Terminal erscheint wieder die Warnung ohne EspoCRM-Zugangsdaten, das ist zu diesem Zeitpunkt korrekt.

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler.

- [ ] **Step 5: Commit**

```bash
git add components/KontaktFormular.tsx app/page.tsx app/globals.css
git commit -m "Formular mit Privatperson/Gewerbe-Weiche in die Startseite einbauen"
```

---

### Task 7: Telefonnormalisierung absichern

Weder dieses Repo noch die FairKV-Website haben bisher ein JS/TS-Test-Framework (kein Jest, kein Vitest), Korrektheit wird dort über `tsc --noEmit` plus manuelle/echte End-to-End-Tests sichergestellt. Um diese Konvention nicht einseitig zu durchbrechen, wird hier kein neues Test-Framework eingeführt, sondern ein einfaches Node-Skript ohne Abhängigkeiten, das bei jedem Bedarf manuell ausgeführt werden kann.

**Files:**
- Create: `lib/validation.check.mjs`

**Interfaces:**
- Consumes: dieselbe Logik wie `toE164Phone` in `lib/validation.ts` (dupliziert als reines JS, da `.mjs` kein TypeScript direkt ausführen kann ohne zusätzliches Tooling, das hier nicht eingeführt werden soll).

- [ ] **Step 1: lib/validation.check.mjs**

```javascript
// Einfache Konsistenzpruefung fuer toE164Phone, ohne Test-Framework
// (Konvention in diesem und im FairKV-Repo: kein Jest/Vitest).
// Aufruf: node lib/validation.check.mjs

function normalizePhone(value) {
  return value.replace(/[\s/().\-–]/g, "");
}

function toE164Phone(value) {
  let digits = normalizePhone(value).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("0049")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "49" + digits.slice(1);
  return `+${digits}`;
}

const faelle = [
  ["01512345678", "+491512345678"],
  ["0049 151 2345678", "+491512345678"],
  ["+49 151 2345678", "+491512345678"],
  ["0151-234-5678", "+491512345678"],
];

let fehler = 0;
for (const [eingabe, erwartet] of faelle) {
  const ergebnis = toE164Phone(eingabe);
  if (ergebnis !== erwartet) {
    fehler += 1;
    console.error(`FEHLER: toE164Phone(${JSON.stringify(eingabe)}) = ${ergebnis}, erwartet ${erwartet}`);
  }
}

if (fehler === 0) {
  console.log(`Alle ${faelle.length} Faelle bestanden.`);
  process.exit(0);
} else {
  console.error(`${fehler} von ${faelle.length} Faellen fehlgeschlagen.`);
  process.exit(1);
}
```

- [ ] **Step 2: Ausführen**

```bash
node lib/validation.check.mjs
```

Erwartet: `Alle 4 Faelle bestanden.`, Exit-Code 0.

- [ ] **Step 3: Commit**

```bash
git add lib/validation.check.mjs
git commit -m "Konsistenzpruefung fuer die Telefonnummer-Normalisierung ergaenzen"
```

---

### Task 8: EspoCRM-Konfiguration, Vercel-Env-Vars und End-to-End-Livetest

Dieser Task ist kein Code-Task, sondern eine Anleitung für André, die vor dem Livegang manuell durchgeführt werden muss, plus ein abschließender echter Test. Kein Schritt darf übersprungen werden, das war der entscheidende Schritt, der am 2026-09-23 bei der FairKV-Website zwei echte, monatelang unbemerkte Bugs aufgedeckt hat.

- [ ] **Step 1: Vercel-Projekt mit Next.js verbinden**

Auf vercel.com im Projekt `smarter-finanz-website` unter Settings prüfen, dass das Framework-Preset automatisch als "Next.js" erkannt wird (Vercel erkennt das an `package.json`/`next.config.mjs` automatisch beim nächsten Push). Kein manueller Schritt nötig, nur zur Kontrolle nach dem ersten Deploy gegenprüfen.

- [ ] **Step 2: Dedizierten EspoCRM-API-Benutzer anlegen**

Auf crm.fairkv.de als Admin einloggen. Administration → API-Benutzer → Neuer API-Benutzer:
- Benutzername: `smarterfinanz-lead`
- Authentifizierungsmethode: API-Schlüssel
- Rolle: neue Rolle anlegen (Administration → Rollen → Neue Rolle), Name `SmarterFinanz-Lead`, mit folgenden Einstellungen im Berechtigungsumfang:
  - Lead: Erstellen = Ja, Lesen = Alle
  - Firmen (Account): Erstellen = Ja, Lesen = Alle, Bearbeiten = Nein, Löschen = Nein
  - Notiz (Note): Erstellen = Ja, Lesen = Alle
  - Benutzer (User): Lesen = Alle
- Bei den allgemeinen Berechtigungen oben auf der Rollen-Seite: Berechtigung Zuweisung = Alle (sonst schlägt die Zuweisung an André mit „Assignment failure" fehl, das war der zweite Bug bei der FairKV-Website)
- Speichern, danach beim API-Benutzer die Rolle `SmarterFinanz-Lead` zuweisen und speichern
- Den angezeigten API-Schlüssel kopieren

- [ ] **Step 3: Vercel-Umgebungsvariablen setzen**

Im Vercel-Projekt `smarter-finanz-website` unter Settings → Environment Variables, Umgebung "Production and Preview":
- `ESPOCRM_API_URL` = `https://crm.fairkv.de`
- `ESPOCRM_API_KEY` = der in Schritt 2 kopierte Schlüssel

- [ ] **Step 4: Deployen**

```bash
git push origin main
```

Auf vercel.com im Projekt die Deployment-Liste beobachten, bis der neue Build den Status „Ready" zeigt.

- [ ] **Step 5: Echter End-to-End-Test, Privatperson-Zweig**

Von einem beliebigen Rechner mit Terminal-Zugriff:

```bash
curl -s -w "\nHTTP-Status: %{http_code}\n" -X POST https://www.smarterfinanz.de/api/lead \
  -H "Content-Type: application/json" \
  -d '{"art":"privatperson","vorname":"Systemtest","nachname":"Privatperson","email":"systemtest-privat@example.com","telefon":"01512345678","thema":"Steueroptimierung","consent":true,"formStartedAt":0}'
```

Erwartet: `{"ok":true}`, HTTP-Status 200. Danach in crm.fairkv.de unter Interessenten (Lead) nach "Systemtest Privatperson" suchen, prüfen dass Telefonnummer im Format `+491512345678` gespeichert ist und der Lead André zugewiesen ist. Testeintrag danach über das Web-UI löschen (Drei-Punkte-Menü → Löschen).

- [ ] **Step 6: Echter End-to-End-Test, Gewerbe-Zweig ohne bestehende Firma**

```bash
curl -s -w "\nHTTP-Status: %{http_code}\n" -X POST https://www.smarterfinanz.de/api/lead \
  -H "Content-Type: application/json" \
  -d '{"art":"gewerbe","firmenname":"Systemtest Gewerbe GmbH","ansprechpartnerVorname":"Max","ansprechpartnerNachname":"Muster","branche":"Test","email":"systemtest-gewerbe@example.com","telefon":"01512345678","consent":true,"formStartedAt":0}'
```

Erwartet: `{"ok":true}`. In crm.fairkv.de unter Firmen nach "Systemtest Gewerbe GmbH" suchen, prüfen dass eine neue Firma mit korrektem Telefonformat und einer Notiz mit dem Präfix "Website-Kontakt:" angelegt wurde. Firma danach löschen.

- [ ] **Step 7: Echter End-to-End-Test, Gewerbe-Zweig mit bestehender Firma**

Eine echte, bereits im CRM vorhandene Firma aus den 21.341 kuratierten Firmen für den Test verwenden (zum Beispiel eine, die André kennt), exakten Namen aus dem CRM kopieren:

```bash
curl -s -w "\nHTTP-Status: %{http_code}\n" -X POST https://www.smarterfinanz.de/api/lead \
  -H "Content-Type: application/json" \
  -d '{"art":"gewerbe","firmenname":"<echter Firmenname aus dem CRM>","ansprechpartnerVorname":"Max","ansprechpartnerNachname":"Muster","branche":"Test","email":"systemtest-bestehend@example.com","telefon":"01512345678","consent":true,"formStartedAt":0}'
```

Erwartet: `{"ok":true}`. In crm.fairkv.de bei genau dieser Firma prüfen, dass eine neue Notiz mit dem Präfix "Website-Kontakt:" in der Historie erscheint und **keine** zweite, doppelte Firma angelegt wurde. Testnotiz danach löschen.

- [ ] **Step 8: Ergebnis dokumentieren**

Ergebnis dieser drei Tests (bestanden/fehlgeschlagen, mit Datum) in einer kurzen Notiz im Repo festhalten:

Erstellen: `docs/superpowers/plans/2026-09-23-gewerbe-privat-formular-livetest.md`

```markdown
# Livetest-Ergebnis: Privatperson/Gewerbe-Formular

Datum: <Datum des Tests>

- Privatperson-Zweig: <bestanden/fehlgeschlagen, ggf. Details>
- Gewerbe-Zweig ohne bestehende Firma: <bestanden/fehlgeschlagen, ggf. Details>
- Gewerbe-Zweig mit bestehender Firma: <bestanden/fehlgeschlagen, ggf. Details>

Alle Testeintraege wurden nach der Verifikation wieder aus dem CRM entfernt.
```

```bash
git add docs/superpowers/plans/2026-09-23-gewerbe-privat-formular-livetest.md
git commit -m "Livetest-Ergebnis fuer das Kontaktformular dokumentieren"
git push origin main
```

---

### Task 9: E-Mail-Benachrichtigung bei Gewerbe-Anfragen

Ergaenzung nach dem finalen Whole-Branch-Review vom 2026-09-23: eine Gewerbe-Anfrage erzeugt bisher nur eine Notiz an einer von 21.341 Firmen oder eine neue, unauffaellige Firma, ohne dass Andre das bemerkt. Andre hat sich fuer eine E-Mail-Benachrichtigung per bestehendem Gmail-Konto (SMTP, kein neuer Dienst) entschieden. Dieser Task muss vor dem Livetest in Task 8 erledigt sein.

**Files:**
- Create: `lib/mailer.ts`
- Modify: `app/api/lead/route.ts`

**Interfaces:**
- Consumes: `GewerbePayload` aus `lib/types.ts`.
- Produces: `sendGewerbeBenachrichtigung(payload: GewerbePayload): Promise<void>`, aufgerufen aus der Route nach einem erfolgreichen `forwardToEspoCrm`-Aufruf im Gewerbe-Zweig.

- [ ] **Step 1: nodemailer als Abhaengigkeit ergaenzen**

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

- [ ] **Step 2: lib/mailer.ts**

```typescript
// Benachrichtigungs-Mail bei einer Gewerbe-Anfrage, per Gmail-SMTP mit dem
// bestehenden Konto. Aktiv sobald SMTP_USER und SMTP_APP_PASSWORD gesetzt
// sind, sonst No-op (gleiches Muster wie forwardToEspoCrm).

import nodemailer from "nodemailer";

import type { GewerbePayload } from "@/lib/types";

export async function sendGewerbeBenachrichtigung(payload: GewerbePayload): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  const to = process.env.NOTIFY_EMAIL_TO || user;

  if (!user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[mailer] SMTP_USER/SMTP_APP_PASSWORD nicht gesetzt, Benachrichtigung uebersprungen.",
      );
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const text =
    `Neue Gewerbe-Anfrage ueber die Website.\n\n` +
    `Firma: ${payload.firmenname}\n` +
    `Ansprechpartner: ${payload.ansprechpartnerVorname} ${payload.ansprechpartnerNachname}\n` +
    `Telefon: ${payload.telefon}\n` +
    `E-Mail: ${payload.email}\n` +
    (payload.branche ? `Branche: ${payload.branche}\n` : "");

  await transporter.sendMail({
    from: user,
    to,
    subject: `Neue Gewerbe-Anfrage: ${payload.firmenname}`,
    text,
  });
}
```

- [ ] **Step 3: In app/api/lead/route.ts einbinden**

`sendGewerbeBenachrichtigung` importieren. Direkt nach dem bestehenden `try { await forwardToEspoCrm(payload); } catch (...) {...}`-Block ergaenzen: wenn `payload.art === "gewerbe"`, `sendGewerbeBenachrichtigung(payload)` aufrufen, ebenfalls in einem eigenen try/catch, das einen Fehler nur loggt und niemals die Antwort an den Besucher beeinflusst (exakt dasselbe Fehlerbehandlungs-Prinzip wie bei `forwardToEspoCrm`). Die E-Mail wird unabhaengig davon verschickt, ob die CRM-Weiterleitung geklappt hat, ein CRM-Fehler soll die Benachrichtigung nicht verhindern.

```typescript
if (payload.art === "gewerbe") {
  try {
    await sendGewerbeBenachrichtigung(payload);
  } catch (err) {
    console.error(
      "[lead] Gewerbe-Benachrichtigung fehlgeschlagen:",
      err instanceof Error ? err.message : err,
    );
  }
}
```

- [ ] **Step 4: Typpruefung**

```bash
npx tsc --noEmit
```

Erwartet: keine Fehler.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json lib/mailer.ts app/api/lead/route.ts
git commit -m "E-Mail-Benachrichtigung bei Gewerbe-Anfragen per Gmail-SMTP ergaenzen"
```

NICHT pushen.

- [ ] **Step 6: Manuelle Vercel-Konfiguration (Teil von Andres Schritten in Task 8)**

Andre generiert in seinem Google-Konto ein App-Passwort (Google-Konto, Sicherheit, App-Passwoerter, setzt 2FA voraus) und setzt in Vercel unter dem Projekt `smarter-finanz-website`, Umgebung "Production and Preview":
- `SMTP_USER` = die Absender-Gmail-Adresse (z.B. a.tito@smarterfinanz.de, falls das ueber Gmail laeuft, sonst das tatsaechlich genutzte Gmail-Konto)
- `SMTP_APP_PASSWORD` = das generierte App-Passwort
- `NOTIFY_EMAIL_TO` = die Zieladresse fuer die Benachrichtigung (kann gleich `SMTP_USER` sein)

Diese drei Werte niemals ins Repo, nur als Vercel-Umgebungsvariable.
