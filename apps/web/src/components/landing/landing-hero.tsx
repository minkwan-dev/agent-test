import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";
import { HeroPreview } from "@/components/landing/hero-preview";

export function LandingHero() {
  return (
    <section className="flex min-h-[100vh] flex-col justify-center border-b border-[#e5e8eb] bg-white">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-14 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-24 xl:gap-24 xl:py-28">
        <Reveal className="min-w-0" y={64}>
   
          <h1 className="mt-6 text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            재고·발주·감사를
            <br />
            한 번에 이어서 처리해요
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.7] text-[#8b95a1] sm:text-lg">
            semoso는 세상의 모든 소상공인을 위해 만든 운영 콘솔이에요. 식료품 매장·단체급식·소매 팀의
            재고가 부족해지기 전부터 발주·결제 흐름까지 자동으로 맞추고,
            사람은 예외 상황과 매장 규칙만 신경 쓰면 돼요.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-[#4e5968] sm:text-base">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6eb89a]" />
              매장 데이터·발주·기록을 한 제품 안에 묶었어요
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6eb89a]" />
              오늘 숫자와 진행 기록을 한 화면에서 볼 수 있어요
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6eb89a] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#5aa688] sm:px-8 sm:text-base"
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
            로그인한 뒤 짧은 온보딩만 거치면 운영 화면으로 들어가요.
          </p>
        </Reveal>
        <Reveal delay={0.2} y={64}>
          <HeroPreview />
        </Reveal>
      </div>
    </section>
  );
}
