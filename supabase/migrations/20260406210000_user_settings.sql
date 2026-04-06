-- 프로필당 1행. Nest(service role)가 읽고 씁니다.

create table if not exists public.user_settings (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  inventory_scan_interval_minutes int not null default 15
    check (inventory_scan_interval_minutes between 5 and 120),
  autobuy_on_low_stock boolean not null default true,
  daily_budget_ceiling_krw bigint null,
  notify_push_urgent boolean not null default true,
  notify_daily_email boolean not null default false,
  notify_webhook_url text null,
  updated_at timestamptz not null default now()
);

comment on table public.user_settings is '프로필별 앱 설정 (스캔 주기·알림 등)';

alter table public.user_settings enable row level security;
