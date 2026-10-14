// Build-Schutz (Rita, 14.10.2026): Ist der Newsletter in der Datenschutzerklaerung sichtbar geschaltet
// (NEXT_PUBLIC_NEWSLETTER_ENABLED=true), darf in app/datenschutz/page.tsx keine offene [PRUEFEN]-Stelle
// mehr stehen. Sonst wuerde der Platzhalter woertlich auf der Live-Seite erscheinen. Der Build bricht ab.
import { readFileSync } from "node:fs";

if (process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === "true") {
  const quelle = readFileSync(new URL("../app/datenschutz/page.tsx", import.meta.url), "utf-8");
  const treffer = quelle.match(/\[PR(Ü|UE)FEN/g);
  if (treffer) {
    console.error(
      `\nBUILD ABGEBROCHEN: app/datenschutz/page.tsx enthaelt noch ${treffer.length} offene [PRUEFEN]-Stelle(n), ` +
        "der Newsletter ist aber eingeschaltet (NEXT_PUBLIC_NEWSLETTER_ENABLED=true).\n" +
        "Fakten belegen und die Marker entfernen (Vault: 03-Marketing/Newsletter-SmarterFinanz-Vorbereitung.md).\n",
    );
    process.exit(1);
  }
}
