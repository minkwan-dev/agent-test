import { Bell } from "lucide-react";
import { notificationPrefs } from "@/components/account/account-data";
import { nvSectionDesc, nvSectionTitle, nvSurface } from "@/components/novitas/dashboard-content";
import { cn } from "@/lib/utils";

export function AccountNotificationPrefs() {
  return (
    <div className={cn(nvSurface, "p-5")}>
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-[#a78bfa]" />
        <h3 className={nvSectionTitle}>알림 수신</h3>
      </div>
      <p className={nvSectionDesc}>저장하면 계정 알림 설정에 반영돼요.</p>
      <ul className="mt-4 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#fafbfc] divide-y divide-[var(--color-border)]">
        {notificationPrefs.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 px-3 py-2.5"
          >
            <span className="text-sm text-[var(--color-foreground)]">{row.label}</span>
            <span
              className={
                row.on
                  ? "text-[11px] font-bold text-[#6d28d9]"
                  : "text-[11px] font-semibold text-[var(--color-muted)]"
              }
            >
              {row.on ? "켜짐" : "꺼짐"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
