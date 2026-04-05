"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { navMain, navSystem } from "@/components/novitas/app-shell/nav-config";
import { NavLink } from "@/components/novitas/app-shell/nav-link";
import { NavSection } from "@/components/novitas/app-shell/nav-section";

type AppShellSidebarProps = {
  pathname: string;
  open: boolean;
  onNavigate: () => void;
};

export function AppShellSidebar({ pathname, open, onNavigate }: AppShellSidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[105] bg-black/25 lg:hidden"
          aria-label="사이드바 닫기"
          onClick={onNavigate}
        />
      )}

      <aside
        className={cn(
          "fixed bottom-0 left-0 top-14 z-[106] flex w-[220px] flex-col border-r border-[#e5e8eb] bg-white transition-transform duration-300 lg:static lg:top-auto lg:z-auto lg:min-h-0 lg:w-[220px] lg:translate-x-0 lg:self-stretch",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="scrollbar-thin flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <NavSection label="대시보드">
            {navMain.map((item) => (
              <NavLink
                key={item.id}
                href={item.href}
                active={
                  pathname === item.href ||
                  (item.href === "/dashboard/stock" && pathname.startsWith("/dashboard/stock"))
                }
                onNavigate={onNavigate}
                icon={<item.icon className="h-4 w-4" />}
              >
                {item.label}
              </NavLink>
            ))}
          </NavSection>
          <NavSection label="시스템">
            {navSystem.map((item) => (
              <NavLink
                key={item.id}
                href={item.href}
                active={pathname === item.href}
                onNavigate={onNavigate}
                icon={<item.icon className="h-4 w-4" />}
                badge={"badge" in item ? item.badge : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </NavSection>
          <div className="mt-auto border-t border-[#e5e8eb] pt-3">
            <NavLink
              href="/dashboard/admin"
              active={pathname === "/dashboard/admin"}
              onNavigate={onNavigate}
              icon={<User className="h-4 w-4" />}
            >
              내 계정
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
