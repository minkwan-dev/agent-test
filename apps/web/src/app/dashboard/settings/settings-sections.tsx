import {
  nvFormLabel,
  nvFormRow,
  nvFormStack,
  nvLogToolbarButton,
  nvSectionDesc,
  nvSectionTitle,
} from "@/components/novitas/dashboard-content";
import type { IntegrationPolicyDto } from "@/lib/settings-api";
import { cn } from "@/lib/utils";

export function SettingsAutobuySection({
  scanInterval,
  onScanIntervalChange,
  autobuyOnLow,
  onAutobuyOnLowChange,
  dailyBudgetKrw,
  onDailyBudgetChange,
}: {
  scanInterval: number;
  onScanIntervalChange: (v: number) => void;
  autobuyOnLow: boolean;
  onAutobuyOnLowChange: (v: boolean) => void;
  dailyBudgetKrw: number;
  onDailyBudgetChange: (v: number) => void;
}) {
  return (
    <section>
      <h2 className={nvSectionTitle}>자동 발주 · 재고</h2>
      <p className={nvSectionDesc}>
        스캔 주기와 예산 상한은 운영 정책에 맞게 조정해요.
      </p>
      <div className={nvFormStack}>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>재고 스캔 주기 (분)</span>
          <input
            type="number"
            min={5}
            max={120}
            value={scanInterval}
            onChange={(e) => onScanIntervalChange(Number.parseInt(e.target.value, 10) || 15)}
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-right text-xs font-semibold tabular-nums text-[var(--color-foreground)] sm:w-24"
          />
        </label>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>안전재고 아래로 떨어지면 바로 발주</span>
          <input
            type="checkbox"
            checked={autobuyOnLow}
            onChange={(e) => onAutobuyOnLowChange(e.target.checked)}
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>자동 발주 예산 상한 (일)</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={dailyBudgetKrw}
            onChange={(e) => onDailyBudgetChange(Number.parseInt(e.target.value, 10) || 0)}
            className="w-full max-w-[140px] rounded-lg border border-[var(--color-border)] px-3 py-2 text-right text-xs font-semibold tabular-nums text-[var(--color-foreground)]"
          />
        </label>
      </div>
    </section>
  );
}

const missingSessionLabels: Record<
  IntegrationPolicyDto["on_missing_store_session"],
  string
> = {
  pause_and_notify: "자동 결제를 멈추고 알림만 보냄 (기본)",
  notify_only: "결제 시도 없이 알림만 (대기열에 쌓지 않음)",
  skip_partner_try_next: "해당 채널은 건너뛰고, 가능한 다른 연동처만 시도",
};

