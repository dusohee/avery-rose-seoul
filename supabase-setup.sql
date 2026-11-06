-- =========================================================
-- 앨범용 Supabase 설정 — Supabase 대시보드 → SQL Editor → New query에
-- 이 파일 내용을 통째로 붙여넣고 Run을 한 번만 누르면 돼요.
-- 누구나(사이트를 아는 사람) 사진을 보고 올릴 수 있고, 고치거나 지우는 건 대시보드에서만 돼요.
-- =========================================================

-- 1) 사진 목록 (찍은 날짜·장소)
create table if not exists public.photos (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  taken_at text not null,              -- 찍은 날짜·시간 "YYYY-MM-DDTHH:MM" (현지 시각)
  place text not null default '',      -- 찍은 곳
  src text not null,                   -- Storage 경로: 크게 보기·다운로드용
  thumb text not null,                 -- Storage 경로: 그리드용 작은 사진
  w int,
  h int,
  lat double precision,
  lng double precision
);

alter table public.photos enable row level security;

drop policy if exists "album: anyone can view" on public.photos;
create policy "album: anyone can view" on public.photos
  for select to anon, authenticated using (true);

drop policy if exists "album: anyone can add" on public.photos;
create policy "album: anyone can add" on public.photos
  for insert to anon, authenticated with check (true);

-- 2) 사진 파일 버킷 (공개 읽기, JPEG만, 한 장 10MB까지)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('album', 'album', true, 10485760, array['image/jpeg'])
on conflict (id) do update
  set public = true, file_size_limit = 10485760, allowed_mime_types = array['image/jpeg'];

drop policy if exists "album: anyone can upload" on storage.objects;
create policy "album: anyone can upload" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'album');
