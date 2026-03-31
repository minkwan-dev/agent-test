import Link from "next/link";
import { Brand } from "@/components/brand";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e8eb] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-8">
        <Link href="/" className="min-w-0 shrink-0">
            <Brand.NovitasLogoLockup size="md" />
        </Link>
        <nav className="hidden items-center gap-0.5 text-sm font-medium text-[#4e5968] lg:flex">
          <a
            href="#features"
            className="rounded-lg px-3 py-2 transition hover:bg-[#f2f4f6] hover:text-[#191f28]"
          >
            기능
          </a>
          <a
            href="#stats"
            className="rounded-lg px-3 py-2 transition hover:bg-[#f2f4f6] hover:text-[#191f28]"
          >
            지표
          </a>
          <a
            href="#flow"
            className="rounded-lg px-3 py-2 transition hover:bg-[#f2f4f6] hover:text-[#191f28]"
          >
            플로우
          </a>
          <a
            href="#preview"
            className="rounded-lg px-3 py-2 transition hover:bg-[#f2f4f6] hover:text-[#191f28]"
          >
            화면
          </a>
          <a
            href="#faq"
            className="rounded-lg px-3 py-2 transition hover:bg-[#f2f4f6] hover:text-[#191f28]"
          >
            FAQ
          </a>
        </nav>
        <Link
          href="/login"
          className="shrink-0 rounded-lg bg-[#3182f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#256dd4] sm:px-5"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
