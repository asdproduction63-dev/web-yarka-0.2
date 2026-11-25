-- Yarka 003: pembayaran otomatis (Komerce / RajaOngkir Payment API: Virtual Account & QRIS).
-- Jalankan SEKALI di Supabase > SQL Editor > New query > Run, SEBELUM website versi baru di-deploy.
-- Aman dijalankan ulang. Tidak menghapus data apa pun.
--
-- Kolom baru di pesanan_repeat (lihat di Table Editor):
--   status_bayar  menunggu | lunas | kedaluwarsa | batal
--   metode_bayar  mis. "VA BCA" / "QRIS" (kosong = transfer manual)
--   payment_id    nomor transaksi Komerce
--   payment_info  detail VA/QRIS yang ditampilkan ke pembeli
--   dibayar_pada  waktu pembayaran otomatis terkonfirmasi
-- Kolom ini hanya bisa diubah oleh server (secret key). Pengunjung website tetap tidak bisa
-- membaca atau mengubah tabel (RLS tanpa policy, lihat schema.sql).

alter table public.pesanan_repeat
  add column if not exists status_bayar text not null default 'menunggu',
  add column if not exists metode_bayar text,
  add column if not exists payment_id   text,
  add column if not exists payment_info jsonb,
  add column if not exists dibayar_pada timestamptz;

do $$ begin
  alter table public.pesanan_repeat
    add constraint pesanan_repeat_status_bayar_chk
    check (status_bayar in ('menunggu', 'lunas', 'kedaluwarsa', 'batal'));
exception when duplicate_object then null; end $$;

create index if not exists pesanan_repeat_payment_id_idx on public.pesanan_repeat (payment_id);

-- Notifikasi WA admin saat pembayaran otomatis LUNAS (memakai token Fonnte di tabel pengaturan,
-- sama seperti notifikasi pesanan baru di notif-wa.sql).
create or replace function public.notif_pesanan_lunas() returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  o       jsonb := coalesce(new.kontak, '{}'::jsonb);
  v_token text;
  v_admin text;
  msg     text;
begin
  if new.status_bayar <> 'lunas' or coalesce(old.status_bayar, '') = 'lunas' then return new; end if;
  -- Semua di dalam blok ini: bila notifikasi gagal, status LUNAS tetap tersimpan.
  begin
    select nilai into v_token from pengaturan where kunci = 'fonnte_token';
    select nilai into v_admin from pengaturan where kunci = 'wa_admin';
    if coalesce(v_token, '') = '' or v_token like 'TEMPEL%' or coalesce(v_admin, '') = '' then
      return new;
    end if;

    msg := '✅ *PEMBAYARAN LUNAS – ' || new.ref || '*' || E'\n\n'
        || '*Nama:* ' || coalesce(o->>'nama', '-') || E'\n'
        || '*WA:* wa.me/' || coalesce(o->>'wa', '-') || E'\n'
        || '*Metode:* ' || coalesce(new.metode_bayar, '-') || E'\n'
        || '*Total:* ' || yarka_rp(new.total) || E'\n\n'
        || 'Terverifikasi otomatis oleh payment gateway. Pesanan siap diproses & dikirim. 📦';
    perform net.http_post(
      url     := 'https://api.fonnte.com/send',
      headers := jsonb_build_object('Authorization', v_token, 'Content-Type', 'application/json'),
      body    := jsonb_build_object('target', v_admin, 'message', msg, 'countryCode', '62')
    );
  exception when others then
    raise warning 'notif WA lunas gagal: %', sqlerrm;
  end;
  return new;
end;
$$;
revoke all on function public.notif_pesanan_lunas() from public, anon, authenticated;

drop trigger if exists trg_notif_pesanan_lunas on public.pesanan_repeat;
create trigger trg_notif_pesanan_lunas
  after update of status_bayar on public.pesanan_repeat
  for each row execute function public.notif_pesanan_lunas();
