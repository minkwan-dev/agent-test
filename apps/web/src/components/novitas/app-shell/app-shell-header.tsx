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
        <Brand.SemosoLogoLockup size="sm" />
      </Link>

      <div className="min-w-0 flex-1" aria-hidden />

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/admin"
          className="flex items-center rounded-full border border-[#e5e8eb] bg-white p-0.5 text-[#191f28] shadow-sm transition hover:bg-[#f9fafb]"
          title="내 계정"
          aria-label="내 계정"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e4f6ee] to-[#f5faf8] text-xs font-bold text-[#5aa688]">
            원
          </span>
        </Link>
      </div>
    </header>
  );
}
