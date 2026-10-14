import type { MetadataRoute } from "next";

// Auf der bisherigen Live-Version fehlten robots.txt und sitemap.xml (beide lieferten die 404-Seite).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://www.smarterfinanz.de/sitemap.xml",
  };
}
