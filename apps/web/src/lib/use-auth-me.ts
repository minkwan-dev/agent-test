"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getApiUrl } from "@/lib/api";
import { accessTokenAtom } from "@/lib/auth-atoms";

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
  const token = useAtomValue(accessTokenAtom);
  return useQuery({
    queryKey: ["auth", "me", token],
    queryFn: () => fetchMe(token!),
    enabled: Boolean(token),
    staleTime: 60_000,
    retry: (count, err) =>
      err instanceof Error && err.message === "UNAUTHORIZED" ? false : count < 1,
  });
}
