-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/eumlblwtjrrhzarvjvqq/sql)

create table if not exists public.waitlist (
  id            uuid        default gen_random_uuid() primary key,
  email         text        not null unique,
  instagram     text,
  status        text        not null default 'pending'
                            check (status in ('pending', 'approved', 'rejected')),
  has_full_access boolean   not null default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.feedback (
  id         uuid        default gen_random_uuid() primary key,
  name       text,
  email      text,
  message    text        not null,
  is_read    boolean     not null default false,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.waitlist enable row level security;
alter table public.feedback enable row level security;

-- Anyone can join the waitlist (public form)
create policy "public_insert_waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- Anyone can submit feedback (public form)
create policy "public_insert_feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (true);

-- Service role bypasses RLS — admin reads/updates use service role key, no extra policies needed
