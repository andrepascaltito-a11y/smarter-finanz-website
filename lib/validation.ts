// Validierungs-Helfer, geteilt zwischen Client (UI-Feedback) und Server (/api/lead).

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  const v = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s/().\-–]/g, "");
}

export function isValidGermanPhone(value: string): boolean {
  const n = normalizePhone(value);
  if (/^\+49\d{6,13}$/.test(n)) return true;
  if (/^0049\d{6,13}$/.test(n)) return true;
  if (/^0\d{6,13}$/.test(n)) return true;
  return false;
}

// Wandelt eine validierte deutsche Telefonnummer (0…, 0049… oder +49…) ins
// E.164-Format um (+49…), das EspoCRMs PhoneNumber-Feld verlangt. Ohne diese
// Umwandlung lehnt EspoCRM die Anfrage mit einem Validierungsfehler ab, den
// die Website nicht anzeigt (nur intern geloggt), siehe die FairKV-Website
// am 2026-09-23 fuer den Vorfall, der das aufgedeckt hat.
export function toE164Phone(value: string): string {
  let digits = normalizePhone(value).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("0049")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "49" + digits.slice(1);
  return `+${digits}`;
}
