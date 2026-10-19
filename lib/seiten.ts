// Orts-, Branchen-, Hub- und Autorenseiten (SEO, Vorlage vom 14.10.2026).
// Inhalte stehen in lib/seiten-inhalt.ts (Texte von Mia, Rita-geprueft). Jede Seite hat ein Freigabe-Flag wie der Blog:
//  - published: false  = Entwurf. Ist in der Produktion (Vercel, VERCEL_ENV=production) weder erreichbar noch in der
//                        Sitemap noch verlinkt. Lokal und in Vercel-Vorschau-Deployments ist sie sichtbar und mit
//                        "Entwurf" markiert und auf noindex gesetzt, damit Andre sie vor der Freigabe pruefen kann.
//  - published: true   = Freigabe durch Andre.
// Interne Links zeigen nur auf sichtbare Seiten (Rita/Mia: nur freigegebene, thematisch nahe Seiten verlinken).

import type { OrtSchluessel } from "./bildnachweise";
import { publishedPosts } from "./blog";
import { SEITEN } from "./seiten-inhalt";

export type SeitenTyp = "ort" | "branche" | "hub" | "autor" | "beitrag" | "ratgeber";

export type Abschnitt =
  | { art: "h2"; text: string }
  | { art: "p"; text: string }
  | { art: "ul"; punkte: string[] }
  | { art: "tabelle"; titel: string; kopf: string[]; zeilen: string[][] };

export type Seite = {
  typ: SeitenTyp;
  /** ort: "alfeld" (unter /orte/alfeld), branche: "handwerk-bau", beitrag: "versicherungen-kleingewerbe" (unter /blog/...), hub: "weser-und-leinebergland", autor: "ueber-andre" */
  slug: string;
  published: boolean;
  /** Komplett, inklusive "| Smarter Finanz", hoechstens 60 Zeichen */
  title: string;
  /** hoechstens 155 Zeichen */
  description: string;
  h1: string;
  /** Kurzer Name fuer Brotkrumen und Link-Texte, zum Beispiel "Alfeld" oder "Handwerk und Bau" */
  kurzname?: string;
  /** Sichtbares Stand-Datum, zum Beispiel "Oktober 2026" */
  stand: string;
  /** Hintergrundbild im Kopfband (Schluessel aus lib/bildnachweise.ts), bei zwei Orten beide */
  bilder?: OrtSchluessel[];
  /** Nur Autorenseite: Portrait neben der Vita (Datei unter public/, Alternativtext beschreibt die Person) */
  portrait?: { datei: string; alt: string };
  /** Optional: Karte (Bild) am Seitenanfang, zum Beispiel beim Format "Aktuell" (Dateien unter public/aktuell/). story ist die Hochkant-Fassung zum Speichern. */
  karte?: { datei: string; story?: string; alt: string };
  einleitung: string[];
  kurz: { frage: string; antwort: string }[];
  abschnitte: Abschnitt[];
  faq: { frage: string; antwort: string }[];
  /** pfad wie "/orte/alfeld" oder "/blog/..." ; angezeigt werden nur Ziele, die sichtbar sind */
  links: { pfad: string; text: string }[];
  quellen: string[];
  cta: { titel?: string; text: string };
};

export function seitenPfad(s: Pick<Seite, "typ" | "slug">): string {
  if (s.typ === "ort") return `/orte/${s.slug}`;
  if (s.typ === "branche") return `/branchen/${s.slug}`;
  if (s.typ === "beitrag") return `/blog/${s.slug}`;
  if (s.typ === "ratgeber") return `/privat/ratgeber/${s.slug}`; // Privatratgeber (Du-Form), eigener Bereich neben dem Blog fuer Betriebe
  return `/${s.slug}`; // Hub und Autorenseite liegen auf der ersten Ebene
}

/** In der Produktion nur freigegebene Seiten, sonst (lokal, Vorschau-Deployment) auch Entwuerfe. */
export function entwuerfeSichtbar(): boolean {
  return process.env.VERCEL_ENV !== "production";
}

export function sichtbareSeiten(): Seite[] {
  return SEITEN.filter((s) => s.published || entwuerfeSichtbar());
}

export function veroeffentlichteSeiten(): Seite[] {
  return SEITEN.filter((s) => s.published);
}

export function findeSeite(typ: SeitenTyp, slug: string): Seite | undefined {
  return sichtbareSeiten().find((s) => s.typ === typ && s.slug === slug);
}

const FESTE_PFADE = new Set(["/", "/privat", "/privat/ratgeber", "/erstinformation", "/impressum", "/datenschutz", "/blog"]);

/** Darf auf dieses Ziel verlinkt werden? Nur bestehende, sichtbare Seiten. */
export function linkErlaubt(pfad: string): boolean {
  const p = pfad.replace(/\/$/, "") || "/";
  if (FESTE_PFADE.has(p) || p.startsWith("/#")) return true;
  if (p.startsWith("/blog/") && publishedPosts().some((b) => `/blog/${b.slug}` === p)) return true;
  return sichtbareSeiten().some((s) => seitenPfad(s) === p);
}

export function seitenName(pfad: string): string | undefined {
  return sichtbareSeiten().find((s) => seitenPfad(s) === pfad)?.h1;
}
