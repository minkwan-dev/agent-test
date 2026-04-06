/**
 * HttpOnly 쿠키로 Nest `POST /auth/onboarding/complete`를 호출하고, 새 JWT로 쿠키·응답을 맞춥니다.
 * (클라이언트에 Bearer를 꼭 들고 있지 않아도 됩니다.)
 */
export async function completeOnboardingAndRefreshSession(): Promise<string> {
  const res = await fetch("/api/auth/onboarding/complete", {
    method: "POST",
    credentials: "same-origin",
  });
  if (!res.ok) {
    throw new Error("ONBOARDING_COMPLETE_FAILED");
  }
  const data = (await res.json()) as { token: string };
  if (!data.token) {
    throw new Error("ONBOARDING_COMPLETE_FAILED");
  }
  return data.token;
}
