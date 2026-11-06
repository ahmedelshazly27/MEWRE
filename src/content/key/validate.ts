/** Checks must-know concept sets: ids, lesson links, KaTeX, and that Arabic mirrors English. */
import type { KeyConcept, KeyConceptSet, Module } from "../schema";
import { checkMd, type ValidationIssue } from "../validate";

const FIELDS = ["definition", "explain", "picture", "why", "example", "confusion"] as const;

export function validateKeyConcepts(mod: Module, set: KeyConceptSet): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const at = (where: string, message: string) => issues.push({ where: `${mod.id} key ${where}`, message });
  const lessons = new Set(mod.lessons.map((l) => l.id));
  const check = (list: KeyConcept[], lang: "en" | "ar") => {
    const ids = new Set<string>();
    for (const k of list) {
      const w = `${k.id} [${lang}]`;
      if (!k.id.startsWith(`k-${mod.id}-`)) at(w, `id must start with k-${mod.id}-`);
      if (ids.has(k.id)) at(w, "duplicate id");
      ids.add(k.id);
      if (!lessons.has(k.lesson)) at(w, `unknown lesson ${k.lesson}`);
      if (k.tier !== 1 && k.tier !== 2) at(w, "tier must be 1 or 2");
      for (const f of ["term", "termAr", "definition", "explain", "picture", "why"] as const) if (!k[f]?.trim()) at(w, `missing ${f}`);
      for (const f of FIELDS) checkMd(k[f], `${mod.id} key ${w}.${f}`, issues);
      const words = k.definition.split(/\s+/).length;
      if (words > 45) at(w, `definition too long (${words} words) — keep it memorizable`);
      if (!/[؀-ۿ]/.test(k.termAr)) at(w, "termAr must be Arabic");
      if (lang === "ar") for (const f of ["definition", "explain", "picture", "why"] as const) if (!/[؀-ۿ]/.test(k[f])) at(w, `${f} is not translated`);
    }
  };
  check(set.en, "en");
  check(set.ar, "ar");
  // tracks without an Arabic edition keep `ar` empty
  if (!/^m\d/.test(mod.id)) {
    if (set.ar.length) at("[ar]", "only Track 0 has Arabic: leave ar empty");
    return issues;
  }
  const key = (k: KeyConcept) => [k.id, k.lesson, k.tier, k.term, !!k.example, !!k.confusion].join("|");
  if (set.en.map(key).join("\n") !== set.ar.map(key).join("\n")) at("[ar]", "Arabic list must mirror English (same order, ids, lessons, tiers, term, optional fields)");
  return issues;
}
