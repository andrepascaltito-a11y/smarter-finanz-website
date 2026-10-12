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
  // Zustimmung zur Bereitstellung der Erstinformation ueber die Website (§ 16 Abs. 2 Nr. 2 VersVermV).
  erstinfoZustimmung: boolean;
  // Server setzt diese Felder serverseitig, Client-Werte werden ignoriert.
  consentTimestamp?: string;
  consentTextVersion?: string;
  consentText?: string;
  erstinfoVersion?: string;
  erstinfoTimestamp?: string;
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
