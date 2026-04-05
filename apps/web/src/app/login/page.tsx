"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Login } from "@/components/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f2f4f6]">
      <Login.Header />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 xl:px-10">
          <Suspense fallback={<Login.Fallback />}>
            <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14 2xl:gap-20">
              <Login.FormPanel />
              <Login.Aside />
            </div>
          </Suspense>
        </div>

        <footer className="mt-auto shrink-0 border-t border-[#e5e8eb] bg-white py-6 sm:py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-[#8b95a1] sm:flex-row sm:px-8 sm:text-left">
            <span>© {new Date().getFullYear()} semoso · 세상의 모든 소상공인을 위한 운영 콘솔</span>
            <Link href="/" className="font-semibold text-[#6eb89a] hover:underline">
              서비스 소개 보기 →
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
