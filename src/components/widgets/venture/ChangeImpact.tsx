"use client";

import { useMemo, useState } from "react";
import { selectTests, type ImpactTest } from "@/lib/calc/afterwave";
import { Card, Controls, Note, Slider, Split, Stat, Stats, fmt, pct, type WidgetProps } from "../ui";

const CHANGES = [
  { id: "fw-ctrl", label: "Motor control firmware v2.4" },
  { id: "fw-thermal", label: "Thermal derating table" },
  { id: "model-grasp", label: "Grasp policy model" },
  { id: "rig-encoder", label: "Rig encoder replaced" },
  { id: "rig-load", label: "Load cell recalibrated" },
];

const TESTS: ImpactTest[] = [
  { id: "t1", label: "Torque step response", deps: [{ node: "fw-ctrl", weight: 0.9 }, { node: "rig-encoder", weight: 0.6 }], hours: 2, failRate: 0.3 },
  { id: "t2", label: "Speed ripple at low rpm", deps: [{ node: "fw-ctrl", weight: 0.7 }, { node: "rig-encoder", weight: 0.8 }], hours: 3, failRate: 0.25 },
  { id: "t3", label: "Thermal soak 2 h", deps: [{ node: "fw-thermal", weight: 0.9 }, { node: "fw-ctrl", weight: 0.2 }], hours: 6, failRate: 0.15 },
  { id: "t4", label: "Overload derating", deps: [{ node: "fw-thermal", weight: 0.8 }, { node: "rig-load", weight: 0.5 }], hours: 4, failRate: 0.2 },
  { id: "t5", label: "Pick-and-place success rate", deps: [{ node: "model-grasp", weight: 0.95 }, { node: "fw-ctrl", weight: 0.3 }], hours: 5, failRate: 0.35 },
  { id: "t6", label: "Grip force accuracy", deps: [{ node: "rig-load", weight: 0.9 }, { node: "model-grasp", weight: 0.3 }], hours: 2, failRate: 0.2 },
  { id: "t7", label: "Endurance 48 h", deps: [{ node: "fw-ctrl", weight: 0.2 }, { node: "fw-thermal", weight: 0.3 }, { node: "model-grasp", weight: 0.1 }], hours: 48, failRate: 0.05 },
  { id: "t8", label: "Emergency stop timing", deps: [{ node: "fw-ctrl", weight: 0.4 }], hours: 1, failRate: 0.1 },
];

export default function ChangeImpact(_: WidgetProps) {
  const [changed, setChanged] = useState<Set<string>>(new Set(["fw-ctrl"]));
  const [threshold, setThreshold] = useState(0.35);
  const r = useMemo(() => selectTests(TESTS, changed, threshold), [changed, threshold]);
  const toggle = (id: string) => setChanged((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  });
  const H = 36;
  const height = Math.max(CHANGES.length, TESTS.length) * H + 20;
  const yC = (i: number) => 20 + i * ((height - 40) / (CHANGES.length - 1));
  const yT = (i: number) => 20 + i * ((height - 40) / (TESTS.length - 1));

  return (
    <Card title="Change impact and test selection" subtitle="Pick what changed; each test's impact score is 1 − Π(1 − w) over the changed artifacts it depends on. Tests above the threshold are rerun.">
      <Split>
        <Controls>
          {CHANGES.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={changed.has(c.id)} onChange={() => toggle(c.id)} />
              {c.label}
            </label>
          ))}
          <Slider label="Selection threshold" value={threshold} min={0.05} max={0.95} step={0.05} onChange={setThreshold} format={(v) => v.toFixed(2)} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Rig hours to rerun" value={`${fmt(r.selectedHours, 3)} / ${r.totalHours}`} tone="accent" />
            <Stat label="Hours saved" value={pct(1 - r.selectedHours / r.totalHours, 0)} />
            <Stat label="Expected regressions caught" value={pct(r.expectedRecall, 0)} tone={r.expectedRecall >= 0.9 ? "ok" : "warn"} />
          </Stats>
          <svg viewBox={`0 0 520 ${height}`} className="mt-3 w-full" role="img" aria-label="Dependency graph from changes to tests">
            {TESTS.map((t, ti) =>
              t.deps.map((d) => {
                const ci = CHANGES.findIndex((c) => c.id === d.node);
                const on = changed.has(d.node);
                return <line key={t.id + d.node} x1={190} y1={yC(ci)} x2={300} y2={yT(ti)} stroke={on ? "var(--accent)" : "var(--border)"} strokeWidth={on ? 1 + 3 * d.weight : 1} opacity={on ? 0.9 : 0.6} />;
              }),
            )}
            {CHANGES.map((c, i) => (
              <g key={c.id} onClick={() => toggle(c.id)} className="cursor-pointer">
                <rect x={4} y={yC(i) - 13} width={186} height={26} rx={6} fill={changed.has(c.id) ? "var(--accent-soft)" : "var(--surface-2)"} stroke={changed.has(c.id) ? "var(--accent)" : "var(--border)"} />
                <text x={12} y={yC(i) + 4} fontSize={11} fill="var(--text)">{c.label}</text>
              </g>
            ))}
            {TESTS.map((t, i) => {
              const s = r.scores[i];
              return (
                <g key={t.id}>
                  <rect x={300} y={yT(i) - 13} width={216} height={26} rx={6} fill={s.selected ? "var(--ok-soft)" : "var(--surface-2)"} stroke={s.selected ? "var(--ok)" : "var(--border)"} />
                  <text x={308} y={yT(i) + 4} fontSize={11} fill="var(--text)">{t.label}</text>
                  <text x={510} y={yT(i) + 4} fontSize={10} textAnchor="end" fill="var(--muted)">{s.score > 0 ? s.score.toFixed(2) : ""}</text>
                </g>
              );
            })}
          </svg>
          <Note>Weights stand for how strongly a test exercises an artifact (code coverage for firmware, signal sensitivity for rig parts). Real change-impact engines learn them from bench history: which tests moved when which artifact changed. Lowering the threshold buys recall with rig hours.</Note>
        </div>
      </Split>
    </Card>
  );
}
