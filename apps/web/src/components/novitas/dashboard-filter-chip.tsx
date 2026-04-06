import { cn } from "@/lib/utils";

/** 처리 기록·알림 등 대시보드 필터 — 동일한 칩 스타일 */
export function DashboardFilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "bg-[#a78bfa] text-white shadow-sm"
          : "border border-[var(--color-border)] bg-white text-[#4e5968] hover:bg-[#fafbfc]",
      )}
    >
      {label}
    </button>
  );
}
