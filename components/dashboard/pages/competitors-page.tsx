"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, Search, Target, Users, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const competitors = [
  { name: "Your Brand", visibility: 68, mentions: 466, citations: 302, sentiment: 72, avgPos: 2.1, change: 12, color: "#E8956B" },
  { name: "Ahrefs", visibility: 82, mentions: 621, citations: 448, sentiment: 78, avgPos: 1.4, change: 5, color: "#FFCBA4" },
  { name: "SEMrush", visibility: 74, mentions: 512, citations: 398, sentiment: 68, avgPos: 1.8, change: -2, color: "#C4A882" },
  { name: "Moz", visibility: 54, mentions: 312, citations: 198, sentiment: 65, avgPos: 3.2, change: -8, color: "#8A8580" },
  { name: "Brightedge", visibility: 41, mentions: 201, citations: 124, sentiment: 58, avgPos: 4.1, change: 2, color: "#D4B896" },
];

const radarData = [
  { metric: "Visibility", "Your Brand": 68, Ahrefs: 82, SEMrush: 74, Moz: 54 },
  { metric: "Mentions", "Your Brand": 62, Ahrefs: 85, SEMrush: 72, Moz: 48 },
  { metric: "Citations", "Your Brand": 70, Ahrefs: 78, SEMrush: 75, Moz: 45 },
  { metric: "Sentiment", "Your Brand": 72, Ahrefs: 78, SEMrush: 68, Moz: 65 },
  { metric: "Position", "Your Brand": 75, Ahrefs: 88, SEMrush: 78, Moz: 55 },
  { metric: "Coverage", "Your Brand": 60, Ahrefs: 72, SEMrush: 68, Moz: 42 },
];

const gapAnalysis = [
  { topic: "AI visibility tools", yours: 82, topCompetitor: 90, gap: -8 },
  { topic: "SEO monitoring", yours: 74, topCompetitor: 88, gap: -14 },
  { topic: "Content optimization", yours: 68, topCompetitor: 72, gap: -4 },
  { topic: "Rank tracking", yours: 45, topCompetitor: 85, gap: -40 },
  { topic: "Backlink analysis", yours: 22, topCompetitor: 92, gap: -70 },
  { topic: "Technical SEO audit", yours: 38, topCompetitor: 78, gap: -40 },
  { topic: "AI answer optimization", yours: 88, topCompetitor: 65, gap: 23 },
  { topic: "Brand monitoring", yours: 76, topCompetitor: 70, gap: 6 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-muted-foreground">{entry.name || entry.dataKey}</span>
          </div>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function CompetitorsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tracked Competitors", value: "4", icon: <Users size={16} strokeWidth={1.5} /> },
          { label: "Your Rank", value: "#2", change: 1, icon: <TrendingUp size={16} strokeWidth={1.5} /> },
          { label: "Visibility Gap", value: "-14pts", icon: <Target size={16} strokeWidth={1.5} /> },
          { label: "Topics Winning", value: "12/38", icon: <Search size={16} strokeWidth={1.5} /> },
        ].map((stat) => (
          <div key={stat.label} className="card-hover flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary">
              {stat.icon}
            </div>
            <div>
              <span className="text-xl font-semibold text-foreground">{stat.value}</span>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Radar comparison */}
        <div className="col-span-2 card-hover rounded-xl border border-border bg-card p-5">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-card-foreground">Competitive Radar</h3>
            <p className="text-xs text-muted-foreground">Multi-dimensional comparison</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            {[
              { key: "Your Brand", color: "#E8956B" },
              { key: "Ahrefs", color: "#FFCBA4" },
              { key: "SEMrush", color: "#C4A882" },
              { key: "Moz", color: "#8A8580" },
            ].map((l) => (
              <div key={l.key} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-[10px] text-muted-foreground">{l.key}</span>
              </div>
            ))}
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E8E4E0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "#8A8580" }} />
                <Radar name="Your Brand" dataKey="Your Brand" stroke="#E8956B" fill="#E8956B" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Ahrefs" dataKey="Ahrefs" stroke="#FFCBA4" fill="#FFCBA4" fillOpacity={0.08} strokeWidth={1.5} />
                <Radar name="SEMrush" dataKey="SEMrush" stroke="#C4A882" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                <Radar name="Moz" dataKey="Moz" stroke="#8A8580" fill="none" strokeWidth={1} strokeDasharray="2 2" />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor table */}
        <div className="col-span-3 card-hover rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Competitor Rankings</h3>
              <p className="text-xs text-muted-foreground">Detailed benchmarking</p>
            </div>
            <button className="nav-item rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Add Competitor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Brand", "Visibility", "Mentions", "Citations", "Sentiment", "Avg Pos.", "7d Change"].map((h) => (
                    <th key={h} className="pb-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground first:pr-4 last:text-right">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr key={c.name} className={cn("border-b border-border/50 last:border-0 hover:bg-secondary/30", c.name === "Your Brand" && "bg-primary/[0.03]")}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className={cn("text-xs font-medium", c.name === "Your Brand" ? "text-primary" : "text-foreground")}>{c.name}</span>
                        {c.name === "Your Brand" && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">You</span>}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-10 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary/60" style={{ width: `${c.visibility}%` }} />
                        </div>
                        <span className="font-mono text-xs">{c.visibility}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs">{c.mentions.toLocaleString()}</td>
                    <td className="py-3 font-mono text-xs">{c.citations.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={cn("text-xs font-medium", c.sentiment >= 70 ? "text-success" : "text-warning")}>{c.sentiment}%</span>
                    </td>
                    <td className="py-3 font-mono text-xs">#{c.avgPos}</td>
                    <td className="py-3 text-right">
                      <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", c.change > 0 ? "text-success" : c.change < 0 ? "text-destructive" : "text-muted-foreground")}>
                        {c.change > 0 ? <ArrowUpRight size={12} /> : c.change < 0 ? <ArrowDownRight size={12} /> : <Minus size={12} />}
                        {Math.abs(c.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gap analysis */}
      <div className="card-hover rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Topic Gap Analysis</h3>
            <p className="text-xs text-muted-foreground">Where competitors appear and you don't</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-[11px] text-muted-foreground">You</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#C4A882" }} /><span className="text-[11px] text-muted-foreground">Top Competitor</span></div>
          </div>
        </div>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gapAnalysis} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8A8580" }} angle={-20} textAnchor="end" height={50} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8A8580" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="yours" name="Your Brand" fill="#E8956B" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="topCompetitor" name="Top Competitor" fill="#C4A882" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
