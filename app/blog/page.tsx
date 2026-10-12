import type { Metadata } from "next";
import legal from "../legal.module.css";
import styles from "./blog.module.css";
import BlogHeader from "../../components/BlogHeader";
import { publishedPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog für Selbstständige und Kleinbetriebe | Smarter Finanz",
  description:
    "Sachliche Antworten zu Versicherungen, Steuern und Vermögen für Selbstständige und kleine Betriebe.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const posts = publishedPosts();
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
            <li key={p.slug} className={styles.card}>
              <a href={`/blog/${p.slug}`}>
                <div className={styles.meta}>{new Date(p.date).toLocaleDateString("de-DE")}</div>
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
