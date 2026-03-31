"use client";

import { Download, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DashboardContent } from "@/components/novitas/dashboard-content";
import { DemoToast } from "@/components/novitas/demo-toast";
import { Overview } from "@/components/novitas/overview";
import { PageHeader } from "@/components/novitas/page-header";
import { InventoryTableBlock, OrdersTableBlock } from "@/components/novitas/tables";
import {
  formatBaselineTime,
  loadAutobuyPipelineState,
  type AutobuyPipelineState,
} from "@/lib/autobuy-pipeline";

export function OverviewContent() {
  const [toast, setToast] = useState<string | null>(null);
  const dismiss = useCallback(() => setToast(null), []);
  const [pipeline, setPipeline] = useState<AutobuyPipelineState>(() =>
    loadAutobuyPipelineState(),
  );

  useEffect(() => {
    const sync = () => setPipeline(loadAutobuyPipelineState());
    sync();
    window.addEventListener("novitas-pipeline-updated", sync);
    return () => window.removeEventListener("novitas-pipeline-updated", sync);
  }, []);

  return (
    <div className="flex flex-col">
      {toast ? <DemoToast message={toast} onDismiss={dismiss} /> : null}
      <PageHeader
        title="오늘의 운영"
        description="실시간 지표와 에이전트·발주 흐름을 한 화면에서 확인해요."
        actions={
          <>
            <button
              type="button"
              onClick={() =>
                setToast("리포트 생성 요청을 큐에 넣었어요. 준비되면 다운로드 링크를 보내드려요.")
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e8eb] bg-white px-3 py-2.5 text-xs font-semibold text-[#191f28] shadow-sm transition hover:bg-[#f9fafb] sm:w-auto sm:px-4 sm:text-sm"
            >
              <Download className="h-4 w-4 shrink-0 text-[#3182f6]" />
              <span className="sm:hidden">내보내기</span>
              <span className="hidden sm:inline">리포트 내보내기</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const s = loadAutobuyPipelineState();
                if (!s.lastBaselineAt) {
                  setToast(
                    "먼저 재고를 등록하거나 재고 현황에서 반영해 주세요. 자동구매는 재고 기준이 잡힌 뒤에 실행돼요.",
                  );
                  return;
                }
                setToast(
                  `자동구매 파이프라인을 한 번 실행했어요. (마지막 기준 ${formatBaselineTime(s.lastBaselineAt)})`,
                );
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3182f6] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#256dd4] sm:w-auto sm:px-4 sm:text-sm"
            >
              <Zap className="h-4 w-4 shrink-0" />
              <span className="sm:hidden">자동구매 실행</span>
              <span className="hidden sm:inline">즉시 자동구매 실행</span>
            </button>
          </>
        }
      />

      <DashboardContent innerClassName="space-y-6">
        <Overview.HeroBanner pipeline={pipeline} />

        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4 [&>*]:min-w-0">
          <Overview.KpiTile
            label="처리된 발주"
            value={
              <>
                34<span className="text-lg font-semibold text-[#8b95a1]">건</span>
              </>
            }
            hint={
              <>
                실패 <span className="font-medium text-[#191f28]">0</span> · 대기{" "}
                <span className="font-semibold text-amber-700">2</span>
              </>
            }
            accent="blue"
          />
          <Overview.KpiTile
            label="재고 경보"
            value={
              <>
                <span className="text-amber-600">7</span>
                <span className="text-lg font-semibold text-[#8b95a1]">개</span>
              </>
            }
            hint={
              <>
                <span className="font-semibold text-rose-600">긴급 3</span> · 주의 4
              </>
            }
            accent="rose"
          />
          <Overview.KpiTile
            label="에이전트 가동률"
            value={
              <>
                <span className="text-emerald-600">100</span>
                <span className="text-lg font-semibold text-[#8b95a1]">%</span>
              </>
            }
            hint={
              <>
                4/4 정상 · 오류{" "}
                <span className="font-semibold text-emerald-600">0건</span>
              </>
            }
            accent="emerald"
          />
          <Overview.KpiTile
            label="연동 공급 채널"
            value={
              <>
                4<span className="text-lg font-semibold text-[#8b95a1]">곳</span>
              </>
            }
            hint={<>컬리 · 쿠팡 · SSG · 이마트</>}
            accent="amber"
          />
        </div>

        <Overview.AgentCards />

        <div className="grid min-w-0 gap-4 lg:grid-cols-5 lg:gap-6">
          <div className="min-w-0 lg:col-span-3">
            <InventoryTableBlock pageSize={8} />
          </div>
          <Overview.TodaySummary />
        </div>

        <OrdersTableBlock pageSize={8} />

        <Overview.PageFooter />
      </DashboardContent>
    </div>
  );
}
