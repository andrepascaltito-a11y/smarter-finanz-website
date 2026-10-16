// Baut die Begruessungsmail (HTML mit Text-Alternative) aus den Texten in lib/begruessung-texte.ts.
// Mail-Clients vertragen kein modernes CSS: Tabellenlayout, Inline-Styles, Systemschriften.
// Aufbau und Textfassung folgen Mias Vorgaben (Vault 03-Marketing/Content/Mia-Danke-Seite-und-Hero-2026-10-16.md, C.3).

import type { BegruessungText } from "@/lib/begruessung-texte";
import { ERSTINFO_URL } from "@/lib/erstinformation";
import { ERSTINFO_PDF_DATEINAME, ERSTINFO_PDF_SEITEN } from "@/lib/erstinformation-pdf.generated";

const BASIS = "https://www.smarterfinanz.de";
const GRUEN = "#0E2A1E";
const GOLD = "#E4C15C";
const CREME = "#F5F2E9";
const TEXT = "#16281f";
const MUTED = "#5c6b62";
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Escaped Text; Registernummern nicht am Bindestrich umbrechen, nackte Webadressen werden zu Links.
function auszeichnen(s: string, linkFarbe = TEXT): string {
  return esc(s)
    .replace(/https?:\/\/[^\s<]+/g, (u) => {
      const url = u.replace(/[.,;:)]+$/, "");
      const rest = u.slice(url.length);
      return `<a href="${url}" style="color:${linkFarbe};text-decoration:underline">${url}</a>${rest}`;
    })
    .replace(/\bD-[A-Z0-9]+(?:-[A-Z0-9]+)+/g, (m) => `<span style="white-space:nowrap">${m}</span>`);
}

export function baueBegruessungsMail(
  t: BegruessungText,
  art: "privatperson" | "gewerbe",
  mitAngaben = false,
): { subject: string; text: string; html: string } {
  const absatz2 = mitAngaben && t.absatz2MitAngaben ? t.absatz2MitAngaben : t.absatz2;
  const seiten: number = ERSTINFO_PDF_SEITEN[art];
  const anhang = `${ERSTINFO_PDF_DATEINAME} (${seiten} ${seiten === 1 ? "Seite" : "Seiten"})`;
  const [name, rolle, telefon, mail] = t.signatur;
  const [fussGrund, fussAnschrift, fussLinks] = t.fusszeile;

  const p = (inhalt: string, extra = "") => `<p style="margin:0 0 16px;font:16px/1.65 ${SANS};color:${TEXT};${extra}">${inhalt}</p>`;

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(t.betreff)}</title></head>
<body style="margin:0;padding:0;background:${CREME}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${CREME}">${esc(t.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREME}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:${GRUEN};padding:26px 32px">
  <div style="font:600 26px/1.1 ${SERIF};color:${GOLD}">Smarter Finanz</div>
  <div style="font:600 10px/1.4 ${SANS};letter-spacing:3px;color:#c8d6cd;margin-top:4px">VERSICHERUNGSMAKLER</div>
</td></tr>
<tr><td style="padding:34px 32px 8px">
  ${p(esc(t.anrede), "margin-bottom:10px;color:" + MUTED)}
  <h1 style="margin:0 0 18px;font:600 32px/1.12 ${SERIF};color:${GRUEN}">${esc(t.h1)}</h1>
  ${p(esc(t.absatz1))}
  ${p(esc(absatz2))}
  ${p(esc(t.absatz3))}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0 6px"><tr><td style="background:${CREME};border-left:4px solid ${GOLD};border-radius:6px;padding:20px 22px">
    <div style="font:600 18px/1.3 ${SERIF};color:${GRUEN};margin:0 0 8px">${esc(t.box.titel)}</div>
    <div style="font:15px/1.6 ${SANS};color:${TEXT}">${auszeichnen(t.box.text)}</div>
    <div style="font:13px/1.55 ${SANS};color:${MUTED};margin-top:12px">${esc(t.box.pflichtsatz)}</div>
    <div style="font:12px/1.5 ${SANS};color:${MUTED};margin-top:6px">${esc(t.box.stand)}</div>
    <div style="margin-top:14px;font:600 13px/1.4 ${SANS};color:${GRUEN};background:#fff;border:1px solid #e3ddc9;border-radius:8px;padding:9px 12px;display:inline-block"><span style="background:${GOLD};color:#3a2e07;border-radius:4px;padding:2px 6px;font-size:11px;letter-spacing:1px;margin-right:8px">PDF</span>${esc(anhang)}</div>
    <div style="margin-top:16px"><a href="${ERSTINFO_URL}" style="display:inline-block;background:${GOLD};color:#3a2e07;text-decoration:none;font:600 15px/1 ${SANS};padding:13px 22px;border-radius:10px">${esc(t.button)}</a></div>
  </td></tr></table>
  <p style="margin:22px 0 0;font:15px/1.6 ${SANS};color:${MUTED}"><strong style="color:${TEXT}">${esc(t.vorbereiten.label)}.</strong> ${esc(t.vorbereiten.text)}</p>
</td></tr>
<tr><td style="padding:22px 32px 30px">
  ${p(esc(t.schluss), "margin-bottom:18px")}
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td valign="top" style="padding-right:16px"><img src="${BASIS}/andre-tito.jpg" width="72" height="90" alt="${esc(t.fotoAlt)}" style="display:block;width:72px;height:90px;object-fit:cover;object-position:50% 20%;border-radius:10px;border:2px solid ${GOLD}"></td>
    <td valign="middle" style="font:15px/1.5 ${SANS};color:${TEXT}">
      <div style="color:${MUTED}">${esc(t.gruss)}</div>
      <div style="font:600 22px/1.2 ${SERIF};color:${GRUEN}">${esc(name)}</div>
      <div style="font-size:13px;color:${MUTED}">${auszeichnen(rolle, MUTED)}</div>
      <div style="margin-top:4px"><a href="tel:+491708784889" style="color:${TEXT};text-decoration:none">${esc(telefon.replace(/^Telefon\s+/, ""))}</a> · <a href="mailto:${esc(mail)}" style="color:${TEXT}">${esc(mail)}</a></div>
    </td>
  </tr></table>
</td></tr>
<tr><td style="background:${CREME};padding:16px 32px;font:12px/1.6 ${SANS};color:${MUTED}">
  ${esc(fussGrund)}<br>${esc(fussAnschrift)}<br>${auszeichnen(fussLinks, MUTED)}
</td></tr>
</table>
</td></tr></table>
</body></html>`;

  // Textfassung: gleicher Wortlaut, ohne Preheader, Logo, Foto und Trennlinien (C.3).
  const text = [
    t.anrede,
    "",
    t.h1,
    "",
    t.absatz1,
    "",
    absatz2,
    "",
    t.absatz3,
    "",
    t.box.titel,
    "",
    t.box.text,
    "",
    t.box.pflichtsatz,
    "",
    t.box.stand,
    "",
    `Anhang: ${anhang}`,
    `${t.button}: ${ERSTINFO_URL}`,
    "",
    `${t.vorbereiten.label}. ${t.vorbereiten.text}`,
    "",
    t.schluss,
    "",
    t.gruss,
    ...t.signatur,
    "",
    fussGrund,
    fussAnschrift,
    ...fussLinks.split(" | "),
    "",
  ].join("\n");

  return { subject: t.betreff, text, html };
}
