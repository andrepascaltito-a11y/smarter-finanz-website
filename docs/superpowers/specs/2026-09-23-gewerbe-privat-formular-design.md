# Formular für Privatpersonen und Gewerbe auf smarter-finanz-website

**Datum:** 2026-09-23
**Status:** genehmigt, Basis für die Implementierungsplanung

## Ziel

Die smarter-finanz-website ist aktuell eine rein statische HTML-Seite ohne Formular, einzige
Kontaktmöglichkeit ist ein mailto-Link. Ziel dieses Projekts ist ein Kontaktformular mit zwei
Zweigen (Privatperson, Gewerbe), das Anfragen direkt ins bestehende EspoCRM (crm.fairkv.de)
überträgt, dieselbe Instanz, die auch von der FairKV-Website und von Kai (Kaltakquise-Copilot)
genutzt wird.

Der zweite Teil dieses Projekts, wie Traffic zum Formular kommt, ist kein Software-Projekt und
wird separat als Liste am Ende dieser Spec festgehalten, nicht als Implementierungsaufgabe.

## Hintergrund

Am 2026-09-23 wurde bei der FairKV-Website ein fast identischer Lead-zu-EspoCRM-Pfad gehärtet
(`lib/espocrm.ts`, POST an `/api/v1/Lead`, dedizierter API-Key pro Website, E.164-Telefonformat,
dedizierte EspoCRM-Rolle pro API-Nutzer). Dabei wurde entdeckt, dass ein fehlerhaftes
Telefonnummer-Format und eine fehlende Zuweisungs-Berechtigung monatelang jede
Lead-Übertragung unbemerkt hatten scheitern lassen. Dieses Projekt übernimmt die Lehren daraus
von Anfang an: E.164-Format von Beginn an korrekt, die Rolle wird mit den nötigen Berechtigungen
inklusive Zuweisung angelegt, und vor dem Livegang steht ein echter End-to-End-Test.

SmarterFinanz betreibt parallel eine B2B-Kaltakquise-Kampagne (Kai-Copilot) gegen 21.341
kuratierte Firmen, die als Firmen-Datensätze (Account) in derselben EspoCRM-Instanz liegen.
Ein Gewerbe-Kontakt über das neue Formular kann also durchaus eine Firma betreffen, die dort
bereits existiert, zum Beispiel wenn jemand nach einem Kaltakquise-Anruf die Website besucht.

## Architektur

`smarter-finanz-website` wird von statischem HTML auf ein Next.js-Projekt umgestellt, mit
demselben Stack wie die FairKV-Website (Next.js App Router, Vercel-Hosting, dasselbe
GitHub-Repo `andrepascaltito-a11y/smarter-finanz-website`, dasselbe Vercel-Projekt
`smarter-finanz-website`).

Die drei bestehenden Seiten (Startseite `index.html`, `impressum.html`, `datenschutz.html`)
werden eins zu eins als Next.js-Seiten nachgebaut, exakt derselbe Inhalt und Look, keine
gestalterischen Änderungen. Einzige inhaltliche Neuerung ist der Formular-Bereich auf der
Startseite.

Das Formular beginnt mit einer Weiche: "Sind Sie Privatperson oder Unternehmer:in?" Je nach
Auswahl werden unterschiedliche Felder angezeigt und die Anfrage nimmt einen von zwei Wegen ins
CRM.

## Formularfelder

**Privatperson:**
- Vorname, Nachname
- E-Mail
- Telefon
- Thema (Auswahl: Steueroptimierung, Versicherungsvergleich, Altersvorsorge und Investment,
  Finanzierung und Umschuldung, Sonstiges), diese vier Themen entsprechen den bestehenden
  FAQ-Kernbereichen auf der Seite
- Datenschutz-Zustimmung (Pflichtfeld, Consent-Text und Version werden serverseitig
  kanonisiert, nach demselben Muster wie bei FairKV in `lib/consent.ts`)

**Gewerbe:**
- Firmenname
- Ansprechpartner (Vorname, Nachname)
- E-Mail
- Telefon
- Branche (Freitext)
- Datenschutz-Zustimmung (Pflichtfeld, wie oben)

Alle Felder außer Branche sind Pflichtfelder. Telefon wird nach denselben Regeln wie bei FairKV
validiert (deutsches Format, `0…`, `0049…` oder `+49…`).

## Datenfluss

Das Formular postet an eine neue API-Route `/api/lead`, aufgebaut nach demselben Muster wie
bei FairKV (`app/api/lead/route.ts`): Rate-Limiting pro IP, Honeypot- und Timing-Check gegen
Bots, serverseitige Validierung, dann Weiterleitung ans CRM. Der Endpunkt antwortet dem
Besucher immer mit Erfolg, sobald die Eingaben valide sind, CRM-Fehler werden nur serverseitig
geloggt, das bleibt bewusst wie bei FairKV, aber siehe Abschnitt Testing für die Absicherung
dagegen, dass ein Fehler unbemerkt bleibt.

