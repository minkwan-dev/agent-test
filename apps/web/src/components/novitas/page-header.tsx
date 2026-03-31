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
    <header className="shrink-0 border-b border-[#e5e8eb] bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold leading-snug tracking-tight text-[#191f28] sm:text-xl">
              {title}
            </h1>
            <p className="mt-1 break-words text-xs leading-snug text-[#8b95a1] sm:text-sm">
              {description !== undefined ? description : now}
            </p>
          </div>
          {actions ? (
            <div className="flex min-w-0 w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
