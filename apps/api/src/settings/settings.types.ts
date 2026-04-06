export type UserSettingsDto = {
  profile_id?: string;
  inventory_scan_interval_minutes: number;
  autobuy_on_low_stock: boolean;
  daily_budget_ceiling_krw: number | null;
  notify_push_urgent: boolean;
  notify_daily_email: boolean;
  notify_webhook_url: string | null;
  updated_at?: string;
};

export type PatchUserSettingsDto = Partial<
  Pick<
    UserSettingsDto,
    | "inventory_scan_interval_minutes"
    | "autobuy_on_low_stock"
    | "daily_budget_ceiling_krw"
    | "notify_push_urgent"
    | "notify_daily_email"
    | "notify_webhook_url"
  >
>;
