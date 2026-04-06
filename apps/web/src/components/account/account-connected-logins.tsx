import { User } from "lucide-react";
import { connectedAccounts } from "@/components/account/account-data";
import { nvSectionDesc, nvSectionTitle, nvSurface } from "@/components/novitas/dashboard-content";
import { cn } from "@/lib/utils";

export function AccountConnectedLogins() {
  return (
    <div className={cn(nvSurface, "p-5")}>
      <h3 className={nvSectionTitle}>연결된 로그인</h3>
      <p className={nvSectionDesc}>
        소셜 계정을 연결하면 프로필 사진·이메일이 동기화돼요.
      </p>
      <ul className="mt-4 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#fafbfc] divide-y divide-[var(--color-border)]">
        {connectedAccounts.map((acc) => (
          <li
            key={acc.id}
            className="flex flex-wrap items-center justify-between gap-2 px-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-2">
              <User className="h-4 w-4 shrink-0 text-[var(--color-muted)]" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{acc.label}</p>
                <p className="text-[11px] text-[var(--color-muted)]">{acc.hint}</p>
              </div>
            </div>
            <span
              className={
                acc.status === "connected"
                  ? "rounded-full bg-[#f8fafc] px-2 py-0.5 text-[11px] font-bold text-[#1e293b]"
                  : "rounded-full bg-[#f2f4f6] px-2 py-0.5 text-[11px] font-semibold text-[#4e5968]"
              }
            >
              {acc.status === "connected" ? "연결됨" : "연결 가능"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
