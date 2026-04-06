-- Supabase SQL Editor에서 실행하거나, supabase db push 등으로 적용하세요.
-- JWT의 sub 는 이 테이블의 id(uuid)를 사용합니다.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  google_sub text not null unique,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (email);

comment on table public.profiles is 'Google OAuth로 동기화되는 앱 유저 프로필 (Nest API가 service role로 쓰기)';

alter table public.profiles enable row level security;

-- Nest는 service role 키로 접속하므로 RLS를 우회합니다.
-- 향후 Supabase Auth·클라이언트 직접 접근 시 정책을 추가하세요.
