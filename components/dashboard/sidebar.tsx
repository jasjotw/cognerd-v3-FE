"use client";

import React from "react"

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Eye,
  Users,
  FileText,
  MessageSquare,
  Link2,
  Wrench,
  Bell,
  Settings,
  ChevronLeft,
  Search,
  Sparkles,
  Globe,
  TrendingUp,
  Shield,
  BarChart3,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  id: string;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Monitor",
    items: [
      {
        label: "Overview",
        icon: <LayoutDashboard size={18} strokeWidth={1.5} />,
        id: "overview",
      },
      {
        label: "AI Visibility",
        icon: <Eye size={18} strokeWidth={1.5} />,
        id: "visibility",
        badge: "Live",
      },
      {
        label: "Competitors",
        icon: <Users size={18} strokeWidth={1.5} />,
        id: "competitors",
      },
      {
        label: "Prompt Analytics",
        icon: <MessageSquare size={18} strokeWidth={1.5} />,
        id: "prompts",
      },
    ],
  },
  {
    title: "Optimize",
    items: [
      {
        label: "Content Studio",
        icon: <FileText size={18} strokeWidth={1.5} />,
        id: "content",
      },
      {
        label: "Source Attribution",
        icon: <Link2 size={18} strokeWidth={1.5} />,
        id: "sources",
      },
      {
        label: "Diagnostics",
        icon: <Wrench size={18} strokeWidth={1.5} />,
        id: "diagnostics",
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        label: "Alerts",
        icon: <Bell size={18} strokeWidth={1.5} />,
        id: "alerts",
        badge: "3",
      },
      {
        label: "Settings",
        icon: <Settings size={18} strokeWidth={1.5} />,
        id: "settings",
      },
    ],
  },
];

interface SidebarProps {
  activeItem: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeItem,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Sparkles size={16} className="text-primary-foreground" strokeWidth={1.5} />
          </div>
          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">
              CogNerd
            </span>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className={cn(
            "nav-item flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            size={16}
            strokeWidth={1.5}
            className={cn(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pt-4 pb-2">
          <button className="nav-item flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground hover:border-primary/30">
            <Search size={14} strokeWidth={1.5} />
            <span>Search...</span>
            <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              /
            </kbd>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2" role="navigation" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {group.title}
              </p>
            )}
            {collapsed && <div className="mb-1.5 h-px bg-sidebar-border" />}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "nav-item flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium",
                      activeItem === item.id
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                    aria-current={activeItem === item.id ? "page" : undefined}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        activeItem === item.id && "text-primary"
                      )}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                              item.badge === "Live"
                                ? "bg-success/10 text-success"
                                : "bg-primary/10 text-primary"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              A
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                Acme Corp
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Pro Plan
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              A
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
