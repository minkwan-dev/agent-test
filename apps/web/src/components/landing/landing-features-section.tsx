import { CheckCircle2 } from "lucide-react";
import { landingProtocols } from "@/components/landing/landing-data";
import { ProtocolStackVisual } from "@/components/landing/protocol-stack-visual";
import { Reveal, RevealItem, RevealStagger } from "@/components/landing/reveal";

export function LandingFeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-24 flex min-h-[80vh] flex-col justify-center py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:gap-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 xl:gap-20">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28">
          <Reveal className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
              무엇을 도와주나요
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#8b95a1] sm:text-xl">
              재고부터 발주·기록까지 매장 운영에 필요한 덩어리를 한 제품에 모았어요.
              팀은 같은 화면에서 연결 상태와 규칙만 보면 돼요.
            </p>
          </Reveal>
          <Reveal delay={0.1} y={36}>
            <ProtocolStackVisual />
          </Reveal>
        </div>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {landingProtocols.map((p) => (
            <RevealItem key={p.key}>
              <article className="flex h-full flex-col rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-sm transition hover:border-[#d1d6db] sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5ee] text-[#6eb89a] sm:h-12 sm:w-12">
                  <p.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#6eb89a]">
                  {p.badge}
                </p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">{p.title}</h3>
                <p className="mt-1 text-sm text-[#8b95a1]">{p.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4e5968] sm:text-base">
                  {p.desc}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[#f2f4f6] pt-4 text-sm text-[#191f28]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6eb89a]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
