import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeitenVorlage, seitenMetadata } from "../../../../components/SeitenVorlage";
import { findeSeite, sichtbareSeiten } from "../../../../lib/seiten";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sichtbareSeiten().filter((x) => x.typ === "ratgeber").map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seite = findeSeite("ratgeber", slug);
  return seite ? seitenMetadata(seite) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const seite = findeSeite("ratgeber", slug);
  if (!seite) notFound();
  return <SeitenVorlage seite={seite} />;
}
