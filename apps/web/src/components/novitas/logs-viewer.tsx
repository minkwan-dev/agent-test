"use client";

import { Copy, Loader2, ScrollText, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProtoChip } from "@/components/novitas/badge";
import type { Proto } from "@/lib/mock-data";
import { protoStyles, seedLogs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const protos: Proto[] = ["MCP", "A2A", "UCP", "AP2"];
const BATCH = 45;

export function LogsViewer() {
  const [query, setQuery] = useState("");
  const [protoFilter, setProtoFilter] = useState<Proto | "all">("all");
  const [visibleCount, setVisibleCount] = useState(BATCH);

  const sentinelRef = useRef<HTMLTableRowElement>(null);

  const lines = useMemo(() => {
    const filtered = seedLogs.filter((l) => {
      if (protoFilter !== "all" && l.proto !== protoFilter) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        l.msg.toLowerCase().includes(q) ||
        l.src.toLowerCase().includes(q) ||
        l.proto.toLowerCase().includes(q) ||
        l.t.replace(/:/g, "").includes(q.replace(/:/g, ""))
      );
    });
    return filtered.sort((a, b) => b.ts - a.ts);
  }, [query, protoFilter]);

  const totalFiltered = lines.length;
  const hasMore = visibleCount < totalFiltered;

  const visibleLines = useMemo(
    () => lines.slice(0, visibleCount),
    [lines, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(BATCH);
  }, [query, protoFilter]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + BATCH, totalFiltered));
  }, [totalFiltered]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || totalFiltered === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "120px 0px", threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [hasMore, totalFiltered, loadMore, visibleLines.length]);

  const copyVisible = async () => {
    const text = visibleLines
      .map((l) => `${l.t} [${l.proto}] ${l.src}: ${l.msg}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#191f28]">
          <ScrollText className="h-4 w-4 text-[#3182f6]" />
          에이전트 이벤트
        </h2>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <div className="relative min-w-0 flex-1 sm:max-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a1]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="메시지·에이전트·프로토콜·시각"
              className="w-full rounded-lg border border-[#e5e8eb] py-1.5 pl-8 pr-2 text-xs text-[#191f28] placeholder:text-[#8b95a1] outline-none focus:border-[#3182f6]"
            />
          </div>
          <ProtoFilterChip
            active={protoFilter === "all"}
            onClick={() => setProtoFilter("all")}
            label="전체"
          />
          {protos.map((p) => (
            <ProtoFilterChip
              key={p}
              active={protoFilter === p}
              onClick={() => setProtoFilter(p)}
              label={p}
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

      <div className="-mx-5 overflow-x-auto px-5">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e8eb] text-[11px] font-bold uppercase tracking-wide text-[#8b95a1]">
              <th className="pb-3 pr-3">프로토콜</th>
              <th className="pb-3 pr-3">소스</th>
              <th className="pb-3 pr-3">메시지</th>
              <th className="w-[100px] pb-3 text-right whitespace-nowrap sm:w-[120px]">시각</th>
            </tr>
          </thead>
          <tbody>
            {totalFiltered === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-[#8b95a1]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {visibleLines.map((l, i) => (
              <tr
                key={`${l.ts}-${i}-${l.proto}-${l.msg.slice(0, 24)}`}
                className="border-b border-[#f2f4f6] transition hover:bg-[#f9fafb]"
              >
                <td className="py-3 pr-3">
                  <ProtoChip proto={l.proto} />
                </td>
                <td
                  className={cn(
                    "max-w-[160px] py-3 pr-3 text-xs font-semibold",
                    protoStyles[l.proto].label,
                  )}
                >
                  {l.src}
                </td>
                <td className="py-3 pr-3 text-xs leading-relaxed text-[#4e5968]">{l.msg}</td>
                <td className="py-3 text-right text-xs tabular-nums text-[#8b95a1]">{l.t}</td>
              </tr>
            ))}
            {totalFiltered > 0 && hasMore ? (
              <tr ref={sentinelRef}>
                <td colSpan={4} className="py-4">
                  <span className="flex items-center justify-center gap-2 text-xs font-medium text-[#8b95a1]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#3182f6]" aria-hidden />
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

function ProtoFilterChip({
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
          ? "bg-[#3182f6] text-white shadow-sm"
          : "border border-[#e5e8eb] bg-white text-[#4e5968] hover:bg-[#f9fafb]",
      )}
    >
      {label}
    </button>
  );
}
