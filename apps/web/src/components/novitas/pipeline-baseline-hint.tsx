"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatBaselineTime,
  loadAutobuyPipelineState,
  type AutobuyPipelineState,
} from "@/lib/autobuy-pipeline";

export function PipelineBaselineHint() {
  const [state, setState] = useState<AutobuyPipelineState>(() => loadAutobuyPipelineState());

  useEffect(() => {
    const sync = () => setState(loadAutobuyPipelineState());
    sync();
    window.addEventListener("novitas-pipeline-updated", sync);
    return () => window.removeEventListener("novitas-pipeline-updated", sync);
  }, []);

  if (!state.lastBaselineAt) {
    return (
      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/95 px-4 py-3 text-sm leading-relaxed text-amber-950 shadow-sm">
        <span className="font-bold">자동구매 감시 전</span>
        <span className="text-amber-900/90">
          {" "}
          — POS·실사 재고를 반영하면 그 시점부터 에이전트·자동구매 파이프라인이 트리거돼요.{" "}
        </span>
        <Link href="/dashboard/stock/register" className="font-semibold text-amber-900 underline">
          품목 등록
        </Link>
        <span className="text-amber-900/90"> 또는 </span>
        <Link href="/dashboard/stock" className="font-semibold text-amber-900 underline">
          재고 반영
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm leading-relaxed text-emerald-950 shadow-sm">
      마지막 재고 기준:{" "}
      <strong className="tabular-nums">{formatBaselineTime(state.lastBaselineAt)}</strong>
      {state.lastSource === "manual" ? (
        <span className="text-emerald-900/85"> (수동 반영)</span>
      ) : state.lastSource === "register" ? (
        <span className="text-emerald-900/85"> (등록)</span>
      ) : null}
      <span className="text-emerald-900/90"> · 자동구매·감시가 이 기준으로 동작 중이에요.</span>
    </div>
  );
}
