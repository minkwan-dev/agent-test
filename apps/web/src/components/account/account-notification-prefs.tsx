import { Bell } from "lucide-react";
import { notificationPrefs } from "@/components/account/account-data";

export function AccountNotificationPrefs() {
  return (
    <div className="rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-[#6eb89a]" />
        <h3 className="text-sm font-bold text-[#191f28]">알림 수신</h3>
      </div>
      <p className="mt-1 text-xs text-[#8b95a1]">저장하면 계정 알림 설정에 반영돼요.</p>
      <ul className="mt-4 space-y-3">
        {notificationPrefs.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e8eb] bg-[#fafbfc] px-3 py-2.5"
          >
            <span className="text-sm text-[#191f28]">{row.label}</span>
            <span
              className={
                row.on
                  ? "text-[11px] font-bold text-[#3d6b57]"
                  : "text-[11px] font-semibold text-[#8b95a1]"
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
