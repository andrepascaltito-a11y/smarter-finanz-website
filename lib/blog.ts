export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  /** false = Entwurf, wird weder gelistet noch ausgeliefert, bis André freigibt */
  published: boolean;
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "versicherungen-kleingewerbe",
    title: "Welche Versicherungen braucht ein Kleingewerbe wirklich?",
    description:
      "Pflicht, sinnvoll, verzichtbar: Ein sachlicher Überblick für Selbstständige und kleine Betriebe, ohne Verkaufsdruck.",
    date: "2026-10-12",
    published: false,
    blocks: [
      {
        type: "p",
        text: "Wer sich selbstständig macht, bekommt schnell viele Angebote. Betriebshaftpflicht, Rechtsschutz, Cyber, Inhalt, Betriebsunterbrechung: Fast jede Police klingt nach Pflicht. Das ist sie nicht immer. Dieser Überblick trennt, was wirklich vorgeschrieben ist, was in der Praxis fast immer Sinn ergibt und was oft verkauft, aber selten gebraucht wird.",
      },
      { type: "h2", text: "Was vorgeschrieben sein kann" },
      {
        type: "p",
        text: "Ob eine Versicherung Pflicht ist, hängt von Branche, Beruf und Betrieb ab. Eine allgemeine Pflicht zur Betriebshaftpflicht für jedes Gewerbe gibt es nicht. Typische Fälle, in denen eine Versicherung vorgeschrieben ist:",
      },
      {
        type: "ul",
        items: [
          "Krankenversicherung: Wer seinen Wohnsitz in Deutschland hat, muss krankenversichert sein, gesetzlich oder privat (§ 193 Abs. 3 VVG). Die Pflegeversicherung gehört dazu. Das ist eine persönliche Pflicht, keine betriebliche.",
          "Kfz-Haftpflicht: Für jedes Fahrzeug, das du als Halter auf öffentlichen Straßen nutzt, auch für Firmenwagen und Transporter (§ 1 PflVG).",
          "Berufshaftpflicht in bestimmten Berufen: Zum Beispiel für Rechtsanwälte (§ 51 BRAO) und Steuerberater (§ 67 StBerG) schreibt das Berufsrecht eine Haftpflichtversicherung vor. Versicherungsvermittler brauchen sie als Voraussetzung für die Erlaubnis (§ 34d GewO).",
          "Gesetzliche Unfallversicherung: Sobald du Mitarbeiter beschäftigst, sind diese kraft Gesetzes über die zuständige Berufsgenossenschaft unfallversichert, und du musst dein Unternehmen dort anmelden (§ 2 Abs. 1 Nr. 1, § 192 SGB VII). Ob du dich als Unternehmer selbst versichern musst oder freiwillig kannst, hängt von Branche und Satzung ab.",
          "Sozialversicherung für Mitarbeiter: Sobald du Angestellte beschäftigst, gelten Meldepflichten und Beitragspflichten.",
        ],
      },
      {
        type: "p",
        text: "Dazu kommt: Auftraggeber, Vermieter oder Förderstellen verlangen häufig vertraglich einen Nachweis, etwa über eine Betriebshaftpflicht. Das ist dann keine gesetzliche, aber eine praktische Pflicht. Prüfe deshalb vor dem Abschluss, welche Nachweise in deiner Branche üblich sind.",
      },
      { type: "h2", text: "Was fast immer sinnvoll ist" },
      {
        type: "ul",
        items: [
          "Betriebshaftpflicht: Schäden, die du bei Kunden oder Dritten verursachst, können schnell existenzbedrohend werden. Gerade bei Handwerk, Dienstleistung vor Ort oder Beratung ist sie die wichtigste freiwillige Police.",
          "Absicherung deiner Arbeitskraft: Als Selbstständiger gibt es keinen Arbeitgeber, der weiterzahlt. Wie du das löst, hängt von Gesundheit, Alter und Budget ab, hier lohnt sich ein individueller Blick.",
          "Inhalts- oder Geschäftsversicherung: Sinnvoll, wenn du teures Equipment, Waren oder Werkzeug hast, deren Verlust dich ausbremst.",
        ],
      },
      { type: "h2", text: "Was oft verkauft, aber selten gebraucht wird" },
      {
        type: "p",
        text: "Gerade bei kleinen Betrieben werden gern Pakete mit vielen Bausteinen angeboten. Frag bei jedem Baustein nach, welchen konkreten Schaden er abdeckt und wie wahrscheinlich dieser bei dir ist. Typische Kandidaten für eine genaue Prüfung sind Zusatzbausteine, die du gar nicht nutzt, doppelte Absicherungen und Rechtsschutz in Bereichen, die dich nie betreffen. Ob eine Police für dich entbehrlich ist, lässt sich aber nur anhand deines Betriebs beurteilen.",
      },
      { type: "h2", text: "Checkliste zum Selbst-Durchgehen" },
      {
        type: "ul",
        items: [
          "Welche Versicherung verlangt mein Berufsrecht oder meine Kammer?",
          "Was verlangen meine Auftraggeber oder mein Mietvertrag als Nachweis?",
          "Welcher Schaden würde mich finanziell am härtesten treffen, und ist er abgesichert?",
          "Zahle ich für Bausteine, die ich nicht nutze oder doppelt abgedeckt habe?",
          "Wer bezahlt den Berater, der mir das empfiehlt, und gibt es eine günstigere Alternative?",
        ],
      },
      { type: "h2", text: "Fazit" },
      {
        type: "p",
        text: "Pflicht ist oft weniger, als manche Angebote vermuten lassen, aber sinnvoll ist mehr, als viele Gründer zunächst denken. Wenn du wissen möchtest, wo du bei deinem Betrieb stehst, schauen wir gemeinsam darauf, kostenlos und ohne Verkaufsdruck.",
      },
      {
        type: "p",
        text: "Allgemeine Informationen, keine individuelle Rechts- oder Versicherungsberatung. Welche Pflichten für dich gelten, klärst du verbindlich mit Kammer, Berufsgenossenschaft oder Rechtsanwalt.",
      },
    ],
  },
];

export const publishedPosts = () =>
  posts.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  posts.find((p) => p.slug === slug && p.published);
