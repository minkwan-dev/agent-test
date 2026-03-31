import { Novitas } from "@/components/novitas";
import { agents, protoStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="에이전트 현황"
        description="멀티에이전트 파이프라인의 부하와 프로토콜·최근 활동을 확인해요."
      />
      <Novitas.DashboardContent innerClassName="space-y-8">
          <Novitas.PipelineBaselineHint />
          <div className="grid gap-4 sm:grid-cols-2">
            {agents.map((a) => (
              <article
                key={a.id}
                className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl leading-none">{a.emoji}</span>
                  <Novitas.ProtoChip proto={a.proto} />
                </div>
                <h2 className="mt-3 text-base font-bold text-[#191f28]">{a.name}</h2>
                <p className="mt-1 text-sm text-[#4e5968]">{a.desc}</p>
                <p className="mt-3 text-xs leading-relaxed text-[#8b95a1]">{a.stat}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-bold",
                      a.badgeClass,
                    )}
                  >
                    {a.badge}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      protoStyles[a.proto].label,
                    )}
                  >
                    부하 {a.pct}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5e8eb]">
                  <div
                    className={cn("h-full rounded-full transition-all", a.bar)}
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8b95a1]">
              한 줄 요약
            </p>
            <Novitas.AgentRowsMinimal showLink={false} />
          </div>
      </Novitas.DashboardContent>
    </div>
  );
}
