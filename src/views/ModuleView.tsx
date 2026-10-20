import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, isTranslated } from "@/lib/content";
import { lp, t, type Lang } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";
import { Widget } from "@/components/widgets";
import { BestScore, ConceptBadge, LessonIcon, LessonPills } from "@/components/progress";
import { ContinueLink } from "@/components/ContinueLink";
import { Button, Card, PageHeader, Pill } from "@/components/ui";
import { UntranslatedNote } from "./UntranslatedNote";

export const moduleTitle = (moduleId: string, lang: Lang) => getModule(moduleId, lang)?.title ?? t(lang, "Module");

export function ModuleView({ moduleId, lang }: { moduleId: string; lang: Lang }) {
  const m = getModule(moduleId, lang);
  if (!m || m.draft) notFound();
  const lessonIds = m.lessons.map((l) => l.id);
  const L = (p: string) => lp(lang, p);

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href={L("/learn")} className="hover:text-text">
          {t(lang, "Curriculum")}
        </Link>
      </nav>
      {lang === "ar" && !isTranslated(m.id) && <UntranslatedNote />}
      <PageHeader title={`M${m.number} · ${m.title}`} subtitle={m.summary}>
        <div className="flex gap-2">
          <ContinueLink moduleId={m.id} lessonIds={lessonIds} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:text-black">
            {t(lang, "Continue")}
          </ContinueLink>
          <Button href={L(`/print/${m.id}`)} variant="ghost">
            {t(lang, "Cheat sheet")}
          </Button>
        </div>
      </PageHeader>
      {m.whyItMatters && (
        <Card className="mb-6 border-accent/40 bg-accent-soft/30">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">{t(lang, "Why this matters for a MEWRE PM")}</div>
          <Markdown className="prose-lesson prose-compact">{m.whyItMatters}</Markdown>
        </Card>
      )}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-3">
          {m.lessons.map((l, i) => (
            <Link key={l.id} href={L(`/learn/${m.id}/${l.id}`)} className="block rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
              <div className="flex items-start gap-3">
                <LessonIcon lessonId={l.id} index={i} />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{l.title}</div>
                  <div className="mt-0.5 text-sm text-muted">{l.summary}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    <Pill>{t(lang, "{n} min", { n: l.minutes })}</Pill>
                    <Pill>{t(lang, "{n} quiz Qs", { n: l.quiz.length })}</Pill>
                    <Pill>{t(lang, "{n} cards", { n: l.flashcards.length })}</Pill>
                    <LessonPills lessonId={l.id} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link href={L(`/learn/${m.id}/exam`)} className="block rounded-xl border border-dashed border-accent/60 bg-surface p-4 hover:bg-accent-soft/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{t(lang, "Module exam")}</div>
                <div className="text-sm text-muted">{t(lang, "Integrative questions across all lessons, feedback at the end.")}</div>
              </div>
              <BestScore kind="exam" refId={m.id} label={t(lang, "Best")} empty={t(lang, "Not taken")} />
            </div>
          </Link>
        </div>
        <aside className="min-w-0 space-y-4">
          <Card>
            <div className="mb-2 font-semibold">{t(lang, "Concept mastery")}</div>
            <ul className="space-y-1.5 text-sm">
              {m.lessons
                .flatMap((l) => l.concepts)
                .map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate" title={c.description}>
                      {c.name}
                    </span>
                    <ConceptBadge conceptId={c.id} />
                  </li>
                ))}
            </ul>
          </Card>
          <Card>
            <div className="mb-2 font-semibold">{t(lang, "Module at a glance")}</div>
            <ul className="space-y-1 text-sm text-muted">
              <li>{t(lang, "~{n} hours", { n: m.estimatedHours })}</li>
              <li>{t(lang, "{n} glossary terms", { n: m.glossary.length })}</li>
              <li>{t(lang, "{n} formulas", { n: m.formulas.length })}</li>
              <li>{t(lang, "{n} references", { n: m.references.length })}</li>
            </ul>
          </Card>
        </aside>
      </div>
      <div className="mt-8" dir="ltr">
        <h2 className="mb-3 text-lg font-semibold" dir={lang === "ar" ? "rtl" : undefined}>
          {t(lang, "How the concepts connect")}
        </h2>
        <Widget id="concept-map" props={{ module: m.id }} />
      </div>
    </div>
  );
}
