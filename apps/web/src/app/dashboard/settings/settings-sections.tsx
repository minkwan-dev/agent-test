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
      <h2 className="text-sm font-bold text-[#191f28]">자동 발주 · 재고</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">스캔 주기와 예산 상한은 운영 정책에 맞게 조정해요.</p>
      <div className="mt-4 space-y-3">
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">재고 스캔 주기 (분)</span>
          <input
            type="number"
            min={5}
            max={120}
            value={scanInterval}
            onChange={(e) => onScanIntervalChange(Number.parseInt(e.target.value, 10) || 15)}
            className="w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-right text-sm sm:w-24"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">안전재고 아래로 떨어지면 바로 발주</span>
          <input
            type="checkbox"
            checked={autobuyOnLow}
            onChange={(e) => onAutobuyOnLowChange(e.target.checked)}
            className="h-4 w-4 accent-[#b8dcc8]"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">자동 발주 예산 상한 (일)</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={dailyBudgetKrw}
            onChange={(e) => onDailyBudgetChange(Number.parseInt(e.target.value, 10) || 0)}
            className="w-full max-w-[140px] rounded-lg border border-[#e5e8eb] px-3 py-2 text-right text-sm font-semibold tabular-nums text-[#191f28]"
          />
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
      <h2 className="text-sm font-bold text-[#191f28]">알림</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">푸시·이메일 등은 나중에 붙이면 여기서 켜고 끌 수 있게 둘 수 있어요.</p>
      <div className="mt-4 space-y-3">
        <label className="flex items-center justify-between gap-4 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">긴급 알림 푸시</span>
          <input
            type="checkbox"
            checked={pushUrgent}
            onChange={(e) => onPushUrgent(e.target.checked)}
            className="h-4 w-4 accent-[#b8dcc8]"
          />
        </label>
        <label className="flex items-center justify-between gap-4 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">일일 요약 메일 (오전 8시)</span>
          <input
            type="checkbox"
            checked={dailyEmail}
            onChange={(e) => onDailyEmail(e.target.checked)}
            className="h-4 w-4 accent-[#b8dcc8]"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">외부로 알림 보낼 주소 (선택)</span>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => onWebhookUrl(e.target.value)}
            placeholder="나중에 연결할 알림 주소"
            className="w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-sm placeholder:text-[#8b95a1]"
          />
        </label>
      </div>
    </section>
  );
}

export function SettingsApiSection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-[#191f28]">나중에 연동할 때</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">
        지금은 혼자 만드는 단계라 공급처·결제를 자동으로 붙이는 칸은 비워 두었어요. 실제로 붙일 때
        주소·키는 안전한 곳에만 두면 돼요.
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-[#191f28]">공급처 주문 페이지·연락처 메모</p>
          <input
            type="text"
            placeholder="나중에 정리해 둘 자리예요"
            className="mt-2 w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-xs"
          />
        </div>
        <div className="rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-[#191f28]">결제·정산 쪽 메모</p>
          <input
            type="text"
            placeholder="연결 예정이면 여기 적어 두세요"
            className="mt-2 w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-xs"
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
    <div className="flex flex-col gap-3 border-t border-[#e5e8eb] pt-6 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onReset}
        disabled={saving}
        className="rounded-xl border border-[#e5e8eb] bg-white px-5 py-2.5 text-sm font-semibold text-[#4e5968] shadow-sm transition hover:bg-[#f9fafb] disabled:opacity-50"
      >
        초기화
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-xl bg-[#6eb89a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5aa688] disabled:opacity-50"
      >
        {saving ? "저장 중…" : "저장"}
      </button>
    </div>
  );
}
