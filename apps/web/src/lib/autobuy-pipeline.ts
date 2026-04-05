/**
 * 판매할 때마다 자동으로 빠지는 연동이 없을 때는, 사용자가 재고를 "반영"해 기준 시점을 잡고,
 * 그 시점부터 재고 살피기 → 발주 판단 → … 자동 발주 흐름이 돈다고 가정합니다.
 * (백엔드 연동 시 동일 필드로 교체)
 */

export const PIPELINE_STORAGE_KEY = "novitas-autobuy-pipeline";

export type BaselineSource = "register" | "manual";

export type AutobuyPipelineState = {
  /** 마지막으로 재고 기준이 확정된 시각 — 이후 자동 발주·알림의 기준 */
  lastBaselineAt: string | null;
  lastSource: BaselineSource | null;
};

/** SSR·하이드레이션과 클라 첫 페인트를 맞추기 위해 초기 state에만 사용 (localStorage는 마운트 후 로드) */
export const DEFAULT_AUTOBUY_PIPELINE_STATE: AutobuyPipelineState = {
  lastBaselineAt: null,
  lastSource: null,
};

export function loadAutobuyPipelineState(): AutobuyPipelineState {
  if (typeof window === "undefined") {
    return DEFAULT_AUTOBUY_PIPELINE_STATE;
  }
  try {
    const raw = localStorage.getItem(PIPELINE_STORAGE_KEY);
    if (!raw) return DEFAULT_AUTOBUY_PIPELINE_STATE;
    const parsed = JSON.parse(raw) as AutobuyPipelineState;
    return {
      lastBaselineAt: parsed.lastBaselineAt ?? null,
      lastSource: parsed.lastSource ?? null,
    };
  } catch {
    return DEFAULT_AUTOBUY_PIPELINE_STATE;
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
