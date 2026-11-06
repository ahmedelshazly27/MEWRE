import type { Metadata } from "next";
import { liveModules } from "@/lib/content";
import { LessonView, lessonTitle } from "@/views/LessonView";

type Params = { params: Promise<{ moduleId: string; lessonId: string }> };

export function generateStaticParams() {
  return liveModules("en", "mewre").flatMap((m) => m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: lessonTitle((await params).lessonId, "ar") };
}

export default async function LessonPage({ params }: Params) {
  const { moduleId, lessonId } = await params;
  return <LessonView moduleId={moduleId} lessonId={lessonId} lang="ar" />;
}

/** Arabic exists only for Track 0. */
export const dynamicParams = false;
