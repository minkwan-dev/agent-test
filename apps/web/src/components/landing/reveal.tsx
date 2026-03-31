"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** 토스 느낌: 길게 늘어지는 ease-out */
const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 56,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 초기 세로 오프셋(px) — 클수록 등장이 더 드라마틱 */
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        /* 뷰포트를 위·아래로 넓혀 조금 일찍 트리거 → 스크롤과 맞물려 더 길게 느껴짐 */
        margin: "-100px 0px -100px 0px",
        amount: 0.12,
      }}
      transition={{
        duration: 1.35,
        delay,
        ease: easeSmooth,
      }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.16,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export function RevealStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        margin: "-80px 0px -80px 0px",
        amount: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
