"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { SearchBar } from "@/components/dashboard/search-bar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Your AI visibility at a glance" },
  "/dashboard/visibility": { title: "AI Visibility", subtitle: "Track brand presence across AI platforms" },
  "/dashboard/competitors": { title: "Competitors", subtitle: "Benchmark against your competition" },
  "/dashboard/prompts": { title: "Prompt Analytics", subtitle: "Explore what audiences ask AI about you" },
  "/dashboard/content": { title: "Content Studio", subtitle: "Optimize and create AI-friendly content" },
  "/dashboard/sources": { title: "Source Attribution", subtitle: "Pages driving your AI visibility" },
  "/dashboard/diagnostics": { title: "Diagnostics", subtitle: "Technical health for AI discovery" },
  "/dashboard/backlinks": { title: "Backlink Analysis", subtitle: "Monitor and optimize your inbound link profile" },
  "/dashboard/alerts": { title: "Alerts", subtitle: "Monitoring notifications and updates" },
  "/dashboard/settings": { title: "Settings", subtitle: "Manage your account and preferences" },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Handle global "/" shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search on "/" if not typing in an input
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on navigation
  const handleNavigate = () => {
    setMobileMenuOpen(false);
  };

  // Determine current page config based on the pathname
  const currentKey = Object.keys(pageConfig).find(key => pathname === key) || "/dashboard";
  const currentPage = pageConfig[currentKey] || pageConfig["/dashboard"];

  // Helper to map pathname to the simple IDs the sidebar expects
  const getActiveItem = () => {
    if (pathname === "/dashboard") return "overview";
    return pathname.split("/").pop() || "overview";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with mobile visibility classes */}
      <div className={cn(
        "z-50 transition-all duration-300 ease-in-out lg:relative",
        mobileMenuOpen 
          ? "fixed inset-y-0 left-0 flex translate-x-0" 
          : "fixed inset-y-0 left-0 flex -translate-x-full lg:relative lg:translate-x-0"
      )}>
        <Sidebar
          activeItem={getActiveItem()}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar 
          title={currentPage.title} 
          subtitle={currentPage.subtitle} 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          isMenuOpen={mobileMenuOpen}
          onSearchClick={() => setSearchOpen(!searchOpen)}
        />
        
        {/* Search Hover Trigger Zone */}
        <div 
          className="group relative flex flex-col"
          onMouseEnter={() => !searchOpen && setSearchOpen(false)} // Just a placeholder for hover logic
        >
          {/* The "Pull Handle" - subtle line at the top that glows on hover */}
          {!searchOpen && (
            <div 
              className="absolute inset-x-0 top-0 z-40 flex h-2 cursor-pointer items-start justify-center"
              onClick={() => setSearchOpen(true)}
              onMouseEnter={() => {
                // Optional: add a slight delay or just trigger on click
              }}
            >
              <div className="h-1 w-12 rounded-full bg-border transition-all group-hover:h-1.5 group-hover:bg-primary/40 group-hover:w-16" />
            </div>
          )}

          <SearchBar 
            isOpen={searchOpen} 
            onClose={() => setSearchOpen(false)} 
          />
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
