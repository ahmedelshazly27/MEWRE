import { describe, expect, it } from "vitest";
import { TRACKS, ALL_MODULES, trackOfModule } from "@/content/tracks";
import { TRACK_META, isEnglishOnlyPath, trackOfModuleId } from "@/content/track-meta";
import { liveModules, index, trackHome } from "@/lib/content";
import { buildContentIndex } from "@/lib/content-json";
import { competencyScores } from "@/lib/readiness";

describe("tracks", () => {
  it("client metadata mirrors the track list", () => {
    expect(TRACK_META.map((t) => [t.id, t.number, t.short, t.icon])).toEqual(TRACKS.map((t) => [t.id, t.number, t.short, t.icon]));
  });

  it("module ids are globally unique and map back to their track by prefix", () => {
    const ids = ALL_MODULES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of TRACKS) for (const m of t.modules) {
      expect(trackOfModule(m.id)).toBe(t.id);
      expect(trackOfModuleId(m.id)).toBe(t.id);
    }
  });

  it("lesson, question and card ids are unique across tracks", () => {
    const lessons = ALL_MODULES.flatMap((m) => m.lessons.map((l) => l.id));
    expect(new Set(lessons).size).toBe(lessons.length);
    const idx = index();
    expect(idx.lessons.size).toBe(lessons.length);
  });

  it("every module competency belongs to its track", () => {
    for (const t of TRACKS) for (const m of t.modules) {
      for (const c of m.competencies) expect(t.competencies[c], `${m.id} ${c}`).toBeDefined();
      for (const l of m.lessons) for (const c of l.concepts) expect(t.competencies[c.competency], `${c.id}`).toBeDefined();
    }
  });

  it("Arabic pages exist only for Track 0", () => {
    expect(liveModules("ar").every((m) => trackOfModule(m.id) === "mewre")).toBe(true);
    expect(liveModules("en").length).toBeGreaterThanOrEqual(liveModules("ar").length);
    expect(isEnglishOnlyPath("/learn/m01/m01-l02")).toBe(false);
    expect(isEnglishOnlyPath("/learn/fc01")).toBe(true);
    expect(isEnglishOnlyPath("/print/aw03")).toBe(true);
    expect(isEnglishOnlyPath("/tracks/mewre")).toBe(false);
    expect(isEnglishOnlyPath("/tracks/founder")).toBe(true);
    expect(isEnglishOnlyPath("/review")).toBe(false);
    expect(trackHome("m02", "ar").href).toBe("/ar/learn");
    expect(trackHome("m02").href).toBe("/tracks/mewre");
  });

  it("the browser index carries tracks and tags every module and lesson", () => {
    const c = buildContentIndex("en");
    expect(c.tracks.map((t) => t.id)).toEqual(TRACKS.map((t) => t.id));
    for (const m of c.modules) expect(m.track).toBe(trackOfModule(m.id));
    for (const l of c.lessons) expect(l.track).toBe(trackOfModule(l.moduleId));
  });
});

describe("per-track readiness", () => {
  it("ignores concepts of other tracks", () => {
    const comps = { "fc-sales": { label: "Sales", weight: 1 } };
    const s = competencyScores(
      [
        { id: "fc01.a", competency: "fc-sales" },
        { id: "m01.b", competency: "controls" },
      ],
      new Map([["fc01.a", { mastery: 0.5 }], ["m01.b", { mastery: 1 }]]),
      comps,
    );
    expect(s).toHaveLength(1);
    expect(s[0].mastery).toBe(0.5);
    expect(s[0].total).toBe(1);
  });
});
