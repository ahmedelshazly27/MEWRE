/**
 * Derived lookups over the static curriculum. Server-side only (imports all content).
 */
import { MODULES } from "@/content";
import type { Concept, Flashcard, Formula, GlossaryTerm, Lesson, Module, Question, Reference, Scenario } from "@/content/schema";

/** Recommended study order (job relevance), see CURRICULUM.md. */
export const STUDY_ORDER = ["m00", "m01", "m08", "m09", "m10", "m07", "m02", "m05", "m06", "m11", "m13", "m14", "m12", "m03", "m04", "m15"];

export const modules: Module[] = MODULES;
export const liveModules = (): Module[] => MODULES.filter((m) => !m.draft && m.lessons.length > 0);

export interface LessonRef {
  module: Module;
  lesson: Lesson;
  index: number;
}

export type QuestionOrigin = "quiz" | "inline" | "exam";

export interface QuestionRef {
  question: Question;
  module: Module;
  lesson?: Lesson;
  origin: QuestionOrigin;
}

/** Content-side card (lesson flashcard, glossary term or formula). */
export interface CardContent extends Flashcard {
  kind: "lesson" | "glossary" | "formula";
  lessonId: string;
  moduleId: string;
  /** For glossary cards: render Arabic RTL. */
  ar?: string;
}

interface Index {
  lessons: Map<string, LessonRef>;
  questions: Map<string, QuestionRef>;
  concepts: Map<string, { concept: Concept; lesson: Lesson; module: Module }>;
  cards: Map<string, CardContent>;
  cardOrder: string[];
  scenarios: Map<string, { scenario: Scenario; lesson: Lesson; module: Module }>;
  formulas: Map<string, Formula>;
  references: Map<string, Reference & { moduleId: string }>;
  glossary: (GlossaryTerm & { moduleId: string })[];
}

function inlineQuestions(lesson: Lesson): Question[] {
  const out: Question[] = [];
  for (const s of lesson.sections) for (const b of s.blocks) if (b.kind === "question") out.push(b.question);
  return out;
}

function build(): Index {
  const idx: Index = {
    lessons: new Map(),
    questions: new Map(),
    concepts: new Map(),
    cards: new Map(),
    cardOrder: [],
    scenarios: new Map(),
    formulas: new Map(),
    references: new Map(),
    glossary: [],
  };
  const ordered = [...MODULES].sort((a, b) => STUDY_ORDER.indexOf(a.id) - STUDY_ORDER.indexOf(b.id));
  for (const mod of ordered) {
    mod.lessons.forEach((lesson, index) => {
      idx.lessons.set(lesson.id, { module: mod, lesson, index });
      for (const c of lesson.concepts) idx.concepts.set(c.id, { concept: c, lesson, module: mod });
      for (const q of lesson.quiz) idx.questions.set(q.id, { question: q, module: mod, lesson, origin: "quiz" });
      for (const q of inlineQuestions(lesson)) idx.questions.set(q.id, { question: q, module: mod, lesson, origin: "inline" });
      for (const s of lesson.scenarios ?? []) idx.scenarios.set(s.id, { scenario: s, lesson, module: mod });
      for (const f of lesson.flashcards) {
        const card: CardContent = { ...f, kind: "lesson", lessonId: lesson.id, moduleId: mod.id };
        idx.cards.set(f.id, card);
        idx.cardOrder.push(f.id);
      }
    });
    for (const q of mod.exam) idx.questions.set(q.id, { question: q, module: mod, origin: "exam" });
    for (const f of mod.formulas) {
      idx.formulas.set(f.id, f);
      const id = `fx-${f.id}`;
      const conceptIds = idx.lessons.get(f.lesson)?.lesson.concepts.map((c) => c.id).slice(0, 1);
      idx.cards.set(id, {
        id,
        kind: "formula",
        front: `Formula: **${f.name}** — write it and define each symbol.`,
        back: `$$${f.tex}$$\n\n${f.vars.map((v) => `- $${v.sym}$ — ${v.meaning}${v.unit ? ` [${v.unit}]` : ""}`).join("\n")}`,
        lessonId: f.lesson,
        moduleId: mod.id,
        concepts: conceptIds,
      });
      idx.cardOrder.push(id);
    }
    for (const r of mod.references) idx.references.set(r.id, { ...r, moduleId: mod.id });
    for (const g of mod.glossary) {
      idx.glossary.push({ ...g, moduleId: mod.id });
      const id = `gl-${g.id}`;
      idx.cards.set(id, {
        id,
        kind: "glossary",
        front: `Term: **${g.en}** — Arabic term and meaning?`,
        back: `${g.definition}`,
        ar: g.ar,
        lessonId: g.lesson,
        moduleId: mod.id,
      });
      idx.cardOrder.push(id);
    }
  }
  idx.glossary.sort((a, b) => a.en.localeCompare(b.en));
  return idx;
}

let cached: Index | null = null;
export function index(): Index {
  if (!cached || process.env.NODE_ENV === "development") cached = build();
  return cached;
}

export const getModule = (id: string) => MODULES.find((m) => m.id === id);
export const getLesson = (id: string) => index().lessons.get(id);
export const getQuestion = (id: string) => index().questions.get(id);
export const getCard = (id: string) => index().cards.get(id);
export const getConcept = (id: string) => index().concepts.get(id);
export const getScenario = (id: string) => index().scenarios.get(id);

/** Lessons in recommended study order across live modules. */
export function lessonsInOrder(): LessonRef[] {
  return [...index().lessons.values()].filter((r) => !r.module.draft);
}

export function lessonQuestions(lessonId: string): Question[] {
  return getLesson(lessonId)?.lesson.quiz ?? [];
}

/** All questions answerable in mixed practice (quiz + exam + inline), optionally limited to modules. */
export function questionPool(filter?: (r: QuestionRef) => boolean): QuestionRef[] {
  return [...index().questions.values()].filter((r) => !r.module.draft && (!filter || filter(r)));
}

/** Card ids unlocked by a set of completed lessons, in curriculum order. */
export function unlockedCards(completedLessons: Set<string>): string[] {
  const idx = index();
  return idx.cardOrder.filter((id) => completedLessons.has(idx.cards.get(id)!.lessonId));
}

export function allConcepts() {
  return [...index().concepts.values()].filter((c) => !c.module.draft);
}

export function lessonNeighbours(lessonId: string): { prev?: LessonRef; next?: LessonRef } {
  const ref = getLesson(lessonId);
  if (!ref) return {};
  const ls = ref.module.lessons;
  const prev = ls[ref.index - 1] ? getLesson(ls[ref.index - 1].id) : undefined;
  const next = ls[ref.index + 1] ? getLesson(ls[ref.index + 1].id) : undefined;
  return { prev, next };
}
