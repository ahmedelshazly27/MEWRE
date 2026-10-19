"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { evm, sCurve, sCurveInverse } from "@/lib/calc/evm";
import {
  Card, Split, Controls, NumField, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps, type Tone,
} from "./ui";

const idxTone = (x: number): Tone => (x >= 1 ? "ok" : x >= 0.95 ? "warn" : "danger");

export default function Evm({ props }: WidgetProps) {
  const [bac, setBac] = useState(() => numProp(props, "bac", 500, 1));
  const [pv, setPv] = useState(() => numProp(props, "pv", 200, 0));
  const [ev, setEv] = useState(() => numProp(props, "ev", 170, 0));
  const [ac, setAc] = useState(() => numProp(props, "ac", 190, 0));
  const [etcBu, setEtcBu] = useState(() => Math.round(numProp(props, "bac", 500, 1) * 0.7));
  const [months, setMonths] = useState(24);

  const r = evm({ bac, pv: Math.max(pv, 1e-9), ev, ac: Math.max(ac, 1e-9), etcBottomUp: etcBu });
  const safe = (x: number) => (Number.isFinite(x) ? x : NaN);

  const data = useMemo(() => {
    const ts = months * sCurveInverse(Math.min(pv / bac, 0.999));
    const spiV = pv > 0 ? ev / pv : 1;
    const forecastEnd = months / Math.max(spiV, 0.3);
    const eac = r.eac.cpi;
    const horizon = Math.max(months, Math.min(forecastEnd, months * 2));
    const out = [];
    const n = 60;
    for (let k = 0; k <= n; k++) {
      const t = (horizon * k) / n;
      const planned = t <= months ? bac * sCurve(t / months) : bac;
      const point: Record<string, number | null> = { t, pv: planned, ev: null, ac: null, fc: null };
      if (t <= ts + 1e-9) {
        const base = bac * sCurve(t / months);
        point.ev = pv > 0 ? (base * ev) / pv : 0;
        point.ac = pv > 0 ? (base * ac) / pv : 0;
      }
      if (t >= ts && Number.isFinite(eac)) {
        const f = Math.min(1, (t - ts) / Math.max(forecastEnd - ts, 1e-6));
        point.fc = ac + (eac - ac) * sCurve(f, 6);
      }
      out.push(point);
    }
    return { rows: out, ts, horizon };
  }, [bac, pv, ev, ac, months, r.eac.cpi]);

  return (
    <Card title="Earned value dashboard" subtitle="Enter status-date values (e.g. USD million); indices and forecasts update live">
      <Split>
        <Controls>
          <NumField label="BAC (budget at completion)" value={bac} onChange={(v) => setBac(Math.max(1, v))} unit="M" />
          <NumField label="PV (planned value)" value={pv} onChange={(v) => setPv(Math.max(0, v))} unit="M" />
          <NumField label="EV (earned value)" value={ev} onChange={(v) => setEv(Math.max(0, v))} unit="M" />
          <NumField label="AC (actual cost)" value={ac} onChange={(v) => setAc(Math.max(0, v))} unit="M" />
          <NumField label="Bottom-up ETC" value={etcBu} onChange={(v) => setEtcBu(Math.max(0, v))} unit="M" />
          <Slider label="Planned duration" value={months} min={6} max={48} step={1} unit="months" onChange={setMonths} />
          <Stats cols={2}>
            <Stat label="CV = EV − AC" value={fmt(r.cv, 3)} unit="M" tone={r.cv >= 0 ? "ok" : "danger"} />
            <Stat label="SV = EV − PV" value={fmt(r.sv, 3)} unit="M" tone={r.sv >= 0 ? "ok" : "danger"} />
            <Stat label="CPI = EV/AC" value={fmt(safe(r.cpi), 3)} tone={idxTone(r.cpi)} />
            <Stat label="SPI = EV/PV" value={fmt(safe(r.spi), 3)} tone={idxTone(r.spi)} />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={280}>
            <ResponsiveContainer>
              <LineChart data={data.rows} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="t" type="number" domain={[0, data.horizon]} tickFormatter={(v: number) => fmt(v, 2)} tick={axisTick} axisLine={axisLine} label={axisLabel("Month")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 3)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Month ${fmt(Number(v), 3)}`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} M`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <ReferenceLine y={bac} stroke={C.muted} strokeDasharray="2 4" label={{ value: "BAC", fill: "var(--muted)", fontSize: 11, position: "insideTopLeft" }} />
                <ReferenceLine x={data.ts} stroke={C.muted} strokeDasharray="4 3" label={{ value: "status", fill: "var(--muted)", fontSize: 11, position: "insideTopRight" }} />
                <Line dataKey="pv" name="PV (plan)" stroke={C.c3} strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line dataKey="ev" name="EV" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} connectNulls={false} />
                <Line dataKey="ac" name="AC" stroke={C.c4} strokeWidth={2.5} dot={false} isAnimationActive={false} connectNulls={false} />
                <Line dataKey="fc" name="Forecast (EAC = BAC/CPI)" stroke={C.c4} strokeDasharray="5 4" strokeWidth={1.8} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: EV below PV means behind schedule; AC above EV means over budget. The gap between the curves at the status date
            is SV and CV. A TCPI well above the current CPI means the BAC is no longer credible — re-baseline or find savings.
          </Hint>
          <div className="mt-3">
            <Stats cols={4}>
              <Stat label="EAC = BAC/CPI" value={fmt(r.eac.cpi, 4)} unit="M" tone="accent" />
              <Stat label="EAC = AC+(BAC−EV)" value={fmt(r.eac.budgetRate, 4)} unit="M" />
              <Stat label="EAC = AC+(BAC−EV)/(CPI·SPI)" value={fmt(r.eac.cpiSpi, 4)} unit="M" />
              <Stat label="EAC = AC + bottom-up ETC" value={fmt(r.eac.bottomUp ?? NaN, 4)} unit="M" />
              <Stat label="ETC = EAC − AC" value={fmt(r.etc, 4)} unit="M" />
              <Stat label="VAC = BAC − EAC" value={fmt(r.vac, 3)} unit="M" tone={r.vac >= 0 ? "ok" : "danger"} />
              <Stat label="TCPI to BAC" value={fmt(r.tcpiBac, 3)} tone={r.tcpiBac > 1.1 ? "danger" : r.tcpiBac > 1 ? "warn" : "ok"} />
              <Stat label="TCPI to EAC" value={fmt(r.tcpiEac, 3)} />
            </Stats>
          </div>
        </div>
      </Split>
    </Card>
  );
}
