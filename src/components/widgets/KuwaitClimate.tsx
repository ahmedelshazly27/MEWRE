"use client";

import { useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { KUWAIT_CLIMATE, CLIMATE_DISCLAIMER, annualFromDaily } from "@/lib/calc/kuwait";
import {
  Card, Segmented, Stat, Stats, Hint, Note, ChartBox, enumProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

type Metric = "ghi" | "dni" | "temp";

export default function KuwaitClimate({ props }: WidgetProps) {
  const [metric, setMetric] = useState<Metric>(() => enumProp(props, "metric", ["ghi", "dni", "temp"] as const, "ghi"));
  const annualGhi = annualFromDaily(KUWAIT_CLIMATE.map((m) => m.ghi));
  const annualDni = annualFromDaily(KUWAIT_CLIMATE.map((m) => m.dni));
  const hottest = KUWAIT_CLIMATE.reduce((a, b) => (b.tmax > a.tmax ? b : a));
  const best = KUWAIT_CLIMATE.reduce((a, b) => (b.ghi > a.ghi ? b : a));

  return (
    <Card title="Kuwait / Shagaya monthly climate" subtitle="Indicative climatology for desert sites in Kuwait">
      <div className="mb-3">
        <Segmented
          label="Show"
          value={metric}
          onChange={setMetric}
          options={[
            { value: "ghi", label: "GHI" },
            { value: "dni", label: "DNI" },
            { value: "temp", label: "Temperature" },
          ]}
        />
      </div>
      <ChartBox height={270}>
        <ResponsiveContainer>
          <ComposedChart data={KUWAIT_CLIMATE} margin={{ top: 5, right: 10, left: 0, bottom: 4 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" tick={axisTick} axisLine={axisLine} interval={0} />
            {metric === "temp" ? (
              <YAxis domain={[0, 50]} tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("°C", "insideLeft", -90)} />
            ) : (
              <YAxis domain={[0, 9]} tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("kWh/m²/day", "insideLeft", -90)} />
            )}
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              formatter={(v: unknown, n: unknown) => [fmt(Number(v), 3) + (metric === "temp" ? " °C" : " kWh/m²/day"), String(n)]}
            />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
            {metric === "ghi" && <Bar dataKey="ghi" name="GHI (kWh/m²/day)" fill={C.c2} radius={[4, 4, 0, 0]} isAnimationActive={false} />}
            {metric === "ghi" && <Line dataKey="dni" name="DNI (kWh/m²/day)" stroke={C.muted} strokeDasharray="4 3" dot={false} isAnimationActive={false} />}
            {metric === "dni" && <Bar dataKey="dni" name="DNI (kWh/m²/day)" fill={C.c4} radius={[4, 4, 0, 0]} isAnimationActive={false} />}
            {metric === "dni" && <Line dataKey="ghi" name="GHI (kWh/m²/day)" stroke={C.muted} strokeDasharray="4 3" dot={false} isAnimationActive={false} />}
            {metric === "temp" && <Bar dataKey="tmax" name="Mean daily max (°C)" fill={C.c4} radius={[4, 4, 0, 0]} isAnimationActive={false} />}
            {metric === "temp" && <Line dataKey="tmean" name="Mean (°C)" stroke={C.c3} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartBox>
      <Hint>
        {metric === "ghi" &&
          "What to notice: summer GHI is more than double winter — and summer is also when demand peaks, a good match for PV."}
        {metric === "dni" &&
          "What to notice: DNI is flat-to-dipping in spring and early summer when dust and haze scatter the direct beam — this hurts CSP and trackers more than fixed PV."}
        {metric === "temp" &&
          "What to notice: midsummer maximums of ~47 °C push cell temperatures to 70–75 °C, costing ~12–15 % of module power just when irradiance is highest."}
      </Hint>
      <div className="mt-3">
        <Stats cols={4}>
          <Stat label="Annual GHI" value={fmt(annualGhi, 3)} unit="kWh/m²" tone="sun" />
          <Stat label="Annual DNI" value={fmt(annualDni, 3)} unit="kWh/m²" />
          <Stat label="Sunniest month" value={best.month} note={`${best.ghi} kWh/m²/day`} />
          <Stat label="Hottest month" value={hottest.month} note={`max ≈ ${hottest.tmax} °C`} tone="danger" />
        </Stats>
      </div>
      <Note>{CLIMATE_DISCLAIMER}</Note>
    </Card>
  );
}
