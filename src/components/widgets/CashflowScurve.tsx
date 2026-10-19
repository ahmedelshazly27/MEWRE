"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { constructionCashflow, type MilestonePayment } from "@/lib/calc/finance";
import { sCurve } from "@/lib/calc/evm";
import {
  Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

/** Milestone schedule for an 18-month 1 GW PV EPC (month, share). */
const MILESTONES_18: [number, number, string][] = [
  [2, 0.05, "Design & mobilisation"],
  [4, 0.1, "Design approval & long-lead orders"],
  [7, 0.2, "Module delivery batch 1"],
  [9, 0.2, "Module delivery batch 2"],
  [10, 0.1, "Tracker deliveries"],
  [12, 0.1, "50 % mechanical installation"],
  [15, 0.1, "Mechanical completion"],
  [17, 0.1, "Substation energisation"],
  [18, 0.05, "Taking-over"],
];

export default function CashflowScurve({ props }: WidgetProps) {
  const [value, setValue] = useState(() => numProp(props, "contractValue", 500, 1));
  const [months, setMonths] = useState(18);
  const [adv, setAdv] = useState(10);
  const [ret, setRet] = useState(10);
  const [retLimit, setRetLimit] = useState(5);
  const [dnp, setDnp] = useState(12);
  const [mode, setMode] = useState<"milestones" | "monthly">("milestones");

  const schedule: MilestonePayment[] = useMemo(() => {
    if (mode === "milestones") return MILESTONES_18.map(([m, share]) => ({ month: Math.max(1, Math.round((m * months) / 18)), share }));
    return Array.from({ length: months }, (_, k) => ({ month: k + 1, share: sCurve((k + 1) / months) - sCurve(k / months) }));
  }, [mode, months]);

  const rows = useMemo(
    () => constructionCashflow({ contractValue: value, milestones: schedule, advancePct: adv / 100, retentionPct: ret / 100, retentionLimitPct: retLimit / 100, completionMonth: months, dnpMonths: dnp }),
    [value, schedule, adv, ret, retLimit, months, dnp],
  );
  const peak = Math.max(...rows.map((r) => r.net));
  let maxRet = 0;
  let held = 0;
  for (const r of rows) {
    held += r.retention;
    maxRet = Math.max(maxRet, held);
  }
  const recoveredBy = rows.find((r, k) => k > 0 && rows.slice(0, k + 1).reduce((s, x) => s + x.advanceRecovery, 0) >= (value * adv) / 100 - 1e-6)?.month;

  return (
    <Card title="Construction cash-flow forecast" subtitle="Employer payments to the EPC contractor: advance, interim payments, retention and recovery (USD million)">
      <Split>
        <Controls>
          <Slider label="Contract value" value={value} min={10} max={2000} step={10} unit="USD m" onChange={setValue} />
          <Slider label="Construction period" value={months} min={6} max={36} step={1} unit="months" onChange={setMonths} />
          <Segmented value={mode} onChange={setMode} options={[{ value: "milestones", label: "Milestone payments" }, { value: "monthly", label: "Monthly valuation" }]} />
          <Slider label="Advance payment" value={adv} min={0} max={20} step={1} unit="%" onChange={setAdv} />
          <Slider label="Retention per payment" value={ret} min={0} max={10} step={0.5} unit="%" onChange={setRet} />
          <Slider label="Retention limit" value={retLimit} min={0} max={10} step={0.5} unit="% of contract" onChange={setRetLimit} />
          <Slider label="Defects notification period" value={dnp} min={6} max={24} step={1} unit="months" onChange={setDnp} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Advance at month 0" value={fmt((value * adv) / 100, 3)} unit="USD m" />
            <Stat label="Peak monthly payment" value={fmt(peak, 3)} unit="USD m" tone="accent" />
            <Stat label="Max retention held" value={fmt(maxRet, 3)} unit="USD m" />
            <Stat label="Advance recovered by" value={recoveredBy != null ? `month ${recoveredBy}` : adv ? "—" : "n/a"} />
          </Stats>
          <ChartBox height={290}>
            <ResponsiveContainer>
              <ComposedChart data={rows} margin={{ top: 10, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisTick} axisLine={axisLine} label={axisLabel("Month from NTP")} />
                <YAxis yAxisId="m" tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 2)} label={axisLabel("monthly", "insideLeft", -90)} />
                <YAxis yAxisId="c" orientation="right" tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 3)} label={axisLabel("cumulative", "insideRight", 90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Month ${v}`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} USD m`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Bar yAxisId="m" dataKey="net" name="Net payment" fill={C.c1} fillOpacity={0.6} isAnimationActive={false} />
                <Line yAxisId="c" dataKey="cumulativeGross" name="Cumulative value certified" stroke={C.c3} strokeWidth={2} dot={false} isAnimationActive={false} type="stepAfter" />
                <Line yAxisId="c" dataKey="cumulativeNet" name="Cumulative cash paid" stroke={C.c2} strokeWidth={2.5} dot={false} isAnimationActive={false} type="stepAfter" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: the advance puts cash ahead of value early on; recovery deductions then pull it back. Retention keeps a slice
            of value unpaid until taking-over and the end of the defects period — your leverage to get defects fixed. Milestone payments
            make the curve lumpy, so budget releases must match the milestone dates, not a smooth S-curve.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