**Zweig Privatperson:** legt einen neuen Lead in EspoCRM an. Telefon wird vor dem Versand ins
E.164-Format umgewandelt (`toE164Phone`, kann aus der FairKV-Website in eine gemeinsam nutzbare
Form gebracht oder für dieses Projekt eigenständig übernommen werden, das entscheidet die
Implementierungsplanung). Zugewiesener Nutzer ist André (Admin), analog zum bestehenden
FairKV-Verhalten.

**Zweig Gewerbe:** sucht zuerst per `GET /api/v1/Account` mit Namensfilter (`textFilter` auf den
eingegebenen Firmennamen, `maxSize` klein halten, zum Beispiel 5), ob die Firma unter den
21.341 bestehenden Firmen existiert. "Eindeutig" heißt hier, genau wie bei Kais eigener
`lade_firma`-Logik in `kai_crm.py`: die Suche liefert genau einen Treffer zurück.
- Genau ein Treffer: eine neue Notiz wird an den bestehenden Account geschrieben (Präfix
  "Website-Kontakt:", damit sie sich von Kais eigenen Einträgen unterscheidet und in der
  History für Kai und die Kaltakquise-Kollegen sichtbar ist).
- Kein Treffer oder mehr als ein Treffer (mehrdeutig): ein neuer Account wird angelegt, mit
  Firmenname, Branche in der Description (gleiches Format wie bei den bestehenden 21.341
  Firmen: "Branche: …"), Telefon und Ansprechpartner-Namen in geeigneten Feldern.

## EspoCRM-Berechtigungen

Ein neuer dedizierter API-Benutzer wird angelegt (Arbeitstitel "smarterfinanz-lead"), mit
Authentifizierungsmethode API-Schlüssel, nach demselben Muster wie der bestehende
"website-lead"-Benutzer der FairKV-Website. Eine eigene Rolle wird dafür angelegt mit:

- Lead: Erstellen = Ja, Lesen = Alle
- Firmen (Account): Erstellen = Ja, Lesen = Alle, Bearbeiten = Nein, Löschen = Nein
- Notiz (Note): Erstellen = Ja, Lesen = Alle
- Benutzer (User): Lesen = Alle (nötig für die Zuweisung an André, exakt der Punkt, der beim
  FairKV-Fix am 2026-09-23 gefehlt hatte)
- Berechtigung Zuweisung: Alle

Der API-Schlüssel wird ausschließlich als Vercel-Umgebungsvariable (`ESPOCRM_API_URL`,
`ESPOCRM_API_KEY`) für das Projekt `smarter-finanz-website` hinterlegt, niemals im Repo.

## Fehlerbehandlung und Testing

Vor dem Livegang wird, wie am 2026-09-23 bei der FairKV-Website erstmals gemacht, ein echter
End-to-End-Test durchgeführt: eine Testanfrage über beide Formular-Zweige an die tatsächliche
Live-Seite senden, direkt im CRM verifizieren, dass Lead beziehungsweise Notiz/Account korrekt
angekommen sind, danach die Testeinträge wieder entfernen. Dieser Test wird im
Implementierungsplan als eigener, nicht überspringbarer Schritt festgehalten.

## Migrations-Umfang

Die Migration der drei bestehenden Seiten erfolgt eins zu eins, keine gestalterische
Überarbeitung. Bestehende Elemente wie das FAQ-Akkordeon, der Kalender-Button
("Kalender laden und Termin wählen") und der Kartenbereich ("Karte laden") bleiben inhaltlich
und optisch unverändert, nur die zugrundeliegende Technik wechselt von statischem HTML auf
Next.js-Komponenten.

## Traffic (kein Software-Teil dieser Spec)

Wie Besucher zum neuen Formular kommen, wird separat und nicht als Teil der
Implementierungsplanung besprochen. Festgehaltene Ideen aus dem Brainstorming:

- Erwähnung durch André, Enrico oder Kai während Kaltakquise-Anrufen als Nachfass-Möglichkeit
- QR-Code auf Unterlagen, die nach einem Erstgespräch hinterlassen werden
- Link im Google-Business-Profil
- Organische Social-Media-Beiträge

Kein bezahlter Traffic vorgesehen, das passt zur bestehenden Linie, dass SmarterFinanz und
Pflegerleicht organisch bleiben, während bezahlte Werbung sich auf FairKV/GKV-Wechsel
konzentriert.
