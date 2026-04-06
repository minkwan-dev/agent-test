export type JwtUserPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  /** false면 온보딩 필요(신규). JWT에 없으면(구 토큰) 완료로 간주 */
  onboardingCompleted?: boolean;
};
