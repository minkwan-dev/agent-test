"use client";

import { Activity, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProtoChip, StatusBadge } from "@/components/novitas/badge";
import { ReflectInventoryDialog } from "@/components/novitas/reflect-inventory-dialog";
import { TablePagination } from "@/components/novitas/table-pagination";
import { type InventoryAlertRow, inventoryAlerts, orders } from "@/lib/mock-data";
import { isUserInventoryRowId, loadUserInventory } from "@/lib/user-inventory";
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

  useEffect(() => {
    const sync = () => setUserRows(loadUserInventory());
    sync();
    window.addEventListener("novitas-inventory-updated", sync);
    return () => window.removeEventListener("novitas-inventory-updated", sync);
  }, []);

  const baseRows = useMemo(() => [...userRows, ...inventoryAlerts], [userRows]);

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
    <section className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <ReflectInventoryDialog
        row={reflectRow}
        open={reflectRow !== null}
        onClose={() => setReflectRow(null)}
      />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#191f28]">
          <Activity className="h-4 w-4 text-[#3182f6]" />
          {title}
        </h2>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:max-w-xs">
          <div className="relative min-w-0 flex-1 sm:max-w-[200px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a1]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="품목 검색"
              className="w-full rounded-lg border border-[#e5e8eb] py-1.5 pl-8 pr-2 text-xs text-[#191f28] placeholder:text-[#8b95a1] outline-none focus:border-[#3182f6]"
            />
          </div>
          {showAutoBuy ? (
            <button
              type="button"
              className="shrink-0 rounded-lg bg-[#3182f6] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#256dd4]"
            >
              자동구매
            </button>
          ) : null}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e8eb] text-[11px] font-bold uppercase tracking-wide text-[#8b95a1]">
              <th className="pb-2 pr-2">품목</th>
              <th className="pb-2 pr-2">재고</th>
              <th className="pb-2 pr-2">상태</th>
              <th className="pb-2 w-[100px] text-right sm:w-[120px]">반영</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-[#8b95a1]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {(paginate ? pagedRows : rows).map((row) => {
              const pct = Math.round((row.cur / row.max) * 100);
              const bar =
                row.level === "urgent" ? "bg-rose-500" : "bg-amber-500";
              return (
                <tr
                  key={row.id}
                  className="border-b border-[#f2f4f6] last:border-0"
                >
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f4f6] text-base">
                        {row.icon}
                      </span>
                      <span className="font-medium text-[#191f28]">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-2 whitespace-nowrap">
                    <span className="text-[#4e5968]">
                      {row.cur} / {row.max}
                    </span>
                    <span className="ml-2 inline-block h-1 w-14 overflow-hidden rounded-full bg-[#e5e8eb] align-middle">
                      <span
                        className={cn("block h-full rounded-full", bar)}
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                  </td>
                  <td className="py-2.5 pr-2">
                    {row.level === "urgent" ? (
                      <StatusBadge variant="danger">긴급</StatusBadge>
                    ) : (
                      <StatusBadge variant="warning">주의</StatusBadge>
                    )}
                  </td>
                  <td className="py-2.5 text-right align-middle">
                    {isUserInventoryRowId(row.id) ? (
                      <button
                        type="button"
                        onClick={() => setReflectRow(row)}
                        className="rounded-lg border border-[#dbeafe] bg-[#eff6ff] px-2.5 py-1 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#dbeafe]"
                      >
                        재고 반영
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#8b95a1]">기본</span>
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
        o.proto.toLowerCase().includes(s),
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
    <section className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#191f28]">
          <ShoppingCart className="h-4 w-4 text-[#3182f6]" />
          최근 자동구매 내역
        </h2>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <div className="relative min-w-0 flex-1 sm:max-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a1]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="품목·공급사·프로토콜"
              className="w-full rounded-lg border border-[#e5e8eb] py-1.5 pl-8 pr-2 text-xs text-[#191f28] placeholder:text-[#8b95a1] outline-none focus:border-[#3182f6]"
            />
          </div>
          <button
            type="button"
            className="rounded-lg border border-[#e5e8eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] hover:bg-[#f9fafb]"
          >
            필터
          </button>
          {showOrdersPageLink ? (
            <Link
              href="/dashboard/orders"
              className="rounded-lg border border-[#e5e8eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] hover:bg-[#f9fafb]"
            >
              전체 보기
            </Link>
          ) : null}
        </div>
      </div>
      <div className="-mx-5 overflow-x-auto px-5">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e8eb] text-[11px] font-bold uppercase tracking-wide text-[#8b95a1]">
              <th className="pb-3 pr-3">품목</th>
              <th className="pb-3 pr-3">수량</th>
              <th className="pb-3 pr-3">금액</th>
              <th className="pb-3 pr-3">프로토콜</th>
              <th className="pb-3 pr-3">공급업체</th>
              <th className="pb-3 pr-3 hidden sm:table-cell">결정 에이전트</th>
              <th className="pb-3 pr-3">상태</th>
              <th className="pb-3">시각</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-sm text-[#8b95a1]">
                  검색 결과가 없어요.
                </td>
              </tr>
            ) : null}
            {(paginate ? pagedOrders : filtered).map((o) => (
              <tr
                key={o.id}
                className="border-b border-[#f2f4f6] transition hover:bg-[#f9fafb] last:border-0"
              >
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f4f6]">
                      {o.icon}
                    </span>
                    <span className="font-medium text-[#191f28]">{o.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-3 text-[#4e5968]">{o.qty}</td>
                <td className="py-3 pr-3 font-bold text-[#191f28]">{o.price}</td>
                <td className="py-3 pr-3">
                  <ProtoChip proto={o.proto} />
                </td>
                <td className="py-3 pr-3 text-[#191f28]">{o.supplier}</td>
                <td className="py-3 pr-3 hidden text-xs text-[#8b95a1] sm:table-cell">
                  {o.agent}
                </td>
                <td className="py-3 pr-3">
                  {o.state === "done" ? (
                    <StatusBadge variant="success">완료</StatusBadge>
                  ) : (
                    <StatusBadge variant="warning">대기</StatusBadge>
                  )}
                </td>
                <td className="py-3 text-xs text-[#8b95a1]">{o.time}</td>
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
