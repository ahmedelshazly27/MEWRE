import { describe, expect, it } from "vitest";
import { interleave, pickDiagnostic, pickExamQuestions, pickMixed, shuffle, type PoolItem } from "@/lib/practice";
import type { Module, Question } from "@/content/schema";

const q = (id: string, concepts = ["c"], extra: Partial<Question> = {}): Question =>
  ({ id, type: "mcq", prompt: "", explanation: "", concepts, difficulty: 1, options: ["a", "b"], answer: 0, ...extra }) as Question;

const mod = (id: string, n: number, exam = 0): Module =>
  ({
    id, number: 0, title: id, titleAr: "", summary: "", whyItMatters: "", competencies: [], prerequisites: [], estimatedHours: 1,
    glossary: [], formulas: [], references: [], cheatSheet: "",
    exam: Array.from({ length: exam }, (_, i) => q(`${id}-x-${i}`)),
    lessons: Array.from({ length: n }, (_, i) => ({
      id: `${id}-l${i}`, title: "", summary: "", minutes: 1, objectives: [], concepts: [], sections: [], flashcards: [],
      quiz: [q(`${id}-l${i}-q1`, ["c"], i === 0 ? { diagnostic: true } : {}), q(`${id}-l${i}-q2`)],
    })),
  }) as Module;

describe("practice selection", () => {
  it("shuffle is deterministic and a permutation", () => {
    const a = shuffle([1, 2, 3, 4, 5], 42);
    expect(shuffle([1, 2, 3, 4, 5], 42)).toEqual(a);
    expect([...a].sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it("exam includes the whole bank first, then lesson questions, capped at n", () => {
    const m = mod("m1", 5, 3);
    const qs = pickExamQuestions(m, 6, 1);
    expect(qs).toHaveLength(6);
    for (let i = 0; i < 3; i++) expect(qs.map((x) => x.id)).toContain(`m1-x-${i}`);
    expect(new Set(qs.map((x) => x.id)).size).toBe(6);
  });
  it("interleave avoids consecutive modules when possible", () => {
    const items: PoolItem[] = ["a", "a", "a", "b", "b", "c"].map((m, i) => ({ moduleId: m, question: q(String(i)) }));
    const out = interleave(items);
    for (let i = 1; i < out.length; i++) expect(out[i].moduleId).not.toBe(out[i - 1].moduleId);
  });
  it("mixed practice favours weak concepts and errors", () => {
    const pool: PoolItem[] = [];
    for (let i = 0; i < 50; i++) pool.push({ moduleId: "m", question: q(`strong${i}`, ["strong"]) });
    for (let i = 0; i < 50; i++) pool.push({ moduleId: "n", question: q(`weak${i}`, ["weak"]) });
    const mastery = new Map([["strong", { mastery: 1 }], ["weak", { mastery: 0 }]]);
    let weak = 0;
    for (let s = 0; s < 20; s++) weak += pickMixed({ pool, mastery, errorIds: new Set(), n: 10, seed: s }).filter((p) => p.question.id.startsWith("weak")).length;
    expect(weak / 200).toBeGreaterThan(0.65);
    const withErr = pickMixed({ pool: pool.slice(0, 50), mastery, errorIds: new Set(["strong7"]), n: 5, seed: 3 });
    expect(withErr).toHaveLength(5);
  });
  it("diagnostic samples per module and skips drafts", () => {
    const d = pickDiagnostic([mod("m1", 6), { ...mod("m2", 3), draft: true }], 4);
    expect(d).toHaveLength(4);
    expect(d.every((x) => x.moduleId === "m1")).toBe(true);
    expect(d[0].question.diagnostic).toBe(true);
  });
});
