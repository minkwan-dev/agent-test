export function SettingsAutobuySection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-[#191f28]">자동구매 · 재고</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">스캔 주기와 예산 상한은 운영 정책에 맞게 조정해요.</p>
      <div className="mt-4 space-y-3">
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">재고 스캔 주기 (분)</span>
          <input
            type="number"
            min={5}
            max={120}
            defaultValue={15}
            className="w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-right text-sm sm:w-24"
          />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">긴급 임계치 도달 시 즉시 발주</span>
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#3182f6]" />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#191f28]">자동구매 예산 상한 (일)</span>
          <span className="text-sm font-semibold tabular-nums text-[#191f28]">₩ 2,000,000</span>
        </label>
      </div>
    </section>
  );
}

export function SettingsNotifySection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-[#191f28]">알림</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">푸시·이메일·슬랙 등 채널은 아래에서 켜고 끌 수 있어요.</p>
      <div className="mt-4 space-y-3">
        <label className="flex items-center justify-between gap-4 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">긴급 알림 푸시</span>
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#3182f6]" />
        </label>
        <label className="flex items-center justify-between gap-4 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">일일 요약 메일 (오전 8시)</span>
          <input type="checkbox" className="h-4 w-4 accent-[#3182f6]" />
        </label>
        <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-[#191f28]">웹훅 URL (선택)</span>
          <input
            type="url"
            placeholder="https://hooks.slack.com/..."
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
      <h2 className="text-sm font-bold text-[#191f28]">연동 · API</h2>
      <p className="mt-1 text-xs text-[#8b95a1]">공급사·내부 API 키는 환경 변수나 비밀 저장소로 관리해 주세요.</p>
      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-[#191f28]">Nest API 베이스 URL</p>
          <input
            type="text"
            defaultValue="/api"
            readOnly
            className="mt-2 w-full rounded-lg border border-dashed border-[#e5e8eb] bg-[#fafbfc] px-3 py-2 font-mono text-xs text-[#4e5968]"
          />
        </div>
        <div className="rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-[#191f28]">FastAPI 분석 엔드포인트</p>
          <input
            type="text"
            placeholder="연결 예정"
            className="mt-2 w-full rounded-lg border border-[#e5e8eb] px-3 py-2 font-mono text-xs"
          />
        </div>
      </div>
    </section>
  );
}

export function SettingsFormActions() {
  return (
    <div className="flex flex-col gap-3 border-t border-[#e5e8eb] pt-6 sm:flex-row sm:justify-end">
      <button
        type="button"
        className="rounded-xl border border-[#e5e8eb] bg-white px-5 py-2.5 text-sm font-semibold text-[#4e5968] shadow-sm transition hover:bg-[#f9fafb]"
      >
        초기화
      </button>
      <button
        type="button"
        className="rounded-xl bg-[#3182f6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#256dd4]"
      >
        저장
      </button>
    </div>
  );
}
