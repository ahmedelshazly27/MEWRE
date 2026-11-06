/**
 * Derived lookups over the static curriculum. Server-side only (imports all content).
 */
import { MODULES } from "@/content";
import { MODULES_AR } from "@/content/ar";
import { KEY_CONCEPTS } from "@/content/key";
import { ALL_MODULES, TRACKS, getTrack, trackOfModule, type Track, type TrackId } from "@/content/tracks";
import type { Lang } from "@/lib/i18n";
import type { Concept, Flashcard, Formula, GlossaryTerm, KeyConcept, Lesson, Module, Question, Reference, Scenario } from "@/content/schema";

/** Recommended study order (job relevance), see CURRICULUM.md. */
export const STUDY_ORDER = ["m00", "m01", "m08", "m09", "m10", "m07", "m02", "m05", "m06", "m11", "m13", "m14", "m12", "m03", "m04", "m15"];

/** Track 0 (MEWRE PM) modules. */
export const modules: Module[] = MODULES;
const AR_MODULES: Module[] = MODULES.map((m) => MODULES_AR[m.id] ?? m);
/** Track 0 modules in a language; untranslated modules fall back to English. */
export const modulesFor = (lang: Lang = "en"): Module[] => (lang === "ar" ? AR_MODULES : MODULES);
/** Every module across tracks. Only Track 0 has Arabic; other tracks stay English in Arabic mode. */
export const allModulesFor = (lang: Lang = "en"): Module[] => (lang === "ar" ? [...AR_MODULES, ...ALL_MODULES.filter((m) => trackOfModule(m.id) !== "mewre")] : ALL_MODULES);
const isLive = (m: Module) => !m.draft && m.lessons.length > 0;
/**
 * Live modules. English pages cover every track; Arabic pages exist only for Track 0.
 * Pass a track id to restrict.
 */
export function liveModules(lang: Lang = "en", track?: TrackId): Module[] {
  const scope = track ?? (lang === "ar" ? "mewre" : undefined);
  return allModulesFor(lang).filter((m) => isLive(m) && (!scope || trackOfModule(m.id) === scope));
}
export { TRACKS, getTrack, trackOfModule };
export type { Track, TrackId };
/** A track's modules in a language, in study order. */
export function trackModules(track: Track, lang: Lang = "en"): Module[] {
  const pool = track.id === "mewre" ? modulesFor(lang) : track.modules;
  return [...pool].sort((a, b) => track.studyOrder.indexOf(a.id) - track.studyOrder.indexOf(b.id));
}
export const isTranslated = (moduleId: string): boolean => !!MODULES_AR[moduleId];

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
  kind: "lesson" | "glossary" | "formula" | "key";
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
  /** Must-know concepts in module study order. */
  keyConcepts: Map<string, { concept: KeyConcept; module: Module }>;
}

function inlineQuestions(lesson: Lesson): Question[] {
  const out: Question[] = [];
  for (const s of lesson.sections) for (const b of s.blocks) if (b.kind === "question") out.push(b.question);
  return out;
}

function build(lang: Lang): Index {
  const ar = lang === "ar";
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
    keyConcepts: new Map(),
  };
  // tracks in order, modules in each track's recommended order
  const ordered = TRACKS.flatMap((t) => trackModules(t, lang));
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
        front: ar ? `معادلة: **${f.name}** — اكتبها وعرّف كل رمز.` : `Formula: **${f.name}** — write it and define each symbol.`,
        back: `$$${f.tex}$$\n\n${f.vars.map((v) => `- $${v.sym}$ — ${v.meaning}${v.unit ? ` [${v.unit}]` : ""}`).join("\n")}`,
        lessonId: f.lesson,
        moduleId: mod.id,
        concepts: conceptIds,
      });
      idx.cardOrder.push(id);
    }
    for (const k of KEY_CONCEPTS[mod.id]?.[lang] ?? []) {
      idx.keyConcepts.set(k.id, { concept: k, module: mod });
      const id = `kc-${k.id}`;
      idx.cards.set(id, {
        id,
        kind: "key",
        front: ar ? `**اشرحه:** ${k.termAr} (${k.term}) — ما هو، ولماذا يهم؟` : `**Explain it:** ${k.term} — what is it, and why does it matter?`,
        back: `${k.definition}

${k.explain}

**${ar ? "لماذا يهم" : "Why it matters"}:** ${k.why}`,
        lessonId: k.lesson,
        moduleId: mod.id,
        concepts: idx.lessons.get(k.lesson)?.lesson.concepts.map((c) => c.id).slice(0, 1),
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
        front: ar ? `المصطلح: **${g.en}** — ما المقابل العربي وما معناه؟` : `Term: **${g.en}** — Arabic term and meaning?`,
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

const cached: Partial<Record<Lang, Index>> = {};
export function index(lang: Lang = "en"): Index {
  if (!cached[lang] || process.env.NODE_ENV === "development") cached[lang] = build(lang);
  return cached[lang]!;
}

export const getModule = (id: string, lang: Lang = "en") => allModulesFor(lang).find((m) => m.id === id);
export const getLesson = (id: string, lang: Lang = "en") => index(lang).lessons.get(id);
export const getQuestion = (id: string, lang: Lang = "en") => index(lang).questions.get(id);
export const getCard = (id: string, lang: Lang = "en") => index(lang).cards.get(id);
export const getConcept = (id: string, lang: Lang = "en") => index(lang).concepts.get(id);
export const getScenario = (id: string, lang: Lang = "en") => index(lang).scenarios.get(id);

/** Lessons in recommended study order across live modules. */
export function lessonsInOrder(lang: Lang = "en"): LessonRef[] {
  return [...index(lang).lessons.values()].filter((r) => !r.module.draft);
}

export function lessonQuestions(lessonId: string, lang: Lang = "en"): Question[] {
  return getLesson(lessonId, lang)?.lesson.quiz ?? [];
}

/** All questions answerable in mixed practice (quiz + exam + inline), optionally limited to modules. */
export function questionPool(filter?: (r: QuestionRef) => boolean, lang: Lang = "en"): QuestionRef[] {
  return [...index(lang).questions.values()].filter((r) => !r.module.draft && (!filter || filter(r)));
}

/** Card ids unlocked by a set of completed lessons, in curriculum order. */
export function unlockedCards(completedLessons: Set<string>): string[] {
  const idx = index();
  return idx.cardOrder.filter((id) => completedLessons.has(idx.cards.get(id)!.lessonId));
}

export function allConcepts(lang: Lang = "en") {
  return [...index(lang).concepts.values()].filter((c) => !c.module.draft);
}

export function lessonNeighbours(lessonId: string, lang: Lang = "en"): { prev?: LessonRef; next?: LessonRef } {
  const ref = getLesson(lessonId, lang);
  if (!ref) return {};
  const ls = ref.module.lessons;
  const prev = ls[ref.index - 1] ? getLesson(ls[ref.index - 1].id, lang) : undefined;
  const next = ls[ref.index + 1] ? getLesson(ls[ref.index + 1].id, lang) : undefined;
  return { prev, next };
}

/** Where a module's breadcrumb leads: the track page (English) or the Arabic curriculum. */
export function trackHome(moduleId: string, lang: Lang = "en"): { href: string; label: string } {
  if (lang === "ar") return { href: "/ar/learn", label: "المنهج" };
  const t = getTrack(trackOfModule(moduleId))!;
  return { href: `/tracks/${t.id}`, label: t.short };
}
