export type InventoryItemRow = {
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
