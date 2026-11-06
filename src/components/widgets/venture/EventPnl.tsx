"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eventPnl } from "@/lib/calc/suhail";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLine, axisTick, fmt, gridProps, legendStyle, pct, tooltipStyle, C, type WidgetProps } from "../ui";

const TIERS = [
  { name: "Headline", price: 25_000, fulfilment: 2_000 },
  { name: "Gold", price: 10_000, fulfilment: 800 },
  { name: "Silver", price: 4_000, fulfilment: 300 },
  { name: "Community", price: 1_000, fulfilment: 100 },
];

export default function EventPnl(_: WidgetProps) {
  const [attendees, setAttendees] = useState(150);
  const [paid, setPaid] = useState(0);
  const [ticket, setTicket] = useState(15);
  const [counts, setCounts] = useState([1, 2, 3, 5]);
  const [venue, setVenue] = useState(6_000);
  const [perHead, setPerHead] = useState(45);
  const [prizes, setPrizes] = useState(10_000);
  const [production, setProduction] = useState(5_000);
  const [marketing, setMarketing] = useState(2_000);
  const [contingency, setContingency] = useState(10);

  const r = useMemo(
    () =>
      eventPnl({
        attendees,
        paidShare: paid / 100,
        ticketPrice: ticket,
        sponsors: TIERS.map((t, i) => ({ ...t, count: counts[i] })),
        venue,
        perHead,
        prizes,
        production,
        marketing,
        contingency: contingency / 100,
      }),
    [attendees, paid, ticket, counts, venue, perHead, prizes, production, marketing, contingency],
  );
  const data = [
    { side: "Revenue", Sponsors: r.sponsorRevenue, Tickets: r.ticketRevenue },
    { side: "Costs", Costs: r.costs },
  ];

  return (
    <Card title="Event P&L and sponsorship" subtitle="A hackathon or meetup budget in USD: sponsor tiers usually carry the event; tickets mostly filter no-shows">
      <Split>
        <Controls>
          <Slider label="Attendees" value={attendees} min={20} max={1000} step={10} onChange={setAttendees} />
          <Slider label="Paying attendees" value={paid} min={0} max={100} unit="%" onChange={setPaid} />
          <Slider label="Ticket price" value={ticket} min={0} max={300} step={5} unit="USD" onChange={setTicket} />
          {TIERS.map((t, i) => (
            <Slider key={t.name} label={`${t.name} sponsors ($${fmt(t.price, 3)})`} value={counts[i]} min={0} max={10} onChange={(v) => setCounts(counts.map((c, j) => (j === i ? v : c)))} />
          ))}
          <Slider label="Venue" value={venue} min={0} max={50_000} step={500} unit="USD" onChange={setVenue} />
          <Slider label="Catering and swag per head" value={perHead} min={0} max={200} step={5} unit="USD" onChange={setPerHead} />
          <Slider label="Prizes" value={prizes} min={0} max={100_000} step={1_000} unit="USD" onChange={setPrizes} />
          <Slider label="Production (AV, stage, wifi)" value={production} min={0} max={60_000} step={500} unit="USD" onChange={setProduction} />
          <Slider label="Marketing" value={marketing} min={0} max={30_000} step={500} unit="USD" onChange={setMarketing} />
          <Slider label="Contingency" value={contingency} min={0} max={30} unit="%" onChange={setContingency} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Profit" value={`$${fmt(r.profit, 3)}`} tone={r.profit >= 0 ? "ok" : "danger"} />
            <Stat label="Sponsor share of revenue" value={pct(r.sponsorShare, 0)} />
            <Stat label="Cost per attendee" value={`$${fmt(r.costPerAttendee, 3)}`} />
          </Stats>
          <ChartBox height={220}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="side" tick={axisTick} axisLine={axisLine} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${fmt(Number(v), 3)}`} />
                <Legend wrapperStyle={legendStyle} />
                <Bar dataKey="Sponsors" stackId="a" fill={C.c1} />
                <Bar dataKey="Tickets" stackId="a" fill={C.c2} />
                <Bar dataKey="Costs" stackId="a" fill={C.c4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Illustrative prices. Sponsors pay for access to builders (hiring, developer adoption, brand), so the tier you can sell depends on who attends and what the sponsor gets afterwards: a report with signups, demos built on their API, a judging seat.</Note>
        </div>
      </Split>
    </Card>
  );
}
