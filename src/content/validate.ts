import katex from "katex";
import type { Block, Module, Question, Scenario } from "./schema";
import { WIDGETS, DIAGRAM_MARKERS } from "./widgets";

export interface ValidationIssue {
  where: string;
  message: string;
}

const MATH_DISPLAY = /\$\$([\s\S]+?)\$\$/g;
const MATH_INLINE = /(?<![\\$])\$(?!\$)((?:\\\$|[^$\n])+?)\$(?!\$)/g;

/** Extracts TeX snippets from markdown ($$...$$ and $...$). */
export function extractMath(text: string): string[] {
  const out: string[] = [];
  const withoutDisplay = text.replace(MATH_DISPLAY, (_, tex: string) => {
    out.push(tex);
    return " ";
  });
  for (const m of withoutDisplay.matchAll(MATH_INLINE)) out.push(m[1]);
  return out;
}

function checkTex(tex: string, where: string, issues: ValidationIssue[]) {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
  } catch (e) {
    issues.push({ where, message: `KaTeX error in "${tex.slice(0, 80)}": ${(e as Error).message.slice(0, 160)}` });
  }
}

function checkMd(text: string | undefined, where: string, issues: ValidationIssue[]) {
  if (text === undefined) return;
  if (typeof text !== "string") {
    issues.push({ where, message: "expected markdown string" });
    return;
  }
  if (text.includes("\\`")) issues.push({ where, message: "contains \\` (escaped backtick) — avoid inline code inside md`` strings" });
  // Odd number of unescaped $ after removing $$ pairs suggests broken math.
  const stripped = text.replace(MATH_DISPLAY, "").replace(/\\\$/g, "");
  const dollars = (stripped.match(/\$/g) || []).length;
  if (dollars % 2 === 1) issues.push({ where, message: "odd number of $ — unbalanced inline math (escape currency as \\$ or write USD)" });
  for (const tex of extractMath(text)) checkTex(tex, where, issues);
}

