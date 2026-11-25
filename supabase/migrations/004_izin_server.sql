-- Yarka 004: beri izin tabel untuk server (service_role) yang dipakai fungsi pembayaran di Vercel.
-- Jalankan SEKALI di Supabase > SQL Editor > New query > Run. Aman dijalankan ulang.
-- Pengunjung website (anon) TETAP tidak bisa membaca/mengubah tabel.

grant usage on schema public to service_role;
grant select, update on public.pesanan_repeat to service_role;
