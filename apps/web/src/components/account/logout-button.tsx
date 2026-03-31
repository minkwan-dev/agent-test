import { LogOut } from "lucide-react";
import Link from "next/link";
import { SESSION_COOKIE } from "@/lib/session";

export function LogoutButton() {
  return (
    <Link
      href="/"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e8eb] px-4 py-3 text-sm font-semibold text-[#4e5968] transition hover:bg-[#f9fafb] sm:w-auto"
      onClick={() => {
        document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
      }}
    >
      <LogOut className="h-4 w-4" />
      로그아웃 (세션 삭제)
    </Link>
  );
}
