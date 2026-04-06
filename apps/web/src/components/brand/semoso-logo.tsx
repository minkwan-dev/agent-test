"use client";

import { Fredoka } from "next/font/google";
import { cn } from "@/lib/utils";

const wordmark = Fredoka({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const sizeClass = {
  sm: "text-[1.2rem] leading-none tracking-tight sm:text-[1.35rem]",
  md: "text-[1.5rem] leading-none tracking-tight sm:text-[1.65rem]",
  lg: "text-[1.85rem] leading-none tracking-tight sm:text-[2.1rem]",
} as const;

/**
 * semoso 워드마크 — 아이콘 없이 글자만 (둥근·친근한 톤, Fredoka).
 * 브랜드 보라(#a78bfa 계열)를 은은한 그라데이션으로 녹여 구분감을 줍니다.
 */
export function SemosoLogoLockup({
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
    <span
      className={cn("inline-flex items-baseline", className)}
      role="img"
      aria-label="semoso. 세상의 모든 소상공인을 위한 서비스"
    >
      <span
        className={cn(
          wordmark.className,
          "bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent",
          sizeClass[size],
          textClassName,
        )}
      >
        semoso
      </span>
    </span>
  );
}
