/**
 * POS·실사 등으로 재고가 자동 차감되기 전까지는 사용자가 재고를 "반영"해 기준 시점을 잡고,
 * 그 시점부터 InventoryWatcher → PurchaseDecider … 자동구매 파이프라인이 동작한다고 가정합니다.
 * (백엔드 연동 시 동일 필드로 교체)
 */

export const PIPELINE_STORAGE_KEY = "novitas-autobuy-pipeline";

export type BaselineSource = "register" | "manual";

export type AutobuyPipelineState = {
  /** 마지막으로 재고 기준이 확정된 시각 — 이후 에이전트 감시·자동구매 트리거 기준 */
  lastBaselineAt: string | null;
  lastSource: BaselineSource | null;
};

export function loadAutobuyPipelineState(): AutobuyPipelineState {
  if (typeof window === "undefined") {
    return { lastBaselineAt: null, lastSource: null };
  }
  try {
    const raw = localStorage.getItem(PIPELINE_STORAGE_KEY);
    if (!raw) return { lastBaselineAt: null, lastSource: null };
    const parsed = JSON.parse(raw) as AutobuyPipelineState;
    return {
      lastBaselineAt: parsed.lastBaselineAt ?? null,
      lastSource: parsed.lastSource ?? null,
    };
  } catch {
    return { lastBaselineAt: null, lastSource: null };
  }
}

export function recordInventoryBaseline(source: BaselineSource): void {
  if (typeof window === "undefined") return;
  const state: AutobuyPipelineState = {
    lastBaselineAt: new Date().toISOString(),
    lastSource: source,
  };
  localStorage.setItem(PIPELINE_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("novitas-pipeline-updated"));
}

export function formatBaselineTime(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
