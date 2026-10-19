"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { projectFinance } from "@/lib/calc/finance";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, Note, ChartBox, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function NpvIrr(_: WidgetProps) {
  const [mw, setMw] = useState(1000);
  const [capexKw, setCapexKw] = useState(420);
  const [cf, setCf] = useState(29);
  const [tariff, setTariff] = useState(17);
  const [esc, setEsc] = useState(0);
  const [opexKw, setOpexKw] = useState(7);
  const [deg, setDeg] = useState(0.4);
  const [life, setLife] = useState(30);
  const [gearing, setGearing] = useState(75);
  const [interest, setInterest] = useState(5.5);
  const [tenor, setTenor] = useState(20);
  const [disc, setDisc] = useState(7);

  const r = useMemo(
    () =>
      projectFinance({
        capex: (mw * capexKw) / 1000, // USD m
        energy: (mw * (cf / 100) * 8760) / 1000, // GWh
        tariff: tariff / 1000, // USD m per GWh
        tariffEscalation: esc / 100,
        opex: (mw * opexKw) / 1000,
        opexEscalation: 0.02,
        degradation: deg / 100,
        years: life,
        gearing: gearing / 100,
        interest: interest / 100,
        tenor: Math.min(tenor, life),
        discountRate: disc / 100,
      }),
    [mw, capexKw, cf, tariff, esc, opexKw, deg, life, gearing, interest, tenor, disc],
  );
  const rows = r.rows.map((x) => ({ year: x.year, cfads: x.cfads, ds: -x.debtService, dscr: x.dscr }));

  return (
    <Card title="Project cash-flow model" subtitle="Annual model: revenue − opex = CFADS; annuity debt sized at gearing (USD million)">
      <Split>
        <Controls>
          <Slider label="Capacity" value={mw} min={50} max={3000} step={50} unit="MWac" onChange={setMw} />
          <Slider label="Capex" value={capexKw} min={250} max={1200} step={10} unit="USD/kW" onChange={setCapexKw} />
          <Slider label="Capacity factor" value={cf} min={15} max={40} step={0.5} unit="%" onChange={setCf} />
          <Slider label="Tariff (yr 1)" value={tariff} min={8} max={60} step={0.5} unit="USD/MWh" onChange={setTariff} />
          <Slider label="Tariff escalation" value={esc} min={0} max={3} step={0.1} unit="%/yr" onChange={setEsc} />
          <Slider label="O&M (yr 1, +2 %/yr)" value={opexKw} min={3} max={25} step={0.5} unit="USD/kW·yr" onChange={setOpexKw} />
          <Slider label="Degradation" value={deg} min={0} max={1} step={0.05} unit="%/yr" onChange={setDeg} />
          <Slider label="PPA term / life" value={life} min={15} max={35} step={1} unit="years" onChange={setLife} />
          <Slider label="Gearing (debt share)" value={gearing} min={0} max={90} step={1} unit="%" onChange={setGearing} />
          <Slider label="Debt interest" value={interest} min={2} max={10} step={0.1} unit="%" onChange={setInterest} />
          <Slider label="Debt tenor" value={tenor} min={5} max={30} step={1} unit="years" onChange={setTenor} />
          <Slider label="Discount rate (project NPV)" value={disc} min={3} max={12} step={0.25} unit="%" onChange={setDisc} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Project NPV" value={fmt(r.projectNpv, 3)} unit="USD m" tone={r.projectNpv >= 0 ? "ok" : "danger"} />
            <Stat label="Project IRR" value={pct(r.projectIrr)} tone="accent" />
            <Stat label="Equity IRR" value={pct(r.equityIrr)} tone="accent" />
            <Stat label="Payback (project)" value={fmt(r.paybackProject, 3)} unit="yr" />
            <Stat label="Min DSCR" value={fmt(r.minDscr, 3)} tone={r.minDscr >= 1.3 ? "ok" : r.minDscr >= 1.15 ? "warn" : "danger"} note="lenders often want ≥ 1.20–1.35" />
            <Stat label="Avg DSCR" value={fmt(r.avgDscr, 3)} />
            <Stat label="Debt / equity" value={`${fmt(r.debt, 3)} / ${fmt(r.equity, 3)}`} unit="USD m" />
            <Stat label="Annual debt service" value={fmt(r.annualDebtService, 3)} unit="USD m" />
          </Stats>
          <ChartBox height={280}>
            <ResponsiveContainer>
              <ComposedChart data={rows} margin={{ top: 10, right: 10, left: 0, bottom: 14 }} stackOffset="sign">
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="year" tick={axisTick} axisLine={axisLine} label={axisLabel("Operating year")} />
                <YAxis yAxisId="m" tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 2)} label={axisLabel("USD m", "insideLeft", -90)} />
                <YAxis yAxisId="d" orientation="right" domain={[0, (max: number) => Math.max(2, Math.ceil(max * 2) / 2)]} tick={axisTick} axisLine={axisLine} width={34} label={axisLabel("DSCR", "insideRight", 90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Year ${v}`} formatter={(v: unknown, n: unknown) => [fmt(Number(v), 3), String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <ReferenceLine yAxisId="m" y={0} stroke={C.border} />
                <Bar yAxisId="m" dataKey="cfads" name="CFADS (USD m)" fill={C.c1} fillOpacity={0.75} isAnimationActive={false} />
                <Bar yAxisId="m" dataKey="ds" name="Debt service (USD m)" fill={C.c4} fillOpacity={0.6} isAnimationActive={false} />
                <Line yAxisId="d" dataKey="dscr" name="DSCR" stroke={C.c2} strokeWidth={2} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: leverage lifts equity IRR above project IRR as long as the debt costs less than the project earns — but the
            minimum DSCR, not the IRR, usually limits how much debt lenders allow. Watch the DSCR dip in late debt years as degradation
            erodes CFADS.
          </Hint>
        </div>
      </Split>
      <Note>Teaching model: no tax, construction period, reserve accounts or debt sculpting. Defaults are illustrative for a Gulf utility-scale PV IPP.</Note>
    </Card>
  );
}