export function SettingsIntegrationPolicySection({
  policy,
  onPolicyChange,
}: {
  policy: IntegrationPolicyDto;
  onPolicyChange: (patch: Partial<IntegrationPolicyDto>) => void;
}) {
  return (
    <section>
      <h2 className={nvSectionTitle}>연동 업체 · 자동 결제</h2>
      <p className={nvSectionDesc}>
        자동으로 최저가를 찾아 결제할 때, 쿠팡처럼 로그인이 필요한 경우를 어떻게 다룰지 정해요.
      </p>
      <div
        className="mt-4 mb-5 rounded-xl border border-[var(--color-border)] bg-[#faf8ff]/80 px-4 py-3.5 text-xs leading-relaxed text-[#4e5968]"
        role="note"
      >
        <p>
          로그인이 안 되어 있으면 결제가 안 됩니다. 그때 쿠팡을 열어 로그인하라고 안내 받으면
          매장에서는 부담이 크죠. 아래에서 그런 상황을 피하는 방식을 고를 수 있어요.
        </p>
      </div>
      <div className={cn(nvFormStack, "!mt-0")}>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>연동해 둔 업체만 자동 결제</span>
          <input
            type="checkbox"
            checked={policy.autobuy_only_linked_partners}
            onChange={(e) =>
              onPolicyChange({ autobuy_only_linked_partners: e.target.checked })
            }
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>
            해당 마켓에 로그인 세션이 있을 때만 자동 결제
          </span>
          <input
            type="checkbox"
            checked={policy.require_store_session_for_autobuy}
            onChange={(e) =>
              onPolicyChange({
                require_store_session_for_autobuy: e.target.checked,
              })
            }
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>
            자동 흐름에서 로그인 화면을 띄우지 않음
          </span>
          <input
            type="checkbox"
            checked={policy.forbid_ad_hoc_marketplace_login}
            onChange={(e) =>
              onPolicyChange({
                forbid_ad_hoc_marketplace_login: e.target.checked,
              })
            }
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className={nvFormLabel}>세션이 없거나 만료됐을 때</span>
          <select
            value={policy.on_missing_store_session}
            onChange={(e) =>
              onPolicyChange({
                on_missing_store_session: e.target
                  .value as IntegrationPolicyDto["on_missing_store_session"],
              })
            }
            className="w-full min-w-0 max-w-md rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-foreground)] sm:flex-1"
          >
            {(Object.keys(missingSessionLabels) as IntegrationPolicyDto["on_missing_store_session"][]).map(
              (k) => (
                <option key={k} value={k}>
                  {missingSessionLabels[k]}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
    </section>
  );
}

export function SettingsNotifySection({
  pushUrgent,
  onPushUrgent,
  dailyEmail,
  onDailyEmail,
  webhookUrl,
  onWebhookUrl,
}: {
  pushUrgent: boolean;
  onPushUrgent: (v: boolean) => void;
  dailyEmail: boolean;
  onDailyEmail: (v: boolean) => void;
  webhookUrl: string;
  onWebhookUrl: (v: string) => void;
}) {
  return (
    <section>
      <h2 className={nvSectionTitle}>알림</h2>
      <p className={nvSectionDesc}>
        푸시·이메일 등은 나중에 붙이면 여기서 켜고 끌 수 있게 둘 수 있어요.
      </p>
      <div className={nvFormStack}>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>긴급 알림 푸시</span>
          <input
            type="checkbox"
            checked={pushUrgent}
            onChange={(e) => onPushUrgent(e.target.checked)}
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className={nvFormRow}>
          <span className={nvFormLabel}>일일 요약 메일 (오전 8시)</span>
          <input
            type="checkbox"
            checked={dailyEmail}
            onChange={(e) => onDailyEmail(e.target.checked)}
            className="h-4 w-4 accent-[#a78bfa]"
          />
        </label>
        <label className="flex flex-col gap-2 px-4 py-3.5">
          <span className={nvFormLabel}>외부로 알림 보낼 주소 (선택)</span>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => onWebhookUrl(e.target.value)}
            placeholder="나중에 연결할 알림 주소"
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
          />
        </label>
      </div>
    </section>
  );
}

export function SettingsApiSection() {
  return (
    <section>
      <h2 className={nvSectionTitle}>나중에 연동할 때</h2>
      <p className={nvSectionDesc}>
        공급처 API·결제 키 등은 실제로 붙일 때 정리하면 돼요. 자동 결제·세션 규칙은 위「연동 업체
        · 자동 결제」에 저장된 값을 따르면 돼요.
      </p>
      <div className={nvFormStack}>
        <div className="flex flex-col gap-2 px-4 py-3.5">
          <p className={nvFormLabel}>공급처 주문 페이지·연락처 메모</p>
          <input
            type="text"
            placeholder="나중에 정리해 둘 자리예요"
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-3.5">
          <p className={nvFormLabel}>결제·정산 쪽 메모</p>
          <input
            type="text"
            placeholder="연결 예정이면 여기 적어 두세요"
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
          />
        </div>
      </div>
    </section>
  );
}

export function SettingsFormActions({
  onSave,
  onReset,
  saving,
}: {
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:justify-end sm:gap-3">
      <button
        type="button"
        onClick={onReset}
        disabled={saving}
        className={cn(
          nvLogToolbarButton,
          "px-5 py-2.5 transition disabled:opacity-50",
        )}
      >
        초기화
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-lg bg-[#a78bfa] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8b5cf6] disabled:opacity-50"
      >
        {saving ? "저장 중…" : "저장"}
      </button>
    </div>
  );
}
