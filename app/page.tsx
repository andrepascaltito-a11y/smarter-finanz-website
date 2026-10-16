import type { Metadata } from "next";
import Image from "next/image";
import { Bewertungen } from "@/components/Bewertungen";
import { ThemenRondell, type Thema } from "@/components/ThemenRondell";
import { DANKE_TEXTE } from "@/lib/danke-texte";
import { ORTSBILDER, type OrtSchluessel } from "@/lib/bildnachweise";
import { KontaktFormular } from "@/components/KontaktFormular";
import { publishedPosts } from "@/lib/blog";
import legal from "./legal.module.css";
import BlogHeader from "@/components/BlogHeader";
import styles from "./gewerbe-home.module.css";

export const metadata: Metadata = {
  title: "Gewerbeversicherung & Beratung für Unternehmen | Smarter Finanz",
  description:
    "Betriebshaftpflicht, Inhalt, Cyber, Flotte, D&O, bAV und mehr: Versicherungs- und Finanzberatung für Selbstständige und Unternehmen im Weser- und Leinebergland, in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Gewerbeversicherung & Beratung für Unternehmen | Smarter Finanz",
    description:
      "Absicherung und Vorsorge für Selbstständige und Betriebe, als Versicherungsmakler im Weser- und Leinebergland, in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter.",
    url: "https://www.smarterfinanz.de/",
  },
};

const THEMEN: Thema[] = [
  { t: "Betriebs- und Berufshaftpflicht", d: "Schäden bei Kunden und Dritten, auch Vermögensschäden. Wir vergleichen die Bedingungen, nicht nur den Preis.", icon: "haftpflicht" },
  { t: "Geschäftsinhalt & Betriebsunterbrechung", d: "Einrichtung, Werkzeug, Waren und Technik. Dazu der Ertragsausfall, der nach einem Schaden oft das größere Problem ist.", icon: "inhalt" },
  { t: "Cyber-Versicherung", d: "Absicherung gegen Datenverlust, Erpressung und Betriebsstillstand durch IT-Angriffe.", icon: "cyber" },
  { t: "Unternehmens- und Multirisk-Pakete", d: "Mehrere Risiken in einem Konzept, abgestimmt auf die typischen Lücken Ihrer Branche.", icon: "multirisk" },
  { t: "Flotte, Kfz & Transport", d: "Firmenfahrzeuge, Fuhrpark, Transport- und Elektronikversicherung.", icon: "flotte" },
  { t: "Gebäude & Mietausfall", d: "Geschäftsgebäude und Immobilien im Betriebsvermögen.", icon: "gebaeude" },
  { t: "D&O & Geschäftsführerhaftung", d: "Persönliche Haftung von Geschäftsführern und Organen.", icon: "do" },
  { t: "Kaution & Bürgschaften", d: "Mietkaution und Avale statt gebundenem Kapital.", icon: "kaution" },
  { t: "Rechtsschutz für Unternehmen", d: "Kosten bei Streit mit Kunden, Lieferanten oder Behörden.", icon: "rechtsschutz" },
  { t: "Betriebliche Altersvorsorge & Krankenversicherung", d: "Mitarbeiter binden und die Vergütung um Vorsorgebausteine ergänzen. Steuerliche und arbeitsrechtliche Fragen klärt Ihr Steuerberater bzw. Rechtsanwalt.", icon: "bav" },
  { t: "Absicherung des Inhabers", d: "Berufsunfähigkeit, Krankentagegeld und Vorsorge für Selbstständige.", icon: "inhaber" },
  { t: "Steuerliche Aspekte bei Vorsorge und Investitionen", d: "Wir zeigen Ihnen, wo steuerliche Hebel bei Absicherung und Vorsorge eine Rolle spielen können. Die steuerliche Beurteilung und Umsetzung übernimmt Ihr Steuerberater.", icon: "steuer" },
];

const SCHRITTE = [
  { t: "Kennenlernen", d: "Wir sprechen über Ihren Betrieb, Ihre Risiken und Ihre Ziele." },
  { t: "Bestandscheck", d: "Wir prüfen, was Sie schon haben, und wo Lücken oder doppelte Kosten sind." },
  { t: "Vorschlag", d: "Sie bekommen einen nachvollziehbaren Vergleich und entscheiden in Ruhe." },
];

const REGION: { key: OrtSchluessel; name: string }[] = [
  { key: "alfeld", name: "Alfeld" },
  { key: "hildesheim", name: "Hildesheim" },
  { key: "hannover", name: "Hannover" },
  { key: "holzminden", name: "Holzminden" },
  { key: "hoexter", name: "Höxter" },
];

const titelbild = ORTSBILDER.hildesheim;

