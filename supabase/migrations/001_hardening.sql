-- Yarka 001: pengamanan fungsi checkout & newsletter.
-- Jalankan SEKALI di Supabase Dashboard > SQL Editor > New query > Run,
-- SEBELUM website versi baru (nomor pesanan format hex) di-deploy.
-- Aman dijalankan ulang. Tidak menghapus data apa pun.
--
-- Isi:
--  1. Batas permintaan per IP (rate limit) untuk checkout & newsletter.
--  2. simpan_repeat_order: tolak nilai uang negatif, terima nomor pesanan format lama & baru,
--     tidak lagi menimpa data pelanggan lama, nomor pesanan bentrok tidak dibuang diam-diam,
--     dan setiap pesanan menyimpan salinan data kontak/alamatnya sendiri (kolom kontak).
--  3. Notifikasi WA admin memakai alamat dari pesanan itu sendiri.

-- ---------------------------------------------------------------------------
-- 1. Rate limit (skema privat, tidak terjangkau API publik)
-- ---------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.rl (
  ip      text primary key,               -- '<jenis>:<alamat IP>'
  n       int not null default 0,
  jendela timestamptz not null default now()
);
revoke all on private.rl from anon, authenticated;

-- Naikkan hitungan untuk IP pemanggil; tolak bila melebihi p_maks dalam 1 jam.
-- Panggilan tanpa header HTTP (mis. dari SQL Editor) tidak dibatasi.
create or replace function private.cek_batas(p_jenis text, p_maks int)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  h    json := nullif(current_setting('request.headers', true), '')::json;
  v_ip text;
  v_n  int;
begin
  v_ip := coalesce(nullif(h->>'cf-connecting-ip', ''),
                   nullif(trim(split_part(coalesce(h->>'x-forwarded-for', ''), ',', 1)), ''));
  if v_ip is null then return; end if;

  insert into private.rl as r (ip, n, jendela)
  values (p_jenis || ':' || left(v_ip, 64), 1, now())
  on conflict (ip) do update set
    n       = case when r.jendela < now() - interval '1 hour' then 1 else r.n + 1 end,
    jendela = case when r.jendela < now() - interval '1 hour' then now() else r.jendela end
  returning n into v_n;

  if v_n > p_maks then
    raise exception 'terlalu banyak permintaan, coba lagi nanti';
  end if;
end;
$$;
revoke all on function private.cek_batas(text, int) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2. Checkout
-- ---------------------------------------------------------------------------
-- Salinan data kontak & alamat per pesanan (alamat pesanan lama tidak ikut berubah).
alter table public.pesanan_repeat add column if not exists kontak jsonb;

