import { getApiUrl } from "@/lib/api";

export type InventoryItemDto = {
  id: string;
  profile_id: string;
  name: string;
  sku: string | null;
  icon: string;
  current_qty: number;
  safety_stock_max: number;
  created_at: string;
  updated_at: string;
};

export type CreateInventoryItemBody = {
  name: string;
  sku?: string;
  icon?: string;
  current_qty: number;
  safety_stock_max: number;
};

export async function fetchInventoryItems(
  token: string,
): Promise<InventoryItemDto[]> {
  const res = await fetch(`${getApiUrl()}/inventory/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("INVENTORY_LIST_FAILED");
  return res.json() as Promise<InventoryItemDto[]>;
}

export async function createInventoryItem(
  token: string,
  body: CreateInventoryItemBody,
): Promise<InventoryItemDto> {
  const res = await fetch(`${getApiUrl()}/inventory/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("INVENTORY_CREATE_FAILED");
  return res.json() as Promise<InventoryItemDto>;
}

export async function patchInventoryItem(
  token: string,
  id: string,
  body: { current_qty: number; safety_stock_max: number },
): Promise<InventoryItemDto> {
  const res = await fetch(`${getApiUrl()}/inventory/items/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("INVENTORY_PATCH_FAILED");
  return res.json() as Promise<InventoryItemDto>;
}
