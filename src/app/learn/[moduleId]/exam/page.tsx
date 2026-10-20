import { liveModules } from "@/lib/content";
import { ExamView } from "@/views/ExamView";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Module exam" };

export function generateStaticParams() {
  return liveModules().map((m) => ({ moduleId: m.id }));
}

export default async function ExamPage({ params }: Params) {
  return <ExamView moduleId={(await params).moduleId} lang="en" />;
}
