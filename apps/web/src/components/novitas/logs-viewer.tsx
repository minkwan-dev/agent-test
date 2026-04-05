"use client";

import { Copy, Loader2, ScrollText, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StepChip } from "@/components/novitas/badge";
import type { ProcessStep } from "@/lib/mock-data";
import { processStepStyles, seedLogs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEPS: ProcessStep[] = ["stock", "decide", "purchase", "record"];
const BATCH = 45;

export function LogsViewer() {
  const [query, setQuery] = useState("");
  const [stepFilter, setStepFilter] = useState<ProcessStep | "all">("all");
  const [visibleCount, setVisibleCount] = useState(BATCH);

  const sentinelRef = useRef<HTMLTableRowElement>(null);

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
  const hasMore = visibleCount < totalFiltered;

  const visibleLines = useMemo(
    () => lines.slice(0, visibleCount),
    [lines, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(BATCH);
  }, [query, stepFilter]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + BATCH, totalFiltered));
  }, [totalFiltered]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || totalFiltered === 0) return;

    const rootEl = document.querySelector("[data-dashboard-scroll]");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      {
        root: rootEl instanceof HTMLElement ? rootEl : null,
        rootMargin: "120px 0px",
        threshold: 0,
      },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [hasMore, totalFiltered, loadMore, visibleLines.length]);

  const copyVisible = async () => {
    const text = visibleLines
      .map((l) => `${l.t} [${processStepStyles[l.step].chipLabel}] ${l.src}: ${l.msg}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex min-w-0 flex-col gap-3 @min-[64rem]:flex-row @min-[64rem]:items-center @min-[64rem]:justify-between">
        <h2 className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#191f28]">
          <ScrollText className="h-4 w-4 text-[#6eb89a]" />
          처리 기록
        </h2>
        <div className="flex min-w-0 w-full flex-1 flex-nowrap items-center justify-end gap-2 overflow-x-auto pb-0.5 @min-[64rem]:w-auto @min-[64rem]:justify-end">
          <div className="relative min-w-[140px] shrink-0 flex-1 @min-[40rem]:max-w-[220px] @min-[64rem]:flex-initial">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a1]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="내용·역할·단계·시각"
              className="w-full rounded-lg border border-[#e5e8eb] py-1.5 pl-8 pr-2 text-xs text-[#191f28] placeholder:text-[#8b95a1] outline-none focus:border-[#6eb89a]"
            />
          </div>
          <StepFilterChip
            active={stepFilter === "all"}
            onClick={() => setStepFilter("all")}
            label="전체"
          />
          {STEPS.map((s) => (
            <StepFilterChip
              key={s}
              active={stepFilter === s}
              onClick={() => setStepFilter(s)}
              label={processStepStyles[s].chipLabel}
            />
          ))}
          <button
            type="button"
            onClick={() => copyVisible()}
            title="지금까지 불러온 로그를 복사해요"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e8eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] hover:bg-[#f9fafb]"
          >
            <Copy className="h-3.5 w-3.5" />
            복사
          </button>
        </div>
      </div>

      <div className="-mx-5 min-w-0 overflow-x-auto px-5">
        <table className="w-full min-w-0 table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col />
            <col className="w-[120px]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[#e5e8eb] text-[11px] font-bold uppercase tracking-wide text-[#8b95a1]">
              <th className="pb-3 pr-3 align-bottom">단계</th>
              <th className="pb-3 pr-3 align-bottom">역할</th>
              <th className="min-w-0 pb-3 pr-3 align-bottom">내용</th>
              <th className="pb-3 text-right align-bottom whitespace-nowrap @min-[40rem]:w-[120px]">시각</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2f4f6]">
            {totalFiltered === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-[#8b95a1]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {visibleLines.map((l, i) => (
              <tr
                key={`${l.ts}-${i}-${l.step}-${l.msg.slice(0, 24)}`}
                className="transition hover:bg-[#f9fafb]"
              >
                <td className="min-w-0 py-3 pr-3 align-top">
                  <StepChip step={l.step} />
                </td>
                <td
                  className={cn(
                    "min-w-0 py-3 pr-3 align-top text-xs font-semibold break-words [overflow-wrap:anywhere]",
                    processStepStyles[l.step].label,
                  )}
                >
                  {l.src}
                </td>
                <td className="min-w-0 py-3 pr-3 align-top text-xs leading-relaxed break-words text-[#4e5968] [overflow-wrap:anywhere]">
                  {l.msg}
                </td>
                <td className="py-3 align-top text-right text-xs tabular-nums text-[#8b95a1]">
                  {l.t}
                </td>
              </tr>
            ))}
            {totalFiltered > 0 && hasMore ? (
              <tr ref={sentinelRef}>
                <td colSpan={4} className="py-4">
                  <span className="flex items-center justify-center gap-2 text-xs font-medium text-[#8b95a1]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#6eb89a]" aria-hidden />
                    아래로 스크롤하면 이전 로그를 불러와요
                  </span>
                </td>
              </tr>
            ) : null}
            {totalFiltered > 0 && !hasMore ? (
              <tr>
                <td colSpan={4} className="py-3 text-center text-[11px] font-medium text-[#b0b8c1]">
                  모든 로그를 불러왔어요 · 표시 {visibleLines.length}건
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StepFilterChip({
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
        "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "bg-[#6eb89a] text-white shadow-sm"
          : "border border-[#e5e8eb] bg-white text-[#4e5968] hover:bg-[#f9fafb]",
      )}
    >
      {label}
    </button>
  );
}
