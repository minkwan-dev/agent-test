import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/mock-data";
import { processStepStyles } from "@/lib/mock-data";

/** 처리 단계 — 라벨은 접근용 title·스크린리더에만 사용 */
export function StepChip({ step }: { step: ProcessStep }) {
  const { chipLabel, dot } = processStepStyles[step];
  return (
    <span
      title={chipLabel}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f2f4f6]",
      )}
    >
      <span
        className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-black/[0.06]", dot)}
        role="img"
        aria-label={chipLabel}
      />
    </span>
  );
}

const statusDotRing = {
  success: "bg-[#7ec8e3] ring-[#7ec8e3]/35",
  warning: "bg-[#f0b885] ring-[#f0b885]/35",
  danger: "bg-[#f5a0b8] ring-[#f5a0b8]/35",
  neutral: "bg-[#c5ccd4] ring-[#c5ccd4]/35",
  violet: "bg-[#b8a0e8] ring-[#b8a0e8]/35",
} as const;

/** 상태 — 점만 표시, 문구는 title·aria-label로만 제공 */
export function StatusBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "warning" | "danger" | "neutral" | "violet";
}) {
  const label =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : "";
  return (
    <span
      title={label || undefined}
      className="inline-flex items-center justify-center"
    >
      <span
        className={cn(
          "inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-2",
          statusDotRing[variant],
        )}
        role="img"
        aria-label={label || undefined}
      />
    </span>
  );
}
