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
          zur Information des Kunden beim ersten Geschäftskontakt. Stand: 15.10.2026.
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
            dafür kein gesondertes Honorar.
          </li>
          <li>
            Zusätzlich erhalten wir von Versicherern bzw. Maklerpools weitere Zuwendungen, zum Beispiel
            Bestandspflegevergütungen und Boni.
          </li>
          <li>
            Eine gesonderte Vergütung, die du direkt an uns zahlst, gibt es nur, wenn wir sie vorab
            ausdrücklich mit dir vereinbaren. Ohne eine solche Vereinbarung berechnen wir dir kein gesondertes Honorar.
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
          <a href="https://www.versicherungsombudsmann.de">www.versicherungsombudsmann.de</a>. Bei
          Streitigkeiten aus der Finanzanlagenvermittlung: Ombudsstelle für Investmentfonds des BVI,
          Unter den Linden 42, 10117 Berlin.
        </p>

        <h2>8. Berufshaftpflicht</h2>
        <p>
          Wir haben eine Vermögensschaden-Haftpflichtversicherung abgeschlossen (CGPA Europe Underwriting
          GmbH, Leopoldstraße 19, 80802 München, im Auftrag des Risikoträgers CGPA Europe S.A.;
          Geltungsbereich Deutschland und europaweit).
        </p>

        <p className={styles.back}>
          <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutzerklärung</a>
        </p>
      </main>
    </div>
  );
}
