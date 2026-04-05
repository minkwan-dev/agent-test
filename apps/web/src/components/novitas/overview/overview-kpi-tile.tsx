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
      ? "from-[#6eb89a]/12 to-[#a8dcc4]/10"
      : accent === "amber"
        ? "from-orange-200/25 to-amber-50/35"
        : accent === "rose"
          ? "from-rose-200/25 to-rose-50/35"
          : "from-sky-200/20 to-cyan-50/30";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-5",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-90 blur-2xl",
          ring,
        )}
      />
      <div className="relative flex justify-end">
        <span className="rounded-full bg-[#f2f4f6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8b95a1]">
          실시간
        </span>
      </div>
      <p className="relative mt-3 text-[13px] font-medium text-[#8b95a1]">{label}</p>
      <div className="relative mt-1 min-w-0 break-words text-[1.25rem] font-bold tabular-nums tracking-tight leading-tight text-[#191f28] sm:text-[1.4rem]">
        {value}
      </div>
      {hint ? (
        <div className="relative mt-2 text-xs leading-relaxed text-[#8b95a1]">{hint}</div>
      ) : null}
    </div>
  );
}
