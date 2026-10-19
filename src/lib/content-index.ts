/** Shape of /data/content.json — the slice of the curriculum the browser needs for practice, reviews and progress. */
import type { CompetencyId, Question } from "@/content/schema";

export interface ContentIndex {
  version: string;
  modules: { id: string; number: number; title: string; draft: boolean; lessonIds: string[]; estimatedHours: number }[];
  /** Lessons in recommended study order. */
  lessons: { id: string; moduleId: string; moduleNumber: number; moduleTitle: string; title: string; summary: string; index: number; conceptIds: string[] }[];
  concepts: Record<string, { name: string; description: string; competency: CompetencyId; lessonId: string; moduleId: string }>;
  questions: Record<string, { question: Question; moduleId: string; lessonId?: string; origin: "quiz" | "inline" | "exam" }>;
  cards: Record<string, { front: string; back: string; ar?: string; kind: "lesson" | "glossary" | "formula"; lessonId: string; moduleId: string; concepts?: string[] }>;
  cardOrder: { id: string; lessonId: string }[];
}
