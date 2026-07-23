-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.applications (
  id              uuid primary key,
  full_name       text not null,
  email           text not null,
  phone           text not null,
  city            text not null,
  qualification   text not null,
  course_interest text not null,
  experience      text,
  message         text,
  resume_filename text,
  resume_size     bigint,
  created_at      timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key,
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- RLS on with no policies: the anon/public key can do nothing at all.
-- The backend uses the service_role key, which bypasses RLS by design.
alter table public.applications enable row level security;
alter table public.contact_messages enable row level security;
