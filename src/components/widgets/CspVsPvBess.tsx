"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { compareFirmBlock, cspCapexForHours, DEFAULT_FIRM_BLOCK } from "@/lib/calc/compare";
import { crf } from "@/lib/calc/finance";
import { pvDayProfile } from "@/lib/calc/kuwait";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, Note, ChartBox, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function CspVsPvBess(_: WidgetProps) {
  const [mw, setMw] = useState(200);
  const [hours, setHours] = useState(6);
  const [wacc, setWacc] = useState(7);
  const [cspAdj, setCspAdj] = useState(0); // % adjustment to indicative CSP capex
  const [pvCapex, setPvCapex] = useState(DEFAULT_FIRM_BLOCK.pvCapexPerKw);
  const [bessCapex, setBessCapex] = useState(DEFAULT_FIRM_BLOCK.bessCapexPerKwh);
  const [rte, setRte] = useState(86);
  const cspCapex = cspCapexForHours(hours) * (1 + cspAdj / 100);
  const start = 18;

  const r = useMemo(
    () => compareFirmBlock({ ...DEFAULT_FIRM_BLOCK, mw, hours, wacc: wacc / 100, cspCapexPerKw: cspCapex, pvCapexPerKw: pvCapex, bessCapexPerKwh: bessCapex, rte: rte / 100 }),
    [mw, hours, wacc, cspCapex, pvCapex, bessCapex, rte],
  );
  const f = crf(wacc / 100, DEFAULT_FIRM_BLOCK.years);
  const bars = [
    { name: "CSP + TES", capital: (r.csp.capex * f) / r.annualMwh, om: (r.csp.annualCost - r.csp.capex * f) / r.annualMwh },
    { name: "PV + BESS", capital: (r.pvBess.capex * f) / r.annualMwh, om: (r.pvBess.annualCost - r.pvBess.capex * f) / r.annualMwh },
  ];
  const dispatch = useMemo(() => {
    const pvScale = r.pvBess.pvMwDc / 0.86 / 1.25; // MWac approx
    return Array.from({ length: 49 }, (_, k) => {
      const h = k / 2;
      const inBlock = h >= start && h < start + hours;
      const pv = pvDayProfile(h, pvScale, "summer");
      return { h, pvCharge: pv, battery: inBlock ? mw : 0, csp: inBlock ? mw : 0 };
    });
  }, [r.pvBess.pvMwDc, hours, mw]);

  return (
    <Card title="CSP with thermal storage vs PV + BESS" subtitle={`Screening cost to deliver ${fmt(mw, 3)} MW for ${hours} h after sunset, every day`}>
      <Split>
        <Controls>
          <Slider label="Firm evening block" value={mw} min={50} max={1000} step={10} unit="MW" onChange={setMw} />
          <Slider label="Block duration" value={hours} min={2} max={14} step={0.5} unit="h" onChange={setHours} />
          <Slider label="WACC" value={wacc} min={3} max={12} step={0.25} unit="%" onChange={setWacc} />
          <Slider label="CSP capex adjustment" value={cspAdj} min={-40} max={40} step={1} unit="%" onChange={setCspAdj} format={(v) => `${v > 0 ? "+" : ""}${v}`} />
          <Slider label="PV capex" value={pvCapex} min={250} max={900} step={10} unit="USD/kWp" onChange={setPvCapex} />
          <Slider label="BESS capex" value={bessCapex} min={100} max={500} step={5} unit="USD/kWh" onChange={setBessCapex} />
          <Slider label="BESS round-trip efficiency" value={rte} min={75} max={95} step={0.5} unit="%" onChange={setRte} />
        </Controls>
        <div className="min-w-0 space-y-3">
          <Stats cols={4}>
            <Stat label="CSP cost of block" value={fmt(r.csp.lcos, 3)} unit="USD/MWh" tone="sun" />
            <Stat label="PV+BESS cost of block" value={fmt(r.pvBess.lcos, 3)} unit="USD/MWh" tone="accent" />
            <Stat label="CSP capex" value={fmt(r.csp.capex / 1e6, 3)} unit="USD m" note={`${fmt(cspCapex, 3)} USD/kW`} />
            <Stat label="PV+BESS capex" value={fmt(r.pvBess.capex / 1e6, 3)} unit="USD m" note={`${fmt(r.pvBess.pvMwDc, 3)} MWp + ${fmt(r.pvBess.bessMwh, 3)} MWh`} />
          </Stats>
          <ChartBox height={170}>
            <ResponsiveContainer>
              <BarChart data={bars} layout="vertical" margin={{ top: 5, right: 16, left: 4, bottom: 14 }}>
                <CartesianGrid {...gridProps} horizontal={false} />
                <XAxis type="number" tick={axisTick} axisLine={axisLine} label={axisLabel("USD per MWh delivered in the block")} />
                <YAxis type="category" dataKey="name" width={80} tick={axisTick} axisLine={axisLine} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} cursor={{ fill: "var(--surface-2)" }} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} USD/MWh`, String(n)]} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="capital" stackId="a" name="Capital recovery" fill={C.c3} isAnimationActive={false} />
                <Bar dataKey="om" stackId="a" name="O&M" fill={C.c2} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <ChartBox height={200}>
            <ResponsiveContainer>
              <AreaChart data={dispatch} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="h" type="number" domain={[0, 24]} ticks={[0, 4, 8, 12, 16, 20, 24]} tickFormatter={(h: number) => `${h}:00`} tick={axisTick} axisLine={axisLine} label={axisLabel("Hour (summer day)")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("MW", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${v} h`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} MW`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Area dataKey="pvCharge" name="PV charging battery" stroke={C.c2} fill={C.c2} fillOpacity={0.2} isAnimationActive={false} />
                <Area dataKey="battery" name="Battery / CSP turbine output" stroke={C.c1} fill={C.c1} fillOpacity={0.25} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: both options deliver the same evening block; CSP stores heat cheaply (salt tanks) so its cost rises slowly with
            duration, while PV+BESS cost scales almost linearly with hours of storage. Short blocks favour batteries; very long blocks narrow
            the gap. Dust-driven DNI losses in Kuwait penalise CSP output more than PV.
          </Hint>
        </div>
      </Split>
      <Note>
        Screening model with illustrative costs: CSP capex ≈ 3,000 + 200·h USD/kW (tower class) before adjustment; daytime PV surplus and
        CSP daytime generation are not credited; no augmentation timing, taxes or construction interest. Not for investment decisions.
      </Note>
    </Card>
  );
}
