"use client";

import { useEffect, useState } from "react";
import {
  DASHBOARD_CONTENT_MAX,
  DASHBOARD_GUTTER_X,
} from "@/components/novitas/dashboard-content";
import { cn } from "@/lib/utils";

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
    <header
      className={cn(
        "sticky top-0 z-20 shrink-0 border-b border-[var(--color-border)]",
        "bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full py-4 sm:py-5",
          DASHBOARD_CONTENT_MAX,
          DASHBOARD_GUTTER_X,
        )}
      >
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-[1.35rem]">
              {title}
            </h1>
            <p className="mt-1 max-w-[52ch] text-xs leading-relaxed text-[var(--color-muted)]">
              {description !== undefined ? description : now}
            </p>
          </div>
          {actions ? (
            <div className="flex min-w-0 w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-nowrap sm:justify-end sm:pb-0.5">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
