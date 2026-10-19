/** Learner actions (client side). Each one appends an event to the local store; sync happens later. */
import type { Question } from "@/content/schema";
import { correctAnswerText, gradeQuestion, type Grade, type Response } from "@/lib/scoring";
import type { ReviewRating } from "@/lib/srs";
import { getStore } from "./store";
import type { RunPayload } from "./derive";

export interface AttemptResult extends Grade {
  questionId: string;
  correctAnswer: string;
  explanation: string;
}

export async function recordAttempt(q: Question, response: Response, source: string, runId?: string): Promise<AttemptResult> {
  const g = gradeQuestion(q, response);
  await getStore().emit("attempt", { q: q.id, source, score: g.score, correct: g.correct, concepts: q.concepts, response, run: runId });
  return { ...g, questionId: q.id, correctAnswer: correctAnswerText(q), explanation: q.explanation };
}

export function recordEvidence(concepts: string[], score: number, source: string) {
  return getStore().emit("evidence", { concepts, score: Math.max(0, Math.min(1, score)), source });
}

export function startLesson(lesson: string) {
  const d = getStore().ready ? getStore().derived() : null;
  if (d?.lessons.has(lesson)) return Promise.resolve();
  return getStore().emit("lesson-start", { lesson });
}

export function completeLesson(lesson: string) {
  return getStore().emit("lesson-complete", { lesson });
}

export function addTime(lesson: string | null, seconds: number) {
  if (seconds < 5) return Promise.resolve();
  return getStore().emit("time", { lesson, seconds: Math.round(seconds) });
}

export function gradeCard(card: string, rating: ReviewRating, concepts?: string[]) {
  return getStore().emit("review", { card, rating, concepts });
}

export function saveRun(run: RunPayload) {
  return getStore().emit("run", { ...run, score: Math.max(0, Math.min(1, run.score)) });
}

export function saveNote(lessonId: string, body: string) {
  return getStore().setDoc(`note:${lessonId}`, { body: body.slice(0, 50_000) });
}

export function resetProgress() {
  return getStore().emit("reset", {});
}
