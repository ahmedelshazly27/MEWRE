"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { abSampleSize, optimalPrice, pricePoint } from "@/lib/calc/founder";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, legendStyle, numProp, pct, tooltipStyle, C, type WidgetProps } from "../ui";

export default function PricingExperiment({ props }: WidgetProps) {
  const [price, setPrice] = useState(numProp(props, "price", 1000, 10, 100_000));
  const [e, setE] = useState(numProp(props, "elasticity", 1.8, 0.2, 5));
  const [cost, setCost] = useState(numProp(props, "unitCost", 300, 0, 50_000));
  const [q0, setQ0] = useState(100);
  const [base, setBase] = useState(4);
  const [lift, setLift] = useState(20);

  const p0 = useMemo(() => numProp(props, "price", 1000, 10, 100_000), [props]);
  const data = useMemo(() => {
    const out = [];
    for (let i = 1; i <= 40; i++) {
      const p = (p0 * i) / 13;
      const pt = pricePoint(p, p0, q0, e, cost);
      out.push({ price: Math.round(p), revenue: pt.revenue / 1000, contribution: pt.contribution / 1000 });
    }
    return out;
  }, [p0, q0, e, cost]);
  const now = pricePoint(price, p0, q0, e, cost);
  const opt = optimalPrice(cost, e);
  const n = abSampleSize(base / 100, (base / 100) * (1 + lift / 100));

  return (
    <Card title="Pricing experiment" subtitle={`Constant-elasticity demand anchored at ${q0} customers at $${fmt(p0, 4)}: revenue and contribution vs price, and the sample size an A/B price test needs`}>
      <Split>
        <Controls>
          <Slider label="Test price" value={price} min={Math.round(p0 / 4)} max={Math.round(p0 * 3)} step={Math.max(1, Math.round(p0 / 100))} unit="USD" onChange={setPrice} />
          <Slider label="Price elasticity (e)" value={e} min={0.3} max={4} step={0.1} onChange={setE} />
          <Slider label="Unit cost (COGS)" value={cost} min={0} max={Math.round(p0 * 1.5)} step={Math.max(1, Math.round(p0 / 100))} unit="USD" onChange={setCost} />
          <Slider label="Customers at reference price" value={q0} min={10} max={1000} step={10} onChange={setQ0} />
          <Slider label="A/B baseline conversion" value={base} min={0.5} max={30} step={0.5} unit="%" onChange={setBase} />
          <Slider label="Lift to detect" value={lift} min={5} max={100} step={5} unit="% relative" onChange={setLift} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Customers at test price" value={fmt(now.quantity, 3)} />
            <Stat label="Revenue" value={`$${fmt(now.revenue, 3)}`} />
            <Stat label="Contribution" value={`$${fmt(now.contribution, 3)}`} tone={now.contribution > 0 ? "ok" : "danger"} />
            <Stat label="Profit-max price" value={Number.isFinite(opt) ? `$${fmt(opt, 3)}` : "raise price"} tone="accent" note="c·e/(e−1)" />
            <Stat label="Revenue elasticity" value={e > 1 ? "elastic" : "inelastic"} note={e > 1 ? "price cuts raise revenue" : "price rises raise revenue"} />
            <Stat label="A/B sample per arm" value={Number.isFinite(n) ? fmt(n, 3) : "∞"} note={`${pct(base / 100)} vs ${pct((base / 100) * (1 + lift / 100))}`} />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="price" tick={axisTick} axisLine={axisLine} label={axisLabel("price (USD)")} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${fmt(Number(v), 3)}k`} />
                <Legend wrapperStyle={legendStyle} />
                {Number.isFinite(opt) && opt < data[data.length - 1].price && <ReferenceLine x={Math.round(opt)} stroke={C.accent} strokeDasharray="4 3" />}
                <Line type="monotone" dataKey="revenue" stroke={C.c1} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="contribution" stroke={C.c2} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Q(p) = Q0 (p/p0)^(−e). With e above 1 a price rise loses more volume than it gains per unit, so revenue falls, yet contribution can still rise because each lost customer also stops costing COGS. B2B price tests rarely reach the sample sizes above: use willingness-to-pay interviews and staged list-price changes instead.</Note>
        </div>
      </Split>
    </Card>
  );
}
