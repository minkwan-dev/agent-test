"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { AppShellLayout } from "@/components/novitas/app-shell/index";
import { RightPanel } from "@/components/novitas/right-panel";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  /** 겹침 시 widthPx만큼 본문 min-width를 늘려 가로 스크롤로 패널 아래 영역까지 볼 수 있게 함 */
  const [lgPanelOverlay, setLgPanelOverlay] = useState<{
    overlaps: boolean;
    widthPx: number;
  }>({ overlaps: false, widthPx: 0 });
  const closeAiPanel = useCallback(() => setPanelOpen(false), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const onLgPanelOverlayMetrics = useCallback(
    (state: { overlaps: boolean; widthPx: number }) => {
      setLgPanelOverlay(state);
    },
    [],
  );

  return (
    <div className="nv-bg flex h-dvh min-h-0 max-h-dvh flex-col overflow-hidden">
      <AppShellLayout.Header onMenuClick={() => setSidebarOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppShellLayout.Sidebar pathname={pathname} open={sidebarOpen} onNavigate={closeSidebar} />

        <main
          className={cn(
            "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f2f4f6]",
            /* 겹침 모드에서도 패널은 absolute라 flex-row 유지 — 불필요한 flex-col 전환으로 높이/스크롤이 흔들리지 않게 함 */
            "lg:flex-row lg:items-stretch",
          )}
        >
          {/*
            가로: 패널이 본문을 덮을 때 min-width로 우측 방향 스크롤만 이 래퍼에서 담당
            세로: 안쪽 래퍼가 담당 — 한 요소에 overflow-auto를 쓰면 축이 섞여 스크롤이 어색해짐
          */}
          <div
            data-dashboard-scroll
            className="@container relative z-0 flex min-h-0 min-w-0 flex-1 flex-row overflow-x-auto overflow-y-hidden overscroll-x-contain lg:min-w-0"
          >
            {/*
              패널 겹침 시 minWidth로 전체를 넓히면 mx-auto 본문이 그 넓이 기준으로 가운데 정렬되어
              왼쪽에만 큰 빈 칸이 보임(오른쪽은 패널에 가려짐). 스크롤 폭은 오른쪽 스페이서로만 늘림.
            */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:min-w-[800px]">
              <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-y-none">
                {children}
              </div>
            </div>
            {lgPanelOverlay.overlaps && lgPanelOverlay.widthPx > 0 ? (
              <div
                className="shrink-0 self-stretch"
                style={{ width: lgPanelOverlay.widthPx }}
                aria-hidden
              />
            ) : null}
          </div>

          {!panelOpen ? (
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="fixed bottom-5 right-5 z-[150] flex h-12 w-12 items-center justify-center rounded-full bg-[#6eb89a] text-white shadow-lg shadow-[#6eb89a]/20 transition hover:bg-[#5aa688] lg:hidden"
              title="AI 어시스턴트"
              aria-expanded={false}
              aria-label="AI 어시스턴트 열기"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          ) : null}

          <RightPanel
            mobileOpen={panelOpen}
            onMobileClose={closeAiPanel}
            onLgOverlayMetrics={onLgPanelOverlayMetrics}
          />
        </main>
      </div>
    </div>
  );
}
