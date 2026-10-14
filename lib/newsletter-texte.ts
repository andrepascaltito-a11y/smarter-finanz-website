// Newsletter-Texte (VORBEREITUNG, nicht live). Wortlaut von Mia, 14.10.2026
// (03-Marketing/Content/Mia-SmarterFinanz-Texte-Sie-2026-10-14.md, Abschnitt E). Gewerbe: Sie, Privat: du.
// Vor dem Livegang muss Rita den Wortlaut pruefen (Art. 7 DSGVO, § 7 UWG). Jede inhaltliche Aenderung
// eines Checkbox-Textes erhoeht die Version.
// Mit "ZUSATZ" markierte Stellen stammen nicht von Mia und gehen ebenfalls an Mia/Rita.

export type Segment = "gewerbe" | "privat";

export const NEWSLETTER_CHECKBOX: Record<
  Segment,
  { zwischenzeile: string; text: string; hinweis: string; version: string }
> = {
  gewerbe: {
    zwischenzeile: "Optional: Infos per E-Mail",
    text:
      "Ich willige ein, dass Smarter Finanz mir gelegentlich Informationen und Werbung zu Versicherung und Vorsorge für Betriebe per E-Mail schickt, höchstens einmal im Monat. " +
      "Ich bin berechtigt, dies für meinen Betrieb zu erklären. " +
      "Meine Adresse bestätige ich in einer separaten Mail per Klick. " +
      "Meine Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen, zum Beispiel über den Abmeldelink in jeder Mail. " +
      "Informationen zur Datenverarbeitung stehen in der Datenschutzerklärung.",
    hinweis: "Freiwillig. Ihre Anfrage bearbeiten wir auch ohne diese Auswahl.",
    version: "smarterfinanz-newsletter-gewerbe-2026-10-v2",
  },
  privat: {
    zwischenzeile: "Optional: Infos per E-Mail",
    text:
      "Ich willige ein, dass Smarter Finanz mir gelegentlich Informationen und Werbung zu Absicherung, Vorsorge und Finanzen per E-Mail schickt, höchstens alle zwei Monate. " +
      "Meine Adresse bestätige ich in einer separaten Mail per Klick. " +
      "Meine Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen, zum Beispiel über den Abmeldelink in jeder Mail. " +
      "Informationen zur Datenverarbeitung stehen in der Datenschutzerklärung.",
    hinweis: "Freiwillig. Deine Anfrage bearbeiten wir auch ohne diese Auswahl.",
    version: "smarterfinanz-newsletter-privat-2026-10-v2",
  },
};

// Erfolgstext zur Newsletter-Auswahl, je nachdem, was der Server wirklich getan hat (Rita E10).
export type NewsletterErgebnisText = "mailGesendet" | "keineMail" | "bereitsBestaetigt" | "kuerzlichGesendet";

export const NEWSLETTER_ERFOLG_ZUSATZ: Record<Segment, Record<NewsletterErgebnisText, string>> = {
  gewerbe: {
    mailGesendet: "Für die E-Mail-Infos schicken wir Ihnen eine separate Mail zur Bestätigung. Erst nach Ihrem Klick darin erhalten Sie die Infos.",
    kuerzlichGesendet: "Die Mail zur Bestätigung für die E-Mail-Infos haben wir Ihnen vor Kurzem geschickt. Bitte schauen Sie auch im Spam-Ordner nach.",
    bereitsBestaetigt: "Für die E-Mail-Infos müssen Sie nichts weiter tun.",
    keineMail: "Die Anmeldung für die E-Mail-Infos hat nicht geklappt. Ihre Anfrage ist trotzdem bei uns angekommen. Sie können die Infos später noch einmal anfordern.",
  },
  privat: {
    mailGesendet: "Für die E-Mail-Infos schicken wir dir eine separate Mail zur Bestätigung. Erst nach deinem Klick darin bekommst du die Infos.",
    kuerzlichGesendet: "Die Mail zur Bestätigung für die E-Mail-Infos haben wir dir vor Kurzem geschickt. Schau bitte auch im Spam-Ordner nach.",
    bereitsBestaetigt: "Für die E-Mail-Infos musst du nichts weiter tun.",
    keineMail: "Die Anmeldung für die E-Mail-Infos hat nicht geklappt. Deine Anfrage ist trotzdem bei uns angekommen. Du kannst die Infos später noch einmal anfordern.",
  },
};

