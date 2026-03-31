import { ArrowUpRight, Bot } from "lucide-react";
import Link from "next/link";
import { ProtoChip } from "@/components/novitas/badge";
import { agents, protoStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function OverviewAgentCards() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-1 border-b border-[#f2f4f6] bg-gradient-to-r from-[#fafbfc] to-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3182f6]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-[#191f28]">에이전트</h2>
            <p className="text-xs text-[#8b95a1]">4개 역할 · 프로토콜별 상태</p>
          </div>
        </div>
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#3182f6] hover:underline"
        >
          상세 보기
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid gap-3 px-5 pb-5 pt-0 sm:grid-cols-2 xl:grid-cols-4">
        {agents.map((a) => (
          <div
            key={a.id}
            className="group rounded-xl border border-[#f2f4f6] bg-[#fafbfc] p-4 transition hover:border-[#e5e8eb] hover:bg-white"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-lg leading-none">{a.emoji}</span>
              <ProtoChip proto={a.proto} />
            </div>
            <p className="mt-3 truncate text-sm font-semibold text-[#191f28]">{a.name}</p>
            <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-xs leading-snug text-[#8b95a1]">
              {a.desc}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-bold",
                  a.badgeClass,
                )}
              >
                {a.badge}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  protoStyles[a.proto].label,
                )}
              >
                {a.pct}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e8eb]">
              <div
                className={cn("h-full rounded-full transition-all", a.bar)}
                style={{ width: `${a.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
