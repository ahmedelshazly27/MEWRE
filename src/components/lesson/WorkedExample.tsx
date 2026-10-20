"use client";

import { useT } from "@/lib/useLang";
import { useState } from "react";
import { Markdown } from "@/components/Markdown";
import { numericCorrect } from "@/lib/scoring";
import type { NumericCheck } from "@/content/schema";
import { btn, Pill } from "@/components/ui";

interface Step {
  md: string;
  hidden?: boolean;
  check?: NumericCheck;
}

export function WorkedExample({ title, mode, given, steps, result }: { title: string; mode: "worked" | "faded"; given: string; steps: Step[]; result: string }) {
  const { t } = useT();
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Record<number, "ok" | "bad">>({});
  const allDone = steps.every((s, i) => !s.hidden || revealed[i]);

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <Pill tone={mode === "worked" ? "sun" : "info"}>{mode === "worked" ? t("Worked example") : t("Your turn — faded example")}</Pill>
        <span className="font-medium">{title}</span>
      </div>
      <div className="px-4 py-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t("Given")}</div>
        <Markdown>{given}</Markdown>
        <ol className="mt-2 space-y-3">
          {steps.map((s, i) => {
            const hidden = s.hidden && !revealed[i];
            return (
              <li key={i} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-semibold tabular-nums">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  {hidden ? (
                    <div className="rounded-lg border border-dashed border-info/50 bg-info-soft/40 p-3">
                      {s.check ? (
                        <>
                          <div className="text-sm font-medium">{s.check.prompt}</div>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <input
                              inputMode="decimal"
                              value={inputs[i] ?? ""}
                              onChange={(e) => setInputs({ ...inputs, [i]: e.target.value })}
                              className="w-36 rounded-lg border border-border bg-bg px-2 py-1.5 text-sm tabular-nums"
                              placeholder={t("Answer")}
                            />
                            {s.check.unit && <span className="text-sm text-muted">{s.check.unit}</span>}
                            <button
                              className={btn.small}
                              onClick={() => {
                                const ok = numericCorrect(inputs[i] ?? "", s.check!.answer, s.check!.tolerance);
                                setStatus({ ...status, [i]: ok ? "ok" : "bad" });
                                if (ok) setRevealed({ ...revealed, [i]: true });
                              }}
                            >
                              {t("Check")}
                            </button>
                            <button className={btn.small} onClick={() => setRevealed({ ...revealed, [i]: true })}>
                              {t("Show step")}
                            </button>
                            {status[i] === "bad" && <span className="text-sm text-danger">{t("Not yet — re-check units and arithmetic.")}</span>}
                          </div>
                        </>
                      ) : (
                        <button className={btn.small} onClick={() => setRevealed({ ...revealed, [i]: true })}>
                          {t("Try this step yourself, then reveal")}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {status[i] === "ok" && <div className="text-xs font-medium text-ok">{t("✓ You got it")}</div>}
                      <Markdown>{s.md}</Markdown>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {(mode === "worked" || allDone) && (
          <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t("Result")}</div>
            <Markdown>{result}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
