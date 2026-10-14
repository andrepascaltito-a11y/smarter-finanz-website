// Newsletter (VORBEREITUNG): Einwilligung, Double-Opt-in und Sperre im EspoCRM, am Kontakt (Entity Contact).
// Bewusst NICHT am Lead: die Loeschregel fuer Website-Leads (n8n, taeglich 03:45) leert Leads nach
// 12 Monaten und wuerde Einwilligung und Sperrvermerk mit loeschen. Kontakte sind davon nicht betroffen.
//
// CRM-Felder (Ritas Entwurf vom 01.10.2026, siehe fairkv-crm entityDefs/Contact.json):
//   cMailEinwilligung (bool), cMailEinwilligungZeitpunkt (datetime), cMailEinwilligungQuelle (enum),
//   cMailEinwilligungText (varchar, Textversion), cMailSegment (enum), cDoiBestaetigt (datetime),
//   cMailSperre (bool), cMailSperreZeitpunkt (datetime).
// Kontaktlisten je Segment: IDs per ESPOCRM_NEWSLETTER_LISTE_GEWERBE / ESPOCRM_NEWSLETTER_LISTE_PRIVAT.
// Versandfilter fuer Ausgaben spaeter: Mitglied der Segment-Liste UND cDoiBestaetigt gesetzt UND NICHT cMailSperre.

import type { Segment, TokenDaten } from "./newsletter";

// Andre (Admin) im Produktions-EspoCRM, wie in lib/espocrm.ts.
const ZUGEWIESEN_AN = "6a4526fc06043f992";

function verbindung(): { base: string; headers: Record<string, string> } | null {
  const base = process.env.ESPOCRM_API_URL?.replace(/\/$/, "");
  const key = process.env.ESPOCRM_API_KEY;
  if (!base || !key) return null;
  return { base, headers: { "Content-Type": "application/json", "X-Api-Key": key } };
}

// EspoCRM-Datetime verlangt "Y-m-d H:i:s" (UTC), ISO 8601 wird mit 400 abgelehnt.
function espoDatetime(d = new Date()): string {
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");
}

function listenId(segment: Segment): string | null {
  const v = segment === "gewerbe" ? process.env.ESPOCRM_NEWSLETTER_LISTE_GEWERBE : process.env.ESPOCRM_NEWSLETTER_LISTE_PRIVAT;
  return v && v.trim() ? v.trim() : null;
}

async function fehler(res: Response, was: string): Promise<Error> {
  const text = await res.text().catch(() => "");
  return new Error(`EspoCRM ${was} antwortete mit ${res.status}: ${text.slice(0, 300)}`);
}

interface Kontakt {
  id: string;
  emailAddress?: string | null;
  cMailSperre?: boolean;
  cDoiBestaetigt?: string | null;
  cMailSegment?: string | null;
}

async function kontaktPerEmail(base: string, headers: Record<string, string>, email: string): Promise<Kontakt | null> {
  const params = new URLSearchParams({
    maxSize: "2",
    select: "id,emailAddress,cMailSperre,cDoiBestaetigt,cMailSegment",
    "where[0][type]": "equals",
    "where[0][attribute]": "emailAddress",
    "where[0][value]": email,
  });
  const res = await fetch(`${base}/api/v1/Contact?${params.toString()}`, { headers });
  if (!res.ok) throw await fehler(res, "Contact-Suche");
  const data = (await res.json()) as { list?: Kontakt[] };
  return data.list && data.list.length > 0 ? data.list[0] : null;
}

