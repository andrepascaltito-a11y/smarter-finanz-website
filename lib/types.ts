// Zentrale Typdefinitionen fuer das Smarter-Finanz-Kontaktformular.

export type Thema =
  | "Steueroptimierung"
  | "Versicherungsvergleich"
  | "Altersvorsorge und Investment"
  | "Finanzierung und Umschuldung"
  | "Sonstiges";

interface BasisPayload {
  email: string;
  telefon: string;
  consent: boolean;
  // Server setzt diese Felder serverseitig, Client-Werte werden ignoriert.
  consentTimestamp?: string;
  consentTextVersion?: string;
  consentText?: string;
  // Anti-Spam (serverseitig ausgewertet, nicht weitergeleitet).
  hp?: string;
  formStartedAt?: number;
}

export interface PrivatpersonPayload extends BasisPayload {
  art: "privatperson";
  vorname: string;
  nachname: string;
  thema: Thema | null;
}

export interface GewerbePayload extends BasisPayload {
  art: "gewerbe";
  firmenname: string;
  ansprechpartnerVorname: string;
  ansprechpartnerNachname: string;
  branche: string;
}

export type LeadPayload = PrivatpersonPayload | GewerbePayload;
