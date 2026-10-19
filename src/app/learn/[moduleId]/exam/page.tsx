import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/lib/content";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { PageHeader } from "@/components/ui";
import { pickExamQuestions } from "@/lib/practice";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Module exam" };

export default async function ExamPage({ params }: Params) {
  const { moduleId } = await params;
  const m = getModule(moduleId);
  if (!m || m.draft) notFound();
  const questions = pickExamQuestions(m, 20, Date.now());
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={`/learn/${m.id}`} className="hover:text-text">
          ← M{m.number} {m.title}
        </Link>
      </nav>
      <PageHeader
        title={`Module exam · ${m.title}`}
        subtitle={`${questions.length} questions mixing the module exam bank with lesson questions. Feedback is shown at the end, like a real exam. Suggested time: ${Math.round(questions.length * 2)} minutes.`}
      />
      <QuizRunner questions={questions} source="exam" kind="exam" refId={m.id} title={`${m.title} — module exam`} examMode timeLimitSec={questions.length * 120} />
    </div>
  );
}
