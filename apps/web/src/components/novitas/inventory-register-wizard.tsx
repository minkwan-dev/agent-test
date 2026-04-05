"use client";

import { ArrowLeft, ArrowRight, Check, ClipboardList, Package, Scale } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { deriveStockLevel, appendUserInventory } from "@/lib/user-inventory";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "품목", subtitle: "이름과 표시 아이콘", icon: Package },
  { id: 2, title: "수량", subtitle: "현재고·안전재고", icon: Scale },
  { id: 3, title: "확인", subtitle: "요약 후 등록", icon: ClipboardList },
] as const;

const ICON_CHOICES = [
  "📦",
  "🥛",
  "🍞",
  "🥬",
  "🍚",
  "🧈",
  "☕",
  "🍫",
  "🥩",
  "🧊",
  "🍜",
  "🧀",
] as const;

function StepRail({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => {
          const done = step > s.id;
          const active = step === s.id;
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className={cn(
                "flex gap-3 rounded-2xl border p-4 transition",
                active && "border-[#6eb89a] bg-[#e8f5ee] shadow-[0_0_0_3px_rgba(110,184,154,0.12)]",
                done && !active && "border-[#c8e4d6] bg-[#f2faf6]/95",
                !active && !done && "border-[#e8ecf0] bg-white",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition",
                  done && "border-[#c8e4d6] bg-white text-[#3d6b57]",
                  active && !done && "border-[#6eb89a] bg-white text-[#6eb89a]",
                  !active && !done && "border-[#e5e8eb] bg-[#fafbfc] text-[#8b95a1]",
                )}
              >
                {done ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <Icon className="h-4 w-4" />}
              </div>
              <div className="min-w-0">
                <p className={cn("text-sm font-bold", active ? "text-[#191f28]" : "text-[#4e5968]")}>
                  {String(s.id).padStart(2, "0")} {s.title}
                </p>
                <p className="text-xs text-[#8b95a1]">{s.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e8eb]">
        <div
          className="h-full rounded-full bg-[#6eb89a] transition-[width] duration-300 ease-out"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function InventoryRegisterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [icon, setIcon] = useState<string>(ICON_CHOICES[0] ?? "📦");
  const [cur, setCur] = useState("");
  const [max, setMax] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const curN = Number(cur);
  const maxN = Number(max);
  const step1Ok = name.trim().length >= 1;
  const step2Ok =
    Number.isFinite(curN) &&
    Number.isFinite(maxN) &&
    curN >= 0 &&
    maxN >= 1 &&
    curN <= 999999 &&
    maxN <= 999999;

  const summaryLevel = useMemo(() => {
    if (!step2Ok) return "warn" as const;
    return deriveStockLevel(Math.floor(curN), Math.floor(maxN));
  }, [step2Ok, curN, maxN]);

  const goNext = useCallback(() => {
    if (step === 1 && !step1Ok) return;
    if (step === 2 && !step2Ok) return;
    setStep((s) => Math.min(s + 1, 3));
  }, [step, step1Ok, step2Ok]);

  const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  const onSubmit = useCallback(() => {
    if (!step1Ok || !step2Ok) return;
    setSubmitting(true);
    const id = `user-${Date.now()}`;
    const row = {
      id,
      icon,
      name: name.trim() + (sku.trim() ? ` · ${sku.trim()}` : ""),
      cur: Math.floor(curN),
      max: Math.floor(maxN),
      level: deriveStockLevel(Math.floor(curN), Math.floor(maxN)),
    };
    appendUserInventory(row);
    router.push("/dashboard/stock?registered=1");
  }, [step1Ok, step2Ok, icon, name, sku, curN, maxN, router]);

  const inputClass =
    "w-full rounded-lg border border-[#e5e8eb] px-3 py-2.5 text-sm text-[#191f28] placeholder:text-[#8b95a1] outline-none transition focus:border-[#6eb89a] focus:ring-2 focus:ring-[#6eb89a]/20";

  return (
    <div className="mx-auto max-w-3xl">
      <StepRail step={step} />

      <div className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="inv-name" className="text-sm font-bold text-[#191f28]">
                품목명 <span className="text-[#e0859a]">*</span>
              </label>
              <p className="mt-1 text-xs text-[#8b95a1]">
                매장에서 쓰는 표기와 같게 적으면 검색·알림에 반영되기 쉬워요.
              </p>
              <input
                id="inv-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 서울우유 흰우유 900ml"
                className={cn(inputClass, "mt-3")}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="inv-sku" className="text-sm font-bold text-[#191f28]">
                SKU / 바코드 <span className="text-xs font-normal text-[#8b95a1]">(선택)</span>
              </label>
              <input
                id="inv-sku"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="내부 코드가 있으면 입력"
                className={cn(inputClass, "mt-3")}
                autoComplete="off"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[#191f28]">표시 아이콘</p>
              <p className="mt-1 text-xs text-[#8b95a1]">목록에서 품목을 빠르게 구분할 때 쓰여요.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ICON_CHOICES.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setIcon(em)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border text-xl transition",
                      icon === em
                        ? "border-[#6eb89a] bg-[#e8f5ee] shadow-[0_0_0_3px_rgba(110,184,154,0.12)]"
                        : "border-[#e5e8eb] bg-[#fafbfc] hover:border-[#cbd5e1]",
                    )}
                    aria-pressed={icon === em}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <p className="text-sm text-[#4e5968]">
              안전재고(상한)는 InventoryWatcher가 이 수준 이하로 떨어지면 경보를 올리는 기준이에요.
            </p>
            <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-[#fafbfc] px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-[#191f28]">현재고</span>
              <input
                type="number"
                min={0}
                value={cur}
                onChange={(e) => setCur(e.target.value)}
                className={cn(inputClass, "sm:max-w-[140px] sm:text-right")}
              />
            </label>
            <label className="flex flex-col gap-2 rounded-xl border border-[#e5e8eb] bg-[#fafbfc] px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-[#191f28]">안전재고 (상한)</span>
              <input
                type="number"
                min={1}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className={cn(inputClass, "sm:max-w-[140px] sm:text-right")}
              />
            </label>
            {step2Ok ? (
              <div
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
                  summaryLevel === "urgent"
                    ? "border-[#f5c4d0] bg-[#fff5f7] text-[#8b3a4a]"
                    : "border-[#fcd9a8] bg-[#fff8f0] text-[#8b5a1a]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2",
                    summaryLevel === "urgent"
                      ? "bg-[#f5a0b8] ring-[#f5a0b8]/30"
                      : "bg-[#f0b885] ring-[#f0b885]/30",
                  )}
                  title={summaryLevel === "urgent" ? "긴급 구간" : "주의 구간"}
                  role="img"
                  aria-label={summaryLevel === "urgent" ? "긴급 구간" : "주의 구간"}
                />
                <span className="text-[#4e5968]">
                  현재고가 안전재고 대비 {Math.round((curN / maxN) * 100)}%예요. (35% 미만이면 긴급으로
                  분류)
                </span>
              </div>
            ) : (
              <p className="text-xs text-[#8b95a1]">현재고는 0 이상, 안전재고는 1 이상으로 입력해 주세요.</p>
            )}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#e5e8eb] bg-[#fafbfc] p-4">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8b95a1]">품목</dt>
                  <dd className="text-right font-medium text-[#191f28]">
                    <span className="mr-2 text-lg">{icon}</span>
                    {name.trim()}
                    {sku.trim() ? (
                      <span className="block text-xs font-normal text-[#8b95a1]">{sku.trim()}</span>
                    ) : null}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#e8ecf0] pt-3">
                  <dt className="text-[#8b95a1]">현재고 / 안전재고</dt>
                  <dd className="font-mono text-[#191f28]">
                    {step2Ok ? `${Math.floor(curN)} / ${Math.floor(maxN)}` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8b95a1]">초기 상태</dt>
                  <dd className="flex justify-end">
                    {step2Ok ? (
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full ring-2",
                          summaryLevel === "urgent"
                            ? "bg-[#f5a0b8] ring-[#f5a0b8]/30"
                            : "bg-[#f0b885] ring-[#f0b885]/30",
                        )}
                        title={summaryLevel === "urgent" ? "긴급" : "주의"}
                        role="img"
                        aria-label={summaryLevel === "urgent" ? "긴급" : "주의"}
                      />
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="text-xs leading-relaxed text-[#8b95a1]">
              등록 후에는 재고 현황 목록 상단에 표시되며, 브라우저에 저장돼요. 재고 기준이 확정되면 그
              시점부터 자동 발주·알림이 맞춰져요. 나중에 서버에 옮기면 같은 정보를 계정에 맞춰 둘 수 있어요.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e8ecf0] pt-6 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e5e8eb] bg-white px-4 py-2.5 text-sm font-bold text-[#4e5968] transition hover:bg-[#f9fafb]"
              >
                <ArrowLeft className="h-4 w-4" />
                이전
              </button>
            ) : (
              <Link
                href="/dashboard/stock"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e5e8eb] bg-white px-4 py-2.5 text-sm font-bold text-[#4e5968] transition hover:bg-[#f9fafb]"
              >
                취소
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={(step === 1 && !step1Ok) || (step === 2 && !step2Ok)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#6eb89a] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#5aa688] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                다음
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!step1Ok || !step2Ok || submitting}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#6eb89a] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#5aa688] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {submitting ? "등록 중…" : "등록하기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
