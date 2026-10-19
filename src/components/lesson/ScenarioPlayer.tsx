"use client";

import { useMemo, useRef, useState } from "react";
import type { Scenario } from "@/content/schema";
import { Markdown } from "@/components/Markdown";
import { post, uid } from "@/lib/api";
import { scenarioScore } from "@/lib/scoring";
import { btn, Pill } from "@/components/ui";

interface Step {
  node: string;
  choice: number;
}

export function ScenarioPlayer({ scenario, compact = false }: { scenario: Scenario; compact?: boolean }) {
  const [path, setPath] = useState<Step[]>([]);
  const [current, setCurrent] = useState<string | null>(scenario.start);
  const [pending, setPending] = useState<number | null>(null);
  const [started, setStarted] = useState(!compact);
  const runId = useMemo(() => uid("scn"), []);
  const saved = useRef(false);

  const scores = path.map((p) => scenario.nodes[p.node].choices[p.choice].score);
  const finished = current === null;
  const score = scenarioScore(scores);

  const choose = (i: number) => setPending(i);
  const proceed = async () => {
    if (pending === null || !current) return;
    const step = { node: current, choice: pending };
    const nextPath = [...path, step];
    setPath(nextPath);
    const next = scenario.nodes[current].choices[pending].next ?? null;
    setCurrent(next);
    setPending(null);
    if (next === null && !saved.current) {
      saved.current = true;
      const s = scenarioScore(nextPath.map((p) => scenario.nodes[p.node].choices[p.choice].score));
      try {
        await post("/api/runs", { id: runId, kind: "scenario", ref: scenario.id, score: s, total: nextPath.length, detail: nextPath });
        await post("/api/evidence", { concepts: scenario.concepts, score: s, source: "scenario" });
      } catch {}
    }
  };
  const restart = () => {
    setPath([]);
    setCurrent(scenario.start);
    setPending(null);
    saved.current = false;
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-accent/40 bg-surface">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-accent-soft/50 px-4 py-2.5">
        <Pill tone="accent">You are the PM</Pill>
        <span className="font-medium">{scenario.title}</span>
      </div>
      <div className="px-4 py-3">
        <Markdown>{scenario.context}</Markdown>
        {!started ? (
          <button className={`${btn.primary} mt-2`} onClick={() => setStarted(true)}>
            Start scenario
          </button>
        ) : (
          <>
            {path.map((p, k) => {
              const node = scenario.nodes[p.node];
              const ch = node.choices[p.choice];
              return (
                <div key={k} className="mt-3 border-l-2 border-border pl-3 text-sm">
                  <div className="text-muted">
                    <Markdown className="prose-compact">{node.md}</Markdown>
                  </div>
                  <div className="mt-1 font-medium">→ {ch.text}</div>
                  <div className={`mt-1 rounded-md px-2 py-1.5 ${ch.score >= 8 ? "bg-ok-soft" : ch.score >= 5 ? "bg-warn-soft" : "bg-danger-soft"}`}>
                    <span className="font-semibold tabular-nums">{ch.score}/10 · </span>
                    <Markdown className="prose-compact inline">{ch.feedback}</Markdown>
                  </div>
                </div>
              );
            })}
            {current && (
              <div className="mt-4">
                <Markdown>{scenario.nodes[current].md}</Markdown>
                <div className="mt-2 space-y-2">
                  {scenario.nodes[current].choices.map((c, i) => (
                    <button key={i} onClick={() => choose(i)} className={`block w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${pending === i ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-2"}`}>
                      {c.text}
                    </button>
                  ))}
                </div>
                <button className={`${btn.primary} mt-3`} disabled={pending === null} onClick={proceed}>
                  Decide
                </button>
              </div>
            )}
            {finished && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-surface-2 px-3 py-2.5">
                <span className="text-sm">Scenario score</span>
                <span className={`text-xl font-semibold tabular-nums ${score >= 0.8 ? "text-ok" : score >= 0.5 ? "text-warn" : "text-danger"}`}>{Math.round(score * 100)}%</span>
                <button className={btn.small} onClick={restart}>
                  Replay
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
