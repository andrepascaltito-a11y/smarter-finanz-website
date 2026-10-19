// Gemeinsame Seitenvorlage fuer Orts-, Branchen-, Hub- und Autorenseiten (Aufbau: siehe Entwurf vom 14.10.2026).
// Server-Komponente, keine Skripte im Browser. FAQ ueber <details>, Bilder ueber next/image (WebP/AVIF, abgestuft).

import Image from "next/image";
import type { Metadata } from "next";

import legal from "../app/legal.module.css";
import { ORTSBILDER } from "../lib/bildnachweise";
import { linkErlaubt, seitenName, seitenPfad, type Seite } from "../lib/seiten";
import BlogHeader from "./BlogHeader";
import styles from "./seiten.module.css";

const BASIS = "https://www.smarterfinanz.de";

// Einfache Auszeichnung in Texten: **fett**, [Text](Ziel). Mit urls=true werden zusaetzlich nackte Webadressen
// zu Links (Quellenlisten). Alles andere bleibt Text, React maskiert ihn.
function Inline({ text, urls = false }: { text: string; urls?: boolean }) {
  const re = urls
    ? /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|(https?:\/\/[^\s]+)/g
    : /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;
  const teile: React.ReactNode[] = [];
  let letzte = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > letzte) teile.push(text.slice(letzte, m.index));
    if (m[1] !== undefined) teile.push(<strong key={i++}>{m[1]}</strong>);
    else if (m[2] !== undefined) teile.push(<a key={i++} href={m[3]}>{m[2]}</a>);
    else if (m[4] !== undefined) {
      const url = m[4].replace(/[.,;:)]+$/, "");
      const rest = m[4].slice(url.length);
      teile.push(<a key={i++} href={url} target="_blank" rel="noopener noreferrer">{url}</a>);
      if (rest) teile.push(rest);
    }
    letzte = m.index + m[0].length;
  }
  if (letzte < text.length) teile.push(text.slice(letzte));
  return <>{teile}</>;
}
const HUB_PFAD = "/weser-und-leinebergland";

type Krume = { name: string; pfad?: string };

function kurzname(s: Seite): string {
  return s.kurzname ?? s.h1;
}

function krumen(s: Seite): Krume[] {
  const start: Krume = { name: "Start", pfad: "/" };
  if (s.typ === "ort") {
    return [start, { name: "Weser- und Leinebergland", pfad: linkErlaubt(HUB_PFAD) ? HUB_PFAD : undefined }, { name: kurzname(s) }];
  }
  if (s.typ === "beitrag") return [start, { name: "Blog", pfad: "/blog" }, { name: kurzname(s) }];
  return [start, { name: kurzname(s) }];
}

export function seitenMetadata(s: Seite): Metadata {
  const pfad = seitenPfad(s);
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: pfad },
    openGraph: {
      type: "website", locale: "de_DE", title: s.title, description: s.description, url: `${BASIS}${pfad}`,
      ...(s.karte ? { images: [{ url: `${BASIS}${s.karte.datei}`, width: 1080, height: 1350, alt: s.karte.alt }] } : {}),
    },
    // Entwuerfe nie in die Suchmaschine
    ...(s.published ? {} : { robots: { index: false, follow: false } }),
  };
}

function strukturierteDaten(s: Seite) {
  const pfad = seitenPfad(s);
  const k = krumen(s);
  const brot = {
    "@type": "BreadcrumbList",
    itemListElement: k.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      ...(x.pfad ? { item: `${BASIS}${x.pfad === "/" ? "/" : x.pfad}` } : {}),
    })),
  };
  const verantwortlich = { "@type": "Person", name: "André Pascal Tito", jobTitle: "Versicherungsmakler" };
  const organisation = { "@type": "Organization", name: "Smarter Finanz", url: `${BASIS}/` };
  // Kein "author" mit André als Person (Rita 14.10.2026): Verfasser ist die Organisation, André prueft und verantwortet.
  const seite =
    s.typ === "autor"
      ? {
          "@type": "ProfilePage",
          name: s.h1,
          url: `${BASIS}${pfad}`,
          mainEntity: { ...verantwortlich, worksFor: { "@type": "InsuranceAgency", name: "Smarter Finanz", url: `${BASIS}/` } },
        }
      : s.typ === "beitrag"
        ? { "@type": "Article", headline: s.h1, description: s.description, url: `${BASIS}${pfad}`, author: organisation, publisher: organisation, reviewedBy: verantwortlich }
        : { "@type": "WebPage", name: s.h1, description: s.description, url: `${BASIS}${pfad}`, publisher: organisation, reviewedBy: verantwortlich };
  return { "@context": "https://schema.org", "@graph": [seite, brot] };
}

