import { Reveal, RevealItem, RevealStagger } from "@/components/landing/reveal";
import { landingStatsGrid } from "@/components/landing/landing-data";
import { StatsVisual } from "@/components/landing/stats-visual";

export function LandingStatsSection() {
  return (
    <section
      id="stats"
      className="scroll-mt-24 flex min-h-[80vh] flex-col justify-center bg-[#f2f4f6] py-16 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-8 lg:gap-14">
        <Reveal className="max-w-3xl xl:max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#191f28] sm:text-4xl lg:text-[2.5rem]">
            운영을 숫자로 요약하면
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#8b95a1] sm:text-xl">
            자동으로 돌아가는 단계와 화면 구성을 숫자로만 빠르게 짚어요. 들어가면 같은 지표를 대시보드에서 다시 볼 수 있어요.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 divide-x divide-y divide-[#eef0f3] overflow-hidden rounded-2xl border border-[#e5e8eb] bg-white shadow-sm lg:grid-cols-4 lg:divide-y-0">
          {landingStatsGrid.map((s) => (
            <RevealItem key={s.label} className="min-h-0">
              <div className="flex h-full flex-col px-4 py-5 text-left sm:px-6 sm:py-6">
                <p className="text-xs font-medium text-[#8b95a1] sm:text-[13px]">{s.label}</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-1">
                  <span className="text-2xl font-bold tabular-nums tracking-tight text-[#191f28] sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-sm font-semibold text-[#8b95a1] sm:text-base">{s.unit}</span>
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#4e5968] sm:text-sm">{s.hint}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.1} y={32}>
          <StatsVisual />
        </Reveal>
      </div>
    </section>
  );
}
