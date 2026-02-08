"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { Bell, TrendingUp, TrendingDown, Zap, MessageSquare, AlertTriangle, Check, Filter, Settings } from "lucide-react";

interface AlertItem {
  id: string;
  type: "visibility_drop" | "visibility_spike" | "new_mention" | "competitor" | "sentiment" | "diagnostic";
  title: string;
  description: string;
  time: string;
  read: boolean;
  severity: "info" | "warning" | "critical";
}

const allAlerts: AlertItem[] = [
  { id: "1", type: "visibility_spike", title: "Visibility spike on ChatGPT", description: "Your brand visibility increased 23% in the last 24h for product-related queries. ChatGPT is now citing your content 3x more frequently.", time: "12m ago", read: false, severity: "info" },
  { id: "2", type: "competitor", title: "Competitor A gaining in Gemini", description: "Competitor A overtook your position in 8 prompts related to 'best analytics tools'. They published a new comparison article yesterday.", time: "1h ago", read: false, severity: "warning" },
  { id: "3", type: "visibility_drop", title: "Drop detected in AI Overviews", description: "Citations from your blog dropped 15% in Google AI Overviews this week. The affected pages are primarily in the /guides/ directory.", time: "3h ago", read: false, severity: "critical" },
  { id: "4", type: "new_mention", title: "New brand mention in Perplexity", description: "Your brand was cited in a comparison query about SEO monitoring tools, appearing in position #2 with a positive sentiment.", time: "5h ago", read: true, severity: "info" },
  { id: "5", type: "sentiment", title: "Sentiment shift detected", description: "Positive sentiment ratio improved from 62% to 78% across all platforms. This coincides with your latest product launch content.", time: "8h ago", read: true, severity: "info" },
  { id: "6", type: "diagnostic", title: "Crawl issue detected", description: "PerplexityBot encountered 403 errors on 3 pages in the /resources/ directory. This may affect your visibility on Perplexity.", time: "12h ago", read: true, severity: "warning" },
  { id: "7", type: "competitor", title: "New competitor detected", description: "A new brand 'AITracker' has appeared in 12 prompts where you're currently visible. Monitor their growing presence.", time: "1d ago", read: true, severity: "info" },
  { id: "8", type: "visibility_spike", title: "Position #1 for key query", description: "You've achieved position #1 in ChatGPT for 'ai visibility monitoring tool' - previously held by Competitor A.", time: "1d ago", read: true, severity: "info" },
  { id: "9", type: "visibility_drop", title: "Lost citation in Claude", description: "Claude no longer cites your API documentation page for 'how to track AI mentions' queries. Review content freshness.", time: "2d ago", read: true, severity: "warning" },
  { id: "10", type: "new_mention", title: "Featured in AI Overviews", description: "Your brand now appears in Google AI Overviews for 'seo monitoring platforms' - a new high-volume query.", time: "2d ago", read: true, severity: "info" },
];

const alertIcons: Record<string, React.ReactNode> = {
  visibility_drop: <TrendingDown size={14} strokeWidth={1.5} />,
  visibility_spike: <TrendingUp size={14} strokeWidth={1.5} />,
  new_mention: <MessageSquare size={14} strokeWidth={1.5} />,
  competitor: <Zap size={14} strokeWidth={1.5} />,
  sentiment: <AlertTriangle size={14} strokeWidth={1.5} />,
  diagnostic: <Settings size={14} strokeWidth={1.5} />,
};

const alertColors: Record<string, string> = {
  visibility_drop: "bg-destructive/8 text-destructive",
  visibility_spike: "bg-success/8 text-success",
  new_mention: "bg-primary/8 text-primary",
  competitor: "bg-warning/8 text-warning",
  sentiment: "bg-primary/8 text-primary",
  diagnostic: "bg-warning/8 text-warning",
};

const severityBadge: Record<string, string> = {
  info: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  critical: "bg-destructive/10 text-destructive",
};

export function AlertsPage() {
  const unread = allAlerts.filter((a) => !a.read).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Alerts", value: allAlerts.length.toString(), icon: <Bell size={16} strokeWidth={1.5} /> },
          { label: "Unread", value: unread.toString(), icon: <MessageSquare size={16} strokeWidth={1.5} /> },
          { label: "Critical", value: allAlerts.filter((a) => a.severity === "critical").length.toString(), icon: <AlertTriangle size={16} strokeWidth={1.5} /> },
          { label: "This Week", value: "8", icon: <TrendingUp size={16} strokeWidth={1.5} /> },
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

      {/* Alerts list */}
      <div className="card-hover rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-semibold text-card-foreground">All Alerts</h3>
            {unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{unread}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="nav-item flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Filter size={11} strokeWidth={1.5} />
              Filter
            </button>
            <button className="nav-item flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Check size={11} strokeWidth={2} />
              Mark all read
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {allAlerts.map((alert, i) => (
            <div
              key={alert.id}
              className={cn(
                "flex gap-3 px-5 py-4 transition-colors hover:bg-secondary/30",
                i < allAlerts.length - 1 && "border-b border-border/50",
                !alert.read && "bg-primary/[0.02]"
              )}
            >
              <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", alertColors[alert.type])}>
                {alertIcons[alert.type]}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-medium text-foreground", !alert.read && "font-semibold")}>{alert.title}</span>
                  {!alert.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  <span className={cn("ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", severityBadge[alert.severity])}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{alert.description}</p>
                <span className="text-[10px] text-muted-foreground/60">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
