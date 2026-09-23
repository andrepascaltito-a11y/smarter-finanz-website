# Livetest-Ergebnis: Privatperson/Gewerbe-Formular

Datum: 2026-09-23

- Privatperson-Zweig: bestanden (im zweiten Anlauf). Erster Versuch schlug fehl, weil
  EspoCRM ISO-8601-Zeitstempel (`consentZeitpunkt`) mit einem 400 ablehnt und
  "Y-m-d H:i:s" erwartet – wurde in `lib/espocrm.ts` (`toEspoDatetime`) behoben,
  siehe Commit `5f3ef24`. Nach dem Fix: Lead korrekt angelegt, Telefonnummer im
  E.164-Format, `consentZeitpunkt` korrekt gespeichert, André zugewiesen.
- Gewerbe-Zweig ohne bestehende Firma: bestanden. Neue Firma "Systemtest Gewerbe GmbH"
  korrekt angelegt (Telefon E.164, Branche in Description, André zugewiesen).
- Gewerbe-Zweig mit bestehender Firma: bestanden. Test gegen die echte, bereits
  vorhandene Firma "Malermeister Haverich" (aus den 21.341 kuratierten Firmen)
  durchgeführt: neue Notiz mit Präfix "Website-Kontakt:" korrekt an der bestehenden
  Firma angelegt, keine Dublette erzeugt.

## Zusätzlicher Fund (nicht im Plan vorgesehen, aber durch den Livetest aufgedeckt)

Derselbe `consentZeitpunkt`-Format-Bug betraf auch die separate, bereits produktive
FairKV-Website (eigenes Repo, dieselbe EspoCRM-Instanz). Per Diagnose-Request gegen
`https://www.fairkv.de/api/lead` bestätigt: jede echte Lead-Einreichung mit
Consent-Checkbox scheiterte seit Einführung des Consent-Nachweisfelds unbemerkt an
der CRM-Weiterleitung (Antwort war immer `{"ok":true}`). Fix in `FairKV/lib/espocrm.ts`
(Commit `28bb05e`), noch am selben Tag deployt und live erneut verifiziert (Lead
korrekt angelegt, danach als Testdaten wieder entfernt).

## Offener Punkt

Die E-Mail-Benachrichtigung bei Gewerbe-Anfragen (Task 9) schlägt aktuell fehl:
`Invalid login: 535-5.7.8 Username and Password not accepted`. Vermutlich wurde das
App-Passwort unter einem anderen Google-Konto als `SMTP_USER`
(andre.pascal.tito@gmail.com) erzeugt. CRM-Weiterleitung ist davon nicht betroffen
(eigener try/catch-Block), betrifft nur die zusätzliche E-Mail. Muss noch geklärt
werden, bevor Task 9 als vollständig funktionsfähig gilt.

Alle Testeinträge wurden nach der Verifikation wieder aus dem CRM entfernt (2 Test-Leads
in FairKV, 1 Test-Lead + 1 Test-Firma + 1 Test-Notiz in der smarter-finanz-website-Instanz).
