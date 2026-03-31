/**
 * 온보딩 완료는 localStorage에 저장하지 않아요. `/onboarding`은 언제든 직접 열어 확인할 수 있어요.
 * 로그인 후 이동 경로만 sessionStorage로 잠깐 넘깁니다.
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
