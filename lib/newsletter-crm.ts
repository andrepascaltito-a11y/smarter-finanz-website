// Newsletter (VORBEREITUNG): Einwilligung, Double-Opt-in und Sperre im EspoCRM, am Kontakt (Entity Contact).
// Bewusst NICHT am Lead: die Loeschregel fuer Website-Leads (n8n, taeglich 03:45) leert Leads nach
// 12 Monaten und wuerde Einwilligung und Sperrvermerk mit loeschen. Kontakte sind davon nicht betroffen.
//
// Drei getrennte Staende (Ritas Check vom 14.10.2026, M3):
//   1. OFFENE ANFRAGE (noch unbestaetigt): cMailAnfrageZeitpunkt, cMailAnfrageText, cMailAnfrageSegment,
//      cMailDoiGesendet. Eine neue Anmeldung schreibt NUR hierhin.
//   2. BESTAETIGTER STAND: cMailEinwilligung, cMailEinwilligungZeitpunkt/-Quelle/-Text, cMailSegment,
//      cDoiBestaetigt. Wird erst durch den Bestaetigungsklick aus der offenen Anfrage kopiert.
//   3. SPERRE: cMailSperre, cMailSperreZeitpunkt. Wird NUR durch eine Bestaetigung aufgehoben, nie durch
//      eine blosse Anmeldung (sonst koennte ein Dritter einen Sperrvermerk loeschen).
// Jedes Ereignis wird zusaetzlich als Notiz am Kontakt angehaengt (Verlauf, nie ersetzen).
// Kontaktlisten je Segment: ESPOCRM_NEWSLETTER_LISTE_GEWERBE / ESPOCRM_NEWSLETTER_LISTE_PRIVAT.
// Versandfilter spaeter: in Segment-Liste UND cMailEinwilligung UND cDoiBestaetigt UND NICHT cMailSperre.
// Keine E-Mail-Adressen in Logs, nur Kontakt-IDs.

import { adressHash, type Segment, type TokenDaten } from "./newsletter";

// Andre (Admin) im Produktions-EspoCRM, wie in lib/espocrm.ts.
const ZUGEWIESEN_AN = "6a4526fc06043f992";
const DOI_MIN_ABSTAND_MS = 24 * 60 * 60 * 1000;

const label = (s: Segment) => (s === "gewerbe" ? "Gewerbe" : "Privat");

function verbindung(): { base: string; headers: Record<string, string> } | null {
  const base = process.env.ESPOCRM_API_URL?.replace(/\/$/, "");
  const key = process.env.ESPOCRM_API_KEY;
  if (!base || !key) return null;
  return { base, headers: { "Content-Type": "application/json", "X-Api-Key": key } };
}

// EspoCRM-Datetime verlangt "Y-m-d H:i:s" (UTC), ISO 8601 wird mit 400 abgelehnt.
export function espoDatetime(d = new Date()): string {
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");
}
const aus = (s: string) => new Date(s.replace(" ", "T") + "Z").getTime();

function listenId(segment: Segment): string | null {
  const v = segment === "gewerbe" ? process.env.ESPOCRM_NEWSLETTER_LISTE_GEWERBE : process.env.ESPOCRM_NEWSLETTER_LISTE_PRIVAT;
  return v && v.trim() ? v.trim() : null;
}

async function fehler(res: Response, was: string): Promise<Error> {
  const text = await res.text().catch(() => "");
  return new Error(`EspoCRM ${was} antwortete mit ${res.status}: ${text.slice(0, 200)}`);
}

interface Kontakt {
  id: string;
  emailAddress?: string | null;
  cMailEinwilligung?: boolean;
  cMailEinwilligungZeitpunkt?: string | null;
  cMailEinwilligungText?: string | null;
  cMailSegment?: string | null;
  cDoiBestaetigt?: string | null;
  cMailSperre?: boolean;
  cMailAnfrageZeitpunkt?: string | null;
  cMailAnfrageText?: string | null;
  cMailAnfrageSegment?: string | null;
  cMailDoiGesendet?: string | null;
}
type Verb = { base: string; headers: Record<string, string> };

async function kontaktePerEmail(v: Verb, email: string): Promise<Kontakt[]> {
  const params = new URLSearchParams({
    maxSize: "10",
    "where[0][type]": "equals",
    "where[0][attribute]": "emailAddress",
    "where[0][value]": email,
  });
  const res = await fetch(`${v.base}/api/v1/Contact?${params.toString()}`, { headers: v.headers });
  if (!res.ok) throw await fehler(res, "Contact-Suche");
  return ((await res.json()) as { list?: Kontakt[] }).list ?? [];
}

async function kontaktHolen(v: Verb, id: string): Promise<Kontakt | null> {
  const res = await fetch(`${v.base}/api/v1/Contact/${encodeURIComponent(id)}`, { headers: v.headers });
  if (res.status === 404) return null;
  if (!res.ok) throw await fehler(res, "Contact lesen");
  return (await res.json()) as Kontakt;
}

