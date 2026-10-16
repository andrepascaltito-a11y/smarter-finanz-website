// Texte der Begruessungsmail nach dem Absenden des Anfrageformulars (lib/begruessung-mail.ts).
// Die Erstinformation haengt als PDF an (lib/erstinformation-pdf.generated.ts). Gewerbe wird gesiezt, Privat geduzt.
// Wortlaut: Mia (Vault 03-Marketing/Content/Mia-Danke-Seite-und-Hero-2026-10-16.md, Teil C), Rita prueft, Andre gibt frei.
// Anrede bewusst ohne Namen: Die Adresse stammt aus einem oeffentlichen Formular, ein eingesetzter Name waere Fremdtext
// an Dritte (Ritas Befund N1 zur Double-Opt-in-Mail).

import { ERSTINFO_MAIL_TEXT, ERSTINFO_MAIL_TEXT_SIE, ERSTINFO_URL } from "@/lib/erstinformation";

export type BegruessungText = {
  betreff: string;
  /** Vorschautext im Postfach (Preheader) */
  preheader: string;
  anrede: string;
  h1: string;
  absatz1: string;
  absatz2: string;
  /** ersetzt absatz2, wenn im Formular Erreichbarkeitsangaben gemacht wurden (nur Gewerbe) */
  absatz2MitAngaben?: string;
  absatz3: string;
  box: { titel: string; text: string; pflichtsatz: string; stand: string };
  button: string;
  vorbereiten: { label: string; text: string };
  schluss: string;
  gruss: string;
  signatur: string[];
  fotoAlt: string;
  fusszeile: string[];
};

// Der Pflichtsatz zur Papierfassung kommt wortgleich aus dem Text der Erstinformation, nicht aus einer Abschrift.
function pflichtsatzAus(text: string): string {
  const satz = text.trim().split(/\n\s*\n/).find((b) => /^(Du hast|Sie haben) der Bereitstellung/.test(b));
  if (!satz) throw new Error("Pflichtsatz zur Papierfassung in lib/erstinformation.ts nicht gefunden");
  return satz.replace(/\n/g, " ");
}

function standAus(text: string): string {
  const stand = text.match(/Stand ([0-9.]+)/)?.[1];
  if (!stand) throw new Error("Stand der Erstinformation nicht gefunden");
  return `Stand der Erstinformation: ${stand}`;
}

const SIGNATUR = [
  "André Tito",
  "Versicherungsmakler (Erlaubnis nach § 34d Abs. 1 GewO, Reg.-Nr. D-JOOT-NRHZP-02)",
  "Telefon +49 170 8784889",
  "a.tito@smarterfinanz.de",
];
const FOTO_ALT = "André Tito, Versicherungsmakler in Alfeld";
const ANSCHRIFT = "Smarterfinanz, Inhaber André Pascal Tito, Glenetalstraße 101 A, 31061 Alfeld (Leine)";
const RECHTSLINKS = "Impressum: https://www.smarterfinanz.de/impressum | Datenschutzerklärung: https://www.smarterfinanz.de/datenschutz";

