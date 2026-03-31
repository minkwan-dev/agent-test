"use client";

import Link from "next/link";
import { topLinks } from "@/components/novitas/app-shell/nav-config";
import { cn } from "@/lib/utils";

export function DashboardTopNav({ pathname }: { pathname: string }) {
  return (
    <div className="shrink-0 border-b border-[#e5e8eb] bg-white">
      <nav
        className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-2 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="상단 이동"
      >
        {topLinks.map((link) => {
          const active =
            link.id === "home"
              ? pathname === "/"
              : pathname.startsWith("/dashboard");
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-[#f2f4f6] text-[#191f28]"
                  : "text-[#8b95a1] hover:bg-[#f9fafb] hover:text-[#191f28]",
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
