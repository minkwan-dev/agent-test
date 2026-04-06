"use client";

import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { Novitas } from "@/components/novitas";
import { notifications as seedNotifications } from "@/lib/mock-data";

export default function NotifyPage() {
  const [items, setItems] = useState(() =>
    seedNotifications.map((n) => ({ ...n, read: false as boolean })),
  );

  const unreadCount = useMemo(
    () => items.filter((n) => !n.read).length,
    [items],
  );

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="알림"
        description={`재고·발주·자동 처리 알림이에요. 읽지 않음 ${unreadCount}건`}
        actions={
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[#4e5968] shadow-sm transition hover:bg-[#fafbfc] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Bell className="h-4 w-4 text-[#a78bfa]" />
            모두 읽음
          </button>
        }
      />
      <Novitas.DashboardContent>
        <Novitas.NotificationsTableBlock items={items} onItemsChange={setItems} pageSize={20} />
      </Novitas.DashboardContent>
    </div>
  );
}
