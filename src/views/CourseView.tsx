import { PLAYBOOK } from "@/content/crash";
import { TRIAL_DAYS, TRIAL_START, getExplainer, type Explainer } from "@/content/trial";
import type { Lesson, Question } from "@/content/schema";
import { BlockRenderer } from "@/components/lesson/BlockRenderer";
import { InlineMarkdown, Markdown } from "@/components/Markdown";

/**
 * The trial crash course as one printable document (A4 PDF): the core explainers of the 4-day plan in order,
 * plus the weak-grid lesson, sized for 2 to 3 hours of study. Answers sit at the end of each part.
 */

/** Lessons per part: the plan's core list, with the weak-grid lesson added after the grid-code lesson in part 3. */
function parts() {
  return TRIAL_DAYS.map((d) => {
    const ids = [...d.core];
    if (d.day === 3) ids.splice(ids.indexOf("x-grid-code-connection") + 1, 0, "x-weak-grids-ibr");
    return { day: d, lessons: ids.map((id) => getExplainer(id)).filter((e): e is Explainer => !!e) };
  });
}

/**
 * Quick lessons: printed as essentials only (the picture, one drawing, the numbers, phrases, trap and checks) so the
 * course fits 2 to 3 hours. Fundamentals and what the trial week needs first stay as full lessons.
 */
const QUICK = new Set([
  "x-transformers-voltage-levels",
  "x-csp",
  "x-testing-commissioning-cod",
  "x-schedule-critical-path",
  "x-earned-value",
  "x-risk-change-reporting",
  "x-bonds-lds",
  "x-npv-irr-lcoe",
  "x-kuwait-procurement",
]);

const VISUAL = ["widget", "chart", "flow", "matrix", "diagram"];

/** The blocks printed for a lesson: everything for full lessons; for quick ones the picture, the first drawing and the numbers. */
function printedBlocks(e: Explainer) {
  if (!QUICK.has(e.id)) return e.blocks;
  const picture = e.blocks.find((b) => b.kind === "md" && /picture first/i.test(b.md));
  const mechanism = e.blocks.find((b) => b.kind === "md" && /actually happening/i.test(b.md));
  const visual = e.blocks.find((b) => VISUAL.includes(b.kind));
  const numbers = e.blocks.filter((b) => b.kind === "callout" && /numbers/i.test(b.title ?? ""));
  return [picture, mechanism, visual, ...numbers].filter((b): b is Explainer["blocks"][number] => !!b);
}

/** Study minutes on paper: reading at ~200 words a minute, about 30 s per drawing, 1 min for the checks. */
export function paperMinutes(e: Explainer): number {
  const blocks = printedBlocks(e);
  const words = blocks.map((b) => ("md" in b && typeof b.md === "string" ? b.md : "")).join(" ").split(/\s+/).length + e.hook.split(/\s+/).length + e.trap.split(/\s+/).length;
  const visuals = blocks.filter((b) => VISUAL.includes(b.kind)).length;
  return Math.round(words / 200 + visuals * 0.5 + 1);
}

function answerOf(q: Question): string {
  switch (q.type) {
    case "mcq":
      return q.options[q.answer];
    case "numeric":
      return `${q.answer}${q.unit ? ` ${q.unit}` : ""}`;
    case "decision":
      return q.options.reduce((a, b) => (b.score > a.score ? b : a)).text;
    case "multi":
      return q.answer.map((i) => q.options[i]).join("; ");
    default:
      return "";
  }
}

function QuestionPrint({ q, n }: { q: Question; n: number }) {
  const opts = q.type === "mcq" || q.type === "multi" ? q.options : q.type === "decision" ? q.options.map((o) => o.text) : null;
  return (
    <li className="mb-2">
      <div>
        <span className="font-semibold">Q{n}. </span>
        <InlineMarkdown>{q.prompt}</InlineMarkdown>
      </div>
      {opts && (
        <ol className="ms-5 mt-1" style={{ listStyleType: "upper-alpha" }}>
          {opts.map((o, i) => (
            <li key={i}>
              <InlineMarkdown>{o}</InlineMarkdown>
            </li>
          ))}
        </ol>
      )}
      {q.type === "numeric" && <div className="mt-1 text-muted">Your answer: ________ {q.unit}</div>}
    </li>
  );
}