create or replace function public.simpan_repeat_order(p jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  k     jsonb := coalesce(p->'kontak', '{}'::jsonb);
  v_wa  text;
  v_ref text := coalesce(p->>'ref', '');
  v_sub bigint;
  v_ong bigint;
  v_tot bigint;
  v_kontak jsonb;
  v_pid_lama bigint;
  pid   bigint;
begin
  perform private.cek_batas('order', 30);

  if jsonb_typeof(k) <> 'object' then raise exception 'kontak tidak valid'; end if;
  v_wa := regexp_replace(coalesce(k->>'wa', ''), '[^0-9]', '', 'g');
  if left(v_wa, 1) = '0' then v_wa := '62' || substr(v_wa, 2); end if;
  if v_wa !~ '^628[0-9]{7,12}$' then raise exception 'nomor WhatsApp tidak valid'; end if;
  if length(coalesce(k->>'nama', '')) < 3 then raise exception 'nama wajib diisi'; end if;
  -- format lama YRK-20261123-1234 dan format baru YRK-20261123-9F3A02
  if v_ref !~ '^YRK-[0-9]{8}-([0-9]{4}|[0-9A-F]{6})$' then raise exception 'ref tidak valid'; end if;
  if coalesce(jsonb_typeof(p->'items'), '') <> 'array' then raise exception 'items tidak valid'; end if;
  if jsonb_array_length(p->'items') = 0
     or jsonb_array_length(p->'items') > 50 or length((p->'items')::text) > 20000 then
    raise exception 'items tidak valid';
  end if;

  -- Nilai uang: harus angka bulat, tidak boleh negatif / tidak masuk akal.
  begin
    v_sub := coalesce((p->>'subtotal')::bigint, 0);
    v_ong := coalesce((p->>'ongkir')::bigint, 0);
    v_tot := coalesce((p->>'total')::bigint, 0);
  exception when others then
    raise exception 'nilai uang tidak valid';
  end;
  if least(v_sub, v_ong, v_tot) < 0 or greatest(v_sub, v_ong, v_tot) > 1000000000 then
    raise exception 'nilai uang tidak valid';
  end if;

  -- Nomor pesanan sudah ada: bila milik nomor WA yang sama, itu kiriman ulang (abaikan);
  -- bila milik pelanggan lain, tolak (dulu dibuang diam-diam sehingga pesanan bisa hilang).
  select pelanggan_id into v_pid_lama from pesanan_repeat where ref = v_ref;
  if found then
    if exists (select 1 from pelanggan where id = v_pid_lama and wa = v_wa) then return; end if;
    raise exception 'nomor pesanan sudah dipakai';
  end if;

  v_kontak := jsonb_build_object(
    'nama', left(k->>'nama', 120), 'wa', v_wa, 'email', left(k->>'email', 200),
    'telp2', left(k->>'telp2', 30), 'prov', left(k->>'prov', 80), 'kota', left(k->>'kota', 120),
    'kec', left(k->>'kec', 120), 'alamat', left(k->>'alamat', 500));

  insert into pelanggan as c (wa, nama, email, telp2, provinsi, kota, kecamatan, alamat,
                              jumlah_order, total_belanja)
  values (v_wa, left(k->>'nama', 120), left(k->>'email', 200), left(k->>'telp2', 30),
          left(k->>'prov', 80), left(k->>'kota', 120), left(k->>'kec', 120), left(k->>'alamat', 500),
          1, v_tot)
  on conflict (wa) do update set
    -- Data pelanggan yang sudah ada TIDAK ditimpa, hanya diisi bila masih kosong.
    -- Siapa pun bisa checkout memakai nomor WA orang lain (tidak ada login/OTP), jadi kiriman
    -- baru tidak boleh mengubah data milik pelanggan lama. "nama" sengaja tidak diperbarui sama
    -- sekali karena nama dipakai admin untuk mengenali pelanggan. Alamat/nama untuk pesanan
    -- tertentu tetap tersimpan lengkap di pesanan_repeat.kontak.
    email          = coalesce(nullif(c.email, ''), excluded.email),
    telp2          = coalesce(nullif(c.telp2, ''), excluded.telp2),
    provinsi       = coalesce(nullif(c.provinsi, ''), excluded.provinsi),
    kota           = coalesce(nullif(c.kota, ''), excluded.kota),
    kecamatan      = coalesce(nullif(c.kecamatan, ''), excluded.kecamatan),
    alamat         = coalesce(nullif(c.alamat, ''), excluded.alamat),
    jumlah_order   = c.jumlah_order + 1,
    total_belanja  = c.total_belanja + excluded.total_belanja,
    order_terakhir = now()
  returning id into pid;

  insert into pesanan_repeat (ref, pelanggan_id, items, kurir, catatan, kado, subtotal, ongkir, total, kontak)
  values (v_ref, pid, p->'items', left(p->>'kurir', 80), left(k->>'catatan', 500),
          left(p->>'kado', 300), v_sub, v_ong, v_tot, v_kontak);
end;
$$;
revoke all on function public.simpan_repeat_order(jsonb) from public;
grant execute on function public.simpan_repeat_order(jsonb) to anon;

-- ---------------------------------------------------------------------------
-- 2b. Newsletter: sama seperti sebelumnya + rate limit 10/jam per IP
-- ---------------------------------------------------------------------------
create or replace function public.daftar_newsletter(p_email text, p_sumber text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  perform private.cek_batas('newsletter', 10);
  if length(v_email) > 200 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$' then
    raise exception 'email tidak valid';
  end if;
  insert into newsletter (email, sumber) values (v_email, left(p_sumber, 30))
  on conflict (email) do nothing;
end;
$$;
revoke all on function public.daftar_newsletter(text, text) from public;
grant execute on function public.daftar_newsletter(text, text) to anon;

-- ---------------------------------------------------------------------------
-- 3. Notifikasi WA admin: pakai nama & alamat dari pesanan itu sendiri
--    (butuh supabase/notif-wa.sql sudah pernah dijalankan)
-- ---------------------------------------------------------------------------
create or replace function public.notif_pesanan_baru() returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c       pelanggan%rowtype;
  o       jsonb := coalesce(new.kontak, '{}'::jsonb);
  v_token text;
  v_admin text;
  v_items text;
  v_alamat text;
  msg     text;
begin
  select nilai into v_token from pengaturan where kunci = 'fonnte_token';
  select nilai into v_admin from pengaturan where kunci = 'wa_admin';
  if coalesce(v_token, '') = '' or v_token like 'TEMPEL%' or coalesce(v_admin, '') = '' then
    return new;
  end if;

  select * into c from pelanggan where id = new.pelanggan_id;
  v_alamat := case when o ? 'alamat'
                   then concat_ws(', ', o->>'alamat', o->>'kec', o->>'kota', o->>'prov')
                   else concat_ws(', ', c.alamat, c.kecamatan, c.kota, c.provinsi) end;
  select string_agg('• ' || coalesce(i->>'nama', '?') || ' – ' || coalesce(i->>'warna', '-') || ' / '
                    || coalesce(i->>'ukuran', '-') || ' ×' || coalesce(i->>'q', '1') || ' = '
                    || yarka_rp((i->>'total')::bigint), E'\n')
    into v_items
    from jsonb_array_elements(new.items) as i;

  msg := '🛍️ *PESANAN BARU – ' || new.ref || '*' || E'\n\n'
      || '*Nama:* ' || coalesce(o->>'nama', c.nama, '-') || E'\n'
      || '*WA:* wa.me/' || coalesce(o->>'wa', c.wa, '-') || E'\n'
      || '*Alamat:* ' || coalesce(nullif(v_alamat, ''), '-') || E'\n\n'
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
      || case when c.nama is not null and o->>'nama' is not null and lower(c.nama) <> lower(o->>'nama')
              then E'\n⚠️ Nama berbeda dari data pelanggan sebelumnya: ' || c.nama else '' end
      || E'\n⏳ Menunggu konfirmasi pembayaran.';

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

-- jalankan berkala (manual atau pg_cron):
-- delete from private.rl where jendela < now() - interval '1 day';
