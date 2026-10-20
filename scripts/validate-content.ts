/* Usage: npx tsx scripts/validate-content.ts [moduleId ...]  — filters output to given modules. */
import { MODULES } from "../src/content";
import { validateModules } from "../src/content/validate";
import { MODULES_AR } from "../src/content/ar";
import { validateTranslation } from "../src/content/validate-translation";

const filter = process.argv.slice(2);
const arModules = MODULES.map((m) => MODULES_AR[m.id]).filter((m): m is NonNullable<typeof m> => !!m);
const arIssues = [
  // validate Arabic modules in the context of the full curriculum (cross-module concept links)
  ...validateModules(MODULES.map((m) => MODULES_AR[m.id] ?? m))
    .filter((i) => arModules.some((a) => i.where.startsWith(a.id)))
    .map((i) => ({ ...i, where: `${i.where} [ar]` })),
  ...arModules.flatMap((ar) => validateTranslation(MODULES.find((m) => m.id === ar.id)!, ar)),
];
const issues = [...validateModules(MODULES), ...arIssues].filter(
  (i) => !filter.length || filter.some((f) => i.where.startsWith(f)),
);
for (const i of issues) console.log(`✗ ${i.where}: ${i.message}`);
const stats = MODULES.filter((m) => !filter.length || filter.includes(m.id)).map((m) => {
  const lessons = m.lessons.length;
  const q = m.lessons.reduce((n, l) => n + l.quiz.length, 0) + m.exam.length;
  const f = m.lessons.reduce((n, l) => n + l.flashcards.length, 0);
  return `${m.id}${m.draft ? " (draft)" : ""}: ${lessons} lessons, ${q} questions, ${f} cards, ${m.glossary.length} terms, ${m.formulas.length} formulas`;
});
console.log(stats.join("\n"));
console.log(`Arabic: ${arModules.map((m) => m.id).join(", ") || "none yet"}`);
console.log(issues.length ? `\n${issues.length} issue(s)` : "\n✓ content valid");
process.exit(issues.length ? 1 : 0);