// Texte des Hero. Wortlaut: Mia (Vault 03-Marketing/Content/Mia-Danke-Seite-und-Hero-2026-10-16.md, Teil B), Rita prueft,
// Andre gibt frei. "Seit etwa 2021 berät André Tito Betriebe" bleibt draußen, bis die Nachweisakte den Beginn belegt (Rita BL2, 16.10.2026).
const HERO = {
  eyebrow: "Versicherungsmakler für Betriebe aus der Region",
  lead: "Sie sollen wissen, wen Sie anrufen, wenn im Betrieb etwas passiert. Als Versicherungsmakler vergleichen wir mehrere Gesellschaften und unterstützen Sie bei der Schadenmeldung und bei der Abwicklung.",
  cta: "Gespräch mit André Tito anfragen",
  ctaKlein: "Unverbindlich, Sie nennen uns Ihre Zeiten",
  karte: {
    label: "Ihr Ansprechpartner",
    name: "André Tito",
    rolle: "Versicherungsmakler, Erlaubnis nach § 34d Abs. 1 GewO",
    punkte: ["Vergleicht für Sie mehrere Gesellschaften", "In der Regel bei Ihnen im Betrieb, auf Wunsch online"],
    fotoAlt: "André Tito, Versicherungsmakler in Alfeld",
  },
  kennzahlen: [
    { gross: "§ 34d GewO", klein: "Versicherungsmakler mit Erlaubnis der IHK Hannover, Reg.-Nr. D-JOOT-NRHZP-02" },
    { gross: "Persönlich", klein: "Ein fester Ansprechpartner statt anonymer Hotline" },
    { gross: "Leine und Weser", klein: "Betriebe in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter" },
  ],
};

// Registernummern nicht am Bindestrich umbrechen
function mitRegNr(text: string) {
  return text.split(/(D-[A-Z0-9]+(?:-[A-Z0-9]+)+)/).map((t, i) =>
    /^D-[A-Z0-9]+(?:-[A-Z0-9]+)+$/.test(t) ? <span key={i} style={{ whiteSpace: "nowrap" }}>{t}</span> : t,
  );
}

