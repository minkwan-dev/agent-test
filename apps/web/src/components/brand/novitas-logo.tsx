"use client";

import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";

const wordmark = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const sizeClass = {
  sm: "text-[1.2rem] leading-none tracking-tight sm:text-[1.35rem]",
  md: "text-[1.5rem] leading-none tracking-tight sm:text-[1.65rem]",
  lg: "text-[1.85rem] leading-none tracking-tight sm:text-[2.1rem]",
} as const;

/**
 * Novitas 워드마크 — 아이콘 없이 글자만 (캘리그라피 톤).
 * 본문과 동일한 진한 그레이·블랙 (#191f28)으로 가독성 유지.
 */
export function NovitasLogoLockup({
  className,
  textClassName,
  size = "md",
  showText = true,
}: {
  className?: string;
  textClassName?: string;
  size?: keyof typeof sizeClass;
  showText?: boolean;
}) {
  if (!showText) return null;

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span
        className={cn(
          wordmark.className,
          "!text-[#191f28]",
          sizeClass[size],
          textClassName,
        )}
      >
        Novitas
      </span>
    </span>
  );
}
