"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, total);

  const go = (p: number) => {
    const next = Math.max(1, Math.min(p, totalPages));
    if (next !== page) onPageChange(next);
  };

  const windowSize = 5;
  let from = Math.max(1, safePage - Math.floor(windowSize / 2));
  let to = Math.min(totalPages, from + windowSize - 1);
  if (to - from + 1 < windowSize) {
    from = Math.max(1, to - windowSize + 1);
  }
  const pages = Array.from({ length: to - from + 1 }, (_, i) => from + i);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-[#f2f4f6] pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-center text-xs text-[#8b95a1] sm:text-left">
        <span className="tabular-nums">
          {start}–{end}
        </span>{" "}
        / 총{" "}
        <span className="font-semibold text-[#4e5968] tabular-nums">{total}</span>건
      </p>
      <div className="flex items-center justify-center gap-1 sm:justify-end">
        <button
          type="button"
          onClick={() => go(safePage - 1)}
          disabled={safePage <= 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e8eb] bg-white text-[#4e5968] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="이전 페이지"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-0.5 px-1">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              className={cn(
                "min-w-[2rem] rounded-lg px-2 py-1.5 text-xs font-semibold tabular-nums transition",
                p === safePage
                  ? "bg-[#3182f6] text-white"
                  : "text-[#4e5968] hover:bg-[#f2f4f6]",
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(safePage + 1)}
          disabled={safePage >= totalPages || total === 0}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e8eb] bg-white text-[#4e5968] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="다음 페이지"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
