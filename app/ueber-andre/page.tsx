import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeitenVorlage, seitenMetadata } from "../../components/SeitenVorlage";
import { findeSeite } from "../../lib/seiten";

export function generateMetadata(): Metadata {
  const s = findeSeite("autor", "ueber-andre");
  return s ? seitenMetadata(s) : {};
}

export default function Page() {
  const s = findeSeite("autor", "ueber-andre");
  if (!s) notFound();
  return <SeitenVorlage seite={s} />;
}
