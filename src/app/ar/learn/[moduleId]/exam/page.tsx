import { liveModules } from "@/lib/content";
import { ExamView } from "@/views/ExamView";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "اختبار الوحدة" };

export function generateStaticParams() {
  return liveModules("en", "mewre").map((m) => ({ moduleId: m.id }));
}

export default async function ExamPage({ params }: Params) {
  return <ExamView moduleId={(await params).moduleId} lang="ar" />;
}

/** Arabic exists only for Track 0. */
export const dynamicParams = false;
