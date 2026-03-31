import { cn } from "@/lib/utils";
import type { Proto } from "@/lib/mock-data";
import { protoStyles } from "@/lib/mock-data";

export function ProtoChip({ proto }: { proto: Proto }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide",
        protoStyles[proto].chip,
      )}
    >
      {proto}
    </span>
  );
}

export function StatusBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "warning" | "danger" | "neutral" | "violet";
}) {
  const map = {
    success:
      "border border-emerald-200 bg-emerald-50 text-emerald-800",
    warning:
      "border border-amber-200 bg-amber-50 text-amber-900",
    danger: "border border-rose-200 bg-rose-50 text-rose-800",
    neutral: "border border-gray-200 bg-gray-50 text-gray-700",
    violet:
      "border border-indigo-200 bg-indigo-50 text-indigo-800",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
        map[variant],
      )}
    >
      {children}
    </span>
  );
}
