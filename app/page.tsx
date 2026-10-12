import type { Metadata } from "next";
import { KontaktFormular } from "@/components/KontaktFormular";
import { publishedPosts } from "@/lib/blog";
import legal from "./legal.module.css";
import BlogHeader from "@/components/BlogHeader";
import styles from "./gewerbe-home.module.css";

export const metadata: Metadata = {
  title: "Gewerbeversicherung & Beratung für Unternehmen | Smarter Finanz",
  description:
    "Betriebshaftpflicht, Inhalt, Cyber, Flotte, D&O, bAV und mehr: Versicherungs- und Finanzberatung für Selbstständige und Unternehmen im Raum Hannover.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Gewerbeversicherung & Beratung für Unternehmen | Smarter Finanz",
    description:
      "Absicherung und Vorsorge für Selbstständige und Betriebe, als Versicherungsmakler im Raum Hannover.",
    url: "https://www.smarterfinanz.de/",
  },
};

const THEMEN = [
  { t: "Betriebs- und Berufshaftpflicht", d: "Schäden bei Kunden und Dritten, auch Vermögensschäden. Wir vergleichen die Bedingungen, nicht nur den Preis." },
  { t: "Geschäftsinhalt & Betriebsunterbrechung", d: "Einrichtung, Werkzeug, Waren und Technik. Dazu der Ertragsausfall, der nach einem Schaden oft das größere Problem ist." },
  { t: "Cyber-Versicherung", d: "Absicherung gegen Datenverlust, Erpressung und Betriebsstillstand durch IT-Angriffe." },
  { t: "Unternehmens- und Multirisk-Pakete", d: "Mehrere Risiken in einem Konzept, abgestimmt auf die typischen Lücken deiner Branche." },
  { t: "Flotte, Kfz & Transport", d: "Firmenfahrzeuge, Fuhrpark, Transport- und Elektronikversicherung." },
  { t: "Gebäude & Mietausfall", d: "Geschäftsgebäude und Immobilien im Betriebsvermögen." },
  { t: "D&O & Geschäftsführerhaftung", d: "Persönliche Haftung von Geschäftsführern und Organen." },
  { t: "Kaution & Bürgschaften", d: "Mietkaution und Avale statt gebundenem Kapital." },
  { t: "Rechtsschutz für Unternehmen", d: "Kosten bei Streit mit Kunden, Lieferanten oder Behörden." },
  { t: "Betriebliche Altersvorsorge & Krankenversicherung", d: "Mitarbeiter binden und die Vergütung um Vorsorgebausteine ergänzen. Steuerliche und arbeitsrechtliche Fragen klärt dein Steuerberater bzw. Rechtsanwalt." },
  { t: "Absicherung des Inhabers", d: "Berufsunfähigkeit, Krankentagegeld und Vorsorge für Selbstständige." },
  { t: "Steuerliche Aspekte bei Vorsorge und Investitionen", d: "Wir zeigen dir, wo steuerliche Hebel bei Absicherung und Vorsorge eine Rolle spielen können. Die steuerliche Beurteilung und Umsetzung übernimmt dein Steuerberater." },
];

export default function Page() {
  const posts = publishedPosts();
  return (
    <>
      <div className={legal.legalPage}><BlogHeader onHome /></div>
      <section className={styles.hero}>
        <div className="wrap">
          <div className="audience-switch" role="group" aria-label="Für wen suchst du Beratung?"><a href="/" className="active" aria-current="page">Unternehmen &amp; Selbstständige</a><a href="/privat">Privatperson</a></div>
          <div><span className="eyebrow on-dark">Für Selbstständige &amp; Unternehmen</span></div>
          <h1>Gewerbeversicherung und Finanzberatung für Unternehmen im Raum Hannover</h1>
          <p>
            Ein Ansprechpartner für Absicherung und Vorsorge deines Betriebs. Als
            Versicherungsmakler vergleichen wir mehrere Gesellschaften und unterstützen dich bei der
            Schadenmeldung und -abwicklung.
          </p>
          <div className={styles.cta}>
            <a href="#anfrage" className="btn btn-gold">Gewerbe-Gespräch anfragen<small>Unverbindlich</small></a>
            <a href="/privat" className="btn btn-ghost">Du suchst Beratung als Privatperson?<small>Zur Privatkunden-Seite</small></a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <span className="eyebrow">Leistungen</span>
          <h2>Wofür Unternehmen uns ansprechen</h2>
          <div className={styles.grid}>
            {THEMEN.map((x) => (
              <div key={x.t} className={styles.tile}>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            ))}
          </div>
          <p className={styles.note}>Allgemeine Informationen. Welche Absicherung zu deinem Betrieb passt, klären wir im Gespräch. Steuerliche Fragen prüft und setzt dein Steuerberater um.</p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <span className="eyebrow on-dark">Makler statt Vertreter</span>
          <h2>Warum ein Makler für dein Unternehmen sinnvoll ist</h2>
          <p>
            Ein Versicherungsmakler arbeitet nicht für einen einzelnen Versicherer, sondern vergleicht
            für dich. Du bekommst einen Vergleich über mehrere Anbieter, Unterstützung bei der Schadenmeldung
            und einen persönlichen Ansprechpartner statt einer anonymen Hotline.
          </p>
          <ol className={styles.steps}>
            <li><strong>Kennenlernen.</strong> Wir sprechen über deinen Betrieb, deine Risiken und deine Ziele.</li>
            <li><strong>Bestandscheck.</strong> Wir prüfen, was du schon hast, und wo Lücken oder doppelte Kosten sind.</li>
            <li><strong>Vorschlag.</strong> Du bekommst einen nachvollziehbaren Vergleich und entscheidest in Ruhe.</li>
          </ol>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" style={{ background: "var(--cream)" }}>
          <div className="wrap">
            <span className="eyebrow">Wissen</span>
            <h2>Aus unserem Blog</h2>
            <div className={styles.grid}>
              {posts.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className={styles.tile} style={{ textDecoration: "none" }}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="kontakt-section" id="anfrage">
        <div className="wrap">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Unverbindliche Anfrage</span>
          <h2 style={{ textAlign: "center" }}>Sprich mit uns über deinen Betrieb</h2>
          <p className="lead" style={{ margin: "10px auto 32px", textAlign: "center" }}>
            Sag uns kurz, worum es geht, wir melden uns bei dir zurück.
          </p>
          <KontaktFormular defaultArt="gewerbe" />
        </div>
      </section>

      <footer className={styles.foot}>
        <div className="wrap">
          <p className={styles.vg}>Hinweis: Wir arbeiten als Versicherungsmakler (Erlaubnis nach § 34d Abs. 1 GewO, Reg.-Nr. D-JOOT-NRHZP-02). Unsere Vergütung erfolgt in der Regel über Courtagen der Versicherer, die in der Prämie enthalten sind. Eine zusätzliche Vergütung (z. B. Servicepauschale) gilt nur, wenn sie vorab vereinbart wird. Details in der Erstinformation.</p>
          <span>© Smarter Finanz</span>
          <nav>
            <a href="/privat">Privatkunden</a>
            <a href="/blog">Blog</a>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutzerklärung</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
