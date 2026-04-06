-- 연동·자동결제 시 세션·로그인 정책 (에이전트가 참고)

alter table public.user_settings
  add column if not exists integration_policy jsonb not null default '{}'::jsonb;

comment on column public.user_settings.integration_policy is
  '연동 업체·마켓플레이스 자동 결제 시 세션/로그인 정책 (JSON)';
