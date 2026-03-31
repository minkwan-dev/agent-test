"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { consumePostOnboardingDestination } from "@/lib/onboarding";
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
    <li className={cn("flex gap-3 text-[#4e5968]", className)}>
      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#3182f6]" strokeWidth={2} />
      <span className="text-lg leading-relaxed sm:text-xl">{children}</span>
    </li>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#e5e8eb] bg-[#f8fafc] px-5 py-4 sm:px-6 sm:py-5">
      <Lightbulb className="mt-0.5 h-7 w-7 shrink-0 text-amber-500" strokeWidth={2} />
      <div className="text-base leading-relaxed text-[#4e5968] sm:text-lg">{children}</div>
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const finish = useCallback(() => {
    router.push(consumePostOnboardingDestination());
  }, [router]);

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
    <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:mb-6">
        <p className="text-base font-bold uppercase tracking-wider text-[#3182f6] sm:text-lg">
          시작하기
        </p>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={finish}
            className="rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-medium text-[#8b95a1] transition hover:border-[#e5e8eb] hover:bg-[#fafbfc] hover:text-[#4e5968] sm:px-3 sm:text-sm"
          >
            건너뛰기
          </button>
          <span className="h-4 w-px shrink-0 bg-[#e5e8eb]" aria-hidden />
          <span className="text-xl font-bold tabular-nums text-[#8b95a1] sm:text-2xl">
            <span className="text-[#191f28]">{step}</span> / {TOTAL}
          </span>
        </div>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-[#e5e8eb] sm:h-3.5">
        <motion.div
          className="h-full rounded-full bg-[#3182f6]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}
        />
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[#e8ecf0] bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
        <div className="px-6 pb-0 pt-3 sm:px-10 sm:pt-4 lg:px-12">
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
              className="py-10 sm:py-12 lg:py-14"
            >
              {step === 1 ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#191f28] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                      실제 재고 숫자를 맞춰요
                    </h2>
                    <p className="text-lg leading-relaxed text-[#4e5968] sm:text-xl sm:leading-relaxed">
                      이 서비스는 <strong className="text-[#191f28]">재고 숫자가 확정된 뒤</strong>에 감시
                      에이전트와 자동구매 흐름이 의미 있게 돌아가요. POS에서 자동으로 빠져나가지 않는다면, 직접{" "}
                      <strong className="text-[#191f28]">반영한 시점</strong>이 곧 운영 기준이 됩니다.
                    </p>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
                    <Bullet>
                      <strong className="text-[#191f28]">품목·안전재고</strong>가 있어야 “부족하다”를 판단할 수
                      있어요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">실제 수량</strong>을 맞춰 두면 그때부터 경보·발주
                      시뮬레이션이 현실에 가까워져요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">지표·에이전트</strong>는 연동·정책에 따라 같은 화면에서
                      실데이터로 바뀌어요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    처음엔 “다 채워야 하나?” 부담 없이, 자주 파는 품목 몇 개만 등록하고 수량만 맞춰도 흐름을
                    이해하기 좋아요.
                  </TipBox>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight text-[#191f28] sm:text-4xl lg:text-[2.75rem]">
                      먼저 품목을 등록해요
                    </h2>
                    <p className="text-lg leading-relaxed text-[#4e5968] sm:text-xl">
                      이름과 안전재고(상한)만 있어도 “지금 얼마나 부족한지”를 숫자로 볼 수 있어요. 바코드·내부 SKU는
                      나중에 넣어도 됩니다.
                    </p>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
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
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256dd4]"
                  >
                    재고 등록으로 이동
                  </Link>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight text-[#191f28] sm:text-4xl lg:text-[2.75rem]">
                      팔리고 들어올 때마다 반영해요
                    </h2>
                    <p className="text-lg leading-relaxed text-[#4e5968] sm:text-xl">
                      자동 차감이 없을 때는 <strong className="text-[#191f28]">재고 반영</strong>으로 현재고를 고치는
                      순간이, 시스템이 보는 “최신 스냅샷”이에요. 그 시각을 기준으로 긴급·주의 배지와 자동구매
                      파이프라인이 맞춰져요.
                    </p>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
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
                    className="inline-flex w-full items-center justify-center rounded-xl border border-[#e5e8eb] bg-white px-5 py-3 text-sm font-semibold text-[#191f28] transition hover:bg-[#f9fafb]"
                  >
                    재고 현황 열기
                  </Link>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight text-[#191f28] sm:text-4xl lg:text-[2.75rem]">
                      이제 대시보드에서 운영해요
                    </h2>
                    <p className="text-lg leading-relaxed text-[#4e5968] sm:text-xl">
                      개요에서는 오늘 지표와 재고 테이블 일부를, 구매 내역에서는 발주 흐름을 볼 수 있어요. 에이전트·프로토콜
                      화면은 멀티에이전트 구조를 눈으로 확인하는 용도예요.
                    </p>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
                    <Bullet>
                      <strong className="text-[#191f28]">개요</strong> — 누적 지표, 재고 스냅샷, AI 패널까지 한 화면에
                      모였어요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">재고 현황</strong> — 등록 품목과 반영, 검색이 이어져요.
                    </Bullet>
                    <Bullet>
                      <strong className="text-[#191f28]">에이전트·알림</strong> — 나중에 웹훅·슬랙만 붙이면 여기서 상태가
                      살아나요.
                    </Bullet>
                  </ul>
                  <TipBox>
                    막히면 우측 하단(모바일) AI 패널에 “재고·발주”를 물어보는 것도 바로 사용할 수 있어요.
                  </TipBox>
                  <button
                    type="button"
                    onClick={finish}
                    className="w-full rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256dd4]"
                  >
                    대시보드로 이동
                  </button>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < TOTAL ? (
          <div className="flex items-center gap-2 border-t border-[#f2f4f6] px-6 py-5 sm:px-10 sm:py-6 lg:px-12">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="rounded-lg border border-[#e5e8eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#4e5968] transition hover:bg-[#f9fafb] sm:min-w-[5.5rem]"
              >
                이전
              </button>
            ) : null}
            <div className="min-w-0 flex-1" aria-hidden />
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg bg-[#3182f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#256dd4] sm:min-w-[5.5rem]"
            >
              다음
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex justify-center gap-2.5 sm:mt-6" aria-hidden>
        {Array.from({ length: TOTAL }, (_, i) => {
          const active = i + 1 === step;
          const done = i + 1 < step;
          return (
            <motion.span
              key={i}
              className="h-3 rounded-full sm:h-3.5"
              initial={false}
              animate={{
                width: active ? 36 : 10,
                backgroundColor: active ? "#3182f6" : done ? "#93c5fd" : "#e5e8eb",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          );
        })}
      </div>
    </div>
  );
}
