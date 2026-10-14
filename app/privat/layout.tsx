import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smarter Finanz: Finanz- und Versicherungsmakler für Privatpersonen | Versicherungsmakler Raum Weser-Leine",
  description:
    "Finanz- und Versicherungsmakler für Privatpersonen im Raum Weser-Leine, in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter: steuerliche Aspekte bei Vorsorge und Vermögensaufbau, Absicherung. Unverbindliches Erstgespräch.",
  alternates: { canonical: "/privat" },
};

export default function PrivatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
