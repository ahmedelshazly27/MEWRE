/**
 * Checks that a translated module is structurally identical to its English source:
 * same ids, block kinds, answer keys, numeric values, scores, scenario graph, formulas (TeX),
 * references (urls). Only human-readable text may differ.
 */
import type { Block, Module, Question } from "./schema";
import type { ValidationIssue } from "./validate";

function eq(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function questionKey(q: Question) {
  switch (q.type) {
    case "mcq":
      return { id: q.id, type: q.type, n: q.options.length, answer: q.answer, concepts: q.concepts, d: q.difficulty };
    case "multi":
      return { id: q.id, type: q.type, n: q.options.length, answer: q.answer, concepts: q.concepts, d: q.difficulty };
    case "numeric":
      return { id: q.id, type: q.type, answer: q.answer, tol: q.tolerance ?? null, concepts: q.concepts, d: q.difficulty };
    case "order":
      return { id: q.id, type: q.type, n: q.items.length, concepts: q.concepts, d: q.difficulty };
    case "decision":
      return { id: q.id, type: q.type, scores: q.options.map((o) => o.score), concepts: q.concepts, d: q.difficulty };
    case "label":
      return {
        id: q.id,
        type: q.type,
        diagram: q.diagram,
        markers: q.markers.map((m) => m.id),
        // each marker's answer must point at the same option index in both languages
        answerIdx: q.markers.map((m) => q.options.indexOf(m.answer)),
        n: q.options.length,
        concepts: q.concepts,
        d: q.difficulty,
      };
    case "short":
      return { id: q.id, type: q.type, rubric: q.rubric.length, concepts: q.concepts, d: q.difficulty };
  }
}

function blockKey(b: Block): unknown {
  switch (b.kind) {
    case "equation":
      return { k: b.kind, formula: b.formula };
    case "worked":
      return { k: b.kind, mode: b.mode, steps: b.steps.map((s) => ({ hidden: !!s.hidden, check: s.check ? { a: s.check.answer, t: s.check.tolerance ?? null } : null })) };
    case "question":
      return { k: b.kind, q: questionKey(b.question) };
    case "widget":
      return { k: b.kind, widget: b.widget, props: b.props ?? null };
    case "diagram":
      return { k: b.kind, diagram: b.diagram };
    case "checklist":
    case "ask":
      return { k: b.kind, n: b.items.length };
    case "scenario":
      return { k: b.kind, scenario: b.scenario };
    case "feynman":
      return { k: b.kind, n: b.keyPoints.length };
    case "download":
      return { k: b.kind, file: b.file };
    case "sources":
      return { k: b.kind, refs: b.refs };
    case "callout":
      return { k: b.kind, tone: b.tone };
    default:
      return { k: b.kind };
  }
}

export function validateTranslation(en: Module, ar: Module): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const at = (where: string, message: string) => issues.push({ where: `${ar.id}[ar] ${where}`, message });
  if (en.id !== ar.id) at("module", `id ${ar.id} != ${en.id}`);
  if (!eq(en.competencies, ar.competencies)) at("module", "competencies differ");
  if (en.lessons.length !== ar.lessons.length) at("module", `lesson count ${ar.lessons.length} != ${en.lessons.length}`);
  en.lessons.forEach((le, i) => {
    const la = ar.lessons[i];
    if (!la) return;
    const w = la.id;
    if (le.id !== la.id) return at(w, `lesson id ${la.id} != ${le.id}`);
    if (le.minutes !== la.minutes) at(w, "minutes differ");
    if (!eq(le.concepts.map((c) => [c.id, c.competency, c.related ?? []]), la.concepts.map((c) => [c.id, c.competency, c.related ?? []]))) at(w, "concepts (ids/competency/related) differ");
    if (le.sections.length !== la.sections.length) at(w, `section count ${la.sections.length} != ${le.sections.length}`);
    le.sections.forEach((se, si) => {
      const sa = la.sections[si];
      if (!sa) return;
      if (se.layer !== sa.layer) at(`${w} s${si}`, "layer differs");
      if (se.blocks.length !== sa.blocks.length) return at(`${w} s${si}`, `block count ${sa.blocks.length} != ${se.blocks.length}`);
      se.blocks.forEach((be, bi) => {
        if (!eq(blockKey(be), blockKey(sa.blocks[bi]))) at(`${w} s${si}b${bi}`, `block structure differs (${be.kind})`);
      });
    });
    if (!eq(le.quiz.map(questionKey), la.quiz.map(questionKey))) at(w, "quiz structure/answer keys differ");
    if (!eq(le.flashcards.map((f) => [f.id, f.concepts ?? []]), la.flashcards.map((f) => [f.id, f.concepts ?? []]))) at(w, "flashcard ids differ");
    const scen = (l: typeof le) =>
      (l.scenarios ?? []).map((s) => ({
        id: s.id,
        start: s.start,
        day: !!s.dayInLife,
        concepts: s.concepts,
        nodes: Object.fromEntries(Object.entries(s.nodes).map(([k, n]) => [k, n.choices.map((c) => [c.next ?? null, c.score])])),
      }));
    if (!eq(scen(le), scen(la))) at(w, "scenario graph/scores differ");
  });
  if (!eq(en.exam.map(questionKey), ar.exam.map(questionKey))) at("exam", "exam structure/answer keys differ");
  if (!eq(en.formulas.map((f) => [f.id, f.tex, f.lesson, f.vars.map((v) => v.sym)]), ar.formulas.map((f) => [f.id, f.tex, f.lesson, f.vars.map((v) => v.sym)]))) at("formulas", "formula ids/TeX/symbols differ");
  if (!eq(en.glossary.map((g) => [g.id, g.lesson, g.category]), ar.glossary.map((g) => [g.id, g.lesson, g.category]))) at("glossary", "glossary ids differ");
  if (!eq(en.references.map((r) => [r.id, r.url]), ar.references.map((r) => [r.id, r.url]))) at("references", "reference ids/urls differ");
  if (!!en.simulation !== !!ar.simulation) at("simulation", "presence differs");
  if (en.simulation && ar.simulation) {
    const k = (s: NonNullable<Module["simulation"]>) => ({
      kpis: s.kpis.map((x) => [x.key, x.better, x.target]),
      initial: s.initial,
      stages: s.stages.map((st) => [st.id, st.decisions.map((d) => [d.id, d.concepts, d.options.map((o) => [o.score, o.effects])])]),
    });
    if (!eq(k(en.simulation), k(ar.simulation))) at("simulation", "KPIs/decisions/scores/effects differ");
  }
  return issues;
}
