"use client";

import { useState } from "react";
import { riskScore, riskBand, responseStrategy, type RiskBand } from "@/lib/calc/risk";
import { Card, Hint, type WidgetProps } from "./ui";

interface Risk {
  id: number;
  name: string;
  p: number;
  i: number;
}

const DEFAULT_RISKS: Risk[] = [
  { id: 1, name: "Grid connection works late", p: 4, i: 5 },
  { id: 2, name: "Module price spike before order", p: 3, i: 3 },
  { id: 3, name: "Sandstorm damage during construction", p: 2, i: 3 },
  { id: 4, name: "Heat-stress HSE incident", p: 3, i: 4 },
  { id: 5, name: "EPC subcontractor insolvency", p: 2, i: 4 },
  { id: 6, name: "Permit / approval delay", p: 3, i: 3 },
];

const bandFill: Record<RiskBand, string> = {
  low: "var(--ok-soft)",
  medium: "var(--warn-soft)",
  high: "var(--sun-soft)",
  extreme: "var(--danger-soft)",
};
const bandText: Record<RiskBand, string> = {
  low: "text-ok",
  medium: "text-warn",
  high: "text-sun",
  extreme: "text-danger",
};
const P_LABELS = ["Rare", "Unlikely", "Possible", "Likely", "Almost certain"];
const I_LABELS = ["Negligible", "Minor", "Moderate", "Major", "Severe"];

export default function RiskMatrix(_: WidgetProps) {
  const [risks, setRisks] = useState<Risk[]>(DEFAULT_RISKS);
  const [sel, setSel] = useState<number | null>(1);
  const [name, setName] = useState("");
  const selected = risks.find((r) => r.id === sel) ?? null;

  const move = (p: number, i: number) => {
    if (sel == null) return;
    setRisks((rs) => rs.map((r) => (r.id === sel ? { ...r, p, i } : r)));
  };
  const add = () => {
    const n = name.trim();
    if (!n) return;
    const id = Math.max(0, ...risks.map((r) => r.id)) + 1;
    setRisks((rs) => [...rs, { id, name: n, p: 3, i: 3 }]);
    setSel(id);
    setName("");
  };

  return (
    <Card title="5×5 probability–impact matrix" subtitle="Select a risk, then click a cell to move it">
      <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <div className="flex min-w-0">
            <div className="flex w-6 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap text-xs text-muted">Probability →</span>
            </div>
            <div className="grid min-w-0 flex-1 grid-cols-5 gap-1">
              {[5, 4, 3, 2, 1].map((p) =>
                [1, 2, 3, 4, 5].map((i) => {
                  const s = riskScore(p, i);
                  const b = riskBand(s);
                  const here = risks.filter((r) => r.p === p && r.i === i);
                  return (
                    <button
                      key={`${p}-${i}`}
                      type="button"
                      onClick={() => move(p, i)}
                      title={`${P_LABELS[p - 1]} × ${I_LABELS[i - 1]} = ${s}`}
                      className="relative aspect-square min-w-0 rounded-md border border-border p-0.5 text-left hover:ring-2 hover:ring-[var(--accent)]"
                      style={{ background: bandFill[b] }}
                    >
                      <span className={`absolute right-1 top-0.5 font-mono text-[0.65rem] ${bandText[b]}`}>{s}</span>
                      <span className="flex flex-wrap gap-0.5 pt-3">
                        {here.map((r) => (
                          <span
                            key={r.id}
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-semibold ${
                              r.id === sel ? "bg-accent text-surface" : "bg-surface text-text"
                            } border border-border`}
                          >
                            {r.id}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                }),
              )}
            </div>
          </div>
          <div className="ml-6 mt-1 text-center text-xs text-muted">Impact →</div>
          <Hint>
            What to notice: score = probability × impact, but two risks with the same score can need very different responses — a rare
            catastrophic risk (grid failure, fatality) deserves more attention than its score suggests.
          </Hint>
        </div>
        <div className="min-w-0 space-y-3">
          <ul className="space-y-1 text-sm">
            {risks.map((r) => {
              const s = riskScore(r.p, r.i);
              const b = riskBand(s);
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSel(r.id)}
                    aria-pressed={r.id === sel}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left ${r.id === sel ? "bg-accent-soft" : "hover:bg-surface-2"}`}
                  >
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[0.65rem]">{r.id}</span>
                    <span className="min-w-0 flex-1 truncate">{r.name}</span>
                    <span className={`font-mono text-xs ${bandText[b]}`}>{s}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="Add a risk…"
              className="min-w-0 flex-1 rounded-md border border-border bg-surface-2 px-2 py-1 text-sm"
            />
            <button type="button" onClick={add} className="rounded-md border border-border bg-surface-2 px-3 py-1 text-sm hover:text-accent">
              Add
            </button>
          </div>
          {selected && (
            <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm">
              <div className="font-medium">
                {selected.id}. {selected.name}
              </div>
              <div className="mt-1 text-xs text-muted">
                P = {selected.p} ({P_LABELS[selected.p - 1]}) · I = {selected.i} ({I_LABELS[selected.i - 1]})
              </div>
              <div className={`mt-1 font-semibold capitalize ${bandText[riskBand(riskScore(selected.p, selected.i))]}`}>
                Score {riskScore(selected.p, selected.i)} — {riskBand(riskScore(selected.p, selected.i))}
              </div>
              <p className="mt-1">{responseStrategy(riskBand(riskScore(selected.p, selected.i)))}</p>
              <button
                type="button"
                onClick={() => {
                  setRisks((rs) => rs.filter((r) => r.id !== selected.id));
                  setSel(null);
                }}
                className="mt-2 text-xs text-danger hover:underline"
              >
                Remove risk
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