async function kontaktHolen(base: string, headers: Record<string, string>, id: string): Promise<Kontakt | null> {
  const res = await fetch(`${base}/api/v1/Contact/${encodeURIComponent(id)}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw await fehler(res, "Contact lesen");
  return (await res.json()) as Kontakt;
}

async function kontaktAendern(base: string, headers: Record<string, string>, id: string, body: Record<string, unknown>) {
  const res = await fetch(`${base}/api/v1/Contact/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await fehler(res, "Contact aendern");
}

export interface AnmeldungErgebnis {
  id: string;
  // true: Adresse ist schon bestaetigt und nicht gesperrt, keine neue Bestaetigungsmail noetig.
  bereitsBestaetigt: boolean;
}

// Legt den Kontakt an bzw. aktualisiert ihn und schreibt die Einwilligung (noch UNBESTAETIGT).
export async function kontaktAnmelden(p: {
  segment: Segment;
  vorname: string;
  nachname: string;
  email: string;
  accountId?: string;
  textVersion: string;
  zeitpunkt: Date;
}): Promise<AnmeldungErgebnis | null> {
  const v = verbindung();
  if (!v) return null;
  const email = p.email.trim().toLowerCase();
  const felder = {
    cMailEinwilligung: true,
    cMailEinwilligungZeitpunkt: espoDatetime(p.zeitpunkt),
    cMailEinwilligungQuelle: "Formular",
    cMailEinwilligungText: p.textVersion,
    cMailSegment: p.segment === "gewerbe" ? "Gewerbe" : "Privat",
  };

  const vorhanden = await kontaktPerEmail(v.base, v.headers, email);
  if (vorhanden) {
    const gleichesSegment = vorhanden.cMailSegment === felder.cMailSegment;
    if (vorhanden.cDoiBestaetigt && !vorhanden.cMailSperre && gleichesSegment) {
      return { id: vorhanden.id, bereitsBestaetigt: true };
    }
    // Neue Einwilligung (auch nach Abmeldung): Bestaetigung und Sperre zuruecksetzen, neue Bestaetigung noetig.
    await kontaktAendern(v.base, v.headers, vorhanden.id, {
      ...felder,
      cDoiBestaetigt: null,
      cMailSperre: false,
      cMailSperreZeitpunkt: null,
      ...(p.accountId ? { accountId: p.accountId } : {}),
    });
    return { id: vorhanden.id, bereitsBestaetigt: false };
  }

  const res = await fetch(`${v.base}/api/v1/Contact`, {
    method: "POST",
    headers: v.headers,
    body: JSON.stringify({
      firstName: p.vorname,
      lastName: p.nachname,
      emailAddress: email,
      assignedUserId: ZUGEWIESEN_AN,
      ...(p.accountId ? { accountId: p.accountId } : {}),
      ...felder,
      cMailSperre: false,
    }),
  });
  if (!res.ok) throw await fehler(res, "Contact anlegen");
  const data = (await res.json()) as { id: string };
  return { id: data.id, bereitsBestaetigt: false };
}

export type SchrittErgebnis = "ok" | "bereits" | "ungueltig";

async function listeVerknuepfen(base: string, headers: Record<string, string>, id: string, segment: Segment) {
  const liste = listenId(segment);
  if (!liste) {
    console.warn("[newsletter] Keine Kontaktliste konfiguriert, Kontakt nicht in eine Liste aufgenommen.");
    return;
  }
  const res = await fetch(`${base}/api/v1/Contact/${encodeURIComponent(id)}/targetLists`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id: liste }),
  });
  if (!res.ok) throw await fehler(res, "Kontaktliste verknuepfen");
}

async function listeLoesen(base: string, headers: Record<string, string>, id: string, segment: Segment) {
  const liste = listenId(segment);
  if (!liste) return;
  const res = await fetch(`${base}/api/v1/Contact/${encodeURIComponent(id)}/targetLists`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id: liste }),
  });
  if (!res.ok && res.status !== 404) throw await fehler(res, "Kontaktliste loesen");
}

// Double-Opt-in: Bestaetigung nur, wenn Kontakt und Adresse zum Token passen und nicht gesperrt.
export async function kontaktBestaetigen(t: TokenDaten): Promise<SchrittErgebnis> {
  const v = verbindung();
  if (!v) return "ungueltig";
  const k = await kontaktHolen(v.base, v.headers, t.c);
  if (!k || (k.emailAddress ?? "").toLowerCase() !== t.e || k.cMailSperre) return "ungueltig";
  if (k.cDoiBestaetigt) return "bereits";
  await kontaktAendern(v.base, v.headers, t.c, { cDoiBestaetigt: espoDatetime(), cMailEinwilligung: true });
  await listeVerknuepfen(v.base, v.headers, t.c, t.s);
  return "ok";
}

// Abmeldung: Sperrvermerk setzen, aus der Liste nehmen. Wirkt sofort, ohne Rueckfrage.
export async function kontaktSperren(t: TokenDaten): Promise<SchrittErgebnis> {
  const v = verbindung();
  if (!v) return "ungueltig";
  const k = await kontaktHolen(v.base, v.headers, t.c);
  if (!k || (k.emailAddress ?? "").toLowerCase() !== t.e) return "ungueltig";
  if (k.cMailSperre) return "bereits";
  await kontaktAendern(v.base, v.headers, t.c, {
    cMailSperre: true,
    cMailSperreZeitpunkt: espoDatetime(),
    cMailEinwilligung: false,
  });
  await listeLoesen(v.base, v.headers, t.c, t.s);
  return "ok";
}