async function kontaktAendern(v: Verb, id: string, body: Record<string, unknown>) {
  const res = await fetch(`${v.base}/api/v1/Contact/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: v.headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await fehler(res, "Contact aendern");
}

// Verlauf als Notiz am Kontakt. Ein Fehler hier darf den Ablauf nicht stoppen.
async function ereignis(v: Verb, id: string, text: string) {
  try {
    const res = await fetch(`${v.base}/api/v1/Note`, {
      method: "POST",
      headers: v.headers,
      body: JSON.stringify({ type: "Post", parentType: "Contact", parentId: id, post: `Newsletter: ${text} (${espoDatetime()} UTC)` }),
    });
    if (!res.ok) console.warn(`[newsletter] Verlaufsnotiz fuer Kontakt ${id} nicht gespeichert (${res.status}).`);
  } catch {
    console.warn(`[newsletter] Verlaufsnotiz fuer Kontakt ${id} nicht gespeichert.`);
  }
}

export type AnmeldungStatus =
  | "neu" // offene Anfrage geschrieben, DOI-Mail ist zu senden
  | "bereitsBestaetigt" // Adresse ist schon bestaetigt und nicht gesperrt, nichts zu senden
  | "kuerzlichGesendet"; // gleiche offene Anfrage, DOI-Mail ging vor weniger als 24 Stunden raus

export interface AnmeldungErgebnis {
  id: string;
  status: AnmeldungStatus;
  anfrageZeit: Date;
}

// Schreibt die Einwilligung als OFFENE Anfrage. Bestaetigter Stand und Sperre bleiben unberuehrt.
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
  const seg = label(p.segment);
  const anfrage = {
    cMailAnfrageZeitpunkt: espoDatetime(p.zeitpunkt),
    cMailAnfrageText: p.textVersion,
    cMailAnfrageSegment: seg,
    cMailDoiGesendet: null as string | null,
  };

  const treffer = await kontaktePerEmail(v, email);
  if (treffer.length > 1) console.warn(`[newsletter] ${treffer.length} Kontakte mit derselben Adresse, nutze ${treffer[0].id}.`);
  const k = treffer[0];
  if (k) {
    if (k.cMailEinwilligung && k.cDoiBestaetigt && !k.cMailSperre && k.cMailSegment === seg && !k.cMailAnfrageZeitpunkt) {
      return { id: k.id, status: "bereitsBestaetigt", anfrageZeit: p.zeitpunkt };
    }
    if (
      k.cMailAnfrageZeitpunkt && k.cMailAnfrageSegment === seg && k.cMailAnfrageText === p.textVersion &&
      k.cMailDoiGesendet && Date.now() - aus(k.cMailDoiGesendet) < DOI_MIN_ABSTAND_MS
    ) {
      return { id: k.id, status: "kuerzlichGesendet", anfrageZeit: new Date(aus(k.cMailAnfrageZeitpunkt)) };
    }
    await kontaktAendern(v, k.id, { ...anfrage, ...(p.accountId ? { accountId: p.accountId } : {}) });
    await ereignis(v, k.id, `neue Anmeldung angefragt (Segment ${seg}, Textversion ${p.textVersion}), Bestaetigung steht aus`);
    return { id: k.id, status: "neu", anfrageZeit: p.zeitpunkt };
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
      ...anfrage,
      cMailEinwilligung: false,
      cMailSperre: false,
      cNurNewsletter: true, // Kontakt existiert nur fuer den Newsletter (Loeschroutine fuer Unbestaetigte, Rita M1)
    }),
  });
  if (!res.ok) throw await fehler(res, "Contact anlegen");
  const id = ((await res.json()) as { id: string }).id;
  await ereignis(v, id, `Anmeldung angefragt (Segment ${seg}, Textversion ${p.textVersion}), Bestaetigung steht aus`);
  return { id, status: "neu", anfrageZeit: p.zeitpunkt };
}

// Versandprotokoll der Double-Opt-in-Mail (Rita M3 Nr. 2).
export async function doiProtokollieren(contactId: string, gesendet: boolean): Promise<void> {
  const v = verbindung();
  if (!v) return;
  if (gesendet) await kontaktAendern(v, contactId, { cMailDoiGesendet: espoDatetime() });
  await ereignis(v, contactId, gesendet ? "Bestaetigungsmail (Double-Opt-in) versendet" : "Bestaetigungsmail NICHT versendet (SMTP fehlt oder Fehler)");
}

export type SchrittErgebnis = "ok" | "bereits" | "ungueltig";

async function listeVerknuepfen(v: Verb, id: string, segment: Segment) {
  const liste = listenId(segment);
  if (!liste) {
    console.warn("[newsletter] Keine Kontaktliste konfiguriert, Kontakt nicht in eine Liste aufgenommen.");
    return;
  }
  const res = await fetch(`${v.base}/api/v1/Contact/${encodeURIComponent(id)}/targetLists`, {
    method: "POST",
    headers: v.headers,
    body: JSON.stringify({ id: liste }),
  });
  if (!res.ok) throw await fehler(res, "Kontaktliste verknuepfen");
}

async function listeLoesen(v: Verb, id: string, segment: Segment) {
  const liste = listenId(segment);
  if (!liste) return;
  const res = await fetch(`${v.base}/api/v1/Contact/${encodeURIComponent(id)}/targetLists`, {
    method: "DELETE",
    headers: v.headers,
    body: JSON.stringify({ id: liste }),
  });
  if (!res.ok && res.status !== 404) throw await fehler(res, "Kontaktliste loesen");
}

const SEGMENTE: Segment[] = ["gewerbe", "privat"];

// Double-Opt-in: Bestaetigung nur fuer die OFFENE Anfrage, auf die der Link zeigt (Zeit und Segment muessen
// passen). Kopiert erst jetzt in den bestaetigten Stand und hebt dabei eine Sperre auf.
export async function kontaktBestaetigen(t: TokenDaten): Promise<SchrittErgebnis> {
  const v = verbindung();
  if (!v) return "ungueltig";
  const k = await kontaktHolen(v, t.c);
  if (!k || !k.emailAddress || adressHash(k.emailAddress) !== t.h) return "ungueltig";
  const tokenZeit = espoDatetime(new Date(t.t));

  if (!k.cMailAnfrageZeitpunkt) {
    // Keine offene Anfrage: schon bestaetigt (derselbe Link nochmal) oder Link veraltet.
    return k.cMailEinwilligung && k.cDoiBestaetigt && !k.cMailSperre && k.cMailEinwilligungZeitpunkt === tokenZeit ? "bereits" : "ungueltig";
  }
  if (k.cMailAnfrageZeitpunkt !== tokenZeit || k.cMailAnfrageSegment !== label(t.s)) return "ungueltig";

  const alt = SEGMENTE.find((s) => label(s) === k.cMailSegment);
  await kontaktAendern(v, t.c, {
    cMailEinwilligung: true,
    cMailEinwilligungZeitpunkt: k.cMailAnfrageZeitpunkt,
    cMailEinwilligungQuelle: "Formular",
    cMailEinwilligungText: k.cMailAnfrageText ?? null,
    cMailSegment: k.cMailAnfrageSegment,
    cDoiBestaetigt: espoDatetime(),
    cMailSperre: false,
    cMailSperreZeitpunkt: null,
    cMailAnfrageZeitpunkt: null,
    cMailAnfrageText: null,
    cMailAnfrageSegment: null,
  });
  if (alt && alt !== t.s) await listeLoesen(v, t.c, alt); // ein Kontakt, ein Segment zugleich
  await listeVerknuepfen(v, t.c, t.s);
  await ereignis(v, t.c, `Adresse bestaetigt (Segment ${label(t.s)}, Textversion ${k.cMailAnfrageText ?? "?"}, Anfrage vom ${k.cMailAnfrageZeitpunkt}), Sperre aufgehoben`);
  return "ok";
}

// Abmeldung: Sperrvermerk an ALLEN Kontakten mit dieser Adresse, offene Anfrage verwerfen, aus beiden Listen
// nehmen. Nachweisfelder des bestaetigten Stands bleiben erhalten. Wirkt sofort, ohne Rueckfrage.
export async function kontaktSperren(t: TokenDaten): Promise<SchrittErgebnis> {
  const v = verbindung();
  if (!v) return "ungueltig";
  const k = await kontaktHolen(v, t.c);
  if (!k || !k.emailAddress || adressHash(k.emailAddress) !== t.h) return "ungueltig";
  const alle = new Map<string, Kontakt>([[k.id, k]]);
  for (const d of await kontaktePerEmail(v, k.emailAddress.toLowerCase())) alle.set(d.id, d);

  let geaendert = 0;
  for (const c of alle.values()) {
    if (c.cMailSperre && !c.cMailAnfrageZeitpunkt) continue;
    await kontaktAendern(v, c.id, {
      cMailSperre: true,
      cMailSperreZeitpunkt: espoDatetime(),
      cMailEinwilligung: false,
      cMailAnfrageZeitpunkt: null,
      cMailAnfrageText: null,
      cMailAnfrageSegment: null,
    });
    for (const s of SEGMENTE) await listeLoesen(v, c.id, s);
    await ereignis(v, c.id, "Abmeldung, Sperrvermerk gesetzt, aus den Kontaktlisten entfernt");
    geaendert++;
  }
  return geaendert > 0 ? "ok" : "bereits";
}