export function SeitenVorlage({ seite: s }: { seite: Seite }) {
  const k = krumen(s);
  const bilder = (s.bilder ?? []).map((key) => ({ key, b: ORTSBILDER[key] }));
  const links = s.links.filter((l) => linkErlaubt(l.pfad));
  const hatAutorenseite = s.typ !== "autor" && linkErlaubt("/ueber-andre");

  return (
    <div className={`${legal.legalPage} ${styles.seite}`}>
      <BlogHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten(s)) }} />

      <header className={styles.band}>
        {bilder.length > 0 && (
          <div className={`${styles.bandBilder} ${bilder.length > 1 ? styles.zwei : ""}`} aria-hidden="true">
            {bilder.slice(0, 2).map(({ key, b }) => (
              <div key={key} className={styles.bandBild}>
                <Image
                  src={b.datei}
                  alt=""
                  fill
                  priority
                  quality={70}
                  sizes={bilder.length > 1 ? "50vw" : "100vw"}
                  style={{ objectFit: "cover", objectPosition: b.position }}
                />
              </div>
            ))}
          </div>
        )}
        <div className={`${styles.veil} ${bilder.length > 1 ? styles.veilGleich : ""}`} aria-hidden="true" />
        <div className={styles.bandInner}>
          <nav className={styles.krumel} aria-label="Brotkrumen">
            {k.map((x, i) => (
              <span key={i}>
                {i > 0 && <span className={styles.trenner}>›</span>}
                {x.pfad && i < k.length - 1 ? <a href={x.pfad}>{x.name}</a> : x.name}
              </span>
            ))}
          </nav>
          <h1>{s.h1}</h1>
          {s.typ !== "autor" && (
            <p className={styles.stand}>
              Inhaltlich geprüft und verantwortet von {hatAutorenseite ? <a href="/ueber-andre">André Tito</a> : "André Tito"} (Versicherungsmakler, Erlaubnis nach
              § 34d Abs. 1 GewO, Registernummer D-JOOT-NRHZP-02), Stand: {s.stand}
            </p>
          )}
        </div>
      </header>

      <main>
        {!s.published && (
          <p className={styles.entwurf}>
            <strong>Entwurf, nicht veröffentlicht.</strong> Diese Seite ist nur lokal und in Vorschau-Deployments sichtbar, nicht in der Sitemap und
            auf noindex gesetzt. Veröffentlichung durch published: true in lib/seiten-inhalt.ts.
          </p>
        )}

        {s.karte && (
          <figure className={styles.karte}>
            <a href={s.karte.datei} target="_blank" rel="noopener noreferrer" aria-label="Karte in voller Größe öffnen">
              <Image src={s.karte.datei} alt={s.karte.alt} width={1080} height={1350} sizes="(max-width: 700px) 100vw, 560px" quality={85} priority />
            </a>
            <figcaption>
              Das Wichtigste auf einer Karte. Zum Speichern und Weitergeben: <a href={s.karte.datei} download>Beitragsformat</a>
              {s.karte.story ? <> oder <a href={s.karte.story} download>Story-Format</a></> : null}.
            </figcaption>
          </figure>
        )}

        {s.portrait && (
          <figure className={styles.portrait}>
            <Image src={s.portrait.datei} alt={s.portrait.alt} width={600} height={750} sizes="(max-width: 700px) 70vw, 280px" quality={80} />
          </figure>
        )}

        <div className={styles.einleitung}>
          {s.einleitung.map((t, i) => (
            <p key={i}><Inline text={t} /></p>
          ))}
        </div>

        {s.kurz.length > 0 && (
          <aside className={styles.kurz} aria-label="Kurz beantwortet">
            <p className={styles.kurzLabel}>Kurz beantwortet</p>
            {s.kurz.map((q, i) => (
              <p key={i}>
                <strong><Inline text={q.frage} /></strong> <Inline text={q.antwort} />
              </p>
            ))}
          </aside>
        )}

        {s.abschnitte.map((a, i) => {
          if (a.art === "h2") return <h2 key={i}>{a.text}</h2>;
          if (a.art === "p") return <p key={i}><Inline text={a.text} /></p>;
          if (a.art === "ul")
            return (
              <ul key={i}>
                {a.punkte.map((p, j) => (
                  <li key={j}><Inline text={p} /></li>
                ))}
              </ul>
            );
          return (
            <div key={i}>
              <p className={styles.tabellenTitel}>{a.titel}</p>
              <div className={styles.tabelle}>
                <table>
                  <thead>
                    <tr>
                      {a.kopf.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {a.zeilen.map((z, j) => (
                      <tr key={j}>
                        {z.map((c, l) => (
                          <td key={l}><Inline text={c} /></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {s.faq.length > 0 && (
          <>
            <h2>Häufige Fragen</h2>
            <div className={styles.faq}>
              {s.faq.map((f, i) => (
                <details key={i}>
                  <summary>{f.frage}</summary>
                  {f.antwort.split("\n\n").map((t, k) => (
                    <p key={k}><Inline text={t} /></p>
                  ))}
                </details>
              ))}
            </div>
          </>
        )}

        <div className={styles.cta}>
          {s.cta.titel && <strong>{s.cta.titel}</strong>}
          <p><Inline text={s.cta.text} /></p>
          <a className={styles.knopf} href="/#anfrage">
            Unverbindlich anfragen
          </a>
        </div>

        {links.length > 0 && (
          <nav className={styles.weitere} aria-label="Weitere Seiten">
            Weitere Seiten
            <ul>
              {links.map((l) => (
                <li key={l.pfad}>
                  <a href={l.pfad}>{l.text || seitenName(l.pfad) || l.pfad}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {s.quellen.length > 0 && (
          <div className={styles.quellen}>
            Quellen
            <ol>
              {s.quellen.map((q, i) => (
                <li key={i}><Inline text={q} urls /></li>
              ))}
            </ol>
          </div>
        )}

        {bilder.length > 0 && (
          <p className={styles.nachweis}>
            {bilder.map(({ key, b }, i) => (
              <span key={key}>
                {i > 0 && " "}
                Bild: {b.motiv}. Foto: {b.autor},{" "}
                <a href={b.lizenzUrl} target="_blank" rel="noopener noreferrer">
                  {b.lizenz}
                </a>
                ,{" "}
                <a href={b.quelle} target="_blank" rel="noopener noreferrer">
                  Wikimedia Commons
                </a>
                .
              </span>
            ))}
          </p>
        )}
        <footer className={styles.fuss}>
          <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutzerklärung</a> · <a href="/erstinformation">Erstinformation</a> ·{" "}
          <a href="/">Smarter Finanz</a>
        </footer>
      </main>
    </div>
  );
}
