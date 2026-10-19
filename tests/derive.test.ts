import { describe, expect, it } from "vitest";
import { bestScores, completedLessons, derive, masteryMap, mergeDocs, openErrors, reviewQueue, sortEvents, streak, type LearnEvent } from "@/lib/store/derive";

const DAY = 86_400_000;
const t0 = Date.UTC(2026, 9, 19, 8);
let n = 0;
const ev = <T extends LearnEvent["type"]>(type: T, payload: LearnEvent<T>["payload"], at: number, id?: string) => ({ id: id ?? `e${n++}`, type, payload, at }) as LearnEvent;
const attempt = (q: string, correct: boolean, at: number) => ev("attempt", { q, source: "quiz", score: correct ? 1 : 0, correct, concepts: ["m01.pf"] }, at);

describe("derive", () => {
  it("tracks the error log until two consecutive correct answers", () => {
    const d1 = derive([attempt("q1", false, t0), attempt("q1", true, t0 + 1)]);
    expect(openErrors(d1)).toHaveLength(1);
    const d2 = derive([attempt("q1", false, t0), attempt("q1", true, t0 + 1), attempt("q1", true, t0 + 2)]);
    expect(openErrors(d2)).toHaveLength(0);
    expect(openErrors(d2, true)[0].cleared).toBe(true);
    // a new mistake reopens it
    const d3 = derive([attempt("q1", false, t0), attempt("q1", true, t0 + 1), attempt("q1", true, t0 + 2), attempt("q1", false, t0 + 3)]);
    expect(openErrors(d3)[0].wrongCount).toBe(2);
  });

  it("builds concept mastery from attempts, evidence and card reviews", () => {
    const d = derive([
      attempt("q1", true, t0),
      ev("evidence", { concepts: ["m01.pf"], score: 1, source: "scenario" }, t0 + 1),
      ev("review", { card: "c1", rating: 3, concepts: ["m01.pf"] }, t0 + 2),
    ]);
    const m = masteryMap(d, t0 + 3).get("m01.pf")!;
    expect(m.evidence).toBe(3);
    expect(m.mastery).toBeGreaterThan(0.3);
  });

  it("is order-independent: the same events from two devices give the same state", () => {
    const events = [ev("review", { card: "c1", rating: 3 }, t0), ev("review", { card: "c1", rating: 3 }, t0 + 2 * DAY), ev("review", { card: "c1", rating: 1 }, t0 + 9 * DAY), attempt("q2", false, t0 + DAY)];
    const a = derive(events);
    const b = derive([...events].reverse());
    expect(b.cards.get("c1")).toEqual(a.cards.get("c1"));
    expect(a.cards.get("c1")!.lapses).toBe(1);
    expect(sortEvents([...events].reverse()).map((e) => e.id)).toEqual(events.map((e) => e.id).sort((x, y) => events.find((e) => e.id === x)!.at - events.find((e) => e.id === y)!.at));
  });

  it("lessons, time, runs and activity", () => {
    const d = derive([
      ev("lesson-start", { lesson: "m01-l01" }, t0),
      ev("time", { lesson: "m01-l01", seconds: 120 }, t0 + 1),
      ev("time", { lesson: "m01-l01", seconds: 99999 }, t0 + 2), // clamped
      ev("lesson-complete", { lesson: "m01-l01" }, t0 + 3),
      ev("run", { id: "r1", kind: "exam", ref: "m01", score: 0.6 }, t0 + 4),
      ev("run", { id: "r2", kind: "exam", ref: "m01", score: 0.9 }, t0 + 5),
    ]);
    expect(d.lessons.get("m01-l01")).toMatchObject({ status: "completed", seconds: 720 });
    expect(completedLessons(d).has("m01-l01")).toBe(true);
    expect(bestScores(d, "exam").get("m01")).toBe(0.9);
    expect(d.runs[0].id).toBe("r2");
    expect(streak(d, t0 + 10).current).toBe(1);
  });

  it("reset hides everything before it", () => {
    const d = derive([attempt("q1", false, t0), ev("lesson-complete", { lesson: "x" }, t0 + 1), ev("reset", {}, t0 + 2), attempt("q2", false, t0 + 3)]);
    expect(openErrors(d).map((e) => e.questionId)).toEqual(["q2"]);
    expect(d.lessons.size).toBe(0);
  });

  it("review queue unlocks cards from completed lessons and caps new cards per day", () => {
    const order = [
      { id: "a", lessonId: "L1" },
      { id: "b", lessonId: "L1" },
      { id: "c", lessonId: "L2" },
    ];
    const now = new Date(t0 + 1000);
    expect(reviewQueue(derive([]), order, 20, now).fresh).toEqual([]);
    const d = derive([ev("lesson-complete", { lesson: "L1" }, t0), ev("review", { card: "a", rating: 3 }, t0 + 10)]);
    const q = reviewQueue(d, order, 1, now);
    expect(q.fresh).toEqual([]); // 1 new card already introduced today
    expect(reviewQueue(d, order, 5, now).fresh).toEqual(["b"]);
  });
});

describe("mergeDocs (last write wins)", () => {
  it("applies newer remote docs and pushes newer local ones", () => {
    const local = [
      { key: "settings", value: { a: 1 }, updatedAt: 10 },
      { key: "note:x", value: { body: "local" }, updatedAt: 50 },
      { key: "note:only-local", value: {}, updatedAt: 1 },
    ];
    const remote = [
      { key: "settings", value: { a: 2 }, updatedAt: 20 },
      { key: "note:x", value: { body: "remote" }, updatedAt: 40 },
      { key: "note:only-remote", value: {}, updatedAt: 5 },
    ];
    const r = mergeDocs(local, remote);
    expect(r.merged.get("settings")!.value).toEqual({ a: 2 });
    expect(r.merged.get("note:x")!.value).toEqual({ body: "local" });
    expect(r.toApply.map((d) => d.key).sort()).toEqual(["note:only-remote", "settings"]);
    expect(r.toPush.map((d) => d.key).sort()).toEqual(["note:only-local", "note:x"]);
  });
});
