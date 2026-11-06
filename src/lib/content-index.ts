/** Shape of /data/content.json — the slice of the curriculum the browser needs for practice, reviews and progress. */
import type { CompetencyId, Question } from "@/content/schema";

export interface TrackSummary {
  id: string;
  number: number;
  title: string;
  short: string;
  icon: string;
  readinessLabel: string;
  competencies: Record<string, { label: string; weight: number }>;
  /** Module ids in recommended order. */
  moduleIds: string[];
  phase?: number;
}

export interface ContentIndex {
  version: string;
  tracks: TrackSummary[];
  modules: { id: string; track: string; number: number; title: string; draft: boolean; lessonIds: string[]; estimatedHours: number }[];
  /** Lessons in recommended study order (tracks in order, then each track's module order). */
  lessons: { id: string; track: string; moduleId: string; moduleNumber: number; moduleTitle: string; title: string; summary: string; index: number; conceptIds: string[] }[];
  concepts: Record<string, { name: string; description: string; competency: CompetencyId; lessonId: string; moduleId: string }>;
  questions: Record<string, { question: Question; moduleId: string; lessonId?: string; origin: "quiz" | "inline" | "exam" }>;
  cards: Record<string, { front: string; back: string; ar?: string; kind: "lesson" | "glossary" | "formula" | "key"; lessonId: string; moduleId: string; concepts?: string[] }>;
  cardOrder: { id: string; lessonId: string }[];
}
