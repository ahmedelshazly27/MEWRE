"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { irradianceWeightedTemp, performanceRatio, weatherCorrectedPR, type PlantInterval } from "@/lib/calc/mizan";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, legendStyle, pct, tooltipStyle, C, type WidgetProps } from "../ui";

export default function PrCorrection(_: WidgetProps) {
  const [prClean, setPrClean] = useState(84);
  const [gamma, setGamma] = useState(-0.35);
  const [rate, setRate] = useState(0.3);
  const [interval, setInterval] = useState(30);
  const [tSummer, setTSummer] = useState(68);

  const r = useMemo(() => {
    const P = 1000; // kWp
    const days: (PlantInterval & { day: number; sr: number })[] = [];
    for (let d = 0; d < 365; d++) {
      const season = Math.cos((2 * Math.PI * (d - 196)) / 365); // peak mid-July
      const h = 7 + 1.3 * season; // kWh/m²/day POA (illustrative Kuwait)
      const tCell = 42 + (tSummer - 42) * (0.5 + 0.5 * season);
      const sr = 1 - (rate / 100) * (d % interval);
      const energy = P * h * (prClean / 100) * (1 + (gamma / 100) * (tCell - 25)) * sr;
      days.push({ day: d, energy, gPoa: (h * 1000) / 24, tCell, hours: 24, sr });
    }
    const tRef = irradianceWeightedTemp(days);
    const rows = days.map((x) => ({
      day: x.day,
      basic: performanceRatio([x], P) * 100,
      corrected: weatherCorrectedPR([x], P, gamma / 100, tRef) * 100,
    }));
    return { rows, tRef, annual: performanceRatio(days, P), annualCorr: weatherCorrectedPR(days, P, gamma / 100, tRef), avgSoil: 1 - days.reduce((s, x) => s + x.sr, 0) / days.length };
  }, [prClean, gamma, rate, interval, tSummer]);

  return (
    <Card title="Performance ratio with temperature correction" subtitle="A year of daily PR for a 1 MWp desert plant: summer heat drags basic PR down; the weather-corrected PR (NREL method) removes it so the soiling sawtooth shows">
      <Split>
        <Controls>
          <Slider label="Clean PR at 25 °C" value={prClean} min={70} max={92} unit="%" onChange={setPrClean} />
          <Slider label="Power temperature coefficient" value={gamma} min={-0.5} max={-0.2} step={0.01} unit="%/°C" onChange={setGamma} />
          <Slider label="Summer cell temperature" value={tSummer} min={45} max={80} unit="°C" onChange={setTSummer} />
          <Slider label="Soiling rate" value={rate} min={0} max={1.5} step={0.05} unit="%/day" onChange={setRate} />
          <Slider label="Cleaning interval" value={interval} min={3} max={120} unit="days" onChange={setInterval} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Annual PR (basic)" value={pct(r.annual)} />
            <Stat label="Annual PR (corrected)" value={pct(r.annualCorr)} tone="accent" />
            <Stat label="T_ref" value={fmt(r.tRef, 3)} unit="°C" note="irradiance-weighted" />
            <Stat label="Average soiling loss" value={pct(r.avgSoil)} tone="warn" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={r.rows} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="day" tick={axisTick} axisLine={axisLine} label={axisLabel("day of year")} />
                <YAxis tick={axisTick} axisLine={axisLine} domain={["auto", "auto"]} tickFormatter={(v) => `${Math.round(v)}%`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${fmt(Number(v), 3)} %`} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="basic" name="basic PR" stroke={C.c3} dot={false} strokeWidth={1.5} />
                <Line type="monotone" dataKey="corrected" name="weather-corrected PR" stroke={C.c1} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Synthetic illustrative data. PR_corr = Σ E / Σ [P_STC · G/1000 · (1 + γ (T_cell − T_ref))]. With the temperature swing removed, what is left is soiling, degradation and faults: the signal a soiling analytics product turns into a cleaning decision (IEC 61724-1 soiling ratio).</Note>
        </div>
      </Split>
    </Card>
  );
}