export default function Page() {
  const posts = publishedPosts();
  return (
    <>
      <div className={legal.legalPage}><BlogHeader onHome /></div>
      <section className={styles.hero}>
        <div className={styles.heroBild} aria-hidden="true">
          {/* Statische WebP-Dateien (1280, 1920, 2560 px) statt Bildoptimierer: kein Kaltstart, in jedem Browser gleich. Quelle: public/orte/hildesheim.jpg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/orte/hero-hildesheim-1920.webp"
            srcSet="/orte/hero-hildesheim-1280.webp 1280w, /orte/hero-hildesheim-1920.webp 1920w, /orte/hero-hildesheim-2560.webp 2560w"
            sizes="100vw"
            alt=""
            width={2560}
            height={1706}
            fetchPriority="high"
            decoding="async"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: titelbild.position }}
          />
        </div>
        <div className={styles.heroVeil} aria-hidden="true" />
        <div className={`wrap ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <div className="audience-switch" role="group" aria-label="Für wen suchen Sie Beratung?"><a href="/" className="active" aria-current="page">Unternehmen &amp; Selbstständige</a><a href="/privat">Privatperson</a></div>
            <div><span className="eyebrow on-dark">{HERO.eyebrow}</span></div>
            <h1>Gewerbeversicherung und Finanzberatung für Unternehmen im Weser- und Leinebergland</h1>
            <p className={styles.lead}>{HERO.lead}</p>
            <div className={styles.cta}>
              <a href="#anfrage" className="btn btn-gold">{HERO.cta}<small>{HERO.ctaKlein}</small></a>
              <a href="/privat" className="btn btn-ghost">Sie suchen Beratung als Privatperson?<small>Zur Privatkunden-Seite</small></a>
            </div>
          </div>
          <aside className={styles.ansprech} aria-label={HERO.karte.label}>
            <div className={styles.foto}>
              <Image src="/andre-tito.jpg" alt={HERO.karte.fotoAlt} width={600} height={750} sizes="(max-width: 900px) 112px, 300px" quality={80} />
            </div>
            <div className={styles.ansprechText}>
              <span className={styles.karteLabel}>{HERO.karte.label}</span>
              <strong>{HERO.karte.name}</strong>
              <span className={styles.karteRolle}>{HERO.karte.rolle}</span>
              <ul>
                {HERO.karte.punkte.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="stats" aria-label="Auf einen Blick">
        <div className="wrap">
          <div className="stats-inner">
            {HERO.kennzahlen.map((k) => (
              <div className="stat" key={k.gross}><b>{k.gross}</b><div className="line"></div><span>{mitRegNr(k.klein)}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <span className="eyebrow">Leistungen</span>
          <h2>Wofür Unternehmen uns ansprechen</h2>
          <ThemenRondell themen={THEMEN} bereich="Leistungen für Unternehmen" />
          <p className={styles.note}>Allgemeine Informationen. Welche Absicherung zu Ihrem Betrieb passt, klären wir im Gespräch. Steuerliche Fragen prüft und setzt Ihr Steuerberater um.</p>
        </div>
      </section>

      <section className={styles.band}>
        <div className={`wrap ${styles.bandGrid}`}>
          <div>
            <span className="eyebrow on-dark">Makler statt Vertreter</span>
            <h2>Warum ein Makler für Ihr Unternehmen sinnvoll ist</h2>
            <p>
              Ein Versicherungsmakler arbeitet nicht für einen einzelnen Versicherer, sondern vergleicht
              für Sie. Sie bekommen einen Vergleich über mehrere Anbieter, Unterstützung bei der Schadenmeldung
              und einen persönlichen Ansprechpartner statt einer anonymen Hotline.
            </p>
          </div>
          <ol className={styles.schritte}>
            {SCHRITTE.map((x, i) => (
              <li key={x.t}>
                <span className={styles.schrittNr} aria-hidden="true">{i + 1}</span>
                <div>
                  <strong>{x.t}</strong>
                  <p>{x.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.region} aria-labelledby="region-titel">
        <div className="wrap">
          <span className="eyebrow">Region</span>
          <h2 id="region-titel">Weser- und Leinebergland</h2>
          <p className={styles.regionText}>Für Betriebe in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter.</p>
          <ul className={styles.orteListe}>
            {REGION.map((o) => (
              <li key={o.key}>
                <Image
                  src={ORTSBILDER[o.key].datei}
                  alt=""
                  fill
                  quality={70}
                  sizes="(max-width: 900px) 58vw, 230px"
                  style={{ objectFit: "cover", objectPosition: ORTSBILDER[o.key].position }}
                />
                <span>{o.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Bewertungen zielgruppe="gewerbe" />

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
          <div className="kontakt-kopf">
            <span className="eyebrow" style={{ justifyContent: "center" }}>Unverbindliche Anfrage</span>
            <h2 style={{ textAlign: "center" }}>Sprechen Sie mit uns über Ihren Betrieb</h2>
            <p className="lead" style={{ margin: "10px auto 32px", textAlign: "center" }}>
              Sagen Sie uns kurz, worum es geht, wir melden uns bei Ihnen zurück. Wann Sie am besten erreichbar sind, können Sie unten im Formular angeben.
            </p>
          </div>
          <div className={styles.anfrageGrid}>
            <aside className={styles.anfrageSeite} aria-label={HERO.karte.label}>
              <div className={styles.apKarte}>
                <Image src="/andre-tito.jpg" alt={HERO.karte.fotoAlt} width={600} height={750} sizes="96px" quality={80} />
                <div>
                  <span className={styles.karteLabel}>{HERO.karte.label}</span>
                  <strong>{HERO.karte.name}</strong>
                  <span className={styles.karteRolle}>{HERO.karte.rolle}</span>
                </div>
              </div>
              <div className={styles.weiter}>
                <h3>{DANKE_TEXTE.gewerbe.schritteTitel}</h3>
                <ol>
                  {DANKE_TEXTE.gewerbe.schritte.map((x) => (
                    <li key={x.titel}>{x.titel}</li>
                  ))}
                </ol>
              </div>
            </aside>
            <div className={styles.anfrageForm}>
              <KontaktFormular defaultArt="gewerbe" />
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.foot}>
        <div className="wrap">
          <p className={styles.vg}>Hinweis: Wir arbeiten als Versicherungsmakler (Erlaubnis nach § 34d Abs. 1 GewO, Reg.-Nr. D-JOOT-NRHZP-02). Unsere Vergütung erfolgt in der Regel über Courtagen der Versicherer, die in der Prämie enthalten sind. Eine gesonderte Vergütung, die Sie direkt an uns zahlen, gilt nur, wenn sie vorab ausdrücklich vereinbart wird. Details in der Erstinformation.</p>
          <p className={styles.nachweis}>
            Bildnachweise (Ausschnitte, Wikimedia Commons):{" "}
            {[...REGION.map((o) => ({ ort: o.name, b: ORTSBILDER[o.key] }))].map(({ ort, b }, i) => (
              <span key={ort}>
                {i > 0 && " · "}
                {ort}: <a href={b.quelle} target="_blank" rel="noopener noreferrer">{b.motiv}</a>, Foto: {b.autor},{" "}
                <a href={b.lizenzUrl} target="_blank" rel="noopener noreferrer">{b.lizenz}</a>
              </span>
            ))}
            . Das Titelbild zeigt Hildesheim, zugeschnitten und abgedunkelt.
          </p>
          <span>© Smarter Finanz</span>
          <nav>
            <a href="/privat">Privatkunden</a>
            <a href="/blog">Blog</a>
            <a href="/impressum">Impressum</a>
            <a href="/erstinformation">Erstinformation</a>
            <a href="/datenschutz">Datenschutzerklärung</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
