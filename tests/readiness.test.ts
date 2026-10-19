import { describe, expect, it } from "vitest";
import { competencyScores, readinessScore, readinessBand } from "@/lib/readiness";

describe("readiness", () => {
  const concepts = [
    { id: "a", competency: "controls" as const },
    { id: "b", competency: "controls" as const },
    { id: "c", competency: "engineering" as const },
  ];
  it("averages concept mastery per competency, unassessed counts as zero", () => {
    const s = competencyScores(concepts, new Map([["a", { mastery: 0.8 }]]));
    const controls = s.find((x) => x.id === "controls")!;
    expect(controls.mastery).toBeCloseTo(0.4);
    expect(controls.assessed).toBe(1);
    expect(controls.total).toBe(2);
  });
  it("ignores competencies with no content and adds capstone", () => {
    const s = competencyScores(concepts, new Map([["a", { mastery: 1 }], ["b", { mastery: 1 }], ["c", { mastery: 1 }]]));
    expect(readinessScore(s, null)).toBe(85);
    expect(readinessScore(s, 1)).toBe(100);
    expect(readinessScore(competencyScores([], new Map()), null)).toBe(0);
  });
  it("bands", () => {
    expect(readinessBand(10).label).toBe("Foundation");
    expect(readinessBand(90).label).toBe("Day-one PM");
  });
});
