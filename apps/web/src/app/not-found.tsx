import { ArrowLeft, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f2f4f6]">
      <header className="border-b border-[#e5e8eb] bg-white px-4 py-4 sm:px-8">
        <Link href="/" className="inline-flex items-center">
          <Brand.SemosoLogoLockup size="sm" />
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <p className="text-sm font-bold uppercase tracking-wider text-[#6eb89a]">404</p>
        <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-[#191f28] sm:text-3xl">
          페이지를 찾을 수 없어요
        </h1>
        <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-[#4e5968]">
          주소가 바뀌었거나 삭제된 페이지일 수 있어요. 홈이나 대시보드에서 다시 시작해 주세요.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e8eb] bg-white px-5 py-3 text-sm font-semibold text-[#191f28] shadow-sm transition hover:bg-[#f9fafb]"
          >
            <Home className="h-4 w-4 text-[#6eb89a]" />
            홈으로
          </Link>
          <Link
            href="/dashboard/overview"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6eb89a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5aa688]"
          >
            <LayoutDashboard className="h-4 w-4" />
            운영 대시보드
          </Link>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b95a1] transition hover:text-[#6eb89a]"
        >
          <ArrowLeft className="h-4 w-4" />
          이전 페이지로 (랜딩)
        </Link>
      </main>
    </div>
  );
}
