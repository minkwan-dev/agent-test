/**
 * 온보딩 완료 여부는 Supabase `profiles.onboarding_completed_at` + JWT 클레임으로 관리합니다.
 * 로그인 직후 이동할 경로만 sessionStorage로 잠깐 넘겨, 마친 뒤 그 경로로 보냅니다.
 */

export const POST_ONBOARDING_DEST_KEY = "novitas-post-onboarding";

export function setPostOnboardingDestination(path: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(POST_ONBOARDING_DEST_KEY, path);
  } catch {
    /* ignore */
  }
}

export function consumePostOnboardingDestination(): string {
  if (typeof window === "undefined") return "/dashboard/overview";
  try {
    const v = sessionStorage.getItem(POST_ONBOARDING_DEST_KEY);
    sessionStorage.removeItem(POST_ONBOARDING_DEST_KEY);
    if (v && v.startsWith("/")) return v;
  } catch {
    /* ignore */
  }
  return "/dashboard/overview";
}
