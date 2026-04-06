import { Monitor } from "lucide-react";
import { recentSessions } from "@/components/account/account-data";
import { nvSectionDesc, nvSectionTitle, nvSurface } from "@/components/novitas/dashboard-content";
import { cn } from "@/lib/utils";

export function AccountSessionsList() {
  return (
    <div className={cn(nvSurface, "p-5")}>
      <div className="flex items-center gap-2">
        <Monitor className="h-4 w-4 text-[#a78bfa]" />
        <h3 className={nvSectionTitle}>최근 로그인 기록</h3>
      </div>
      <p className={nvSectionDesc}>
        의심되는 기기가 있으면 비밀번호를 바꾸고 세션을 끊어 주세요.
      </p>
      <ul className="mt-4 divide-y divide-[var(--color-border)]">
        {recentSessions.map((s) => (
          <li key={s.device} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0">
            <div>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{s.device}</p>
              <p className="text-xs text-[var(--color-muted)]">
                {s.where} · {s.when}
              </p>
            </div>
            {s.current ? (
              <span className="rounded-full bg-[#f5f3ff] px-2 py-0.5 text-[11px] font-bold text-[#a78bfa]">
                이 기기
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
