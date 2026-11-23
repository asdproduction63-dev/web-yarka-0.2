-- Yarka: data pelanggan yang ingin repeat order.
-- CATATAN: versi terbaru simpan_repeat_order & daftar_newsletter ada di supabase/migrations/001_hardening.sql.
-- Jalankan sekali di Supabase Dashboard > SQL Editor > New query > Run.
--
-- Keamanan: website memakai anon key (publik). Tabel dikunci dengan RLS tanpa policy,
-- jadi pengunjung TIDAK bisa membaca/mengubah data. Website hanya bisa memanggil
-- fungsi simpan_repeat_order() di bawah. Data dibaca admin lewat Dashboard > Table Editor.

create table if not exists public.pelanggan (
  id            bigint generated always as identity primary key,
  wa            text not null unique,          -- nomor WhatsApp (format 62xxxxxxxx), kunci pelanggan
  nama          text not null,
  email         text,
  telp2         text,
  provinsi      text,
  kota          text,
  kecamatan     text,
  alamat        text,
  jumlah_order  int  not null default 0,
  total_belanja bigint not null default 0,
  order_pertama timestamptz not null default now(),
  order_terakhir timestamptz not null default now(),
  dibuat        timestamptz not null default now()
);

create table if not exists public.pesanan_repeat (
  id           bigint generated always as identity primary key,
  ref          text not null unique,           -- nomor pesanan, mis. YRK-20261120-1234
  pelanggan_id bigint not null references public.pelanggan(id) on delete cascade,
  items        jsonb not null,                 -- produk, warna, ukuran, jumlah, harga
  kurir        text,
  catatan      text,
  kado         text,
  subtotal     bigint,
  ongkir       bigint,
  total        bigint,
  dibuat       timestamptz not null default now()
);
create index if not exists pesanan_repeat_pelanggan_idx on public.pesanan_repeat (pelanggan_id);

alter table public.pelanggan      enable row level security;
alter table public.pesanan_repeat enable row level security;
revoke all on public.pelanggan, public.pesanan_repeat from anon, authenticated;

create or replace function public.simpan_repeat_order(p jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  k   jsonb := p->'kontak';
  v_wa text := regexp_replace(coalesce(k->>'wa', ''), '[^0-9]', '', 'g');
  pid bigint;
begin
  if left(v_wa, 1) = '0' then v_wa := '62' || substr(v_wa, 2); end if;
  if v_wa !~ '^628[0-9]{7,12}$' then raise exception 'nomor WhatsApp tidak valid'; end if;
  if length(coalesce(k->>'nama', '')) < 3 then raise exception 'nama wajib diisi'; end if;
  if coalesce(p->>'ref', '') !~ '^YRK-[0-9]{8}-[0-9]{4}$' then raise exception 'ref tidak valid'; end if;
  if coalesce(jsonb_typeof(p->'items'), '') <> 'array' then raise exception 'items tidak valid'; end if;
  if jsonb_array_length(p->'items') = 0
     or jsonb_array_length(p->'items') > 50 or length((p->'items')::text) > 20000 then
    raise exception 'items tidak valid';
  end if;
  if exists (select 1 from pesanan_repeat where ref = p->>'ref') then return; end if;

  insert into pelanggan as c (wa, nama, email, telp2, provinsi, kota, kecamatan, alamat,
                              jumlah_order, total_belanja)
  values (v_wa, left(k->>'nama', 120), left(k->>'email', 200), left(k->>'telp2', 30),
          left(k->>'prov', 80), left(k->>'kota', 120), left(k->>'kec', 120), left(k->>'alamat', 500),
          1, coalesce((p->>'total')::bigint, 0))
  on conflict (wa) do update set
    nama = excluded.nama, email = excluded.email, telp2 = excluded.telp2,
    provinsi = excluded.provinsi, kota = excluded.kota, kecamatan = excluded.kecamatan,
    alamat = excluded.alamat,
    jumlah_order = c.jumlah_order + 1,
    total_belanja = c.total_belanja + excluded.total_belanja,
    order_terakhir = now()
  returning id into pid;

  insert into pesanan_repeat (ref, pelanggan_id, items, kurir, catatan, kado, subtotal, ongkir, total)
  values (p->>'ref', pid, p->'items', left(p->>'kurir', 80), left(k->>'catatan', 500),
          left(p->>'kado', 300), (p->>'subtotal')::bigint, (p->>'ongkir')::bigint, (p->>'total')::bigint);
end;
$$;

revoke all on function public.simpan_repeat_order(jsonb) from public;
grant execute on function public.simpan_repeat_order(jsonb) to anon;
