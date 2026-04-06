import { Brand } from "@/components/brand";

export function CtaVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e5e8eb] bg-white p-2 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/[0.07] via-transparent to-[#e9d5ff]/10" />
      <div className="relative rounded-2xl bg-[#f8f9fb] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <Brand.SemosoLogoLockup size="md" />
            <span className="text-lg font-bold text-[#191f28]">콘솔</span>
          </div>
          <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#6d28d9]">
            준비됨
          </span>
        </div>
        <div className="mt-6 space-y-3">
          {[
            { t: "오늘 개요", s: "숫자 · 알림 · 발주" },
            { t: "진행 단계", s: "4단계 · 처리 기록" },
            { t: "요약 패널", s: "하루 정리 · 제안" },
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
          로그인 후 바로 쓸 수 있는 운영 화면이에요.
        </div>
      </div>
    </div>
  );
}
