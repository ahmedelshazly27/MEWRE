"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { classShare, ownership, postMoneySafeOwnership, pricedRound, totalShares, type Holder, type SafeInput } from "@/lib/calc/founder";
import { Card, ChartBox, Controls, Hint, Note, Slider, Split, Stat, Stats, axisLine, axisTick, fmt, gridProps, legendStyle, numProp, pct, pctProp, tooltipStyle, C, type WidgetProps } from "../ui";

const M = (v: number) => `${fmt(v / 1e6, 3)}M`;

export default function CapTable({ props }: WidgetProps) {
  const [founders, setFounders] = useState(numProp(props, "founders", 2, 1, 4));
  const [pool0, setPool0] = useState(pctProp(props, "poolPct", 10, 0, 25));
  const [s1, setS1] = useState(1);
  const [cap1, setCap1] = useState(10);
  const [s2, setS2] = useState(0.5);
  const [cap2, setCap2] = useState(14);
  const [disc, setDisc] = useState(0);
  const [preA, setPreA] = useState(24);
  const [raiseA, setRaiseA] = useState(6);
  const [poolA, setPoolA] = useState(10);

  const r = useMemo(() => {
    const total = 10_000_000;
    const poolShares = (total * pool0) / 100;
    const each = (total - poolShares) / founders;
    const base: Holder[] = [
      ...Array.from({ length: founders }, (_, i) => ({ name: `Founder ${i + 1}`, cls: "founder" as const, shares: each })),
      { name: "Option pool", cls: "pool", shares: poolShares },
    ];
    const safes: SafeInput[] = [
      { name: "SAFE 1", amount: s1 * 1e6, cap: cap1 * 1e6, discount: disc / 100, type: "post" as const },
      ...(s2 > 0 ? [{ name: "SAFE 2", amount: s2 * 1e6, cap: cap2 * 1e6, discount: disc / 100, type: "post" as const }] : []),
    ].filter((s) => s.amount > 0);
    const implied = safes.reduce((a, s) => a + postMoneySafeOwnership(s.amount, s.cap), 0);
    const round = pricedRound(base, { name: "Series A", preMoney: preA * 1e6, raise: raiseA * 1e6, poolTarget: poolA / 100 }, safes);
    const fStart = classShare(base, "founder");
    const stages = [
      { stage: "Start", Founders: fStart, Pool: classShare(base, "pool"), SAFEs: 0, "Series A": 0 },
      { stage: "After SAFEs (implied)", Founders: fStart * (1 - implied), Pool: classShare(base, "pool") * (1 - implied), SAFEs: implied, "Series A": 0 },
      { stage: "After Series A", Founders: classShare(round.holders, "founder"), Pool: classShare(round.holders, "pool"), SAFEs: classShare(round.holders, "safe"), "Series A": ownership(round.holders, "Series A") },
    ];
    return { base, round, stages, implied };
  }, [founders, pool0, s1, cap1, s2, cap2, disc, preA, raiseA, poolA]);

  const total = totalShares(r.round.holders);
  return (
    <Card title="Cap table and dilution" subtitle="10M founder and pool shares, post-money SAFEs converting at a priced Series A (YC post-money SAFE rules)">
      <Split>
        <Controls>
          <Slider label="Founders" value={founders} min={1} max={4} onChange={setFounders} />
          <Slider label="Pre-seed option pool" value={pool0} min={0} max={20} unit="%" onChange={setPool0} />
          <Slider label="SAFE 1 amount" value={s1} min={0} max={4} step={0.05} unit="USD M" onChange={setS1} />
          <Slider label="SAFE 1 post-money cap" value={cap1} min={2} max={40} step={0.5} unit="USD M" onChange={setCap1} />
          <Slider label="SAFE 2 amount" value={s2} min={0} max={4} step={0.05} unit="USD M" onChange={setS2} />
          <Slider label="SAFE 2 post-money cap" value={cap2} min={2} max={40} step={0.5} unit="USD M" onChange={setCap2} />
          <Slider label="SAFE discount" value={disc} min={0} max={30} unit="%" onChange={setDisc} />
          <Slider label="Series A pre-money" value={preA} min={5} max={120} step={1} unit="USD M" onChange={setPreA} />
          <Slider label="Series A raise" value={raiseA} min={1} max={40} step={0.5} unit="USD M" onChange={setRaiseA} />
          <Slider label="Pool after Series A" value={poolA} min={0} max={20} unit="% post" onChange={setPoolA} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Founders after A" value={pct(classShare(r.round.holders, "founder"))} tone="accent" />
            <Stat label="SAFEs after A" value={pct(classShare(r.round.holders, "safe"))} />
            <Stat label="Series A price" value={`$${fmt(r.round.pricePerShare, 3)}`} unit="/share" />
            <Stat label="Pool top-up" value={fmt(r.round.poolIncrease / 1e6, 3)} unit="M shares" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <BarChart data={r.stages} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="stage" tick={axisTick} axisLine={axisLine} />
                <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisTick} axisLine={axisLine} domain={[0, 1]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => pct(Number(v))} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="Founders" stackId="a" fill={C.c1} />
                <Bar dataKey="Pool" stackId="a" fill={C.c3} />
                <Bar dataKey="SAFEs" stackId="a" fill={C.c2} />
                <Bar dataKey="Series A" stackId="a" fill={C.c4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="py-1 pr-2 font-medium">Holder</th>
                  <th className="py-1 pr-2 text-right font-medium">Shares</th>
                  <th className="py-1 text-right font-medium">Fully diluted</th>
                </tr>
              </thead>
              <tbody>
                {r.round.holders.map((h) => (
                  <tr key={h.name} className="border-t border-border">
                    <td className="py-1 pr-2">{h.name}</td>
                    <td className="py-1 pr-2 text-right font-mono tabular-nums">{M(h.shares)}</td>
                    <td className="py-1 text-right font-mono tabular-nums">{pct(h.shares / total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {r.round.safes.map((s) => (
            <Hint key={s.name}>
              {s.name} converts at ${fmt(s.price, 3)} per share ({s.at === "cap" ? "cap price" : s.at === "discount" ? "discount price" : "round price"}) into {M(s.shares)} shares.
            </Hint>
          ))}
          <Note>Post-money SAFE holders own amount / cap of the company before the A ({pct(r.implied)} here) and are diluted only by the A investors. The option-pool top-up for the A comes out of everyone else, mostly the founders: that is the option-pool shuffle.</Note>
        </div>
      </Split>
    </Card>
  );
}