export function CourseView() {
  const ps = parts();
  const all = ps.flatMap((p) => p.lessons);
  const total = all.reduce((s, e) => s + paperMinutes(e), 0);
  let n = 0;
  return (
    <div className="course mx-auto max-w-3xl">
      <style>{`
        .course { font-size: 10.5pt; line-height: 1.5; }
        .course h1 { font-size: 24pt; line-height: 1.15; margin: 0 0 8px; }
        .course .part { break-before: page; }
        .course .lesson { margin-top: 28px; padding-top: 14px; border-top: 3px solid var(--accent); }
        .course .lesson-head { break-after: avoid; break-inside: avoid; }
        .course .part-cover { border: 2px solid var(--accent); border-radius: 14px; padding: 20px 22px; margin-bottom: 18px; }
        .course .box { border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; margin: 12px 0; break-inside: avoid; }
        .course .why { background: var(--accent-soft); border-color: transparent; }
        .course .trap { background: color-mix(in srgb, var(--danger) 10%, transparent); border-color: transparent; }
        .course .answers { break-before: page; }
        .course figure, .course .widget-card, .course svg, .course table, .course pre { break-inside: avoid; }
        @media print {
          .course { max-width: none; }
          .course input[type="range"], .course button, .course [role="radiogroup"] { break-inside: avoid; }
        }
        @page { size: A4; margin: 14mm 12mm 16mm 12mm; }
      `}</style>

      {/* ---------------- cover ---------------- */}
      <section>
        <div className="text-sm font-semibold uppercase tracking-wide text-accent">MEWRE Renewable Project Manager · trial crash course</div>
        <h1>From zero to your first week at MEWRE</h1>
        <p className="text-lg text-muted">
          {all.length} short lessons in 4 parts, about {Math.round(total / 15) / 4} hours on paper. Electricity from first principles, the grid, Kuwait&apos;s power sector and
          its actors, solar, CSP and batteries, grid connection, project delivery, contracts, money and how the ministry works.
        </p>
        <div className="box">
          <h2 className="mb-1 text-base font-semibold">How to study on the plane</h2>
          <ol className="ms-5 list-decimal space-y-1">
            <li>One part at a time (about 35 to 45 minutes each), then a 5 to 10 minute break: stand up, look away from the page.</li>
            <li>For every lesson: read one section, <b>look away and say it out loud</b> in two or three sentences, then check. Do not copy text.</li>
            <li>Read the drawing and its caption: the caption tells you what to notice. (On the website the same drawings are interactive.)</li>
            <li>Answer the self-check questions <b>before</b> turning to the answers at the end of the part. A wrong answer now is what makes it stick.</li>
            <li>Learn the &quot;Say it at MEWRE&quot; lines: they are what you will actually use in meetings.</li>
          </ol>
        </div>
        <div className="box">
          <h2 className="mb-1 text-base font-semibold">Contents</h2>
          {ps.map((p) => (
            <div key={p.day.day} className="mb-2">
              <div className="font-semibold">
                Part {p.day.day}: {p.day.title} <span className="font-normal text-muted">· about {p.lessons.reduce((s, e) => s + paperMinutes(e), 0)} min</span>
              </div>
              <ol className="ms-5 list-decimal text-sm">
                {p.lessons.map((e) => (
                  <li key={e.id}>
                    {e.title} <span className="text-muted">· {paperMinutes(e)} min{QUICK.has(e.id) ? " · quick" : ""}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">
          Kuwait facts come from the course&apos;s source lessons and keep their confidence: H official, M trade press, L weak source; anything marked unverified must be checked before you
          quote it. Trial starts {new Date(TRIAL_START + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}.
        </p>
      </section>

      {/* ---------------- parts ---------------- */}
      {ps.map((p) => (
        <section key={p.day.day} className="part">
          <div className="part-cover">
            <div className="text-sm font-semibold uppercase tracking-wide text-accent">Part {p.day.day} of 4</div>
            <h2 className="text-2xl font-semibold">{p.day.title}</h2>
            <p className="mt-1">
              <b>By the end you can:</b> {p.day.goal}
            </p>
            <p className="mt-1 text-sm text-muted">
              {p.lessons.length} lessons · about {p.lessons.reduce((s, e) => s + paperMinutes(e), 0)} minutes
            </p>
          </div>
          {p.lessons.map((e) => {
            n++;
            const shell = { id: e.id, title: e.title, summary: e.hook, minutes: e.minutes, objectives: [], concepts: [], sections: [], quiz: [], flashcards: [] } as unknown as Lesson;
            return (
              <article key={e.id} className={n === 1 || p.lessons[0] === e ? "" : "lesson"}>
                <div className="lesson-head">
                  <div className="text-sm text-muted">
                    Lesson {n} · Part {p.day.day} · {QUICK.has(e.id) ? "quick lesson" : "full lesson"} · about {paperMinutes(e)} min
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{e.title}</h3>
                  <div className="box why">
                    <b>Why you care at MEWRE.</b> {e.hook}
                  </div>
                </div>
                <div className="prose-lesson space-y-4">
                  {QUICK.has(e.id) && (
                    <p className="text-sm text-muted">Quick lesson: the essentials only. The full version, with more drawings and worked numbers, is on the website under Trial week.</p>
                  )}
                  {printedBlocks(e).map((b, bi) => (
                    <BlockRenderer key={bi} block={b} lesson={shell} blockKey={`c${n}b${bi}`} lang="en" />
                  ))}
                </div>
                <div className="box">
                  <b>Say it at MEWRE</b>
                  <ul className="ms-5 mt-1 list-disc">
                    {e.say.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="box trap">
                  <b>The classic trap.</b> <InlineMarkdown>{e.trap}</InlineMarkdown>
                </div>
                <div className="box">
                  <b>Check yourself</b> <span className="text-sm text-muted">(answers at the end of Part {p.day.day})</span>
                  <ol className="mt-1 list-none ps-0">
                    {e.check.map((q, i) => (
                      <QuestionPrint key={q.id} q={q} n={i + 1} />
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
          <div className="answers">
            <h2 className="mb-2 text-xl font-semibold">Answers: Part {p.day.day}</h2>
            {p.lessons.map((e) => (
              <div key={e.id} className="box">
                <div className="mb-1 font-semibold">{e.title}</div>
                <ol className="list-none ps-0">
                  {e.check.map((q, i) => (
                    <li key={q.id} className="mb-1.5">
                      <b>Q{i + 1}.</b> <InlineMarkdown>{answerOf(q)}</InlineMarkdown>
                      <div className="text-sm text-muted">
                        <Markdown className="prose-compact">{q.explanation}</Markdown>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ---------------- playbook ---------------- */}
      <section className="part">
        <div className="part-cover">
          <div className="text-sm font-semibold uppercase tracking-wide text-accent">Before you land</div>
          <h2 className="text-2xl font-semibold">The trial-week playbook</h2>
          <p className="mt-1">Read this last. It turns what you learned into how you behave on the day.</p>
        </div>
        {PLAYBOOK.map((s) => (
          <div key={s.id} className="box">
            <h3 className="mb-1 text-lg font-semibold">{s.title.en}</h3>
            <Markdown className="prose-lesson">{s.md.en}</Markdown>
          </div>
        ))}
      </section>
    </div>
  );
}
