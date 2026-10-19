"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { simulateBess, type BessInput } from "@/lib/calc/bess";
import {
  Card, Split, Controls, Slider, SelectField, Stat, Stats, Hint, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function BessSizing({ props }: WidgetProps) {
  const [mw, setMw] = useState(() => numProp(props, "mw", 250, 1, 3000));
  const [hours, setHours] = useState(() => numProp(props, "hours", 4, 0.5, 12));
  const [dod, setDod] = useState(90);
  const [rte, setRte] = useState(87);
  const [cycles, setCycles] = useState(365);
  const [cal, setCal] = useState(1.0);
  const [cyc, setCyc] = useState(2.5);
  const [years, setYears] = useState(20);
  const [strategy, setStrategy] = useState<BessInput["strategy"]>("augment");
  const [interval, setInterval_] = useState(5);

  const r = useMemo(
    () =>
      simulateBess({
        mw, hours, dod: dod / 100, rte: rte / 100, cyclesPerYear: cycles,
        calendarFade: cal / 100, cycleFadePer1000: cyc / 100, years, strategy, augmentInterval: interval,
      }),
    [mw, hours, dod, rte, cycles, cal, cyc, years, strategy, interval],
  );

  return (
    <Card title="BESS sizing, degradation & augmentation" subtitle="Requirement = MW × hours delivered at the point of connection, every year">
      <Split>
        <Controls>
          <Slider label="Power" value={mw} min={10} max={2000} step={10} unit="MW" onChange={setMw} />
          <Slider label="Duration" value={hours} min={0.5} max={10} step={0.5} unit="h" onChange={setHours} />
          <Slider label="Depth of discharge" value={dod} min={70} max={100} step={1} unit="%" onChange={setDod} />
          <Slider label="Round-trip efficiency" value={rte} min={75} max={95} step={0.5} unit="%" onChange={setRte} />
          <Slider label="Cycles per year" value={cycles} min={50} max={730} step={5} onChange={setCycles} />
          <Slider label="Calendar fade" value={cal} min={0} max={3} step={0.1} unit="%/yr" onChange={setCal} />
          <Slider label="Cycle fade" value={cyc} min={0} max={8} step={0.1} unit="% per 1000 cycles" onChange={setCyc} />
          <Slider label="Project life" value={years} min={5} max={25} step={1} unit="years" onChange={setYears} />
          <SelectField
            label="Strategy"
            value={strategy}
            onChange={setStrategy}
            options={[
              { value: "none", label: "No augmentation" },
              { value: "overbuild", label: "Overbuild on day 1" },
              { value: "augment", label: "Periodic augmentation" },
            ]}
          />
          {strategy === "augment" && <Slider label="Augmentation interval" value={interval} min={1} max={10} step={1} unit="years" onChange={setInterval_} />}
        </Controls>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Initial nameplate" value={fmt(r.initialNameplate, 3)} unit="MWh" tone="accent" />
            <Stat label="C-rate" value={fmt(r.cRate, 2)} unit="1/h" />
            <Stat label="Total augmentation" value={fmt(r.totalAugmentation, 3)} unit="MWh" />
            <Stat label="Years below requirement" value={String(r.yearsShort)} tone={r.yearsShort ? "danger" : "ok"} />
          </Stats>
          <ChartBox height={280}>
            <ResponsiveContainer>
              <ComposedChart data={r.rows} margin={{ top: 10, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="year" tick={axisTick} axisLine={axisLine} label={axisLabel("Operating year")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={48} tickFormatter={(v: number) => fmt(v, 3)} label={axisLabel("MWh", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Year ${v}`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} MWh`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Bar dataKey="augmentationMwh" name="Augmentation added (nameplate)" fill={C.c2} fillOpacity={0.7} isAnimationActive={false} />
                <Line dataKey="availableMwh" name="Deliverable energy at POI" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="requirementMwh" name="Requirement" stroke={C.danger} strokeDasharray="5 4" strokeWidth={1.8} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: nameplate must exceed MW × h because of DoD and round-trip losses, and capacity fades every year. Overbuilding
            buys all the fade up front; periodic augmentation defers capex to when cells are cheaper but needs space, compatible equipment
            and contract provisions planned from day 1.
          </Hint>
          <div className="mt-2">
            <Stats cols={2}>
              <Stat label="Lifetime energy delivered" value={fmt(r.lifetimeDeliveredMwh / 1000, 3)} unit="GWh" />
              <Stat label="Total installed (incl. augmentation)" value={fmt(r.totalInstalled, 3)} unit="MWh" />
            </Stats>
          </div>
        </div>
      </Split>
    </Card>
  );
}
