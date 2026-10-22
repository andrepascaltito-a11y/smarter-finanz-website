// Erzeugt die Erstinformation als PDF-Anhang fuer die Bestaetigungsmail (Du- und Sie-Fassung) und legt sie
// als Base64 in lib/erstinformation-pdf.generated.ts ab. So braucht der Mailversand zur Laufzeit weder Dateisystem
// noch PDF-Bibliothek.
//
// Quelle der Wahrheit bleibt der Text in lib/erstinformation.ts (ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE).
// Jede Aenderung an dieser Datei (auch Kommentare) verlangt einen neuen Lauf, sonst bricht der Build ab.
//   node scripts/erstinformation-pdf.mjs             PDF neu erzeugen (braucht Google Chrome und Node 22.18+ auf dem Mac)
//   node scripts/erstinformation-pdf.mjs --pruefen   nur pruefen, ob die PDFs zum aktuellen Text passen (laeuft im prebuild)
// Aendert sich der Text, bricht der Build ab, bis die PDFs neu erzeugt und mit committet sind.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ZIEL = new URL("../lib/erstinformation-pdf.generated.ts", import.meta.url);
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Hash ueber die Quelldatei (nicht ueber den ausgewerteten Text), damit die Pruefung im Build ohne TypeScript-Import
// auskommt und auf jeder Node-Version laeuft.
const quellHash = createHash("sha256").update(readFileSync(new URL("../lib/erstinformation.ts", import.meta.url))).digest("hex");

if (process.argv.includes("--pruefen")) {
  let alt = "";
  try {
    alt = readFileSync(ZIEL, "utf-8").match(/ERSTINFO_PDF_QUELLE_HASH = "([0-9a-f]+)"/)?.[1] ?? "";
  } catch {
    /* Datei fehlt */
  }
  const quelle = (() => {
    try {
      return readFileSync(ZIEL, "utf-8");
    } catch {
      return "";
    }
  })();
  // Die eingebetteten PDFs muessen echte PDFs sein (sonst hinge ein kaputter Anhang an der Mail)
  for (const art of ["privatperson", "gewerbe"]) {
    const b64 = quelle.match(new RegExp(`${art}: "([A-Za-z0-9+/=]+)"`))?.[1] ?? "";
    const bytes = Buffer.from(b64, "base64");
    if (bytes.length < 5000 || bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
      console.error(`\nBUILD ABGEBROCHEN: Das eingebettete PDF (${art}) in lib/erstinformation-pdf.generated.ts ist leer oder kein PDF.\nNeu erzeugen mit: node scripts/erstinformation-pdf.mjs\n`);
      process.exit(1);
    }
  }
  if (alt !== quellHash) {
    console.error(
      "\nBUILD ABGEBROCHEN: Der Text der Erstinformation (lib/erstinformation.ts) hat sich geaendert, das PDF fuer die\n" +
        "Bestaetigungsmail nicht. Auf dem Mac `node scripts/erstinformation-pdf.mjs` ausfuehren und lib/erstinformation-pdf.generated.ts\n" +
        "mit committen. Das PDF und die Website muessen denselben Wortlaut haben.\n",
    );
    process.exit(1);
  }
  process.exit(0);
}

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Registernummern (D-JOOT-NRHZP-02 u. a.) nicht am Bindestrich umbrechen
    .replace(/\bD-[A-Z0-9]+(?:-[A-Z0-9]+)+/g, (m) => `<span style="white-space:nowrap">${m}</span>`);

// Text in Bloecke zerlegen: Begruessung (wird verworfen), Einleitung mit Link, Stand-Zeile, nummerierte Abschnitte, Hinweis, Gruss.
function zerlegen(text) {
  const bloecke = text.trim().split(/\n\s*\n/);
  const abschnitte = [];
  let einleitung = "";
  let url = "";
  let stand = "";
  let hinweis = "";
  for (const b of bloecke) {
    const zeilen = b.split("\n");
    const kopf = zeilen[0].match(/^(\d+)\.\s+(.+)$/);
    if (kopf) {
      abschnitte.push({ nr: kopf[1], titel: kopf[2], zeilen: zeilen.slice(1) });
    } else if (/^Zu Beginn unseres Kontakts/.test(b)) {
      einleitung = zeilen[0].replace(/\s*(Du findest|Sie finden) die Erstinformation dauerhaft hier:$/, "").trim();
      url = zeilen.find((z) => z.startsWith("http")) ?? "";
    } else if (/^Zur Dokumentation/.test(b)) {
      stand = b.match(/Stand ([0-9.]+)/)?.[1] ?? "";
    } else if (/^(Du hast|Sie haben) der Bereitstellung/.test(b)) {
      hinweis = b.replace(/\n/g, " ");
    }
  }
  if (!einleitung || !stand || abschnitte.length < 8 || !hinweis) throw new Error("Textstruktur der Erstinformation nicht erkannt");
  return { einleitung, url, stand, abschnitte, hinweis };
}

