import { liveModules } from "@/lib/content";
import { PrintView } from "@/views/PrintView";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Cheat sheet" };

export function generateStaticParams() {
  return liveModules().map((m) => ({ moduleId: m.id }));
}

export default async function PrintPage({ params }: Params) {
  return <PrintView moduleId={(await params).moduleId} lang="en" />;
}
