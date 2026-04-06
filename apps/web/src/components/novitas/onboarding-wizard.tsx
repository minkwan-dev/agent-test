"use client";

import { AnimatePresence, motion } from "../../lib/framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { consumePostOnboardingDestination } from "@/lib/onboarding";
import { completeOnboardingAndRefreshSession } from "@/lib/onboarding-api";
import { cn } from "@/lib/utils";

const TOTAL = 4;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
  }),
};

function Bullet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("flex gap-2 text-[#4e5968]", className)}>
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a78bfa] sm:h-5 sm:w-5" strokeWidth={2} />
      <span className="text-sm leading-snug sm:text-[15px] sm:leading-relaxed">{children}</span>
    </li>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-xl border border-[#e5e8eb] bg-[#f8fafc] px-3 py-2.5 sm:gap-2.5 sm:px-4 sm:py-3">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 sm:h-5 sm:w-5" strokeWidth={2} />
      <div className="text-xs leading-snug text-[#4e5968] sm:text-sm sm:leading-relaxed">{children}</div>
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const setToken = useSetAtom(accessTokenAtom);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [finishing, setFinishing] = useState(false);

  const finish = useCallback(async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      const newToken = await completeOnboardingAndRefreshSession();
      setToken(newToken);
      router.replace(consumePostOnboardingDestination());
    } catch {
      setFinishing(false);
    }
  }, [router, setToken, finishing]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const progress = (step / TOTAL) * 100;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col lg:max-w-3xl">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#a78bfa] sm:text-sm">
          시작하기
        </p>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => void finish()}
            disabled={finishing}
            className="rounded-md border border-transparent px-2 py-1 text-[11px] font-medium text-[#8b95a1] transition hover:border-[#e5e8eb] hover:bg-[#fafbfc] hover:text-[#4e5968] enabled:cursor-pointer disabled:opacity-50 sm:text-xs"
          >
            {finishing ? "…" : "건너뛰기"}
          </button>
          <span className="h-3 w-px shrink-0 bg-[#e5e8eb]" aria-hidden />
          <span className="text-base font-bold tabular-nums text-[#8b95a1] sm:text-lg">
            <span className="text-[#191f28]">{step}</span> / {TOTAL}
          </span>
        </div>
      </div>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#e5e8eb] sm:h-2.5">
        <motion.div
          className="h-full rounded-full bg-[#a78bfa]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}
        />
      </div>

      <div className="flex max-h-[min(520px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:max-h-[min(580px,calc(100dvh-8.5rem))] sm:rounded-[1.75rem]">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-0 pt-2 sm:px-6 sm:pt-3 lg:px-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 32,
                mass: 0.9,
              }}
              className="py-4 sm:py-5 lg:py-6"
            >
              {step === 1 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-2.5">
                    <h2 className="text-xl font-bold leading-snug tracking-tight text-[#191f28] sm:text-2xl lg:text-[1.65rem] lg:leading-tight">
                      실제 재고 숫자를 맞춰요
                    </h2>
                    <p className="text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
                      이 서비스는 <strong className="text-[#191f28]">재고 숫자가 확정된 뒤</strong>에 자동
                      발주·알림이 맞게 돌아가요. 판매할 때마다 숫자가 줄어드는 연동이 없다면, 직접 넣은{" "}
                      <strong className="text-[#191f28]">반영 시점</strong>이 곧 운영 기준이 됩니다.
                    </p>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <Bullet>
                      <strong className="text-[#191f28]">품목·안전재고</strong>가 있어야 “부족하다”를 판단할 수
                      있어요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">실제 수량</strong>을 맞춰 두면 그때부터 경보·발주
                      시뮬레이션이 현실에 가까워져요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">지표·자동 처리</strong>는 나중에 연결을 붙이면 같은
                      화면에서 실제 데이터로 바뀌어요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    처음엔 “다 채워야 하나?” 부담 없이, 자주 파는 품목 몇 개만 등록하고 수량만 맞춰도 흐름을
                    이해하기 좋아요.
                  </TipBox>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-2.5">
                    <h2 className="text-xl font-bold leading-snug text-[#191f28] sm:text-2xl lg:text-[1.65rem]">
                      먼저 품목을 등록해요
                    </h2>
                    <p className="text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
                      이름과 안전재고(상한)만 있어도 “지금 얼마나 부족한지”를 숫자로 볼 수 있어요. 바코드·내부 SKU는
                      나중에 넣어도 됩니다.
                    </p>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <Bullet>
                      <strong className="text-[#191f28]">품목명</strong>은 매장에서 부르는 이름과 같게 쓰면
                      검색·알림에 유리해요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">안전재고</strong>는 “이 밑으로 내려가면 채워야 한다”는
                      기준이에요.
                    </Bullet>
                    <Bullet>
                      등록 후에는 <strong className="text-[#191f28]">재고 현황</strong> 맨 위에 내 품목이 보여요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    여러 매장을 쓰게 되면 “매장별 SKU”를 나누는 게 일반적이에요. 지금은 한 매장 기준으로 설정해 두면
                    됩니다.
                  </TipBox>
                  <Link
                    href="/dashboard/stock/register"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#a78bfa] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8b5cf6] sm:text-sm"
                  >
                    재고 등록으로 이동
                  </Link>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-2.5">
                    <h2 className="text-xl font-bold leading-snug text-[#191f28] sm:text-2xl lg:text-[1.65rem]">
                      팔리고 들어올 때마다 반영해요
                    </h2>
                    <p className="text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
                      자동 차감이 없을 때는 <strong className="text-[#191f28]">재고 반영</strong>으로 현재고를 고치는
                      순간이,                       화면이 보는 “지금 재고”예요. 그 시각을 기준으로 긴급·주의 배지와 자동 발주가
                      맞춰져요.
                    </p>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <Bullet>
                      재고 현황에서 <strong className="text-[#191f28]">내가 등록한 품목</strong> 행의 「재고 반영」을
                      누르면 수량을 고칠 수 있어요.
                    </Bullet>
                    <Bullet>
                      수량을 <strong className="text-[#191f28]">줄이면</strong> 부족 구간에 들어가 긴급·주의로 바뀔 수
                      있어요.
                    </Bullet>
                    <Bullet>
                      반영을 저장하면 <strong className="text-[#191f28]">그 시점</strong>이 운영 기준으로 다시 잡혀요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    하루 한 번 실사만 해도 괜찮아요. 중요한 건 “가끔이라도 최신 숫자”를 남기는 거예요.
                  </TipBox>
                  <Link
                    href="/dashboard/stock"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-[#e5e8eb] bg-white px-4 py-2 text-xs font-semibold text-[#191f28] transition hover:bg-[#f9fafb] sm:text-sm"
                  >
                    재고 현황 열기
                  </Link>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-2.5">
                    <h2 className="text-xl font-bold leading-snug text-[#191f28] sm:text-2xl lg:text-[1.65rem]">
                      이제 대시보드에서 운영해요
                    </h2>
                    <p className="text-sm leading-relaxed text-[#4e5968] sm:text-[15px]">
                      개요에서는 오늘 지표와 재고 일부를, 구매 내역에서는 발주 흐름을 볼 수 있어요. 자동 처리·연동
                      화면은 단계가 어떻게 이어지는지 보는 연습용이에요.
                    </p>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <Bullet>
                      <strong className="text-[#191f28]">개요</strong> — 누적 지표, 재고 스냅샷, AI 패널까지 한 화면에
                      모였어요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">재고 현황</strong> — 등록 품목과 반영, 검색이 이어져요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">자동 처리·알림</strong> — 나중에 문자·카톡 같은 걸
                      붙이면 여기서도 같이 쓸 수 있어요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    막히면 우측 하단(모바일) AI 패널에 “재고·발주”를 물어보는 것도 바로 사용할 수 있어요.
                  </TipBox>
                  <button
                    type="button"
                    onClick={() => void finish()}
                    disabled={finishing}
                    className="w-full rounded-lg bg-[#a78bfa] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8b5cf6] enabled:cursor-pointer disabled:opacity-60 sm:text-sm"
                  >
                    {finishing ? "저장 중…" : "대시보드로 이동"}
                  </button>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < TOTAL ? (
          <div className="flex shrink-0 items-center gap-2 border-t border-[#f2f4f6] px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="rounded-md border border-[#e5e8eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] transition hover:bg-[#f9fafb] sm:min-w-[4.5rem] sm:py-2 sm:text-sm"
              >
                이전
              </button>
            ) : null}
            <div className="min-w-0 flex-1" aria-hidden />
            <button
              type="button"
              onClick={goNext}
              className="rounded-md bg-[#a78bfa] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#8b5cf6] sm:min-w-[4.5rem] sm:py-2 sm:text-sm"
            >
              다음
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex justify-center gap-2 sm:mt-3" aria-hidden>
        {Array.from({ length: TOTAL }, (_, i) => {
          const active = i + 1 === step;
          const done = i + 1 < step;
          return (
            <motion.span
              key={i}
              className="h-2 rounded-full sm:h-2.5"
              initial={false}
              animate={{
                width: active ? 28 : 8,
                backgroundColor: active ? "#a78bfa" : done ? "#e9d5ff" : "#e5e8eb",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          );
        })}
      </div>
    </div>
  );
}
