import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/lib/auth-atoms";
import {
  fetchInventoryItems,
  type InventoryItemDto,
} from "@/lib/inventory-api";
import type { InventoryAlertRow } from "@/lib/mock-data";
import { deriveStockLevel } from "@/lib/user-inventory";

export function inventoryDtoToAlertRow(r: InventoryItemDto): InventoryAlertRow {
  return {
    id: r.id,
    icon: r.icon,
    name: r.sku ? `${r.name} · ${r.sku}` : r.name,
    cur: r.current_qty,
    max: r.safety_stock_max,
    level: deriveStockLevel(r.current_qty, r.safety_stock_max),
  };
}

export function useInventoryServerRows() {
  const token = useAtomValue(accessTokenAtom);
  return useQuery({
    queryKey: ["inventory", "items", token],
    queryFn: async () => {
      const rows = await fetchInventoryItems(token!);
      return rows.map(inventoryDtoToAlertRow);
    },
    enabled: Boolean(token),
    staleTime: 30_000,
  });
}
