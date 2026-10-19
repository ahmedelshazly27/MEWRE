import { describe, expect, it } from "vitest";
import { gradeQuestion, numericCorrect, parseNumber, scenarioScore, toleranceFor, correctAnswerText } from "@/lib/scoring";
import type { Question } from "@/content/schema";

const base = { prompt: "p", explanation: "e", concepts: ["m01.x"], difficulty: 1 as const };

describe("parseNumber", () => {
  it("parses common formats", () => {
    expect(parseNumber("1,234.5")).toBe(1234.5);
    expect(parseNumber(" 12.3 ")).toBe(12.3);
    expect(parseNumber("1.2e3")).toBe(1200);
    expect(parseNumber("−5")).toBe(-5);
    expect(parseNumber("85%")).toBe(85);
    expect(parseNumber(".5")).toBe(0.5);
  });
  it("rejects junk", () => {
    expect(parseNumber("abc")).toBeNaN();
    expect(parseNumber("")).toBeNaN();
    expect(parseNumber("12 MW")).toBeNaN();
  });
});

describe("numeric tolerance", () => {
  it("defaults to ±2 % relative", () => {
    expect(toleranceFor(100)).toBeCloseTo(2);
    expect(numericCorrect(101.9, 100)).toBe(true);
    expect(numericCorrect(102.1, 100)).toBe(false);
  });
  it("uses max(abs, rel)", () => {
    expect(toleranceFor(10, { abs: 0.5, rel: 0.01 })).toBe(0.5);
    expect(toleranceFor(1000, { abs: 0.5, rel: 0.01 })).toBe(10);
  });
  it("abs-only tolerance has no relative part", () => {
    expect(toleranceFor(1000, { abs: 1 })).toBe(1);
  });
  it("handles zero answers", () => {
    expect(numericCorrect("0", 0)).toBe(true);
    expect(numericCorrect("0.1", 0)).toBe(false);
  });
});

describe("gradeQuestion", () => {
  it("mcq", () => {
    const q: Question = { ...base, id: "q", type: "mcq", options: ["a", "b"], answer: 1 };
    expect(gradeQuestion(q, { type: "mcq", choice: 1 })).toEqual({ score: 1, correct: true });
    expect(gradeQuestion(q, { type: "mcq", choice: 0 })).toEqual({ score: 0, correct: false });
  });
  it("multi gives partial credit but only exact is correct", () => {
    const q: Question = { ...base, id: "q", type: "multi", options: ["a", "b", "c", "d"], answer: [0, 2] };
    expect(gradeQuestion(q, { type: "multi", choices: [2, 0] }).correct).toBe(true);
    const half = gradeQuestion(q, { type: "multi", choices: [0] });
    expect(half.score).toBe(0.5);
    expect(half.correct).toBe(false);
    expect(gradeQuestion(q, { type: "multi", choices: [0, 1] }).score).toBe(0);
    expect(gradeQuestion(q, { type: "multi", choices: [1, 3] }).score).toBe(0);
  });
  it("numeric", () => {
    const q: Question = { ...base, id: "q", type: "numeric", answer: 0.87, tolerance: { abs: 0.01 } };
    expect(gradeQuestion(q, { type: "numeric", value: "0.875" }).correct).toBe(true);
    expect(gradeQuestion(q, { type: "numeric", value: "0.9" }).correct).toBe(false);
  });
  it("order uses adjacent-pair credit", () => {
    const q: Question = { ...base, id: "q", type: "order", items: ["A", "B", "C", "D"] };
    expect(gradeQuestion(q, { type: "order", items: ["A", "B", "C", "D"] })).toEqual({ score: 1, correct: true });
    const swap = gradeQuestion(q, { type: "order", items: ["A", "C", "B", "D"] });
    expect(swap.score).toBeCloseTo(2 / 3);
    expect(swap.correct).toBe(false);
    expect(gradeQuestion(q, { type: "order", items: ["D", "C", "B", "A"] }).score).toBe(0);
  });
  it("decision uses option score with threshold", () => {
    const q: Question = {
      ...base,
      id: "q",
      type: "decision",
      options: [
        { text: "best", score: 1, feedback: "" },
        { text: "ok", score: 0.8, feedback: "" },
        { text: "bad", score: 0.2, feedback: "" },
      ],
    };
    expect(gradeQuestion(q, { type: "decision", choice: 1 })).toEqual({ score: 0.8, correct: true });
    expect(gradeQuestion(q, { type: "decision", choice: 2 }).correct).toBe(false);
    expect(correctAnswerText(q)).toBe("best");
  });
  it("label", () => {
    const q: Question = {
      ...base,
      id: "q",
      type: "label",
      diagram: "power-triangle",
      markers: [
        { id: "p", answer: "Real power" },
        { id: "q", answer: "Reactive power" },
      ],
      options: ["Real power", "Reactive power", "Apparent power"],
    };
    expect(gradeQuestion(q, { type: "label", labels: { p: "Real power", q: "Reactive power" } }).correct).toBe(true);
    expect(gradeQuestion(q, { type: "label", labels: { p: "Real power", q: "Apparent power" } }).score).toBe(0.5);
  });
  it("short passes external score through, clamped", () => {
    const q: Question = { ...base, id: "q", type: "short", rubric: ["x"], modelAnswer: "m" };
    expect(gradeQuestion(q, { type: "short", text: "t", score: 0.9 }).correct).toBe(true);
    expect(gradeQuestion(q, { type: "short", text: "t", score: 1.7 }).score).toBe(1);
  });
  it("throws on type mismatch", () => {
    const q: Question = { ...base, id: "q", type: "mcq", options: ["a", "b"], answer: 1 };
    expect(() => gradeQuestion(q, { type: "numeric", value: 1 })).toThrow();
  });
});

describe("scenarioScore", () => {
  it("averages choice scores out of 10", () => {
    expect(scenarioScore([10, 5])).toBe(0.75);
    expect(scenarioScore([])).toBe(0);
  });
});
