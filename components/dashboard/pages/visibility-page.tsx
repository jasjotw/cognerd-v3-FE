"use client";

import { cn } from "@/lib/utils";
import { Eye, Globe, TrendingUp, TrendingDown, Search, ExternalLink, Filter, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const dailyData = [
  { date: "Jan 27", score: 58, mentions: 42, citations: 35 },
  { date: "Jan 28", score: 61, mentions: 48, citations: 38 },
  { date: "Jan 29", score: 59, mentions: 44, citations: 36 },
  { date: "Jan 30", score: 64, mentions: 52, citations: 42 },
  { date: "Jan 31", score: 62, mentions: 49, citations: 40 },
  { date: "Feb 1", score: 67, mentions: 56, citations: 46 },
  { date: "Feb 2", score: 65, mentions: 54, citations: 44 },
  { date: "Feb 3", score: 70, mentions: 61, citations: 50 },
  { date: "Feb 4", score: 68, mentions: 58, citations: 48 },
  { date: "Feb 5", score: 72, mentions: 64, citations: 52 },
  { date: "Feb 6", score: 71, mentions: 62, citations: 51 },
  { date: "Feb 7", score: 74, mentions: 67, citations: 55 },
  { date: "Feb 8", score: 68, mentions: 60, citations: 48 },
  { date: "Feb 9", score: 76, mentions: 70, citations: 58 },
];

const mentionsByPlatform = [
  { platform: "ChatGPT", explicit: 142, implicit: 68 },
  { platform: "Gemini", explicit: 89, implicit: 45 },
  { platform: "Perplexity", explicit: 116, implicit: 72 },
  { platform: "AI Overviews", explicit: 67, implicit: 38 },
  { platform: "Claude", explicit: 52, implicit: 31 },
  { platform: "Grok", explicit: 28, implicit: 15 },
];

const recentMentions = [
  { prompt: "What are the best SEO monitoring tools?", platform: "ChatGPT", type: "Explicit", position: 1, time: "2h ago" },
  { prompt: "Compare AI visibility tracking platforms", platform: "Perplexity", type: "Citation", position: 2, time: "3h ago" },
  { prompt: "How to optimize for AI search engines", platform: "Gemini", type: "Implicit", position: 3, time: "4h ago" },
  { prompt: "Best tools for tracking brand in ChatGPT", platform: "ChatGPT", type: "Explicit", position: 1, time: "5h ago" },
  { prompt: "AEO optimization strategies for 2026", platform: "Perplexity", type: "Citation", position: 2, time: "6h ago" },
  { prompt: "Which platforms track AI answer visibility?", platform: "Claude", type: "Explicit", position: 4, time: "7h ago" },
  { prompt: "AI overviews monitoring software", platform: "AI Overviews", type: "Citation", position: 1, time: "8h ago" },
  { prompt: "How do brands monitor Gemini answers?", platform: "Gemini", type: "Implicit", position: 5, time: "9h ago" },
];

const regionData = [
  { region: "North America", score: 76, change: 12 },
  { region: "Europe", score: 68, change: 8 },
  { region: "Asia Pacific", score: 52, change: 18 },
  { region: "Latin America", score: 41, change: -3 },
  { region: "Middle East", score: 35, change: 22 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

const typeColors: Record<string, string> = {
  Explicit: "bg-primary/10 text-primary",
  Citation: "bg-success/10 text-success",
  Implicit: "bg-warning/10 text-warning",
};

export function VisibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Visibility Score", value: "68", change: 12, icon: <Eye size={16} strokeWidth={1.5} /> },
          { label: "Total Mentions", value: "466", change: 23, icon: <Globe size={16} strokeWidth={1.5} /> },
          { label: "Citations", value: "302", change: 8, icon: <ExternalLink size={16} strokeWidth={1.5} /> },
          { label: "Avg. Position", value: "#2.1", change: -0.4, icon: <TrendingUp size={16} strokeWidth={1.5} /> },
        ].map((stat) => (
          <div key={stat.label} className="card-hover flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary">
                {stat.icon}
              </div>
              <span className={cn("text-xs font-medium", Number(stat.change) >= 0 ? "text-success" : "text-destructive")}>
                {Number(stat.change) >= 0 ? "+" : ""}{stat.change}%
              </span>
            </div>
            <div>
              <span className="text-xl font-semibold text-foreground">{stat.value}</span>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visibility trend - full width */}
      <div className="card-hover rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Daily Visibility Trend</h3>
            <p className="text-xs text-muted-foreground">Score, mentions, and citations over time</p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { key: "score", label: "Score", color: "#E8956B" },
              { key: "mentions", label: "Mentions", color: "#FFCBA4" },
              { key: "citations", label: "Citations", color: "#8A8580" },
            ].map((l) => (
              <div key={l.key} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-[11px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="scoreG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8956B" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#E8956B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mentionsG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFCBA4" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#FFCBA4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8580" }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A8580" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" name="Score" stroke="#E8956B" strokeWidth={2} fill="url(#scoreG)" dot={false} activeDot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }} />
              <Area type="monotone" dataKey="mentions" name="Mentions" stroke="#FFCBA4" strokeWidth={2} fill="url(#mentionsG)" dot={false} activeDot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }} />
              <Area type="monotone" dataKey="citations" name="Citations" stroke="#8A8580" strokeWidth={1.5} fill="none" dot={false} activeDot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Mentions by platform */}
        <div className="col-span-2 card-hover rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">Mentions by Platform</h3>
            <p className="text-xs text-muted-foreground">Explicit vs implicit mentions</p>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mentionsByPlatform} layout="vertical" margin={{ top: 0, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" strokeOpacity={0.5} horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8A8580" }} />
                <YAxis dataKey="platform" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#2D2A26" }} width={85} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="explicit" name="Explicit" fill="#E8956B" radius={[0, 4, 4, 0]} barSize={10} />
                <Bar dataKey="implicit" name="Implicit" fill="#FFCBA4" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent mentions */}
        <div className="col-span-3 card-hover rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Recent Mentions</h3>
              <p className="text-xs text-muted-foreground">Latest AI responses mentioning your brand</p>
            </div>
            <button className="nav-item flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Filter size={11} strokeWidth={1.5} />
              Filter
            </button>
          </div>
          <div className="flex flex-col">
            {recentMentions.map((mention, i) => (
              <div key={i} className={cn("flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/30", i < recentMentions.length - 1 && "border-b border-border/50")}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Search size={12} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                  <span className="truncate text-xs font-medium text-foreground">{mention.prompt}</span>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{mention.platform}</span>
                    <span className="text-border">|</span>
                    <span>Pos #{mention.position}</span>
                    <span className="text-border">|</span>
                    <span>{mention.time}</span>
                  </div>
                </div>
                <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium", typeColors[mention.type])}>
                  {mention.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional visibility */}
      <div className="card-hover rounded-xl border border-border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-card-foreground">Regional Visibility</h3>
          <p className="text-xs text-muted-foreground">Geographic segmentation of AI visibility data</p>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {regionData.map((r) => (
            <div key={r.region} className="flex flex-col gap-2 rounded-lg border border-border p-3.5 transition-colors hover:bg-secondary/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{r.region}</span>
                <span className={cn("text-[11px] font-medium", r.change >= 0 ? "text-success" : "text-destructive")}>
                  {r.change >= 0 ? "+" : ""}{r.change}%
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold text-foreground">{r.score}</span>
                <span className="mb-0.5 text-[11px] text-muted-foreground">/100</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${r.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
