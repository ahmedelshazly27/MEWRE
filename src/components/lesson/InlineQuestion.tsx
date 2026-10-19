"use client";

import type { Question } from "@/content/schema";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { Pill } from "@/components/ui";

export function InlineQuestion({ question }: { question: Question }) {
  return (
    <div className="my-5">
      <div className="mb-1.5">
        <Pill tone="sun">Independent problem</Pill>
      </div>
      <QuestionCard question={question} source="inline" />
    </div>
  );
}
