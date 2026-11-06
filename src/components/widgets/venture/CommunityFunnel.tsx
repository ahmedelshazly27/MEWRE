"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { communityFunnel } from "@/lib/calc/suhail";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, legendStyle, tooltipStyle, C, type WidgetProps } from "../ui";

export default function CommunityFunnel(_: WidgetProps) {
  const [reach, setReach] = useState(20_000);
  const [conv, setConv] = useState(1.5);
  const [ret, setRet] = useState(80);
  const [ref, setRef] = useState(5);
  const [contrib, setContrib] = useState(8);
  const [months, setMonths] = useState(24);

  const r = useMemo(() => communityFunnel({ reach, conversion: conv / 100, retention: ret / 100, referral: ref / 100, contributorShare: contrib / 100, months }), [reach, conv, ret, ref, contrib, months]);
  const data = r.rows.map((x) => ({ month: x.month, active: Math.round(x.active), contributors: Math.round(x.contributors) }));
  const last = r.rows[r.rows.length - 1];

  return (
    <Card title="Community growth funnel" subtitle="Active members each month = retained members + new members from reach + members brought by referrals">
      <Split>
        <Controls>
          <Slider label="Monthly reach" value={reach} min={1_000} max={200_000} step={1_000} onChange={setReach} />
          <Slider label="Reach to member" value={conv} min={0.1} max={10} step={0.1} unit="%" onChange={setConv} />
          <Slider label="Monthly retention of active" value={ret} min={40} max={98} unit="%" onChange={setRet} />
          <Slider label="Referrals per active member" value={ref} min={0} max={25} step={0.5} unit="%/mo" onChange={setRef} />
          <Slider label="Contributors among active" value={contrib} min={1} max={30} unit="%" onChange={setContrib} />
          <Slider label="Months" value={months} min={6} max={60} onChange={setMonths} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label={`Active after ${months} mo`} value={fmt(last.active, 3)} tone="accent" />
            <Stat label="Contributors" value={fmt(last.contributors, 3)} />
            <Stat label="Steady state" value={Number.isFinite(r.steadyState) ? fmt(r.steadyState, 3) : "keeps growing"} note="reach·conv / (1 − retention − referral)" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisTick} axisLine={axisLine} label={axisLabel("month")} />
                <YAxis tick={axisTick} axisLine={axisLine} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={legendStyle} />
                {Number.isFinite(r.steadyState) && <ReferenceLine y={r.steadyState} stroke={C.accent} strokeDasharray="4 3" />}
                <Line type="monotone" dataKey="active" stroke={C.c1} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="contributors" stroke={C.c2} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Retention, not reach, sets the ceiling: at 80 % monthly retention a community holds about 5× its monthly intake. Referrals act like extra retention; once retention + referral passes 100 % growth compounds until the market saturates.</Note>
        </div>
      </Split>
    </Card>
  );
}
