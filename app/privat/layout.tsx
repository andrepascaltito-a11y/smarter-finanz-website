import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smarter Finanz – Finanz- und Versicherungsmakler für Privatpersonen | Versicherungsmakler Raum Hannover",
  description:
    "Finanz- und Versicherungsmakler für Privatpersonen im Raum Hannover: steuerliche Aspekte bei Vorsorge und Vermögensaufbau, Absicherung. Unverbindliches Erstgespräch.",
  alternates: { canonical: "/privat" },
};

export default function PrivatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
