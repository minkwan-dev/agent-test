"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getApiUrl } from "@/lib/api";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { useHydrated } from "@/lib/use-hydrated";

export type AuthMe = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  onboardingCompleted?: boolean;
};

async function fetchMe(token: string): Promise<AuthMe> {
  const res = await fetch(`${getApiUrl()}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("ME_FAILED");
  return res.json() as Promise<AuthMe>;
}

export function useAuthMe() {
  const hydrated = useHydrated();
  const token = useAtomValue(accessTokenAtom);
  /** hydration 전에는 sessionStorage 토큰을 쓰지 않아 서버/클라이언트 마크업이 같게 유지 */
  const sessionToken = hydrated ? token : null;
  return useQuery({
    queryKey: ["auth", "me", sessionToken],
    queryFn: () => fetchMe(sessionToken!),
    enabled: Boolean(sessionToken),
    staleTime: 60_000,
    retry: (count, err) =>
      err instanceof Error && err.message === "UNAUTHORIZED" ? false : count < 1,
  });
}
