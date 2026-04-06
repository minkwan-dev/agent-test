"use client";

import { Activity, Bell, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { StepChip, StatusBadge } from "@/components/novitas/badge";
import { ReflectInventoryDialog } from "@/components/novitas/reflect-inventory-dialog";
import { TablePagination } from "@/components/novitas/table-pagination";
import {
  type InventoryAlertRow,
  type NotificationRow,
  type NotificationSeverity,
  inventoryAlerts,
  notifications as seedNotifications,
  orders,
  processStepStyles,
} from "@/lib/mock-data";
import { useInventoryServerRows } from "@/lib/use-inventory-items";
import {
  loadUserInventory,
  shouldShowInventoryReflectButton,
} from "@/lib/user-inventory";
import {
  dashboardPanelBleedX,
  dashboardSectionStackClass,
  nvLogListBody,
  nvLogListMuted,
  nvLogListRowTitle,
  nvLogSearchInput,
  nvLogToolbarButton,
} from "@/components/novitas/dashboard-content";
import { DashboardFilterChip } from "@/components/novitas/dashboard-filter-chip";
import { cn } from "@/lib/utils";

export function InventoryTableBlock({
  title = "재고 경보 품목",
  showAutoBuy = true,
  pageSize = 100,
  paginate = true,
}: {
  title?: string;
  showAutoBuy?: boolean;
  pageSize?: number;
  paginate?: boolean;
}) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [userRows, setUserRows] = useState<InventoryAlertRow[]>([]);
  const [reflectRow, setReflectRow] = useState<InventoryAlertRow | null>(null);
  const { data: serverRows = [] } = useInventoryServerRows();

  useEffect(() => {
    const sync = () => setUserRows(loadUserInventory());
    sync();
    window.addEventListener("novitas-inventory-updated", sync);
    return () => window.removeEventListener("novitas-inventory-updated", sync);
  }, []);

  const baseRows = useMemo(
    () => [...serverRows, ...userRows, ...inventoryAlerts],
    [serverRows, userRows],
  );

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return baseRows;
    return baseRows.filter((row) => row.name.toLowerCase().includes(s));
  }, [q, baseRows]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageSafe = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedRows = useMemo(
    () => rows.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [rows, pageSafe, pageSize],
  );

  return (
    <section className={dashboardSectionStackClass}>
      <ReflectInventoryDialog
        row={reflectRow}
        open={reflectRow !== null}
        onClose={() => setReflectRow(null)}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex h-9 shrink-0 items-center gap-2 text-sm font-bold leading-none text-[var(--color-foreground)]">
          <Activity className="h-4 w-4 shrink-0 text-[#a78bfa]" />
          {title}
        </h2>
        <div className="flex min-h-9 flex-1 flex-nowrap items-center justify-end gap-2 @min-[40rem]:max-w-xs">
          <div className="relative min-w-0 flex-1 @min-[40rem]:max-w-[200px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="품목 검색"
              className={nvLogSearchInput}
            />
          </div>
          {showAutoBuy ? (
            <button
              type="button"
              className="shrink-0 rounded-lg bg-[#a78bfa] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#8b5cf6]"
            >
              자동 발주
            </button>
          ) : null}
        </div>
      </div>
      <div className={cn("overflow-x-auto", dashboardPanelBleedX)}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              <th className="pb-3 pr-3">품목</th>
              <th className="min-w-[200px] pb-3 pr-3 sm:min-w-[220px]">재고</th>
              <th className="pb-3 pr-3">상태</th>
              <th className="w-[104px] pb-3 text-right sm:w-[120px]">반영</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-[var(--color-muted)]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {(paginate ? pagedRows : rows).map((row) => {
              const pct =
                row.max > 0 ? Math.round((row.cur / row.max) * 100) : 0;
              const bar =
                row.level === "urgent" ? "bg-[#f5b8c8]" : "bg-[#fcd9a8]";
              return (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-border)]/60 last:border-0"
                >
                  <td className="py-3 pr-3 align-middle">
                    <div className="flex min-h-10 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f6] text-base">
                        {row.icon}
                      </span>
                      <span className={cn("min-w-0", nvLogListRowTitle)}>
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 align-middle">
                    <div className="flex min-w-[180px] max-w-[280px] flex-col gap-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            "text-xs font-semibold tabular-nums text-[#4e5968]",
                          )}
                        >
                          {row.cur}
                          <span className="mx-0.5 font-normal text-[var(--color-muted)]">
                            /
                          </span>
                          {row.max}
                        </span>
                        <span className={cn("font-medium", nvLogListMuted)}>
                          {pct}%
                        </span>
                      </div>
                      <div
                        className="h-2 w-full overflow-hidden rounded-full bg-[#e8eaec]"
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`재고 ${pct}%`}
                      >
                        <div
                          className={cn("h-full rounded-full", bar)}
                          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-3 align-middle">
                    {row.level === "urgent" ? (
                      <StatusBadge variant="danger">긴급</StatusBadge>
                    ) : (
                      <StatusBadge variant="warning">주의</StatusBadge>
                    )}
                  </td>
                  <td className="py-3 text-right align-middle">
                    {shouldShowInventoryReflectButton(row.id, pct) ? (
                      <button
                        type="button"
                        onClick={() => setReflectRow(row)}
                        className="rounded-lg border border-[#a78bfa] bg-[#a78bfa] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#8b5cf6]"
                      >
                        재고 반영
                      </button>
                    ) : (
                      <span className={nvLogListMuted}>기본</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {paginate && rows.length > 0 ? (
        <TablePagination
          page={pageSafe}
          pageSize={pageSize}
          total={rows.length}
          onPageChange={setPage}
        />
      ) : null}
    </section>
  );
}

export function OrdersTableBlock({
  pageSize = 100,
  paginate = true,
  showOrdersPageLink = true,
}: {
  pageSize?: number;
  paginate?: boolean;
  showOrdersPageLink?: boolean;
}) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return orders;
    return orders.filter(
      (o) =>
        o.name.toLowerCase().includes(s) ||
        o.supplier.toLowerCase().includes(s) ||
        o.step.toLowerCase().includes(s) ||
        processStepStyles[o.step].chipLabel.includes(s) ||
        o.agent.toLowerCase().includes(s),
    );
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedOrders = useMemo(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe, pageSize],
  );

  return (
    <section className={dashboardSectionStackClass}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex h-9 shrink-0 items-center gap-2 text-sm font-bold leading-none text-[var(--color-foreground)]">
          <ShoppingCart className="h-4 w-4 shrink-0 text-[#a78bfa]" />
          최근 자동 발주 내역
        </h2>
        <div className="flex min-h-9 flex-1 flex-nowrap items-center justify-end gap-2">
          <div className="relative min-w-0 flex-1 @min-[40rem]:max-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="품목·공급처·단계"
              className={nvLogSearchInput}
            />
          </div>
          <button type="button" className={nvLogToolbarButton}>
            필터
          </button>
          {showOrdersPageLink ? (
            <Link href="/dashboard/orders" className={nvLogToolbarButton}>
              전체 보기
            </Link>
          ) : null}
        </div>
      </div>
      <div className={cn("overflow-x-auto", dashboardPanelBleedX)}>
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              <th className="pb-3 pr-3">품목</th>
              <th className="pb-3 pr-3">수량</th>
              <th className="pb-3 pr-3">금액</th>
              <th className="pb-3 pr-3">단계</th>
              <th className="pb-3 pr-3">공급처</th>
              <th className="hidden pb-3 pr-3 @min-[40rem]:table-cell">맡은 역할</th>
              <th className="pb-3 pr-3">상태</th>
              <th className="pb-3">시각</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-sm text-[var(--color-muted)]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {(paginate ? pagedOrders : filtered).map((o) => (
              <tr
                key={o.id}
                className="border-b border-[var(--color-border)]/60 transition hover:bg-[#fafbfc] last:border-0"
              >
                <td className="py-3 pr-3 align-middle">
                  <div className="flex min-h-9 items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f6]">
                      {o.icon}
                    </span>
                    <span className={nvLogListRowTitle}>{o.name}</span>
                  </div>
                </td>
                <td className={cn("py-3 pr-3 align-middle", nvLogListBody)}>{o.qty}</td>
                <td
                  className={cn(
                    "py-3 pr-3 align-middle text-xs font-semibold tabular-nums text-[var(--color-foreground)]",
                  )}
                >
                  {o.price}
                </td>
                <td className="py-3 pr-3 align-middle">
                  <StepChip step={o.step} />
                </td>
                <td className={cn("py-3 pr-3 align-middle", nvLogListBody)}>{o.supplier}</td>
                <td
                  className={cn(
                    "hidden py-3 pr-3 align-middle @min-[40rem]:table-cell",
                    nvLogListMuted,
                  )}
                >
                  {o.agent}
                </td>
                <td className="py-3 pr-3 align-middle">
                  {o.state === "done" ? (
                    <StatusBadge variant="success">완료</StatusBadge>
                  ) : (
                    <StatusBadge variant="warning">대기</StatusBadge>
                  )}
                </td>
                <td className={cn("py-3 align-middle", nvLogListMuted)}>{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginate && filtered.length > 0 ? (
        <TablePagination
          page={pageSafe}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
        />
      ) : null}
    </section>
  );
}

export type NotificationItem = NotificationRow & { read: boolean };

type NotifyFilterKey = "all" | NotificationSeverity | "unread";

export function NotificationsTableBlock({
  items,
  onItemsChange,
  pageSize = 20,
}: {
  items: NotificationItem[];
  onItemsChange: Dispatch<SetStateAction<NotificationItem[]>>;
  pageSize?: number;
}) {
  const [filter, setFilter] = useState<NotifyFilterKey>("all");
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
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return visible.slice(start, start + pageSize);
  }, [visible, safePage, pageSize]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const toggleRead = (id: string) => {
    onItemsChange((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  return (
    <section className={dashboardSectionStackClass}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex h-9 shrink-0 items-center gap-2 text-sm font-bold leading-none text-[var(--color-foreground)]">
          <Bell className="h-4 w-4 shrink-0 text-[#a78bfa]" />
          알림 목록
        </h2>
        <div className="flex min-h-9 min-w-0 flex-1 flex-nowrap items-center justify-end gap-2 overflow-x-auto overflow-y-visible py-1.5 sm:py-0">
          <DashboardFilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="전체"
          />
          <DashboardFilterChip
            active={filter === "unread"}
            onClick={() => setFilter("unread")}
            label="미읽음"
          />
          <DashboardFilterChip
            active={filter === "urgent"}
            onClick={() => setFilter("urgent")}
            label="긴급"
          />
          <DashboardFilterChip
            active={filter === "info"}
            onClick={() => setFilter("info")}
            label="정보"
          />
          <DashboardFilterChip
            active={filter === "success"}
            onClick={() => setFilter("success")}
            label="완료"
          />
        </div>
      </div>

      <div className={cn("overflow-x-auto", dashboardPanelBleedX)}>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              <th className="w-14 pb-3 pr-2 text-center">레벨</th>
              <th className="pb-3 pr-3">시각</th>
              <th className="pb-3 pr-3">분류</th>
              <th className="min-w-0 pb-3 pr-3">내용</th>
              <th className="w-[100px] pb-3 text-right sm:w-[120px]">상태</th>
            </tr>
          </thead>
          <tbody>
            {totalFiltered === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-[var(--color-muted)]">
                  표시할 알림이 없어요.
                </td>
              </tr>
            ) : null}
            {paged.map((n) => (
              <tr
                key={n.id}
                className="border-b border-[var(--color-border)]/60 transition hover:bg-[#fafbfc] last:border-0"
              >
                <td className="py-3 pr-2 text-center align-middle">
                  <NotificationSeverityBadge severity={n.severity} />
                </td>
                <td
                  className={cn(
                    "whitespace-nowrap py-3 pr-3 align-middle",
                    nvLogListMuted,
                  )}
                >
                  {n.t}
                </td>
                <td className="py-3 pr-3 align-middle">
                  <span className="inline-flex rounded-md bg-[#f2f4f6] px-1.5 py-0.5 text-xs font-semibold text-[#4e5968]">
                    {n.category}
                  </span>
                </td>
                <td className={cn("min-w-0 py-3 pr-3 align-middle", nvLogListBody)}>
                  {n.msg}
                </td>
                <td className="py-3 text-right align-middle">
                  <button
                    type="button"
                    onClick={() => toggleRead(n.id)}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-[11px] font-bold transition",
                      n.read
                        ? "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:bg-[#fafbfc]"
                        : "border-[#a78bfa] bg-[#a78bfa] text-white hover:bg-[#8b5cf6]",
                    )}
                  >
                    {n.read ? "읽음" : "읽지 않음"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalFiltered > 0 ? (
        <TablePagination
          page={page}
          pageSize={pageSize}
          total={totalFiltered}
          onPageChange={setPage}
        />
      ) : null}

      <p className="text-center text-xs text-[var(--color-muted)]">
        읽음 상태는 이 브라우저 세션에만 저장돼요. · 총 {seedNotifications.length}건
      </p>
    </section>
  );
}

function NotificationSeverityBadge({ severity }: { severity: NotificationSeverity }) {
  const map = {
    urgent: { variant: "danger" as const, label: "긴급" },
    info: { variant: "violet" as const, label: "정보" },
    success: { variant: "success" as const, label: "완료" },
  };
  const m = map[severity];
  return <StatusBadge variant={m.variant}>{m.label}</StatusBadge>;
}
