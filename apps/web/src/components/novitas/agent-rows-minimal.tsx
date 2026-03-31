"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { ProtoChip } from "@/components/novitas/badge";
import { agents, protoStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** 개요용: 한 줄·구분선만 */
export function AgentRowsMinimal({ showLink }: { showLink?: boolean }) {
  return (
    <section className="rounded-xl border border-[#e5e8eb] bg-white p-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e5e8eb] px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#191f28]">
          <Bot className="h-4 w-4 text-[#3182f6]" />
          에이전트
        </h2>
        {showLink ? (
          <Link
            href="/dashboard/agents"
            className="text-xs font-semibold text-[#3182f6] hover:underline"
          >
            전체
          </Link>
        ) : null}
      </div>
      <ul className="divide-y divide-[#e5e8eb]">
        {agents.map((a) => (
          <li key={a.id}>
            <div className="flex min-w-0 items-center gap-2 px-3 py-2.5 text-sm sm:gap-3 sm:px-4">
              <span className="min-w-0 max-w-[42%] shrink-0 truncate font-medium text-[#191f28] sm:max-w-none sm:w-[180px]">
                {a.name}
              </span>
              <ProtoChip proto={a.proto} />
              <span
                className={cn(
                  "hidden min-w-0 flex-1 truncate text-xs text-[#8b95a1] md:inline",
                )}
              >
                {a.desc}
              </span>
              <span
                className={cn(
                  "w-9 shrink-0 text-right text-xs tabular-nums font-semibold",
                  protoStyles[a.proto].label,
                )}
              >
                {a.pct}%
              </span>
              <div className="hidden h-1 w-14 shrink-0 overflow-hidden rounded-full bg-[#e5e8eb] sm:block">
                <div
                  className={cn("h-full rounded-full", a.bar)}
                  style={{ width: `${a.pct}%` }}
                />
              </div>
              <span
                className={cn(
                  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold",
                  a.badgeClass,
                )}
              >
                {a.badge}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
