"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DEFAULT_AUTOBUY_PIPELINE_STATE,
  formatBaselineTime,
  loadAutobuyPipelineState,
  type AutobuyPipelineState,
} from "@/lib/autobuy-pipeline";

export function PipelineBaselineHint() {
  const [state, setState] = useState<AutobuyPipelineState>(DEFAULT_AUTOBUY_PIPELINE_STATE);

  useEffect(() => {
    const sync = () => setState(loadAutobuyPipelineState());
    sync();
    window.addEventListener("novitas-pipeline-updated", sync);
    return () => window.removeEventListener("novitas-pipeline-updated", sync);
  }, []);

  if (!state.lastBaselineAt) {
    return (
      <div className="mb-4 rounded-xl border border-[#fcd9a8] bg-[#fff8f0] px-4 py-3 text-sm leading-relaxed text-[#8b5a1a] shadow-sm">
        <span className="font-bold">자동 발주를 켜기 전</span>
        <span className="text-[#9a5a12]/95">
          에는 실제 수량을 여기에 맞춰 두면 그때부터 발주·결제 흐름이 돌아가요. 판매할 때마다 숫자가
          줄어드는 연동은 아직 없으니 직접 반영하는 식이에요.{" "}
        </span>
        <Link href="/dashboard/stock/register" className="font-semibold text-[#8b4513] underline">
          품목 등록
        </Link>
        <span className="text-[#9a5a12]/90"> 또는 </span>
        <Link href="/dashboard/stock" className="font-semibold text-[#8b4513] underline">
          재고 반영
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-[#ede9fe] bg-[#f8fafc] px-4 py-3 text-sm leading-relaxed text-[#1e293b] shadow-sm">
      마지막 재고 기준:{" "}
      <strong className="tabular-nums">{formatBaselineTime(state.lastBaselineAt)}</strong>
      {state.lastSource === "manual" ? (
        <span className="text-[#6d28d9]/90"> (수동 반영)</span>
      ) : state.lastSource === "register" ? (
        <span className="text-[#6d28d9]/90"> (등록)</span>
      ) : null}
      <span className="text-[#6d28d9]/92"> · 자동 발주·알림이 이 기준으로 맞춰져 있어요.</span>
    </div>
  );
}
