import { TRACKS, allModulesFor, index, lessonsInOrder, trackModules, trackOfModule } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import type { ContentIndex } from "@/lib/content-index";

/** Builds the client-side content index for one language (shared with /data/content-ar.json). */
export function buildContentIndex(lang: Lang): ContentIndex {
  const idx = index(lang);
  const ordered = lessonsInOrder(lang);
  return {
    version: process.env.VERCEL_GIT_COMMIT_SHA || String(ordered.length),
    tracks: TRACKS.map((t) => ({
      id: t.id,
      number: t.number,
      title: t.title,
      short: t.short,
      icon: t.icon,
      readinessLabel: t.readinessLabel,
      competencies: t.competencies,
      moduleIds: trackModules(t, lang).map((m) => m.id),
      phase: t.phase,
    })),
    modules: allModulesFor(lang).map((m) => ({ id: m.id, track: trackOfModule(m.id), number: m.number, title: m.title, draft: !!m.draft, lessonIds: m.lessons.map((l) => l.id), estimatedHours: m.estimatedHours })),
    lessons: ordered.map((r) => ({
      id: r.lesson.id,
      track: trackOfModule(r.module.id),
      moduleId: r.module.id,
      moduleNumber: r.module.number,
      moduleTitle: r.module.title,
      title: r.lesson.title,
      summary: r.lesson.summary,
      index: r.index,
      conceptIds: r.lesson.concepts.map((c) => c.id),
    })),
    concepts: Object.fromEntries(
      [...idx.concepts.values()].filter((c) => !c.module.draft).map((c) => [c.concept.id, { name: c.concept.name, description: c.concept.description, competency: c.concept.competency, lessonId: c.lesson.id, moduleId: c.module.id }]),
    ),
    questions: Object.fromEntries(
      [...idx.questions.values()].filter((r) => !r.module.draft).map((r) => [r.question.id, { question: r.question, moduleId: r.module.id, lessonId: r.lesson?.id, origin: r.origin }]),
    ),
    cards: Object.fromEntries(
      [...idx.cards.values()].map((c) => [c.id, { front: c.front, back: c.back, ar: c.ar, kind: c.kind, lessonId: c.lessonId, moduleId: c.moduleId, concepts: c.concepts }]),
    ),
    cardOrder: idx.cardOrder.map((id) => ({ id, lessonId: idx.cards.get(id)!.lessonId })),
  };
}
