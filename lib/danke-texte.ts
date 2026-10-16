// Texte der Bestaetigungsseite nach dem Absenden des Anfrageformulars (components/AnfrageDanke.tsx).
// Gewerbe wird gesiezt, Privat geduzt. Wortlaut: Mia (Vault 03-Marketing/Content/Mia-Danke-Seite-und-Hero-2026-10-16.md,
// Teil A). Rechtliche Pruefung durch Rita, danach liest Andre jede Fassung und traegt sie ins Freigabeprotokoll ein.
// Platzhalter: {firmenname} und {thema} fuellt die Komponente aus der Eingabe (als Text, nie als HTML),
// [TELEFON] und [MAIL] werden zu Links auf die Nummer und Adresse aus dem Impressum.
// Nur eine Zeitangabe ist erlaubt: "an Werktagen". Keine Stunden, keine Fristen (UWG).

export type DankeSchritt = {
  titel: string;
  text: string;
  /** kleiner Hinweis unter dem Schritt */
  hinweis?: string;
  /** nur anzeigen, wenn die Gesprächsform "Persönlich, nach Absprache" gewählt wurde */
  zusatzPersoenlich?: string;
};

export type DankeText = {
  eyebrow: string;
  titel: string;
  kern: string;
  /** ersetzt kern, wenn ein Firmenname vorliegt */
  kernMitFirma?: string;
  /** eigene Zeile unter kern, nur Privat und nicht bei "Sonstiges" */
  kernZusatzThema?: string;
  /** Überschrift über den Chips mit den eigenen Erreichbarkeitsangaben (nur Gewerbe mit Angaben) */
  echoTitel?: string;
  schritteTitel: string;
  schritte: DankeSchritt[];
  nutzenTitel: string;
  nutzen: string[];
  nutzenSchluss: string;
  vorbereitenTitel: string;
  vorbereitenEinleitung: string;
  vorbereiten: string[];
  vorbereitenHinweis: string;
  personLabel: string;
  personRolle: string;
  personText: string;
  personRegister: string;
  fotoAlt: string;
  eiltTitel: string;
  eiltText: string;
  /** nur Privat: Link auf den Kalender der Privatseite */
  eiltKalender?: string;
};

const GEWERBE: DankeText = {
  eyebrow: "Anfrage eingegangen",
  titel: "Danke. Ihre Anfrage liegt jetzt bei André Tito.",
  kern: "Ihre Anfrage ist bei uns angekommen. Sie müssen jetzt nichts weiter tun, wir melden uns bei Ihnen.",
  kernMitFirma: "Ihre Anfrage für {firmenname} ist bei uns angekommen. Sie müssen jetzt nichts weiter tun, wir melden uns bei Ihnen.",
  schritteTitel: "So geht es weiter",
  schritte: [
    {
      titel: "Erstinformation per E-Mail",
      text: "Wir schicken Ihnen die gesetzlich vorgeschriebene Erstinformation als PDF. Darin steht, wer wir sind und wie wir vergütet werden.",
      hinweis: "Absender ist [MAIL]. Finden Sie nichts im Posteingang, schauen Sie bitte im Spam-Ordner nach.",
    },
    {
      titel: "André Tito meldet sich",
      text: "Er meldet sich persönlich bei Ihnen, an Werktagen und meist per Telefon. Passt der Anruf gerade nicht, sagen Sie ihm einfach, wann es besser geht.",
    },
    {
      titel: "Gespräch über Ihren Betrieb",
      text: "Wir lernen Ihren Betrieb kennen und prüfen, was Sie schon abgesichert haben. Einen Vorschlag gibt es erst danach, und Sie entscheiden in Ruhe.",
    },
  ],
  nutzenTitel: "Das klären wir im Gespräch",
  nutzen: [
    "Wo Ihr Betrieb heute abgesichert ist und wo nicht",
    "Ob Sie für dasselbe Risiko doppelt zahlen",
    "Welche Lücken in Ihrer Branche typisch sind, etwa Tätigkeiten, die im Vertrag fehlen",
    "Wie es weitergeht, wenn der Betrieb nach einem Schaden stillsteht",
  ],
  nutzenSchluss: "Wo Sie mehr absichern als nötig, sagen wir Ihnen das genauso.",
  vorbereitenTitel: "Wenn Sie sich vorbereiten möchten",
  vorbereitenEinleitung: "Das ist freiwillig, das Gespräch klappt auch ohne.",
  vorbereiten: [
    "Ihre vorhandenen Policen oder eine Versicherungsübersicht",
    "Eine Liste Ihrer Fahrzeuge, falls Sie welche haben",
    "Die ungefähre Zahl Ihrer Mitarbeiter",
  ],
  vorbereitenHinweis:
    "Bitte schicken Sie keine Unterlagen oder sensiblen Daten über das Formular nach. Wie Sie uns etwas zukommen lassen, klären wir im Gespräch.",
  personLabel: "Ihr Ansprechpartner",
  personRolle: "Versicherungsmakler, Erlaubnis nach § 34d Abs. 1 GewO",
  personText:
    "Er arbeitet von Alfeld aus und kommt in der Regel zu Ihnen in den Betrieb, auf Wunsch sprechen Sie online. Als Makler vergleicht er für Sie mehrere Gesellschaften.",
  personRegister: "Registernummer D-JOOT-NRHZP-02, im Vermittlerregister nachprüfbar",
  fotoAlt: "André Tito, Versicherungsmakler in Alfeld",
  eiltTitel: "Es eilt?",
  eiltText: "Dann rufen Sie direkt an unter [TELEFON] oder schreiben Sie an [MAIL].",
};