export function validateModules(modules: Module[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Map<string, string>();
  const unique = (kind: string, id: string, where: string) => {
    const key = `${kind}:${id}`;
    if (seen.has(key)) issues.push({ where, message: `duplicate ${kind} id "${id}" (also at ${seen.get(key)})` });
    else seen.set(key, where);
  };

  // Pass 1: collect global ids.
  const conceptIds = new Set<string>();
  const lessonIds = new Set<string>();
  const formulaIds = new Set<string>();
  const refIds = new Set<string>();
  for (const m of modules) {
    for (const f of m.formulas) formulaIds.add(f.id);
    for (const r of m.references) refIds.add(r.id);
    for (const l of m.lessons) {
      lessonIds.add(l.id);
      for (const c of l.concepts) conceptIds.add(c.id);
    }
  }

  const checkQuestion = (q: Question, where: string) => {
    const w = `${where} ${q.id}`;
    unique("question", q.id, w);
    checkMd(q.prompt, `${w}.prompt`, issues);
    checkMd(q.explanation, `${w}.explanation`, issues);
    if (!q.explanation?.trim()) issues.push({ where: w, message: "missing explanation" });
    if (!q.concepts?.length) issues.push({ where: w, message: "no concepts" });
    for (const c of q.concepts ?? []) if (!conceptIds.has(c)) issues.push({ where: w, message: `unknown concept "${c}"` });
    if (![1, 2, 3].includes(q.difficulty)) issues.push({ where: w, message: "difficulty must be 1|2|3" });
    switch (q.type) {
      case "mcq":
        if (q.options.length < 2) issues.push({ where: w, message: "mcq needs >=2 options" });
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) issues.push({ where: w, message: "mcq answer out of range" });
        q.options.forEach((o, i) => checkMd(o, `${w}.options[${i}]`, issues));
        break;
      case "multi":
        if (!q.answer.length) issues.push({ where: w, message: "multi needs >=1 answer" });
        for (const a of q.answer) if (a < 0 || a >= q.options.length) issues.push({ where: w, message: "multi answer out of range" });
        q.options.forEach((o, i) => checkMd(o, `${w}.options[${i}]`, issues));
        break;
      case "numeric":
        if (!Number.isFinite(q.answer)) issues.push({ where: w, message: "numeric answer not finite" });
        break;
      case "order":
        if (q.items.length < 3) issues.push({ where: w, message: "order needs >=3 items" });
        if (new Set(q.items).size !== q.items.length) issues.push({ where: w, message: "order items must be distinct" });
        break;
      case "decision":
        if (q.options.length < 2) issues.push({ where: w, message: "decision needs >=2 options" });
        if (q.options.some((o) => o.score < 0 || o.score > 1)) issues.push({ where: w, message: "decision scores must be 0..1" });
        if (!q.options.some((o) => o.score === 1)) issues.push({ where: w, message: "decision needs one option with score 1" });
        break;
      case "label": {
        const markers = DIAGRAM_MARKERS[q.diagram] as readonly string[] | undefined;
        if (!markers) issues.push({ where: w, message: `unknown diagram "${q.diagram}"` });
        for (const mk of q.markers) {
          if (markers && !markers.includes(mk.id)) issues.push({ where: w, message: `marker "${mk.id}" not on diagram ${q.diagram}` });
          if (!q.options.includes(mk.answer)) issues.push({ where: w, message: `label answer "${mk.answer}" not in options` });
        }
        break;
      }
      case "short":
        if (!q.rubric.length) issues.push({ where: w, message: "short needs rubric" });
        if (!q.modelAnswer?.trim()) issues.push({ where: w, message: "short needs modelAnswer" });
        break;
      default:
        issues.push({ where: w, message: `unknown question type ${(q as { type: string }).type}` });
    }
  };

  const checkScenario = (s: Scenario, where: string) => {
    const w = `${where} ${s.id}`;
    unique("scenario", s.id, w);
    checkMd(s.context, `${w}.context`, issues);
    if (!s.nodes[s.start]) issues.push({ where: w, message: `start node "${s.start}" missing` });
    for (const [nid, node] of Object.entries(s.nodes)) {
      checkMd(node.md, `${w}.${nid}`, issues);
      if (!node.choices.length) issues.push({ where: `${w}.${nid}`, message: "node has no choices" });
      for (const ch of node.choices) {
        if (ch.next && !s.nodes[ch.next]) issues.push({ where: `${w}.${nid}`, message: `next "${ch.next}" missing` });
        if (ch.score < 0 || ch.score > 10) issues.push({ where: `${w}.${nid}`, message: "choice score must be 0..10" });
        checkMd(ch.feedback, `${w}.${nid}.feedback`, issues);
      }
    }
    for (const c of s.concepts) if (!conceptIds.has(c)) issues.push({ where: w, message: `unknown concept "${c}"` });
  };

  const checkBlock = (b: Block, where: string, scenarioIds: Set<string>) => {
    switch (b.kind) {
      case "md":
        checkMd(b.md, where, issues);
        break;
      case "callout":
        checkMd(b.md, where, issues);
        break;
      case "equation":
        if (!formulaIds.has(b.formula)) issues.push({ where, message: `unknown formula "${b.formula}"` });
        break;
      case "worked":
        checkMd(b.given, `${where}.given`, issues);
        checkMd(b.result, `${where}.result`, issues);
        b.steps.forEach((s, i) => {
          checkMd(s.md, `${where}.steps[${i}]`, issues);
          if (s.check && !Number.isFinite(s.check.answer)) issues.push({ where, message: "check answer not finite" });
        });
        if (b.mode === "faded" && !b.steps.some((s) => s.hidden)) issues.push({ where, message: "faded example has no hidden steps" });
        break;
      case "question":
        checkQuestion(b.question, where);
        break;
      case "widget":
        if (!(b.widget in WIDGETS)) issues.push({ where, message: `unknown widget "${b.widget}"` });
        break;
      case "diagram":
        if (!(b.diagram in DIAGRAM_MARKERS)) issues.push({ where, message: `unknown diagram "${b.diagram}"` });
        break;
      case "checklist":
      case "ask":
        b.items.forEach((it, i) => checkMd(it, `${where}.items[${i}]`, issues));
        break;
      case "scenario":
        if (!scenarioIds.has(b.scenario)) issues.push({ where, message: `scenario "${b.scenario}" not defined in lesson` });
        break;
      case "feynman":
        if (!b.keyPoints.length) issues.push({ where, message: "feynman needs keyPoints" });
        break;
      case "download":
        break;
      case "sources":
        for (const r of b.refs) if (!refIds.has(r)) issues.push({ where, message: `unknown reference "${r}"` });
        break;
      case "bilingual":
        checkMd(b.en, where, issues);
        break;
      default:
        issues.push({ where, message: `unknown block kind ${(b as { kind: string }).kind}` });
    }
  };

  for (const m of modules) {
    const mw = m.id;
    unique("module", m.id, mw);
    checkMd(m.cheatSheet, `${mw}.cheatSheet`, issues);
    for (const f of m.formulas) {
      unique("formula", f.id, `${mw} formula`);
      checkTex(f.tex, `${mw} formula ${f.id}`, issues);
      for (const v of f.vars) checkTex(v.sym, `${mw} formula ${f.id} var`, issues);
      checkMd(f.explanation, `${mw} formula ${f.id}`, issues);
      if (!lessonIds.has(f.lesson)) issues.push({ where: `${mw} formula ${f.id}`, message: `unknown lesson "${f.lesson}"` });
    }
    for (const r of m.references) {
      unique("reference", r.id, `${mw} ref`);
      if (!/^https?:\/\//.test(r.url)) issues.push({ where: `${mw} ref ${r.id}`, message: "url must be http(s)" });
    }
    for (const g of m.glossary) {
      unique("glossary", g.id, `${mw} glossary`);
      if (!g.ar?.trim()) issues.push({ where: `${mw} glossary ${g.id}`, message: "missing Arabic term" });
      if (!lessonIds.has(g.lesson)) issues.push({ where: `${mw} glossary ${g.id}`, message: `unknown lesson "${g.lesson}"` });
      checkMd(g.definition, `${mw} glossary ${g.id}`, issues);
    }
    if (m.draft) continue;
    if (!m.lessons.length) issues.push({ where: mw, message: "non-draft module has no lessons" });
    for (const l of m.lessons) {
      const lw = `${mw}/${l.id}`;
      unique("lesson", l.id, lw);
      if (!l.id.startsWith(`${m.id}-`)) issues.push({ where: lw, message: `lesson id must start with ${m.id}-` });
      for (const c of l.concepts) {
        unique("concept", c.id, lw);
        if (!c.id.startsWith(`${m.id}.`)) issues.push({ where: lw, message: `concept id "${c.id}" must start with ${m.id}.` });
        for (const r of c.related ?? []) if (!conceptIds.has(r)) issues.push({ where: lw, message: `concept ${c.id} related to unknown "${r}"` });
      }
      const layers = new Set(l.sections.map((s) => s.layer));
      if (m.id !== "m15") for (const layer of ["theory", "applied", "field"] as const) if (!layers.has(layer)) issues.push({ where: lw, message: `missing ${layer} layer` });
      const scenarioIds = new Set((l.scenarios ?? []).map((s) => s.id));
      for (const s of l.scenarios ?? []) checkScenario(s, lw);
      l.sections.forEach((s, si) => s.blocks.forEach((b, bi) => checkBlock(b, `${lw} s${si}b${bi}(${b.kind})`, scenarioIds)));
      if (l.quiz.length < 4) issues.push({ where: lw, message: `quiz has ${l.quiz.length} questions (<4)` });
      for (const q of l.quiz) checkQuestion(q, `${lw} quiz`);
      if (l.flashcards.length < 4) issues.push({ where: lw, message: `only ${l.flashcards.length} flashcards (<4)` });
      for (const f of l.flashcards) {
        unique("flashcard", f.id, lw);
        checkMd(f.front, `${lw} ${f.id}.front`, issues);
        checkMd(f.back, `${lw} ${f.id}.back`, issues);
      }
    }
    for (const q of m.exam) checkQuestion(q, `${mw} exam`);
    if (m.simulation) {
      const sim = m.simulation;
      const keys = new Set(sim.kpis.map((k) => k.key));
      for (const st of sim.stages)
        for (const d of st.decisions) {
          for (const c of d.concepts) if (!conceptIds.has(c)) issues.push({ where: `${mw} sim ${d.id}`, message: `unknown concept "${c}"` });
          for (const o of d.options) for (const k of Object.keys(o.effects)) if (!keys.has(k)) issues.push({ where: `${mw} sim ${d.id}`, message: `unknown kpi "${k}"` });
        }
    }
  }
  return issues;
}
