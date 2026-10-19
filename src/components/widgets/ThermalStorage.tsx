"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { thermalEnergyMwh, electricEnergyMwh, hoursAtRated, saltVolume, SOLAR_SALT_CP } from "@/lib/calc/storage-thermal";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function ThermalStorage({ props }: WidgetProps) {
  const [mass, setMass] = useState(() => numProp(props, "massTonnes", 30000, 100, 100000));
  const [cp, setCp] = useState(SOLAR_SALT_CP);
  const [tCold, setTCold] = useState(290);
  const [tHot, setTHot] = useState(565);
  const [eff, setEff] = useState(39);
  const [mwe, setMwe] = useState(100);
  const dT = Math.max(0, tHot - tCold);

  const th = thermalEnergyMwh(mass, cp, dT);
  const el = electricEnergyMwh(th, eff / 100);
  const hrs = hoursAtRated(el, mwe);
  const curve = useMemo(
    () => Array.from({ length: 41 }, (_, k) => {
      const m = k * 2500;
      return { m, h: hoursAtRated(electricEnergyMwh(thermalEnergyMwh(m, cp, dT), eff / 100), mwe) };
    }),
    [cp, dT, eff, mwe],
  );

  return (
    <Card title="Molten-salt thermal energy storage" subtitle="E = m · cp · ΔT, converted to electricity by the steam turbine">
      <Split>
        <Controls>
          <Slider label="Salt mass" value={mass} min={1000} max={100000} step={500} unit="t" onChange={setMass} />
          <Slider label="Specific heat cp" value={cp} min={1.2} max={1.8} step={0.01} unit="kJ/kg·K" onChange={setCp} />
          <div className="flex flex-wrap gap-2 text-xs">
            <button type="button" onClick={() => { setTCold(290); setTHot(565); setEff(41); }} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-muted hover:text-text">
              Tower (290 → 565 °C)
            </button>
            <button type="button" onClick={() => { setTCold(290); setTHot(385); setEff(37); }} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-muted hover:text-text">
              Trough (290 → 385 °C)
            </button>
          </div>
          <Slider label="Cold tank" value={tCold} min={250} max={320} step={1} unit="°C" onChange={setTCold} />
          <Slider label="Hot tank" value={tHot} min={350} max={580} step={1} unit="°C" onChange={setTHot} />
          <Slider label="Turbine cycle efficiency" value={eff} min={30} max={45} step={0.5} unit="%" onChange={setEff} />
          <Slider label="Turbine rating" value={mwe} min={20} max={300} step={5} unit="MWe" onChange={setMwe} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Thermal energy" value={fmt(th, 4)} unit="MWh_th" />
            <Stat label="Electric energy" value={fmt(el, 4)} unit="MWh_e" tone="accent" />
            <Stat label="Hours at rated" value={fmt(hrs, 3)} unit="h" tone="accent" />
            <Stat label="Salt volume" value={fmt(saltVolume(mass), 3)} unit="m³" note="ρ ≈ 1,850 kg/m³" />
          </Stats>
          <ChartBox height={250}>
            <ResponsiveContainer>
              <LineChart data={curve} margin={{ top: 10, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="m" type="number" domain={[0, 100000]} tickFormatter={(v: number) => `${v / 1000}k`} tick={axisTick} axisLine={axisLine} label={axisLabel("Salt mass (t)")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("hours", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 3)} t`} formatter={(v: unknown) => [`${fmt(Number(v), 3)} h`, "Storage at rated MWe"]} />
                <Line dataKey="h" stroke={C.c2} strokeWidth={2} dot={false} isAnimationActive={false} />
                <ReferenceDot x={mass} y={hrs} r={5} fill={C.c1} stroke="var(--surface)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: storage scales with ΔT, so a 565 °C tower stores almost three times as much energy per tonne of salt as a 385 °C
            trough. Every MWh_e needs ~2.5 MWh_th because only ~40 % of the heat becomes electricity.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
