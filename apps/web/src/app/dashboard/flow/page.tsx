import { ArrowDown, CheckCircle2, GitBranch, Loader2 } from "lucide-react";
import Link from "next/link";
import { Novitas } from "@/components/novitas";
import { flowPipeline } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function FlowPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="플로우 관리"
        description="에이전트 간 실행 순서·지연·최근 이벤트를 확인해요."
      />
      <Novitas.DashboardContent>
          <div className="mb-6 rounded-2xl border border-[#dbeafe] bg-gradient-to-r from-[#eff6ff] to-white p-4 sm:p-5">
            <p className="text-sm font-semibold text-[#191f28]">파이프라인 개요</p>
            <p className="mt-1 text-xs leading-relaxed text-[#4e5968]">
              재고 감지 → 구매 결정 → 발주 실행 → 감사 기록 순으로 신호가 전달돼요.{" "}
              <Link href="/dashboard/agents" className="font-semibold text-[#3182f6] hover:underline">
                에이전트 상세
              </Link>
            </p>
          </div>

          <div className="space-y-0">
            {flowPipeline.map((s, i) => (
              <div key={s.id}>
                <div className="flex gap-3 rounded-xl border border-[#e5e8eb] bg-white p-4 shadow-sm">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      s.status === "ok"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-800",
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#191f28]">{s.title}</p>
                        <p className="mt-0.5 text-xs text-[#8b95a1]">{s.detail}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {s.status === "ok" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            정상
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            처리 중
                          </span>
                        )}
                        <span className="rounded-md bg-[#f2f4f6] px-2 py-0.5 font-mono text-[11px] tabular-nums text-[#4e5968]">
                          p95 ~{s.latencyMs}ms
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#8b95a1]">{s.lastEvent}</p>
                  </div>
                  <GitBranch className="h-4 w-4 shrink-0 text-[#d1d6db]" />
                </div>
                {i < flowPipeline.length - 1 ? (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-5 w-5 text-[#cbd5e1]" aria-hidden />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#8b95a1]">
            지연·큐 깊이는 Nest · FastAPI 메트릭과 함께 표시할 수 있어요.
          </p>
      </Novitas.DashboardContent>
    </div>
  );
}
