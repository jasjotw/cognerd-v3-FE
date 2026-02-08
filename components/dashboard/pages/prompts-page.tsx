"use client";

import { cn } from "@/lib/utils";
import { Search, TrendingUp, TrendingDown, Eye, Users, MessageSquare, Filter, BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const promptCategories = [
  { category: "Product Research", count: 156, visibility: 72, trend: 15 },
  { category: "Comparison Queries", count: 128, visibility: 68, trend: 8 },
  { category: "How-To Questions", count: 98, visibility: 82, trend: 22 },
  { category: "Brand Searches", count: 87, visibility: 88, trend: 5 },
  { category: "Industry Trends", count: 64, visibility: 45, trend: -12 },
  { category: "Technical Queries", count: 52, visibility: 55, trend: 18 },
];

const volumeData = [
  { day: "Mon", volume: 342, visible: 245 },
  { day: "Tue", volume: 398, visible: 290 },
  { day: "Wed", volume: 456, visible: 338 },
  { day: "Thu", volume: 412, visible: 310 },
  { day: "Fri", volume: 378, visible: 275 },
  { day: "Sat", volume: 234, visible: 168 },
  { day: "Sun", volume: 198, visible: 142 },
];

const detailedPrompts = [
  { prompt: "best seo monitoring tools 2026", volume: "12.4k", platform: "ChatGPT", visibility: 82, position: 1, sentiment: "positive" as const, trending: true },
  { prompt: "how to track ai visibility", volume: "8.7k", platform: "Perplexity", visibility: 74, position: 2, sentiment: "positive" as const, trending: true },
  { prompt: "ai search optimization platform", volume: "6.2k", platform: "ChatGPT", visibility: 68, position: 1, sentiment: "neutral" as const, trending: false },
  { prompt: "chatgpt brand monitoring", volume: "5.8k", platform: "Gemini", visibility: 55, position: 3, sentiment: "positive" as const, trending: true },
  { prompt: "aeo vs seo differences", volume: "4.1k", platform: "Perplexity", visibility: 42, position: 4, sentiment: "neutral" as const, trending: false },
  { prompt: "perplexity analytics for brands", volume: "3.5k", platform: "Claude", visibility: 38, position: 2, sentiment: "positive" as const, trending: false },
  { prompt: "how does chatgpt rank products", volume: "3.2k", platform: "ChatGPT", visibility: 62, position: 2, sentiment: "positive" as const, trending: true },
  { prompt: "ai answer engine optimization guide", volume: "2.8k", platform: "AI Overviews", visibility: 76, position: 1, sentiment: "positive" as const, trending: true },
  { prompt: "competitor visibility tracking tool", volume: "2.4k", platform: "Gemini", visibility: 48, position: 5, sentiment: "neutral" as const, trending: false },
  { prompt: "brand sentiment in ai responses", volume: "1.9k", platform: "Perplexity", visibility: 58, position: 3, sentiment: "positive" as const, trending: false },
];

const sentimentColors = { positive: "text-success", neutral: "text-warning", negative: "text-destructive" };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function PromptsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tracked Prompts", value: "585", icon: <MessageSquare size={16} strokeWidth={1.5} /> },
          { label: "Avg. Visibility", value: "64%", icon: <Eye size={16} strokeWidth={1.5} /> },
          { label: "Weekly Volume", value: "2.4k", icon: <BarChart3 size={16} strokeWidth={1.5} /> },
          { label: "Audience Segments", value: "6", icon: <Users size={16} strokeWidth={1.5} /> },
        ].map((stat) => (
          <div key={stat.label} className="card-hover flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary">{stat.icon}</div>
            <div>
              <span className="text-xl font-semibold text-foreground">{stat.value}</span>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Volume chart */}
        <div className="col-span-3 card-hover rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Prompt Volume</h3>
              <p className="text-xs text-muted-foreground">Total prompts vs visible prompts this week</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-[11px] text-muted-foreground">Total</span></div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FFCBA4" }} /><span className="text-[11px] text-muted-foreground">Visible</span></div>
            </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" strokeOpacity={0.5} vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8580" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8580" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" name="Total Volume" fill="#E8956B" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="visible" name="Visible" fill="#FFCBA4" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories */}
        <div className="col-span-2 card-hover rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">Prompt Categories</h3>
            <p className="text-xs text-muted-foreground">Audience intent breakdown</p>
          </div>
          <div className="flex flex-col gap-2">
            {promptCategories.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-secondary/30">
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{cat.category}</span>
                    <span className={cn("text-[11px] font-medium", cat.trend >= 0 ? "text-success" : "text-destructive")}>
                      {cat.trend >= 0 ? "+" : ""}{cat.trend}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{cat.count} prompts</span>
                    <span className="text-border">|</span>
                    <span>{cat.visibility}% visibility</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${cat.visibility}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full prompt table */}
      <div className="card-hover rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">All Tracked Prompts</h3>
            <p className="text-xs text-muted-foreground">Prompt-level analytics and visibility data</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="nav-item flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Filter size={11} strokeWidth={1.5} />
              Filter
            </button>
            <button className="nav-item rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Prompt", "Volume", "Platform", "Visibility", "Position", "Sentiment", "Trending"].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailedPrompts.map((p, i) => (
                <tr key={i} className={cn("border-b border-border/50 last:border-0 hover:bg-secondary/30")}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Search size={12} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{p.prompt}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-foreground">{p.volume}</td>
                  <td className="px-5 py-3 text-xs text-foreground">{p.platform}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${p.visibility}%` }} />
                      </div>
                      <span className="font-mono text-xs">{p.visibility}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs">#{p.position}</td>
                  <td className="px-5 py-3">
                    <span className={cn("text-xs font-medium capitalize", sentimentColors[p.sentiment])}>{p.sentiment}</span>
                  </td>
                  <td className="px-5 py-3">
                    {p.trending ? <TrendingUp size={14} strokeWidth={1.5} className="text-success" /> : <span className="text-[11px] text-muted-foreground">--</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
