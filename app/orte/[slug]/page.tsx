import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeitenVorlage, seitenMetadata } from "../../../components/SeitenVorlage";
import { findeSeite, sichtbareSeiten } from "../../../lib/seiten";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sichtbareSeiten()
    .filter((s) => s.typ === "ort")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findeSeite("ort", (await params).slug);
  return s ? seitenMetadata(s) : {};
}

export default async function Page({ params }: Props) {
  const s = findeSeite("ort", (await params).slug);
  if (!s) notFound();
  return <SeitenVorlage seite={s} />;
}
