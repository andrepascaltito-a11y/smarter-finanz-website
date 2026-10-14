import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeitenVorlage, seitenMetadata } from "../../components/SeitenVorlage";
import { findeSeite } from "../../lib/seiten";

export function generateMetadata(): Metadata {
  const s = findeSeite("hub", "weser-und-leinebergland");
  return s ? seitenMetadata(s) : {};
}

export default function Page() {
  const s = findeSeite("hub", "weser-und-leinebergland");
  if (!s) notFound();
  return <SeitenVorlage seite={s} />;
}
