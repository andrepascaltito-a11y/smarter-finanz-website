import type { Metadata } from "next";

import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Smarter Finanz",
  description:
    "Finanz- und Versicherungsmakler im Raum Weser-Leine.",
  url: "https://www.smarterfinanz.de/",
  telephone: "+49 170 8784889",
  email: "a.tito@smarterfinanz.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Glenetalstr. 101A",
    postalCode: "31061",
    addressLocality: "Alfeld",
    addressCountry: "DE",
  },
  areaServed: [
    "Raum Weser-Leine",
    { "@type": "City", name: "Alfeld (Leine)" },
    { "@type": "City", name: "Hildesheim" },
    { "@type": "City", name: "Hannover" },
    { "@type": "City", name: "Holzminden" },
    { "@type": "City", name: "Höxter" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smarterfinanz.de"),
  title: "Smarter Finanz – Finanzberatung auf Augenhöhe | Versicherungsmakler Raum Weser-Leine",
  description:
    "Smarter Finanz: Finanz- und Versicherungsmakler im Raum Weser-Leine, in und um Alfeld, Hildesheim, Hannover, Holzminden und Höxter. Steuerliche Aspekte bei Vorsorge und Vermögensaufbau, Versicherungen optimieren, transparent und auf Augenhöhe. Unverbindliches Erstgespräch.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Smarter Finanz – Finanzberatung auf Augenhöhe",
    description:
      "Als Versicherungsmakler nicht an einen Versicherer gebunden: Vermögensaufbau, Vorsorge und Absicherung. Unverbindliches Erstgespräch.",
    url: "https://www.smarterfinanz.de/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600;700&family=Jost:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
