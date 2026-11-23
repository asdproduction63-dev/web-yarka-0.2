-- Yarka 002: tabel pelanggan menyimpan data checkout TERBARU (nama & alamat ikut berubah).
-- Jalankan di Supabase > SQL Editor > New query > Run. Tidak menghapus data apa pun.
-- Menggantikan aturan "jangan timpa data lama" dari 001_hardening.sql.

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
    -- Data pelanggan selalu diperbarui ke isian checkout TERBARU (nama, alamat, dll),
    -- karena pelanggan bisa pindah alamat / ganti nama penerima. Data lama per pesanan
    -- tetap utuh di pesanan_repeat.kontak.
    nama           = excluded.nama,
    email          = coalesce(nullif(excluded.email, ''), c.email),
    telp2          = coalesce(nullif(excluded.telp2, ''), c.telp2),
    provinsi       = coalesce(nullif(excluded.provinsi, ''), c.provinsi),
    kota           = coalesce(nullif(excluded.kota, ''), c.kota),
    kecamatan      = coalesce(nullif(excluded.kecamatan, ''), c.kecamatan),
    alamat         = coalesce(nullif(excluded.alamat, ''), c.alamat),
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
