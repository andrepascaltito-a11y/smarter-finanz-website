import type { Metadata } from "next";
import { notFound } from "next/navigation";
import legal from "../../legal.module.css";
import styles from "../../blog/blog.module.css";
import BlogHeader from "../../../components/BlogHeader";
import { seitenPfad, sichtbareSeiten } from "../../../lib/seiten";

// Privatratgeber (Du-Form): eigener Bereich neben dem Blog fuer Betriebe. Entwuerfe nur ausserhalb der Produktion sichtbar.
export const metadata: Metadata = {
  title: "Ratgeber für Privatkunden | Smarter Finanz",
  description: "Kurze, sachliche Antworten zu Kfz, Hausrat, Haftpflicht und Vorsorge: was jetzt zu tun ist und was die Versicherung zahlt.",
  alternates: { canonical: "/privat/ratgeber" },
};

export default function Page() {
  const posts = sichtbareSeiten()
    .filter((x) => x.typ === "ratgeber")
    .map((x) => ({ href: seitenPfad(x), meta: x.published ? `Stand: ${x.stand}` : `Entwurf, Stand: ${x.stand}`, title: x.h1, description: x.description }));
  // In der Produktion gibt es die Uebersicht erst, wenn mindestens ein Ratgeberartikel freigegeben ist
  if (posts.length === 0) notFound();
  return (
    <div className={legal.legalPage}>
      <BlogHeader privat />
      <main>
        <h1>Ratgeber</h1>
        <p className={legal.lead}>Kurze, sachliche Antworten zu Kfz, Hausrat, Haftpflicht und Vorsorge: was du jetzt tun kannst und was die Versicherung zahlt.</p>
        <ul className={styles.list}>
          {posts.map((p) => (
            <li key={p.href} className={styles.card}>
              <a href={p.href}>
                <div className={styles.meta}>{p.meta}</div>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
