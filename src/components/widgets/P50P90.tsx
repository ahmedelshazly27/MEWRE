"use client";

import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { pValue, combineUncertainties, multiYearSigma, normPdf } from "@/lib/calc/yield";
import {
  Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, axisLabel, type WidgetProps,
} from "./ui";

const frac = (v: number) => (v > 1 ? v / 100 : v);

export default function P50P90({ props }: WidgetProps) {
  const [p50, setP50] = useState(() => numProp(props, "p50", 2800, 1));
  const hasSigma = typeof props?.sigma === "number";
  const [mode, setMode] = useState<"components" | "total">(hasSigma ? "total" : "components");
  const [total, setTotal] = useState(() => frac(numProp(props, "sigma", 0.07)) * 100);
  const [iav, setIav] = useState(3.5);
  const [resource, setResource] = useState(4.5);
  const [model, setModel] = useState(3);
  const [losses, setLosses] = useState(2.5);
  const [years, setYears] = useState(1);

  const sigma = useMemo(() => {
    if (mode === "total") return total / 100;
    return combineUncertainties([multiYearSigma(iav / 100, years), resource / 100, model / 100, losses / 100]);
  }, [mode, total, iav, resource, model, losses, years]);

  const curve = useMemo(
    () =>
      Array.from({ length: 121 }, (_, k) => {
        const z = -4 + (k * 8) / 120;
        return { e: p50 * (1 + z * sigma), d: normPdf(z) };
      }),
    [p50, sigma],
  );
  const p75 = pValue(p50, sigma, 75);
  const p90 = pValue(p50, sigma, 90);
  const p99 = pValue(p50, sigma, 99);

  return (
    <Card title="Energy-yield exceedance (P50 / P90)" subtitle="Normal distribution: Pₓ = P50 · (1 − zₓ · σ); independent uncertainties combined in quadrature">
      <Split>
        <Controls>
          <Slider label="P50 annual energy" value={p50} min={100} max={6000} step={10} unit="GWh" onChange={setP50} />
          <Segmented value={mode} onChange={setMode} options={[{ value: "components", label: "Build σ from components" }, { value: "total", label: "Total σ" }]} />
          {mode === "total" ? (
            <Slider label="Total uncertainty σ" value={total} min={1} max={20} step={0.1} unit="%" onChange={setTotal} />
          ) : (
            <>
              <Slider label="Inter-annual variability (1 yr)" value={iav} min={0} max={10} step={0.1} unit="%" onChange={setIav} />
              <Slider label="Averaging period" value={years} min={1} max={25} step={1} unit="years" onChange={setYears} />
              <Slider label="Long-term resource estimate" value={resource} min={0} max={10} step={0.1} unit="%" onChange={setResource} />
              <Slider label="Energy model (transposition, PV model)" value={model} min={0} max={8} step={0.1} unit="%" onChange={setModel} />
              <Slider label="Losses (soiling, degradation, availability)" value={losses} min={0} max={8} step={0.1} unit="%" onChange={setLosses} />
            </>
          )}
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Combined σ" value={pct(sigma)} tone="accent" />
            <Stat label="P75" value={fmt(p75, 4)} unit="GWh" />
            <Stat label="P90" value={fmt(p90, 4)} unit="GWh" tone="warn" note={`${pct(p90 / p50 - 1)} vs P50`} />
            <Stat label="P99" value={fmt(p99, 4)} unit="GWh" tone="danger" />
          </Stats>
          <ChartBox height={260}>
            <ResponsiveContainer>
              <AreaChart data={curve} margin={{ top: 16, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="e" type="number" domain={["dataMin", "dataMax"]} tickFormatter={(v: number) => fmt(v, 3)} tick={axisTick} axisLine={axisLine} label={axisLabel("Annual energy (GWh)")} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 4)} GWh`} formatter={(v: unknown) => [fmt(Number(v), 3), "Probability density"]} />
                <Area dataKey="d" stroke={C.c1} fill={C.c1} fillOpacity={0.15} strokeWidth={2} isAnimationActive={false} />
                <ReferenceLine x={p50} stroke={C.accent} label={{ value: "P50", fill: "var(--accent)", fontSize: 11, position: "top" }} />
                <ReferenceLine x={p75} stroke={C.muted} strokeDasharray="4 3" label={{ value: "P75", fill: "var(--muted)", fontSize: 11, position: "top" }} />
                <ReferenceLine x={p90} stroke={C.warn} label={{ value: "P90", fill: "var(--warn)", fontSize: 11, position: "top" }} />
                <ReferenceLine x={p99} stroke={C.danger} label={{ value: "P99", fill: "var(--danger)", fontSize: 11, position: "top" }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: P90 is the energy exceeded in 90 % of cases — lenders size debt on it (often the 1-year P90 for DSCR), while
            equity values the project on P50. Reducing resource uncertainty with on-site measurement directly raises P90 and so debt capacity.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
