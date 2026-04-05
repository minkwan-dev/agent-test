import Link from "next/link";
import { Brand } from "@/components/brand";

/** 대시보드(사이드바) 밖 — 로그인과 같은 ‘진입’ 톤 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f2f4f6]">
      <header className="sticky top-0 z-50 shrink-0 border-b border-[#e5e8eb] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 sm:px-8">
          <Link href="/" className="min-w-0 shrink-0">
            <Brand.SemosoLogoLockup size="md" />
          </Link>
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