function html({ einleitung, url, stand, abschnitte, hinweis }) {
  const ab = abschnitte
    .map((a) => {
      const punkte = a.zeilen.filter((z) => z.startsWith("- "));
      const fliess = a.zeilen.filter((z) => !z.startsWith("- ")).join(" ");
      return `<section><h2><span>${a.nr}</span>${esc(a.titel)}</h2>${fliess ? `<p>${esc(fliess)}</p>` : ""}${
        punkte.length ? `<ul>${punkte.map((p) => `<li>${esc(p.slice(2))}</li>`).join("")}</ul>` : ""
      }</section>`;
    })
    .join("\n");
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Erstinformation nach § 15 VersVermV mit Angaben zu Finanzanlagen und Immobiliardarlehen | Smarter Finanz</title>
<style>
@page{size:A4;margin:16mm 18mm 22mm;@bottom-left{content:"Smarter Finanz · André Pascal Tito · Glenetalstraße 101 A · 31061 Alfeld (Leine)";font:7.5pt Helvetica,Arial,sans-serif;color:#5c6b62}@bottom-right{content:"Seite " counter(page) " von " counter(pages);font:7.5pt Helvetica,Arial,sans-serif;color:#5c6b62}}
*{box-sizing:border-box}
body{font:10pt/1.55 "Helvetica Neue",Helvetica,Arial,sans-serif;color:#16281f;margin:0}
.kopf{background:#0E2A1E;color:#F5F2E9;border-radius:10px;padding:16pt 20pt;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.marke{font:600 21pt Georgia,"Times New Roman",serif;color:#E4C15C;letter-spacing:.2pt}
.marke small{display:block;font:600 6.5pt Helvetica,Arial,sans-serif;letter-spacing:2.4pt;color:#c8d6cd;margin-top:2pt}
.stand{font-size:8.5pt;color:#c8d6cd;text-align:right}
h1{font:600 26pt/1.1 Georgia,"Times New Roman",serif;color:#0E2A1E;margin:22pt 0 4pt}
.sub{font-size:9pt;letter-spacing:1.6pt;text-transform:uppercase;color:#C9A227;font-weight:600;margin:0 0 12pt}
.einl{margin:0 0 4pt;font-size:10.5pt}
.url{margin:0 0 14pt;color:#2E7050;font-size:9.5pt;word-break:break-all}
section{break-inside:avoid;border-top:1px solid #e3ddc9;padding:9pt 0 5pt}
h2{font:600 13.5pt/1.2 Georgia,"Times New Roman",serif;color:#0E2A1E;margin:0 0 4pt;display:flex;align-items:baseline;gap:9pt}
h2 span{display:inline-block;min-width:17pt;height:17pt;border-radius:50%;background:#E4C15C;color:#0E2A1E;font:700 8.5pt/17pt Helvetica,Arial,sans-serif;text-align:center;-webkit-print-color-adjust:exact;print-color-adjust:exact}
section p{margin:0 0 4pt;padding-left:26pt}
ul{margin:2pt 0 4pt;padding-left:44pt}
li{margin:0 0 3pt}
.hinweis{margin-top:12pt;padding:10pt 14pt;background:#F5F2E9;border-left:3pt solid #E4C15C;font-size:9.5pt;break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact}
</style></head><body>
<div class="kopf"><div class="marke">Smarter Finanz<small>VERSICHERUNGSMAKLER</small></div><div class="stand">Stand ${esc(stand)}</div></div>
<h1>Erstinformation</h1>
<p class="sub">nach § 15 VersVermV, § 12 FinVermV, Art. 247 EGBGB · Status, Vergütung, Register, Schlichtung</p>
<p class="einl">${esc(einleitung)}</p>
${url ? `<p class="url">Dauerhaft abrufbar: ${esc(url)}</p>` : ""}
${ab}
<p class="hinweis">${esc(hinweis)}</p>
</body></html>`;
}

function pdfErzeugen(text, dateiname) {
  const ordner = mkdtempSync(join(tmpdir(), "erstinfo-"));
  try {
    const quelle = join(ordner, `${dateiname}.html`);
    const ziel = join(ordner, `${dateiname}.pdf`);
    writeFileSync(quelle, html(zerlegen(text)), "utf-8");
    execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${ziel}`, pathToFileURL(quelle).href], { stdio: "pipe" });
    return readFileSync(ziel);
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
}

const { ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE } = await import(new URL("../lib/erstinformation.ts", import.meta.url).href);
const seiten = (pdf) => (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
const du = pdfErzeugen(ERSTINFO_MAIL_TEXT, "du");
const sie = pdfErzeugen(ERSTINFO_MAIL_TEXT_SIE, "sie");

writeFileSync(
  ZIEL,
  `// GENERIERT von scripts/erstinformation-pdf.mjs, nicht von Hand bearbeiten.
// Quelle: lib/erstinformation.ts (ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE). Der Build prueft den Hash im prebuild.

export const ERSTINFO_PDF_QUELLE_HASH = "${quellHash}";
export const ERSTINFO_PDF_DATEINAME = "Erstinformation-Smarter-Finanz.pdf";
export const ERSTINFO_PDF_SEITEN = { privatperson: ${seiten(du)}, gewerbe: ${seiten(sie)} } as const;
export const ERSTINFO_PDF_BASE64 = {
  privatperson: "${du.toString("base64")}",
  gewerbe: "${sie.toString("base64")}",
} as const;
`,
  "utf-8",
);
console.log(`PDF erzeugt: Du ${(du.length / 1024).toFixed(0)} KB, Sie ${(sie.length / 1024).toFixed(0)} KB. Hash ${quellHash.slice(0, 12)}.`);
