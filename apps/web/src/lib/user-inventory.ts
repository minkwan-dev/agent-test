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
