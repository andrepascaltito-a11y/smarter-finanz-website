export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  /** false = Entwurf, wird weder gelistet noch ausgeliefert, bis André freigibt */
  published: boolean;
  blocks: Block[];
};

// Beitraege (Ratgeber) liegen seit dem 15.10.2026 in lib/seiten-inhalt.ts (typ: beitrag, Sie-Fassung, Rita-geprueft).
// Der fruehere Entwurf B1 in Du-Form wurde dorthin uebernommen. Dieses Modell bleibt fuer einfache Texte ohne FAQ und Quellen.
export const posts: Post[] = [];

export function publishedPosts(): Post[] {
  return posts.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.published);
}
