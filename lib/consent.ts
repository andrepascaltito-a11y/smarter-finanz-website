// Einwilligungstext und Versionierung, exakt wie im Formular angezeigt.
// Bei jeder inhaltlichen Aenderung des Textes die Version hochzaehlen, damit
// im CRM nachvollziehbar bleibt, welcher Wortlaut eingewilligt wurde.

export const CONSENT_VERSION = "smarterfinanz-consent-2026-09-v1";

export const CONSENT_TEXT =
  "Ja, ich möchte kostenlos und unverbindlich telefonisch, per E-Mail und per WhatsApp " +
  "beraten werden. Ich willige ein, dass Smarter Finanz mich dazu unter den angegebenen " +
  "Kontaktdaten kontaktiert. Diese Einwilligung kann ich jederzeit mit Wirkung für die " +
  "Zukunft widerrufen. Es gilt die Datenschutzerklärung.";

// Zustimmung zur Erstinformation nach § 15 VersVermV ueber die Website.
// Bei inhaltlicher Aenderung von ERSTINFO_TEXT oder der Seite /erstinformation Version hochzaehlen.
export const ERSTINFO_VERSION = "erstinformation-2026-10-12-v1";

export const ERSTINFO_TEXT =
  "Ich stimme zu, dass mir Smarter Finanz die Erstinformation nach § 15 VersVermV " +
  "(Status, Vergütung, Register, Schlichtung) über die Website zur Verfügung stellt. " +
  "Ich kann sie jederzeit kostenlos auf Papier anfordern.";
