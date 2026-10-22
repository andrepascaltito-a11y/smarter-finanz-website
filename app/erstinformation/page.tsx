import type { Metadata } from "next";
import styles from "../legal.module.css";
import BlogHeader from "../../components/BlogHeader";

export const metadata: Metadata = {
  title: "Erstinformation und Statusinformation | Smarter Finanz",
  description:
    "Pflichtangaben nach § 15 VersVermV: Status als Versicherungsmakler, Vergütung, Register und Schlichtungsstelle.",
  alternates: { canonical: "/erstinformation" },
};

// Inhaltliche Annahmen (Zuwendungen ja, keine Beteiligungen, Pool-Zugang) von André am 12.10.2026 bestätigt.
export default function Page() {
  return (
    <div className={styles.legalPage}>
      <BlogHeader />
      <main>
        <h1>Erstinformation und Statusinformation</h1>
        <p className={styles.lead}>
          Angaben gemäß § 15 Versicherungsvermittlungsverordnung (VersVermV) sowie Informationen nach §§ 60, 62 VVG
          zur Information des Kunden beim ersten Geschäftskontakt, dazu die Angaben zu Finanzanlagen nach § 12 und
          § 12a Finanzanlagenvermittlungsverordnung (FinVermV) und zu Immobiliardarlehen nach Art. 247 § 13 und
          § 13b EGBGB. Stand: 22.10.2026.
        </p>

        <h2>1. Wer wir sind</h2>
        <p>
          Smarterfinanz, Einzelunternehmen, Inhaber: André Pascal Tito<br />
          Glenetalstraße 101 A, 31061 Alfeld (Leine)<br />
          Telefon: +49 170 8784889, E-Mail: a.tito@smarterfinanz.de
        </p>

        <h2>2. Unser Status</h2>
        <p>
          Wir sind als <strong>Versicherungsmakler</strong> mit Erlaubnis nach § 34d Abs. 1 GewO tätig
          (Vermittlerregister-Nr. D-JOOT-NRHZP-02). Als Makler sind wir nicht an einen einzelnen Versicherer
          gebunden und vertreten deine Interessen.
        </p>
        <p>
          Zusätzlich sind wir als Finanzanlagenvermittler nach § 34f GewO (Reg.-Nr. D-F-133-PEHS-92) und als
          Immobiliardarlehensvermittler nach § 34i GewO (Reg.-Nr. D-W-133-6P5U-60) eingetragen. Die Erlaubnis
          wurde jeweils von der IHK Hannover, Bischofsholer Damm 91, 30173 Hannover, erteilt.
        </p>

        <h2>3. Eintrag im Vermittlerregister prüfen</h2>
        <p>
          Unsere Eintragung kannst du bei der gemeinsamen Stelle prüfen: DIHK | Deutsche Industrie- und
          Handelskammer, Breite Straße 29, 10178 Berlin, Telefon 0180 600 585 0
          (20 ct/Anruf aus dem dt. Festnetz, ggf. abweichend Mobilfunk), Internet:{" "}
          <a href="https://www.vermittlerregister.info">www.vermittlerregister.info</a>. Gib dort unsere
          Registrierungsnummer ein.
        </p>

        <h2>4. Beratung</h2>
        <p>
          Wir bieten dir eine Beratung an. Wir legen ihr eine hinreichende Zahl von am Markt angebotenen
          Verträgen und Versicherern zugrunde (§ 60 Abs. 1 VVG). Zugang zu den Versicherern haben wir über
          Maklerpools (Maxpool, BlauDirekt). Wählen wir im Einzelfall eine eingeschränkte Auswahl, sagen wir
          dir das vor deiner Vertragserklärung ausdrücklich und nennen dir die berücksichtigten Versicherer
          in Textform (§ 60 Abs. 2, § 62 VVG).
          
        </p>

        <h2>5. Unsere Vergütung</h2>
        <ul>
          <li>
            Für die Vermittlung erhalten wir eine <strong>Provision (Courtage)</strong> vom
            jeweiligen Versicherer. Sie ist in der Versicherungsprämie enthalten. Wir berechnen dir
            dafür keine gesonderte Vergütung.
          </li>
          <li>
            Zusätzlich erhalten wir von Versicherern bzw. Maklerpools weitere Zuwendungen, zum Beispiel
            Bestandspflegevergütungen und Boni.
          </li>
          <li>
            Eine gesonderte Vergütung, die du direkt an uns zahlst, gibt es nur, wenn wir sie vorab
            ausdrücklich mit dir vereinbaren. Ohne eine solche Vereinbarung berechnen wir dir keine gesonderte Vergütung.
          </li>
        </ul>

        <h2>6. Beteiligungen</h2>
        <p>
          Es bestehen keine Beteiligungen im Sinne des § 15 Abs. 1 Nr. 10 und 11 VersVermV: Wir halten keine
          unmittelbaren oder mittelbaren Beteiligungen von über 10 Prozent an Stimmrechten oder Kapital eines
          Versicherungsunternehmens, und kein Versicherungsunternehmen oder dessen Mutterunternehmen hält eine
          solche Beteiligung an uns.
        </p>

        <h2>7. Schlichtung und Beschwerden</h2>
        <p>
          Bei Streitigkeiten aus der Versicherungsvermittlung kannst du dich an die Schlichtungsstelle wenden:
          Versicherungsombudsmann e. V., Postfach 08 06 32, 10006 Berlin,{" "}
          <a href="https://www.versicherungsombudsmann.de">www.versicherungsombudsmann.de</a>. Zu
          Finanzanlagen und Immobiliardarlehen siehe Punkt 10 und 12.
        </p>

        <h2>8. Berufshaftpflicht</h2>
        <p>
          Wir haben eine Vermögensschaden-Haftpflichtversicherung abgeschlossen (CGPA Europe Underwriting
          GmbH, Leopoldstraße 19, 80802 München, im Auftrag des Risikoträgers CGPA Europe S.A.;
          Geltungsbereich Deutschland und europaweit).
        </p>

        <h2>9. Finanzanlagen: Was wir anbieten</h2>
        <p>
          Wir sind als Finanzanlagenvermittler mit Erlaubnis nach § 34f Abs. 1 Satz 1 Nr. 1 und Nr. 3 GewO tätig. Registernummer und Erlaubnisbehörde stehen unter Punkt 2, die Prüfung im Register unter Punkt 3. Wir bieten dir an:
        </p>
        <ul>
          <li><strong>Anlageberatung:</strong> Wir sprechen dir eine persönliche Empfehlung aus, nachdem wir deine Kenntnisse, deine finanzielle Lage und deine Ziele erfragt haben.</li>
          <li><strong>Anlagevermittlung:</strong> Wir vermitteln den Kauf einer Finanzanlage, die du selbst ausgewählt hast, ohne persönliche Empfehlung.</li>
          <li><strong>Finanzanlagen:</strong> Anteile an offenen Investmentvermögen (Fonds und ETF) und Vermögensanlagen im Sinne des Vermögensanlagengesetzes. Zu Einzelaktien, Anleihen, Zertifikaten und Kryptowerten beraten wir nicht und vermitteln wir nicht.</li>
          <li><strong>Vermögensverwaltung:</strong> Wir vermitteln den Abschluss von Verträgen über fondsgebundene Vermögensverwaltung. Wir verwalten selbst kein Vermögen. Das übernimmt der Verwalter mit seiner eigenen Erlaubnis.</li>
          <li><strong>Anbieter und Emittenten:</strong> Fonds und ETF vermitteln wir von verschiedenen Fondsgesellschaften über das Depot der FIL Fondsbank GmbH (FFB). Der Zugang läuft über die Plattform Fondsnet. Verwalter der Vermögensverwaltung ist die Reuss Private Bank. Emittenten und Anbieter von Vermögensanlagen nennen wir dir im Einzelfall, bevor wir dazu beraten oder vermitteln. Die Fondsgesellschaft nennen wir dir bei jeder Empfehlung.</li>
        </ul>

        <h2>10. Finanzanlagen: Vergütung, Gespräche und Beschwerden</h2>
        <ul>
          <li><strong>Vergütung von dir:</strong> Für die Vermittlung von Finanzanlagen verlangen wir von dir keine Vergütung. Eine Servicegebühr oder ein Honorar gibt es nur, wenn wir es vorab ausdrücklich mit dir vereinbaren. Wir nennen dir dann vorher die Höhe oder die Art der Berechnung.</li>
          <li><strong>Zuwendungen von Dritten:</strong> Für die Vermittlung von Finanzanlagen erhalten wir Zuwendungen von Dritten, zum Beispiel Bestandsprovisionen und Ausgabeaufschläge, die über die Depotbank, die Plattform oder die Fondsgesellschaft an uns gezahlt werden. Wir dürfen sie behalten. Vor jedem Abschluss legen wir dir Art und Umfang dieser Zuwendungen offen und nennen dir alle Kosten der Anlage (§ 13 und § 17 FinVermV).</li>
          <li><strong>Gesprächsaufzeichnung:</strong> Telefongespräche und sonstige elektronische Kommunikation, die sich auf die Beratung oder Vermittlung zu Finanzanlagen beziehen, zeichnen wir zur Beweissicherung auf (§ 18a FinVermV). Möchtest du das nicht, beraten und vermitteln wir zu Finanzanlagen nur im persönlichen Gespräch und halten den Inhalt schriftlich fest.</li>
          <li><strong>Beschwerden:</strong> Beschwerden zu Finanzanlagen kannst du jederzeit an uns richten, an die Anschrift oder E-Mail-Adresse unter Punkt 1. Wir bestätigen den Eingang und antworten dir unverzüglich.</li>
        </ul>

        <h2>11. Immobiliardarlehen (§ 34i GewO): Was wir anbieten</h2>
        <p>
          Wir sind als Immobiliardarlehensvermittler mit Erlaubnis nach § 34i GewO tätig. Registernummer D-W-133-6P5U-60 und Erlaubnisbehörde stehen unter Punkt 2, die Prüfung im Register unter Punkt 3. Die folgenden Angaben gelten für Darlehen an Verbraucher, die durch ein Grundpfandrecht gesichert sind oder dem Erwerb oder Erhalt von Grundstücken und Gebäuden dienen (Immobiliar-Verbraucherdarlehen).
        </p>
        <ul>
          <li><strong>Leistung:</strong> Wir beraten dich zur Finanzierung und vermitteln dir passende Darlehensverträge. Beratung heißt: Wir sprechen dir eine persönliche Empfehlung aus.</li>
          <li><strong>Bindung:</strong> Wir sind nicht an einen oder mehrere bestimmte Darlehensgeber gebunden und nicht ausschließlich für bestimmte Darlehensgeber tätig. Wir vermitteln über Direktanbindungen zu Banken und über die Vermittlungsplattformen Europace und Starpool.</li>
          <li><strong>Auswahl und Beratungsentgelt:</strong> Unseren Empfehlungen legen wir eine ausreichende Zahl von am Markt verfügbaren Darlehensverträgen zugrunde. Für die Beratung berechnen wir dir kein Entgelt.</li>
        </ul>

        <h2>12. Immobiliardarlehen: Vergütung, Beschwerden und Merkblatt</h2>
        <ul>
          <li><strong>Vergütung von dir:</strong> Für die Vermittlung verlangen wir von dir keine Vergütung und keine weiteren Entgelte. Wollen wir ausnahmsweise eine Vergütung von dir, vereinbaren wir sie vorab schriftlich mit dir und nennen dir vorher die Höhe.</li>
          <li><strong>Provision von Dritten:</strong> Für die Vermittlung eines Darlehens erhalten wir vom Darlehensgeber eine Provision. Die Höhe steht noch nicht fest. Der tatsächliche Betrag wird zu einem späteren Zeitpunkt im ESIS-Merkblatt angegeben.</li>
          <li><strong>Beschwerden:</strong> Beschwerden zur Darlehensvermittlung kannst du jederzeit an uns richten, an die Anschrift oder E-Mail-Adresse unter Punkt 1. Wir bestätigen den Eingang und antworten dir unverzüglich.</li>
          <li><strong>Außergerichtliche Streitbeilegung:</strong> Du kannst dich außerdem an die Verbraucherschlichtungsstelle bei der Deutschen Bundesbank wenden: Deutsche Bundesbank, Schlichtungsstelle, Postfach 10 06 02, 60006 Frankfurt am Main, www.bundesbank.de/schlichtungsstelle.</li>
          <li><strong>ESIS-Merkblatt:</strong> Zu einem konkreten Darlehensangebot erhältst du rechtzeitig vor deiner Vertragserklärung das Europäische Standardisierte Merkblatt (ESIS-Merkblatt) in Textform. Es stammt vom Darlehensgeber und enthält die Bedingungen und Kosten des Darlehens sowie einen Abschnitt zu uns als Vermittler.</li>
        </ul>

        <p className={styles.back}>
          <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutzerklärung</a>
        </p>
      </main>
    </div>
  );
}
