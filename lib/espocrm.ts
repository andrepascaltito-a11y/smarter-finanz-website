// Weiterleitung eines Formular-Eintrags ins EspoCRM. Aktiv sobald
// ESPOCRM_API_URL und ESPOCRM_API_KEY gesetzt sind, sonst No-op.
// Schlaegt nie hart fehl, Fehler werden im aufrufenden Handler geloggt.

import { toE164Phone } from "@/lib/validation";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload } from "@/lib/types";

// Andre (Admin) im Produktions-EspoCRM, dieselbe User-ID wie bei der
// FairKV-Website (lib/espocrm.ts dort, DEFAULT_ASSIGNED_USER_ID).
const DEFAULT_ASSIGNED_USER_ID = "6a4526fc06043f992";

function headersFor(apiKey: string): Record<string, string> {
  return { "Content-Type": "application/json", "X-Api-Key": apiKey };
}

async function forwardPrivatperson(
  base: string,
  headers: Record<string, string>,
  payload: PrivatpersonPayload,
): Promise<void> {
  const body = {
    firstName: payload.vorname,
    lastName: payload.nachname,
    emailAddress: payload.email,
    phoneNumber: toE164Phone(payload.telefon),
    assignedUserId: DEFAULT_ASSIGNED_USER_ID,
    description: payload.thema ? `Thema: ${payload.thema}` : null,
    // Dieselben drei Custom Fields, die auch die FairKV-Website auf dem
    // Lead-Entity befuellt (DSGVO-Nachweis, welcher Wortlaut wann eingewilligt wurde).
    consentZeitpunkt: payload.consentTimestamp,
    consentVersion: payload.consentTextVersion,
    consentText: payload.consentText,
  };
  const res = await fetch(`${base}/api/v1/Lead`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EspoCRM Lead antwortete mit ${res.status}: ${text.slice(0, 500)}`);
  }
}

// Sucht eine Firma per Namensfilter. "Eindeutig" bedeutet: genau ein Treffer,
// dieselbe Regel wie in Kais lade_firma (kai_crm.py im FairKV-OS-Vault).
// Wichtig: null bedeutet ausschliesslich "Anfrage erfolgreich, aber nicht
// genau ein Treffer". Bei einer fehlgeschlagenen Anfrage (!res.ok) wird ein
// Error geworfen, damit forwardGewerbe daraus keine Dublette anlegt.
async function findeEindeutigeFirma(
  base: string,
  headers: Record<string, string>,
  firmenname: string,
): Promise<string | null> {
  const params = new URLSearchParams({
    maxSize: "5",
    textFilter: firmenname,
    select: "id,name",
  });
  const res = await fetch(`${base}/api/v1/Account?${params.toString()}`, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EspoCRM Account-Suche antwortete mit ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = (await res.json()) as { list?: { id: string }[] };
  const treffer = data.list ?? [];
  return treffer.length === 1 ? treffer[0].id : null;
}

async function schreibeNotiz(
  base: string,
  headers: Record<string, string>,
  accountId: string,
  payload: GewerbePayload,
): Promise<void> {
  const text =
    `Website-Kontakt: ${payload.ansprechpartnerVorname} ${payload.ansprechpartnerNachname}, ` +
    `Telefon ${toE164Phone(payload.telefon)}, E-Mail ${payload.email}` +
    (payload.branche ? `, Branche: ${payload.branche}` : "") +
    ` (Einwilligung ${payload.consentTextVersion} am ${payload.consentTimestamp} erteilt)`;
  const res = await fetch(`${base}/api/v1/Note`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "Post",
      parentType: "Account",
      parentId: accountId,
      post: text,
    }),
  });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(`EspoCRM Note antwortete mit ${res.status}: ${bodyText.slice(0, 500)}`);
  }
}

async function legeNeueFirmaAn(
  base: string,
  headers: Record<string, string>,
  payload: GewerbePayload,
): Promise<string> {
  const body = {
    name: payload.firmenname,
    phoneNumber: toE164Phone(payload.telefon),
    emailAddress: payload.email,
    description: payload.branche ? `Branche: ${payload.branche}` : null,
    assignedUserId: DEFAULT_ASSIGNED_USER_ID,
  };
  const res = await fetch(`${base}/api/v1/Account`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EspoCRM Account antwortete mit ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = (await res.json()) as { id: string };
  return data.id;
}

async function forwardGewerbe(
  base: string,
  headers: Record<string, string>,
  payload: GewerbePayload,
): Promise<void> {
  const bestehendeId = await findeEindeutigeFirma(base, headers, payload.firmenname);
  const accountId = bestehendeId ?? (await legeNeueFirmaAn(base, headers, payload));
  await schreibeNotiz(base, headers, accountId, payload);
}

export async function forwardToEspoCrm(payload: LeadPayload): Promise<void> {
  const base = process.env.ESPOCRM_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.ESPOCRM_API_KEY;

  if (!base || !apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[lead] ESPOCRM_API_URL/ESPOCRM_API_KEY nicht gesetzt, CRM-Weiterleitung uebersprungen.",
      );
    }
    return;
  }

  const headers = headersFor(apiKey);
  if (payload.art === "privatperson") {
    await forwardPrivatperson(base, headers, payload);
  } else {
    await forwardGewerbe(base, headers, payload);
  }
}
