import { BarChart3, Bot, Sparkles } from "lucide-react";
import { PreviewDashboardPanel } from "@/components/landing/preview-dashboard-panel";
import { Reveal } from "@/components/landing/reveal";

const previewHighlights = [
  {
    i: "01",
    t: "숫자·알림·발주",
    d: "오늘 지표와 급한 일을 한 줄로 볼 수 있어요.",
    icon: BarChart3,
  },
  {
    i: "02",
    t: "진행 상황",
    d: "어디까지 처리됐는지 단계별로 확인해요.",
    icon: Bot,
  },
  {
    i: "03",
    t: "요약 패널",
    d: "오른쪽에서 하루 요약과 다음에 할 일을 짚어 드려요.",
    icon: Sparkles,
  },
];

export function LandingPreviewSection() {
  return (
    <section
      id="preview"
      className="scroll-mt-24 flex min-h-[80vh] flex-col justify-center py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:gap-16 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 xl:gap-20">
        <Reveal className="max-w-xl lg:max-w-none">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            운영 화면 미리보기
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#8b95a1] sm:text-xl">
            대시보드에서 오늘 숫자·재고 알림·최근 발주를 한 번에 볼 수 있어요.
            오른쪽 패널에서는 하루 요약과 처리 기록을 이어서 확인해요.
          </p>
          <div className="mt-8 hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-[#e8ecf0] bg-gradient-to-br from-white to-[#f9fafb] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#a78bfa]/10 blur-2xl" />
              <p className="relative text-sm font-bold text-[#191f28]">한 화면에서 할 수 있어요</p>
              <ul className="relative mt-5 space-y-4">
                {previewHighlights.map((row) => (
                  <li key={row.i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f5f3ff] text-xs font-bold text-[#a78bfa]">
                      {row.i}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-semibold text-[#191f28]">
                        <row.icon className="h-4 w-4 text-[#a78bfa]" />
                        {row.t}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#8b95a1]">{row.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal y={52}>
          <PreviewDashboardPanel />
        </Reveal>
      </div>
    </section>
  );
}
