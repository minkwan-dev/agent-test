import { HelpCircle } from "lucide-react";

export function FaqSideVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e5e8eb] bg-gradient-to-br from-[#e4f6ee] via-white to-[#f5faf8] p-8 shadow-sm">
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#6eb89a]/10 blur-2xl" />
      <div className="absolute -bottom-8 left-4 h-24 w-24 rounded-full bg-[#a8dcc4]/20 blur-xl" />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-[#e5e8eb]">
            <HelpCircle className="h-7 w-7 text-[#6eb89a]" />
          </div>
          <div>
            <p className="text-base font-bold text-[#191f28]">도입 전 체크리스트</p>
            <p className="mt-2 text-sm leading-relaxed text-[#4e5968]">
              어디까지 자동으로 돌릴지, 누가 마지막에 확인할지, 기록을 얼마나 남길지만 팀이랑 맞춰 두면
              나중에 늘리기 쉬워요.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["시스템 연결", "한도·규칙", "알림 방법", "처리 기록"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] ring-1 ring-[#e5e8eb]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
