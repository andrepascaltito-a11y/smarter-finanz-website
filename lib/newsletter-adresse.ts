// Sammeladressen (info@, office@ ...) werden vom Newsletter vorerst ausgenommen (Rita, 14.10.2026, E2):
// Wer fuer einen Betrieb bei einer Sammeladresse in E-Mail-Werbung einwilligen darf, ist ungeklaert
// (§ 7 Abs. 2 Nr. 2 UWG kennt keine B2B-Erleichterung). Die Anfrage selbst laeuft normal durch.
// Gemeinsam nutzbar im Client (Hinweis im Formular) und im Server (Anmeldung wird ignoriert).

const SAMMEL_PRAEFIXE = [
  "info", "kontakt", "office", "buero", "mail", "post", "service", "zentrale", "empfang", "anfrage",
  "verwaltung", "vertrieb", "team", "hallo", "hello",
];

export function istSammeladresse(email: string): boolean {
  const lokal = email.trim().toLowerCase().split("@")[0] ?? "";
  return SAMMEL_PRAEFIXE.includes(lokal);
}
