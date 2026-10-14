// Optionale Angabe im Gewerbe-Formular: wann ist die Ansprechperson am besten erreichbar.
// Gespeichert werden stabile IDs, die Anzeigetexte stehen nur hier (eine Quelle fuer Formular,
// Server-Pruefung, CRM-Notiz und Benachrichtigungsmail).

export interface Option {
  id: string;
  label: string;
}

export const ERREICHBARKEIT_TAGE: Option[] = [
  { id: "mo", label: "Montag" },
  { id: "di", label: "Dienstag" },
  { id: "mi", label: "Mittwoch" },
  { id: "do", label: "Donnerstag" },
  { id: "fr", label: "Freitag" },
];

export const ERREICHBARKEIT_ZEITEN: Option[] = [
  { id: "vormittag", label: "Vormittag (8 bis 12 Uhr)" },
  { id: "mittag", label: "Mittag (12 bis 14 Uhr)" },
  { id: "nachmittag", label: "Nachmittag (14 bis 18 Uhr)" },
  { id: "abend", label: "Früher Abend (18 bis 20 Uhr)" },
];

export const ERREICHBARKEIT_FORMEN: Option[] = [
  { id: "telefon", label: "Telefon" },
  { id: "video", label: "Videogespräch" },
  { id: "persoenlich", label: "Persönlich, nach Absprache" },
];

export const HINWEIS_MAX = 200;

export interface Erreichbarkeit {
  tage: string[];
  zeiten: string[];
  form: string | null;
  hinweis: string;
}

export const LEERE_ERREICHBARKEIT: Erreichbarkeit = { tage: [], zeiten: [], form: null, hinweis: "" };

function nurErlaubte(werte: unknown, erlaubt: Option[]): string[] {
  if (!Array.isArray(werte)) return [];
  const ids = new Set(erlaubt.map((o) => o.id));
  // Reihenfolge der Optionsliste beibehalten, Dubletten entfernen.
  return erlaubt.filter((o) => werte.includes(o.id) && ids.has(o.id)).map((o) => o.id);
}

// Server-Seite: unbekannte Werte verwerfen, Hinweis kuerzen. Gibt null zurueck, wenn nichts angegeben wurde.
export function bereinigeErreichbarkeit(raw: unknown): Erreichbarkeit | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<Erreichbarkeit>;
  const tage = nurErlaubte(r.tage, ERREICHBARKEIT_TAGE);
  const zeiten = nurErlaubte(r.zeiten, ERREICHBARKEIT_ZEITEN);
  const form = ERREICHBARKEIT_FORMEN.some((o) => o.id === r.form) ? (r.form as string) : null;
  const hinweis = typeof r.hinweis === "string" ? r.hinweis.replace(/\s+/g, " ").trim().slice(0, HINWEIS_MAX) : "";
  if (tage.length === 0 && zeiten.length === 0 && !form && !hinweis) return null;
  return { tage, zeiten, form, hinweis };
}

function labels(ids: string[], liste: Option[]): string {
  return ids.map((id) => liste.find((o) => o.id === id)?.label ?? id).join(", ");
}

// Eine Zeile fuer CRM-Notiz und Mail. Leer, wenn nichts angegeben wurde.
export function formatErreichbarkeit(e: Erreichbarkeit | null | undefined): string {
  if (!e) return "";
  const teile: string[] = [];
  if (e.tage.length) teile.push(`Tage: ${labels(e.tage, ERREICHBARKEIT_TAGE)}`);
  if (e.zeiten.length) teile.push(`Zeiten: ${labels(e.zeiten, ERREICHBARKEIT_ZEITEN)}`);
  if (e.form) teile.push(`Form: ${labels([e.form], ERREICHBARKEIT_FORMEN)}`);
  if (e.hinweis) teile.push(`Hinweis: ${e.hinweis}`);
  return teile.join("; ");
}
