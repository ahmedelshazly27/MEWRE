"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { platformEconomics } from "@/lib/calc/afterwave";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, pct, tooltipStyle, C, type WidgetProps } from "../ui";

export default function PlatformEconomics(_: WidgetProps) {
  const [capex, setCapex] = useState(450);
  const [life, setLife] = useState(5);
  const [avail, setAvail] = useState(85);
  const [util, setUtil] = useState(45);
  const [price, setPrice] = useState(150);
  const [varCost, setVarCost] = useState(40);
  const [fixed, setFixed] = useState(80);
  const [dataValue, setDataValue] = useState(15);

  const input = useMemo(
    () => ({ capex: capex * 1000, lifeYears: life, availableHours: 8760 * (avail / 100), utilisation: util / 100, pricePerHour: price, variableCostPerHour: varCost, fixedAnnual: fixed * 1000, dataValuePerHour: dataValue }),
    [capex, life, avail, util, price, varCost, fixed, dataValue],
  );
  const r = useMemo(() => platformEconomics(input), [input]);
  const data = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => {
        const u = i * 0.05;
        const x = platformEconomics({ ...input, utilisation: u });
        return { util: Math.round(u * 100), ebit: x.ebit / 1000, withData: x.ebitWithData / 1000 };
      }),
    [input],
  );

  return (
    <Card title="Actuator test platform economics" subtitle="One instrumented rig sold as test-as-a-service: utilisation drives everything; bench-memory data is a second revenue line">
      <Split>
        <Controls>
          <Slider label="Rig capex" value={capex} min={50} max={2000} step={10} unit="USD k" onChange={setCapex} />
          <Slider label="Depreciation life" value={life} min={2} max={10} unit="years" onChange={setLife} />
          <Slider label="Rig availability" value={avail} min={50} max={98} unit="%" onChange={setAvail} />
          <Slider label="Utilisation (hours sold)" value={util} min={5} max={95} unit="%" onChange={setUtil} />
          <Slider label="Price per test hour" value={price} min={20} max={600} step={5} unit="USD" onChange={setPrice} />
          <Slider label="Variable cost per hour" value={varCost} min={5} max={300} step={5} unit="USD" onChange={setVarCost} />
          <Slider label="Fixed cost per year" value={fixed} min={10} max={500} step={5} unit="USD k" onChange={setFixed} />
          <Slider label="Data value per hour" value={dataValue} min={0} max={100} unit="USD" onChange={setDataValue} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Revenue" value={`$${fmt(r.revenue, 3)}`} />
            <Stat label="EBIT" value={`$${fmt(r.ebit, 3)}`} tone={r.ebit >= 0 ? "ok" : "danger"} />
            <Stat label="Breakeven utilisation" value={Number.isFinite(r.breakevenUtilisation) ? pct(r.breakevenUtilisation, 0) : "never"} tone="accent" />
            <Stat label="Payback" value={Number.isFinite(r.paybackYears) ? fmt(r.paybackYears, 2) : "never"} unit="years" />
            <Stat label="Hours sold" value={fmt(r.hoursSold, 3)} unit="h/yr" />
            <Stat label="EBIT incl. data" value={`$${fmt(r.ebitWithData, 3)}`} />
          </Stats>
          <ChartBox height={230}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="util" tick={axisTick} axisLine={axisLine} label={axisLabel("utilisation (%)")} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${fmt(Number(v), 3)}k`} />
                <ReferenceLine y={0} stroke={C.danger} />
                <ReferenceLine x={util} stroke={C.accent} strokeDasharray="4 3" />
                <Line type="monotone" dataKey="ebit" name="EBIT" stroke={C.c1} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="withData" name="EBIT incl. data value" stroke={C.c2} strokeWidth={2} dot={false} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Illustrative numbers. Breakeven utilisation = (fixed + depreciation) / ((price − variable cost) × available hours). Test labs live and die on scheduling: changeover time, fixtures per customer and calibration windows eat into the hours you can sell.</Note>
        </div>
      </Split>
    </Card>
  );
}
