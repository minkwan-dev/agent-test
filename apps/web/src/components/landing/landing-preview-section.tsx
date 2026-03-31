import { BarChart3, Bot, Sparkles } from "lucide-react";
import { PreviewDashboardPanel } from "@/components/landing/preview-dashboard-panel";
import { Reveal } from "@/components/landing/reveal";

const previewHighlights = [
  {
    i: "01",
    t: "KPI · 경보 · 발주",
    d: "지표와 이슈를 같은 타임라인에서 봐요.",
    icon: BarChart3,
  },
  {
    i: "02",
    t: "에이전트 & 로그",
    d: "역할별 상태와 최근 결정을 바로 확인해요.",
    icon: Bot,
  },
  {
    i: "03",
    t: "AI 패널",
    d: "요약과 다음 액션 제안을 우측에서 검토해요.",
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
            대시보드에서 지표·에이전트·재고 경보·최근 발주를 한 번에 봐요. 우측
            패널에서 AI 요약과 플로우 로그를 확인할 수 있어요.
          </p>
          <div className="mt-8 hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-[#e8ecf0] bg-gradient-to-br from-white to-[#f9fafb] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#3182f6]/10 blur-2xl" />
              <p className="relative text-sm font-bold text-[#191f28]">한 화면에서 할 수 있어요</p>
              <ul className="relative mt-5 space-y-4">
                {previewHighlights.map((row) => (
                  <li key={row.i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-xs font-bold text-[#3182f6]">
                      {row.i}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-semibold text-[#191f28]">
                        <row.icon className="h-4 w-4 text-[#3182f6]" />
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
