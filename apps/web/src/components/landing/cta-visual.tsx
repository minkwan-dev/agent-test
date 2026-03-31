import { Brand } from "@/components/brand";

export function CtaVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e5e8eb] bg-white p-2 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3182f6]/[0.07] via-transparent to-[#93c5fd]/10" />
      <div className="relative rounded-2xl bg-[#f8f9fb] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <Brand.NovitasLogoLockup size="md" />
            <span className="text-lg font-bold text-[#191f28]">콘솔</span>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            준비됨
          </span>
        </div>
        <div className="mt-6 space-y-3">
          {[
            { t: "대시보드 개요", s: "KPI · 경보 · 발주" },
            { t: "에이전트 & 플로우", s: "4역할 · 단계 로그" },
            { t: "AI 패널", s: "요약 · 제안" },
          ].map((row) => (
            <div
              key={row.t}
              className="flex items-center justify-between rounded-xl border border-[#e5e8eb] bg-white px-4 py-3 text-sm shadow-sm"
            >
              <span className="font-semibold text-[#191f28]">{row.t}</span>
              <span className="text-xs text-[#8b95a1]">{row.s}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-dashed border-[#cbd5e1] bg-white/80 px-4 py-8 text-center text-sm text-[#8b95a1]">
          로그인 후 바로 탐색할 수 있는 운영 레이아웃이에요.
        </div>
      </div>
    </div>
  );
}
