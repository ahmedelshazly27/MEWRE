"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export interface ChartProps {
  chart: "line" | "bar" | "area" | "stacked-bar";
  xKey: string;
  xLabel?: string;
  yLabel?: string;
  series: { key: string; label: string }[];
  data: Record<string, number | string>[];
}

/** Data-driven chart for lesson content (line, bar, area, stacked bar). */
export function Chart({ chart, xKey, xLabel, yLabel, series, data }: ChartProps) {
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "var(--muted)" }} label={xLabel ? { value: xLabel, position: "insideBottom", offset: -4, fontSize: 12, fill: "var(--muted)" } : undefined} />
      <YAxis tick={{ fontSize: 12, fill: "var(--muted)" }} width={56} label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", fontSize: 12, fill: "var(--muted)" } : undefined} />
      <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
      {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
    </>
  );
  const margin = { top: 8, right: 12, bottom: xLabel ? 18 : 4, left: 0 };
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        {chart === "line" ? (
          <LineChart data={data} margin={margin}>
            {axes}
            {series.map((s, i) => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={data.length <= 24} />
            ))}
          </LineChart>
        ) : chart === "area" ? (
          <AreaChart data={data} margin={margin}>
            {axes}
            {series.map((s, i) => (
              <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.2} />
            ))}
          </AreaChart>
        ) : (
          <BarChart data={data} margin={margin}>
            {axes}
            {series.map((s, i) => (
              <Bar key={s.key} dataKey={s.key} name={s.label} fill={COLORS[i % COLORS.length]} stackId={chart === "stacked-bar" ? "a" : undefined} radius={chart === "stacked-bar" ? 0 : [3, 3, 0, 0]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
