"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { clearAuthSession } from "@/lib/auth-actions";
import { useAuthMe } from "@/lib/use-auth-me";

/**
 * Nest /auth/me 가 401이면(토큰 만료·폐기) 클라이언트 상태·HttpOnly 쿠키를 비우고 로그인으로 보냅니다.
 */
export function AuthSessionSync() {
  const { isError, error } = useAuthMe();
  const router = useRouter();
  const setToken = useSetAtom(accessTokenAtom);
  const queryClient = useQueryClient();
  const handled = useRef(false);

  useEffect(() => {
    if (!isError || !error) return;
    const msg = error instanceof Error ? error.message : "";
    if (msg !== "UNAUTHORIZED") return;
    if (handled.current) return;
    handled.current = true;

    void (async () => {
      await clearAuthSession(setToken);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      router.replace("/login?error=session");
    })();
  }, [error, isError, queryClient, router, setToken]);

  return null;
}
