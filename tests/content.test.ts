import { describe, expect, it } from "vitest";
import { MODULES } from "@/content";
import { validateModules } from "@/content/validate";
import { MODULES_AR } from "@/content/ar";
import { validateTranslation } from "@/content/validate-translation";

describe("curriculum content", () => {
  it("passes the content validator (ids, answer keys, references, KaTeX)", () => {
    const issues = validateModules(MODULES);
    if (issues.length) console.log(issues.slice(0, 30).map((i) => `${i.where}: ${i.message}`).join("\n"));
    expect(issues).toEqual([]);
  });
  it("has 16 modules in order", () => {
    expect(MODULES.map((m) => m.number)).toEqual([...Array(16).keys()]);
  });
  it("Arabic translations are valid and structurally identical to English", () => {
    const ar = MODULES.map((m) => MODULES_AR[m.id]).filter((m): m is NonNullable<typeof m> => !!m);
    const mixed = validateModules(MODULES.map((m) => MODULES_AR[m.id] ?? m)).filter((i) => ar.some((a) => i.where.startsWith(a.id)));
    const issues = [...mixed, ...ar.flatMap((a) => validateTranslation(MODULES.find((m) => m.id === a.id)!, a))];
    if (issues.length) console.log(issues.slice(0, 30).map((i) => `${i.where}: ${i.message}`).join("\n"));
    expect(issues).toEqual([]);
  });
});
