import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { useHydrated } from "@/lib/use-hydrated";
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
  const hydrated = useHydrated();
  const token = useAtomValue(accessTokenAtom);
  const sessionToken = hydrated ? token : null;
  return useQuery({
    queryKey: ["inventory", "items", sessionToken],
    queryFn: async () => {
      const rows = await fetchInventoryItems(sessionToken!);
      return rows.map(inventoryDtoToAlertRow);
    },
    enabled: Boolean(sessionToken),
    staleTime: 30_000,
  });
}
