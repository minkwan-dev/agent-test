import {
  Activity,
  BarChart3,
  Bot,
  Clock,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const kpis = [
  {
    label: "오늘 자동구매",
    value: "₩84,720",
    sub: "어제 대비 +12.4%",
    icon: BarChart3,
    accent: "bg-[#eff6ff] text-[#3182f6]",
  },
  {
    label: "발주",
    value: "34건",
    sub: "대기 2",
    icon: ShoppingCart,
    accent: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "재고 경보",
    value: "7",
    unit: "개",
    sub: "긴급 3 · 주의 4",
    icon: Activity,
    accent: "bg-rose-50 text-rose-600",
  },
  {
    label: "가동률",
    value: "100",
    unit: "%",
    sub: "오류 0건",
    icon: LayoutDashboard,
    accent: "bg-emerald-50 text-emerald-700",
  },
] as const;

const agents = [
  { short: "재", name: "재고", tone: "bg-blue-500" },
  { short: "안", name: "발주안", tone: "bg-indigo-500" },
  { short: "실", name: "실행", tone: "bg-amber-500" },
  { short: "기", name: "기록", tone: "bg-emerald-500" },
];

export function PreviewDashboardPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e8ecf0] bg-white shadow-[0_12px_48px_rgba(15,23,42,0.1)]">
      <div className="relative border-b border-[#dbeafe]/60 bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fafc] px-5 py-6 sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute -right-16 -top-12 h-40 w-40 rounded-full bg-[#3182f6]/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-400/40" />
              오늘 흐름 정상
            </div>
            <p className="mt-3 text-[15px] font-bold text-[#191f28] sm:text-base">오늘 누적 자동구매</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-[#8b95a1]">
              <Clock className="h-3.5 w-3.5" />
              다음 재고 확인 약 12분 후
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b95a1]">합계</p>
            <p className="text-2xl font-bold tabular-nums tracking-tight text-[#191f28] sm:text-3xl">
              ₩84,720
            </p>
            <div className="mt-2 flex justify-start gap-0.5 sm:justify-end">
              {[35, 52, 44, 68, 55, 72, 48, 80].map((h, i) => (
                <span
                  key={i}
                  className="inline-block w-1.5 rounded-sm bg-gradient-to-t from-[#3182f6] to-[#93c5fd]"
                  style={{ height: `${Math.max(10, h * 0.35)}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-4">
        {kpis.map((m) => (
          <div
            key={m.label}
            className="min-w-0 rounded-2xl border border-[#f0f2f4] bg-[#fafbfc] p-4 transition hover:border-[#e5e8eb] hover:bg-white"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-medium text-[#8b95a1] sm:text-xs">{m.label}</p>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${m.accent}`}
              >
                <m.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 break-words text-lg font-bold tabular-nums text-[#191f28] sm:text-xl">
              {"unit" in m ? (
                <>
                  {m.value}
                  <span className="text-sm font-semibold text-[#8b95a1]">{m.unit}</span>
                </>
              ) : (
                m.value
              )}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[#8b95a1] sm:text-xs">
              {m.label === "오늘 자동구매" ? (
                <>
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {m.sub}
                </>
              ) : (
                m.sub
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-[#f2f4f6] bg-[#fafbfc] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#3182f6]" />
            <span className="text-xs font-bold text-[#191f28]">자동 업무</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              4단계 동작 중
            </span>
          </div>
          <div className="flex items-center gap-2">
            {agents.map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-2 rounded-xl border border-[#e8ecf0] bg-white px-2.5 py-1.5 shadow-sm"
                title={a.name}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold text-white ${a.tone}`}>
                  {a.short}
                </span>
                <span className="hidden text-[11px] font-medium text-[#4e5968] sm:inline">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-[#f2f4f6] bg-white px-4 py-4 sm:grid-cols-3 sm:px-6 sm:py-5">
        {[
          { t: "재고 경보", s: "7건 · 긴급 우선", icon: Activity },
          { t: "최근 자동구매", s: "34건 처리됐어요", icon: ShoppingCart },
          { t: "요약·진행", s: "하루 정리·처리 기록", icon: Sparkles },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-start gap-3 rounded-xl border border-[#f0f2f4] bg-gradient-to-b from-[#fafbfc] to-white p-3.5 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3182f6]">
              <row.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#191f28]">{row.t}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#8b95a1]">{row.s}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#f2f4f6] bg-[#f9fafb] px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#8b95a1] sm:text-xs">
          <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-[#4e5968] shadow-sm ring-1 ring-[#e8ecf0]">
            재고 살피기
          </span>
          <span className="text-[#d1d6db]">→</span>
          <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-[#4e5968] shadow-sm ring-1 ring-[#e8ecf0]">
            발주안
          </span>
          <span className="text-[#d1d6db]">→</span>
          <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-[#4e5968] shadow-sm ring-1 ring-[#e8ecf0]">
            주문 실행
          </span>
          <span className="text-[#d1d6db]">→</span>
          <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-[#4e5968] shadow-sm ring-1 ring-[#e8ecf0]">
            기록·알림
          </span>
        </div>
        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-[#8b95a1] sm:text-xs">
          로그인하면 알림과 처리 내역을 같은 화면에서 이어서 볼 수 있어요.
        </p>
      </div>
    </div>
  );
}
