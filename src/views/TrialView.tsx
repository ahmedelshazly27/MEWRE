import Link from "next/link";
import { notFound } from "next/navigation";
import { KEY_CONCEPTS } from "@/content/key";
import { EXAM_MIN, PLAYBOOK } from "@/content/crash";
import { PLAN_ORDER, REVIEW_MIN, SELFTEST_MIN, TRIAL_DAYS, TRIAL_START, getExplainer, planSlot } from "@/content/trial";
import type { Lesson } from "@/content/schema";
import { getLesson, getModule } from "@/lib/content";
import { BlockRenderer } from "@/components/lesson/BlockRenderer";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { Markdown } from "@/components/Markdown";
import { Card, PageHeader } from "@/components/ui";
import { TrialPlan, type TrialDayDto } from "@/components/trial/TrialPlan";
import { OfflinePanel } from "@/components/OfflinePanel";

/** The 7-day trial plan: plain-language explainers, daily review, must-know self-tests, playbook and rehearsal. */
export function TrialView() {
  const days: TrialDayDto[] = TRIAL_DAYS.map((d) => ({
    ...d,
    explainers: d.core.flatMap((id) => {
      const e = getExplainer(id);
      return e ? [{ id: e.id, title: e.title, minutes: e.minutes }] : [];
    }),
    extra: d.optional.flatMap((id) => {
      const e = getExplainer(id);
      return e ? [{ id: e.id, title: e.title, minutes: e.minutes }] : [];
    }),
    concepts: d.modules.flatMap((m) => (KEY_CONCEPTS[m]?.en ?? []).filter((k) => k.tier === 1).map((k) => ({ id: k.id, module: m }))),
    playbook: d.playbook.map((id) => ({ id, title: PLAYBOOK.find((p) => p.id === id)?.title.en ?? id })),
    moduleTitles: d.modules.map((m) => ({ id: m, title: getModule(m, "en")?.title ?? m })),
  }));
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Trial week: 4 days, 2 to 3 hours a day"
        subtitle="Intuition first, then the numbers and words you will hear at MEWRE. Short explainers with a picture, an analogy and three quick questions; theory waits until after you start."
      />
      <Card className="mb-6">
        <h2 className="mb-2 font-semibold">Studying on the plane? Download it first</h2>
        <p className="mb-3 text-sm">
          <a href="/downloads/mewre-crash-course-days-2-4.pdf" download className="font-medium text-accent">
            Crash course, Days 2 to 4 (PDF, 74 pages, about 3 hours)
          </a>
          : Kuwait&apos;s power sector and its actors, PV, CSP, wind and BESS, grid connection (SCR, inverter clamping, EMT studies), delivery, contracts, finance and procurement, written as one course with worked examples, self-checks and answers. Then the{" "}
          <a href="/downloads/mewre-cheat-sheets.pdf" download className="font-medium text-accent">
            reference pack (PDF, 23 pages)
          </a>{" "}
          to revise every term, equation, number and actor.
        </p>
        <OfflinePanel compact />
      </Card>
      <TrialPlan days={days} trialStart={TRIAL_START} reviewMin={REVIEW_MIN} selftestMin={SELFTEST_MIN} examMin={EXAM_MIN} />
      <Card className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">How to study each explainer (no copying)</h2>
        <ol className="ms-5 list-decimal space-y-1 text-sm">
          <li>Read one section. Do not write anything yet.</li>
          <li>Look away and say it out loud in two or three sentences, as if to a colleague.</li>
          <li>Check against the text. Only what you missed is worth a line in My notes.</li>
          <li>Play with the visual until the &quot;what to notice&quot; line makes sense.</li>
          <li>Answer the three questions. Wrong answers come back in tomorrow&apos;s review: that is the point.</li>
        </ol>
        <p className="mt-2 text-sm text-muted">25 minutes on, 5 off. Start every day with the review queue; it replaces rereading notes.</p>
      </Card>
    </div>
  );
}

export function ExplainerView({ id }: { id: string }) {
  const e = getExplainer(id);
  if (!e) notFound();
  const slot = planSlot(e.id) ?? { day: 1, core: false };
  const day = TRIAL_DAYS.find((d) => d.day === slot.day)!;
  const list = slot.core ? day.core : day.optional;
  const i = list.indexOf(e.id);
  const pos = PLAN_ORDER.indexOf(e.id);
  const prev = pos > 0 ? getExplainer(PLAN_ORDER[pos - 1]) : undefined;
  const next = pos >= 0 ? getExplainer(PLAN_ORDER[pos + 1]) : undefined;
  const nextSlot = next ? planSlot(next.id) : undefined;
  // BlockRenderer needs a lesson for scenario/formula lookups; explainers use neither, so a shell is enough.
  const shell = { id: e.id, title: e.title, summary: e.hook, minutes: e.minutes, objectives: [], concepts: [], sections: [], quiz: [], flashcards: [] } as unknown as Lesson;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-2 text-sm text-muted">
        <Link href="/trial" className="text-accent">
          Trial week
        </Link>{" "}
        · Day {slot.day}: {day.title} · {slot.core ? `${i + 1} of ${list.length}` : "if you have time"} · {e.minutes} min
      </div>
      <PageHeader title={e.title} />
      <div className="mb-6 rounded-xl border border-accent/30 bg-accent-soft/40 p-4 text-sm">
        <div className="mb-1 font-semibold text-accent">Why you care at MEWRE</div>
        {e.hook}
      </div>
      <div className="prose-lesson space-y-5">
        {e.blocks.map((b, bi) => (
          <BlockRenderer key={bi} block={b} lesson={shell} blockKey={`x${bi}`} lang="en" />
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="mb-2 font-semibold">Say it at MEWRE</h2>
        <ul className="ms-5 list-disc space-y-1 text-sm">
          {e.say.map((s, k) => (
            <li key={k}>{s}</li>
          ))}
        </ul>
      </Card>
      <div className="mt-4 rounded-xl border border-danger/30 bg-danger-soft/40 p-4 text-sm">
        <div className="mb-1 font-semibold text-danger">The classic trap</div>
        <Markdown className="prose-compact">{e.trap}</Markdown>
      </div>
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Three quick questions</h2>
        <QuizRunner questions={e.check} source="quiz" kind="explainer" refId={e.id} title={`${e.title}: check`} />
      </section>
      {e.deeper.length > 0 && (
        <Card className="mt-6">
          <h2 className="mb-1 font-semibold">After the trial: go deeper</h2>
          <ul className="space-y-1 text-sm">
            {e.deeper.map((l) => {
              const ref = getLesson(l, "en");
              return ref ? (
                <li key={l}>
                  <Link href={`/learn/${ref.module.id}/${l}`} className="text-accent">
                    M{ref.module.number} · {ref.lesson.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </Card>
      )}
      <nav className="mt-8 flex flex-wrap justify-between gap-3 text-sm">
        {prev ? (
          <Link href={`/trial/${prev.id}`} className="text-accent">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/trial/${next.id}`} className="text-end text-accent">
            {nextSlot && nextSlot.day !== slot.day ? `Day ${nextSlot.day}: ` : ""}
            {next.title} →
          </Link>
        ) : (
          <Link href="/trial" className="text-accent">
            Back to the plan →
          </Link>
        )}
      </nav>
    </div>
  );
}
