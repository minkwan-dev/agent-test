import { BarChart3, CheckCircle2 } from "lucide-react";

export function LoginAside() {
  return (
    <aside className="order-2 flex h-full min-h-0 w-full min-w-0 flex-col lg:order-1">
      <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#3182f6]">멀티에이전트 운영</p>
        <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[#191f28] sm:text-2xl">
          재고·발주·감사를
          <br className="hidden sm:block" /> 한 화면에서
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
          로그인 후 개요·재고 경보·에이전트·구매 내역과 AI 패널을 바로 열어볼 수 있어요. 세션은
          쿠키로 유지돼요.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-[#4e5968]">
          {[
            "MCP · A2A · UCP · AP2 프로토콜 스택을 UI로 확인",
            "4종 에이전트 역할과 플로우 로그를 한곳에서",
            "백엔드·에이전트 서비스와 맞춘 화면 구조",
          ].map((line) => (
            <li key={line} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3182f6]" />
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#f2f4f6] pt-8 sm:grid-cols-3 sm:gap-4">
          {[
            { label: "오늘 자동구매", val: "₩84,720", sub: "누적" },
            { label: "발주", val: "34건", sub: "대기 2" },
            { label: "에이전트", val: "4기", sub: "가동" },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-xl bg-[#f9fafb] px-4 py-3 text-center sm:bg-[#fafbfc]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8b95a1] sm:text-[11px]">
                {row.label}
              </p>
              <p className="mt-1 text-lg font-bold tabular-nums text-[#191f28] sm:text-xl">{row.val}</p>
              <p className="text-xs font-medium text-[#8b95a1]">{row.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6 lg:pt-8">
          {["개요", "재고", "에이전트", "AI 패널"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e8eb] bg-[#f9fafb] px-3 py-1.5 text-xs font-semibold text-[#4e5968]"
            >
              <BarChart3 className="h-3.5 w-3.5 text-[#3182f6]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
