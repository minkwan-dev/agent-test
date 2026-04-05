"use client";

import { useEffect, useState } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  const [now, setNow] = useState("");

  useEffect(() => {
    if (description !== undefined) return;
    const tick = () => {
      const d = new Date();
      setNow(
        `${d.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        })} · ${d.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [description]);

  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-[#e5e8eb] bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-3.5 @min-[40rem]:px-5 @min-[64rem]:px-6">
        <div className="flex min-w-0 flex-col gap-3 @min-[40rem]:flex-row @min-[40rem]:items-center @min-[40rem]:justify-between @min-[40rem]:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold leading-snug tracking-tight text-[#191f28] @min-[40rem]:text-xl">
              {title}
            </h1>
            <p className="mt-1 break-words text-xs leading-snug text-[#8b95a1] @min-[40rem]:text-sm">
              {description !== undefined ? description : now}
            </p>
          </div>
          {actions ? (
            <div className="flex min-w-0 w-full shrink-0 flex-col gap-2 @min-[40rem]:w-auto @min-[40rem]:flex-row @min-[40rem]:flex-nowrap @min-[40rem]:justify-end">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
