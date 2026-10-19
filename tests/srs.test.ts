import { describe, expect, it } from "vitest";
import { buildQueue, formatInterval, newCard, previewIntervals, retrievability, review } from "@/lib/srs";

const t0 = new Date("2026-10-19T08:00:00Z");

describe("FSRS wrapper", () => {
  it("new card is due now and in state New", () => {
    const c = newCard("a", t0);
    expect(c.state).toBe(0);
    expect(new Date(c.due).getTime()).toBe(t0.getTime());
    expect(retrievability(c, t0)).toBe(0);
  });
  it("Good on a new card schedules into the future; Easy further than Good", () => {
    const c = newCard("a", t0);
    const good = review(c, 3, t0, 0.9, false);
    const easy = review(c, 4, t0, 0.9, false);
    expect(new Date(good.due).getTime()).toBeGreaterThan(t0.getTime());
    expect(new Date(easy.due).getTime()).toBeGreaterThan(new Date(good.due).getTime());
    expect(good.reps).toBe(1);
  });
  it("intervals grow with successive Good reviews and shrink after a lapse", () => {
    let c = newCard("a", t0);
    let now = t0;
    const intervals: number[] = [];
    for (let i = 0; i < 5; i++) {
      c = review(c, 3, now, 0.9, false);
      const next = new Date(c.due);
      intervals.push(next.getTime() - now.getTime());
      now = next;
    }
    for (let i = 2; i < intervals.length; i++) expect(intervals[i]).toBeGreaterThan(intervals[i - 1]);
    const lapsed = review(c, 1, now, 0.9, false);
    expect(lapsed.lapses).toBe(1);
    expect(new Date(lapsed.due).getTime() - now.getTime()).toBeLessThan(intervals[intervals.length - 1]);
  });
  it("higher retention target gives shorter intervals", () => {
    let a = newCard("a", t0);
    let b = newCard("b", t0);
    a = review(review(a, 3, t0, 0.8, false), 3, new Date(review(a, 3, t0, 0.8, false).due), 0.8, false);
    b = review(review(b, 3, t0, 0.97, false), 3, new Date(review(b, 3, t0, 0.97, false).due), 0.97, false);
    expect(a.scheduled_days).toBeGreaterThan(b.scheduled_days);
  });
  it("previews four intervals", () => {
    const p = previewIntervals(newCard("a", t0), t0);
    expect(Object.keys(p)).toEqual(["1", "2", "3", "4"]);
  });
  it("formats intervals", () => {
    expect(formatInterval(5 * 60_000)).toBe("5m");
    expect(formatInterval(3 * 3_600_000)).toBe("3h");
    expect(formatInterval(4 * 86_400_000)).toBe("4d");
    expect(formatInterval(90 * 86_400_000)).toBe("3mo");
  });
});

describe("buildQueue", () => {
  it("orders due cards most-overdue first and caps new cards", () => {
    const a = { ...newCard("a", t0), due: "2026-10-18T00:00:00Z", state: 2 };
    const b = { ...newCard("b", t0), due: "2026-10-17T00:00:00Z", state: 2 };
    const c = { ...newCard("c", t0), due: "2026-10-25T00:00:00Z", state: 2 };
    const q = buildQueue({ existing: [a, b, c], unlocked: ["a", "b", "c", "d", "e", "f"], newToday: 1, newLimit: 3, now: t0 });
    expect(q.due).toEqual(["b", "a"]);
    expect(q.fresh).toEqual(["d", "e"]);
  });
  it("no new cards once the daily limit is reached", () => {
    const q = buildQueue({ existing: [], unlocked: ["x"], newToday: 20, newLimit: 20, now: t0 });
    expect(q.fresh).toEqual([]);
  });
});
