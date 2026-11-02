import { SPRINT_BLOCKS } from "@/content/crash";
import { CheckView } from "@/views/CrashView";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Retrieval check" };

export function generateStaticParams() {
  return SPRINT_BLOCKS.map((b) => ({ moduleId: b.module }));
}

export default async function CheckPage({ params }: Params) {
  return <CheckView moduleId={(await params).moduleId} lang="en" />;
}
