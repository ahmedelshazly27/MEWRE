/* Usage: npx tsx scripts/validate-content.ts [moduleId ...]  — filters output to given modules. */
import { MODULES } from "../src/content";
import { ALL_MODULES } from "../src/content/tracks";
import { validateModules } from "../src/content/validate";
import { MODULES_AR } from "../src/content/ar";
import { validateTranslation } from "../src/content/validate-translation";
import { KEY_CONCEPTS } from "../src/content/key";
import { validateKeyConcepts } from "../src/content/key/validate";
import { validateStyle } from "../src/content/style";
import { EXPLAINERS, TRIAL_DAYS } from "../src/content/trial";
import { validateExplainers, validatePlan } from "../src/content/trial/validate";

const filter = process.argv.slice(2);
const arModules = MODULES.map((m) => MODULES_AR[m.id]).filter((m): m is NonNullable<typeof m> => !!m);
const arIssues = [
  // validate Arabic modules in the context of the full curriculum (cross-module concept links)
  ...validateModules(MODULES.map((m) => MODULES_AR[m.id] ?? m))
    .filter((i) => arModules.some((a) => i.where.startsWith(a.id)))
    .map((i) => ({ ...i, where: `${i.where} [ar]` })),
  ...arModules.flatMap((ar) => validateTranslation(MODULES.find((m) => m.id === ar.id)!, ar)),
];
const keyIssues = ALL_MODULES.flatMap((m) => (KEY_CONCEPTS[m.id] ? validateKeyConcepts(m, KEY_CONCEPTS[m.id]) : [{ where: `${m.id} key`, message: "missing key concept set" }]));
const styleIssues = ALL_MODULES.filter((m) => !/^m\d/.test(m.id)).flatMap((m) => validateStyle(m, KEY_CONCEPTS[m.id]));
// the plan check runs once every day file is written (unknown ids are expected while authors are still working)
const trialIssues = [...validateExplainers(EXPLAINERS, MODULES), ...(process.env.TRIAL_PLAN_CHECK === "0" ? [] : validatePlan(TRIAL_DAYS, EXPLAINERS).filter((i) => !i.message.startsWith("unknown explainer") || EXPLAINERS.length >= 40))];
const issues = [...validateModules(ALL_MODULES), ...arIssues, ...keyIssues, ...styleIssues, ...trialIssues].filter(
  (i) => !filter.length || filter.some((f) => i.where.startsWith(f)),
);
for (const i of issues) console.log(`✗ ${i.where}: ${i.message}`);
const stats = ALL_MODULES.filter((m) => !filter.length || filter.includes(m.id)).map((m) => {
  const lessons = m.lessons.length;
  const q = m.lessons.reduce((n, l) => n + l.quiz.length, 0) + m.exam.length;
  const f = m.lessons.reduce((n, l) => n + l.flashcards.length, 0);
  return `${m.id}${m.draft ? " (draft)" : ""}: ${lessons} lessons, ${q} questions, ${f} cards, ${m.glossary.length} terms, ${m.formulas.length} formulas`;
});
console.log(stats.join("\n"));
console.log(`Must-know concepts: ${MODULES.map((m) => `${m.id} ${KEY_CONCEPTS[m.id]?.en.length ?? 0}`).join(", ")}`);
console.log(`Trial explainers: ${EXPLAINERS.length}; 4-day plan: ${TRIAL_DAYS.map((d) => `${d.core.length}+${d.optional.length}`).join(" / ")} (core+optional)`);
console.log(`Arabic: ${arModules.map((m) => m.id).join(", ") || "none yet"}`);
console.log(issues.length ? `\n${issues.length} issue(s)` : "\n✓ content valid");
process.exit(issues.length ? 1 : 0);
