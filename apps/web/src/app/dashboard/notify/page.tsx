"use client";

import { Bell, BellOff, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Novitas } from "@/components/novitas";
import { type NotificationSeverity, notifications as seedNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

type FilterKey = "all" | NotificationSeverity | "unread";

export default function NotifyPage() {
  const [items, setItems] = useState(() =>
    seedNotifications.map((n) => ({ ...n, read: false as boolean })),
  );
  const [filter, setFilter] = useState<FilterKey>("all");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    return items.filter((n) => {
      if (filter === "unread" && n.read) return false;
      if (filter !== "all" && filter !== "unread" && n.severity !== filter) return false;
      return true;
    });
  }, [items, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const totalFiltered = visible.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return visible.slice(start, start + PAGE_SIZE);
  }, [visible, safePage]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="알림"
        description={`재고·발주·연동·에이전트 알림이에요. 읽지 않음 ${unreadCount}건`}
        actions={
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e8eb] bg-white px-4 py-2 text-sm font-semibold text-[#4e5968] shadow-sm transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Bell className="h-4 w-4 text-[#3182f6]" />
            모두 읽음
          </button>
        }
      />
      <Novitas.DashboardContent innerClassName="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8b95a1]">
              <Filter className="h-3.5 w-3.5" />
              필터
            </span>
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              전체
            </FilterPill>
            <FilterPill active={filter === "unread"} onClick={() => setFilter("unread")}>
              읽지 않음
            </FilterPill>
            <FilterPill active={filter === "urgent"} onClick={() => setFilter("urgent")}>
              긴급
            </FilterPill>
            <FilterPill active={filter === "info"} onClick={() => setFilter("info")}>
              정보
            </FilterPill>
            <FilterPill active={filter === "success"} onClick={() => setFilter("success")}>
              완료
            </FilterPill>
          </div>

          <ul className="divide-y divide-[#e5e8eb] overflow-hidden rounded-xl border border-[#e5e8eb] bg-white shadow-sm">
            {totalFiltered === 0 ? (
              <li className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <BellOff className="h-10 w-10 text-[#d1d6db]" />
                <p className="text-sm font-medium text-[#4e5968]">표시할 알림이 없어요</p>
                <p className="text-xs text-[#8b95a1]">필터를 바꾸거나 나중에 다시 확인해 주세요.</p>
              </li>
            ) : (
              paged.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => toggleRead(n.id)}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3.5 text-left transition hover:bg-[#fafbfc]",
                      !n.read && "bg-[#f8fafc]",
                    )}
                  >
                    <SeverityDot severity={n.severity} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs tabular-nums text-[#8b95a1]">{n.t}</span>
                        <span className="rounded-md bg-[#f2f4f6] px-1.5 py-0.5 text-[10px] font-bold text-[#4e5968]">
                          {n.category}
                        </span>
                        {!n.read ? (
                          <span className="h-2 w-2 rounded-full bg-[#3182f6]" title="읽지 않음" />
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-[#191f28]">{n.msg}</p>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
          {totalFiltered > 0 ? (
            <Novitas.TablePagination
              page={page}
              pageSize={PAGE_SIZE}
              total={totalFiltered}
              onPageChange={setPage}
            />
          ) : null}
          <p className="text-center text-xs text-[#8b95a1]">
            읽음 상태는 이 브라우저 세션에만 저장돼요. · 총 {seedNotifications.length}건
          </p>
      </Novitas.DashboardContent>
    </div>
  );
}

function SeverityDot({ severity }: { severity: NotificationSeverity }) {
  const map = {
    urgent: "bg-rose-500",
    info: "bg-[#3182f6]",
    success: "bg-emerald-500",
  } as const;
  return <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", map[severity])} />;
}

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold transition",
        active ? "bg-[#3182f6] text-white" : "bg-white text-[#4e5968] ring-1 ring-[#e5e8eb] hover:bg-[#f9fafb]",
      )}
    >
      {children}
    </button>
  );
}
