"use client";

import { ScrollText, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StepChip } from "@/components/novitas/badge";
import { DashboardFilterChip } from "@/components/novitas/dashboard-filter-chip";
import {
  dashboardPanelBleedX,
  dashboardSectionStackClass,
  nvLogListBody,
  nvLogListMuted,
  nvLogListRole,
  nvLogSearchInput,
} from "@/components/novitas/dashboard-content";
import { TablePagination } from "@/components/novitas/table-pagination";
import type { ProcessStep } from "@/lib/mock-data";
import { processStepStyles, seedLogs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEPS: ProcessStep[] = ["stock", "decide", "purchase", "record"];
const PAGE_SIZE = 20;

export function LogsViewer() {
  const [query, setQuery] = useState("");
  const [stepFilter, setStepFilter] = useState<ProcessStep | "all">("all");
  const [page, setPage] = useState(1);

  const lines = useMemo(() => {
    const filtered = seedLogs.filter((l) => {
      if (stepFilter !== "all" && l.step !== stepFilter) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        l.msg.toLowerCase().includes(q) ||
        l.src.toLowerCase().includes(q) ||
        l.step.toLowerCase().includes(q) ||
        processStepStyles[l.step].chipLabel.toLowerCase().includes(q) ||
        l.t.replace(/:/g, "").includes(q.replace(/:/g, ""))
      );
    });
    return filtered.sort((a, b) => b.ts - a.ts);
  }, [query, stepFilter]);

  const totalFiltered = lines.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pagedLines = useMemo(
    () =>
      lines.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [lines, safePage],
  );

  useEffect(() => {
    setPage(1);
  }, [query, stepFilter]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  return (
    <section className={dashboardSectionStackClass}>
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex h-9 shrink-0 items-center gap-2 text-sm font-bold leading-none text-[var(--color-foreground)]">
          <ScrollText className="h-4 w-4 shrink-0 text-[#a78bfa]" />
          처리 기록
        </h2>
        <div className="flex min-h-9 min-w-0 w-full flex-1 flex-nowrap items-center justify-end gap-2 overflow-x-auto overflow-y-visible py-1.5 sm:w-auto sm:justify-end sm:py-1.5">
          <div className="relative min-w-[140px] shrink-0 flex-1 @min-[40rem]:max-w-[220px] @min-[64rem]:flex-initial">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="내용·역할·단계·시각"
              className={nvLogSearchInput}
            />
          </div>
          <DashboardFilterChip
            active={stepFilter === "all"}
            onClick={() => setStepFilter("all")}
            label="전체"
          />
          {STEPS.map((s) => (
            <DashboardFilterChip
              key={s}
              active={stepFilter === s}
              onClick={() => setStepFilter(s)}
              label={processStepStyles[s].chipLabel}
            />
          ))}
        </div>
      </div>

      <div className={cn("min-w-0 overflow-x-auto", dashboardPanelBleedX)}>
        <table className="w-full min-w-0 table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col />
            <col className="w-[120px]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              <th className="pb-3 pr-3 align-bottom">단계</th>
              <th className="pb-3 pr-3 align-bottom">역할</th>
              <th className="min-w-0 pb-3 pr-3 align-bottom">내용</th>
              <th className="pb-3 text-right align-bottom whitespace-nowrap @min-[40rem]:w-[120px]">
                시각
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]/50">
            {totalFiltered === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-[var(--color-muted)]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {pagedLines.map((l, i) => (
              <tr
                key={`${l.ts}-${i}-${l.step}-${l.msg.slice(0, 24)}`}
                className="transition hover:bg-[#fafbfc]"
              >
                <td className="min-w-0 py-3 pr-3 align-middle">
                  <StepChip step={l.step} />
                </td>
                <td
                  className={cn(
                    "min-w-0 py-3 pr-3 align-middle",
                    nvLogListRole,
                    processStepStyles[l.step].label,
                  )}
                >
                  {l.src}
                </td>
                <td className={cn("min-w-0 py-3 pr-3 align-middle", nvLogListBody)}>
                  {l.msg}
                </td>
                <td
                  className={cn(
                    "py-3 align-middle text-right",
                    nvLogListMuted,
                  )}
                >
                  {l.t}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalFiltered > 0 ? (
        <TablePagination
          page={safePage}
          pageSize={PAGE_SIZE}
          total={totalFiltered}
          onPageChange={setPage}
        />
      ) : null}
    </section>
  );
}
