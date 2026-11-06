"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TutorChat } from "@/components/TutorChat";
import { useContent } from "@/lib/useContent";
import { useT } from "@/lib/useLang";

/** The tutor page's chat, in workshop mode when opened from an exercise (`/tutor?exercise=<question id>`). */
export function TutorPanel() {
  const params = useSearchParams();
  const content = useContent();
  const { t, href } = useT();
  const exerciseId = params.get("exercise") ?? undefined;
  const ref = exerciseId ? content?.questions[exerciseId] : undefined;
  const title = ref ? ref.question.prompt.replace(/[*_`$]/g, "").split(/(?<=[.:?])\s/)[0].slice(0, 140) : undefined;
  const back = ref ? (ref.lessonId ? `/learn/${ref.moduleId}/${ref.lessonId}` : `/learn/${ref.moduleId}/exam`) : undefined;
  return (
    <>
      {back && (
        <div className="mb-3 text-sm">
          <Link href={href(back)} className="text-accent">
            {t("Back to the exercise")}
          </Link>
        </div>
      )}
      <TutorChat key={exerciseId ?? "general"} exerciseId={exerciseId} exerciseTitle={title} />
    </>
  );
}
