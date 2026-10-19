import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Module } from "@/content/schema";

const fixture: Module = {
  id: "m01", number: 1, title: "T", titleAr: "ت", summary: "", whyItMatters: "", competencies: ["engineering"],
  prerequisites: [], estimatedHours: 1, exam: [], glossary: [
    { id: "pf", en: "Power factor", ar: "عامل القدرة", definition: "P/S", lesson: "m01-l01", category: "technical" },
  ],
  formulas: [{ id: "pf-def", name: "PF", tex: "\\text{PF}=P/S", vars: [], explanation: "", lesson: "m01-l01" }],
  references: [], cheatSheet: "",
  lessons: [{
    id: "m01-l01", title: "L", summary: "", minutes: 10, objectives: [],
    concepts: [{ id: "m01.pf", name: "PF", description: "", competency: "engineering" }],
    sections: [],
    quiz: [
      { id: "m01-l01-q1", type: "mcq", prompt: "", explanation: "x", concepts: ["m01.pf"], difficulty: 1, options: ["a", "b"], answer: 0 },
      { id: "m01-l01-q2", type: "numeric", prompt: "", explanation: "x", concepts: ["m01.pf"], difficulty: 1, answer: 10 },
    ],
    flashcards: [{ id: "m01-l01-f1", front: "f", back: "b", concepts: ["m01.pf"] }],
  }],
};

vi.mock("@/content", () => ({ MODULES: [fixture] }));

const { openDb, setDb } = await import("@/server/db");
const repo = await import("@/server/repo");

describe("repository", () => {
  beforeEach(() => setDb(openDb(":memory:")));

  it("records attempts, mastery evidence and the error log", () => {
    const wrong = repo.recordAttempt({ questionId: "m01-l01-q1", source: "quiz", response: { type: "mcq", choice: 1 } });
    expect(wrong.correct).toBe(false);
    expect(wrong.correctAnswer).toBe("a");
    expect(repo.listErrors()).toHaveLength(1);
    repo.recordAttempt({ questionId: "m01-l01-q1", source: "errors", response: { type: "mcq", choice: 0 } });
    expect(repo.listErrors()).toHaveLength(1); // one correct answer is not enough
    repo.recordAttempt({ questionId: "m01-l01-q1", source: "errors", response: { type: "mcq", choice: 0 } });
    expect(repo.listErrors()).toHaveLength(0);
    expect(repo.listErrors(true)[0].cleared).toBe(1);
    const m = repo.masteryMap().get("m01.pf")!;
    expect(m.evidence).toBe(3);
    expect(m.mastery).toBeGreaterThan(0);
  });

  it("numeric attempts use tolerance", () => {
    expect(repo.recordAttempt({ questionId: "m01-l01-q2", source: "quiz", response: { type: "numeric", value: "10.1" } }).correct).toBe(true);
  });

  it("unlocks cards on lesson completion and schedules reviews", () => {
    expect(repo.reviewQueue().fresh).toEqual([]);
    repo.completeLesson("m01-l01");
    const q = repo.reviewQueue();
    expect(q.fresh.sort()).toEqual(["fx-pf-def", "gl-pf", "m01-l01-f1"]);
    repo.gradeCard("m01-l01-f1", 3);
    const after = repo.reviewQueue();
    expect(after.fresh).not.toContain("m01-l01-f1");
    expect(repo.cardState("m01-l01-f1")!.reps).toBe(1);
    expect(repo.newCardsIntroducedToday()).toBe(1);
  });

  it("tracks time, notes, runs, settings and streaks", () => {
    repo.addTime("m01-l01", 120);
    expect(repo.lessonProgressMap().get("m01-l01")!.seconds).toBe(120);
    expect(repo.streak().current).toBe(1);
    repo.saveNote("m01-l01", "hello");
    expect(repo.getNote("m01-l01")).toBe("hello");
    repo.saveRun({ id: "r1", kind: "exam", ref: "m01", score: 0.7 });
    repo.saveRun({ id: "r2", kind: "exam", ref: "m01", score: 0.9 });
    expect(repo.bestScores("exam").get("m01")).toBe(0.9);
    repo.saveSettings({ weeklyHours: 6 });
    expect(repo.getSettings().weeklyHours).toBe(6);
    repo.resetAll();
    expect(repo.lessonProgressMap().size).toBe(0);
  });
});
