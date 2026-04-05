"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";

function BannerInner() {
  const params = useSearchParams();
  const registered = params.get("registered") === "1";
  const [dismissed, setDismissed] = useState(false);

  const onDismiss = useCallback(() => setDismissed(true), []);

  if (!registered || dismissed) return null;

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 shadow-sm @min-[40rem]:flex-row @min-[40rem]:items-center @min-[40rem]:justify-between">
      <div className="flex min-w-0 gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-emerald-950">재고가 등록됐어요</p>
          <p className="mt-0.5 text-xs text-emerald-900/80">
            목록 상단에 반영됐어요. 이어서 품목을 더 추가하거나 대시보드에서 경보를 확인해 보세요.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-nowrap items-center gap-2 @min-[40rem]:justify-end">
        <Link
          href="/dashboard/stock/register"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
        >
          품목 추가 등록
        </Link>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-emerald-800 transition hover:bg-emerald-100/80"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function StockRegisteredBanner() {
  return (
    <Suspense fallback={null}>
      <BannerInner />
    </Suspense>
  );
}
