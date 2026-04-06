import { getApiUrl } from "@/lib/api";

/** 브라우저에서 API 호스트가 꺼져 있거나 주소가 틀릴 때 (예: net::ERR_CONNECTION_REFUSED) */
export function isSettingsFetchNetworkError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const m = err.message.toLowerCase();
  return (
    m.includes("failed to fetch") ||
    m.includes("networkerror") ||
    m.includes("load failed") ||
    m.includes("network request failed")
  );
}

/** 연동 업체·마켓 자동 결제 시 세션/로그인 정책 */
export type IntegrationPolicyDto = {
  autobuy_only_linked_partners: boolean;
  require_store_session_for_autobuy: boolean;
  on_missing_store_session:
    | "pause_and_notify"
    | "notify_only"
    | "skip_partner_try_next";
  forbid_ad_hoc_marketplace_login: boolean;
};

export const DEFAULT_INTEGRATION_POLICY: IntegrationPolicyDto = {
  autobuy_only_linked_partners: true,
  require_store_session_for_autobuy: true,
  on_missing_store_session: "pause_and_notify",
  forbid_ad_hoc_marketplace_login: true,
};

export type UserSettingsDto = {
  profile_id?: string;
  inventory_scan_interval_minutes: number;
  autobuy_on_low_stock: boolean;
  daily_budget_ceiling_krw: number | null;
  notify_push_urgent: boolean;
  notify_daily_email: boolean;
  notify_webhook_url: string | null;
  integration_policy: IntegrationPolicyDto;
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
> & {
  integration_policy?: Partial<IntegrationPolicyDto>;
};

export async function fetchUserSettings(token: string): Promise<UserSettingsDto> {
  const res = await fetch(`${getApiUrl()}/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("SETTINGS_FETCH_FAILED");
  return res.json() as Promise<UserSettingsDto>;
}

export async function patchUserSettings(
  token: string,
  body: PatchUserSettingsDto,
): Promise<UserSettingsDto> {
  const res = await fetch(`${getApiUrl()}/settings`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("SETTINGS_PATCH_FAILED");
  return res.json() as Promise<UserSettingsDto>;
}
