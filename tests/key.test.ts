import { describe, expect, it } from "vitest";
import { MODULES } from "@/content";
import { KEY_CONCEPTS } from "@/content/key";
import { validateKeyConcepts } from "@/content/key/validate";
import { index } from "@/lib/content";

describe("must-know concepts", () => {
  it("every module has a valid, bilingual set", () => {
    const issues = MODULES.flatMap((m) => validateKeyConcepts(m, KEY_CONCEPTS[m.id]));
    expect(issues).toEqual([]);
    for (const m of MODULES) expect(KEY_CONCEPTS[m.id].en.filter((k) => k.tier === 1).length, m.id).toBeGreaterThanOrEqual(3);
  });

  it("no concept is taught twice across modules", () => {
    const ids = MODULES.flatMap((m) => KEY_CONCEPTS[m.id].en.map((k) => k.id));
    expect(new Set(ids).size).toBe(ids.length);
    const terms = MODULES.flatMap((m) => KEY_CONCEPTS[m.id].en.map((k) => k.term.toLowerCase()));
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("each concept becomes a review card in both languages", () => {
    for (const lang of ["en", "ar"] as const) {
      const idx = index(lang);
      for (const m of MODULES) for (const k of KEY_CONCEPTS[m.id][lang]) {
        expect(idx.cards.get(`kc-${k.id}`)?.kind).toBe("key");
        expect(idx.keyConcepts.get(k.id)?.module.id).toBe(m.id);
      }
    }
  });
});
