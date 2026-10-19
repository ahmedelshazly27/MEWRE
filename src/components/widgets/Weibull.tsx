"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { weibullPdf, weibullMean, weibullPowerDensity, powerCurve, aep, windCapacityFactor, airDensity, GENERIC_TURBINE } from "@/lib/calc/wind";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function Weibull({ props }: WidgetProps) {
  const [k, setK] = useState(() => numProp(props, "k", 2, 1, 4));
  const [c, setC] = useState(() => numProp(props, "c", 8, 3, 14));
  const [temp, setTemp] = useState(15);
  const [avail, setAvail] = useState(97);
  const rho = airDensity(temp, 0);

  const data = useMemo(
    () =>
      Array.from({ length: 61 }, (_, n) => {
        const v = n * 0.5;
        return { v, pdf: weibullPdf(v, k, c) * 100, power: powerCurve(v, GENERIC_TURBINE, rho) / 1000 };
      }),
    [k, c, rho],
  );
  const e = aep(k, c, GENERIC_TURBINE, rho, avail / 100);
  const eStd = aep(k, c, GENERIC_TURBINE, 1.225, avail / 100);
  const cf = windCapacityFactor(e, GENERIC_TURBINE.ratedKw);

  return (
    <Card title="Weibull wind distribution & turbine energy" subtitle="Generic 4.2 MW turbine (cut-in 3, rated 12, cut-out 25 m/s), hub-height wind">
      <Split>
        <Controls>
          <Slider label="Shape k" value={k} min={1} max={4} step={0.05} onChange={setK} format={(v) => v.toFixed(2)} />
          <Slider label="Scale c" value={c} min={3} max={14} step={0.1} unit="m/s" onChange={setC} />
          <Slider label="Air temperature" value={temp} min={0} max={50} step={1} unit="°C" onChange={setTemp} />
          <Slider label="Availability" value={avail} min={85} max={100} step={0.5} unit="%" onChange={setAvail} />
          <Stats cols={2}>
            <Stat label="Mean speed" value={fmt(weibullMean(k, c), 3)} unit="m/s" />
            <Stat label="Air density" value={fmt(rho, 3)} unit="kg/m³" />
            <Stat label="Power density" value={fmt(weibullPowerDensity(rho, k, c), 3)} unit="W/m²" />
            <Stat label="AEP" value={fmt(e / 1000, 3)} unit="GWh/yr" tone="accent" />
            <Stat label="Capacity factor" value={pct(cf)} tone="accent" />
            <Stat label="Density effect" value={pct(e / eStd - 1)} tone={e < eStd ? "danger" : "ok"} note="vs 1.225 kg/m³" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={300}>
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="v" type="number" domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 25, 30]} tick={axisTick} axisLine={axisLine} label={axisLabel("Wind speed (m/s)")} />
                <YAxis yAxisId="f" tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("% of time per m/s", "insideLeft", -90)} />
                <YAxis yAxisId="p" orientation="right" domain={[0, 5]} tick={axisTick} axisLine={axisLine} width={30} label={axisLabel("MW", "insideRight", 90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${v} m/s`} formatter={(v: unknown, n: unknown) => [fmt(Number(v), 3), String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Area yAxisId="f" dataKey="pdf" name="Probability (%/m/s)" stroke={C.c3} fill={C.c3} fillOpacity={0.2} isAnimationActive={false} />
                <Line yAxisId="p" dataKey="power" name="Power curve (MW)" stroke={C.c2} strokeWidth={2} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: energy comes mostly from winds above the mean, because power rises with v³. Hot air is thinner — at 45 °C a
            turbine produces several percent less below rated power than at 15 °C, which matters for Kuwait summer yield estimates.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
