import type { Metadata } from "next";
import { liveModules } from "@/lib/content";
import { ModuleView, moduleTitle } from "@/views/ModuleView";

type Params = { params: Promise<{ moduleId: string }> };

export function generateStaticParams() {
  return liveModules().map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: moduleTitle((await params).moduleId, "en") };
}

export default async function ModulePage({ params }: Params) {
  return <ModuleView moduleId={(await params).moduleId} lang="en" />;
}
