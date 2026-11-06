"use client";

import { useMemo, useState } from "react";
import { checkGsn, type GsnKind, type GsnNode } from "@/lib/calc/afterwave";
import { Card, Note, type WidgetProps } from "../ui";

const START: GsnNode[] = [
  { id: "G1", kind: "goal", text: "The actuator test platform is acceptably safe to operate unattended overnight" },
  { id: "C1", kind: "context", text: "Hazard log HL-03; ISO 13849-1 target PL d for the torque interlock", parent: "G1" },
  { id: "S1", kind: "strategy", text: "Argue over each identified hazard", parent: "G1" },
  { id: "G2", kind: "goal", text: "Overtorque cannot injure an operator or damage the device under test", parent: "S1" },
  { id: "Sn1", kind: "solution", text: "Torque limit verification report TR-117", parent: "G2" },
  { id: "G3", kind: "goal", text: "Thermal runaway of the DUT is detected and the rig de-energised", parent: "S1" },
  { id: "A1", kind: "assumption", text: "Thermal chamber sensors are within calibration", parent: "G3" },
];

const SHAPE: Record<GsnKind, string> = {
  goal: "rounded-none border-2",
  strategy: "-skew-x-12 border-2",
  solution: "rounded-full border-2",
  context: "rounded-2xl border",
  assumption: "rounded-[50%] border border-dashed",
  justification: "rounded-[50%] border",
};
const LABEL: Record<GsnKind, string> = { goal: "Goal", strategy: "Strategy", solution: "Solution", context: "Context", assumption: "Assumption", justification: "Justification" };
const CHILD_KINDS: Record<GsnKind, GsnKind[]> = {
  goal: ["strategy", "goal", "solution", "context", "assumption", "justification"],
  strategy: ["goal", "solution", "context", "assumption", "justification"],
  solution: [],
  context: [],
  assumption: [],
  justification: [],
};

export default function GsnBuilder(_: WidgetProps) {
  const [nodes, setNodes] = useState<GsnNode[]>(START);
  const [sel, setSel] = useState<string>("G3");
  const issues = useMemo(() => checkGsn(nodes), [nodes]);
  const nextId = (k: GsnKind) => {
    const prefix = { goal: "G", strategy: "S", solution: "Sn", context: "C", assumption: "A", justification: "J" }[k];
    let n = 1;
    while (nodes.some((x) => x.id === `${prefix}${n}`)) n++;
    return `${prefix}${n}`;
  };
  const selected = nodes.find((n) => n.id === sel);
  const add = (k: GsnKind) => {
    if (!selected) return;
    const id = nextId(k);
    setNodes([...nodes, { id, kind: k, text: `New ${LABEL[k].toLowerCase()}`, parent: selected.id }]);
    setSel(id);
  };
  const remove = (id: string) => {
    const drop = new Set([id]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const n of nodes) if (n.parent && drop.has(n.parent) && !drop.has(n.id)) (drop.add(n.id), (grew = true));
    }
    setNodes(nodes.filter((n) => !drop.has(n.id)));
    setSel("G1");
  };

  const render = (id: string, depth: number): React.ReactNode => {
    const n = nodes.find((x) => x.id === id)!;
    const kids = nodes.filter((x) => x.parent === id);
    return (
      <li key={id} className="mt-1.5">
        <button onClick={() => setSel(id)} className={`flex w-full items-start gap-2 bg-surface px-2.5 py-1.5 text-start text-sm ${SHAPE[n.kind]} ${sel === id ? "border-accent" : "border-border"} ${n.kind === "context" || n.kind === "assumption" || n.kind === "justification" ? "bg-surface-2" : ""}`}>
          <span className={`shrink-0 text-xs font-semibold ${n.kind === "strategy" ? "skew-x-12" : ""}`}>{n.id}</span>
          <span className={`min-w-0 ${n.kind === "strategy" ? "skew-x-12" : ""}`}>{n.text}</span>
        </button>
        {kids.length > 0 && <ul className="ms-4 border-s border-border ps-3">{kids.map((k) => render(k.id, depth + 1))}</ul>}
      </li>
    );
  };
  const root = nodes.find((n) => !n.parent);

  return (
    <Card title="Safety case builder (GSN)" subtitle="Goal Structuring Notation: goals are supported by strategies and evidence; context and assumptions frame them. Select a node, add children, edit the claim.">
      <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ul className="min-w-0">{root ? render(root.id, 0) : <li className="text-sm text-muted">Add a top goal.</li>}</ul>
        <div className="min-w-0 space-y-3 text-sm">
          {selected && (
            <>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {selected.id} · {LABEL[selected.kind]}
              </div>
              <textarea value={selected.text} onChange={(e) => setNodes(nodes.map((n) => (n.id === selected.id ? { ...n, text: e.target.value } : n)))} rows={3} className="w-full rounded-lg border border-border bg-bg px-2 py-1.5" />
              <div className="flex flex-wrap gap-1.5">
                {CHILD_KINDS[selected.kind].map((k) => (
                  <button key={k} onClick={() => add(k)} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-surface-2">
                    + {LABEL[k]}
                  </button>
                ))}
                {selected.parent && (
                  <button onClick={() => remove(selected.id)} className="rounded-md border border-danger/50 px-2 py-1 text-xs text-danger hover:bg-danger-soft">
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
          <div className={`rounded-lg border p-2.5 ${issues.length ? "border-warn/50 bg-warn-soft/40" : "border-ok/50 bg-ok-soft/40"}`}>
            <div className="font-medium">{issues.length ? `${issues.length} structural issue${issues.length > 1 ? "s" : ""}` : "Structure is complete"}</div>
            <ul className="mt-1 list-disc ps-5 text-xs">
              {issues.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Note>A complete structure is not a sound argument: each solution must actually be evidence for its goal, and every assumption needs an owner. Reviewers (notified bodies, insurers, customers&apos; safety teams) attack the weakest leaf.</Note>
    </Card>
  );
}
