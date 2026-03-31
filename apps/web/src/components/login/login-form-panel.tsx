"use client";

import { Bot, Lock, Package, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  AppleMark,
  GoogleMark,
  KakaoMark,
  NaverMark,
} from "@/components/login/login-provider-icons";
import { setPostOnboardingDestination } from "@/lib/onboarding";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/session";

export function LoginFormPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSocialLogin = useCallback(() => {
    document.cookie = `${SESSION_COOKIE}=${SESSION_VALUE}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    const next = searchParams.get("next") ?? "/dashboard/overview";
    const safeNext = next.startsWith("/") ? next : "/dashboard/overview";
    setPostOnboardingDestination(safeNext);
    router.push("/onboarding");
  }, [router, searchParams]);

  return (
    <section className="order-1 flex h-full min-h-0 w-full min-w-0 flex-col lg:order-2">
      <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#3182f6]">Sign in</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#191f28] sm:text-[1.75rem]">
          로그인
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
          소셜 계정으로 계속하면 세션을 쿠키에 저장하고 <strong className="text-[#191f28]">시작하기</strong>{" "}
          화면으로 이동해요.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onSocialLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#e5e8eb] bg-white py-3.5 text-sm font-bold text-[#191f28] shadow-sm transition hover:bg-[#f9fafb] active:scale-[0.99] sm:py-4 sm:text-base"
          >
            <GoogleMark />
            Google로 계속하기
          </button>
          <button
            type="button"
            onClick={onSocialLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#f5dc00] bg-[#FEE500] py-3.5 text-sm font-bold text-[#191919] transition hover:bg-[#f5dc00]/90 active:scale-[0.99] sm:py-4 sm:text-base"
          >
            <KakaoMark />
            카카오로 계속하기
          </button>
          <button
            type="button"
            onClick={onSocialLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#03C75A] bg-[#03C75A] py-3.5 text-sm font-bold text-white transition hover:bg-[#02b351] active:scale-[0.99] sm:py-4 sm:text-base"
          >
            <NaverMark />
            네이버로 계속하기
          </button>
          <button
            type="button"
            onClick={onSocialLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#1d1d1f] bg-[#000000] py-3.5 text-sm font-bold text-white transition hover:bg-[#1d1d1f] active:scale-[0.99] sm:py-4 sm:text-base"
          >
            <AppleMark />
            Apple로 계속하기
          </button>
        </div>

        <div className="mt-8 space-y-0 divide-y divide-[#f2f4f6] rounded-xl border border-[#f2f4f6] bg-[#fafbfc]">
          <div className="flex gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#3182f6]" />
            <div>
              <p className="text-sm font-semibold text-[#191f28]">세션 · 보안</p>
              <p className="mt-1 text-xs leading-relaxed text-[#8b95a1]">
                운영 환경에서는 SSO·역할 기반 접근으로 바꿀 수 있어요.
              </p>
            </div>
          </div>
          <div className="flex gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
            <Package className="mt-0.5 h-5 w-5 shrink-0 text-[#3182f6]" />
            <div>
              <p className="text-sm font-semibold text-[#191f28]">대시보드 데이터</p>
              <p className="mt-1 text-xs leading-relaxed text-[#8b95a1]">
                지표·테이블·에이전트 상태는 연동·정책에 따라 실시간으로 갱신돼요.
              </p>
            </div>
          </div>
          <div className="flex gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
            <Bot className="mt-0.5 h-5 w-5 shrink-0 text-[#3182f6]" />
            <div>
              <p className="text-sm font-semibold text-[#191f28]">스택</p>
              <p className="mt-1 text-xs leading-relaxed text-[#8b95a1]">
                Next.js · Nest · FastAPI 구성을 전제로 한 UI예요.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-auto flex items-start gap-2 pt-6 text-center text-[11px] leading-relaxed text-[#8b95a1] sm:text-left sm:text-xs lg:pt-8">
          <Lock className="mx-auto mt-0.5 h-3.5 w-3.5 shrink-0 sm:mx-0" />
          <span>
            계속하면 서비스 이용약관 및 개인정보 처리에 동의하는 것으로 간주돼요.
          </span>
        </p>
      </div>
    </section>
  );
}
