/**
 * Content schema for the MEWRE PM learning platform.
 *
 * All curriculum content (modules, lessons, questions, flashcards, glossary,
 * formulas, references, scenarios, simulations) is authored as typed TS objects
 * in src/content/modules/mXX/. Markdown strings support GFM + KaTeX math
 * ($inline$ and $$display$$). Author markdown with the `md` tag (String.raw) so
 * LaTeX backslashes survive: md`$P = \sqrt{3} V_L I_L \cos\varphi$`.
 */
import type { WidgetId, DiagramId } from "./widgets";

export const md = String.raw;

/** Competencies feed the job-readiness score. */
export const COMPETENCIES = {
  context: "Kuwait sector & institutions",
  engineering: "Power engineering fundamentals",
  solar: "Solar PV & CSP technology",
  "wind-storage": "Wind & energy storage",
  grid: "Grid integration",
  delivery: "Project lifecycle & delivery",
  controls: "Schedule & cost control",
  risk: "Risk, quality & HSE",
  contracts: "Contracts & commercial",
  finance: "Finance & economics",
  procurement: "Public procurement",
  operations: "Operations & asset performance",
  leadership: "Leadership & communication",
  ai: "AI-native project management",
} as const;
export type CompetencyId = keyof typeof COMPETENCIES;

export type Layer = "theory" | "applied" | "field";
export type Difficulty = 1 | 2 | 3;

export interface Concept {
  /** Globally unique, prefixed with module id: "m01.power-factor" */
  id: string;
  name: string;
  description: string;
  competency: CompetencyId;
  /** Related concept ids (any module) — used to draw the concept map. */
  related?: string[];
}

// ---------------------------------------------------------------- Questions

interface QuestionBase {
  /** Globally unique: "m01-l02-q3" (lesson quiz) or "m01-x-q4" (module exam). */
  id: string;
  /** Markdown. */
  prompt: string;
  /** Markdown, shown after answering. Explain the WHY, show working for numerics. */
  explanation: string;
  /** Concept ids this question evidences (>=1). */
  concepts: string[];
  difficulty: Difficulty;
  /** Include in the start-of-course diagnostic test. */
  diagnostic?: boolean;
}

export interface McqQuestion extends QuestionBase {
  type: "mcq";
  options: string[];
  /** Index into options. */
  answer: number;
}

export interface MultiQuestion extends QuestionBase {
  type: "multi";
  options: string[];
  /** Indices of ALL correct options. */
  answer: number[];
}

export interface NumericQuestion extends QuestionBase {
  type: "numeric";
  answer: number;
  /** Default { rel: 0.02 } (±2 %). abs and rel combine as max(abs, rel*|answer|). */
  tolerance?: { abs?: number; rel?: number };
  unit?: string;
}

export interface OrderQuestion extends QuestionBase {
  type: "order";
  /** Items in the CORRECT order; UI shuffles them. */
  items: string[];
}

export interface DecisionQuestion extends QuestionBase {
  type: "decision";
  /** "You are the PM..." style. Partial credit per option. */
  options: { text: string; score: number /* 0..1 */; feedback: string }[];
}

export interface LabelQuestion extends QuestionBase {
  type: "label";
  diagram: DiagramId;
  /** Marker ids must exist on the diagram (see DIAGRAM_MARKERS in widgets.ts). */
  markers: { id: string; answer: string }[];
  /** Label choices (should include every answer, may include distractors). */
  options: string[];
}

export interface ShortQuestion extends QuestionBase {
  type: "short";
  /** Points a good answer must hit; used by the AI grader and for self-grading. */
  rubric: string[];
  modelAnswer: string;
}

export type Question =
  | McqQuestion
  | MultiQuestion
  | NumericQuestion
  | OrderQuestion
  | DecisionQuestion
  | LabelQuestion
  | ShortQuestion;

export type QuestionType = Question["type"];

// ---------------------------------------------------------------- Blocks

export type CalloutTone =
  | "why" // the underlying reason
  | "pm" // what a PM must check
  | "pitfall" // what typically goes wrong
  | "kuwait" // Kuwait-specific fact (must cite)
  | "unverified" // flagged claim that could not be verified
  | "tip"
  | "ai"; // how to use AI here

export interface NumericCheck {
  prompt: string;
  answer: number;
  tolerance?: { abs?: number; rel?: number };
  unit?: string;
}

