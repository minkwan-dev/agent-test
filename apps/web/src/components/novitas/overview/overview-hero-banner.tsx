import { Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatBaselineTime, type AutobuyPipelineState } from "@/lib/autobuy-pipeline";

export function OverviewHeroBanner({ pipeline }: { pipeline: AutobuyPipelineState }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#dbeafe]/80 bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fafc] p-5 shadow-[0_8px_30px_rgba(49,130,246,0.08)] sm:p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#3182f6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-[#93c5fd]/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          {pipeline.lastBaselineAt ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
              파이프라인 가동 · 재고 기준 확정
            </div>
          ) : (
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-200/90 bg-amber-50/95 px-3 py-1 text-xs font-semibold text-amber-900 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
              재고 기준 대기 — 반영 후 자동구매 트리거
            </div>
          )}
          <p className="mt-4 text-lg font-bold leading-snug text-[#191f28] sm:text-xl">
            오늘 누적 자동구매
          </p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#4e5968]">
            {pipeline.lastBaselineAt ? (
              <>
                마지막 재고 반영{" "}
                <span className="font-semibold text-[#191f28]">
                  {formatBaselineTime(pipeline.lastBaselineAt)}
                </span>
                을 기준으로 감시 → 결정 → 발주 → 감사 흐름이 돌아가요. 자동 차감이 없을 때는 수동
                반영으로 최신 수량을 맞춰 주세요.
              </>
            ) : (
              <>
                자동 재고 차감이 없을 때는 실사·POS 기준으로 재고를 반영해야 해요. 반영이
                확정되면 그 시점부터 에이전트 자동구매가 트리거돼요.
              </>
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {!pipeline.lastBaselineAt ? (
              <>
                <Link
                  href="/dashboard/stock/register"
                  className="inline-flex items-center rounded-lg bg-[#3182f6] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#256dd4]"
                >
                  품목 등록
                </Link>
                <Link
                  href="/dashboard/stock"
                  className="inline-flex items-center rounded-lg border border-[#e5e8eb] bg-white px-3 py-1.5 text-xs font-bold text-[#4e5968] hover:bg-[#f9fafb]"
                >
                  재고 반영
                </Link>
              </>
            ) : null}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#8b95a1]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              다음 재고 스캔 약 12분 후
            </span>
            <span className="hidden h-3 w-px bg-[#e5e8eb] sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              어제 대비 +12.4%
            </span>
          </div>
        </div>
        <div className="relative shrink-0 lg:pl-8">
          <p className="text-right text-xs font-medium uppercase tracking-wider text-[#8b95a1]">
            금일 합계
          </p>
          <p className="text-right text-3xl font-bold tabular-nums tracking-tight text-[#191f28] sm:text-4xl">
            ₩84,720
          </p>
          <div className="mt-3 flex justify-end gap-1">
            {[40, 55, 48, 72, 64, 80, 58, 90].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-sm bg-gradient-to-t from-[#3182f6] to-[#93c5fd] opacity-80"
                style={{ height: `${Math.max(12, h * 0.45)}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