export const BEGRUESSUNG_TEXTE: Record<"privatperson" | "gewerbe", BegruessungText> = {
  gewerbe: {
    betreff: "Ihre Anfrage bei Smarter Finanz, Erstinformation im Anhang",
    preheader: "Ich melde mich persönlich bei Ihnen. Ihre Erstinformation finden Sie als PDF im Anhang.",
    anrede: "Guten Tag,",
    h1: "Danke, dass Sie sich gemeldet haben.",
    absatz1: "Jeder Betrieb läuft ein bisschen anders, und deshalb möchte ich Ihren erst kennenlernen, bevor ich irgendetwas vorschlage.",
    absatz2:
      "Ich melde mich persönlich bei Ihnen, an Werktagen und meist per Telefon. Haben Sie im Formular Zeiten angegeben, richte ich mich danach. Passt es gerade nicht, sagen Sie mir einfach, wann es besser geht.",
    absatz2MitAngaben: "Ich melde mich persönlich bei Ihnen und richte mich nach Ihren Angaben zur Erreichbarkeit. Den genauen Termin stimmen wir miteinander ab.",
    absatz3: "Im Gespräch erzählen Sie mir von Ihrem Betrieb, wir sehen uns an, was Sie schon abgesichert haben, und einen Vorschlag gibt es erst danach.",
    box: {
      titel: "Ihre Erstinformation im Anhang",
      text: `Als Versicherungsmakler müssen wir Sie zu Beginn unseres Kontakts über uns informieren, so schreibt es das Gesetz vor. Die Erstinformation hängt als PDF an dieser E-Mail: Darin steht, wer wir sind, welchen Status und welche Registernummern wir haben, wie wir vergütet werden, wer bei Streit schlichtet und welche Berufshaftpflicht wir haben. Außerdem steht sie dauerhaft online unter ${ERSTINFO_URL}. Fehlt der Anhang oder lässt er sich nicht öffnen, nutzen Sie bitte diesen Link oder antworten Sie kurz auf diese E-Mail, dann senden wir Ihnen die Erstinformation erneut.`,
      pflichtsatz: pflichtsatzAus(ERSTINFO_MAIL_TEXT_SIE),
      stand: standAus(ERSTINFO_MAIL_TEXT_SIE),
    },
    button: "Erstinformation online ansehen",
    vorbereiten: {
      label: "Wenn Sie sich vorbereiten möchten",
      text: "Halten Sie gern Ihre Policen oder eine Versicherungsübersicht bereit. Nötig ist das nicht, und Unterlagen schicken Sie bitte erst, wenn wir gesprochen haben.",
    },
    schluss: "Ich freue mich auf das Gespräch.",
    gruss: "Mit besten Grüßen",
    signatur: SIGNATUR,
    fotoAlt: FOTO_ALT,
    fusszeile: [
      "Sie erhalten diese E-Mail, weil über smarterfinanz.de eine Anfrage mit Ihrer Adresse gestellt wurde. Waren das nicht Sie, antworten Sie bitte kurz auf diese E-Mail.",
      ANSCHRIFT,
      RECHTSLINKS,
    ],
  },

  privatperson: {
    betreff: "Deine Anfrage bei Smarter Finanz, Erstinformation im Anhang",
    preheader: "Ich melde mich persönlich bei dir. Deine Erstinformation findest du als PDF im Anhang.",
    anrede: "Hallo,",
    h1: "Danke, dass du dich gemeldet hast.",
    absatz1: "Jede Situation ist ein bisschen anders, und deshalb möchte ich dich erst kennenlernen, bevor ich irgendetwas vorschlage.",
    absatz2: "Ich melde mich persönlich bei dir, an Werktagen und meist per Telefon. Passt es gerade nicht, sag mir einfach, wann es besser geht.",
    absatz3: "Im Gespräch erzählst du mir, was dich beschäftigt, wir sehen uns an, was du schon hast, und einen Vorschlag gibt es erst danach.",
    box: {
      titel: "Deine Erstinformation im Anhang",
      text: `Als Versicherungsmakler müssen wir dich zu Beginn unseres Kontakts über uns informieren, so schreibt es das Gesetz vor. Die Erstinformation hängt als PDF an dieser E-Mail: Darin steht, wer wir sind, welchen Status und welche Registernummern wir haben, wie wir vergütet werden, wer bei Streit schlichtet und welche Berufshaftpflicht wir haben. Außerdem steht sie dauerhaft online unter ${ERSTINFO_URL}. Fehlt der Anhang oder lässt er sich nicht öffnen, nutze bitte diesen Link oder antworte kurz auf diese E-Mail, dann senden wir dir die Erstinformation erneut.`,
      pflichtsatz: pflichtsatzAus(ERSTINFO_MAIL_TEXT),
      stand: standAus(ERSTINFO_MAIL_TEXT),
    },
    button: "Erstinformation online ansehen",
    vorbereiten: {
      label: "Wenn du dich vorbereiten möchtest",
      text: "Leg dir gern deine Verträge oder eine Versicherungsübersicht bereit. Nötig ist das nicht, und Unterlagen schickst du mir bitte erst, wenn wir gesprochen haben.",
    },
    schluss: "Ich freue mich auf das Gespräch.",
    gruss: "Viele Grüße",
    signatur: SIGNATUR,
    fotoAlt: FOTO_ALT,
    fusszeile: [
      "Du erhältst diese E-Mail, weil über smarterfinanz.de eine Anfrage mit deiner Adresse gestellt wurde. Warst du das nicht, antworte bitte kurz auf diese E-Mail.",
      ANSCHRIFT,
      RECHTSLINKS,
    ],
  },
};
