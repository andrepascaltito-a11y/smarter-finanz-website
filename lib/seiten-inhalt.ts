// Inhalte der Orts-, Branchen-, Hub-, Autoren- und Beitragsseiten. Aufbau und Freigabe-Flag: siehe lib/seiten.ts.
// ERZEUGT aus den Textdateien von Mia (Vault, 03-Marketing/Content/): Mia-SEO-Phase1-Texte-2026-10-14.md, Mia-Blog-Charge1-v7a-nur-Artikel-2026-10-18.md
// mit scripts/seiten-aus-markdown.py. Texte nicht hier ändern, sondern in der Quelldatei und neu erzeugen,
// sonst gehen Änderungen verloren. Rita hat die Fassungen geprüft.
// Freigabe durch André: Skript mit --veroeffentlicht neu laufen lassen oder published auf true setzen.

import type { Seite } from "./seiten";

export const SEITEN: Seite[] = [
  {
    "typ": "autor",
    "slug": "ueber-andre",
    "published": true,
    "title": "Über André Tito, Versicherungsmakler | Smarter Finanz",
    "description": "André Pascal Tito, Versicherungsmakler in Alfeld (Leine): Erlaubnis nach § 34d GewO, Registernummer, Arbeitsweise. Seit 2018 in der Beratung.",
    "h1": "André Pascal Tito, Versicherungsmakler in Alfeld (Leine)",
    "kurzname": "Über André",
    "stand": "Oktober 2026",
    "portrait": {
      "datei": "/andre-tito.jpg",
      "alt": "André Pascal Tito, Versicherungsmakler in Alfeld (Leine)"
    },
    "einleitung": [
      "Ich bin André Tito, Versicherungsmakler in Alfeld (Leine). Ich berate seit August 2018 Menschen zu Versicherung und Vorsorge, zu Beginn meiner Laufbahn noch im Angestelltenverhältnis. Heute bin ich Inhaber des Einzelunternehmens Smarterfinanz und arbeite als Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 GewO."
    ],
    "kurz": [
      {
        "frage": "Wer berät Sie?",
        "antwort": "André Tito, Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 GewO (Registernummer D-JOOT-NRHZP-02), tätig in Alfeld (Leine)."
      },
      {
        "frage": "Für wen arbeitet er?",
        "antwort": "Für seine Auftraggeber, nicht im Auftrag eines Versicherers. André Tito ist Versicherungsmakler im Sinne des § 59 Abs. 3 VVG: Kein Versicherer und kein Versicherungsvertreter hat ihn mit der Vermittlung betraut. Er legt seiner Beratung in der Regel eine hinreichende Zahl von am Markt angebotenen Verträgen und Versicherern zugrunde (§ 60 Abs. 1 VVG). Seine Vergütung erhält er von Versicherern und Maklerpools, siehe Abschnitt zur Vergütung."
      },
      {
        "frage": "Wo finden Termine statt?",
        "antwort": "In der Regel bei Ihnen im Betrieb, auf Wunsch online. Gearbeitet wird von Alfeld aus im Homeoffice, ein Büro mit Kundenverkehr gibt es nicht."
      },
      {
        "frage": "Wie wird die Beratung vergütet?",
        "antwort": "Über die Courtage, die der Versicherer zahlt und die in der Prämie enthalten ist, dazu über weitere Zuwendungen von Versicherern und Maklerpools. Ein gesondertes Honorar berechnet er nur, wenn es vorab ausdrücklich vereinbart wurde. Einzelheiten stehen in der Erstinformation."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Wie ich zum Maklerberuf kam"
      },
      {
        "art": "p",
        "text": "Nach meinem Wehrdienst hatte ich einen größeren Betrag angespart und wusste nicht, was ich damit tun sollte. Ich ließ mich bei einem Berater vor Ort beraten und merkte schnell: Ich verstand nicht genau, was mir da verkauft werden sollte. Es fühlte sich nicht nach einer Beratung für mich an, sondern nach einem Konzept von der Stange. Also nahm ich die Angebote mit nach Hause und prüfte sie selbst. Sie passten nicht zu meinen Bedürfnissen, und ich entschied mich dagegen."
      },
      {
        "art": "p",
        "text": "Das Thema ließ mich danach nicht mehr los. Ich wollte verstehen, wie das alles funktioniert. Ich machte eine Ausbildung zum Kaufmann für Büromanagement und legte parallel die Sachkundeprüfungen vor der IHK für meine Erlaubnisse nach § 34d, § 34f und § 34i GewO ab, vorbereitet mit den Schulungsangeboten eines Finanzvertriebs, bei dem ich damals als Berater tätig war. Dort habe ich kennengelernt, wie Vertrieb und Beratung im Alltag ablaufen. Mein Anspruch ist es, Menschen so zu beraten, dass der Vorschlag zu ihrer Situation passt."
      },
      {
        "art": "h2",
        "text": "Mein Bezug zur Region"
      },
      {
        "art": "p",
        "text": "Ich bin in Holzminden aufgewachsen und wohne seit meiner Ausbildung in Alfeld. Von 2023 bis Anfang 2025 hatte ich ein Büro in Hannover. Ich kenne diese Gegend also nicht nur von der Karte. Mir gefällt gerade in den ländlichen Regionen, dass die Menschen viel miteinander reden und sich Zeit nehmen. Das Miteinander ist familiärer, so wie man es von Dörfern kennt."
      },
      {
        "art": "h2",
        "text": "Wie ich arbeite"
      },
      {
        "art": "p",
        "text": "Ich bin Makler: Kein Versicherer hat mich mit der Vermittlung betraut. Das heißt: Ich vergleiche für Sie eine hinreichende Zahl von am Markt angebotenen Verträgen und Versicherern und nicht nur die eines Hauses. Wähle ich im Einzelfall eine eingeschränkte Auswahl, sage ich Ihnen das vor Ihrer Vertragserklärung ausdrücklich. In diesem Fall teile ich Ihnen die berücksichtigten Versicherer und die Markt- und Informationsgrundlage vor Ihrer Vertragserklärung in Textform mit (§ 60 Abs. 2, § 62 Abs. 1 VVG). Zugang zu den Versicherern habe ich über Maklerpools. Meine Vergütung erhalte ich von Versicherern und Maklerpools, Einzelheiten stehen weiter unten."
      },
      {
        "art": "p",
        "text": "Bei Betrieben berate ich unter anderem Handwerk und Bau, Pflege, Gastronomie, Landwirtschaft, Kfz-Betriebe und Reinigungsfirmen. Daneben habe ich auch Unternehmen aus anderen Branchen beraten. Ich arbeite von Alfeld aus im Homeoffice. Termine finden in der Regel bei Ihnen im Betrieb statt, auf Wunsch auch online."
      },
      {
        "art": "p",
        "text": "So läuft eine Beratung ab:"
      },
      {
        "art": "ul",
        "punkte": [
          "**Kennenlernen.** Wir sprechen über Ihren Betrieb, Ihre Risiken und Ihre Ziele.",
          "**Bestandscheck.** Ich prüfe, was Sie schon haben und ob es Lücken oder Doppelabsicherungen gibt.",
          "**Vorschlag.** Sie bekommen einen nachvollziehbaren Vergleich der berücksichtigten Angebote und entscheiden in Ruhe."
        ]
      },
      {
        "art": "h2",
        "text": "Erlaubnisse und Registernummern"
      },
      {
        "art": "p",
        "text": "Meine Erlaubnisse nach § 34d GewO (Versicherungen), § 34f GewO (Finanzanlagen) und § 34i GewO (Immobiliardarlehen) hat die IHK Hannover erteilt. Im Vermittlerregister kann jeder sie nachprüfen:"
      },
      {
        "art": "ul",
        "punkte": [
          "Versicherungsmakler nach § 34d Abs. 1 GewO: D-JOOT-NRHZP-02",
          "Finanzanlagenvermittler nach § 34f GewO: D-F-133-PEHS-92",
          "Immobiliardarlehensvermittler nach § 34i GewO: D-W-133-6P5U-60"
        ]
      },
      {
        "art": "p",
        "text": "Die dazugehörigen Sachkundeprüfungen habe ich vor der IHK bestanden. Die Bescheinigungen tragen die vorgeschriebenen Bezeichnungen „Geprüfter Fachmann für Versicherungsvermittlung IHK“ (§ 34d GewO), „Geprüfter Finanzanlagenfachmann IHK“ (§ 34f GewO) und „Geprüfter Fachmann für Immobiliardarlehensvermittlung IHK“ (§ 34i GewO)."
      },
      {
        "art": "p",
        "text": "Das Vermittlerregister führen die Industrie- und Handelskammern. Sie bedienen sich dabei einer gemeinsamen Stelle, der DIHK, Deutsche Industrie- und Handelskammer (www.vermittlerregister.info). Eine Vermögensschaden-Haftpflichtversicherung für alle Erlaubnisse besteht, die Angaben dazu stehen im Impressum."
      },
      {
        "art": "h2",
        "text": "Wie die Beratung vergütet wird"
      },
      {
        "art": "p",
        "text": "Für die Vermittlung erhalte ich vom Versicherer eine Provision, die Courtage. Sie ist in der Versicherungsprämie enthalten. Dazu kommen weitere Zuwendungen von Versicherern und Maklerpools, zum Beispiel Bestandspflegevergütungen und Boni. Eine gesonderte Vergütung, die Sie direkt an mich zahlen, gibt es nur, wenn ich sie vorab ausdrücklich mit Ihnen vereinbare. Ohne eine solche Vereinbarung berechne ich Ihnen kein gesondertes Honorar. Meine Vergütung stammt dann aus der Courtage, die in Ihrer Prämie enthalten ist, und aus den genannten weiteren Zuwendungen. Alle Angaben, auch zu Beteiligungen und zur Schlichtung, stehen in der Erstinformation."
      },
      {
        "art": "h2",
        "text": "Wie die Inhalte dieser Website geprüft werden"
      },
      {
        "art": "p",
        "text": "Die Fachseiten dieser Website, also die Orts-, Branchen-, Ratgeber- und Übersichtsseiten sowie diese Seite, lese und prüfe ich vor der Veröffentlichung selbst und gebe sie frei. Ich trage die redaktionelle Verantwortung. Gesetzesangaben werden vor meiner Freigabe am amtlichen Gesetzestext abgeglichen. Die Quellen stehen mit Abruf- oder Stand-Datum auf der jeweiligen Seite. Das Stand-Datum ändere ich nur, wenn eine Seite inhaltlich überprüft wurde. Die Seiten enthalten allgemeine Informationen, keine individuelle Rechts-, Steuer- oder Anlageberatung. Steuerliche Fragen setzen Sie mit Ihrem Steuerberater um."
      },
      {
        "art": "h2",
        "text": "So erreichen Sie mich"
      },
      {
        "art": "p",
        "text": "Telefon: +49 170 8784889. E-Mail: a.tito@smarterfinanz.de. Anschrift und weitere Pflichtangaben finden Sie im Impressum, Hinweise zum Datenschutz in der Datenschutzerklärung. Wann Sie am besten erreichbar sind, können Sie im Anfrageformular angeben."
      }
    ],
    "faq": [
      {
        "frage": "Sind Sie als Versicherungsmakler registriert, und wie kann ich das prüfen?",
        "antwort": "Ja. Meine Erlaubnis nach § 34d Abs. 1 GewO ist im Vermittlerregister unter der Nummer D-JOOT-NRHZP-02 eingetragen. Sie können sie auf www.vermittlerregister.info selbst nachprüfen. Die Erlaubnis hat die IHK Hannover erteilt."
      },
      {
        "frage": "Arbeiten Sie für einen Versicherer?",
        "antwort": "Nein, kein Versicherer hat mich mit der Vermittlung betraut. Ich bin Versicherungsmakler und übernehme die Vermittlung oder den Abschluss von Versicherungsverträgen gewerbsmäßig für den Auftraggeber (§ 59 Abs. 3 VVG). Zugang zu den Versicherern habe ich über Maklerpools. Meine Vergütung erhalte ich von Versicherern: als Courtage, die in der Prämie enthalten ist, und über weitere Zuwendungen von Versicherern und Maklerpools."
      },
      {
        "frage": "Wie wird Ihre Beratung vergütet?",
        "antwort": "Über die Courtage, die der Versicherer zahlt und die in der Prämie enthalten ist, sowie über weitere Zuwendungen von Versicherern und Maklerpools. Eine gesonderte Vergütung gibt es nur nach vorheriger ausdrücklicher Vereinbarung. Die Einzelheiten stehen in der Erstinformation."
      },
      {
        "frage": "Wo finden Termine statt?",
        "antwort": "In der Regel bei Ihnen im Betrieb, auf Wunsch online. Ich arbeite von Alfeld aus im Homeoffice, ein Büro mit Kundenverkehr gibt es nicht."
      },
      {
        "frage": "Welche Betriebe beraten Sie?",
        "antwort": "Unter anderem Handwerk und Bau, Pflege, Gastronomie, Landwirtschaft, Kfz-Betriebe und Reinigungsfirmen. Daneben habe ich auch Unternehmen aus anderen Branchen beraten. Sprechen Sie mich an, wenn Ihre Branche nicht dabei ist."
      }
    ],
    "links": [
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      },
      {
        "pfad": "/impressum",
        "text": "Impressum"
      },
      {
        "pfad": "/datenschutz",
        "text": "Datenschutzerklärung"
      },
      {
        "pfad": "/weser-und-leinebergland",
        "text": "Gewerbeversicherung im Weser- und Leinebergland"
      },
      {
        "pfad": "/orte/alfeld",
        "text": "Gewerbeversicherung in Alfeld (Leine)"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/#anfrage",
        "text": "Gewerbe-Gespräch anfragen"
      }
    ],
    "quellen": [
      "Impressum von Smarter Finanz (Registernummern, Erlaubnisbehörde, Berufshaftpflicht), https://www.smarterfinanz.de/impressum. Abruf: 14.10.2026.",
      "Erstinformation von Smarter Finanz, Stand 16.10.2026 (Vergütung, Auswahl, Zugang über Maklerpools), https://www.smarterfinanz.de/erstinformation.",
      "§ 59 VVG (Begriff des Versicherungsmaklers), § 60 VVG (hinreichende Zahl von Verträgen und Versicherern) und § 62 VVG (Textform), https://www.gesetze-im-internet.de/vvg_2008/__59.html, /__60.html und /__62.html. Abruf: 14.10.2026.",
      "§ 34d GewO und § 11a GewO (Vermittlerregister), https://www.gesetze-im-internet.de/gewo/__34d.html und /__11a.html. Abruf: 14.10.2026.",
      "Vermittlerregister, https://www.vermittlerregister.info und https://www.vermittlerregister.info/impressum (Aufgabe der DIHK als gemeinsame Stelle). Abruf: 14.10.2026.",
      "Anlage 2 der VersVermV, der FinVermV und der ImmVermV (vorgeschriebene Bezeichnungen der Sachkundeprüfungen), https://www.gesetze-im-internet.de/versvermv_2018/, /finvermv/ und /immvermv/. Abruf: 15.10.2026."
    ],
    "cta": {
      "text": "Sie möchten wissen, wo Ihr Betrieb steht? Fragen Sie ein Gewerbe-Gespräch an. Das Gespräch ist unverbindlich. Wie ich als Versicherungsmakler vergütet werde, steht in der Erstinformation."
    }
  },
  {
    "typ": "hub",
    "slug": "weser-und-leinebergland",
    "published": true,
    "title": "Gewerbeversicherung im Weser- und Leinebergland",
    "description": "Versicherungsmakler für Betriebe im Weser- und Leinebergland: Alfeld, Holzminden, Höxter, in und um Hildesheim und Hannover. Zuständigkeiten und Ablauf.",
    "h1": "Gewerbeversicherung im Weser- und Leinebergland",
    "kurzname": "Weser- und Leinebergland",
    "stand": "Oktober 2026",
    "einleitung": [
      "Smarter Finanz, Inhaber André Tito, berät Betriebe im Weser- und Leinebergland. Im Leinebergland arbeiten wir von Alfeld aus, im Weserbergland sind es Holzminden und Höxter. Dazu kommen Betriebe in und um Hildesheim und Hannover, die wir nicht zum Bergland zählen, aber ebenfalls beraten. Wir sind Versicherungsmakler: Kein Versicherer hat uns mit der Vermittlung betraut (§ 59 Abs. 3 VVG). Unsere Vergütung erhalten wir von Versicherern und Maklerpools. Diese Seite zeigt, wo wir beraten, welche Kammer und welche Handwerksvertretung für Ihren Betrieb in Frage kommt und wie eine Beratung abläuft."
    ],
    "kurz": [
      {
        "frage": "Wo beraten Sie Betriebe?",
        "antwort": "Im Weser- und Leinebergland, in Alfeld, Holzminden und Höxter, sowie in und um Hildesheim und Hannover. Wir arbeiten von Alfeld aus; Termine finden in der Regel bei Ihnen im Betrieb statt, auf Wunsch online."
      },
      {
        "frage": "Welche Kammer ist zuständig?",
        "antwort": "Das richtet sich nach der Betriebsstätte und danach, ob Ihr Betrieb ein Handwerksbetrieb ist: Handwerksbetriebe gehören zur Handwerkskammer, andere Gewerbebetriebe zur Industrie- und Handelskammer, manche Betriebe zu beiden. In Alfeld, Hildesheim und Holzminden sind es die IHK Hannover und die Handwerkskammer Hildesheim-Südniedersachsen, in Höxter die IHK Ostwestfalen und die Handwerkskammer Ostwestfalen-Lippe. Die Tabelle weiter unten zeigt alle Orte."
      },
      {
        "frage": "Welche Betriebe beraten Sie?",
        "antwort": "Unter anderem Handwerk und Bau, Pflege, Gastronomie, Landwirtschaft, Kfz-Betriebe und Reinigungsfirmen, daneben auch Unternehmen anderer Branchen."
      },
      {
        "frage": "Was heißt „Makler“?",
        "antwort": "Ein Versicherungsmakler übernimmt die Vermittlung für den Auftraggeber, ohne von einem Versicherer oder Versicherungsvertreter damit betraut zu sein (§ 59 Abs. 3 VVG). Wie wir vergütet werden, steht in der Antwort auf die Frage „Wie wird Ihre Beratung vergütet?“ weiter unten."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Wo wir Betriebe beraten"
      },
      {
        "art": "p",
        "text": "Wir arbeiten von Alfeld (Leine) aus, im Homeoffice. Ein Ladenlokal oder Büro mit Kundenverkehr gibt es nicht. Dafür kommen wir in der Regel zu Ihnen in den Betrieb; auf Wunsch sprechen wir online."
      },
      {
        "art": "ul",
        "punkte": [
          "**Leinebergland:** Alfeld (Leine), Elze, Freden (Leine), Lamspringe, Sibbesse sowie Gronau (Leine), Duingen und Eime. So fasst der Weserbergland-Tourismus e. V. das Leinebergland zusammen.",
          "**Weserbergland:** Holzminden und Höxter. Beide Städte liegen an der Weser, Holzminden in Niedersachsen, Höxter in Nordrhein-Westfalen.",
          "**In und um Hildesheim und Hannover:** Diese beiden Städte zählen wir nicht zum Bergland. Wir beraten dort Betriebe ebenfalls von Alfeld aus."
        ]
      },
      {
        "art": "h2",
        "text": "Welche Kammer und welche Handwerksvertretung gibt es für Ihren Betrieb?"
      },
      {
        "art": "p",
        "text": "Welche Kammer für Ihren Betrieb zuständig ist, richtet sich nach dem Ort Ihrer Betriebsstätte, bei Höxter sogar nach dem Bundesland. In der Regel gehören Inhaber von Handwerksbetrieben und handwerksähnlichen Betrieben zur Handwerkskammer (§ 90 Abs. 2 HwO) und die übrigen Gewerbebetriebe, die zur Gewerbesteuer veranlagt sind, zur Industrie- und Handelskammer (§ 2 Abs. 1 IHKG). Hat ein Handwerksbetrieb auch einen nichthandwerklichen Betriebsteil, gehört er mit diesem Betriebsteil zusätzlich zur Industrie- und Handelskammer (§ 2 Abs. 3 IHKG). Wer ausschließlich einen freien Beruf ausübt oder wer Land- oder Forstwirtschaft oder ein damit verbundenes Nebengewerbe betreibt, gehört zur Industrie- und Handelskammer nur, soweit er im Handelsregister eingetragen ist (§ 2 Abs. 2 IHKG). Ob für landwirtschaftliche Betriebe daneben eine Landwirtschaftskammer in Betracht kommt, richtet sich nach Landesrecht, fragen Sie hierzu die Kammer. Die Kammerzugehörigkeit ergibt sich aus dem Gesetz. Die Mitgliedschaft in einer Handwerksinnung ist dagegen freiwillig (§ 58 Abs. 1 HwO). Die Kreishandwerkerschaft ist der Zusammenschluss der Innungen eines Stadt- oder Landkreises (§ 86 HwO); die Handwerkskammer kann eine andere Abgrenzung zulassen."
      },
      {
        "art": "tabelle",
        "titel": "Kammern und Kreishandwerkerschaften nach Ort (Stand der Angaben: 14.10.2026)",
        "kopf": [
          "Ort",
          "Industrie- und Handelskammer",
          "Handwerkskammer",
          "Kreishandwerkerschaft"
        ],
        "zeilen": [
          [
            "Alfeld (Leine)",
            "IHK Hannover, Geschäftsstelle Hildesheim",
            "Handwerkskammer Hildesheim-Südniedersachsen",
            "Hildesheim-Alfeld; geplant ab 1. Januar 2027: Hildesheim-Weserbergland mit Hauptsitz in Alfeld"
          ],
          [
            "Hildesheim",
            "IHK Hannover, Geschäftsstelle Hildesheim",
            "Handwerkskammer Hildesheim-Südniedersachsen",
            "Hildesheim-Alfeld; geplant ab 1. Januar 2027: Hildesheim-Weserbergland"
          ],
          [
            "Holzminden",
            "IHK Hannover, Geschäftsstelle Hildesheim (Ansprechpartner für die Landkreise Hildesheim und Holzminden)",
            "Handwerkskammer Hildesheim-Südniedersachsen",
            "Holzminden; geplant ab 1. Januar 2027: Hildesheim-Weserbergland mit einer Geschäftsstelle in Holzminden"
          ],
          [
            "Höxter (Nordrhein-Westfalen)",
            "IHK Ostwestfalen zu Bielefeld, Zweigstelle Paderborn + Höxter",
            "Handwerkskammer Ostwestfalen-Lippe zu Bielefeld",
            "Höxter-Warburg"
          ],
          [
            "Hannover (Stadt)",
            "IHK Hannover",
            "Handwerkskammer Hannover",
            "Hannover"
          ]
        ]
      },
      {
        "art": "p",
        "text": "Die Mitglieder der Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden haben nach Angaben der Handwerkskammer Hildesheim-Südniedersachsen und der Kreishandwerkerschaft Hildesheim-Alfeld (Stand 3. September 2026) beschlossen, sich zum 1. Januar 2027 zur Kreishandwerkerschaft Hildesheim-Weserbergland zusammenzuschließen. Sie soll 29 Mitgliedsinnungen mit rund 840 Mitgliedsbetrieben vertreten. Der Hauptsitz soll in Alfeld liegen, in Holzminden soll eine Geschäftsstelle bleiben. Die Spalte „Kreishandwerkerschaft“ nennt Organisationen des Handwerks, nicht Stellen von Smarter Finanz."
      },
      {
        "art": "p",
        "text": "Gut zu wissen: Ihre Tätigkeit ist bei zulassungspflichtigen Handwerken in der Handwerksrolle (§ 6 HwO), bei zulassungsfreien Handwerken und handwerksähnlichen Gewerben im Verzeichnis der Handwerkskammer (§ 19 HwO) und für stehende Gewerbe in der Gewerbeanzeige (§ 14 GewO) festgehalten. Die Betriebsbeschreibung in Ihrer Betriebshaftpflicht sollte zu dem passen, was Ihr Betrieb tatsächlich tut, sonst kann der Versicherungsschutz gefährdet sein (§ 19 und § 23 VVG). Eintragung und Gewerbeanzeige sollten dazu stimmen. Für eine verbindliche Auskunft zur Mitgliedschaft wenden Sie sich bitte an Ihre Kammer."
      },
      {
        "art": "h2",
        "text": "Welche Betriebe wir beraten"
      },
      {
        "art": "p",
        "text": "Wir beraten unter anderem Handwerk und Bau, Pflege, Gastronomie, Landwirtschaft, Kfz-Betriebe und Reinigungsfirmen. Daneben haben wir auch Unternehmen aus anderen Branchen beraten. Für das Handwerk gibt es eine eigene Seite mit den Fragen, die für Handwerk und Bau typisch sind. Für die übrigen Branchen sprechen Sie uns einfach an."
      },
      {
        "art": "h2",
        "text": "Wie eine Beratung abläuft"
      },
      {
        "art": "ul",
        "punkte": [
          "**Kennenlernen.** Wir sprechen über Ihren Betrieb, Ihre Risiken und Ihre Ziele.",
          "**Bestandscheck.** Wir prüfen, was Sie schon haben und ob es Lücken oder Doppelabsicherungen gibt.",
          "**Vorschlag.** Sie bekommen einen nachvollziehbaren Vergleich der berücksichtigten Angebote und entscheiden in Ruhe."
        ]
      },
      {
        "art": "p",
        "text": "Wir legen unserer Beratung eine hinreichende Zahl von am Markt angebotenen Verträgen und Versicherern zugrunde. Wählen wir im Einzelfall eine eingeschränkte Auswahl, sagen wir Ihnen das vor Ihrer Vertragserklärung ausdrücklich und nennen Ihnen die berücksichtigten Versicherer (§ 60 Abs. 1 und 2 VVG)."
      },
      {
        "art": "h2",
        "text": "Was wir nicht tun"
      },
      {
        "art": "p",
        "text": "Eine Rechtsberatung, die über die Beratung zu Versicherungsverträgen hinausgeht, und Steuerberatung bieten wir nicht an. Steuerliche Fragen setzen Sie mit Ihrem Steuerberater um, weitere Rechtsfragen gehören zu einem Rechtsanwalt. Diese Seite enthält allgemeine Informationen und ersetzt keine individuelle Beratung."
      }
    ],
    "faq": [
      {
        "frage": "Wo beraten Sie Betriebe, und wo nicht?",
        "antwort": "Wir beraten Betriebe im Weser- und Leinebergland, in Alfeld, Holzminden und Höxter, sowie in und um Hildesheim und Hannover. Liegt Ihr Betrieb woanders, schreiben Sie uns kurz. Wir sagen Ihnen offen, ob wir zu Ihnen passen."
      },
      {
        "frage": "Welche Kammer ist für meinen Betrieb zuständig?",
        "antwort": "Das richtet sich nach dem Ort Ihrer Betriebsstätte und danach, ob Ihr Betrieb ein Handwerksbetrieb ist: Handwerksbetriebe gehören in der Regel zur Handwerkskammer, andere Gewerbebetriebe zur Industrie- und Handelskammer, manche Betriebe zu beiden. Die Tabelle oben nennt die Kammern für Alfeld, Hildesheim, Holzminden, Höxter und Hannover. Für eine verbindliche Auskunft zur Mitgliedschaft fragen Sie Ihre Kammer."
      },
      {
        "frage": "Was unterscheidet einen Versicherungsmakler von der Agentur eines Versicherers?",
        "antwort": "Ein Versicherungsvertreter ist von einem Versicherer oder von einem anderen Versicherungsvertreter damit betraut, gewerbsmäßig Versicherungsverträge zu vermitteln oder abzuschließen (§ 59 Abs. 2 VVG). Das gilt auch, wenn er für mehrere Versicherer tätig ist. Ein Versicherungsmakler übernimmt die Vermittlung oder den Abschluss für den Auftraggeber, ohne von einem Versicherer oder von einem Versicherungsvertreter damit betraut zu sein (§ 59 Abs. 3 VVG). Er muss seiner Beratung grundsätzlich eine hinreichende Zahl von auf dem Markt angebotenen Verträgen und Versicherern zugrunde legen. Das gilt nicht, soweit er den Versicherungsnehmer im Einzelfall vor Abgabe der Vertragserklärung ausdrücklich auf eine eingeschränkte Auswahl hinweist (§ 60 Abs. 1 VVG). Wir sind Makler. Wir erhalten unsere Vergütung von Versicherern und Maklerpools."
      },
      {
        "frage": "Wie läuft eine erste Beratung ab?",
        "antwort": "Sie schildern uns kurz Ihren Betrieb, wir vereinbaren einen Termin bei Ihnen im Betrieb oder online. Dort sprechen wir über Ihre Tätigkeiten, Ihre vorhandenen Verträge und offene Fragen. Danach prüfen wir den Bestand und machen Ihnen einen nachvollziehbaren Vorschlag."
      },
      {
        "frage": "Wie wird Ihre Beratung vergütet?",
        "antwort": "Für die Vermittlung erhalten wir eine Provision (Courtage) vom Versicherer, die in der Prämie enthalten ist, sowie weitere Zuwendungen von Versicherern und Maklerpools. Eine gesonderte Vergütung, die Sie direkt an uns zahlen, gibt es nur, wenn wir sie vorab ausdrücklich mit Ihnen vereinbaren. Einzelheiten stehen in der Erstinformation."
      }
    ],
    "links": [
      {
        "pfad": "/ueber-andre",
        "text": "Über André Tito"
      },
      {
        "pfad": "/orte/alfeld",
        "text": "Gewerbeversicherung in Alfeld (Leine)"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      },
      {
        "pfad": "/impressum",
        "text": "Impressum"
      },
      {
        "pfad": "/datenschutz",
        "text": "Datenschutzerklärung"
      },
      {
        "pfad": "/",
        "text": "Startseite"
      }
    ],
    "quellen": [
      "IHK Hannover, Kontakt und Geschäftsstellen (Geschäftsstelle Hildesheim für die Landkreise Hildesheim und Holzminden; Hauptsitz Hannover), https://www.ihk.de/hannover/hauptnavigation/wir-ueber-uns/kontakt. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Informationen zur Handwerkskammer (Landkreise Hildesheim, Holzminden, Northeim, Göttingen), https://www.hwk-hildesheim.de/artikel/informationen-zur-handwerkskammer-24,0,1608.html. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Pressemitteilung „Gemeinsam stärker: Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden streben Fusion an“ (Fusion zum 1. Januar 2027), https://www.hwk-hildesheim.de/artikel/gemeinsam-staerker-kreishandwerkerschaften-hildesheim-alfeld-und-holzminden-streben-fusion-an-24,0,3606.html. Abruf: 14.10.2026.",
      "Kreishandwerkerschaft Hildesheim-Alfeld, Meldung vom 03.09.2026 zur Fusion, https://www.handwerk-hildesheim-alfeld.de/kreishandwerkerschaft/aktuelles/217/917-kreishandwerkerschaften-hildesheim-alfeld-und-holzminden-fus.htm. Abruf: 14.10.2026.",
      "IHK Ostwestfalen zu Bielefeld, IHK-Mitgliedsunternehmen nach Kreisen (darunter Kreis Höxter), https://www.ihk.de/ostwestfalen/region-ostwestfalen/zahlen-daten-fakten/ihk-mitgliedsunternehmen-6763724, und Zweigstelle Paderborn + Höxter, https://www.ihk.de/ostwestfalen/ihre-ihk/kontakt/anfahrt-und-oeffnungszeiten/zweigstelle-paderborn-6790666. Abruf: 14.10.2026.",
      "Handwerkskammer Ostwestfalen-Lippe zu Bielefeld, Handwerksfamilie (Kammerbezirk umfasst den Kreis Höxter), https://www.handwerk-owl.de/artikel/handwerksfamilie-ostwestfalen-lippe-35,0,107.html. Abruf: 14.10.2026.",
      "Kreishandwerkerschaft Höxter-Warburg, https://kh-hx.de/, und Kreishandwerkerschaft Hannover, https://www.kh-hannover.de/. Abruf: 14.10.2026.",
      "Handwerkskammer Hannover, Wer wir sind, https://www.hwk-hannover.de/artikel/wer-wir-sind-23,0,6450.html. Abruf: 14.10.2026.",
      "Weserbergland-Tourismus e. V., Das Leinebergland, https://www.weserbergland-tourismus.de/de/page/das-leinebergland/54752760/. Abruf: 14.10.2026.",
      "Wikipedia, Weserbergland (Holzminden und Höxter unter den Städten des Weserberglands), https://de.wikipedia.org/wiki/Weserbergland. Abruf: 14.10.2026.",
      "§ 59 und § 60 VVG, https://www.gesetze-im-internet.de/vvg_2008/__59.html und /__60.html. Abruf: 14.10.2026.",
      "Handwerksordnung (§ 6, § 19, § 58, § 86, § 90), https://www.gesetze-im-internet.de/hwo/__6.html, /__19.html, /__58.html, /__86.html und /__90.html; IHK-Gesetz (§ 2), https://www.gesetze-im-internet.de/ihkg/__2.html; § 14 GewO, https://www.gesetze-im-internet.de/gewo/__14.html; § 19 und § 23 VVG, https://www.gesetze-im-internet.de/vvg_2008/__19.html und /__23.html. Abruf: 14.10.2026.",
      "Erstinformation von Smarter Finanz, Stand 16.10.2026, https://www.smarterfinanz.de/erstinformation."
    ],
    "cta": {
      "text": "Sie möchten wissen, wo Ihr Betrieb steht? Fragen Sie ein Gewerbe-Gespräch an. Das Gespräch ist unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der Erstinformation."
    }
  },
  {
    "typ": "ort",
    "slug": "alfeld",
    "published": true,
    "title": "Gewerbeversicherung Alfeld (Leine) | Smarter Finanz",
    "description": "Versicherungsmakler in Alfeld (Leine) für Betriebe im Leinebergland: Haftpflicht, Inhalt, Cyber. Mit Hinweisen zu Hochwasser und Kammern. Unverbindlich.",
    "h1": "Gewerbeversicherung in Alfeld (Leine) und im Leinebergland",
    "kurzname": "Alfeld (Leine)",
    "stand": "Oktober 2026",
    "bilder": [
      "alfeld"
    ],
    "einleitung": [
      "Smarter Finanz berät Betriebe in Alfeld (Leine) und im Leinebergland. André Tito wohnt seit seiner Ausbildung in Alfeld und arbeitet von hier aus. Ein Büro mit Kundenverkehr gibt es nicht: Wir kommen in der Regel zu Ihnen in den Betrieb, auf Wunsch sprechen wir online. Auf dieser Seite finden Sie, was für Betriebe in Alfeld besonders zählt: die Kammern und Verbände vor Ort, die Lage an der Leine und die Orte rund um Alfeld."
    ],
    "kurz": [
      {
        "frage": "Wer ist Ihr Ansprechpartner bei Smarter Finanz?",
        "antwort": "André Tito, Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 GewO (Registernummer D-JOOT-NRHZP-02). Als Versicherungsmakler ist er im Auftrag des Kunden tätig und nicht im Auftrag eines Versicherers; wie er vergütet wird, steht in der Erstinformation. Er wohnt in Alfeld."
      },
      {
        "frage": "Welche Kammern und Verbände gibt es für Betriebe in Alfeld?",
        "antwort": "Die IHK Hannover (Geschäftsstelle Hildesheim) und die Handwerkskammer Hildesheim-Südniedersachsen. Die Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden haben beschlossen, zum 1. Januar 2027 die Kreishandwerkerschaft Hildesheim-Weserbergland mit Hauptsitz in Alfeld zu bilden."
      },
      {
        "frage": "Muss ich als Betrieb in Alfeld eine Betriebshaftpflicht haben?",
        "antwort": "Eine allgemeine gesetzliche Pflicht für jedes Gewerbe gibt es nicht. In bestimmten Berufen ist sie vorgeschrieben, und Auftraggeber können sie vertraglich verlangen."
      },
      {
        "frage": "Schützt die Betriebshaftpflicht bei Hochwasser an der Leine?",
        "antwort": "Nicht für Schäden an Ihrem eigenen Betrieb. Die Betriebshaftpflicht leistet, wenn Dritte Schadensersatzansprüche gegen Sie haben. Eigene Schäden durch Hochwasser, Überschwemmung oder Starkregen sind nach den Beschreibungen des GDV zur Wohngebäude- und Hausratversicherung in der Regel nur versichert, wenn ein Elementarbaustein vereinbart ist. Für Betriebe kommt es auf Ihren Vertrag an, maßgeblich sind immer dessen Bedingungen."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Wer ist Ihr Ansprechpartner?"
      },
      {
        "art": "p",
        "text": "Smarter Finanz ist der Name, unter dem André Tito als Versicherungsmakler arbeitet. Er hat die Erlaubnis nach § 34d Abs. 1 GewO und ist nicht an einen Versicherer gebunden. Seiner Beratung legt er eine hinreichende Zahl von am Markt angebotenen Verträgen und Versicherern zugrunde (§ 60 Abs. 1 VVG). Wählt er im Einzelfall eine eingeschränkte Auswahl, weist er Sie vor Ihrer Vertragserklärung ausdrücklich darauf hin, nennt Ihnen die berücksichtigten Versicherer und teilt Ihnen mit, auf welcher Markt- und Informationsgrundlage er arbeitet (§ 60 Abs. 2 VVG). Er wohnt seit seiner Ausbildung in Alfeld und arbeitet von hier aus im Homeoffice. Wer er ist und wie er arbeitet, steht auf der Seite „Über André Tito“. Wie die Beratung vergütet wird, steht in der Erstinformation."
      },
      {
        "art": "h2",
        "text": "Welche Kammern und Verbände gibt es für Betriebe in Alfeld?"
      },
      {
        "art": "ul",
        "punkte": [
          "**Industrie- und Handelskammer:** Für Alfeld ist die IHK Hannover zuständig. Regionaler Ansprechpartner ist ihre Geschäftsstelle Hildesheim, die für die Landkreise Hildesheim und Holzminden da ist. Ob Ihr Betrieb Mitglied der IHK ist, hängt unter anderem von der Gewerbesteuerveranlagung und der Betriebsstätte ab (§ 2 IHKG).",
          "**Handwerkskammer:** Alfeld gehört zum Bezirk der Handwerkskammer Hildesheim-Südniedersachsen. Zum 31. Dezember 2025 waren dort 7.148 Betriebe eingetragen, davon 2.575 im Landkreis Hildesheim.",
          "**Kreishandwerkerschaft:** Die Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden haben beschlossen, sich zum 1. Januar 2027 zur Kreishandwerkerschaft Hildesheim-Weserbergland zusammenzuschließen. Sie soll 29 Mitgliedsinnungen mit rund 840 Mitgliedsbetrieben vertreten, der Hauptsitz soll in Alfeld liegen.",
          "**Verein vor Ort:** Der Industrieverein Alfeld-Region e. V. ist ein freiwilliger Zusammenschluss und zählt nach eigenen Angaben über 100 Mitglieder aus Industrie, Handwerk, Dienstleistung und weiteren Bereichen."
        ]
      },
      {
        "art": "p",
        "text": "Eine Übersicht der Orte, aus denen sich Betriebe melden können, finden Sie auf der Seite zum Weser- und Leinebergland."
      },
      {
        "art": "h2",
        "text": "Wer in Alfeld wirtschaftet"
      },
      {
        "art": "p",
        "text": "Alfeld ist Standort des Fagus-Werks, das als lebendes Denkmal gilt, den Titel Welterbe trägt und noch heute als aktives Werk genutzt wird. Neben solchen Standorten gibt es in der Stadt und in der Umgebung Betriebe aus Handwerk, Handel und Dienstleistung. Wir wollen daraus keine Pauschalaussage ableiten: Welche Absicherung zu Ihrem Betrieb passt, hängt von Ihren Tätigkeiten und, etwa beim Thema Hochwasser, auch von der Lage Ihres Standorts ab."
      },
      {
        "art": "p",
        "text": "Wer auf fremden Geländen arbeitet, etwa bei einem Industriekunden, muss unter Umständen Nachweise über den Versicherungsschutz vorlegen. Wie so ein Nachweis aussieht, erklärt der Beitrag zum Nachweis der Betriebshaftpflicht."
      },
      {
        "art": "h2",
        "text": "Die Leine und das Hochwasser: Was Betriebe in Alfeld prüfen sollten"
      },
      {
        "art": "p",
        "text": "Die Stadt Alfeld (Leine) zeigt auf ihrer Seite zu Starkregenereignissen ein Foto vom Leinehochwasser im Januar 2024 in der Ziegelmasch mit Blick auf Föhrste. Sie schreibt, die Stadt sei in den vergangenen Jahren bereits von Starkregenereignissen betroffen gewesen, und die in den vergangenen Jahren gebauten Regenwasserrückhaltebecken hätten sehr gute Hilfe geleistet und Schlimmeres verhindert."
      },
      {
        "art": "p",
        "text": "Was heißt das für die Versicherung?"
      },
      {
        "art": "ul",
        "punkte": [
          "**Eigene Schäden:** Schäden an Einrichtung, Werkzeug und Waren, und am Gebäude, wenn Sie Eigentümer sind, sind Sache der Sachversicherung (Inhalt, Gebäude). Gegen Überschwemmung, Hochwasser und Starkregen sind sie nach den Beschreibungen des GDV zur Wohngebäude- und Hausratversicherung in der Regel nur versichert, wenn ein Elementarbaustein vereinbart ist; für Betriebe kommt es auf Ihren Vertrag an, maßgeblich sind immer dessen Bedingungen. Auch dann können die Bedingungen die Leistung begrenzen, zum Beispiel durch Selbstbehalt, Entschädigungsgrenzen oder Wartezeit.",
          "**Schäden bei anderen:** Die Betriebshaftpflicht leistet, wenn Dritte Schadensersatzansprüche gegen Sie haben. Ein Hochwasserschaden an Ihrem eigenen Betrieb gehört nicht dazu.",
          "**Betriebsausfall:** Steht der Betrieb nach einem versicherten Sachschaden still, kann eine Betriebsunterbrechungsversicherung den Ertragsausfall und laufende Kosten abdecken, sofern sie vereinbart ist und die Gefahr mit einschließt.",
          "**Lage der Adresse:** Die Versicherer können das Überschwemmungs- und Starkregenrisiko für jede Adresse in Deutschland mit dem System ZÜRS Geo einschätzen. Jede Adresse wird dabei einer Gefährdungsklasse zugeordnet, die den Versicherern unter anderem bei der Beitragskalkulation der Elementarschadenversicherung hilft. Welche Bedingungen für Ihren Standort gelten, hängt vom Versicherer und vom Tarif ab. Eine erste Einschätzung für eine Adresse bietet der Naturgefahren-Check der Versicherer, der nach Angabe des GDV für Immobilienbesitzer und Mieter gedacht ist. Auf den genannten GDV-Seiten findet sich dazu keine Angabe.",
          "**Rückstau:** Die Stadt Alfeld stellt ein Merkblatt ihres Entwässerungsamtes zum Schutz gegen Rückstau aus dem Abwassernetz bereit und verlinkt Hinweise der DWA zum Schutz vor Starkregen."
        ]
      },
      {
        "art": "h2",
        "text": "Aus welchen Orten sich Betriebe bei uns melden können"
      },
      {
        "art": "p",
        "text": "Zum Leinebergland nennt der Weserbergland-Tourismus e. V. neben Alfeld (Leine) auch Elze, Freden (Leine), Lamspringe und Sibbesse sowie die Samtgemeinde Leinebergland mit Gronau (Leine), Duingen und Eime. Betriebe aus diesen Orten können sich bei uns melden. Wir kommen in der Regel in den Betrieb, auf Wunsch sprechen wir online."
      },
      {
        "art": "h2",
        "text": "Welche Versicherungen für Betriebe in Alfeld in Betracht kommen"
      },
      {
        "art": "ul",
        "punkte": [
          "Betriebs- oder Berufshaftpflicht für Schäden bei Kunden und Dritten",
          "Inhalt mit Betriebsunterbrechung für Einrichtung, Werkzeug, Waren und Ertragsausfall",
          "Fahrzeuge: Für Kraftfahrzeuge und Anhänger, deren Halter der Betrieb ist, besteht Versicherungspflicht (§ 1 PflVG)",
          "Cyber, wenn Kundendaten oder Zahlungen über IT laufen",
          "Absicherung des Inhabers, weil im Krankheitsfall niemand weiterzahlt"
        ]
      },
      {
        "art": "p",
        "text": "Für Handwerk und Bau gibt es eine eigene Seite. Einen allgemeinen Überblick, was Pflicht und was sinnvoll ist, finden Sie im Beitrag zum Kleingewerbe."
      },
      {
        "art": "h2",
        "text": "So läuft die Beratung ab"
      },
      {
        "art": "ul",
        "punkte": [
          "**Kennenlernen.** Wir sprechen über Ihren Betrieb, Ihre Risiken und Ihre Ziele.",
          "**Bestandscheck.** Wir prüfen, was Sie schon haben und ob es Lücken oder Doppelabsicherungen gibt.",
          "**Vorschlag.** Sie bekommen einen nachvollziehbaren Vergleich der berücksichtigten Angebote und entscheiden in Ruhe."
        ]
      },
      {
        "art": "p",
        "text": "Wann Sie am besten erreichbar sind, geben Sie im Anfrageformular an. Wir melden uns dann in diesem Zeitfenster."
      }
    ],
    "faq": [
      {
        "frage": "Wer ist in Alfeld mein Ansprechpartner, und wo sitzen Sie?",
        "antwort": "Ihr Ansprechpartner ist André Tito. Er wohnt in Alfeld (Leine) und arbeitet von dort im Homeoffice. Ein Büro mit Kundenverkehr gibt es nicht. Termine finden in der Regel bei Ihnen im Betrieb statt, auf Wunsch online."
      },
      {
        "frage": "Welche Kammern und Verbände gibt es für Betriebe in Alfeld?",
        "antwort": "Für die Industrie- und Handelskammer die IHK Hannover mit ihrer Geschäftsstelle Hildesheim, für das Handwerk die Handwerkskammer Hildesheim-Südniedersachsen. Die Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden haben beschlossen, zum 1. Januar 2027 die Kreishandwerkerschaft Hildesheim-Weserbergland zu bilden. Für eine verbindliche Auskunft zur Mitgliedschaft fragen Sie Ihre Kammer."
      },
      {
        "frage": "Muss ich als Betrieb in Alfeld eine Betriebshaftpflicht haben?",
        "antwort": "Eine allgemeine Pflicht zur Betriebshaftpflicht für jedes Gewerbe gibt es nicht. Vorgeschrieben ist eine Berufshaftpflicht in bestimmten Berufen, etwa für Rechtsanwälte (§ 51 BRAO) und selbstständige Steuerberater (§ 67 StBerG). Auftraggeber, Vermieter oder Förderstellen können eine Betriebshaftpflicht außerdem vertraglich verlangen. Welche Pflichten für Ihren Betrieb gelten, klären Sie verbindlich mit Ihrer Kammer oder einem Rechtsanwalt."
      },
      {
        "frage": "Deckt meine Betriebshaftpflicht ein Hochwasser an meinem Betrieb?",
        "antwort": "Nicht für Ihre eigenen Schäden. Die Betriebshaftpflicht leistet, wenn Dritte Schadensersatzansprüche gegen Sie haben. Eigene Schäden an Einrichtung, Waren und, wenn Sie Eigentümer sind, am Gebäude sind Sache der Sachversicherung. Nach den Beschreibungen des GDV zur Wohngebäude- und Hausratversicherung ist Hochwasser dort in der Regel nur mit einem Elementarbaustein versichert. Für Betriebe kommt es auf Ihren Vertrag an. Ob und in welchem Umfang Hochwasser bei Ihnen versichert ist, steht in Ihrer Police und in den Bedingungen."
      },
      {
        "frage": "Aus welchen Orten können sich Betriebe bei Ihnen melden?",
        "antwort": "Betriebe aus den Orten, die der Weserbergland-Tourismus e. V. zum Leinebergland zählt: Alfeld (Leine), Elze, Freden (Leine), Lamspringe, Sibbesse, Gronau (Leine), Duingen und Eime."
      },
      {
        "frage": "Wie erreichen wir uns am besten?",
        "antwort": "Schreiben Sie uns über das Anfrageformular und nennen Sie dort Ihre bevorzugten Tage und Zeiten. Wir melden uns in diesem Zeitfenster per Telefon, Videogespräch oder mit einem Termin bei Ihnen im Betrieb."
      }
    ],
    "links": [
      {
        "pfad": "/weser-und-leinebergland",
        "text": "Gewerbeversicherung im Weser- und Leinebergland"
      },
      {
        "pfad": "/ueber-andre",
        "text": "Über André Tito"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "IHK Hannover, Kontakt und Geschäftsstellen, https://www.ihk.de/hannover/hauptnavigation/wir-ueber-uns/kontakt. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Informationen zur Handwerkskammer (7.148 Betriebe zum 31.12.2025; Landkreis Hildesheim 2.575), https://www.hwk-hildesheim.de/artikel/informationen-zur-handwerkskammer-24,0,1608.html. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Pressemitteilung zur Fusion der Kreishandwerkerschaften zum 1. Januar 2027, https://www.hwk-hildesheim.de/artikel/gemeinsam-staerker-kreishandwerkerschaften-hildesheim-alfeld-und-holzminden-streben-fusion-an-24,0,3606.html. Abruf: 14.10.2026.",
      "Kreishandwerkerschaft Hildesheim-Alfeld, Meldung vom 03.09.2026 zur Fusion, https://www.handwerk-hildesheim-alfeld.de/kreishandwerkerschaft/aktuelles/217/917-kreishandwerkerschaften-hildesheim-alfeld-und-holzminden-fus.htm. Abruf: 14.10.2026.",
      "Industrieverein Alfeld-Region e. V., https://www.iva-alfeld-region.de/. Abruf: 14.10.2026.",
      "Weserbergland-Tourismus e. V., Das Leinebergland (Kommunen, Fagus-Werk), https://www.weserbergland-tourismus.de/de/page/das-leinebergland/54752760/. Abruf: 14.10.2026.",
      "Stadt Alfeld (Leine), Starkregenereignisse (Foto Leinehochwasser Januar 2024, Rückhaltebecken, Merkblatt Rückstau), https://www.alfeld.de/buergerservice/bevoelkerungsschutz/starkregenereignisse. Abruf: 14.10.2026.",
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Naturgefahren und ZÜRS Geo, https://www.gdv.de/gdv/themen/klima/naturgefahren und https://www.gdv.de/gdv/themen/klima/-zuers-geo-zonierungssystem-fuer-ueberschwemmungsrisiko-und-einschaetzung-von-umweltrisiken-11656. Abruf: 14.10.2026.",
      "GDV, Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand November 2025, unverbindliche Empfehlung), https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 14.10.2026.",
      "IHK-Gesetz (IHKG) § 2, https://www.gesetze-im-internet.de/ihkg/__2.html. Abruf: 14.10.2026.",
      "§ 59 und § 60 VVG, https://www.gesetze-im-internet.de/vvg_2008/__59.html und /__60.html; § 34d GewO, https://www.gesetze-im-internet.de/gewo/__34d.html; § 1 und § 1a PflVG, https://www.gesetze-im-internet.de/pflvg/__1.html. Abruf: 14.10.2026.",
      "§ 51 BRAO, https://www.gesetze-im-internet.de/brao/__51.html, und § 67 StBerG, https://www.gesetze-im-internet.de/stberg/__67.html. Abruf: 14.10.2026."
    ],
    "cta": {
      "text": "Sie führen einen Betrieb in Alfeld oder im Leinebergland und möchten Ihren Versicherungsschutz prüfen lassen? Fragen Sie ein Gewerbe-Gespräch an. Das Gespräch ist unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der Erstinformation."
    }
  },
  {
    "typ": "branche",
    "slug": "handwerk-bau",
    "published": true,
    "title": "Versicherungen für Handwerksbetriebe | Smarter Finanz",
    "description": "Betriebshaftpflicht, Inhalt, Fahrzeuge und Cyber für Handwerk und Bau: Betriebsbeschreibung, Subunternehmer, Nachweise für Auftraggeber. Unverbindlich.",
    "h1": "Versicherungen für Handwerk und Bau im Weser- und Leinebergland",
    "kurzname": "Handwerk und Bau",
    "stand": "Oktober 2026",
    "einleitung": [
      "Diese Seite richtet sich an Handwerks- und Baubetriebe. Hier finden Sie, welche Versicherungen für einen Handwerksbetrieb in Betracht kommen, warum die Betriebsbeschreibung so wichtig ist, was Auftraggeber verlangen können und wie ein Betriebs-Check bei uns abläuft. Wir sind Versicherungsmakler und nicht an einen Versicherer gebunden; wie wir vergütet werden, steht in der Erstinformation. Wir arbeiten von Alfeld aus."
    ],
    "kurz": [
      {
        "frage": "Welche Versicherungen kommen für einen Handwerksbetrieb in Betracht?",
        "antwort": "Je nach Betrieb die Betriebshaftpflicht, die Inhaltsversicherung für Werkzeug und Material mit Betriebsunterbrechung, die Fahrzeugversicherung, Cyber, Rechtsschutz und die Absicherung des Inhabers."
      },
      {
        "frage": "Was ist Pflicht?",
        "antwort": "Eine allgemeine Pflicht zur Betriebshaftpflicht gibt es nicht. Gesetzliche Pflichten bestehen unter anderem für die Kfz-Haftpflicht der Fahrzeuge, deren Halter Sie sind (§ 1 PflVG), für die Mitteilung Ihres Unternehmens an den zuständigen Unfallversicherungsträger binnen einer Woche nach Beginn (§ 192 SGB VII), für die Krankenversicherung (§ 193 Abs. 3 VVG) und, wenn Sie als Gewerbetreibender in die Handwerksrolle eingetragen sind und die dafür erforderlichen Voraussetzungen in Ihrer Person erfüllen, für die gesetzliche Rentenversicherung (§ 2 Satz 1 Nr. 8 SGB VI). Welche weiteren Pflichten für Ihren Betrieb gelten, klären Sie mit Ihrer Handwerkskammer, dem Unfallversicherungsträger oder einem Rechtsanwalt."
      },
      {
        "frage": "Was verlangen Auftraggeber?",
        "antwort": "Auftraggeber können einen Nachweis der Betriebshaftpflicht mit Versicherungssummen verlangen. Das regeln Vertrag oder Ausschreibung."
      },
      {
        "frage": "Warum zählt die Betriebsbeschreibung?",
        "antwort": "Sie legt fest, welche Tätigkeiten versichert sind. Fehlt eine Tätigkeit, kann der Versicherungsschutz strittig werden."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Welche Versicherungen kommen für einen Handwerksbetrieb in Betracht?"
      },
      {
        "art": "ul",
        "punkte": [
          "**Betriebshaftpflicht:** für Schäden, die Sie bei Kunden oder Dritten verursachen. Bei Handwerk und Dienstleistung vor Ort gehört sie zu den Versicherungen, die Sie prüfen sollten.",
          "**Inhalt mit Betriebsunterbrechung:** für Werkstatt, Werkzeug, Material und Waren. Die Betriebsunterbrechung deckt, wenn vereinbart, den Ertragsausfall und laufende Kosten nach einem versicherten Sachschaden.",
          "**Fahrzeuge:** Für Kraftfahrzeuge und Anhänger, deren Halter Sie sind, besteht eine Pflicht zur Kfz-Haftpflicht (§ 1 PflVG). Das gilt auch für Transporter und Firmenwagen.",
          "**Cyber:** wenn Aufträge, Rechnungen und Kundendaten über IT laufen.",
          "**Rechtsschutz:** je nach Betrieb, etwa bei Streit um Rechnungen oder Mängel. Ob und in welchem Umfang, hängt vom Tarif ab.",
          "**Absicherung des Inhabers:** Als Selbstständiger zahlt kein Arbeitgeber weiter. Wie Sie das lösen, hängt von Gesundheit, Alter und Budget ab."
        ]
      },
      {
        "art": "p",
        "text": "Eine Übersicht über Pflicht, sinnvoll und verzichtbar bietet der Beitrag zum Kleingewerbe."
      },
      {
        "art": "h2",
        "text": "Pflicht, Anmeldung und Nachweise"
      },
      {
        "art": "p",
        "text": "Wer ein Unternehmen beginnt, muss dem zuständigen Unfallversicherungsträger binnen einer Woche nach Beginn unter anderem Art und Gegenstand des Unternehmens, die Zahl der Versicherten und den Eröffnungstag mitteilen (§ 192 Abs. 1 SGB VII). Die Pflicht gilt als erfüllt, wenn die Gewerbeanzeige binnen dieser Woche bei der zuständigen Stelle erstattet wurde. Nach Angabe der BG BAU gehört jedes Unternehmen der gewerblichen Wirtschaft einer Berufsgenossenschaft an, auch ohne Beschäftigte; ein Beitrag fällt nach ihrer Angabe erst an, wenn mindestens eine versicherte Person beschäftigt wird oder sich der Unternehmer selbst versichert. Änderungen bei Art und Gegenstand des Unternehmens, die für die Zuständigkeit des Unfallversicherungsträgers von Bedeutung sein können, sowie bei den Grundlagen für Gefahrklasse und Beitragsberechnung sind innerhalb von vier Wochen mitzuteilen (§ 192 Abs. 2 SGB VII). Beschäftigte sind kraft Gesetzes in der gesetzlichen Unfallversicherung versichert (§ 2 Abs. 1 Nr. 1 SGB VII). Ob Sie als Inhaber selbst versichert sind, richtet sich nach dem zuständigen Unfallversicherungsträger; bei der BG BAU ist für Unternehmer nur eine freiwillige Versicherung vorgesehen. Das sind allgemeine Hinweise und keine Rechtsberatung. Für Ihren Betrieb klärt das der Unfallversicherungsträger oder ein Rechtsanwalt."
      },
      {
        "art": "p",
        "text": "Auftraggeber können darüber hinaus einen Nachweis der Betriebshaftpflicht verlangen. Bei öffentlichen Aufträgen kommt es auf das Vergabeverfahren an. Was als Nachweis gilt und worauf Sie achten sollten, beschreibt der Beitrag zum Nachweis der Betriebshaftpflicht."
      },
      {
        "art": "h2",
        "text": "Die Betriebsbeschreibung: wer mehrere Gewerke ausführt"
      },
      {
        "art": "p",
        "text": "In der Betriebshaftpflicht wird beschrieben, welche Tätigkeiten Ihr Betrieb ausübt. Das ist keine Formalie. Sie müssen dem Versicherer bis zu Ihrer Vertragserklärung die Ihnen bekannten erheblichen Umstände anzeigen, nach denen er in Textform fragt (§ 19 VVG). Verletzen Sie diese Pflicht, kann der Versicherer unter Umständen vom Vertrag zurücktreten, kündigen oder den Vertrag anpassen. Davon zu trennen ist der Deckungsumfang: Die Betriebshaftpflicht deckt in der Regel nur die im Vertrag beschriebenen Tätigkeiten. Wer mehrere Gewerke ausführt, sollte sie alle nennen, auch die, die nur gelegentlich vorkommen. Eine Tätigkeit, die im Vertrag nicht auftaucht, kann zum Streit über den Versicherungsschutz führen."
      },
      {
        "art": "p",
        "text": "Typische Fragen an den Betrieb:"
      },
      {
        "art": "ul",
        "punkte": [
          "Welche Gewerke führen Sie aus, und welche nur gelegentlich?",
          "Arbeiten Sie auch an Dach, Gas, Wasser, Heizung, Elektro oder Dämmung, auch wenn das nicht Ihr Hauptgewerk ist?",
          "Montieren, warten oder reparieren Sie, oder liefern Sie nur Waren an?",
          "Welche Tätigkeiten stehen in Ihrer Handwerksrolle oder Gewerbeanmeldung?"
        ]
      },
      {
        "art": "p",
        "text": "Die Handwerkskammer führt die Handwerksrolle für zulassungspflichtige Handwerke (§ 6 HwO) und das Verzeichnis der zulassungsfreien Handwerke und handwerksähnlichen Gewerbe (§ 19 HwO). Für Alfeld, Holzminden und den Landkreis Hildesheim ist das die Handwerkskammer Hildesheim-Südniedersachsen, für Höxter die Handwerkskammer Ostwestfalen-Lippe zu Bielefeld, für die Stadt Hannover die Handwerkskammer Hannover. Für andere Orte richtet sich die Zuständigkeit nach dem Ort Ihrer Betriebsstätte. Fragen Sie im Zweifel die Kammer."
      },
      {
        "art": "h2",
        "text": "Subunternehmer und Arbeitsgemeinschaften"
      },
      {
        "art": "p",
        "text": "Wer Aufträge an Subunternehmer weitergibt oder mit anderen Betrieben zusammenarbeitet, sollte vorher klären:"
      },
      {
        "art": "ul",
        "punkte": [
          "Wer haftet gegenüber Ihrem Kunden, wenn ein Subunternehmer einen Schaden verursacht?",
          "Hat der Subunternehmer eine eigene Betriebshaftpflicht, und haben Sie einen Nachweis?",
          "Wie geht Ihre Betriebshaftpflicht mit Aufträgen um, die Sie weitergeben?"
        ]
      },
      {
        "art": "p",
        "text": "Bei einem Werkvertrag schulden Sie Ihrem Kunden das mangelfreie Werk (§ 633 Abs. 1 BGB); für das Verschulden von Subunternehmern kann § 278 BGB gelten. Wie Ihre Betriebshaftpflicht damit umgeht, steht in den Bedingungen. In den Musterbedingungen des GDV sind Schäden aus der Vergabe von Leistungen an Subunternehmer mitversichert, die Haftpflicht der Subunternehmer selbst dagegen nicht (A1-1 AVB BHV, Stand November 2025). Die Bedingungen Ihres Versicherers können abweichen. Rechtsfragen zu Ihren Verträgen klärt ein Rechtsanwalt."
      },
      {
        "art": "h2",
        "text": "Werkzeug, Material und Fahrzeug"
      },
      {
        "art": "p",
        "text": "Werkzeug und Material auf der Baustelle oder im Fahrzeug sind nicht in jeder Inhaltsversicherung automatisch mitversichert. Die Bedingungen können den Schutz an Voraussetzungen knüpfen, zum Beispiel daran, wie das Fahrzeug gesichert war. Prüfen Sie deshalb, ob Ihr Werkzeug außerhalb der Werkstatt mitversichert ist und welche Bedingungen dafür gelten."
      },
      {
        "art": "h2",
        "text": "Kammer, Innung, Kreishandwerkerschaft: wer hilft wobei?"
      },
      {
        "art": "p",
        "text": "Die Handwerkskammer vertritt das Handwerk in ihrem Bezirk. Die Handwerkskammer Hildesheim-Südniedersachsen zählte zum 31. Dezember 2025 insgesamt 7.148 Betriebe, davon 2.575 im Landkreis Hildesheim und 648 im Landkreis Holzminden. Die Handwerkskammer Hannover nennt mehr als 19.000 Unternehmen mit mehr als 108.000 Beschäftigten. Innungen sind freiwillige Zusammenschlüsse von Handwerksbetrieben (§§ 52, 58 HwO), die Innungen eines Kreises bilden in der Regel die Kreishandwerkerschaft (§ 86 HwO). Die Kreishandwerkerschaften Hildesheim-Alfeld und Holzminden haben beschlossen, sich zum 1. Januar 2027 zur Kreishandwerkerschaft Hildesheim-Weserbergland zusammenzuschließen. Wir sind weder Teil dieser Organisationen noch von ihnen beauftragt. Wir ersetzen die Beratung Ihrer Innung nicht, sondern ergänzen sie um die Versicherungsseite."
      },
      {
        "art": "h2",
        "text": "So läuft der Betriebs-Check bei uns ab"
      },
      {
        "art": "p",
        "text": "Wir fragen nach den Angaben, die ein Versicherer für ein Angebot braucht:"
      },
      {
        "art": "ul",
        "punkte": [
          "Branche und konkrete Tätigkeiten",
          "Umsatz und Personal",
          "Fläche, Eigentum oder Miete",
          "Wert von Einrichtung, Werkzeug und Waren",
          "Vorschäden der letzten fünf Jahre",
          "Vorversicherer und aktueller Beitrag",
          "Besonderheiten, zum Beispiel Gewässer in der Nähe oder die Bauweise"
        ]
      },
      {
        "art": "p",
        "text": "Dann vergleichen wir eine hinreichende Zahl von am Markt angebotenen Verträgen und Versicherern (§ 60 Abs. 1 VVG) und machen Ihnen einen nachvollziehbaren Vorschlag. Wählen wir im Einzelfall eine eingeschränkte Auswahl, sagen wir Ihnen das vor Ihrer Vertragserklärung ausdrücklich, nennen Ihnen die berücksichtigten Versicherer und teilen Ihnen mit, auf welcher Markt- und Informationsgrundlage wir arbeiten (§ 60 Abs. 2 VVG). Sie entscheiden in Ruhe."
      }
    ],
    "faq": [
      {
        "frage": "Brauche ich als Handwerker eine Betriebshaftpflicht?",
        "antwort": "Eine allgemeine gesetzliche Pflicht für jedes Gewerbe gibt es nicht. Sie gehört zu den Versicherungen, die ein Handwerksbetrieb prüfen sollte, weil Schäden bei Kunden und Dritten hohe Summen erreichen können. Auftraggeber können sie außerdem vertraglich verlangen."
      },
      {
        "frage": "Was gehört in die Betriebsbeschreibung?",
        "antwort": "Alle Tätigkeiten, die Ihr Betrieb ausübt, auch gelegentliche, sowie Montage, Wartung, Handel und Subunternehmer, soweit sie vorkommen. Die Beschreibung sollte zu Ihrer Handwerksrolle oder Gewerbeanmeldung passen. Änderungen im Betrieb sollten Sie Ihrem Versicherer mitteilen."
      },
      {
        "frage": "Sind Subunternehmer mitversichert?",
        "antwort": "Das hängt vom Vertrag ab. Prüfen Sie, wie Ihre Betriebshaftpflicht mit Subunternehmern umgeht und ob die Subunternehmer eine eigene Haftpflicht nachweisen können."
      },
      {
        "frage": "Welche Deckungssumme ist üblich?",
        "antwort": "Das hängt von Betrieb und Auftraggebern ab. Maßgeblich sind die Anforderungen Ihrer Auftraggeber und das Risiko Ihrer Arbeiten. Wir besprechen die Summe im Gespräch und vergleichen, was die Versicherer dafür anbieten."
      },
      {
        "frage": "Zahlt die Haftpflicht, wenn ich ein fertiges Werk nachbessern muss?",
        "antwort": "Die Betriebshaftpflicht ersetzt Schäden, die Sie anderen zufügen. Ansprüche auf Nacherfüllung, also auf die Nachbesserung Ihres eigenen mangelhaften Werks, sind davon nach den GDV-Musterbedingungen nicht erfasst (A1-3.2 AVB BHV); einzelne Tarife sehen Erweiterungen vor. Die Musterbedingungen des GDV kennen zum Beispiel einen Baustein für Aus- und Einbaukosten bei mangelhaften gelieferten Erzeugnissen (A3-7.3), der nur bei besonderer Vereinbarung gilt. Er gilt grundsätzlich nicht, wenn der Betrieb die mangelhaften Erzeugnisse selbst eingebaut oder montiert hat (A3-7.3.4 Buchstabe a). Welche Bausteine Ihr Vertrag hat, steht in den Bedingungen."
      },
      {
        "frage": "Was gilt für Werkzeug und Material im Fahrzeug?",
        "antwort": "Prüfen Sie, ob Ihre Inhaltsversicherung Werkzeug und Material außerhalb der Werkstatt mitversichert und welche Bedingungen dafür gelten, etwa zur Sicherung des Fahrzeugs."
      }
    ],
    "links": [
      {
        "pfad": "/weser-und-leinebergland",
        "text": "Gewerbeversicherung im Weser- und Leinebergland"
      },
      {
        "pfad": "/orte/alfeld",
        "text": "Gewerbeversicherung in Alfeld (Leine)"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/ueber-andre",
        "text": "Über André Tito"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 1 und § 1a Pflichtversicherungsgesetz (PflVG), https://www.gesetze-im-internet.de/pflvg/__1.html. Abruf: 14.10.2026.",
      "§ 192, § 2 und § 3 SGB VII, https://www.gesetze-im-internet.de/sgb_7/__192.html, /__2.html und /__3.html; § 2 SGB VI, https://www.gesetze-im-internet.de/sgb_6/__2.html. Abruf: 14.10.2026.",
      "BG BAU, Informationen für die Unternehmensgründung (Meldung auch ohne Beschäftigte, freiwillige Versicherung der Unternehmer), https://www.bgbau.de/themen/mitgliedschaft-und-beitrag/pflichtversicherung-fuer-unternehmen/informationen-fuer-die-unternehmensgruendung. Abruf: 14.10.2026.",
      "§ 19 und § 60 VVG sowie § 193 VVG, https://www.gesetze-im-internet.de/vvg_2008/__19.html, /__60.html und /__193.html. Abruf: 14.10.2026.",
      "§ 278 und § 633 BGB, https://www.gesetze-im-internet.de/bgb/__278.html und /__633.html. Abruf: 14.10.2026.",
      "GDV, Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand November 2025, unverbindliche Empfehlung), https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 14.10.2026.",
      "Handwerksordnung (HwO) § 6, § 19, § 52, § 58, § 86, https://www.gesetze-im-internet.de/hwo/__6.html, /__19.html, /__52.html, /__58.html und /__86.html. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Informationen zur Handwerkskammer, https://www.hwk-hildesheim.de/artikel/informationen-zur-handwerkskammer-24,0,1608.html. Abruf: 14.10.2026.",
      "Handwerkskammer Hannover, Wer wir sind, https://www.hwk-hannover.de/artikel/wer-wir-sind-23,0,6450.html. Abruf: 14.10.2026.",
      "Handwerkskammer Hildesheim-Südniedersachsen, Pressemitteilung zur Fusion der Kreishandwerkerschaften, https://www.hwk-hildesheim.de/artikel/gemeinsam-staerker-kreishandwerkerschaften-hildesheim-alfeld-und-holzminden-streben-fusion-an-24,0,3606.html. Abruf: 14.10.2026.",
      "Handwerkskammer Ostwestfalen-Lippe zu Bielefeld, https://www.handwerk-owl.de/artikel/handwerksfamilie-ostwestfalen-lippe-35,0,107.html. Abruf: 14.10.2026."
    ],
    "cta": {
      "text": "Sie führen einen Handwerks- oder Baubetrieb und möchten Ihren Versicherungsschutz prüfen lassen? Fragen Sie einen Betriebs-Check an. Das Gespräch ist unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der Erstinformation."
    }
  },
  {
    "typ": "beitrag",
    "slug": "versicherungen-kleingewerbe",
    "published": true,
    "title": "Versicherungen im Kleingewerbe: Was ist Pflicht?",
    "description": "Pflicht, zuerst prüfen, genauer hinsehen: Überblick für Selbstständige und Kleinbetriebe mit Quellen und Stand. Allgemeine Information, unverbindlich.",
    "h1": "Welche Versicherungen braucht ein Kleingewerbe wirklich?",
    "kurzname": "Versicherungen im Kleingewerbe: Was ist Pflicht?",
    "stand": "Oktober 2026",
    "einleitung": [
      "Wer sich selbstständig macht, stößt auf eine lange Liste möglicher Versicherungen. Betriebshaftpflicht, Rechtsschutz, Cyber, Inhalt, Betriebsunterbrechung: Jede davon kann nach Pflicht klingen. Das ist sie nicht immer. Dieser Überblick trennt, was wirklich vorgeschrieben ist, was Sie zuerst prüfen sollten und bei welchen Bausteinen sich ein genauer Blick lohnt."
    ],
    "kurz": [
      {
        "frage": "Gibt es eine allgemeine Pflicht zur Betriebshaftpflicht?",
        "antwort": "Nein. Eine gesetzliche Pflicht zu einer Berufs- oder Betriebshaftpflicht gibt es nur für bestimmte Berufe und Tätigkeiten. Auftraggeber können eine Betriebshaftpflicht außerdem vertraglich verlangen."
      },
      {
        "frage": "Was ist gesetzlich vorgeschrieben?",
        "antwort": "Für Sie persönlich die Krankenversicherung und, wenn Sie Halter sind, die Kfz-Haftpflicht für jedes Kraftfahrzeug und jeden Anhänger. Für Ihr Unternehmen die Mitteilung an den zuständigen Unfallversicherungsträger binnen einer Woche nach Beginn, auch wenn Sie keine Mitarbeiter haben. Je nach Beruf und Betrieb kommen weitere Pflichten hinzu. Beschäftigte sind kraft Gesetzes unfallversichert."
      },
      {
        "frage": "Was sollten Sie zuerst prüfen?",
        "antwort": "Eine Betriebshaftpflicht, die Absicherung Ihrer eigenen Arbeitskraft und, wenn Sie Werkzeug, Waren oder Technik haben, eine Inhaltsversicherung."
      },
      {
        "frage": "Woran erkennen Sie überflüssige Bausteine?",
        "antwort": "Fragen Sie bei jedem Baustein, welchen konkreten Schaden er abdeckt und wie wahrscheinlich dieser bei Ihnen ist."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Was vorgeschrieben sein kann"
      },
      {
        "art": "p",
        "text": "Ob eine Versicherung Pflicht ist, hängt von Branche, Beruf und Betrieb ab. Eine allgemeine Pflicht zur Betriebshaftpflicht für jedes Gewerbe gibt es nicht. Typische Fälle, in denen eine Versicherung vorgeschrieben ist:"
      },
      {
        "art": "ul",
        "punkte": [
          "**Krankenversicherung:** Wer seinen Wohnsitz in Deutschland hat, muss krankenversichert sein, gesetzlich oder privat (§ 193 Abs. 3 VVG). Ob und auf welchem Weg Sie als Selbstständiger gesetzlich versichert sein können, hängt unter anderem von Ihrer bisherigen Absicherung und davon ab, ob Sie hauptberuflich selbstständig sind (§§ 5, 9 und 10 SGB V). Die Pflegeversicherung gehört dazu: Wer gesetzlich krankenversichert ist, ist in der sozialen Pflegeversicherung versichert, wer privat krankenversichert ist, muss eine private Pflegeversicherung abschließen (§ 1 Abs. 2, § 23 Abs. 1 SGB XI). Das ist eine persönliche Pflicht, keine betriebliche.",
          "**Kfz-Haftpflicht:** Der Halter eines Fahrzeugs mit regelmäßigem Standort im Inland muss eine Kfz-Haftpflichtversicherung abschließen und aufrechterhalten (§ 1 PflVG). Das gilt auch für Firmenwagen und Transporter.",
          "**Berufshaftpflicht in bestimmten Berufen:** Zum Beispiel schreibt das Berufsrecht Rechtsanwälten (§ 51 BRAO) und selbstständigen Steuerberatern (§ 67 StBerG) eine Haftpflichtversicherung vor. Versicherungsvermittler mit Erlaubnis nach § 34d GewO müssen für die Erlaubnis eine Berufshaftpflichtversicherung oder eine gleichwertige Garantie nachweisen (§ 34d Abs. 5 Satz 1 Nr. 3 GewO, Anforderungen in den §§ 11 bis 13 VersVermV).",
          "**Gesetzliche Unfallversicherung:** Beschäftigte sind kraft Gesetzes versichert (§ 2 Abs. 1 Nr. 1 SGB VII). Unternehmer müssen ihr Unternehmen binnen einer Woche nach Beginn dem zuständigen Unfallversicherungsträger mitteilen, je nach Branche die Berufsgenossenschaft oder ein anderer Unfallversicherungsträger (§ 192 Abs. 1 SGB VII). Das gilt auch, wenn Sie keine Mitarbeiter haben, denn Unternehmer ist, wem das Ergebnis des Unternehmens unmittelbar zum Vor- oder Nachteil gereicht (§ 136 Abs. 3 Nr. 1 SGB VII). Die Mitteilung gilt als erfüllt, wenn Sie Ihr Gewerbe innerhalb dieser Woche anzeigen (§ 192 Abs. 1 Satz 2 SGB VII). Der Unfallversicherungsträger kann darüber hinaus die für seine gesetzlichen Aufgaben erforderlichen Auskünfte und Unterlagen verlangen (§ 192 Abs. 3 SGB VII). Fragen Sie bei der zuständigen Berufsgenossenschaft nach, was sie von Ihnen braucht. Ob Sie sich als Unternehmer selbst versichern müssen oder freiwillig können, hängt von Branche, Satzung und teils vom Gesetz ab (§ 2 Abs. 1 Nr. 5 bis 7 und 9, § 3 Abs. 1 Nr. 1, § 6 Abs. 1 Nr. 1 SGB VII). Kraft Gesetzes versichert sind zum Beispiel landwirtschaftliche Unternehmer, Hausgewerbetreibende und selbstständig im Gesundheitswesen oder in der Wohlfahrtspflege Tätige (§ 2 Abs. 1 Nr. 5, 6 und 9 SGB VII).",
          "**Sozialversicherung für Beschäftigte:** Als Arbeitgeber melden Sie versicherungspflichtig Beschäftigte bei der Einzugsstelle an und zahlen den Gesamtsozialversicherungsbeitrag (§ 28a Abs. 1, § 28e Abs. 1 SGB IV)."
        ]
      },
      {
        "art": "p",
        "text": "Dazu kommt: Auftraggeber, Vermieter oder Förderstellen können vertraglich einen Nachweis verlangen, etwa über eine Betriebshaftpflicht. Das ist dann keine gesetzliche, aber eine vertragliche Pflicht. Prüfen Sie deshalb vor dem Abschluss, welche Nachweise in Ihrer Branche gefordert werden."
      },
      {
        "art": "h2",
        "text": "Was Sie zuerst prüfen sollten"
      },
      {
        "art": "ul",
        "punkte": [
          "**Betriebshaftpflicht:** Schäden, die Sie bei Kunden oder Dritten verursachen, können schnell existenzbedrohend werden. Gerade bei Handwerk und Dienstleistung vor Ort sollten Sie sie zuerst prüfen. Bei Beratungsleistungen kommt zusätzlich eine Berufs- oder Vermögensschadenhaftpflicht in Betracht, weil reine Vermögensschäden nicht ohne Weiteres mitversichert sind (vergleiche A1-3.1 der GDV-Musterbedingungen).",
          "**Absicherung Ihrer Arbeitskraft:** Als Selbstständiger gibt es keinen Arbeitgeber, der weiterzahlt. Wie Sie das lösen, hängt von Gesundheit, Alter und Budget ab, hier lohnt sich ein individueller Blick.",
          "**Inhalts- oder Geschäftsversicherung:** Sinnvoll, wenn Sie teures Equipment, Waren oder Werkzeug haben, deren Verlust Sie ausbremst."
        ]
      },
      {
        "art": "h2",
        "text": "Bei welchen Bausteinen sich ein genauer Blick lohnt"
      },
      {
        "art": "p",
        "text": "Pakete mit vielen Bausteinen sind bequem, aber nicht jeder Baustein passt zu jedem Betrieb. Fragen Sie bei jedem Baustein nach, welchen konkreten Schaden er abdeckt und wie wahrscheinlich dieser bei Ihnen ist. Kandidaten für eine genaue Prüfung können Zusatzbausteine sein, die Sie gar nicht nutzen, doppelte Absicherungen und Rechtsschutz in Bereichen, die Sie nie betreffen. Ob eine Police für Sie entbehrlich ist, lässt sich aber nur anhand Ihres Betriebs beurteilen."
      },
      {
        "art": "h2",
        "text": "Checkliste zum Selbst-Durchgehen"
      },
      {
        "art": "ul",
        "punkte": [
          "Welche Versicherung verlangt mein Berufsrecht oder meine Kammer?",
          "Was verlangen meine Auftraggeber oder mein Mietvertrag als Nachweis?",
          "Welcher Schaden würde mich finanziell am härtesten treffen, und ist er abgesichert?",
          "Zahle ich für Bausteine, die ich nicht nutze oder doppelt abgedeckt habe?",
          "Wer bezahlt den Berater, der mir das empfiehlt? Wie wir als Versicherungsmakler vergütet werden, steht in unserer Erstinformation.",
          "Gibt es zum empfohlenen Baustein Alternativen mit vergleichbarem Leistungsumfang, und was kosten sie?"
        ]
      },
      {
        "art": "h2",
        "text": "Fazit"
      },
      {
        "art": "p",
        "text": "Nicht jede Versicherung ist Pflicht, und nicht jede freiwillige Versicherung ist überflüssig. Was zu Ihrem Betrieb passt, hängt von Branche, Risiko und Budget ab. Wenn Sie wissen möchten, wo Sie bei Ihrem Betrieb stehen, schauen wir gemeinsam und unverbindlich darauf."
      },
      {
        "art": "p",
        "text": "Allgemeine Informationen, keine individuelle Rechts- oder Versicherungsberatung. Welche Pflichten für Sie gelten, klären Sie verbindlich mit Kammer, Berufsgenossenschaft oder Rechtsanwalt."
      }
    ],
    "faq": [
      {
        "frage": "Ist die Betriebshaftpflicht Pflicht?",
        "antwort": "Nicht allgemein. Eine Berufshaftpflicht ist in bestimmten Berufen vorgeschrieben, etwa für Rechtsanwälte und Steuerberater. Ob für Ihren Beruf eine Haftpflichtversicherung vorgeschrieben ist, regelt das jeweilige Berufs- oder Gewerberecht. Wo es keine Vorschrift gibt, ist die Betriebshaftpflicht freiwillig, kann aber von Auftraggebern vertraglich verlangt werden."
      },
      {
        "frage": "Muss ich mich bei der Berufsgenossenschaft anmelden?",
        "antwort": "Ja, wenn Sie ein Unternehmen betreiben: Sie müssen es binnen einer Woche nach Beginn dem zuständigen Unfallversicherungsträger mitteilen (§ 192 Abs. 1 SGB VII), auch wenn Sie keine Beschäftigten haben. Die Mitteilung gilt als erfüllt, wenn Sie Ihr Gewerbe innerhalb dieser Woche anzeigen. Der Unfallversicherungsträger kann darüber hinaus die für seine gesetzlichen Aufgaben erforderlichen Auskünfte und Unterlagen verlangen (§ 192 Abs. 3 SGB VII). Fragen Sie bei der zuständigen Berufsgenossenschaft nach, was sie von Ihnen braucht. Welcher Träger zuständig ist, hängt von Ihrer Branche ab."
      },
      {
        "frage": "Brauche ich als Selbstständiger eine Krankenversicherung?",
        "antwort": "Ja. Jede Person mit Wohnsitz in Deutschland muss grundsätzlich krankenversichert sein, gesetzlich oder privat (§ 193 Abs. 3 VVG)."
      },
      {
        "frage": "Wo kann es zu doppelten Absicherungen kommen?",
        "antwort": "Doppelte Absicherungen können entstehen, wenn ein Paket Bausteine enthält, die Sie schon über einen Einzelvertrag abgedeckt haben. Um das zu erkennen, werden die vorhandenen Verträge nebeneinandergelegt und verglichen."
      }
    ],
    "links": [
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/orte/alfeld",
        "text": "Gewerbeversicherung in Alfeld (Leine)"
      },
      {
        "pfad": "/weser-und-leinebergland",
        "text": "Gewerbeversicherung im Weser- und Leinebergland"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/ueber-andre",
        "text": "Über André Tito"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 193 VVG (Versicherungspflicht in der Krankenversicherung), https://www.gesetze-im-internet.de/vvg_2008/__193.html. Abruf: 14.10.2026.",
      "§ 1 und § 23 SGB XI (Pflegeversicherung), https://www.gesetze-im-internet.de/sgb_11/__1.html und /__23.html. Abruf: 14.10.2026.",
      "§§ 5, 9 und 10 SGB V (gesetzliche Krankenversicherung), https://www.gesetze-im-internet.de/sgb_5/__5.html, /__9.html und /__10.html. Abruf: 14.10.2026.",
      "§ 1 und § 1a PflVG (Versicherungspflicht des Kfz-Halters), https://www.gesetze-im-internet.de/pflvg/__1.html und /__1a.html. Abruf: 14.10.2026.",
      "§ 51 BRAO (Berufshaftpflichtversicherung der Rechtsanwälte), https://www.gesetze-im-internet.de/brao/__51.html. Abruf: 14.10.2026.",
      "§ 67 StBerG (Berufshaftpflichtversicherung der Steuerberater), https://www.gesetze-im-internet.de/stberg/__67.html. Abruf: 14.10.2026.",
      "§ 34d Abs. 5 GewO (Versagung der Erlaubnis ohne Berufshaftpflicht), https://www.gesetze-im-internet.de/gewo/__34d.html, und §§ 11 bis 13 VersVermV, https://www.gesetze-im-internet.de/versvermv_2018/__11.html, /__12.html und /__13.html. Abruf: 14.10.2026.",
      "§ 2, § 3, § 6, § 136 und § 192 SGB VII, https://www.gesetze-im-internet.de/sgb_7/__192.html, /__136.html, /__2.html, /__3.html und /__6.html. Abruf: 14.10.2026.",
      "§ 28a und § 28e SGB IV, https://www.gesetze-im-internet.de/sgb_4/__28a.html und /__28e.html. Abruf: 14.10.2026.",
      "GDV, Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand November 2025, unverbindliche Empfehlung), A1-3.1, https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 14.10.2026.",
      "Erstinformation von Smarter Finanz, Stand 16.10.2026, https://www.smarterfinanz.de/erstinformation."
    ],
    "cta": {
      "text": "Gewerbe-Check: Wir gehen gemeinsam Ihre bestehenden Versicherungen und Ihren Betrieb durch, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in unserer Erstinformation."
    }
  },
  {
    "typ": "beitrag",
    "slug": "betriebshaftpflicht-nachweis-auftraggeber",
    "published": true,
    "title": "Nachweis der Betriebshaftpflicht | Smarter Finanz",
    "description": "Ihr Auftraggeber verlangt einen Nachweis der Betriebshaftpflicht? Was als Nachweis gilt, wer ihn ausstellt und worauf Sie achten. Mit Quellen und Stand.",
    "h1": "Mein Auftraggeber verlangt einen Nachweis der Betriebshaftpflicht: Was zählt?",
    "kurzname": "Nachweis der Betriebshaftpflicht",
    "stand": "Oktober 2026",
    "einleitung": [
      "Ein Auftraggeber kann vor Auftragsbeginn einen Nachweis der Betriebshaftpflicht verlangen. Dieser Beitrag erklärt, was damit gemeint sein kann, wer den Nachweis ausstellt, was bei öffentlichen Aufträgen gilt und welche Stolpersteine es gibt."
    ],
    "kurz": [
      {
        "frage": "Was gilt als Nachweis?",
        "antwort": "Ein Weg ist eine Versicherungsbestätigung des Versicherers. Sie soll den Versicherungsumfang und die Versicherungssummen bestätigen. Was sie im Einzelnen enthält, erfahren Sie bei Ihrem Versicherer. Was Ihr Auftraggeber genau verlangt, legt er selbst fest, im Vertrag oder in der Ausschreibung."
      },
      {
        "frage": "Wer stellt den Nachweis aus?",
        "antwort": "Die Versicherungsbestätigung stellt der Versicherer aus. Wenn Sie über einen Makler oder eine Vertriebsstelle versichert sind, fragen Sie dort nach, ob die Bestätigung für Sie angefordert wird. Eine Kopie der Police reicht nur, wenn Ihr Auftraggeber sie akzeptiert."
      },
      {
        "frage": "Was gilt bei öffentlichen Aufträgen?",
        "antwort": "Bei Liefer- und Dienstleistungsaufträgen ab den EU-Schwellenwerten können öffentliche Auftraggeber eine Berufs- oder Betriebshaftpflichtversicherung in bestimmter Höhe verlangen und den Nachweis fordern (§ 45 VgV). Für Bauaufträge und für Aufträge unterhalb der EU-Schwellenwerte gelten andere Regeln. Maßgeblich sind immer die Vergabeunterlagen."
      },
      {
        "frage": "Was, wenn die Summe nicht reicht?",
        "antwort": "Sprechen Sie vor der Auftragsannahme mit Ihrem Versicherer oder Makler, ob sich die Summe für den Auftrag erhöhen lässt."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Was Auftraggeber verlangen können"
      },
      {
        "art": "p",
        "text": "Die Anforderungen unterscheiden sich von Auftrag zu Auftrag. Je nach Auftrag kann es um Folgendes gehen:"
      },
      {
        "art": "ul",
        "punkte": [
          "die Höhe der Versicherungssummen für Personen-, Sach- und Vermögensschäden",
          "die Laufzeit, also ob die Versicherung bei Auftragsbeginn und während der Arbeit besteht",
          "die versicherte Tätigkeit, also ob Ihr Auftrag in der Betriebsbeschreibung vorkommt",
          "gegebenenfalls einen Nachweis, dass die Prämie bezahlt ist"
        ]
      },
      {
        "art": "p",
        "text": "Entscheidend ist, was in Ihrem Vertrag oder in den Vergabeunterlagen steht. Lesen Sie diese Stelle genau, bevor Sie unterschreiben."
      },
      {
        "art": "h2",
        "text": "Wer den Nachweis ausstellt und wie er aussieht"
      },
      {
        "art": "p",
        "text": "Eine Versicherungsbestätigung stellt der Versicherer aus. Wie die Bestätigung bei Ihrem Versicherer ausgestellt wird, erfahren Sie dort. Ein Beispiel aus der Praxis: Ein Versicherer beschreibt in einem Beitrag für IT-Dienstleister, dass seine Kunden mit den Vertragsunterlagen automatisch eine Versicherungsbestätigung erhalten, die Versicherungsumfang und Versicherungssummen bestätigt und Auftraggebern vorgelegt werden kann. Im Einzelfall, in der Regel nach Aufforderung des Auftraggebers, könne der Kunde eine Kopie der Police an den Auftraggeber schicken."
      },
      {
        "art": "p",
        "text": "Eine Versicherungsbestätigung ist kürzer als die Police. Ob ein Auftraggeber damit auskommt, entscheidet er selbst. Wenn Sie über einen Makler versichert sind, fragen Sie dort nach, ob die Bestätigung für Sie beim Versicherer angefordert wird."
      },
      {
        "art": "h2",
        "text": "Öffentliche Aufträge"
      },
      {
        "art": "p",
        "text": "Bei öffentlichen Aufträgen regeln Vergaberecht und Vergabeunterlagen, was verlangt wird. Für Liefer- und Dienstleistungsaufträge ab den EU-Schwellenwerten (§ 106 Abs. 1 GWB) sagt § 45 der Vergabeverordnung (VgV): Der öffentliche Auftraggeber kann im Hinblick auf die wirtschaftliche und finanzielle Leistungsfähigkeit eine Berufs- oder Betriebshaftpflichtversicherung in bestimmter geeigneter Höhe verlangen (Absatz 1 Satz 2 Nr. 3). Als Beleg kann er den Nachweis einer entsprechenden Berufs- oder Betriebshaftpflichtversicherung fordern (Absatz 4 Nr. 2). Kann ein Unternehmen die geforderten Unterlagen aus einem berechtigten Grund nicht beibringen, kann es seine Leistungsfähigkeit durch andere Unterlagen belegen, die der öffentliche Auftraggeber als geeignet ansieht (Absatz 5). Ob die Voraussetzungen im Einzelfall vorliegen, prüft zunächst der Auftraggeber."
      },
      {
        "art": "p",
        "text": "Für Bauaufträge gilt nach § 2 VgV im Übrigen Teil A Abschnitt 2 der Vergabe- und Vertragsordnung für Bauleistungen (VOB/A). § 45 VgV gehört nicht zu den Teilen der VgV, die dort anzuwenden sind. Unterhalb der EU-Schwellenwerte gilt Teil 4 des Gesetzes gegen Wettbewerbsbeschränkungen und damit die VgV nicht (§ 106 Abs. 1 GWB, § 1 Abs. 1 VgV). Für diese Aufträge gibt es andere Vergaberegeln, die je nach Auftraggeber und Bundesland unterschiedlich ausfallen können. Lesen Sie die Anforderungen früh, denn bei Ausschreibungen gibt es Fristen für die Angebotsabgabe."
      },
      {
        "art": "h2",
        "text": "Wenn die Versicherungssumme nicht reicht"
      },
      {
        "art": "p",
        "text": "Verlangt der Auftraggeber höhere Summen, als Ihre Betriebshaftpflicht bietet, kommen je nach Fall drei Wege in Betracht:"
      },
      {
        "art": "ul",
        "punkte": [
          "Die Summe in der bestehenden Versicherung erhöhen lassen.",
          "Eine Absicherung speziell für den Auftrag oder das Projekt besprechen.",
          "Bei privaten Aufträgen mit dem Auftraggeber über die geforderte Summe sprechen, wenn sie für den Auftrag außer Verhältnis erscheint. Bei Liefer- und Dienstleistungsaufträgen oberhalb der EU-Schwellenwerte sind die Anforderungen in den Vergabeunterlagen festgelegt, und im offenen Verfahren wird über Angebote nicht verhandelt (§ 15 Abs. 5 VgV). Für Bauaufträge und für Aufträge unterhalb der Schwellenwerte gelten andere Regeln. Fragen zu den Unterlagen klären Sie vor der Angebotsabgabe."
        ]
      },
      {
        "art": "p",
        "text": "Klären Sie das vor der Auftragsannahme, nicht danach. Ihr Versicherer oder Makler kann sagen, was möglich ist und was es kostet."
      },
      {
        "art": "h2",
        "text": "Stolpersteine beim Nachweis"
      },
      {
        "art": "ul",
        "punkte": [
          "**Die Betriebsbeschreibung passt nicht zum Auftrag.** Wenn die Tätigkeit, die der Auftrag verlangt, in Ihrer Betriebsbeschreibung nicht steht, nützt der schönste Nachweis wenig.",
          "**Ein Nachweis gilt für den Zeitpunkt, zu dem er ausgestellt wurde.** Änderungen danach kennt der Auftraggeber nicht.",
          "**Ein Nachweis ist so gut wie der Vertrag dahinter.** Zahlungsverzug und Änderungen im Betrieb, die das Risiko erhöhen und dem Versicherer nicht angezeigt werden, können den Versicherungsschutz gefährden (§ 37, § 38 VVG; § 23, § 24, § 26 VVG). Prämien pünktlich zahlen, Änderungen im Betrieb melden, Kündigungen im Blick behalten.",
          "**Spät angefragt.** Wer den Nachweis erst am Tag vor Arbeitsbeginn anfordert, riskiert Verzögerungen."
        ]
      },
      {
        "art": "h2",
        "text": "Checkliste zum Abhaken"
      },
      {
        "art": "ul",
        "punkte": [
          "Steht im Vertrag oder in der Ausschreibung, welche Summen und welche Versicherungsarten verlangt werden?",
          "Passen meine Versicherungssummen zu dieser Anforderung?",
          "Steht die Tätigkeit dieses Auftrags in meiner Betriebsbeschreibung?",
          "Gilt die Versicherung für die gesamte Dauer des Auftrags?",
          "Habe ich die Bestätigung rechtzeitig beim Versicherer oder Makler angefordert?",
          "Haben meine Subunternehmer eigene Nachweise?"
        ]
      },
      {
        "art": "p",
        "text": "Allgemeine Informationen, keine individuelle Rechts- oder Versicherungsberatung. Welche Anforderungen für Ihren Auftrag gelten, ergibt sich aus Ihrem Vertrag oder den Vergabeunterlagen. Bei Rechtsfragen zu einem konkreten Vergabeverfahren wenden Sie sich an einen Rechtsanwalt."
      }
    ],
    "faq": [
      {
        "frage": "Wer stellt den Nachweis aus?",
        "antwort": "Der Versicherer. Wenn Sie über einen Makler versichert sind, fragen Sie dort nach, ob die Bestätigung für Sie angefordert wird."
      },
      {
        "frage": "Reicht eine Kopie der Police als Nachweis?",
        "antwort": "Nur, wenn Ihr Auftraggeber sie akzeptiert. Ein Auftraggeber kann ausdrücklich eine Versicherungsbestätigung verlangen. Fragen Sie im Zweifel beim Auftraggeber nach, was genau verlangt ist."
      },
      {
        "frage": "Wie lange gilt ein Nachweis?",
        "antwort": "Ein Nachweis gilt für den Zeitpunkt, zu dem er ausgestellt wurde. Wie lange ihn Ihr Auftraggeber akzeptiert, bestimmt er selbst. Bei längeren Aufträgen ist es sinnvoll, den Fortbestand der Versicherung zu belegen."
      },
      {
        "frage": "Was tun, wenn der Auftraggeber eine höhere Summe verlangt?",
        "antwort": "Sprechen Sie vor der Auftragsannahme mit Ihrem Versicherer oder Makler, ob sich die Summe erhöhen lässt oder eine Absicherung für das Projekt möglich ist."
      },
      {
        "frage": "Was gilt bei öffentlichen Aufträgen?",
        "antwort": "Bei Liefer- und Dienstleistungsaufträgen ab den EU-Schwellenwerten kann der öffentliche Auftraggeber nach § 45 VgV eine Berufs- oder Betriebshaftpflichtversicherung in bestimmter Höhe verlangen und den Nachweis fordern. Für Bauaufträge und für Aufträge unterhalb der Schwellenwerte gelten andere Regeln. Maßgeblich sind immer die Unterlagen des jeweiligen Verfahrens."
      }
    ],
    "links": [
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/orte/alfeld",
        "text": "Gewerbeversicherung in Alfeld (Leine)"
      },
      {
        "pfad": "/weser-und-leinebergland",
        "text": "Gewerbeversicherung im Weser- und Leinebergland"
      },
      {
        "pfad": "/ueber-andre",
        "text": "Über André Tito"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 45 Vergabeverordnung (VgV), Wirtschaftliche und finanzielle Leistungsfähigkeit, https://www.gesetze-im-internet.de/vgv_2016/__45.html. Abruf: 14.10.2026.",
      "§ 1, § 2 und § 15 VgV, https://www.gesetze-im-internet.de/vgv_2016/__1.html, /__2.html und /__15.html. Abruf: 14.10.2026.",
      "§ 106 Gesetz gegen Wettbewerbsbeschränkungen (GWB), https://www.gesetze-im-internet.de/gwb/__106.html. Abruf: 14.10.2026.",
      "§ 23, § 24, § 26, § 37 und § 38 VVG, https://www.gesetze-im-internet.de/vvg_2008/__23.html, /__24.html, /__26.html, /__37.html und /__38.html. Abruf: 14.10.2026.",
      "Hiscox, Versicherungsnachweis für Auftraggeber (Versicherungsbestätigung, Kopie der Police im Einzelfall), https://www.hiscox.de/blog/it-haftpflicht-versicherungsnachweis-fuer-auftraggeber/. Abruf: 14.10.2026. Hinweis: Beitrag eines Versicherers für IT-Dienstleister, hier nur als Beispiel für die Praxis einer Versicherungsbestätigung genutzt."
    ],
    "cta": {
      "text": "Sie brauchen einen Nachweis oder möchten Ihre Versicherungssummen prüfen lassen? Vereinbaren Sie ein Gewerbe-Gespräch, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der Erstinformation."
    }
  },
  {
    "typ": "beitrag",
    "slug": "betriebsbeschreibung-betriebshaftpflicht",
    "published": true,
    "title": "Betriebsbeschreibung in der Haftpflicht | Smarter Finanz",
    "description": "Steht jede Ihrer Arbeiten im Vertrag? So prüfen Sie die Betriebsbeschreibung Ihrer Betriebshaftpflicht und wissen, wann Sie Änderungen melden.",
    "h1": "Wärmepumpe angeschlossen, Vertrag nicht angepasst? So prüfen Sie Ihre Arbeitsliste",
    "kurzname": "Betriebsbeschreibung in der Haftpflicht",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Ein Elektrobetrieb, ein Stammkunde, ein freier Nachmittag.",
      "„Kannst du mir die Wärmepumpe gleich mit anschließen?“ Klar, kann man. Ein Handschlag, ein Kaffee, die Rechnung schreiben Sie gleich noch.",
      "Monate später ein Wasserschaden an der Anlage. Am Telefon der Sachbearbeiter vom Versicherer, freundlich, mit einer einzigen Frage: „Stand diese Arbeit in Ihrem Vertrag?“",
      "Die Antwort beginnt auf einer Seite Ihres Versicherungsscheins.",
      "Hier steht, wo Sie diese Seite finden, wie Sie sie an einem Abend prüfen und wann Sie Änderungen melden."
    ],
    "kurz": [
      {
        "frage": "Liste prüfen.",
        "antwort": "Versichert ist Ihre Haftpflicht aus dem Betrieb, wie er im Versicherungsschein und seinen Nachträgen steht. Ihr Vertrag kann abweichen."
      },
      {
        "frage": "Lücken schließen.",
        "antwort": "Fehlt eine Tätigkeit, kann es im Schadenfall Streit über den Schutz geben. Darum gehört sie in den Vertrag."
      },
      {
        "frage": "Änderungen anmelden.",
        "antwort": "Ändert sich Ihre Arbeit, fragen Sie Ihren Versicherer am besten vorher."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Betriebsbeschreibung neben Ihre letzten Rechnungen legen und abhaken, was fehlt."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Das Leistungsverzeichnis Ihres Vertrags"
      },
      {
        "art": "p",
        "text": "Die Betriebshaftpflicht ist die Versicherung für Schäden, die Sie bei Ihrer Arbeit anderen zufügen. Welche Arbeiten sie dabei meint, legt eine Liste im Vertrag fest."
      },
      {
        "art": "p",
        "text": "Der Versicherungsschein ist das Papier zu Ihrem Vertrag. Ja, genau das Papier, das irgendwo zwischen Lieferschein und Kaffeetasse liegt. Darin stehen Betrieb, Summen, Laufzeit und Beitrag."
      },
      {
        "art": "p",
        "text": "Dazu gehört, was Ihr Betrieb tut. Diese Liste der versicherten Tätigkeiten heißt **Betriebsbeschreibung**, und sie ist das Leistungsverzeichnis Ihres Vertrags."
      },
      {
        "art": "p",
        "text": "Ändert sich etwas, kann ein **Nachtrag** dazukommen, ein Änderungsblatt zum Versicherungsschein."
      },
      {
        "art": "p",
        "text": "Im Schadenfall kann deshalb die Frage auftauchen: Gehört die Arbeit, bei der der Schaden entstand, zu dem Betrieb, der im Vertrag steht? Wer vor dem Anbau der Wärmepumpe beim Versicherer nachgefragt hat, weiß, woran er ist."
      },
      {
        "art": "h2",
        "text": "Zehn Minuten, ein Stapel Rechnungen, ein Textmarker"
      },
      {
        "art": "p",
        "text": "Alles, was Ihr Betrieb tut, gehört in die Beschreibung. Auch eine Arbeit, die nur ab und zu vorkommt, kann zu einem Schaden führen."
      },
      {
        "art": "p",
        "text": "Legen Sie die Betriebsbeschreibung aus Ihrem Versicherungsschein neben diese Unterlagen:"
      },
      {
        "art": "ul",
        "punkte": [
          "Ihre Eintragung bei der Handwerkskammer oder Ihre Gewerbeanmeldung",
          "Ihre Rechnungen der letzten Monate",
          "Ihre Website und Ihre Angebote"
        ]
      },
      {
        "art": "p",
        "text": "Rechnungen sind ehrlich: Sie zeigen, was Sie wirklich gemacht haben, auch den Handgriff für den Stammkunden."
      },
      {
        "art": "p",
        "text": "Dann gehen Sie diese Fragen durch:"
      },
      {
        "art": "ul",
        "punkte": [
          "**Hauptarbeit und Nebenarbeiten:** Was machen Sie jeden Tag, und was kommt gelegentlich dazu?",
          "**Handel:** Verkaufen Sie auch Waren?",
          "**Montage, Wartung, Reparatur:** Bauen Sie nur ein, oder warten und reparieren Sie auch? Oder liefern Sie nur an?",
          "**Eigene Produkte:** Stellen Sie selbst etwas her?",
          "**Subunternehmer:** Geben Sie Arbeit an andere Betriebe weiter?"
        ]
      },
      {
        "art": "p",
        "text": "„Ich bin doch bei der Handwerkskammer eingetragen.“ Das stimmt, und es ist ein guter Vergleichswert."
      },
      {
        "art": "p",
        "text": "Ihre Handwerkskammer führt eine Liste, in der Ihr Betrieb mit seinem Handwerk steht. Fehlt in Ihrer Betriebsbeschreibung etwas, das dort steht, ist das ein Grund nachzufragen. Die Eintragung ersetzt die Betriebsbeschreibung im Vertrag nicht von selbst."
      },
      {
        "art": "h2",
        "text": "Neue Arbeit? Erst anrufen, dann anschließen"
      },
      {
        "art": "p",
        "text": "Neue Arbeit kündigt sich selten an. Sie kommt als „Machst du mal eben?“"
      },
      {
        "art": "p",
        "text": "Sobald sich bei Ihrem Betrieb etwas ändert, lohnt ein Anruf: eine neue Tätigkeit, ein neuer Standort, mehr Mitarbeiter, ein höherer Umsatz. Fragen Sie Ihren Versicherer am besten vorher, ob und wie er die Änderung braucht."
      },
      {
        "art": "p",
        "text": "Wer auf dem Gerüst plötzlich die doppelte Last lagert, fragt vorher den Gerüstbauer. Beim Vertrag heißt der Gerüstbauer Versicherer."
      },
      {
        "art": "h2",
        "text": "Zurück zur Wärmepumpe"
      },
      {
        "art": "p",
        "text": "Lesen, abgleichen, vorher fragen, in dieser Reihenfolge."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Legen Sie die Betriebsbeschreibung neben Ihre letzten Rechnungen, haken Sie ab, was fehlt, und rufen Sie morgen Ihren Versicherer an."
      },
      {
        "art": "p",
        "text": "Die Wärmepumpe läuft längst. Ob sie auch im Vertrag steht, verrät ein Textmarker."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Grundlage sind das Gesetz und die unverbindlichen Musterbedingungen des Versichererverbands GDV. Ihr Vertrag kann abweichen. Was bei Ihnen gilt, steht in Ihrem Versicherungsschein und in den Bedingungen."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/blog/kunde-behauptet-schaden-betriebshaftpflicht",
        "text": "Kunde behauptet einen Schaden: Was Sie jetzt sagen, was Sie lassen"
      },
      {
        "pfad": "/blog/grobe-fahrlaessigkeit-versicherung-betrieb",
        "text": "Etwas vergessen: Zahlt die Versicherung trotzdem?"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 6 und § 19 Handwerksordnung (HwO), https://www.gesetze-im-internet.de/hwo/__6.html, https://www.gesetze-im-internet.de/hwo/__19.html. Abruf: 16.10.2026.",
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand laut Deckblatt: Oktober 2026, „Unverbindliche Bekanntgabe zur fakultativen Verwendung“), Ziffer A1-1, https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie Ihre Betriebsbeschreibung in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  },
  {
    "typ": "beitrag",
    "slug": "kunde-behauptet-schaden-betriebshaftpflicht",
    "published": true,
    "title": "Kunde behauptet Schaden: Haftpflicht | Smarter Finanz",
    "description": "Der Kunde sagt „Das war Ihr Pfusch“. Was Sie am Telefon sagen, was in die Schadenmappe gehört und wann Ihr Versicherer es erfahren sollte.",
    "h1": "„Das war Ihr Pfusch“. Was Sie jetzt sagen, was Sie lassen",
    "kurzname": "Kunde behauptet Schaden: Haftpflicht",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Montag, kurz vor acht. Kaffee in der Hand, der Tag im Kopf.",
      "Dann klingelt das Handy: der Kunde vom Bad, das Sie am Freitag übergeben haben.",
      "„An der Decke sind Flecken. Das war Ihr Pfusch. Und die Restrechnung überweise ich erst mal nicht.“",
      "Jetzt kommt der Moment, in dem man etwas Nettes sagen will: „Ich zahl das, keine Sorge.“",
      "Klingt anständig. Ist nur eben der Satz, den Sie besser noch nicht sagen.",
      "Hier steht, was Sie stattdessen sagen, was in die Schadenmappe gehört und wann Ihr Versicherer davon erfahren sollte."
    ],
    "kurz": [
      {
        "frage": "Erst zuhören.",
        "antwort": "Am besten keine Zahlung und kein Schuldeingeständnis, bevor Ihr Versicherer eingebunden ist."
      },
      {
        "frage": "Früh melden.",
        "antwort": "Die Frist beträgt eine Woche und kann schon vor der Forderung des Kunden laufen. Im Zweifel melden Sie am selben Tag."
      },
      {
        "frage": "Festhalten.",
        "antwort": "Fotos, Arbeitsnachweise, was gesagt wurde und wer dabei war: alles in eine Mappe."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Versicherungsschein und die Adresse für Schadenmeldungen dorthin legen, wo Sie sie am Montagmorgen finden."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Ihr Kunde ist kein Gutachter"
      },
      {
        "art": "p",
        "text": "Ein Fleck an der Decke ist noch kein Gutachten. Ob Ihre Arbeit die Ursache war, steht damit nicht fest."
      },
      {
        "art": "p",
        "text": "Das kennen Sie von der Baustelle: Ein Riss in der Wand sagt noch nicht, ob das Haus sich setzt oder der Putz nur trocknet."
      },
      {
        "art": "p",
        "text": "Hören Sie dem Kunden zu und bleiben Sie sachlich, statt über Schuld zu streiten. Wer jetzt streitet, rät nur."
      },
      {
        "art": "h2",
        "text": "Der netteste Satz des Tages kann warten"
      },
      {
        "art": "p",
        "text": "Am besten keine Zahlung und kein Schuldeingeständnis, bevor Ihr Versicherer eingebunden ist. Einen Auftrag sagen Sie ja auch nicht zu, bevor Sie die Baustelle gesehen haben."
      },
      {
        "art": "p",
        "text": "Wenn Sie sagen „Ich zahle das“, nennt man das ein **Anerkenntnis**. Das Gleiche gilt für einen Vergleich, also eine Einigung mit dem Kunden."
      },
      {
        "art": "p",
        "text": "Sagen können Sie etwas anderes. Zum Beispiel so:"
      },
      {
        "art": "ul",
        "punkte": [
          "„Das nehme ich ernst.“",
          "„Ich melde den Vorgang meinem Versicherer, der prüft den Fall.“",
          "„Sobald ich mehr weiß, melde ich mich bei Ihnen.“"
        ]
      },
      {
        "art": "p",
        "text": "Das klingt weniger großzügig, hat aber den Vorteil, dass es stimmt."
      },
      {
        "art": "h2",
        "text": "Melden Sie heute, nicht irgendwann"
      },
      {
        "art": "p",
        "text": "Im Zweifel melden Sie am selben Tag, per Mail oder Brief, an die Stelle, die in Ihrem Versicherungsschein genannt ist. Schreiben Sie, wie Sie es einem Kollegen am Telefon erzählen würden: was passiert ist, wann, wo, wer dabei war."
      },
      {
        "art": "p",
        "text": "Melden Sie zu spät, kann das Ihren Schutz kosten. Auch bei einem kleinen Betrag lohnt die Meldung."
      },
      {
        "art": "p",
        "text": "Berichten Sie dem Versicherer vollständig und ehrlich und helfen Sie bei der Klärung."
      },
      {
        "art": "h2",
        "text": "Sauber gearbeitet, also nichts melden?"
      },
      {
        "art": "p",
        "text": "„Ich habe sauber gearbeitet, also muss ich nichts melden.“ Das fühlt sich logisch an."
      },
      {
        "art": "p",
        "text": "Melden Sie trotzdem. Ob die Ansprüche berechtigt sind, prüft der Versicherer."
      },
      {
        "art": "p",
        "text": "Sie müssen den Fall nicht gewinnen. Sie müssen ihn melden."
      },
      {
        "art": "p",
        "text": "Ob die Versicherung am Ende zahlt, ist eine eigene Frage. Die Antwort steht im [Artikel zur Betriebshaftpflicht](/blog/was-zahlt-die-betriebshaftpflicht)."
      },
      {
        "art": "h2",
        "text": "Schadenmappe anlegen, solange alles frisch ist"
      },
      {
        "art": "p",
        "text": "Es kann helfen, festzuhalten, was passiert ist. Das gehört in die Mappe:"
      },
      {
        "art": "ul",
        "punkte": [
          "Datum und Ort",
          "was gesagt wurde und wer dabei war",
          "Fotos und Arbeitsnachweise vom fertigen Bad",
          "Versicherungsschein und Vertragsnummer"
        ]
      },
      {
        "art": "p",
        "text": "Eine Mappe, die man findet, schlägt den Ordner, den zuletzt irgendwer hatte."
      },
      {
        "art": "h2",
        "text": "Zurück zum Montagmorgen"
      },
      {
        "art": "p",
        "text": "Zuhören, nichts anerkennen, melden, festhalten, in dieser Reihenfolge. Beim Dachdecker ist es der Tropfen im Flur, beim Elektriker der Rußfleck an der Wand: Die Reihenfolge bleibt dieselbe."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Legen Sie Versicherungsschein und die Adresse für Schadenmeldungen an einen Ort, den Sie am Montagmorgen finden."
      },
      {
        "art": "p",
        "text": "Der Kaffee ist kalt, die Meldung ist raus. Für einen Montag ist das keine schlechte Bilanz."
      },
      {
        "art": "p",
        "text": "Erst messen, dann sägen. Im Schadenfall heißt das: erst melden, mit dem Versicherer abstimmen, dann großzügig sein."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Ihr Vertrag kann abweichen. Was bei Ihnen gilt, steht in Ihrem Versicherungsschein und in den Bedingungen."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/betriebshaftpflicht-nachweis-auftraggeber",
        "text": "Nachweis der Betriebshaftpflicht für den Auftraggeber"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/blog/grobe-fahrlaessigkeit-versicherung-betrieb",
        "text": "Etwas vergessen: Zahlt die Versicherung trotzdem?"
      },
      {
        "pfad": "/blog/betriebsbeschreibung-betriebshaftpflicht",
        "text": "Wärmepumpe angeschlossen, Vertrag nicht angepasst? So prüfen Sie Ihre Arbeitsliste"
      },
      {
        "pfad": "/blog/was-zahlt-die-betriebshaftpflicht",
        "text": "„Zahlt das Ihre Versicherung?“ Was die Betriebshaftpflicht zahlt, was nicht"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 104 VVG (Anzeigepflicht des Versicherungsnehmers), https://www.gesetze-im-internet.de/vvg_2008/__104.html. Abruf: 16.10.2026.",
      "Deutscher Bundestag, Gesetzentwurf der Bundesregierung, Entwurf eines Gesetzes zur Reform des Versicherungsvertragsrechts, Drucksache 16/3945 vom 20.12.2006, Begründung zu § 104 (S. 85), https://dserver.bundestag.de/btd/16/039/1603945.pdf. Abruf: 16.10.2026.",
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand laut Deckblatt: Oktober 2026, „Unverbindliche Bekanntgabe zur fakultativen Verwendung“), Ziffern A1-4.1, A1-5.4, B3-3.2.2 und B4-2.1, https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie das für Ihren Betrieb in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  },
  {
    "typ": "beitrag",
    "slug": "betriebsunterbrechung-ertragsausfall",
    "published": true,
    "title": "Betriebsunterbrechung nach einem Schaden | Smarter Finanz",
    "description": "Brand oder Wasserschaden, der Betrieb steht still: Was die Inhaltsversicherung ersetzt, was die Betriebsunterbrechung leistet und worauf Sie achten.",
    "h1": "Betrieb steht still, Kosten laufen weiter: Was Sie vorab klären können",
    "kurzname": "Betriebsunterbrechung nach einem Schaden",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Dienstag, kurz nach sechs. Die Feuerwehr rollt die Schläuche ein, die Halle der Schreinerei steht in Rauch und Wasser.",
      "Maschinen und Holz sind beschädigt, das sieht man. Was man nicht sieht: die nächsten Wochen.",
      "Löhne, Miete und Leasingraten fragen nicht, ob es gebrannt hat. Sie kommen zum Ersten.",
      "Hier steht, was die Inhaltsversicherung ersetzt, was die Betriebsunterbrechung dazu beitragen kann und welche fünf Fragen Sie Ihrem Vertrag vorher stellen."
    ],
    "kurz": [
      {
        "frage": "Zwei Bausteine.",
        "antwort": "Die Inhaltsversicherung ersetzt Maschinen und Holz, soweit versichert. Den ausfallenden Verdienst ersetzt sie nicht automatisch."
      },
      {
        "frage": "Betriebsunterbrechung.",
        "antwort": "Wenn vereinbart, ersetzt sie Gewinn und laufende Kosten nach einem Sachschaden, den die Bedingungen nennen."
      },
      {
        "frage": "Zeit und Summe.",
        "antwort": "Wie lange und bis zu welcher Summe, legt Ihr Vertrag fest."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Im Versicherungsschein nachsehen: Ist die Betriebsunterbrechung vereinbart, mit welcher Summe und Haftzeit?"
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Ersetzt die Inhaltsversicherung auch den Verdienst?"
      },
      {
        "art": "p",
        "text": "Nicht automatisch. Die **Inhaltsversicherung** ist die Versicherung für die Einrichtung und die Vorräte im Betrieb."
      },
      {
        "art": "p",
        "text": "Im Beispiel der Schreinerei ersetzt die Inhaltsversicherung Maschinen und Holz, soweit versichert. Ohne Betriebsunterbrechung trägt der Betrieb die Zeit bis zum Neustart selbst."
      },
      {
        "art": "p",
        "text": "Wie beim Hausbau: Die Rechnung für den Rohbau und die Rechnung für die Zinsen der Bauzeit sind zwei verschiedene Rechnungen."
      },
      {
        "art": "h2",
        "text": "Gewinn plus laufende Kosten"
      },
      {
        "art": "p",
        "text": "Die **Betriebsunterbrechung** ist ein Baustein, der die Zeit des Stillstands absichern kann. Sie kann den Gewinn ersetzen, den Ihr Betrieb nicht verdient, und die Kosten, die trotzdem weiterlaufen. Das sind zum Beispiel Löhne, Miete und Leasingraten."
      },
      {
        "art": "p",
        "text": "Das gilt nur, wenn die Betriebsunterbrechung vereinbart ist. Außerdem braucht sie einen Auslöser: einen Sachschaden, den die Bedingungen nennen, zum Beispiel die Zerstörung einer Maschine durch Brand."
      },
      {
        "art": "p",
        "text": "Nicht jede Ausgabe zählt. Kosten werden nur ersetzt, soweit sie rechtlich notwendig oder wirtschaftlich begründet sind."
      },
      {
        "art": "h2",
        "text": "Die Stoppuhr läuft ab dem Schaden"
      },
      {
        "art": "p",
        "text": "Die Betriebsunterbrechung zahlt höchstens so lange, wie die Haftzeit reicht, und nur, solange der Ausfall besteht. Die **Haftzeit** ist der Zeitraum, für den sie zahlen kann."
      },
      {
        "art": "p",
        "text": "Die Stoppuhr läuft ab dem Schaden, nicht ab dem ersten Spatenstich. Planungs- und Wartezeiten laufen also mit. Auch die Wochen, in denen Sie auf den Elektriker warten, der „nächste Woche“ kommt."
      },
      {
        "art": "h2",
        "text": "Die Summe muss zum Jahr passen"
      },
      {
        "art": "p",
        "text": "Es gibt zwei Formen: die ausführliche Betriebsunterbrechung und die einfache. Bei der ausführlichen soll die Summe zu dem passen, was Ihr Betrieb im Jahr an Gewinn und fortlaufenden Kosten erwirtschaftet. Bei der einfachen gilt laut Musterbedingungen die Summe Ihrer Inhaltsversicherung zugleich als Summe der Betriebsunterbrechung."
      },
      {
        "art": "p",
        "text": "Liegt die Summe unter dem Wert, wird die Entschädigung laut Musterbedingungen gekürzt, im Verhältnis von Summe zu Wert. Wie das funktioniert, erklärt der [Artikel zur Summe im Vertrag](/blog/unterversicherung-inhalt-betrieb)."
      },
      {
        "art": "p",
        "text": "Wie lange ein Stillstand dauern könnte, bestimmt die Haftzeit, nicht die Summe. Lassen Sie sich im Vertrag zeigen, wie Ihre Summe berechnet wurde."
      },
      {
        "art": "h2",
        "text": "Fünf Fragen an Ihren Vertrag"
      },
      {
        "art": "ul",
        "punkte": [
          "Ist die Betriebsunterbrechung vereinbart, und ist es die ausführliche oder die einfache Form?",
          "Welche Ursachen sind eingeschlossen, zum Beispiel Leitungswasser, Sturm oder Hochwasser?",
          "Wie lange zahlt sie, und reicht das für einen Wiederaufbau bei mir?",
          "Passt meine Summe zu Gewinn und Kosten eines Jahres, bei längerer Haftzeit zu mehr?",
          "Zieht der Versicherer einen Betrag ab, den ich selbst trage?"
        ]
      },
      {
        "art": "h2",
        "text": "Zurück zur Halle"
      },
      {
        "art": "p",
        "text": "Form, Ursache, Haftzeit, Summe, Eigenanteil: fünf Punkte in Ihrem Vertrag, die Sie vor dem Schaden kennen sollten."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Schlagen Sie Versicherungsschein und Bedingungen auf und schreiben Sie neben die fünf Fragen, was dort steht. Was offen bleibt, klären Sie mit Ihrem Versicherer."
      },
      {
        "art": "p",
        "text": "Der Erste des Monats kommt trotzdem, pünktlich wie ein Dauerauftrag. Ob der Vertrag dafür etwas vorsieht, lässt sich heute nachlesen."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Grundlage sind die unverbindlichen Musterbedingungen des Versichererverbands GDV zur Betriebsunterbrechung. Ihr Vertrag kann abweichen, maßgeblich sind seine Bedingungen."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/blog/unterversicherung-inhalt-betrieb",
        "text": "Halb versichert, halb ersetzt? Warum die Zahl im Vertrag mitwachsen sollte"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Allgemeine Feuer-Betriebsunterbrechungs-Versicherungs-Bedingungen (FBUB 2010, GDV 0120, Version laut Deckblatt: 01.04.2014, unverbindliche Bekanntgabe), § 1, § 2, § 5 und § 6, https://www.gdv.de/resource/blob/6120/8d3b52913f8c4b26fb6ab434b594078d/01-allgemeine-feuer-betriebsunterbrechungs-versicherungs-bedingungen--fbub-2010--data.pdf. Abruf: 16.10.2026.",
      "GDV, Zusatzbedingungen für die einfache Betriebsunterbrechungs-Versicherung (ZKBU 2010, GDV 0125, Version laut Deckblatt: 01.04.2014), § 3 und § 4, https://www.gdv.de/resource/blob/6122/78ada56583a0eb5c15b55f4e9ad35636/02-zusatzbedingungen-fuer-die-einfache-betriebsunterbrechungs-versicherung-zkbu-2010--data.pdf. Abruf: 16.10.2026.",
      "GDV, Allgemeine Bedingungen für die Feuerversicherung (AFB 2010, GDV 0100, Version laut Deckblatt: 01.04.2014, unverbindliche Bekanntgabe), § 8, https://www.gdv.de/resource/blob/6066/fac7f18cb40b22a072cfe665774abfcc/01-allgemeine-bedingungen-fuer-die-feuerversicherung-afb-2010--data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie die Absicherung für einen Stillstand in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  },
  {
    "typ": "beitrag",
    "slug": "unterversicherung-inhalt-betrieb",
    "published": true,
    "title": "Inventar versichert: Reicht die Summe? | Smarter Finanz",
    "description": "Ist die Versicherungssumme für Ihr Inventar zu niedrig, kann die Versicherung nur einen Teil des Schadens zahlen. So prüfen Sie Ihre Summe.",
    "h1": "Halb versichert, halb ersetzt? Warum die Zahl im Vertrag mitwachsen sollte",
    "kurzname": "Inventar versichert: Reicht die Summe?",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Ein Café, vor Jahren eingerichtet. Die Summe im Vertrag hat der Inhaber damals sorgfältig festgelegt.",
      "Seitdem kamen eine größere Kaffeemaschine, neue Möbel und ein Lager dazu. Die Preise sind gestiegen.",
      "Die Zahl im Vertrag blieb. Zahlen beschweren sich nicht, wenn man sie vergisst.",
      "Dann gibt es einen Schaden.",
      "Es geht um die Inhaltsversicherung, die Versicherung für Einrichtung und Vorräte im Betrieb.",
      "Hier steht, wie die Rechnung danach aussieht und wie Sie Ihre eigene Summe an einem Abend prüfen."
    ],
    "kurz": [
      {
        "frage": "Summe gegen Wert.",
        "antwort": "Zu niedrig versichert heißt: Die Summe im Vertrag liegt unter dem Wert Ihrer Sachen zum Zeitpunkt des Schadens."
      },
      {
        "frage": "Teilersatz.",
        "antwort": "Die Versicherung kann dann nur einen Teil des Schadens zahlen, im Verhältnis von Summe zu Wert."
      },
      {
        "frage": "Auch kleine Lücken.",
        "antwort": "Verlassen Sie sich nicht darauf, dass ein kleiner Abstand keine Rolle spielt."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Summe aus dem Versicherungsschein neben die Liste Ihrer Anschaffungen legen."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Der Kuchen wächst, das Stück im Vertrag nicht"
      },
      {
        "art": "p",
        "text": "Im Vertrag steht, wie groß das versicherte Stück Kuchen ist. Ist der Kuchen gewachsen, das Stück aber nicht, kann im Schaden nur ein Teil davon zurückkommen."
      },
      {
        "art": "p",
        "text": "Die Summe im Vertrag ist der Höchstbetrag, den die Versicherung dafür zahlt. Der Wert Ihrer Sachen ist das, was sie zum Zeitpunkt des Schadens wert sind. Liegt die Summe darunter, spricht man von **Unterversicherung**."
      },
      {
        "art": "h2",
        "text": "Erst teilen, dann ersetzen"
      },
      {
        "art": "p",
        "text": "Die Versicherung teilt die Summe durch den Wert. Das Ergebnis ist der Anteil des Schadens, den sie ersetzt. So beschreibt es auch das Gesetz."
      },
      {
        "art": "p",
        "text": "Ein Rechenbeispiel ohne Beträge: Der Wert Ihrer Sachen ist doppelt so hoch wie die Summe im Vertrag. Dann ersetzt die Versicherung nach dieser Rechnung die Hälfte des Schadens."
      },
      {
        "art": "p",
        "text": "Die andere Hälfte bliebe bei Ihnen. Das Beispiel dient dem Verstehen und sagt nichts über Ihren Vertrag."
      },
      {
        "art": "h2",
        "text": "„Ein kleiner Abstand fällt doch nicht ins Gewicht“"
      },
      {
        "art": "p",
        "text": "Das Gesetz spricht von einer „erheblich“ niedrigeren Summe. Die Musterbedingungen sind strenger: Dort genügt schon eine niedrigere Summe."
      },
      {
        "art": "p",
        "text": "Verlassen Sie sich darum nicht darauf, dass ein kleiner Abstand keine Rolle spielt. Ihre Bedingungen können eine Grenze setzen oder schon bei einem kleinen Abstand kürzen."
      },
      {
        "art": "h2",
        "text": "Mit dem Preis von heute rechnen"
      },
      {
        "art": "p",
        "text": "Rechnen Sie mit dem, was die Sache heute kostet, nicht mit dem, woran Sie sich gern erinnern."
      },
      {
        "art": "p",
        "text": "Die Sachen und die Preise ändern sich, die Summe im Vertrag bleibt stehen. Das kann zum Beispiel bei neuen Maschinen, Möbeln oder Werkzeug passieren, bei einem Warenlager, das im Lauf des Jahres wächst, und bei steigenden Preisen für Ersatz."
      },
      {
        "art": "p",
        "text": "Die Musterbedingungen erwarten, dass Sie die Summe dem jeweils gültigen Wert anpassen. Für Einrichtung und Maschinen zählt dabei der **Neuwert**, also das, was dieselbe Sache neu kostet. Es kann Verträge geben, in denen sich die Summe automatisch anpasst."
      },
      {
        "art": "h2",
        "text": "Die Merkliste für einen Abend"
      },
      {
        "art": "ul",
        "punkte": [
          "**Einrichtung, Maschinen, Werkzeug:** Was würde dasselbe heute neu kosten?",
          "**Vorräte und Waren:** Wie viel liegt bei Ihnen im Lager, wenn es am vollsten ist?",
          "**Anpassung:** Hat mein Vertrag eine automatische Anpassung?",
          "**Stand:** Wann habe ich die Summe zuletzt geprüft?"
        ]
      },
      {
        "art": "p",
        "text": "Lautet die ehrliche Antwort auf die letzte Frage „zur Eröffnung“, ist heute ein guter Tag."
      },
      {
        "art": "p",
        "text": "Prüfen Sie Einrichtung und Waren getrennt, denn die Versicherung rechnet laut Musterbedingungen für jeden Teil für sich. Wenn Sie unsicher sind, gehen Sie die Liste mit Ihrem Versicherer durch."
      },
      {
        "art": "h2",
        "text": "Zurück zum Café"
      },
      {
        "art": "p",
        "text": "Summe gegen Wert, Teil für Teil, einmal im Jahr."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Legen Sie die Summe aus dem Versicherungsschein neben Ihre Anschaffungsliste. Schreiben Sie zu jeder Zeile, was sie heute neu kosten würde."
      },
      {
        "art": "p",
        "text": "Das Café ist gewachsen, der Kuchen auch. Die Kaffeemaschine ist längst eingezogen, jetzt darf das Stück im Vertrag nachziehen."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Welche Regeln für Sie gelten, steht in Ihrem Vertrag. Grundlage sind das Gesetz und die unverbindlichen Musterbedingungen des Versichererverbands GDV zur Feuerversicherung. Ihr Vertrag kann das anders regeln."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/blog/betriebsunterbrechung-ertragsausfall",
        "text": "Betrieb steht still, Kosten laufen weiter: Was Sie vorab klären können"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/blog/grobe-fahrlaessigkeit-versicherung-betrieb",
        "text": "Etwas vergessen: Zahlt die Versicherung trotzdem?"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 75, § 87 und § 88 VVG, https://www.gesetze-im-internet.de/vvg_2008/__75.html, https://www.gesetze-im-internet.de/vvg_2008/__87.html, https://www.gesetze-im-internet.de/vvg_2008/__88.html. Abruf: 16.10.2026.",
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Allgemeine Bedingungen für die Feuerversicherung (AFB 2010, GDV 0100, Version laut Deckblatt: 01.04.2014, unverbindliche Bekanntgabe), § 7 und § 8, https://www.gdv.de/resource/blob/6066/fac7f18cb40b22a072cfe665774abfcc/01-allgemeine-bedingungen-fuer-die-feuerversicherung-afb-2010--data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie Ihre Summen in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  },
  {
    "typ": "beitrag",
    "slug": "grobe-fahrlaessigkeit-versicherung-betrieb",
    "published": true,
    "title": "Grobe Fahrlässigkeit: Je nach Versicherung | Smarter Finanz",
    "description": "Wenn ich etwas vergessen habe: Zahlt die Versicherung trotzdem? Was bei Missgeschick, grober Unachtsamkeit und Absicht gilt, hängt von der Versicherung ab.",
    "h1": "Etwas vergessen: Zahlt die Versicherung trotzdem?",
    "kurzname": "Grobe Fahrlässigkeit: Je nach Versicherung",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Fünf Uhr morgens, Backstube. Die Lieferung ist da, die Öfen laufen, und der Sack Mehl landet dort, wo gerade Platz ist: auf dem Boden. Nur kurz, versteht sich. Provisorien halten bekanntlich am längsten.",
      "Im Vertrag steht, dass Vorräte mit Abstand zum Boden lagern müssen. Daran hat heute Morgen keiner gedacht.",
      "In der Nacht dringt Wasser ein. Am Telefon die Versicherung, höflich, mit einer Frage: „Hatten Sie nicht eine Vorgabe zur Lagerung?“",
      "Ob das etwas ändert, hängt von mehr ab als vom Sack.",
      "Hier steht in drei Schritten, wovon die Antwort auf „Ich hab was vergessen, zahlt die Versicherung?“ abhängt."
    ],
    "kurz": [
      {
        "frage": "Sachversicherung.",
        "antwort": "Nach dem Gesetz muss die Versicherung bei einem Missgeschick trotzdem zahlen, bei grober Schlamperei darf sie kürzen, bei Absicht muss sie nicht zahlen. Der Vertrag kann abweichen."
      },
      {
        "frage": "Betriebshaftpflicht.",
        "antwort": "Beim Herbeiführen des Schadens muss die Versicherung gesetzlich nur dann nicht zahlen, wenn Sie ihn absichtlich und gegen das Recht verursacht haben. Der Vertrag darf strenger sein und zum Beispiel bewusstes Fehlverhalten ausschließen."
      },
      {
        "frage": "Pflichten im Vertrag.",
        "antwort": "Wer sie grob schlampig verletzt, riskiert eine Kürzung, bei Absicht kann die Zahlung ganz entfallen. Ihr Vertrag kann Abweichendes regeln."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Im Vertrag nachlesen, welche Pflichten drinstehen: Sicherungen, Kontrollen, Prüfungen, Fristen."
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "Schritt 1: Wie schwer war der Fehler?"
      },
      {
        "art": "p",
        "text": "Das Gesetz unterscheidet drei Stufen:"
      },
      {
        "art": "ul",
        "punkte": [
          "**Missgeschick:** ein normaler Fehler, etwa wenn der Sack einmal versehentlich auf dem Boden steht.",
          "**Grobe Schlamperei**, im Gesetz grobe Fahrlässigkeit: ein besonders schwerer Verstoß gegen die nötige Sorgfalt.",
          "**Absicht:** Sie wollten den Schaden oder haben ihn bewusst in Kauf genommen. Bei einer Pflicht aus dem Vertrag genügt es, sie bewusst nicht zu erfüllen."
        ]
      },
      {
        "art": "p",
        "text": "Wo ein Fehler einzuordnen ist, hängt vom Einzelfall ab. Ein Lineal dafür gibt es nicht."
      },
      {
        "art": "h2",
        "text": "Schritt 2: Bei welcher Versicherung ist es passiert?"
      },
      {
        "art": "p",
        "text": "Bei Sachen, also Inhalt, Gebäude oder Betriebsunterbrechung, darf die Versicherung bei grober Schlamperei kürzen. Wie stark, hängt von der Schwere des Fehlers ab. Bei Absicht muss sie nicht zahlen, bei einem Missgeschick muss sie trotzdem zahlen. So steht es im Gesetz, und die Musterbedingungen des Versichererverbands GDV, ein unverbindliches Muster für Verträge, sehen dasselbe vor."
      },
      {
        "art": "p",
        "text": "In der Betriebshaftpflicht gilt eine eigene Regel: Beim Herbeiführen des Schadens muss die Versicherung gesetzlich nur dann nicht zahlen, wenn Sie ihn absichtlich und gegen das Recht verursacht haben. Der Vertrag darf strenger sein: Laut Musterbedingungen sind absichtlich herbeigeführte Schäden ausgeschlossen, dazu kommen weitere Ausschlüsse für bewusstes Fehlverhalten."
      },
      {
        "art": "p",
        "text": "Welche bei Ihnen gelten, sehen Sie nur im Vertrag."
      },
      {
        "art": "h2",
        "text": "Schritt 3: Was im Vertrag als Pflicht steht"
      },
      {
        "art": "p",
        "text": "Pflichten im Vertrag sind Hausaufgaben mit Folgen: etwas, das Sie tun oder lassen müssen, damit die Versicherung voll zahlt. Vor dem Schaden ist das zum Beispiel der Abstand zum Boden oder die Alarmanlage, die abends eingeschaltet wird. Nach dem Schaden sind es Melden und Auskunft geben."
      },
      {
        "art": "p",
        "text": "Sieht der Vertrag für eine verletzte Pflicht Folgen vor, stuft das Gesetz sie nach der Schwere des Fehlers ab. Bei einem Missgeschick darf die Versicherung weder kürzen noch die Zahlung verweigern, bei grober Schlamperei darf sie kürzen, bei Absicht darf sie die Zahlung verweigern."
      },
      {
        "art": "p",
        "text": "Belegen Sie, dass Sie die Pflichten einhalten, zum Beispiel mit Prüfprotokollen. Das Prüfprotokoll gehört in den Ordner, nicht in die Jackentasche. Spätestens nach der nächsten Wäsche weiß man, warum."
      },
      {
        "art": "h2",
        "text": "Zurück zum Mehlsack"
      },
      {
        "art": "p",
        "text": "Pflichten kennen, einhalten, belegen, in dieser Reihenfolge."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Schlagen Sie Versicherungsschein und Bedingungen auf, streichen Sie die Pflichten an und legen Sie die Nachweise dazu. Fragen Sie bei Unsicherheit Ihren Versicherer."
      },
      {
        "art": "p",
        "text": "Ein Sack Mehl wiegt nicht viel. Was im Vertrag dazu steht, kann schwerer wiegen. Der Sack kommt morgen auf eine Palette, die Pflicht dazu heute Abend in den Kopf."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Was in Ihrem Schadenfall gilt, hängt von Ihrem Vertrag und vom Einzelfall ab. Ihr Vertrag kann abweichen: Beim Herbeiführen des Schadens darf er bei Sachen vom Gesetz abweichen, in der Betriebshaftpflicht darf er strenger sein."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/blog/kunde-behauptet-schaden-betriebshaftpflicht",
        "text": "Kunde behauptet einen Schaden: Was Sie jetzt sagen, was Sie lassen"
      },
      {
        "pfad": "/blog/unterversicherung-inhalt-betrieb",
        "text": "Halb versichert, halb ersetzt? Warum die Zahl im Vertrag mitwachsen sollte"
      },
      {
        "pfad": "/blog/betriebsbeschreibung-betriebshaftpflicht",
        "text": "Wärmepumpe angeschlossen, Vertrag nicht angepasst? So prüfen Sie Ihre Arbeitsliste"
      },
      {
        "pfad": "/blog/was-zahlt-die-betriebshaftpflicht",
        "text": "„Zahlt das Ihre Versicherung?“ Was die Betriebshaftpflicht zahlt, was nicht"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "§ 28, § 81, § 87, § 103 und § 112 VVG, https://www.gesetze-im-internet.de/vvg_2008/__28.html, https://www.gesetze-im-internet.de/vvg_2008/__81.html, https://www.gesetze-im-internet.de/vvg_2008/__87.html, https://www.gesetze-im-internet.de/vvg_2008/__103.html, https://www.gesetze-im-internet.de/vvg_2008/__112.html. Abruf: 16.10.2026.",
      "Deutscher Bundestag, Gesetzentwurf der Bundesregierung, Entwurf eines Gesetzes zur Reform des Versicherungsvertragsrechts, Drucksache 16/3945 vom 20.12.2006, Begründung zu § 28 (S. 69), § 81 (S. 79 und 80) und § 103 (S. 85), https://dserver.bundestag.de/btd/16/039/1603945.pdf. Abruf: 16.10.2026.",
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand laut Deckblatt: Oktober 2026, „Unverbindliche Bekanntgabe zur fakultativen Verwendung“), Ziffern A1-7.1, A1-7.2, A1-7.23, B3-3.2.2 und B3-3.3, https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 16.10.2026.",
      "GDV, Allgemeine Bedingungen für die Feuerversicherung (AFB 2010, GDV 0100, Version laut Deckblatt: 01.04.2014, unverbindliche Bekanntgabe), § 11 und Abschnitt B § 16 Nr. 1, https://www.gdv.de/resource/blob/6066/fac7f18cb40b22a072cfe665774abfcc/01-allgemeine-bedingungen-fuer-die-feuerversicherung-afb-2010--data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie die Pflichten in Ihrem Vertrag in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  },
  {
    "typ": "beitrag",
    "slug": "was-zahlt-die-betriebshaftpflicht",
    "published": true,
    "title": "Was zahlt die Betriebshaftpflicht? | Smarter Finanz",
    "description": "Der Kunde fragt: Zahlt das Ihre Versicherung? Was die Betriebshaftpflicht bezahlt, was nicht und was die Selbstbeteiligung damit zu tun hat.",
    "h1": "„Zahlt das Ihre Versicherung?“ Was die Betriebshaftpflicht zahlt, was nicht",
    "kurzname": "Was zahlt die Betriebshaftpflicht?",
    "stand": "Oktober 2026",
    "einleitung": [
      "Beispiel: Im fertigen Bad zeigt der Kunde auf etwas und fragt: „Zahlt das Ihre Versicherung?“",
      "Der Handwerker nickt, so wie man nickt, wenn man es nicht genau weiß. Der Versicherungsschein liegt im Büro, und das Büro ist gerade im Transporter. Der Kunde meint es nicht böse, er will nur wissen, woran er ist.",
      "Die ehrliche Antwort lautet: Kommt darauf an, was „das“ ist. Es kann der Fleck an der Decke sein, die Fliesen oder der Rest der Rechnung, und jedes hat seine eigene Antwort.",
      "Hier steht, was die Betriebshaftpflicht bezahlt, was nicht und was die Selbstbeteiligung damit zu tun hat."
    ],
    "kurz": [
      {
        "frage": "Schäden bei anderen.",
        "antwort": "Die Betriebshaftpflicht ist die Versicherung für Schäden, die Sie bei Ihrer Arbeit anderen zufügen. Laut Musterbedingungen prüft der Versicherer zuerst, ob der Kunde recht hat."
      },
      {
        "frage": "Eigene Arbeit.",
        "antwort": "Laut Musterbedingungen gehört Ihre eigene Arbeit nicht dazu, zum Beispiel Fliesen neu zu verlegen."
      },
      {
        "frage": "Selbstbeteiligung.",
        "antwort": "Das ist der Betrag, den Sie bei jedem Schaden selbst tragen. Wie hoch er bei Ihnen ist, steht in Ihrem Vertrag."
      },
      {
        "frage": "Heute tun.",
        "antwort": "Im Vertrag nachsehen: Wie hoch sind Selbstbeteiligung und Summe?"
      }
    ],
    "abschnitte": [
      {
        "art": "h2",
        "text": "„Und der Fleck an der Decke?“ Erst prüft der Versicherer"
      },
      {
        "art": "p",
        "text": "Zeigt der Kunde auf einen Fleck an der Decke darunter, geht es um einen Schaden an seinen Sachen. Das ist eine Frage für Ihren Versicherer."
      },
      {
        "art": "p",
        "text": "Er prüft zuerst, ob der Kunde recht hat. Ein Fleck an der Decke ist noch kein Gutachten. Ob Ihre Arbeit die Ursache war, steht damit nicht fest."
      },
      {
        "art": "p",
        "text": "Hat der Kunde recht, zahlt der Versicherer so, wie Ihr Vertrag es vorsieht, an den Kunden, nicht Sie: bis zur Summe im Vertrag und nach Abzug der **Selbstbeteiligung**. Das ist der Betrag, den Sie bei jedem Schaden selbst tragen."
      },
      {
        "art": "h2",
        "text": "„Und die Fliesen verlegen Sie neu?“"
      },
      {
        "art": "p",
        "text": "Nicht alles, was der Kunde verlangt, ist ein Fall für die Betriebshaftpflicht. Geht es um Ihre eigene Arbeit selbst, zahlt sie nicht."
      },
      {
        "art": "p",
        "text": "Verlangt der Kunde zum Beispiel, dass Sie die Fliesen neu verlegen, ist das kein Fall für sie. Die Betriebshaftpflicht verlegt keine Fliesen."
      },
      {
        "art": "h2",
        "text": "„Und der Rest der Rechnung?“"
      },
      {
        "art": "p",
        "text": "Auch ein zurückgehaltener Teil der Rechnung ist kein Fall für sie: Sie bezahlt Schäden, die Sie anderen zufügen, keine offenen Rechnungen. Außenstände holt sie nicht herein."
      },
      {
        "art": "h2",
        "text": "Die Selbstbeteiligung macht den Anfang"
      },
      {
        "art": "p",
        "text": "Wie hoch die Selbstbeteiligung bei Ihnen ist, steht in Ihrem Vertrag. Es ist die Zahl, die man erst liest, wenn man sie braucht. Wer sie kennt, muss im Bad nicht raten."
      },
      {
        "art": "p",
        "text": "Bei jedem Schaden macht Ihr Betrieb damit den Anfang. Auch bei einem kleinen Betrag lohnt die Meldung."
      },
      {
        "art": "h2",
        "text": "Zurück ins Bad"
      },
      {
        "art": "p",
        "text": "Prüfen lassen, Eigenes selbst erledigen, Selbstbeteiligung kennen, in dieser Reihenfolge."
      },
      {
        "art": "p",
        "text": "Am besten kein Zahlungsversprechen im Bad, bevor Ihr Versicherer eingebunden ist. Einen Auftrag sagen Sie ja auch nicht zu, bevor Sie die Baustelle gesehen haben. Ein ehrliches „Das prüft mein Versicherer“ ist im Bad besser als ein schnelles „Klar“. Sie müssen den Fall nicht gewinnen. Sie müssen ihn melden."
      },
      {
        "art": "p",
        "text": "Was der Handwerker dem Kunden im Bad sagen kann, steht im [Artikel zum Kunden, der einen Schaden behauptet](/blog/kunde-behauptet-schaden-betriebshaftpflicht): zuhören, nichts anerkennen, melden."
      },
      {
        "art": "p",
        "text": "Heute Abend, zehn Minuten: Suchen Sie in Ihrem Vertrag Selbstbeteiligung und Summe heraus und schreiben Sie beide auf einen Zettel für die Sonnenblende im Transporter. Dort sitzt das Büro ohnehin."
      },
      {
        "art": "p",
        "text": "Die Betriebshaftpflicht ist kein Kollege auf der Baustelle. Sie schraubt nicht, sie streicht nicht, sie verlegt nicht. Sie prüft und rechnet."
      },
      {
        "art": "h2",
        "text": "Gut zu wissen"
      },
      {
        "art": "ul",
        "punkte": [
          "Allgemeine Informationen, Stand Oktober 2026, keine individuelle Beratung. Grundlage sind die unverbindlichen Musterbedingungen des Versichererverbands GDV. Ihr Vertrag kann abweichen. Was bei Ihnen gilt, steht in Ihrem Versicherungsschein und in den Bedingungen."
        ]
      }
    ],
    "faq": [],
    "links": [
      {
        "pfad": "/blog/kunde-behauptet-schaden-betriebshaftpflicht",
        "text": "Kunde behauptet einen Schaden: Was Sie jetzt sagen, was Sie lassen"
      },
      {
        "pfad": "/blog/grobe-fahrlaessigkeit-versicherung-betrieb",
        "text": "Etwas vergessen: Zahlt die Versicherung trotzdem?"
      },
      {
        "pfad": "/branchen/handwerk-bau",
        "text": "Versicherungen für Handwerk und Bau"
      },
      {
        "pfad": "/blog/versicherungen-kleingewerbe",
        "text": "Welche Versicherungen braucht ein Kleingewerbe?"
      },
      {
        "pfad": "/erstinformation",
        "text": "Erstinformation"
      }
    ],
    "quellen": [
      "Gesamtverband der Deutschen Versicherungswirtschaft (GDV), Musterbedingungen für die Betriebs- und Berufshaftpflichtversicherung (AVB BHV, Stand laut Deckblatt: Oktober 2026, „Unverbindliche Bekanntgabe zur fakultativen Verwendung“), Ziffern A1-3.1, A1-3.2, A1-4.1, A1-5.1 und A1-5.4, https://www.gdv.de/resource/blob/6240/36855b2e54b41955ef52c9cfe1190ee5/02-avb-betriebs-und-berufshaftpflichtversicherung-2020-data.pdf. Abruf: 16.10.2026."
    ],
    "cta": {
      "text": "Wenn Sie Ihre Selbstbeteiligung und Ihre Summen in Ruhe besprechen möchten, vereinbaren Sie einen Termin mit André Tito, unverbindlich. Wie wir als Versicherungsmakler vergütet werden, steht in der [Erstinformation](/erstinformation)."
    }
  }
];
