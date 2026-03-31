"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard]", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="max-w-md rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-lg font-bold text-[#191f28]">화면을 불러오지 못했어요</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#4e5968]">
          일시적인 오류일 수 있어요. 다시 시도하거나 페이지를 새로고침해 주세요.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[10px] text-[#8b95a1]">ref: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#3182f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#256dd4]"
        >
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </button>
      </div>
    </div>
  );
}
