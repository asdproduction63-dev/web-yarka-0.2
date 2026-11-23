-- Yarka: kirim notifikasi WhatsApp ke admin setiap ada pesanan baru dari website.
-- CATATAN: setelah menjalankan file ini, jalankan juga supabase/migrations/001_hardening.sql (versi notifikasi terbaru).
-- Pengiriman WA lewat Fonnte (https://fonnte.com). Jalankan sekali di Supabase > SQL Editor.
-- GANTI teks TEMPEL_TOKEN_FONNTE_DI_SINI dengan token dari dashboard Fonnte sebelum Run.
-- Token disimpan di tabel terkunci (tidak bisa dibaca pengunjung website).

create extension if not exists pg_net;

create table if not exists public.pengaturan (
  kunci text primary key,
  nilai text not null
);
alter table public.pengaturan enable row level security;
revoke all on public.pengaturan from anon, authenticated;

insert into public.pengaturan (kunci, nilai) values
  ('fonnte_token', 'TEMPEL_TOKEN_FONNTE_DI_SINI'),
  ('wa_admin', '6285282437954')
on conflict (kunci) do update set nilai = excluded.nilai;

create or replace function public.yarka_rp(n bigint) returns text
language sql immutable as $$
  select 'Rp' || replace(to_char(coalesce(n, 0), 'FM999,999,999,990'), ',', '.')
$$;

create or replace function public.notif_pesanan_baru() returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c       pelanggan%rowtype;
  v_token text;
  v_admin text;
  v_items text;
  msg     text;
begin
  select nilai into v_token from pengaturan where kunci = 'fonnte_token';
  select nilai into v_admin from pengaturan where kunci = 'wa_admin';
  if coalesce(v_token, '') = '' or v_token like 'TEMPEL%' or coalesce(v_admin, '') = '' then
    return new;
  end if;

  select * into c from pelanggan where id = new.pelanggan_id;
  select string_agg('• ' || coalesce(i->>'nama', '?') || ' – ' || coalesce(i->>'warna', '-') || ' / '
                    || coalesce(i->>'ukuran', '-') || ' ×' || coalesce(i->>'q', '1') || ' = '
                    || yarka_rp((i->>'total')::bigint), E'\n')
    into v_items
    from jsonb_array_elements(new.items) as i;

  msg := '🛍️ *PESANAN BARU – ' || new.ref || '*' || E'\n\n'
      || '*Nama:* ' || coalesce(c.nama, '-') || E'\n'
      || '*WA:* wa.me/' || coalesce(c.wa, '-') || E'\n'
      || '*Alamat:* ' || coalesce(nullif(concat_ws(', ', c.alamat, c.kecamatan, c.kota, c.provinsi), ''), '-') || E'\n\n'
      || '*Produk:*' || E'\n' || coalesce(v_items, '-') || E'\n\n'
      || '*Kurir:* ' || coalesce(new.kurir, '-') || E'\n'
      || case when coalesce(new.kado, '') <> '' then '*Kado:* ' || new.kado || E'\n' else '' end
      || case when coalesce(new.catatan, '') <> '' then '*Catatan:* ' || new.catatan || E'\n' else '' end
      || E'\nSubtotal: ' || yarka_rp(new.subtotal)
      || E'\nOngkir: ' || yarka_rp(new.ongkir)
      || E'\n*Total: ' || yarka_rp(new.total) || '*' || E'\n\n'
      || case when coalesce(c.jumlah_order, 1) > 1
              then '🔁 Pelanggan lama (order ke-' || c.jumlah_order || ')'
              else '✨ Pelanggan baru' end
      || E'\n⏳ Menunggu konfirmasi pembayaran.';

  -- Dikirim di latar belakang; bila gagal, pesanan tetap tersimpan.
  begin
    perform net.http_post(
      url     := 'https://api.fonnte.com/send',
      headers := jsonb_build_object('Authorization', v_token, 'Content-Type', 'application/json'),
      body    := jsonb_build_object('target', v_admin, 'message', msg, 'countryCode', '62')
    );
  exception when others then
    raise warning 'notif WA gagal: %', sqlerrm;
  end;
  return new;
end;
$$;
revoke all on function public.notif_pesanan_baru() from public, anon, authenticated;

drop trigger if exists trg_notif_pesanan_baru on public.pesanan_repeat;
create trigger trg_notif_pesanan_baru
  after insert on public.pesanan_repeat
  for each row execute function public.notif_pesanan_baru();

-- Kirim satu pesan percobaan ke WA admin
select net.http_post(
  url     := 'https://api.fonnte.com/send',
  headers := jsonb_build_object('Authorization', (select nilai from public.pengaturan where kunci = 'fonnte_token'),
                                'Content-Type', 'application/json'),
  body    := jsonb_build_object('target', (select nilai from public.pengaturan where kunci = 'wa_admin'),
                                'message', '✅ Tes notifikasi pesanan website Yarka berhasil.', 'countryCode', '62')
);
