import { cn } from "@/lib/utils";

export function OverviewKpiTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  accent: "blue" | "amber" | "rose" | "emerald";
}) {
  const ring =
    accent === "blue"
      ? "from-[#a78bfa]/12 to-[#e9d5ff]/10"
      : accent === "amber"
        ? "from-orange-200/25 to-amber-50/35"
        : accent === "rose"
          ? "from-rose-200/25 to-rose-50/35"
          : "from-[#a78bfa]/10 to-slate-100/40";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#f8f9f9] p-4 transition hover:border-[var(--color-border-strong)] sm:p-5",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-90 blur-2xl",
          ring,
        )}
      />
      <div className="relative flex justify-end">
        <span className="rounded-full bg-[#f2f4f6] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          실시간
        </span>
      </div>
      <p className="relative mt-3 text-xs font-medium text-[var(--color-muted)]">{label}</p>
      <div className="relative mt-1 min-w-0 break-words text-[1.25rem] font-bold tabular-nums tracking-tight leading-tight text-[#191f28] sm:text-[1.4rem]">
        {value}
      </div>
      {hint ? (
        <div className="relative mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
          {hint}
        </div>
      ) : null}
    </div>
  );
}
