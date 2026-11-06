import type { Metadata } from "next";
import { TRACKS, getTrack } from "@/lib/content";
import { TrackView } from "@/views/TrackView";

type Params = { params: Promise<{ trackId: string }> };

export function generateStaticParams() {
  return TRACKS.map((t) => ({ trackId: t.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: getTrack((await params).trackId)?.title ?? "Track" };
}

export default async function TrackPage({ params }: Params) {
  return <TrackView trackId={(await params).trackId} />;
}
