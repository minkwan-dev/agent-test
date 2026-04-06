/** 연동 업체·마켓 자동 결제 시 세션/로그인 정책 (에이전트·백엔드가 참고) */
export type IntegrationPolicyDto = {
  /** 등록된 연동 업체만 자동 결제 대상 */
  autobuy_only_linked_partners: boolean;
  /** 쿠팡 등 마켓에 유효한 로그인 세션이 없으면 자동 결제하지 않음 */
  require_store_session_for_autobuy: boolean;
  /** 세션 없음·만료 시 동작 */
  on_missing_store_session:
    | "pause_and_notify"
    | "notify_only"
    | "skip_partner_try_next";
  /** 자동 흐름 중 브라우저로 로그인 화면을 띄우지 않음 */
  forbid_ad_hoc_marketplace_login: boolean;
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
  /** 부분 갱신 가능 */
  integration_policy?: Partial<IntegrationPolicyDto>;
};
