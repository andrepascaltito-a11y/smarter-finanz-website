// Einfache Konsistenzpruefung fuer toE164Phone, ohne Test-Framework
// (Konvention in diesem und im FairKV-Repo: kein Jest/Vitest).
// Aufruf: node lib/validation.check.mjs

function normalizePhone(value) {
  return value.replace(/[\s/().\-–]/g, "");
}

function toE164Phone(value) {
  let digits = normalizePhone(value).replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("0049")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "49" + digits.slice(1);
  return `+${digits}`;
}

const faelle = [
  ["01512345678", "+491512345678"],
  ["0049 151 2345678", "+491512345678"],
  ["+49 151 2345678", "+491512345678"],
  ["0151-234-5678", "+491512345678"],
];

let fehler = 0;
for (const [eingabe, erwartet] of faelle) {
  const ergebnis = toE164Phone(eingabe);
  if (ergebnis !== erwartet) {
    fehler += 1;
    console.error(`FEHLER: toE164Phone(${JSON.stringify(eingabe)}) = ${ergebnis}, erwartet ${erwartet}`);
  }
}

if (fehler === 0) {
  console.log(`Alle ${faelle.length} Faelle bestanden.`);
  process.exit(0);
} else {
  console.error(`${fehler} von ${faelle.length} Faellen fehlgeschlagen.`);
  process.exit(1);
}
