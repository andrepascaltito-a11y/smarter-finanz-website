import type { Metadata } from "next";

import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Smarter Finanz",
  description:
    "Unabhängige Finanz und Versicherungsberatung auf Augenhöhe im Raum Hannover.",
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
  areaServed: "Raum Hannover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smarterfinanz.de"),
  title: "Smarter Finanz – Finanzberatung auf Augenhöhe | Versicherungsmakler Raum Hannover",
  description:
    "Smarter Finanz: unabhängige Finanz und Versicherungsberatung im Raum Hannover. Weniger Steuern, klug Vermögen aufbauen, Versicherungen optimieren, ehrlich, transparent, auf Augenhöhe. Kostenloses Erstgespräch.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Smarter Finanz – Finanzberatung auf Augenhöhe",
    description:
      "Unabhängig, ehrlich, transparent: weniger Steuern, strategischer Vermögensaufbau und optimale Absicherung. Kostenloses Erstgespräch.",
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
