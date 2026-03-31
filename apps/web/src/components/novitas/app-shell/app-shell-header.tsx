import Link from "next/link";
import { Menu } from "lucide-react";
import { Brand } from "@/components/brand";

type AppShellHeaderProps = {
  onMenuClick: () => void;
};

export function AppShellHeader({ onMenuClick }: AppShellHeaderProps) {
  return (
    <header className="z-[110] flex h-14 shrink-0 items-center gap-2 border-b border-[#e5e8eb] bg-white px-3 sm:gap-4 sm:px-5">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 hover:bg-[#f2f4f6] lg:hidden"
        aria-label="메뉴"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link href="/" className="flex shrink-0 items-center">
        <Brand.NovitasLogoLockup size="sm" />
      </Link>

      <div className="min-w-0 flex-1" aria-hidden />

      <div className="hidden flex-wrap items-center justify-end gap-1.5 sm:flex">
        {(["MCP", "A2A", "UCP", "AP2"] as const).map((p) => (
          <span
            key={p}
            className="rounded-md border border-[#e5e8eb] bg-[#f9fafb] px-2 py-0.5 text-[10px] font-bold text-[#4e5968]"
          >
            {p}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/admin"
          className="flex items-center gap-2 rounded-full border border-[#e5e8eb] bg-white py-1 pl-1 pr-2.5 text-[#191f28] shadow-sm transition hover:bg-[#f9fafb] sm:pr-3"
          title="내 계정"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-xs font-bold text-[#2563eb]">
            원
          </span>
          <span className="hidden max-w-[7rem] truncate text-xs font-semibold sm:inline">
            원민관
          </span>
        </Link>
      </div>
    </header>
  );
}
