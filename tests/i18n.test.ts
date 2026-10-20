import { describe, expect, it } from "vitest";
import { langFromPath, lp, switchPath, t } from "@/lib/i18n";
import { getLesson, index, isTranslated, modulesFor } from "@/lib/content";

describe("i18n routing", () => {
  it("derives the language from the /ar prefix", () => {
    expect(langFromPath("/")).toBe("en");
    expect(langFromPath("/learn/m00")).toBe("en");
    expect(langFromPath("/ar")).toBe("ar");
    expect(langFromPath("/ar/learn/m00")).toBe("ar");
    expect(langFromPath("/archive")).toBe("en");
  });

  it("prefixes and switches paths", () => {
    expect(lp("en", "/learn")).toBe("/learn");
    expect(lp("ar", "/learn")).toBe("/ar/learn");
    expect(lp("ar", "/")).toBe("/ar");
    expect(switchPath("/learn/m01/m01-l01", "ar")).toBe("/ar/learn/m01/m01-l01");
    expect(switchPath("/ar/learn/m01/m01-l01", "en")).toBe("/learn/m01/m01-l01");
    expect(switchPath("/ar", "en")).toBe("/");
    expect(switchPath("/", "ar")).toBe("/ar");
  });

  it("translates with placeholders and falls back to English", () => {
    expect(t("en", "Lesson {n} of {total}", { n: 2, total: 7 })).toBe("Lesson 2 of 7");
    expect(t("ar", "Lesson {n} of {total}", { n: 2, total: 7 })).toBe("الدرس 2 من 7");
    expect(t("ar", "some string nobody translated")).toBe("some string nobody translated");
  });
});

describe("per-language content index", () => {
  it("has the same lessons, questions and cards in both languages", () => {
    const en = index("en");
    const ar = index("ar");
    expect([...ar.lessons.keys()]).toEqual([...en.lessons.keys()]);
    expect([...ar.questions.keys()].sort()).toEqual([...en.questions.keys()].sort());
    expect(ar.cardOrder).toEqual(en.cardOrder);
  });

  it("serves Arabic modules where translated and English otherwise", () => {
    for (const m of modulesFor("ar")) {
      const lesson = m.lessons[0];
      if (!lesson) continue;
      const enTitle = getLesson(lesson.id, "en")!.lesson.title;
      const arTitle = getLesson(lesson.id, "ar")!.lesson.title;
      if (isTranslated(m.id)) expect(arTitle).toMatch(/[؀-ۿ]/);
      else expect(arTitle).toBe(enTitle);
    }
  });
});
