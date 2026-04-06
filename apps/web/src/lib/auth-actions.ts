"use client";

import { NOVITAS_ACCESS_TOKEN_KEY } from "@/lib/auth-atoms";

/** 레거시 데모 세션 쿠키 (이전 버전 호환용 삭제) */
const LEGACY_SESSION_COOKIE = "novitas_session";

export async function clearAuthSession(
  setToken: (value: string | null) => void,
): Promise<void> {
  setToken(null);
  try {
    sessionStorage.removeItem(NOVITAS_ACCESS_TOKEN_KEY);
  } catch {
    /* ignore */
  }
  try {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${LEGACY_SESSION_COOKIE}=; path=/; max-age=0`;
  } catch {
    /* ignore */
  }
}
