import { OverviewKpiTile } from "@/components/novitas/overview/overview-kpi-tile";

/** 개요 상단 — 오늘 숫자 스냅샷 (데모·샘플 지표) */
export function OverviewTopSummary() {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4 [&>*]:min-w-0">
      <OverviewKpiTile
        label="오늘 자동 발주"
        value={
          <>
            34<span className="text-lg font-semibold text-[var(--color-muted)]">건</span>
          </>
        }
        accent="blue"
      />
      <OverviewKpiTile
        label="재고 경보"
        value={
          <>
            <span className="text-amber-600">7</span>
            <span className="text-lg font-semibold text-[var(--color-muted)]">개</span>
          </>
        }
        accent="rose"
      />
      <OverviewKpiTile
        label="오늘 누적 발주 금액"
        value={
          <>
            ₩<span className="tabular-nums">1,840,720</span>
          </>
        }
        accent="emerald"
      />
      <OverviewKpiTile
        label="연동 공급 채널"
        value={
          <>
            4<span className="text-lg font-semibold text-[var(--color-muted)]">곳</span>
          </>
        }
        accent="amber"
      />
    </div>
  );
}
