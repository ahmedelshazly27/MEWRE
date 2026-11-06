"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { compareSeedInstruments } from "@/lib/calc/founder";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLine, axisTick, gridProps, legendStyle, millionsProp, pct, pctProp, tooltipStyle, C, type WidgetProps } from "../ui";

export default function SafeVsPriced({ props }: WidgetProps) {
  const [raise, setRaise] = useState(millionsProp(props, "raise", 2, 0.25, 6));
  const [cap, setCap] = useState(millionsProp(props, "cap", 12, 3, 40));
  const [discount, setDiscount] = useState(pctProp(props, "discount", 0, 0, 30));
  const [preA, setPreA] = useState(millionsProp(props, "preMoney", 30, 10, 150));
  const [raiseA, setRaiseA] = useState(8);
  const [poolA, setPoolA] = useState(10);

  const rows = useMemo(
    () =>
      compareSeedInstruments({
        founderShares: 9_000_000,
        pool0: 1_000_000,
        raise: raise * 1e6,
        cap: cap * 1e6,
        discount: discount / 100,
        seriesA: { name: "Series A", preMoney: preA * 1e6, raise: raiseA * 1e6, poolTarget: poolA / 100 },
      }),
    [raise, cap, discount, preA, raiseA, poolA],
  );
  const data = rows.map((r) => ({ label: r.label, "After seed": r.afterSeed, "After Series A": r.afterSeriesA }));
  const best = [...rows].sort((a, b) => b.afterSeriesA - a.afterSeriesA)[0];

  return (
    <Card title="SAFE vs priced round" subtitle="Same seed raise as a post-money SAFE, a pre-money SAFE (same cap number) or a priced seed at the same post-money; then the same Series A. Founders start at 90 % with a 10 % pool.">
      <Split>
        <Controls>
          <Slider label="Seed raise" value={raise} min={0.25} max={6} step={0.25} unit="USD M" onChange={setRaise} />
          <Slider label="Cap (or seed post-money)" value={cap} min={3} max={40} step={0.5} unit="USD M" onChange={setCap} />
          <Slider label="SAFE discount" value={discount} min={0} max={30} unit="%" onChange={setDiscount} />
          <Slider label="Series A pre-money" value={preA} min={10} max={150} step={1} unit="USD M" onChange={setPreA} />
          <Slider label="Series A raise" value={raiseA} min={2} max={40} step={0.5} unit="USD M" onChange={setRaiseA} />
          <Slider label="Pool after Series A" value={poolA} min={0} max={20} unit="% post" onChange={setPoolA} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            {rows.map((r) => (
              <Stat key={r.label} label={r.label} value={pct(r.afterSeriesA)} tone={r === best ? "ok" : "default"} note="founders after A" />
            ))}
          </Stats>
          <ChartBox height={250}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="label" tick={axisTick} axisLine={axisLine} />
                <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisTick} axisLine={axisLine} domain={[0, 1]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => pct(Number(v))} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="After seed" fill={C.c1} radius={[3, 3, 0, 0]} />
                <Bar dataKey="After Series A" fill={C.c2} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>
            A post-money SAFE fixes the investor&apos;s ownership at amount / cap ({pct((raise * 1e6) / (cap * 1e6))} here), so each extra SAFE dilutes only the founders. A pre-money SAFE with the same cap number is
            cheaper for founders before the A but SAFE holders then dilute each other and the pool top-up. A priced seed sets a share price now and its investors are diluted by the A like everyone else.
          </Note>
        </div>
      </Split>
    </Card>
  );
}
