import type { MetadataRoute } from "next";
import { publishedPosts } from "../lib/blog";
import { seitenPfad, veroeffentlichteSeiten } from "../lib/seiten";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.smarterfinanz.de";
  return [
    { url: `${base}/` },
    { url: `${base}/privat` },
    { url: `${base}/erstinformation` },
    { url: `${base}/blog` },
    ...(veroeffentlichteSeiten().some((s) => s.typ === "ratgeber") ? [{ url: `${base}/privat/ratgeber` }] : []),
    ...publishedPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
    // Orts-, Branchen-, Hub- und Autorenseiten: nur freigegebene (published: true)
    ...veroeffentlichteSeiten().map((s) => ({ url: `${base}${seitenPfad(s)}` })),
  ];
}
