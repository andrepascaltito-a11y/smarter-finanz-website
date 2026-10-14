// Newsletter (VORBEREITUNG): Schalter und signierte Links (Double-Opt-in, Abmeldung) ohne Datenbank.
// Ein Token enthaelt Art, Kontakt-ID, Pruefsumme der Adresse (NICHT die Adresse selbst), Segment und
// Anfragezeit, signiert mit HMAC-SHA256. Die Anfragezeit bindet den Bestaetigungslink an genau eine offene Anfrage.
// Ohne NEWSLETTER_SECRET (mind. 32 Zeichen) oder ohne NEWSLETTER_ENABLED=true ist alles aus.
// Nur Node-Runtime (node:crypto), daher in Route Handlern und Server-Seiten nutzen.

import { createHmac, timingSafeEqual } from "node:crypto";

export type Segment = "gewerbe" | "privat";
export type TokenArt = "doi" | "abmelden";

export interface TokenDaten {
  k: TokenArt;
  c: string; // Kontakt-ID im CRM
  h: string; // Pruefsumme der E-Mail-Adresse (adressHash), keine Klartext-Adresse im Link
  s: Segment;
  t: number; // Zeitpunkt der Anfrage (ms seit 1970), bindet den DOI-Link an die offene Anfrage
}

export const DOI_GUELTIG_TAGE = 14;

function geheimnis(): string | null {
  const s = process.env.NEWSLETTER_SECRET;
  return s && s.length >= 32 ? s : null;
}

export function newsletterAktiv(): boolean {
  return process.env.NEWSLETTER_ENABLED === "true" && geheimnis() !== null;
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");

function signatur(payload: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(payload).digest();
}

export function tokenErzeugen(daten: TokenDaten): string {
  const secret = geheimnis();
  if (!secret) throw new Error("NEWSLETTER_SECRET fehlt oder ist zu kurz");
  const payload = b64(JSON.stringify(daten));
  return `${payload}.${b64(signatur(payload, secret))}`;
}

// Prueft Signatur, Art und (optional) Alter. Gibt null bei jedem Problem zurueck, ohne Details zu verraten.
export function tokenPruefen(token: string, art: TokenArt, maxAlterMs?: number): TokenDaten | null {
  const secret = geheimnis();
  if (!secret || typeof token !== "string" || token.length > 2000) return null;
  const teile = token.split(".");
  if (teile.length !== 2) return null;
  const [payload, sig] = teile;
  let gegeben: Buffer;
  try {
    gegeben = Buffer.from(sig, "base64url");
  } catch {
    return null;
  }
  const erwartet = signatur(payload, secret);
  if (gegeben.length !== erwartet.length || !timingSafeEqual(gegeben, erwartet)) return null;
  try {
    const d = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as TokenDaten;
    if (d.k !== art || !d.c || !d.h || (d.s !== "gewerbe" && d.s !== "privat") || typeof d.t !== "number") return null;
    if (maxAlterMs !== undefined && Date.now() - d.t > maxAlterMs) return null;
    return d;
  } catch {
    return null;
  }
}

// Pruefsumme der Adresse fuer Tokens: gleiche Adresse ergibt gleichen Wert, die Adresse selbst ist nicht ableitbar.
export function adressHash(email: string): string {
  const secret = geheimnis();
  if (!secret) throw new Error("NEWSLETTER_SECRET fehlt oder ist zu kurz");
  return createHmac("sha256", secret).update("adresse:" + email.trim().toLowerCase()).digest("base64url").slice(0, 22);
}

export const DOI_MAX_ALTER_MS = DOI_GUELTIG_TAGE * 24 * 60 * 60 * 1000;

export function siteBasis(): string {
  return (process.env.SITE_URL || "https://www.smarterfinanz.de").replace(/\/$/, "");
}
