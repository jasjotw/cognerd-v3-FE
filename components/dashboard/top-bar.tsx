"use client";

import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Globe,
  Plus,
  RefreshCw,
} from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Date range selector */}
        <button className="nav-item flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:border-primary/30">
          <Calendar size={13} strokeWidth={1.5} />
          <span>Last 7 days</span>
          <ChevronDown size={12} strokeWidth={1.5} className="text-muted-foreground" />
        </button>

        {/* Platform filter */}
        <button className="nav-item flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:border-primary/30">
          <Globe size={13} strokeWidth={1.5} />
          <span>All Platforms</span>
          <ChevronDown size={12} strokeWidth={1.5} className="text-muted-foreground" />
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Refresh */}
        <button
          className="nav-item flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Refresh data"
        >
          <RefreshCw size={14} strokeWidth={1.5} />
        </button>

        {/* Export */}
        <button
          className="nav-item flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Export data"
        >
          <Download size={14} strokeWidth={1.5} />
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Add brand */}
        <button className="nav-item flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">
          <Plus size={13} strokeWidth={2} />
          <span>Add Brand</span>
        </button>
      </div>
    </header>
  );
}
