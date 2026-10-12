import type { MetadataRoute } from "next";
import { publishedPosts } from "../lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.smarterfinanz.de";
  return [
    { url: `${base}/` },
    { url: `${base}/blog` },
    ...publishedPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
