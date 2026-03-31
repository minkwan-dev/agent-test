import { landingFlowSteps } from "@/components/landing/landing-data";
import { FlowPipelineVisual } from "@/components/landing/flow-pipeline-visual";
import { Reveal, RevealItem, RevealStagger } from "@/components/landing/reveal";

export function LandingFlowSection() {
  return (
    <section
      id="flow"
      className="scroll-mt-24 flex min-h-[80vh] flex-col justify-center border-y border-[#e5e8eb] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:gap-14 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            운영 플로우
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#8b95a1] sm:text-xl">
            데이터가 들어와 발주가 나가기까지의 기본 경로예요.{" "}
          </p>
        </Reveal>
        <Reveal delay={0.08} y={32}>
          <FlowPipelineVisual />
        </Reveal>
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {landingFlowSteps.map((s) => (
            <RevealItem key={s.n}>
              <div className="relative flex h-full flex-col rounded-2xl border border-[#e5e8eb] bg-[#f9fafb] p-6 sm:p-7">
                <span className="text-sm font-bold text-[#3182f6]">{s.n}</span>
                <span className="mt-3 inline-flex w-fit rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#4e5968] ring-1 ring-[#e5e8eb]">
                  {s.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#191f28] sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4e5968] sm:text-base">
                  {s.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
