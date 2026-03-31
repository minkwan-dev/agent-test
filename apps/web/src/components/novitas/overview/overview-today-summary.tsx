import { Sparkles } from "lucide-react";

export function OverviewTodaySummary() {
  return (
    <div className="flex min-h-0 min-w-0 flex-col justify-between rounded-2xl border border-[#e8ecf0] bg-gradient-to-b from-white to-[#fafbfc] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] lg:col-span-2">
      <div>
        <div className="flex items-center gap-2 text-[#191f28]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff7ed] text-amber-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-[15px] font-bold">오늘의 요약</h3>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4e5968]">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182f6]" />
            긴급 재고 3건이 발주 큐에 올라가 자동구매가 진행 중이에요.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182f6]" />
            대기 발주 2건은 공급사 응답 후 완료 처리돼요.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182f6]" />
            에이전트·프로토콜 연결은 모두 정상이에요.
          </li>
        </ul>
      </div>
      <p className="mt-6 rounded-xl border border-dashed border-[#e5e8eb] bg-white/80 px-4 py-3 text-center text-xs text-[#8b95a1]">
        웹훅·알림과 연결하면 이 영역을 자동으로 갱신할 수 있어요.
      </p>
    </div>
  );
}
