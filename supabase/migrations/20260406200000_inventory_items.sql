-- 품목·현재고·안전재고(상한). JWT sub(profiles.id) 소유.

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  sku text null,
  icon text not null default '📦',
  current_qty int not null check (current_qty >= 0 and current_qty <= 999999),
  safety_stock_max int not null check (safety_stock_max >= 1 and safety_stock_max <= 999999),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inventory_items_profile_id_idx
  on public.inventory_items (profile_id);

create index if not exists inventory_items_profile_name_idx
  on public.inventory_items (profile_id, name);

comment on table public.inventory_items is '사용자(프로필)별 재고 품목';

alter table public.inventory_items enable row level security;
