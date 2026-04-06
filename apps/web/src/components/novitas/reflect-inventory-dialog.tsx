"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { patchInventoryItem } from "@/lib/inventory-api";
import type { InventoryAlertRow } from "@/lib/mock-data";
import { updateUserInventoryRow } from "@/lib/user-inventory";
import { cn } from "@/lib/utils";

export function ReflectInventoryDialog({
  row,
  open,
  onClose,
}: {
  row: InventoryAlertRow | null;
  open: boolean;
  onClose: () => void;
}) {
  const [cur, setCur] = useState("");
  const [max, setMax] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const token = useAtomValue(accessTokenAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!row || !open) return;
    setCur(String(row.cur));
    setMax(String(row.max));
    setErr(null);
    setSaving(false);
  }, [row, open]);

  const save = useCallback(() => {
    if (!row || saving) return;
    const curN = Number(cur);
    const maxN = Number(max);
    if (!Number.isFinite(curN) || !Number.isFinite(maxN) || curN < 0 || maxN < 1) {
      setErr("현재고는 0 이상, 안전재고는 1 이상으로 입력해 주세요.");
      return;
    }
    void (async () => {
      setSaving(true);
      setErr(null);
      try {
        if (row.id.startsWith("user-")) {
          updateUserInventoryRow(row.id, {
            cur: Math.floor(curN),
            max: Math.floor(maxN),
          });
        } else {
          if (!token) {
            setErr("로그인이 필요해요.");
            setSaving(false);
            return;
          }
          await patchInventoryItem(token, row.id, {
            current_qty: Math.floor(curN),
            safety_stock_max: Math.floor(maxN),
          });
          await queryClient.invalidateQueries({ queryKey: ["inventory", "items"] });
        }
        onClose();
      } catch {
        setErr("저장에 실패했어요. 다시 시도해 주세요.");
      } finally {
        setSaving(false);
      }
    })();
  }, [row, cur, max, onClose, saving, token, queryClient]);

  if (!open || !row) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="reflect-title"
        className="relative z-[201] w-full max-w-md rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="reflect-title" className="text-base font-bold text-[#191f28]">
              재고 반영
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#8b95a1]">
              실제 매장 수량에 맞게 고친 뒤 저장하면, 그때부터 자동 발주·알림이 이 숫자를 기준으로
              움직여요. (판매할 때마다 자동으로 빠지는 연동은 없다고 생각하시면 돼요.)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5e8eb] text-[#4e5968] hover:bg-[#f9fafb]"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#f2f4f6] bg-[#fafbfc] px-3 py-2.5">
          <span className="text-lg">{row.icon}</span>
          <span className="min-w-0 truncate text-sm font-medium text-[#191f28]">{row.name}</span>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-bold text-[#191f28]">현재고</span>
            <input
              type="number"
              min={0}
              value={cur}
              onChange={(e) => setCur(e.target.value)}
              className={cn(
                "mt-1.5 w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-sm text-[#191f28] outline-none focus:border-[#6eb89a] focus:ring-2 focus:ring-[#6eb89a]/20",
              )}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-[#191f28]">안전재고 (상한)</span>
            <input
              type="number"
              min={1}
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className={cn(
                "mt-1.5 w-full rounded-lg border border-[#e5e8eb] px-3 py-2 text-sm text-[#191f28] outline-none focus:border-[#6eb89a] focus:ring-2 focus:ring-[#6eb89a]/20",
              )}
            />
          </label>
        </div>

        {err ? <p className="mt-3 text-xs font-medium text-rose-600">{err}</p> : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#e5e8eb] bg-white px-4 py-2.5 text-sm font-bold text-[#4e5968] hover:bg-[#f9fafb]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-[#6eb89a] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#5aa688] disabled:opacity-50"
          >
            {saving ? "저장 중…" : "반영하고 자동 발주 기준 맞추기"}
          </button>
        </div>
      </div>
    </div>
  );
}
