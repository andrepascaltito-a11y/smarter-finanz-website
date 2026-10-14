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
  return [start, { name: kurzname(s) }];
}

export function seitenMetadata(s: Seite): Metadata {
  const pfad = seitenPfad(s);
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: pfad },
    openGraph: { type: "website", locale: "de_DE", title: s.title, description: s.description, url: `${BASIS}${pfad}` },
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
  const seite =
    s.typ === "autor"
      ? {
          "@type": "ProfilePage",
          name: s.h1,
          url: `${BASIS}${pfad}`,
          mainEntity: {
            "@type": "Person",
            name: "André Pascal Tito",
            jobTitle: "Versicherungsmakler",
            worksFor: { "@type": "InsuranceAgency", name: "Smarter Finanz", url: `${BASIS}/` },
          },
        }
      : { "@type": "WebPage", name: s.h1, description: s.description, url: `${BASIS}${pfad}` };
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
        </div>
      </header>

      <main>
        {!s.published && (
          <p className={styles.entwurf}>
            <strong>Entwurf, nicht veröffentlicht.</strong> Diese Seite ist nur lokal und in Vorschau-Deployments sichtbar, nicht in der Sitemap und
            auf noindex gesetzt. Veröffentlichung durch published: true in lib/seiten-inhalt.ts.
          </p>
        )}

        <div className={styles.einleitung}>
          {s.einleitung.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        {s.kurz.length > 0 && (
          <aside className={styles.kurz} aria-label="Kurz beantwortet">
            <p className={styles.kurzLabel}>Kurz beantwortet</p>
            {s.kurz.map((q, i) => (
              <p key={i}>
                <strong>{q.frage}</strong> {q.antwort}
              </p>
            ))}
          </aside>
        )}

        {s.abschnitte.map((a, i) => {
          if (a.art === "h2") return <h2 key={i}>{a.text}</h2>;
          if (a.art === "p") return <p key={i}>{a.text}</p>;
          if (a.art === "ul")
            return (
              <ul key={i}>
                {a.punkte.map((p, j) => (
                  <li key={j}>{p}</li>
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
                          <td key={l}>{c}</td>
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
                  <p>{f.antwort}</p>
                </details>
              ))}
            </div>
          </>
        )}

        {s.typ !== "autor" && (
          <p className={styles.pruef}>
            Inhaltlich geprüft und verantwortet von{" "}
            {hatAutorenseite ? <a href="/ueber-andre">André Pascal Tito</a> : "André Pascal Tito"}, Versicherungsmakler (Erlaubnis nach § 34d GewO,
            Register-Nr. D-JOOT-NRHZP-02). Stand: {s.stand}. Allgemeine Informationen, keine individuelle Rechts-, Steuer- oder Versicherungsberatung.
          </p>
        )}

        <div className={styles.cta}>
          <strong>{s.cta.titel}</strong>
          <p>{s.cta.text}</p>
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
                <li key={i}>{q}</li>
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
      </main>
    </div>
  );
}
