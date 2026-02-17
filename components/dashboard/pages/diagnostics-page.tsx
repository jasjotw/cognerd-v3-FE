"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { Check, X, AlertTriangle, Shield, Wrench, Globe, FileCode, Zap, RefreshCw, ArrowRight } from "lucide-react";

interface DiagnosticCheck {
  category: string;
  checks: { label: string; status: "pass" | "fail" | "warning"; detail: string; fix?: string }[];
}

const diagnosticGroups: DiagnosticCheck[] = [
  {
    category: "AI Crawlability",
    checks: [
      { label: "GPTBot Access", status: "pass", detail: "robots.txt allows GPTBot crawling" },
      { label: "GoogleOther Access", status: "fail", detail: "GoogleOther is blocked in robots.txt", fix: "Add 'User-agent: GoogleOther Allow: /' to robots.txt" },
      { label: "CCBot Access", status: "pass", detail: "CCBot (Common Crawl) has full access" },
      { label: "PerplexityBot Access", status: "warning", detail: "Some directories blocked for PerplexityBot", fix: "Review /admin and /internal directory blocks" },
    ],
  },
  {
    category: "Structured Data",
    checks: [
      { label: "Schema.org Markup", status: "pass", detail: "Valid JSON-LD structured data on 94% of pages" },
      { label: "FAQ Schema", status: "warning", detail: "FAQ schema found on 12 pages, 8 have errors", fix: "Fix invalid FAQ markup on 8 pages" },
      { label: "How-To Schema", status: "pass", detail: "How-To schema correctly implemented on guide pages" },
      { label: "Organization Schema", status: "pass", detail: "Organization markup present on homepage" },
    ],
  },
  {
    category: "Content Structure",
    checks: [
      { label: "Heading Hierarchy", status: "pass", detail: "Correct H1-H6 hierarchy on 98% of pages" },
      { label: "Meta Descriptions", status: "warning", detail: "15 pages have meta descriptions over 160 chars", fix: "Trim meta descriptions to under 160 characters" },
      { label: "Content Freshness", status: "warning", detail: "12 key pages not updated in 30+ days", fix: "Review and update stale content" },
      { label: "Internal Linking", status: "pass", detail: "Average 4.2 internal links per page" },
    ],
  },
  {
    category: "Performance",
    checks: [
      { label: "Page Load Speed", status: "pass", detail: "Average 1.2s load time (LCP)" },
      { label: "Mobile Friendly", status: "pass", detail: "All pages pass mobile usability tests" },
      { label: "Core Web Vitals", status: "pass", detail: "All CWV metrics in good range" },
      { label: "HTTPS Security", status: "pass", detail: "SSL certificates valid on all pages" },
    ],
  },
];

const statusConfig = {
  pass: { icon: <Check size={13} strokeWidth={2.5} />, bg: "bg-success/10 text-success", badge: "bg-success/10 text-success" },
  fail: { icon: <X size={13} strokeWidth={2.5} />, bg: "bg-destructive/10 text-destructive", badge: "bg-destructive/10 text-destructive" },
  warning: { icon: <AlertTriangle size={13} strokeWidth={2} />, bg: "bg-warning/10 text-warning", badge: "bg-warning/10 text-warning" },
};

const categoryIcons: Record<string, React.ReactNode> = {
  "AI Crawlability": <Globe size={16} strokeWidth={1.5} />,
  "Structured Data": <FileCode size={16} strokeWidth={1.5} />,
  "Content Structure": <Wrench size={16} strokeWidth={1.5} />,
  "Performance": <Zap size={16} strokeWidth={1.5} />,
};

export function DiagnosticsPage() {
  const allChecks = diagnosticGroups.flatMap((g) => g.checks);
  const passed = allChecks.filter((c) => c.status === "pass").length;
  const warnings = allChecks.filter((c) => c.status === "warning").length;
  const failed = allChecks.filter((c) => c.status === "fail").length;
  const score = Math.round((passed / allChecks.length) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 card-hover flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-5">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#F5F0EB" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke={score >= 70 ? "#5B9A6B" : score >= 50 ? "#D4A44E" : "#D4644E"} strokeWidth="3" strokeDasharray={`${score * 0.942} 100`} strokeLinecap="round" />
            </svg>
            <span className="absolute text-lg font-bold text-foreground">{score}</span>
          </div>
          <span className="text-xs font-semibold text-foreground">Health Score</span>
          <span className="text-[10px] text-muted-foreground">{passed}/{allChecks.length} passing</span>
        </div>

        {[
          { label: "Passed", value: passed.toString(), color: "text-success", icon: <Check size={16} strokeWidth={2} /> },
          { label: "Warnings", value: warnings.toString(), color: "text-warning", icon: <AlertTriangle size={16} strokeWidth={1.5} /> },
          { label: "Failed", value: failed.toString(), color: "text-destructive", icon: <X size={16} strokeWidth={2} /> },
          { label: "Last Scan", value: "2h ago", color: "text-foreground", icon: <RefreshCw size={16} strokeWidth={1.5} /> },
        ].map((stat) => (
          <div key={stat.label} className="card-hover flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-secondary", stat.color)}>{stat.icon}</div>
            <div>
              <span className={cn("text-xl font-semibold", stat.color)}>{stat.value}</span>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnostic groups */}
      <div className="grid grid-cols-2 gap-6">
        {diagnosticGroups.map((group) => {
          const gPassed = group.checks.filter((c) => c.status === "pass").length;
          return (
            <div key={group.category} className="card-hover rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    {categoryIcons[group.category]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground">{group.category}</h3>
                    <p className="text-[11px] text-muted-foreground">{gPassed}/{group.checks.length} passing</p>
                  </div>
                </div>
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${(gPassed / group.checks.length) * 100}%` }} />
                </div>
              </div>
              <div className="flex flex-col">
                {group.checks.map((check, i) => (
                  <div key={check.label} className={cn("flex items-start gap-3 px-5 py-3", i < group.checks.length - 1 && "border-b border-border/50")}>
                    <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", statusConfig[check.status].bg)}>
                      {statusConfig[check.status].icon}
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="text-xs font-medium text-foreground">{check.label}</span>
                      <span className="text-[11px] leading-relaxed text-muted-foreground">{check.detail}</span>
                      {check.fix && (
                        <button className="mt-1 flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80">
                          Fix: {check.fix}
                          <ArrowRight size={10} strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
