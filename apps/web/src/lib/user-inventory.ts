import { recordInventoryBaseline } from "@/lib/autobuy-pipeline";
import type { InventoryAlertRow } from "@/lib/mock-data";

export const USER_INVENTORY_KEY = "novitas-user-inventory";

function persistUserInventory(rows: InventoryAlertRow[]): void {
  localStorage.setItem(USER_INVENTORY_KEY, JSON.stringify(rows));
  window.dispatchEvent(new CustomEvent("novitas-inventory-updated"));
}

export function loadUserInventory(): InventoryAlertRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER_INVENTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InventoryAlertRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 현재고 대비 안전재고 비율로 긴급/주의 구분 */
export function deriveStockLevel(cur: number, max: number): "urgent" | "warn" {
  if (max <= 0) return "warn";
  const ratio = cur / max;
  if (ratio < 0.35) return "urgent";
  return "warn";
}

export function appendUserInventory(row: InventoryAlertRow): void {
  const existing = loadUserInventory();
  const next = [row, ...existing];
  persistUserInventory(next);
  recordInventoryBaseline("register");
}

export function updateUserInventoryRow(
  id: string,
  patch: { cur?: number; max?: number },
): void {
  const rows = loadUserInventory();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const row = rows[idx];
  const cur = patch.cur ?? row.cur;
  const max = patch.max ?? row.max;
  const level = deriveStockLevel(cur, max);
  rows[idx] = { ...row, cur, max, level };
  persistUserInventory(rows);
  recordInventoryBaseline("manual");
}

export function isUserInventoryRowId(id: string): boolean {
  return id.startsWith("user-");
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** 로컬 데모 행(`user-`) 또는 서버 저장 품목(uuid)만 재고 반영 저장 가능 */
export function canReflectInventoryRow(id: string): boolean {
  return id.startsWith("user-") || UUID_RE.test(id);
}

/**
 * 개요·재고 목록에서 재고 반영 버튼 노출 여부.
 * 재고 비율 35% 이하이면 행 종류와 관계없이 버튼을 보여 주고, 그보다 높으면 저장 가능한 행만 버튼을 둡니다.
 */
export function shouldShowInventoryReflectButton(
  id: string,
  pctRounded: number,
): boolean {
  if (pctRounded <= 35) return true;
  return canReflectInventoryRow(id);
}
