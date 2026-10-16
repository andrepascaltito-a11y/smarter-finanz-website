// Texte des Kontaktformulars, die sich nach Zielgruppe unterscheiden.
// Gewerbe wird gesiezt, Privat geduzt (Entscheidung Andre, 14.10.2026). Wortlaut von Mia
// (03-Marketing/Content/Mia-SmarterFinanz-Texte-Sie-2026-10-14.md). Inhalte der Einwilligungen
// stehen in lib/consent.ts, nicht hier.

import { HINWEIS_MAX } from "@/lib/erreichbarkeit";

export const ERREICHBARKEIT_TEXTE = {
  titel: "Wann sind Sie am besten erreichbar?",
  badge: "Optional",
  einleitung:
    "Sie nennen uns die Zeiten, wir richten uns danach. Den Gesprächstermin stimmen wir anschließend mit Ihnen ab. Alle Angaben in diesem Block sind freiwillig.",
  tage: { label: "Wochentage", hinweis: "Mehrfachauswahl möglich" },
  zeiten: { label: "Tageszeit", hinweis: "Mehrfachauswahl möglich" },
  form: { label: "Gesprächsform", hinweis: "Eine Auswahl möglich", zuruecksetzen: "Auswahl zurücksetzen" },
  hinweis: {
    label: "Hinweis zur Erreichbarkeit",
    platzhalter: "z. B. dienstags erst ab 10 Uhr",
    datenschutz:
      "Bitte tragen Sie hier nur Zeiten und Hinweise zur Erreichbarkeit ein, keine vertraulichen Angaben wie Gesundheits-, Vertrags- oder Kontodaten.",
    zaehler: (n: number) => `${n} von ${HINWEIS_MAX} Zeichen`,
  },
};

export const ERFOLG_TEXTE = {
  privatperson:
    "Danke für deine Anfrage. Wir melden uns in Kürze bei dir. Die Erstinformation schicken wir dir per E-Mail.",
  gewerbe:
    "Danke für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen. Die Erstinformation schicken wir Ihnen per E-Mail.",
  gewerbeMitErreichbarkeit:
    "Danke für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen und berücksichtigen dabei Ihre Angaben zur Erreichbarkeit. Die Erstinformation schicken wir Ihnen per E-Mail.",
};

export const FEHLER_TEXTE = {
  privatperson: "Etwas ist schiefgelaufen. Bitte versuche es erneut oder ruf uns an unter +49 170 8784889.",
  gewerbe: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an unter +49 170 8784889.",
};
