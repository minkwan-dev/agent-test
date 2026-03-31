import Link from "next/link";
import { CtaVisual } from "@/components/landing/cta-visual";
import { Reveal } from "@/components/landing/reveal";

export function LandingCtaSection() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center border-t border-[#e5e8eb] bg-[#f9fafb] py-16 sm:py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:gap-14 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            지금 바로 콘솔을 열어보세요
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#8b95a1] sm:text-xl">
            로그인하면 대시보드·AI 패널·플로우 로그를 바로 확인할 수 있어요.
            운영팀과 함께 화면을 보며 다음 연동 범위를 정하기 좋아요.
          </p>
          <Link
            href="/login"
            className="mt-10 inline-flex w-full items-center justify-center rounded-2xl bg-[#3182f6] px-10 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#256dd4] sm:w-auto sm:px-12 sm:text-lg"
          >
            로그인하고 시작하기
          </Link>
        </Reveal>
        <Reveal delay={0.15} y={40}>
          <CtaVisual />
        </Reveal>
      </div>
    </section>
  );
}
