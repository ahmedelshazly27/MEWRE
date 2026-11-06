import { notFound } from "next/navigation";
import { TRACKS, getTrack } from "@/lib/content";
import { TrackConceptsView } from "@/views/CrashView";

type Params = { params: Promise<{ trackId: string }> };

export const metadata = { title: "Must-know concepts" };
export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.filter((t) => t.id !== "mewre").map((t) => ({ trackId: t.id }));
}

export default async function TrackConceptsPage({ params }: Params) {
  const { trackId } = await params;
  if (!getTrack(trackId) || trackId === "mewre") notFound();
  return <TrackConceptsView trackId={trackId} />;
}
