import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";
import { HeroPreview } from "@/components/landing/hero-preview";

export function LandingHero() {
  return (
    <section className="flex min-h-[100vh] flex-col justify-center border-b border-[#e5e8eb] bg-white">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-14 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-24 xl:gap-24 xl:py-28">
        <Reveal className="min-w-0" y={64}>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e8eb] bg-[#f9fafb] px-3 py-1.5 text-xs font-semibold text-[#3182f6] sm:text-sm">
            <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            멀티에이전트 식료품 자동구매
          </p>
          <h1 className="mt-6 text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            재고·발주·감사를
            <br />
            한 파이프라인으로
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.7] text-[#8b95a1] sm:text-lg">
            Novitas는 식료품 매장·단체급식·소매 운영팀을 위해 설계된 운영 콘솔이에요.
            임계치 감지부터 공급사 발주, 검증 로그까지 에이전트가 나눠 맡고,
            사람은 예외와 정책만 다루면 돼요. 밤에도 끊기지 않는 운영 리듬을
            목표로 해요.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-[#4e5968] sm:text-base">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182f6]" />
              MCP·A2A·UCP·AP2로 연결된 표준 파이프라인
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182f6]" />
              대시보드 + AI 패널 + 플로우 로그로 한 화면 운영
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3182f6] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#256dd4] sm:px-8 sm:text-base"
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-[#e5e8eb] bg-white px-7 py-3.5 text-sm font-semibold text-[#191f28] transition hover:bg-[#f9fafb] sm:px-8 sm:text-base"
            >
              콘솔 둘러보기
            </Link>
          </div>
          <p className="mt-8 text-xs text-[#8b95a1] sm:text-sm">
            소셜 로그인으로 계속하면 온보딩을 거쳐 대시보드로 이동해요.
          </p>
        </Reveal>
        <Reveal delay={0.2} y={64}>
          <HeroPreview />
        </Reveal>
      </div>
    </section>
  );
}
