import type { Metadata } from "next";
import { notFound } from "next/navigation";
import legal from "../../legal.module.css";
import styles from "../blog.module.css";
import BlogHeader from "../../../components/BlogHeader";
import { SeitenVorlage, seitenMetadata } from "../../../components/SeitenVorlage";
import { getPost, publishedPosts } from "../../../lib/blog";
import { findeSeite, sichtbareSeiten } from "../../../lib/seiten";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...publishedPosts().map((p) => ({ slug: p.slug })),
    // Beitraege aus lib/seiten-inhalt.ts (typ: beitrag), Entwuerfe nur ausserhalb der Produktion
    ...sichtbareSeiten().filter((x) => x.typ === "beitrag").map((x) => ({ slug: x.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seite = findeSeite("beitrag", slug);
  if (seite) return seitenMetadata(seite);
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Smarter Finanz`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, locale: "de_DE" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const seite = findeSeite("beitrag", slug);
  if (seite) return <SeitenVorlage seite={seite} />;
  const post = getPost(slug);
  if (!post) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Smarter Finanz" },
    publisher: { "@type": "Organization", name: "Smarter Finanz" },
  };
  return (
    <div className={legal.legalPage}>
      <BlogHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <div className={styles.meta}>{new Date(post.date).toLocaleDateString("de-DE")}</div>
        <h1>{post.title}</h1>
        {post.blocks.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i}>{b.text}</h2>
          ) : b.type === "ul" ? (
            <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          ) : (
            <p key={i}>{b.text}</p>
          )
        )}
        <div className={styles.cta}>
          <strong>Gewerbe-Check</strong>
          <p>Wir schauen gemeinsam auf deinen Betrieb, unverbindlich.</p>
          <a href="/#anfrage">Jetzt anfragen</a>
        </div>
      </main>
    </div>
  );
}
