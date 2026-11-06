"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { runway, unitEconomics } from "@/lib/calc/founder";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, numProp, tooltipStyle, C, type WidgetProps } from "../ui";

export default function UnitEconomics({ props }: WidgetProps) {
  const [arpa, setArpa] = useState(numProp(props, "price", 2500, 50, 50_000));
  const [gm, setGm] = useState(numProp(props, "grossMargin", 75, 10, 95));
  const [cac, setCac] = useState(numProp(props, "cac", 30_000, 500, 300_000));
  const [churn, setChurn] = useState(numProp(props, "churn", 2, 0.2, 10));
  const [cash, setCash] = useState(numProp(props, "cash", 1_500_000, 50_000, 10_000_000));
  const [opex, setOpex] = useState(numProp(props, "burn", 90_000, 5_000, 1_000_000));
  const [rev, setRev] = useState(15_000);
  const [growth, setGrowth] = useState(8);

  const u = useMemo(() => unitEconomics({ arpa, grossMargin: gm / 100, cac, churn: churn / 100 }), [arpa, gm, cac, churn]);
  const r = useMemo(() => runway({ cash, opex, revenue: rev, growth: growth / 100, grossMargin: gm / 100, months: 48 }), [cash, opex, rev, growth, gm]);
  const data = r.rows.map((x) => ({ month: x.month, cash: x.cash / 1000, burn: x.netBurn / 1000 }));

  return (
    <Card title="Unit economics and runway" subtitle="Per-customer economics (monthly) and company cash with flat opex and compounding revenue">
      <Split>
        <Controls>
          <Slider label="ARPA (per month)" value={arpa} min={100} max={20_000} step={100} unit="USD" onChange={setArpa} />
          <Slider label="Gross margin" value={gm} min={10} max={95} unit="%" onChange={setGm} />
          <Slider label="CAC" value={cac} min={1_000} max={200_000} step={1_000} unit="USD" onChange={setCac} />
          <Slider label="Monthly churn" value={churn} min={0.2} max={8} step={0.1} unit="%" onChange={setChurn} />
          <Slider label="Cash" value={cash} min={100_000} max={6_000_000} step={50_000} unit="USD" onChange={setCash} />
          <Slider label="Monthly opex" value={opex} min={10_000} max={500_000} step={5_000} unit="USD" onChange={setOpex} />
          <Slider label="Monthly revenue now" value={rev} min={0} max={300_000} step={1_000} unit="USD" onChange={setRev} />
          <Slider label="Revenue growth" value={growth} min={0} max={25} step={0.5} unit="%/mo" onChange={setGrowth} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="LTV (gross margin)" value={`$${fmt(u.ltv, 3)}`} />
            <Stat label="LTV / CAC" value={fmt(u.ltvToCac, 2)} tone={u.ltvToCac >= 3 ? "ok" : u.ltvToCac >= 1 ? "warn" : "danger"} note="aim for 3 or more" />
            <Stat label="CAC payback" value={fmt(u.paybackMonths, 3)} unit="months" tone={u.paybackMonths <= 18 ? "ok" : "warn"} />
            <Stat label="Runway" value={r.runwayMonths === null ? "48+" : String(r.runwayMonths)} unit="months" tone={r.runwayMonths !== null && r.runwayMonths < 12 ? "danger" : "default"} />
            <Stat label="Breakeven" value={r.breakevenMonth === null ? "not in 48 mo" : `month ${r.breakevenMonth}`} />
            <Stat label="Default" value={r.defaultAlive ? "alive" : "dead"} tone={r.defaultAlive ? "ok" : "danger"} note="on current growth" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisTick} axisLine={axisLine} label={axisLabel("month")} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`$${fmt(Number(v), 3)}k`, n === "cash" ? "cash" : "net burn"]} />
                <ReferenceLine y={0} stroke={C.danger} />
                <Line type="monotone" dataKey="cash" stroke={C.c1} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="burn" stroke={C.c2} strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>LTV = ARPA × gross margin / churn; payback = CAC / (ARPA × gross margin). Default alive means gross profit catches up with opex before the cash runs out, without new money (Paul Graham&apos;s test).</Note>
        </div>
      </Split>
    </Card>
  );
}
