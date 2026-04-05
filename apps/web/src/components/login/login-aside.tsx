"use client";

import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "../../lib/framer-motion";
import { loginContainerVariants, loginContentEase, loginItemVariants } from "@/components/login/login-motion";

/** 재고 → 자동 처리 → 발주·결제로 이어지는 흐름 일러스트 */
function LoginAsideIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-full max-w-[min(100%,420px)]"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: loginContentEase, delay: 0.15 }}
    >
      <motion.div
        className="relative"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 440 248"
          className="h-full w-full max-h-[min(46vh,400px)] min-h-[200px] sm:min-h-[230px] lg:min-h-[260px]"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="la-flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a8dcc4" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#6eb89a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#8fd4b8" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="la-orb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a8dcc4" />
              <stop offset="55%" stopColor="#6eb89a" />
              <stop offset="100%" stopColor="#3d6b57" />
            </linearGradient>
            <linearGradient id="la-card" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#f0faf6" stopOpacity="0.95" />
            </linearGradient>
            <filter id="la-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1a3d32" floodOpacity="0.1" />
            </filter>
            <filter id="la-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 배경 소프트 글로우 */}
          <ellipse cx="220" cy="128" rx="200" ry="100" fill="#6eb89a" opacity="0.04" />
          <ellipse cx="220" cy="138" rx="160" ry="72" fill="#8fd4b8" opacity="0.06" />

          {/* 좌: 재고 스택 */}
          <g filter="url(#la-soft-shadow)">
            <rect x="36" y="88" width="92" height="72" rx="14" fill="url(#la-card)" stroke="#c8e4d6" strokeWidth="1.25" />
            <rect x="50" y="104" width="64" height="6" rx="2" fill="#6eb89a" opacity="0.15" />
            <rect x="50" y="116" width="52" height="6" rx="2" fill="#6eb89a" opacity="0.1" />
            <rect x="50" y="128" width="58" height="6" rx="2" fill="#6eb89a" opacity="0.08" />
            <rect x="58" y="72" width="48" height="22" rx="6" fill="#e8f5ee" stroke="#a8dcc4" strokeWidth="1" />
            <path d="M70 78h24M70 84h18" stroke="#3d6b57" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
          </g>

          {/* 우: 대시보드 + 결제 카드 느낌 */}
          <g filter="url(#la-soft-shadow)">
            <rect x="298" y="56" width="108" height="118" rx="16" fill="url(#la-card)" stroke="#c8e4d6" strokeWidth="1.25" />
            <rect x="312" y="72" width="72" height="8" rx="3" fill="#6eb89a" opacity="0.12" />
            <rect x="312" y="88" width="80" height="36" rx="6" fill="#f8fcfa" stroke="#d8ebe2" strokeWidth="1" />
            <path
              d="M322 112 L338 100 L352 108 L368 92 L382 108"
              stroke="#6eb89a"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            />
            <rect x="312" y="134" width="80" height="28" rx="8" fill="#e8f5ee" stroke="#a8dcc4" strokeWidth="1" />
            <circle cx="328" cy="148" r="6" fill="#8fd4b8" opacity="0.85" />
            <rect x="340" y="142" width="44" height="5" rx="2" fill="#2d5244" opacity="0.35" />
            <rect x="340" y="150" width="32" height="4" rx="2" fill="#a8dcc4" opacity="0.5" />
          </g>

          {/* 연결 플로우 라인 */}
          <motion.path
            d="M 132 128 C 168 128, 175 118, 200 118 C 225 118, 232 128, 248 128 C 264 128, 275 118, 298 118"
            stroke="url(#la-flow-line)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.35, ease: loginContentEase }, opacity: { duration: 0.4 } }}
          />

          {/* 중앙 자동 처리 허브 */}
          <g filter="url(#la-glow)">
            {!reduceMotion && (
              <motion.circle
                cx="220"
                cy="128"
                r="42"
                stroke="#6eb89a"
                strokeWidth="1.5"
                fill="none"
                initial={{ opacity: 0.12 }}
                animate={{ opacity: [0.12, 0.38, 0.12] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <circle cx="220" cy="128" r="38" fill="url(#la-orb)" opacity="0.95" />
            <circle cx="220" cy="128" r="38" fill="none" stroke="white" strokeWidth="2" opacity="0.35" />
            {/* 자동 처리 심볼 */}
            <rect x="204" y="112" width="32" height="26" rx="8" fill="white" opacity="0.95" />
            <circle cx="214" cy="124" r="3.5" fill="#2d5244" />
            <circle cx="226" cy="124" r="3.5" fill="#2d5244" />
            <path d="M212 132h16" stroke="#3d6b57" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            {!reduceMotion && (
              <motion.circle
                cx="220"
                cy="104"
                r="4"
                fill="#c8e4d6"
                animate={{ cy: [104, 100, 104] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {reduceMotion && <circle cx="220" cy="104" r="4" fill="#c8e4d6" />}
          </g>

          {/* 플로우 위 작은 노드 */}
          <circle cx="132" cy="128" r="5" fill="#6eb89a" opacity="0.65" />
          <circle cx="308" cy="118" r="5" fill="#8fd4b8" opacity="0.7" />

          {!reduceMotion && (
            <>
              <motion.circle
                cx="160"
                cy="96"
                r="3"
                fill="#8fd4b8"
                opacity="0.55"
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.circle
                cx="280"
                cy="156"
                r="3"
                fill="#8fd4b8"
                opacity="0.5"
                animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}

const bullets = [
  "재고가 부족하거나 이상하면 먼저 알려 줘요.",
  "발주부터 결제까지 단계마다 이어 주고, 어디서 멈췄는지 한 화면에서 볼 수 있어요.",
  "정해 둔 규칙 안에서 자동으로 진행하고, 사람은 확인·승인에만 신경 쓰면 돼요.",
] as const;

export function LoginAside() {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="order-2 flex h-full min-h-0 w-full min-w-0 flex-col lg:order-1">
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#c8e4d6]/90 bg-gradient-to-br from-[#e4f6ee] via-[#f0faf6] to-[#e8f5ee] shadow-sm ring-1 ring-white/70">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(110,184,154,0.22),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_100%,rgba(110,184,154,0.14),transparent_48%)]"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-[#6eb89a]/8 blur-2xl"
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.45, 0.75, 0.45],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#a8dcc4]/15 blur-2xl"
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.6, 0.35],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="relative flex min-h-0 flex-1 flex-col p-6 sm:p-8 lg:p-10"
          variants={loginContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={loginItemVariants}
            className="h-1 w-11 rounded-full bg-gradient-to-r from-[#6eb89a] to-[#8fd4b8]"
            aria-hidden
          />

          <motion.p
            variants={loginItemVariants}
            className="mt-5 text-xs font-bold uppercase tracking-wider text-[#6eb89a]"
          >
            재고만 맞추면 이어져요
          </motion.p>
          <motion.h2
            variants={loginItemVariants}
            className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#191f28] sm:text-[1.75rem]"
          >
            재고·발주·결제까지 흐름을 한 번에 맞춰요
          </motion.h2>
          <motion.p
            variants={loginItemVariants}
            className="mt-4 text-sm leading-relaxed text-[#4e5968] sm:text-[15px]"
          >
            재고를 반영해 두면, 부족한 품목부터 발주·결제까지 순서대로 이어 가요.
            <br />
            <br />
            판매할 때마다 자동으로 빠지는 연동은 없다고 보시면 되고, 매장에서 넣어 둔 숫자를 기준으로
            움직여요. 담당자는 확인과 승인에만 집중하시면 돼요.
          </motion.p>

          <motion.ul variants={loginItemVariants} className="mt-8 space-y-2.5">
            {bullets.map((line, i) => (
              <motion.li
                key={line}
                variants={loginItemVariants}
                custom={i}
                className="flex gap-3 rounded-xl border border-[#f2f4f6] bg-white/55 px-3.5 py-3 shadow-sm backdrop-blur-sm sm:px-4"
                whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#6eb89a]" />
                <span className="text-sm leading-relaxed text-[#4e5968]">{line}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="relative mt-8 flex min-h-[min(44vh,360px)] flex-1 items-center justify-center">
            <motion.div
              className="absolute inset-x-0 bottom-0 top-6 rounded-2xl border border-white/50 bg-white/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] backdrop-blur-[2px]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            />
            <div className="relative z-[1] flex w-full max-w-[min(100%,420px)] items-center justify-center px-2 py-4 sm:py-6">
              <LoginAsideIllustration />
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
