// E-invoice PDF untuk setiap pesanan (dipakai halaman Pesanan Saya / akun.html).
// Dibuat di browser dengan jsPDF (assets/vendor, dimuat hanya saat tombol ditekan).
// Pemakaian: YarkaInvoice.unduh(order) -> Promise
(function () {
  var TOKO = {
    nama: 'Yarka Moslem Wear', situs: 'yarka.vercel.app', wa: '+62 852-8243-7954', ig: '@yarka_indonesia'
  };
  var BANK = [
    ['BCA', '547 515 3739'], ['Mandiri', '131 000 407 9044'], ['BSI', '723 493 5148']
  ];
  var PEMILIK = "Nur'aini";
  var STATUS = {
    menunggu: 'MENUNGGU PEMBAYARAN', diproses: 'DIPROSES', dikirim: 'DIKIRIM', selesai: 'SELESAI'
  };
  var BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  // Font standar PDF hanya mendukung Latin-1: ganti tanda baca khusus.
  function t(s) {
    return String(s == null ? '' : s)
      .replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/•/g, '-').replace(/…/g, '...').replace(/[^\x00-\xFF]/g, '');
  }
  function rp(n) { return 'Rp' + Math.round(Number(n) || 0).toLocaleString('id-ID'); }
  function tgl(s) { var d = new Date(s); return isNaN(d) ? '-' : d.getDate() + ' ' + BLN[d.getMonth()] + ' ' + d.getFullYear(); }

  var muat = null;
  function jsPDFSiap() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    if (!muat) muat = new Promise(function (ok, gagal) {
      var s = document.createElement('script');
      s.src = 'assets/vendor/jspdf.umd.min.js';
      s.onload = function () { window.jspdf && window.jspdf.jsPDF ? ok(window.jspdf.jsPDF) : gagal(new Error('jsPDF')); };
      s.onerror = function () { muat = null; gagal(new Error('jsPDF gagal dimuat')); };
      document.head.appendChild(s);
    });
    return muat;
  }
  function logo() {
    return new Promise(function (ok) {
      var img = new Image();
      img.onload = function () {
        try {
          // Perkecil logo (cukup tajam untuk cetak, ukuran PDF tetap kecil)
          var skala = Math.min(1, 520 / img.naturalWidth);
          var c = document.createElement('canvas');
          c.width = Math.round(img.naturalWidth * skala); c.height = Math.round(img.naturalHeight * skala);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          ok({ data: c.toDataURL('image/png'), w: c.width, h: c.height });
        } catch (e) { ok(null); }
      };
      img.onerror = function () { ok(null); };
      img.src = 'assets/img/logo.png';
    });
  }

  function buat(JsPDF, o, lg) {
    var doc = new JsPDF({ unit: 'mm', format: 'a4', compress: true });
    var W = 210, M = 16, R = W - M, y;
    var COK = [166, 124, 110], HITAM = [26, 26, 26], ABU = [107, 107, 107], GARIS = [228, 218, 212], KREM = [253, 248, 246];
    function warna(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function huruf(gaya, ukuran) { doc.setFont('helvetica', gaya); doc.setFontSize(ukuran); }
    function garis(yy) { doc.setDrawColor(GARIS[0], GARIS[1], GARIS[2]); doc.setLineWidth(0.3); doc.line(M, yy, R, yy); }

    // --- Kepala ---
    doc.setFillColor(KREM[0], KREM[1], KREM[2]); doc.rect(0, 0, W, 44, 'F');
    if (lg) { var lh = 16, lw = lh * lg.w / lg.h; doc.addImage(lg.data, 'PNG', M, 12, Math.min(lw, 60), lh, 'logo', 'FAST'); }
    else { huruf('bold', 20); warna(COK); doc.text('yarka', M, 24); }
    huruf('bold', 22); warna(HITAM); doc.text('INVOICE', R, 20, { align: 'right' });
    huruf('normal', 9.5); warna(ABU);
    doc.text('No. ' + t(o.ref), R, 27, { align: 'right' });
    doc.text('Tanggal: ' + tgl(o.dibuat), R, 32, { align: 'right' });
    var st = STATUS[o.status] || 'DIPROSES';
    huruf('bold', 8.5); warna(COK); doc.text(st, R, 38, { align: 'right' });

    // --- Penjual & pembeli ---
    y = 56;
    var k = o.kontak || {};
    huruf('bold', 8); warna(COK); doc.text('DARI', M, y); doc.text('DITAGIHKAN KEPADA', 110, y);
    y += 6;
    huruf('bold', 10.5); warna(HITAM); doc.text(TOKO.nama, M, y); doc.text(t(k.nama || '-'), 110, y);
    huruf('normal', 9); warna(ABU);
    var kiri = [TOKO.situs, 'WhatsApp ' + TOKO.wa, 'Instagram ' + TOKO.ig];
    var wa = k.wa ? String(k.wa).replace(/[^\d+]/g, '') : '';
    var alamat = [k.alamat, k.kec, k.kota, k.prov].filter(Boolean).join(', ') + (k.kodepos ? ' ' + k.kodepos : '');
    var kanan = [];
    if (wa) kanan.push('WhatsApp ' + wa);
    if (k.email) kanan.push(t(k.email));
    if (alamat) kanan = kanan.concat(doc.splitTextToSize(t(alamat), R - 110));
    if (!k.nama && !alamat) kanan.push('(data pembeli tidak tersimpan di perangkat ini)');
    var yy = y + 5;
    kiri.forEach(function (s, i) { doc.text(s, M, yy + i * 4.6); });
    kanan.forEach(function (s, i) { doc.text(s, 110, yy + i * 4.6); });
    y = yy + Math.max(kiri.length, kanan.length) * 4.6 + 4;
    if (o.kurir && o.kurir.label) {
      huruf('bold', 8); warna(COK); doc.text('PENGIRIMAN', 110, y);
      huruf('normal', 9); warna(ABU); doc.text(t(o.kurir.label), 110, y + 5); y += 10;
    }

    // --- Tabel produk ---
    y += 4;
    var X = { no: M + 2, prod: M + 12, qty: 128, harga: 160, jml: R - 2 };
    function kepalaTabel() {
      doc.setFillColor(HITAM[0], HITAM[1], HITAM[2]); doc.rect(M, y, R - M, 8, 'F');
      huruf('bold', 8); doc.setTextColor(255, 255, 255);
      doc.text('NO', X.no, y + 5.3); doc.text('PRODUK', X.prod, y + 5.3);
      doc.text('QTY', X.qty, y + 5.3, { align: 'center' }); doc.text('HARGA', X.harga, y + 5.3, { align: 'right' });
      doc.text('JUMLAH', X.jml, y + 5.3, { align: 'right' });
      y += 8;
    }
    kepalaTabel();
    var items = o.items || [], sub = 0;
    items.forEach(function (it, i) {
      var nama = doc.splitTextToSize(t(it.nama || '-'), X.qty - X.prod - 10);
      var ket = t([it.warna, it.ukuran].filter(Boolean).join(' / '));
      var tinggi = 4.5 + nama.length * 4.3 + (ket ? 4 : 0) + 2.5;
      if (y + tinggi > 262) { doc.addPage(); y = 20; kepalaTabel(); }
      var jml = Number(it.total) || (Number(it.unit) || 0) * (Number(it.q) || 1);
      sub += jml;
      huruf('normal', 9); warna(ABU); doc.text(String(i + 1), X.no, y + 5.5);
      huruf('bold', 9.5); warna(HITAM); doc.text(nama, X.prod, y + 5.5);
      if (ket) { huruf('normal', 8.5); warna(ABU); doc.text(ket, X.prod, y + 5.5 + nama.length * 4.3); }
      huruf('normal', 9.5); warna(HITAM);
      doc.text(String(it.q || 1), X.qty, y + 5.5, { align: 'center' });
      doc.text(rp(it.unit || jml / (it.q || 1)), X.harga, y + 5.5, { align: 'right' });
      doc.text(rp(jml), X.jml, y + 5.5, { align: 'right' });
      y += tinggi; garis(y);
    });

    // --- Ringkasan ---
    var subtotal = o.subtotal != null ? o.subtotal : sub;
    var baris = [['Subtotal', rp(subtotal)]];
    if (o.ongkir != null) baris.push(['Ongkos kirim' + (o.kurir && o.kurir.label ? ' (' + t(o.kurir.label) + ')' : ''), rp(o.ongkir)]);
    if (o.asuransi) baris.push(['Asuransi pengiriman', rp(o.asuransi)]);
    if (o.ongkir == null && o.total > subtotal) baris.push(['Ongkos kirim & asuransi', rp(o.total - subtotal)]);
    if (y + baris.length * 6 + 30 > 270) { doc.addPage(); y = 20; }
    y += 7;
    huruf('normal', 9.5);
    baris.forEach(function (b) { warna(ABU); doc.text(b[0], 125, y, { align: 'right' }); warna(HITAM); doc.text(b[1], R - 2, y, { align: 'right' }); y += 6; });
    doc.setFillColor(KREM[0], KREM[1], KREM[2]); doc.rect(105, y - 2, R - 105, 11, 'F');
    huruf('bold', 11); warna(HITAM); doc.text('TOTAL', 110, y + 5.3); warna(COK); doc.text(rp(o.total), R - 2, y + 5.3, { align: 'right' });
    y += 16;
    if (o.kado) { huruf('normal', 8.5); warna(ABU); doc.text(doc.splitTextToSize('Kemasan kado: ' + t(o.kado), R - M), M, y); y += 8; }

    // --- Pembayaran ---
    if (y > 235) { doc.addPage(); y = 20; }
    garis(y); y += 7;
    huruf('bold', 8); warna(COK); doc.text('INFORMASI PEMBAYARAN', M, y); y += 5.5;
    huruf('normal', 9); warna(ABU);
    if (o.status === 'menunggu') {
      doc.text('Silakan transfer sesuai total ke salah satu rekening a.n. ' + PEMILIK + ':', M, y); y += 5;
      BANK.forEach(function (b) { warna(HITAM); doc.text(b[0], M + 2, y); warna(ABU); doc.text(b[1], M + 24, y); y += 4.8; });
      doc.text('atau QRIS (GoPay, OVO, DANA, ShopeePay, m-banking) yang dikirim admin via WhatsApp.', M, y); y += 5;
    }
    doc.text(doc.splitTextToSize('Kirim bukti pembayaran beserta nomor invoice ke WhatsApp ' + TOKO.wa + '. Pembayaran dinyatakan sah setelah dikonfirmasi oleh admin Yarka.', R - M), M, y);

    // --- Kaki ---
    var hal = doc.getNumberOfPages();
    for (var p = 1; p <= hal; p++) {
      doc.setPage(p);
      doc.setDrawColor(COK[0], COK[1], COK[2]); doc.setLineWidth(0.6); doc.line(M, 283, R, 283);
      huruf('italic', 8); warna(ABU);
      doc.text('Terima kasih telah berbelanja di Yarka Moslem Wear  -  #IringiLangkahBaik', M, 288);
      huruf('normal', 8); doc.text('Invoice dibuat otomatis dari ' + TOKO.situs + (hal > 1 ? '  |  Hal. ' + p + '/' + hal : ''), R, 288, { align: 'right' });
    }
    doc.setProperties({ title: 'Invoice ' + o.ref, author: TOKO.nama, subject: 'E-Invoice pesanan ' + o.ref });
    return doc;
  }

  window.YarkaInvoice = {
    unduh: function (o) {
      return Promise.all([jsPDFSiap(), logo()]).then(function (r) {
        buat(r[0], o, r[1]).save('Invoice-' + String(o.ref).replace(/[^\w-]/g, '') + '.pdf');
      });
    }
  };
})();
