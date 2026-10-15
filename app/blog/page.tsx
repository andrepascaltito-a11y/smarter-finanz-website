import type { Metadata } from "next";
import legal from "../legal.module.css";
import styles from "./blog.module.css";
import BlogHeader from "../../components/BlogHeader";
import { publishedPosts } from "../../lib/blog";
import { seitenPfad, veroeffentlichteSeiten } from "../../lib/seiten";

export const metadata: Metadata = {
  title: "Blog für Selbstständige und Kleinbetriebe | Smarter Finanz",
  description:
    "Sachliche Antworten zu Versicherungen, Steuern und Vermögen für Selbstständige und kleine Betriebe.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const posts = [
    ...publishedPosts().map((p) => ({ href: `/blog/${p.slug}`, meta: new Date(p.date).toLocaleDateString("de-DE"), title: p.title, description: p.description })),
    ...veroeffentlichteSeiten()
      .filter((x) => x.typ === "beitrag")
      .map((x) => ({ href: seitenPfad(x), meta: `Stand: ${x.stand}`, title: x.h1, description: x.description })),
  ];
  return (
    <div className={legal.legalPage}>
      <BlogHeader />
      <main>
        <h1>Blog</h1>
        <p className={legal.lead}>
          Sachliche Antworten zu Versicherungen, Steuern und Vermögen für Selbstständige und kleine Betriebe.
        </p>
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
        {posts.length === 0 && <p>Die ersten Artikel erscheinen in Kürze.</p>}
      </main>
    </div>
  );
}
