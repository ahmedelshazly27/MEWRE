import type { Lesson, Module } from "../schema";
import { validateModules, type ValidationIssue } from "../validate";
import { WIDGETS } from "../widgets";
import type { Explainer } from "./schema";

/**
 * Validates explainers by wrapping them as lessons of a pseudo-module and running the normal module validator
 * against Track 0 (so concept ids, formula ids, widgets, KaTeX and question shapes are all checked), plus
 * explainer-specific rules.
 */
export function validateExplainers(explainers: Explainer[], track0: Module[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lessonIds = new Set(track0.flatMap((m) => m.lessons.map((l) => l.id)));
  const moduleIds = new Set(track0.map((m) => m.id));
  const seen = new Set<string>();
  for (const e of explainers) {
    const at = (message: string) => issues.push({ where: `trial ${e.id}`, message });
    if (!/^x-[a-z0-9-]+$/.test(e.id)) at("id must look like x-some-topic");
    if (seen.has(e.id)) at("duplicate id");
    seen.add(e.id);
    if (e.day < 1 || e.day > 7) at("day must be 1..7");
    if (!moduleIds.has(e.module)) at(`unknown module ${e.module}`);
    if (e.minutes < 5 || e.minutes > 20) at("minutes must be 5..20");
    if (!e.hook.trim()) at("missing hook");
    if (e.say.length < 3) at("say needs at least 3 phrases");
    if (!e.trap.trim()) at("missing trap");
    if (e.check.length !== 3) at("check needs exactly 3 questions");
    if (!e.check.every((q) => q.id.startsWith(`${e.id}-c`))) at("check question ids must start with the explainer id + -c");
    if (!e.deeper.length) at("deeper needs at least one Track 0 lesson");
    for (const l of e.deeper) if (!lessonIds.has(l)) at(`deeper: unknown lesson ${l}`);
    const visual = e.blocks.some((b) => ["widget", "diagram", "chart", "flow", "matrix"].includes(b.kind));
    if (!visual) at("needs at least one visual (widget, diagram, chart, flow or matrix)");
    for (const b of e.blocks) if (b.kind === "widget" && !(b.widget in WIDGETS)) at(`unknown widget ${b.widget}`);
    const text = JSON.stringify(e);
    if (text.includes("—")) at("contains an em dash");
  }
  const pseudo: Module = {
    id: "trial",
    number: 99,
    title: "Trial explainers",
    titleAr: "",
    summary: "",
    whyItMatters: "",
    competencies: [],
    prerequisites: [],
    estimatedHours: 0,
    lessons: explainers.map(
      (e): Lesson => ({ id: e.id, title: e.title, summary: e.hook, minutes: e.minutes, objectives: [], concepts: [], sections: [{ title: e.title, layer: "theory", blocks: e.blocks }], quiz: e.check, flashcards: [] }),
    ),
    exam: [],
    glossary: [],
    formulas: [],
    references: [],
    cheatSheet: "",
  } as unknown as Module;
  const all = validateModules([...track0, pseudo]);
  // lesson-shape rules (layers, quiz length, flashcards, id prefix) do not apply to explainers
  const lessonShape = /lesson id must start|missing (theory|applied|field) layer|quiz has \d+ questions|flashcards|objectives|no concepts defined|summary/;
  for (const i of all) if ((i.where.includes("trial") || explainers.some((e) => i.where.includes(e.id))) && !lessonShape.test(i.message)) issues.push(i);
  return issues;
}
