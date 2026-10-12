import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smarter Finanz – Finanzberatung für Privatpersonen | Versicherungsmakler Raum Hannover",
  description:
    "Unabhängige Finanz- und Versicherungsberatung für Privatpersonen im Raum Hannover: weniger Steuern, Vermögensaufbau, Absicherung. Kostenloses Erstgespräch.",
  alternates: { canonical: "/privat" },
};

export default function PrivatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
