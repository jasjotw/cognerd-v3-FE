"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { OverviewPage } from "@/components/dashboard/pages/overview-page";
import { VisibilityPage } from "@/components/dashboard/pages/visibility-page";
import { CompetitorsPage } from "@/components/dashboard/pages/competitors-page";
import { PromptsPage } from "@/components/dashboard/pages/prompts-page";
import { ContentPage } from "@/components/dashboard/pages/content-page";
import { SourcesPage } from "@/components/dashboard/pages/sources-page";
import { DiagnosticsPage } from "@/components/dashboard/pages/diagnostics-page";
import { AlertsPage } from "@/components/dashboard/pages/alerts-page";
import { SettingsPage } from "@/components/dashboard/pages/settings-page";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard", subtitle: "Your AI visibility at a glance" },
  visibility: { title: "AI Visibility", subtitle: "Track brand presence across AI platforms" },
  competitors: { title: "Competitors", subtitle: "Benchmark against your competition" },
  prompts: { title: "Prompt Analytics", subtitle: "Explore what audiences ask AI about you" },
  content: { title: "Content Studio", subtitle: "Optimize and create AI-friendly content" },
  sources: { title: "Source Attribution", subtitle: "Pages driving your AI visibility" },
  diagnostics: { title: "Diagnostics", subtitle: "Technical health for AI discovery" },
  alerts: { title: "Alerts", subtitle: "Monitoring notifications and updates" },
  settings: { title: "Settings", subtitle: "Manage your account and preferences" },
};

export default function Home() {
  const [activeItem, setActiveItem] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentPage = pageConfig[activeItem] || pageConfig.overview;

  const renderPage = () => {
    switch (activeItem) {
      case "overview":
        return <OverviewPage />;
      case "visibility":
        return <VisibilityPage />;
      case "competitors":
        return <CompetitorsPage />;
      case "prompts":
        return <PromptsPage />;
      case "content":
        return <ContentPage />;
      case "sources":
        return <SourcesPage />;
      case "diagnostics":
        return <DiagnosticsPage />;
      case "alerts":
        return <AlertsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={currentPage.title} subtitle={currentPage.subtitle} />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
