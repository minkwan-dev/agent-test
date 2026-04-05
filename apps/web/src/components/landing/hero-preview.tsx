import { BarChart3, CheckCircle2 } from "lucide-react";

export function HeroPreview() {
  return (
    <div className="relative rounded-3xl border border-[#e5e8eb] bg-white p-1.5 shadow-xl">
      <div className="rounded-2xl bg-[#f8f9fb] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[#e5e8eb] pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#6eb89a]" />
            <span className="text-base font-bold text-[#191f28]">요약</span>
          </div>
          <CheckCircle2 className="h-5 w-5 text-[#7ec8e3]" />
        </div>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e5e8eb]">
            <p className="text-xs font-medium text-[#8b95a1]">오늘 구매</p>
            <p className="mt-2 text-lg font-bold tabular-nums leading-tight sm:text-xl">
              ₩84,720
            </p>
            <p className="mt-1 text-xs text-[#8b95a1]">누적</p>
          </div>
          <div className="flex-1 rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e5e8eb]">
            <p className="text-xs font-medium text-[#8b95a1]">경보</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-amber-600 sm:text-3xl">
              7
            </p>
            <p className="mt-1 text-xs text-[#8b95a1]">품목</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e5e8eb]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            자동 업무 단계
          </p>
          {["재고 살피기", "발주안 만들기", "주문 실행", "기록·알림"].map((name) => (
            <div key={name} className="flex items-center justify-between text-sm">
              <span className="truncate font-medium text-[#191f28]">{name}</span>
              <span className="text-[#6eb89a]">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