export const DANKE_TEXTE: { gewerbe: DankeText; gewerbeMitErreichbarkeit: DankeText; privatperson: DankeText } = {
  gewerbe: GEWERBE,

  // Gilt, sobald mindestens ein Feld des Erreichbarkeitsblocks ausgefüllt war. Alles andere wie "gewerbe".
  gewerbeMitErreichbarkeit: {
    ...GEWERBE,
    titel: "Danke. Wir richten uns nach Ihren Angaben.",
    kern: "Ihre Anfrage ist bei uns angekommen. Sie müssen jetzt nichts weiter tun, wir richten uns nach Ihren Angaben zur Erreichbarkeit.",
    kernMitFirma:
      "Ihre Anfrage für {firmenname} ist bei uns angekommen. Sie müssen jetzt nichts weiter tun, wir richten uns nach Ihren Angaben zur Erreichbarkeit.",
    echoTitel: "Ihre Angaben zur Erreichbarkeit",
    schritte: [
      GEWERBE.schritte[0],
      {
        titel: "Termin nach Ihren Zeiten",
        text: "André Tito meldet sich persönlich bei Ihnen und richtet sich nach Ihren Angaben zur Erreichbarkeit. Den genauen Termin stimmen wir mit Ihnen ab.",
        zusatzPersoenlich: "Wo wir uns treffen, klären wir bei der ersten Rückmeldung.",
      },
      GEWERBE.schritte[2],
    ],
  },

  privatperson: {
    eyebrow: "Anfrage eingegangen",
    titel: "Danke. Deine Anfrage liegt jetzt bei André Tito.",
    kern: "Deine Anfrage ist bei uns angekommen. Du musst jetzt nichts weiter tun, wir melden uns bei dir.",
    kernZusatzThema: "Dein Thema: {thema}",
    schritteTitel: "So geht es weiter",
    schritte: [
      {
        titel: "Erstinformation per E-Mail",
        text: "Wir schicken dir die gesetzlich vorgeschriebene Erstinformation als PDF. Darin steht, wer wir sind und wie wir vergütet werden.",
        hinweis: "Absender ist [MAIL]. Findest du nichts im Posteingang, schau bitte im Spam-Ordner nach.",
      },
      {
        titel: "André Tito meldet sich",
        text: "Er meldet sich persönlich bei dir, an Werktagen und meist per Telefon. Passt der Anruf gerade nicht, sag ihm einfach, wann es besser geht.",
      },
      {
        titel: "Das erste Gespräch",
        text: "Du erzählst, worum es dir geht, und wir schauen, was du schon hast. Einen Vorschlag gibt es erst danach, und du entscheidest in Ruhe.",
      },
    ],
    nutzenTitel: "Das klären wir im Gespräch",
    nutzen: [
      "Welche Versicherungen du hast, welche fehlen und wo du doppelt zahlst",
      "Wie deine Altersvorsorge heute aufgestellt ist und ob etwas fehlt",
      "Worauf es bei deiner Immobilienfinanzierung oder Umschuldung ankommt",
    ],
    nutzenSchluss: "Wo du mehr absicherst als nötig, sagen wir dir das genauso.",
    vorbereitenTitel: "Wenn du dich vorbereiten möchtest",
    vorbereitenEinleitung: "Das ist freiwillig, das Gespräch klappt auch ohne.",
    vorbereiten: ["Deine vorhandenen Verträge oder eine Versicherungsübersicht", "Ein paar Stichpunkte dazu, was du erreichen möchtest"],
    vorbereitenHinweis:
      "Bitte schick keine Unterlagen oder sensiblen Daten über das Formular nach. Wie du uns etwas zukommen lässt, klären wir im Gespräch.",
    personLabel: "Dein Ansprechpartner",
    personRolle: "Versicherungsmakler, Erlaubnisse nach § 34d, § 34f und § 34i GewO",
    personText:
      "Er arbeitet von Alfeld aus. Du triffst ihn im Weser- und Leinebergland persönlich oder sprichst per Video mit ihm, wie es dir lieber ist. Bei Versicherungen vergleicht er für dich mehrere Gesellschaften.",
    personRegister: "Registernummer D-JOOT-NRHZP-02, im Vermittlerregister nachprüfbar",
    fotoAlt: "André Tito, Versicherungsmakler in Alfeld",
    eiltTitel: "Es eilt?",
    eiltText: "Dann ruf direkt an unter [TELEFON] oder schreib an [MAIL].",
    eiltKalender: "Oder such dir direkt einen Termin im Kalender aus.",
  },
};
