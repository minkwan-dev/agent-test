"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { AppShellLayout } from "@/components/novitas/app-shell/index";
import { RightPanel } from "@/components/novitas/right-panel";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const closeAiPanel = useCallback(() => setPanelOpen(false), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const isDash = pathname.startsWith("/dashboard");

  return (
    <div className="nv-bg flex h-dvh min-h-0 max-h-dvh flex-col overflow-hidden">
      <AppShellLayout.Header onMenuClick={() => setSidebarOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppShellLayout.Sidebar pathname={pathname} open={sidebarOpen} onNavigate={closeSidebar} />

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f2f4f6] lg:flex-row lg:items-stretch">
          <div className="scrollbar-thin flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
            {isDash ? <AppShellLayout.DashboardTopNav pathname={pathname} /> : null}
            {children}
          </div>

          {!panelOpen ? (
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="fixed bottom-5 right-5 z-[150] flex h-12 w-12 items-center justify-center rounded-full bg-[#3182f6] text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#256dd4] lg:hidden"
              title="AI 어시스턴트"
              aria-expanded={false}
              aria-label="AI 어시스턴트 열기"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          ) : null}

          <RightPanel mobileOpen={panelOpen} onMobileClose={closeAiPanel} />
        </main>
      </div>
    </div>
  );
}
