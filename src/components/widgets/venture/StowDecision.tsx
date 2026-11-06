"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { stowDecision } from "@/lib/calc/mizan";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, legendStyle, pct, tooltipStyle, C, type WidgetProps } from "../ui";

export default function StowDecision(_: WidgetProps) {
  const [wind, setWind] = useState(14);
  const [threshold, setThreshold] = useState(18);
  const [damage, setDamage] = useState(1.5);
  const [mw, setMw] = useState(100);
  const [hours, setHours] = useState(3);
  const [loss, setLoss] = useState(35);
  const [cf, setCf] = useState(60);
  const [tariff, setTariff] = useState(15);
  const [dust, setDust] = useState(1.5);
  const [days, setDays] = useState(7);

  const base = useMemo(
    () => ({ stowThreshold: threshold, damageCost: damage * 1e6, mw, hours, yieldLossWhileStowed: loss / 100, outputFraction: cf / 100, tariff, soilingAvoided: dust / 100, daysToCleaning: days }),
    [threshold, damage, mw, hours, loss, cf, tariff, dust, days],
  );
  const r = useMemo(() => stowDecision({ ...base, wind }), [base, wind]);
  const data = useMemo(
    () =>
      Array.from({ length: 31 }, (_, w) => {
        const x = stowDecision({ ...base, wind: w });
        return { wind: w, benefit: (x.expectedDamageCost + x.soilingBenefit) / 1000, cost: x.lostRevenue / 1000 };
      }),
    [base],
  );

  return (
    <Card title="Stow decision under wind and dust" subtitle="Stow when expected damage avoided plus soiling avoided exceeds the energy lost while stowed; the vendor's wind threshold is a hard rule">
      <Split>
        <Controls>
          <Slider label="Forecast wind" value={wind} min={0} max={30} step={0.5} unit="m/s" onChange={setWind} />
          <Slider label="Vendor stow threshold" value={threshold} min={10} max={25} step={0.5} unit="m/s" onChange={setThreshold} />
          <Slider label="Damage cost if unstowed" value={damage} min={0.1} max={10} step={0.1} unit="USD M" onChange={setDamage} />
          <Slider label="Block size" value={mw} min={5} max={500} step={5} unit="MWac" onChange={setMw} />
          <Slider label="Stow duration" value={hours} min={0.5} max={24} step={0.5} unit="h" onChange={setHours} />
          <Slider label="Output lost while stowed" value={loss} min={5} max={90} unit="%" onChange={setLoss} />
          <Slider label="Output while tracking" value={cf} min={10} max={95} unit="% of MWac" onChange={setCf} />
          <Slider label="Energy value" value={tariff} min={5} max={120} unit="USD/MWh" onChange={setTariff} />
          <Slider label="Soiling avoided by steep stow" value={dust} min={0} max={10} step={0.1} unit="% output" onChange={setDust} />
          <Slider label="Days to next cleaning" value={days} min={0} max={30} onChange={setDays} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Decision" value={r.decision === "stow" ? "STOW" : "TRACK"} tone={r.decision === "stow" ? "warn" : "ok"} />
            <Stat label="P(damage)" value={pct(r.damageProbability, 2)} />
            <Stat label="Net benefit of stow" value={`$${fmt(r.netBenefitOfStow, 3)}`} tone={r.netBenefitOfStow > 0 ? "warn" : "default"} />
            <Stat label="Expected damage avoided" value={`$${fmt(r.expectedDamageCost, 3)}`} />
            <Stat label="Soiling avoided" value={`$${fmt(r.soilingBenefit, 3)}`} />
            <Stat label="Energy lost" value={`$${fmt(r.lostRevenue, 3)}`} />
          </Stats>
          <ChartBox height={230}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="wind" tick={axisTick} axisLine={axisLine} label={axisLabel("wind (m/s)")} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}k`} scale="log" domain={[0.01, "auto"]} allowDataOverflow />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${fmt(Number(v), 3)}k`} />
                <Legend wrapperStyle={legendStyle} />
                <ReferenceLine x={threshold} stroke={C.danger} strokeDasharray="4 3" />
                <ReferenceLine x={wind} stroke={C.accent} />
                <Line type="monotone" dataKey="benefit" name="damage + soiling avoided" stroke={C.c2} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cost" name="energy lost by stowing" stroke={C.c1} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Illustrative model: damage probability is a logistic curve centred at 1.25× the vendor threshold. Real stow logic also handles gust factors, forecast uncertainty, communication loss (fail-safe stow) and backtracking; vendors publish thresholds, not damage curves.</Note>
        </div>
      </Split>
    </Card>
  );
}
