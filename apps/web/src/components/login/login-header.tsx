import Link from "next/link";
import { Brand } from "@/components/brand";

export function LoginHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-[#e5e8eb] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-8">
        <Link href="/" className="min-w-0 shrink-0">
          <Brand.NovitasLogoLockup size="md" />
        </Link>
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold text-[#4e5968] transition hover:text-[#191f28]"
        >
          ← 랜딩으로
        </Link>
      </div>
    </header>
  );
}