// Hinweis im Formular, wenn die Newsletter-Auswahl gesetzt ist und die Adresse eine Sammeladresse ist (Rita E2, Option A).
export const SAMMELADRESSE_HINWEIS: Record<Segment, string> = {
  gewerbe: "Für Sammeladressen bieten wir die E-Mail-Infos nicht an. Bitte geben Sie dafür eine persönliche Geschäftsadresse an. Ihre Anfrage senden Sie trotzdem ab.",
  privat: "Für Sammeladressen wie info@ bieten wir die E-Mail-Infos nicht an. Bitte gib dafür eine persönliche Adresse an. Deine Anfrage kannst du trotzdem absenden.",
};

export const DOI_BETREFF = "Bitte bestätigen: E-Mail-Infos von Smarter Finanz";

interface MailDaten {
  vorname: string;
  nachname: string;
  datum: string; // TT.MM.JJJJ
  bestaetigungslink: string;
  datenschutzlink: string;
}

const SIGNATUR = `Smarter Finanz
André Pascal Tito
Glenetalstraße 101 A, 31061 Alfeld (Leine)
Telefon +49 170 8784889, a.tito@smarterfinanz.de
Vermittlerregister-Nr. D-JOOT-NRHZP-02`;

export function doiMailText(segment: Segment, d: MailDaten): string {
  if (segment === "gewerbe") {
    return `Guten Tag ${d.vorname} ${d.nachname},

über das Kontaktformular auf smarterfinanz.de haben Sie am ${d.datum} angegeben, dass Sie gelegentlich E-Mail-Infos von Smarter Finanz zu Versicherung und Vorsorge für Betriebe erhalten möchten, höchstens einmal im Monat. Bitte bestätigen Sie das mit einem Klick:

${d.bestaetigungslink}

Ohne Ihre Bestätigung schicken wir Ihnen keine solchen Infos. Der Bestätigungslink ist 14 Tage gültig. Wenn Sie das nicht angefordert haben, können Sie diese Mail ignorieren.

Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen und der Nutzung Ihrer Daten für Werbung jederzeit widersprechen, per Klick auf den Abmeldelink in jeder Ausgabe oder formlos per Antwort auf diese Mail.

Was wir dafür speichern, wie lange und welche Rechte Sie haben, steht in unserer Datenschutzerklärung:
${d.datenschutzlink}

${SIGNATUR}
`;
  }
  return `Hallo ${d.vorname},

über das Kontaktformular auf smarterfinanz.de hast du am ${d.datum} angegeben, dass du gelegentlich E-Mail-Infos von Smarter Finanz zu Absicherung, Vorsorge und Finanzen erhalten möchtest, höchstens alle zwei Monate. Bitte bestätige das mit einem Klick:

${d.bestaetigungslink}

Ohne deine Bestätigung schicken wir dir keine solchen Infos. Der Bestätigungslink ist 14 Tage gültig. Wenn du das nicht angefordert hast, kannst du diese Mail ignorieren.

Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen und der Nutzung deiner Daten für Werbung jederzeit widersprechen, per Klick auf den Abmeldelink in jeder Ausgabe oder formlos per Antwort auf diese Mail.

Was wir dafür speichern, wie lange und welche Rechte du hast, steht in unserer Datenschutzerklärung:
${d.datenschutzlink}

${SIGNATUR}
`;
}

// Bestaetigungsseite (Link aus der Double-Opt-in-Mail). Segment kommt aus dem Token.
// ZUSATZ (nicht von Mia): Vorstufe mit Schaltflaeche, damit Sicherheits-Scanner in Firmen-Postfaechern
// den Link nicht automatisch "anklicken" und damit eine Bestaetigung ausloesen.
export const BESTAETIGEN_TEXTE: Record<
  Segment,
  { vorstufeTitel: string; vorstufeText: string; schaltflaeche: string; titel: string; text: string; bereits: string; ungueltig: string }
