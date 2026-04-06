export type CreateInventoryItemDto = {
  name: string;
  sku?: string;
  icon?: string;
  current_qty: number;
  safety_stock_max: number;
};
