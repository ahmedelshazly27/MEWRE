import { describe, expect, it } from "vitest";
import { MODULES } from "@/content";
import { validateModules } from "@/content/validate";

describe("curriculum content", () => {
  it("passes the content validator (ids, answer keys, references, KaTeX)", () => {
    const issues = validateModules(MODULES);
    if (issues.length) console.log(issues.slice(0, 30).map((i) => `${i.where}: ${i.message}`).join("\n"));
    expect(issues).toEqual([]);
  });
  it("has 16 modules in order", () => {
    expect(MODULES.map((m) => m.number)).toEqual([...Array(16).keys()]);
  });
});
