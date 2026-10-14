import legal from "../app/legal.module.css";
import BlogHeader from "./BlogHeader";

// Schlichte Seite fuer die Newsletter-Schritte (Bestaetigen, Abmelden). Kein Index, keine Navigation.
export function NewsletterSeite({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className={legal.legalPage}>
      <BlogHeader />
      <main>
        <h1>{titel}</h1>
        {children}
      </main>
    </div>
  );
}
