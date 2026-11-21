-- Yarka: daftar email "Berlangganan" (footer & beranda).
-- Jalankan sekali di Supabase Dashboard > SQL Editor > New query > Run.
-- Tabel dikunci (RLS tanpa policy); website hanya bisa memanggil daftar_newsletter().

create table if not exists public.newsletter (
  id      bigint generated always as identity primary key,
  email   text not null unique,
  sumber  text,                                  -- 'footer' / 'beranda'
  dibuat  timestamptz not null default now()
);
alter table public.newsletter enable row level security;
revoke all on public.newsletter from anon, authenticated;

create or replace function public.daftar_newsletter(p_email text, p_sumber text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if length(v_email) > 200 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$' then
    raise exception 'email tidak valid';
  end if;
  insert into newsletter (email, sumber) values (v_email, left(p_sumber, 30))
  on conflict (email) do nothing;
end;
$$;

revoke all on function public.daftar_newsletter(text, text) from public;
grant execute on function public.daftar_newsletter(text, text) to anon;

-- Bersihkan data uji coba sebelumnya
delete from public.pelanggan where wa = '6281200000000';