export type Block =
  | { kind: "md"; md: string }
  | { kind: "callout"; tone: CalloutTone; title?: string; md: string }
  /** Renders a formula from the formula registry (tex + variables + explanation). */
  | { kind: "equation"; formula: string }
  | {
      kind: "worked";
      title: string;
      /** worked = all steps visible; faded = steps with hidden:true must be attempted. */
      mode: "worked" | "faded";
      given: string;
      steps: { md: string; hidden?: boolean; check?: NumericCheck }[];
      result: string;
    }
  /** An independent problem embedded in the lesson (not part of the end quiz). */
  | { kind: "question"; question: Question }
  | { kind: "widget"; widget: WidgetId; props?: Record<string, unknown>; caption?: string }
  | { kind: "diagram"; diagram: DiagramId; caption?: string }
  | { kind: "checklist"; title: string; items: string[] }
  /** Questions a PM should ask the contractor/consultant. */
  | { kind: "ask"; title?: string; items: string[] }
  /** Renders a scenario defined in the lesson's `scenarios` array. */
  | { kind: "scenario"; scenario: string }
  /** Feynman check: explain in your own words; AI gives feedback against keyPoints. */
  | { kind: "feynman"; prompt: string; keyPoints: string[] }
  | { kind: "download"; file: string; title: string; description: string }
  /** Cite references by id (from the module's references array). */
  | { kind: "sources"; refs: string[] }
  /** Bilingual text pair, e.g. a memo template in English and Arabic. */
  | { kind: "bilingual"; title?: string; en: string; ar: string };

export interface Section {
  layer: Layer;
  title: string;
  blocks: Block[];
}

// ---------------------------------------------------------------- Scenarios

export interface ScenarioChoice {
  text: string;
  /** Next node id; omit to end the scenario. */
  next?: string;
  /** 0..10 quality of this choice. */
  score: number;
  feedback: string;
}

export interface ScenarioNode {
  md: string;
  choices: ScenarioChoice[];
}

/** Graded decision tree: "You are the PM. The EPC contractor reports X." */
export interface Scenario {
  /** Globally unique: "m08-s1" */
  id: string;
  title: string;
  /** Show on the "Day in the life" page. */
  dayInLife?: boolean;
  context: string;
  start: string;
  nodes: Record<string, ScenarioNode>;
  concepts: string[];
}

// ---------------------------------------------------------------- Simulation (capstone)

export interface SimKpi {
  key: string;
  label: string;
  unit: string;
  /** Which direction is good. */
  better: "higher" | "lower";
  /** Value regarded as on-target, used to score. */
  target: number;
}

export interface SimOption {
  text: string;
  /** Additive deltas to KPIs. */
  effects: Record<string, number>;
  /** 0..10 decision quality (expert judgement). */
  score: number;
  feedback: string;
}

export interface SimDecision {
  id: string;
  prompt: string;
  options: SimOption[];
  concepts: string[];
}

export interface SimStage {
  id: string;
  title: string;
  brief: string;
  decisions: SimDecision[];
}

export interface Simulation {
  id: string;
  title: string;
  intro: string;
  kpis: SimKpi[];
  initial: Record<string, number>;
  stages: SimStage[];
  debrief: string;
}

// ---------------------------------------------------------------- Registries

export interface Flashcard {
  /** Globally unique: "m01-l02-f3" */
  id: string;
  front: string;
  back: string;
  concepts?: string[];
}

export interface GlossaryTerm {
  /** Globally unique slug: "power-factor" */
  id: string;
  en: string;
  ar: string;
  /** English definition (markdown). */
  definition: string;
  /** Optional Arabic definition. */
  definitionAr?: string;
  /** Lesson where it is taught. */
  lesson: string;
  category: "technical" | "contractual" | "financial" | "pm" | "institutional";
}

export interface FormulaVar {
  sym: string; // TeX
  meaning: string;
  unit: string;
}

export interface Formula {
  /** Globally unique: "apparent-power-3ph" */
  id: string;
  name: string;
  tex: string;
  vars: FormulaVar[];
  /** Markdown: what it means, when to use it, typical values. */
  explanation: string;
  lesson: string;
}

export interface Reference {
  /** Globally unique: "irena-renewable-cost-2024" */
  id: string;
  title: string;
  publisher: string;
  /** Publication date or year, e.g. "2024-06" or "2023". */
  date: string;
  url: string;
  type: "standard" | "report" | "government" | "news" | "academic" | "guide" | "dataset" | "tool";
  note?: string;
  /** Set true when the claim relying on this source could not be fully verified. */
  unverified?: boolean;
}

export interface Lesson {
  /** "m01-l02" */
  id: string;
  title: string;
  summary: string;
  minutes: number;
  /** Learning objectives ("By the end you can..."). */
  objectives: string[];
  concepts: Concept[];
  sections: Section[];
  /** Retrieval practice after the lesson: 5–8 questions, mixed types. */
  quiz: Question[];
  flashcards: Flashcard[];
  scenarios?: Scenario[];
}

export interface Module {
  /** "m01" */
  id: string;
  number: number;
  title: string;
  titleAr: string;
  summary: string;
  /** Why a MEWRE PM needs this module. */
  whyItMatters: string;
  competencies: CompetencyId[];
  prerequisites: string[];
  estimatedHours: number;
  lessons: Lesson[];
  /** Extra module-exam questions (lesson quiz questions are also pooled). */
  exam: Question[];
  glossary: GlossaryTerm[];
  formulas: Formula[];
  references: Reference[];
  /** Printable one/two-page markdown cheat sheet. */
  cheatSheet: string;
  simulation?: Simulation;
  /** True while a module is still a placeholder. */
  draft?: boolean;
}