> = {
  gewerbe: {
    vorstufeTitel: "Bitte bestätigen Sie Ihre Adresse",
    vorstufeText:
      "Mit einem Klick auf die Schaltfläche bestätigen Sie, dass Sie gelegentlich E-Mail-Infos von Smarter Finanz zu Versicherung und Vorsorge für Betriebe erhalten möchten, höchstens einmal im Monat.",
    schaltflaeche: "Adresse bestätigen",
    titel: "Ihre Adresse ist bestätigt",
    text: "Danke. Sie erhalten künftig gelegentlich E-Mail-Infos von Smarter Finanz zu Versicherung und Vorsorge für Betriebe, höchstens einmal im Monat. In jeder Ausgabe finden Sie einen Link zur Abmeldung.",
    bereits: "Ihre Adresse ist bereits bestätigt. Sie müssen nichts weiter tun.",
    ungueltig:
      "Dieser Bestätigungslink ist abgelaufen oder ungültig. Wenn Sie die E-Mail-Infos weiterhin möchten, wählen Sie die Option im Kontaktformular bitte noch einmal aus.",
  },
  privat: {
    vorstufeTitel: "Bitte bestätige deine Adresse",
    vorstufeText:
      "Mit einem Klick auf die Schaltfläche bestätigst du, dass du gelegentlich E-Mail-Infos von Smarter Finanz zu Absicherung, Vorsorge und Finanzen erhalten möchtest, höchstens alle zwei Monate.",
    schaltflaeche: "Adresse bestätigen",
    titel: "Deine Adresse ist bestätigt",
    text: "Danke. Du bekommst künftig gelegentlich E-Mail-Infos von Smarter Finanz zu Absicherung, Vorsorge und Finanzen, höchstens alle zwei Monate. In jeder Ausgabe findest du einen Link zur Abmeldung.",
    bereits: "Deine Adresse ist bereits bestätigt. Du musst nichts weiter tun.",
    ungueltig:
      "Dieser Bestätigungslink ist abgelaufen oder ungültig. Wenn du die E-Mail-Infos weiterhin möchtest, wähle die Option im Kontaktformular bitte noch einmal aus.",
  },
};

export const ABMELDEN_TEXTE: Record<Segment, { titel: string; text: string; bereits: string; ungueltig: string; technisch: string }> = {
  gewerbe: {
    titel: "Sie sind abgemeldet",
    text: "Wir schicken Ihnen keine E-Mail-Infos mehr. Für diesen Zweck speichern wir nur noch einen Sperrvermerk und den Nachweis Ihrer früheren Einwilligung, damit Sie keine weiteren Infos erhalten und wir die Rechtmäßigkeit belegen können. Ihre Anfrage ist davon nicht betroffen.",
    bereits: "Sie sind bereits abgemeldet.",
    ungueltig: "Dieser Link ist ungültig. Sie können sich auch formlos per E-Mail an a.tito@smarterfinanz.de abmelden.",
    technisch: "Ihre Abmeldung konnte gerade technisch nicht ausgeführt werden. Bitte antworten Sie auf die Mail oder schreiben Sie an a.tito@smarterfinanz.de. Wir tragen Sie dann umgehend aus.",
  },
  privat: {
    titel: "Du bist abgemeldet",
    text: "Wir schicken dir keine E-Mail-Infos mehr. Für diesen Zweck speichern wir nur noch einen Sperrvermerk und den Nachweis deiner früheren Einwilligung, damit du keine weiteren Infos erhältst und wir die Rechtmäßigkeit belegen können. Deine Anfrage ist davon nicht betroffen.",
    bereits: "Du bist bereits abgemeldet.",
    ungueltig: "Dieser Link ist ungültig. Du kannst dich auch formlos per E-Mail an a.tito@smarterfinanz.de abmelden.",
    technisch: "Deine Abmeldung konnte gerade technisch nicht ausgeführt werden. Bitte antworte auf die Mail oder schreib an a.tito@smarterfinanz.de. Wir tragen dich dann umgehend aus.",
  },
};

// Falls der Token so kaputt ist, dass nicht einmal das Segment erkennbar ist (neutral, Sie).
export const UNGUELTIG_NEUTRAL =
  "Dieser Link ist abgelaufen oder ungültig. Sie können sich auch formlos per E-Mail an a.tito@smarterfinanz.de melden.";
