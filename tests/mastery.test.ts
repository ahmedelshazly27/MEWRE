import { describe, expect, it } from "vitest";
import { conceptMastery, confidence, masteryLevel, retention, weightedAccuracy, ratingScore } from "@/lib/mastery";

const DAY = 86_400_000;
const now = Date.UTC(2026, 9, 19);

describe("mastery model", () => {
  it("is zero without evidence", () => {
    expect(conceptMastery([], now)).toBe(0);
    expect(masteryLevel(0, false)).toBe("not-started");
  });
  it("weights recent answers more", () => {
    const improving = [
      { score: 0, at: now - 3 * DAY },
      { score: 1, at: now - DAY },
    ];
    const declining = [
      { score: 1, at: now - 3 * DAY },
      { score: 0, at: now - DAY },
    ];
    expect(weightedAccuracy(improving)).toBeGreaterThan(0.5);
    expect(weightedAccuracy(declining)).toBeLessThan(0.5);
  });
  it("one correct answer is not mastery", () => {
    const m = conceptMastery([{ score: 1, at: now }], now);
    expect(m).toBeLessThan(0.45);
    expect(m).toBeGreaterThan(0.3);
  });
  it("consistent correct answers approach mastery", () => {
    const ev = Array.from({ length: 8 }, (_, i) => ({ score: 1, at: now - i * DAY }));
    expect(conceptMastery(ev, now)).toBeGreaterThan(0.9);
    expect(masteryLevel(conceptMastery(ev, now), true)).toBe("mastered");
  });
  it("decays with time but never below 60 % of the evidence-based estimate", () => {
    const ev = Array.from({ length: 6 }, () => ({ score: 1, at: now }));
    const fresh = conceptMastery(ev, now);
    const later = conceptMastery(ev, now + 365 * DAY);
    expect(later).toBeLessThan(fresh);
    expect(later).toBeGreaterThanOrEqual(0.6 * fresh - 1e-9);
    expect(retention(ev, now)).toBe(1);
  });
  it("source weights change confidence", () => {
    expect(confidence([{ score: 1, at: now, weight: 0.5 }])).toBeLessThan(confidence([{ score: 1, at: now, weight: 1 }]));
  });
  it("maps flashcard ratings", () => {
    expect(ratingScore(1)).toBe(0);
    expect(ratingScore(4)).toBe(1);
  });
});
