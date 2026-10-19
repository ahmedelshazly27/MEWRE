"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { evaluateBids, type Bid } from "@/lib/calc/finance";
import { Card, Slider, Hint, Note, ChartBox, fmt, axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, type WidgetProps } from "./ui";

const DEFAULT_BIDS: Bid[] = [
  { name: "Bidder A", tariff: 15.2, escalation: 0, technical: 82 },
  { name: "Bidder B", tariff: 13.9, escalation: 0.015, technical: 76 },
  { name: "Bidder C", tariff: 14.6, escalation: 0.005, technical: 91 },
  { name: "Bidder D", tariff: 12.8, escalation: 0, technical: 64 },
];

export default function TariffEval(_: WidgetProps) {
  const [bids, setBids] = useState<Bid[]>(DEFAULT_BIDS);
  const [wFin, setWFin] = useState(80);
  const [rate, setRate] = useState(7);
  const [term, setTerm] = useState(25);
  const [threshold, setThreshold] = useState(70);

  const res = useMemo(() => evaluateBids(bids, rate / 100, term, wFin / 100, threshold), [bids, rate, term, wFin, threshold]);
  const sorted = [...res].sort((a, b) => a.rank - b.rank);
  const edit = (i: number, key: keyof Bid, v: string | number) => setBids((bs) => bs.map((b, k) => (k === i ? { ...b, [key]: v } : b)));

  return (
    <Card title="Tariff bid evaluation" subtitle="Levelise escalating tariffs, apply a technical pass mark, then weight financial and technical scores">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-surface-2 text-xs text-muted">
            <tr>
              <th className="px-2 py-1.5 text-left font-normal">Bidder</th>
              <th className="px-2 py-1.5 text-right font-normal">Yr-1 tariff (USD/MWh)</th>
              <th className="px-2 py-1.5 text-right font-normal">Escalation (%/yr)</th>
              <th className="px-2 py-1.5 text-right font-normal">Technical score</th>
              <th className="px-2 py-1.5 text-right font-normal">Levelised</th>
              <th className="px-2 py-1.5 text-right font-normal">Combined</th>
              <th className="px-2 py-1.5 text-right font-normal">Rank</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((b, i) => {
              const r = res[i];
              const fail = b.technical < threshold;
              return (
                <tr key={i} className="border-t border-border">
                  <td className="px-2 py-1">
                    <input value={b.name} onChange={(e) => edit(i, "name", e.target.value)} aria-label="Bidder name" className="w-24 rounded border border-border bg-surface-2 px-1 py-0.5" />
                  </td>
                  {(["tariff", "escalation", "technical"] as const).map((k) => (
                    <td key={k} className="px-2 py-1 text-right">
                      <input
                        type="number"
                        step={k === "escalation" ? 0.1 : k === "tariff" ? 0.1 : 1}
                        value={k === "escalation" ? Number((b[k] * 100).toFixed(2)) : b[k]}
                        aria-label={`${b.name} ${k}`}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v)) edit(i, k, k === "escalation" ? v / 100 : v);
                        }}
                        className="w-20 rounded border border-border bg-surface-2 px-1 py-0.5 text-right font-mono text-[0.8rem]"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1 text-right font-mono">{fmt(r.levelized, 4)}</td>
                  <td className="px-2 py-1 text-right font-mono">{fail ? <span className="text-danger">fails tech.</span> : fmt(r.combined, 3)}</td>
                  <td className={`px-2 py-1 text-right font-semibold ${r.rank === 1 && !fail ? "text-ok" : ""}`}>{r.rank}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={() => setBids((bs) => [...bs, { name: `Bidder ${String.fromCharCode(65 + bs.length)}`, tariff: 14, escalation: 0, technical: 80 }])} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text">
          Add bid
        </button>
        {bids.length > 2 && (
          <button type="button" onClick={() => setBids((bs) => bs.slice(0, -1))} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text">
            Remove last
          </button>
        )}
      </div>
      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <Slider label="Financial weight" value={wFin} min={0} max={100} step={5} unit="%" onChange={setWFin} />
          <Slider label="Technical pass mark" value={threshold} min={0} max={100} step={1} onChange={setThreshold} />
          <Slider label="Discount rate" value={rate} min={2} max={12} step={0.25} unit="%" onChange={setRate} />
          <Slider label="PPA term" value={term} min={10} max={35} step={1} unit="years" onChange={setTerm} />
        </div>
        <div className="min-w-0">
          <ChartBox height={220}>
            <ResponsiveContainer>
              <BarChart data={sorted} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid {...gridProps} vertical={false} />
                <XAxis dataKey="name" tick={axisTick} axisLine={axisLine} />
                <YAxis tick={axisTick} axisLine={axisLine} width={36} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} cursor={{ fill: "var(--surface-2)" }} formatter={(v: unknown) => [fmt(Number(v), 3), "Combined score"]} />
                <Bar dataKey="combined" isAnimationActive={false} radius={[4, 4, 0, 0]}>
                  {sorted.map((b) => (
                    <Cell key={b.name + b.rank} fill={b.rank === 1 && b.combined > 0 ? C.ok : C.c3} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: a low year-1 tariff with escalation can levelise above a flat bid; and the cheapest bid can lose if it fails the
            technical threshold. Fix the levelisation rate, term and weights in the RFP before bids open — changing them afterwards invites
            challenge.
          </Hint>
        </div>
      </div>
      <Note>Financial score = 100 × lowest qualifying levelised tariff ÷ bid levelised tariff. Real tenders define their own formula in the RFP evaluation criteria.</Note>
    </Card>
  );
}
