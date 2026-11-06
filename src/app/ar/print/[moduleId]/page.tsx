import { liveModules } from "@/lib/content";
import { PrintView } from "@/views/PrintView";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "الملخص المركّز" };

export function generateStaticParams() {
  return liveModules("en", "mewre").map((m) => ({ moduleId: m.id }));
}

export default async function PrintPage({ params }: Params) {
  return <PrintView moduleId={(await params).moduleId} lang="ar" />;
}

/** Arabic exists only for Track 0. */
export const dynamicParams = false;
