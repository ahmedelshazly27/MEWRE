import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/lib/content";
import { back, lp, t, type Lang } from "@/lib/i18n";
import { PageHeader } from "@/components/ui";
import { ExamClient } from "@/app/learn/[moduleId]/exam/ExamClient";

export function ExamView({ moduleId, lang }: { moduleId: string; lang: Lang }) {
  const m = getModule(moduleId, lang);
  if (!m || m.draft) notFound();
  const n = Math.min(20, m.exam.length + m.lessons.reduce((s, l) => s + l.quiz.length, 0));
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={lp(lang, `/learn/${m.id}`)} className="hover:text-text">
          {back(lang)} M{m.number} {m.title}
        </Link>
      </nav>
      <PageHeader
        title={t(lang, "Module exam · {title}", { title: m.title })}
        subtitle={t(lang, "{n} questions mixing the module exam bank with lesson questions. Feedback is shown at the end, like a real exam. Time limit: {m} minutes.", { n, m: n * 2 })}
      />
      <ExamClient bank={m.exam} lessonQs={m.lessons.flatMap((l) => l.quiz)} moduleId={m.id} title={t(lang, "{title} — module exam", { title: m.title })} n={n} />
    </div>
  );
}
