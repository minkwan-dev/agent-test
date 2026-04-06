-- 최초 가입자만 온보딩(null). 이미 존재하던 행은 마이그레이션 시점에 완료로 간주합니다.

alter table public.profiles
  add column if not exists onboarding_completed_at timestamptz null;

comment on column public.profiles.onboarding_completed_at is '온보딩 마친 시각. null이면 온보딩 필요(신규 가입).';

update public.profiles
set onboarding_completed_at = coalesce(onboarding_completed_at, now())
where onboarding_completed_at is null;
