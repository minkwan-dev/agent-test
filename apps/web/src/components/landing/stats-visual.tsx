import { BarChart3 } from "lucide-react";

export function StatsVisual() {
  const bars = [38, 52, 44, 68, 48, 72, 56, 82, 61, 76];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
      <div className="flex items-center justify-between border-b border-[#f2f4f6] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
            주간 처리량
          </p>
          <p className="mt-1 text-lg font-bold text-[#191f28]">발주 · 경보 추이</p>
        </div>
        <BarChart3 className="h-8 w-8 text-[#3182f6]" />
      </div>
      <div className="mt-6 flex h-44 items-end justify-between gap-1.5 sm:h-52 sm:gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="min-w-0 flex-1 rounded-t-md bg-gradient-to-t from-[#3182f6] to-[#93c5fd] opacity-90 transition hover:opacity-100"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-[#f9fafb] p-4">
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">일 평균</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-[#191f28]">142건</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">피크</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-[#191f28]">09:40</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#8b95a1]">안정성</p>
          <p className="mt-1 text-sm font-bold text-emerald-600">99.2%</p>
        </div>
      </div>
    </div>
  );
}
