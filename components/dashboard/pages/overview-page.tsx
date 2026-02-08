"use client";

import { Eye, Globe, MessageSquare, TrendingUp, Link2, Zap } from "lucide-react";
import { MetricCard } from "../metric-card";
import { VisibilityScore } from "../visibility-score";
import { VisibilityTrendChart } from "../visibility-trend-chart";
import { PlatformBreakdown } from "../platform-breakdown";
import { CompetitorTable } from "../competitor-table";
import { AlertsFeed } from "../alerts-feed";
import { SentimentWidget } from "../sentiment-widget";
import { ContentInsights } from "../content-insights";
import { SourceAttribution } from "../source-attribution";
import { PromptAnalyticsWidget } from "../prompt-analytics-widget";
import { AIHealthScore } from "../ai-health-score";

export function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top metrics row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Large visibility score */}
        <VisibilityScore score={68} change={12} label="Overall Visibility" />

        {/* Metric cards */}
        <MetricCard
          label="Brand Mentions"
          value="466"
          change={23}
          changeLabel="Across 5 AI platforms"
          icon={<MessageSquare size={18} strokeWidth={1.5} />}
          accent="primary"
        />
        <MetricCard
          label="Source Citations"
          value="302"
          change={8}
          changeLabel="URLs cited in AI responses"
          icon={<Link2 size={18} strokeWidth={1.5} />}
          accent="success"
        />
        <MetricCard
          label="Avg. Position"
          value="#2.1"
          change={-0.4}
          changeLabel="Position in AI answers"
          icon={<TrendingUp size={18} strokeWidth={1.5} />}
          accent="warning"
        />
        <MetricCard
          label="Opportunities"
          value="24"
          change={6}
          changeLabel="Gaps where competitors appear"
          icon={<Zap size={18} strokeWidth={1.5} />}
          accent="primary"
        />
      </div>

      {/* Trend chart + Platform breakdown */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <VisibilityTrendChart />
        </div>
        <div className="col-span-2">
          <PlatformBreakdown />
        </div>
      </div>

      {/* Competitors + Alerts */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <CompetitorTable />
        </div>
        <div className="col-span-2">
          <AlertsFeed />
        </div>
      </div>

      {/* Sentiment + Content Insights */}
      <div className="grid grid-cols-2 gap-6">
        <SentimentWidget />
        <ContentInsights />
      </div>

      {/* Sources + Prompts + AI Health */}
      <div className="grid grid-cols-3 gap-6">
        <SourceAttribution />
        <PromptAnalyticsWidget />
        <AIHealthScore />
      </div>
    </div>
  );
}
