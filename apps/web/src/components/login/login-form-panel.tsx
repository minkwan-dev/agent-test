"use client";

import { Bell, Headset, Lock, LogIn, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { motion } from "@/lib/framer-motion";
import { GoogleMark } from "@/components/login/login-provider-icons";
import { loginContainerVariants, loginItemVariants } from "@/components/login/login-motion";
import { getApiUrl } from "@/lib/api";

const infoRows = [
  {
    Icon: LogIn,
    title: "Google 계정으로 시작",
    desc: "익숙한 Google 계정으로 로그인할 수 있어요.",
  },
  {
    Icon: ShieldCheck,
    title: "안전한 로그인",
    desc: "운영에 필요한 정보만 서비스에 연결돼요.",
  },
  {
    Icon: Bell,
    title: "공지·안내",
    desc: "점검 일정이나 중요한 변경은 알림으로 즉시 안내드려요.",
  },
  {
    Icon: Headset,
    title: "문의·지원",
    desc: "이용·결제 문의는 콘솔 안 고객센터나 안내 메일로 연락해 주시면 돼요.",
  },
] as const;

export function LoginFormPanel() {
  const searchParams = useSearchParams();

  const onGoogleLogin = useCallback(() => {
    const next = searchParams.get("next") ?? "/dashboard/overview";
    const safeNext = next.startsWith("/") ? next : "/dashboard/overview";
    const api = getApiUrl();
    window.location.href = `${api}/auth/google?next=${encodeURIComponent(safeNext)}`;
  }, [searchParams]);

  const authError = searchParams.get("error");

  return (
    <section className="order-1 flex h-full min-h-0 w-full min-w-0 flex-col lg:order-2">
      <motion.div
        className="flex h-full min-h-0 flex-col rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-sm sm:p-8 lg:p-10"
        variants={loginContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={loginItemVariants}
          className="h-1 w-11 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#d8b4fe]"
          aria-hidden
        />
        <motion.p
          variants={loginItemVariants}
          className="mt-5 text-xs font-bold uppercase tracking-wider text-[#a78bfa]"
        >
          Sign in
        </motion.p>
        <motion.h1
          variants={loginItemVariants}
          className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#191f28] sm:text-[1.75rem]"
        >
          소셜 계정으로 시작하기
        </motion.h1>
        <motion.p
          variants={loginItemVariants}
          className="mt-4 text-sm leading-relaxed text-[#4e5968] sm:text-[15px]"
        >
          짧은 온보딩 절차만 거치면 서비스를 바로 이용할 수 있어요.
        </motion.p>

        {authError ? (
          <motion.p
            variants={loginItemVariants}
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {authError === "google"
              ? "Google 로그인에 실패했어요. 콘솔 리디렉션 URI·클라이언트 ID/시크릿을 확인하거나 다시 시도해 주세요."
              : authError === "sync"
                ? "로그인은 됐는데 서버에 프로필을 저장하지 못했어요. Supabase SQL에 마이그레이션을 적용했는지(profiles.onboarding_completed_at 등), apps/api의 SUPABASE_SERVICE_ROLE_KEY(비밀 키)가 맞는지 확인하고, API 터미널 로그의 오류 메시지를 참고해 주세요."
              : authError === "session"
                ? "세션이 만료되었거나 더 이상 유효하지 않아요. 다시 로그인해 주세요."
                : authError === "config"
                  ? "서버 인증 설정(JWT_SECRET 등)을 확인해 주세요. 웹·API 환경 변수가 맞는지 점검이 필요해요."
                  : "로그인 처리 중 문제가 생겼어요. 다시 시도해 주세요."}
          </motion.p>
        ) : null}

        <motion.div variants={loginItemVariants} className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#e5e8eb] bg-white py-3.5 text-sm font-bold text-[#191f28] shadow-sm transition hover:bg-[#f9fafb] active:scale-[0.99] sm:py-4 sm:text-base"
          >
            <GoogleMark />
            Google로 계속하기
          </button>
        </motion.div>

        <motion.div
          variants={loginItemVariants}
          className="mt-8 flex flex-col divide-y divide-[#f2f4f6] overflow-hidden rounded-xl border border-[#f2f4f6] bg-[#fafbfc]"
        >
          {infoRows.map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]" />
              <div>
                <p className="text-sm font-semibold text-[#191f28]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#8b95a1]">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={loginItemVariants}
          className="mt-auto flex items-start gap-2 pt-6 text-left text-xs leading-relaxed text-[#8b95a1] lg:pt-8"
        >
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="min-w-0 flex-1">
            소셜 계정으로 시작하면, 서비스 이용약관 및 개인정보 처리에 동의하는 것으로 간주돼요.
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}
