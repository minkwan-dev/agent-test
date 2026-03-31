import { ChevronDown } from "lucide-react";
import { FaqSideVisual } from "@/components/landing/faq-side-visual";
import { landingFaqs } from "@/components/landing/landing-data";
import { Reveal } from "@/components/landing/reveal";

export function LandingFaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 flex min-h-[80vh] flex-col justify-center border-t border-[#e5e8eb] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:gap-14 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
              자주 묻는 질문
            </h2>
            <p className="mt-5 max-w-xl text-lg text-[#8b95a1] sm:text-xl">
              도입 전에 알아두면 좋은 내용이에요. 팀 내 공유용으로도 활용해 보세요.
            </p>
          </Reveal>
          <Reveal delay={0.12} y={32}>
            <FaqSideVisual />
          </Reveal>
        </div>
        <Reveal y={40}>
          <div className="divide-y divide-[#e5e8eb] overflow-hidden rounded-3xl border border-[#e5e8eb] bg-[#f9fafb]">
            {landingFaqs.map((f) => (
              <details key={f.q} name="faq" className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-[#191f28] transition-colors hover:bg-[#f2f4f6] group-open:bg-white group-open:hover:bg-white sm:px-8 sm:py-6 sm:text-lg">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#8b95a1] transition group-open:rotate-180" />
                </summary>
                <p className="border-t border-[#e5e8eb] bg-white px-6 py-5 text-base leading-relaxed text-[#4e5968] sm:px-8 sm:py-6">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
