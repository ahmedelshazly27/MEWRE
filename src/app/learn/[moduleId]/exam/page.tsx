import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, liveModules } from "@/lib/content";
import { PageHeader } from "@/components/ui";
import { ExamClient } from "./ExamClient";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Module exam" };

export function generateStaticParams() {
  return liveModules().map((m) => ({ moduleId: m.id }));
}

export default async function ExamPage({ params }: Params) {
  const { moduleId } = await params;
  const m = getModule(moduleId);
  if (!m || m.draft) notFound();
  const n = Math.min(20, m.exam.length + m.lessons.reduce((s, l) => s + l.quiz.length, 0));
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={`/learn/${m.id}`} className="hover:text-text">
          ← M{m.number} {m.title}
        </Link>
      </nav>
      <PageHeader
        title={`Module exam · ${m.title}`}
        subtitle={`${n} questions mixing the module exam bank with lesson questions. Feedback is shown at the end, like a real exam. Time limit: ${n * 2} minutes.`}
      />
      <ExamClient bank={m.exam} lessonQs={m.lessons.flatMap((l) => l.quiz)} moduleId={m.id} title={`${m.title} — module exam`} n={n} />
    </div>
  );
}
