import type { Metadata } from "next";
import { TRACKS, getTrack } from "@/lib/content";
import { FormulasView } from "@/views/FormulasView";

type Params = { params: Promise<{ trackId: string }> };

export const dynamicParams = false;

/** Track 0 lives at /formulas (with its Arabic mirror); the English-only tracks get their own page. */
export function generateStaticParams() {
  return TRACKS.filter((t) => t.id !== "mewre").map((t) => ({ trackId: t.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: `Formula sheet · ${getTrack((await params).trackId)?.title ?? ""}` };
}

export default async function Page({ params }: Params) {
  return <FormulasView lang="en" track={(await params).trackId} />;
}
