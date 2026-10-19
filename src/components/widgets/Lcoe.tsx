"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { lcoe, lcoeBreakdown } from "@/lib/calc/finance";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, Note, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, axisLabel, type WidgetProps,
} from "./ui";

/** Accept fractions (0.24) or percentages (24). */
const frac = (v: number) => (v > 1 ? v / 100 : v);
const KWD_PER_USD = 0.307;

export default function Lcoe({ props }: WidgetProps) {
  const [capex, setCapex] = useState(() => numProp(props, "capexPerKw", 550, 200, 6000));
  const [opex, setOpex] = useState(10);
  const [cf, setCf] = useState(() => frac(numProp(props, "cf", 0.26)) * 100);
  const [wacc, setWacc] = useState(() => frac(numProp(props, "wacc", 0.06)) * 100);
  const [life, setLife] = useState(30);
  const [deg, setDeg] = useState(0.4);

  const input = useMemo(
    () => ({ capex, opex, energy: (cf / 100) * 8.76, rate: wacc / 100, years: life, degradation: deg / 100, opexEscalation: 0.02 }),
    [capex, opex, cf, wacc, life, deg],
  ); // per kW: energy in MWh/kW/yr → USD/MWh
  const b = lcoeBreakdown(input);
  const curve = useMemo(
    () => Array.from({ length: 25 }, (_, k) => {
      const r = 0.02 + k * 0.005;
      return { r: r * 100, lcoe: lcoe({ ...input, rate: r }) };
    }),
    [input],
  );

  return (
    <Card title="Levelised cost of electricity (LCOE)" subtitle="Per kW of capacity: (capex + PV of opex) ÷ PV of degraded energy">
      <Split>
        <Controls>
          <Slider label="Capex" value={capex} min={200} max={6000} step={10} unit="USD/kW" onChange={setCapex} />
          <Slider label="Fixed O&M (yr 1, +2 %/yr)" value={opex} min={2} max={120} step={1} unit="USD/kW·yr" onChange={setOpex} />
          <Slider label="Capacity factor" value={cf} min={5} max={90} step={0.5} unit="%" onChange={setCf} />
          <Slider label="WACC (real)" value={wacc} min={2} max={14} step={0.1} unit="%" onChange={setWacc} />
          <Slider label="Economic life" value={life} min={10} max={40} step={1} unit="years" onChange={setLife} />
          <Slider label="Degradation" value={deg} min={0} max={1.5} step={0.05} unit="%/yr" onChange={setDeg} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="LCOE" value={fmt(b.total, 3)} unit="USD/MWh" tone="accent" />
            <Stat label="≈ in fils/kWh" value={fmt(b.total * KWD_PER_USD, 3)} unit="fils/kWh" note="at 0.307 KWD/USD" />
            <Stat label="Capex share" value={fmt(b.capex, 3)} unit="USD/MWh" />
            <Stat label="O&M share" value={fmt(b.opex, 3)} unit="USD/MWh" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={curve} margin={{ top: 14, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="r" type="number" domain={[2, 14]} tickFormatter={(v: number) => `${v}%`} tick={axisTick} axisLine={axisLine} label={axisLabel("WACC")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 3)} label={axisLabel("USD/MWh", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `WACC ${fmt(Number(v), 3)} %`} formatter={(v: unknown) => [`${fmt(Number(v), 3)} USD/MWh`, "LCOE"]} />
                <Line dataKey="lcoe" stroke={C.c1} strokeWidth={2} dot={false} isAnimationActive={false} />
                <ReferenceDot x={wacc} y={b.total} r={5} fill={C.c2} stroke="var(--surface)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: for PV almost all of LCOE is capital recovery, so the cost of capital matters as much as the capex — each
            percentage point of WACC moves PV LCOE by roughly 8–10 %. That is why sovereign offtake and bankable PPAs lower tariffs.
          </Hint>
        </div>
      </Split>
      <Note>Simplified pre-tax, real-terms LCOE: no construction-period interest, decommissioning or taxes. Gulf PV IPP bids reflect very low capex, high CF and low financing costs.</Note>
    </Card>
  );
}
