"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Jan 1", chatgpt: 42, gemini: 28, perplexity: 35, aiOverviews: 18 },
  { date: "Jan 5", chatgpt: 45, gemini: 30, perplexity: 38, aiOverviews: 22 },
  { date: "Jan 9", chatgpt: 48, gemini: 33, perplexity: 40, aiOverviews: 25 },
  { date: "Jan 13", chatgpt: 52, gemini: 31, perplexity: 44, aiOverviews: 28 },
  { date: "Jan 17", chatgpt: 55, gemini: 36, perplexity: 42, aiOverviews: 30 },
  { date: "Jan 21", chatgpt: 58, gemini: 38, perplexity: 47, aiOverviews: 33 },
  { date: "Jan 25", chatgpt: 62, gemini: 41, perplexity: 50, aiOverviews: 36 },
  { date: "Jan 29", chatgpt: 60, gemini: 44, perplexity: 52, aiOverviews: 38 },
  { date: "Feb 2", chatgpt: 65, gemini: 46, perplexity: 55, aiOverviews: 40 },
  { date: "Feb 6", chatgpt: 68, gemini: 48, perplexity: 58, aiOverviews: 42 },
];

const platforms = [
  { key: "chatgpt", label: "ChatGPT", color: "#E8956B" },
  { key: "gemini", label: "Gemini", color: "#FFCBA4" },
  { key: "perplexity", label: "Perplexity", color: "#C4A882" },
  { key: "aiOverviews", label: "AI Overviews", color: "#8A8580" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <div
          key={entry.dataKey}
          className="flex items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <span className="font-medium text-foreground">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

export function VisibilityTrendChart() {
  return (
    <div className="card-hover flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">
            Visibility Trend
          </h3>
          <p className="text-xs text-muted-foreground">
            Brand visibility score across AI platforms
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {platforms.map((p) => (
            <div key={p.key} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-[11px] text-muted-foreground">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              {platforms.map((p) => (
                <linearGradient
                  key={p.key}
                  id={`gradient-${p.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={p.color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={p.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E8E4E0"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8A8580" }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8A8580" }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            {platforms.map((p) => (
              <Area
                key={p.key}
                type="monotone"
                dataKey={p.key}
                name={p.label}
                stroke={p.color}
                strokeWidth={2}
                fill={`url(#gradient-${p.key})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
