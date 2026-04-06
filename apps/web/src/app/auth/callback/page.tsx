"use client";

import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { setPostOnboardingDestination } from "@/lib/onboarding";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useSetAtom(accessTokenAtom);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    const token = searchParams.get("token");
    const next = searchParams.get("next");
    const error = searchParams.get("error");

    if (error || !token) {
      router.replace("/login?error=auth");
      return;
    }

    ran.current = true;

    void (async () => {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "same-origin",
      });

      if (!res.ok) {
        if (res.status >= 500) {
          router.replace("/login?error=config");
        } else {
          router.replace("/login?error=auth");
        }
        return;
      }

      setToken(token);

      const dest = next?.startsWith("/") ? next : "/dashboard/overview";
      setPostOnboardingDestination(dest);
      router.replace(dest);
    })();
  }, [router, searchParams, setToken]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f2f4f6] px-4 text-center">
      <p className="text-sm font-medium text-[#4e5968]">Google 로그인을 마무리하는 중이에요…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f2f4f6] px-4 text-center">
          <p className="text-sm font-medium text-[#4e5968]">불러오는 중…</p>
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
