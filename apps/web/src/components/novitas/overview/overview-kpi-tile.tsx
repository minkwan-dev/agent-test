import { cn } from "@/lib/utils";

export function OverviewKpiTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  hint: React.ReactNode;
  accent: "blue" | "amber" | "rose" | "emerald";
}) {
  const ring =
    accent === "blue"
      ? "from-[#3182f6]/15 to-[#93c5fd]/10"
      : accent === "amber"
        ? "from-amber-400/15 to-amber-100/20"
        : accent === "rose"
          ? "from-rose-400/15 to-rose-100/15"
          : "from-emerald-400/15 to-emerald-100/15";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
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
      <div className="relative mt-1 min-w-0 break-words font-bold tabular-nums tracking-tight text-[#191f28] text-[1.35rem] leading-tight sm:text-[1.5rem]">
        {value}
      </div>
      <div className="relative mt-2 text-xs leading-relaxed text-[#8b95a1]">{hint}</div>
    </div>
  );
}
