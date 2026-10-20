"use client";

import { useT } from "@/lib/useLang";
import { useEffect, useState } from "react";
import type { Question } from "@/content/schema";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { pickExamFrom } from "@/lib/practice";

/** Picks a fresh exam on every visit: the whole exam bank plus random lesson questions. */
export function ExamClient({ bank, lessonQs, moduleId, title, n }: { bank: Question[]; lessonQs: Question[]; moduleId: string; title: string; n: number }) {
  const { t } = useT();
  const [qs, setQs] = useState<Question[] | null>(null);
  useEffect(() => {
    setQs(pickExamFrom(bank, lessonQs, n, Date.now() % 2147483647));
  }, [bank, lessonQs, n]);
  if (!qs) return <div className="text-sm text-muted">{t("Preparing exam…")}</div>;
  return <QuizRunner questions={qs} source="exam" kind="exam" refId={moduleId} title={title} examMode timeLimitSec={qs.length * 120} />;
}
