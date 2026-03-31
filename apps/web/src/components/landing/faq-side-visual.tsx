import { HelpCircle } from "lucide-react";

export function FaqSideVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e5e8eb] bg-gradient-to-br from-[#eff6ff] via-white to-[#f9fafb] p-8 shadow-sm">
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#3182f6]/10 blur-2xl" />
      <div className="absolute -bottom-8 left-4 h-24 w-24 rounded-full bg-[#93c5fd]/20 blur-xl" />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-[#e5e8eb]">
            <HelpCircle className="h-7 w-7 text-[#3182f6]" />
          </div>
          <div>
            <p className="text-base font-bold text-[#191f28]">도입 전 체크리스트</p>
            <p className="mt-2 text-sm leading-relaxed text-[#4e5968]">
              연동 범위·승인 흐름·로그 보관 기간을 팀과 맞춰 두면 이후 확장이 수월해요.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["MCP 어댑터", "한도·정책", "알림 채널", "감사 로그"].map((tag) => (
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
