// Data produk Yarka (sumber: channel Telegram @yarkaindonesia, 00_Deskripsi_Produk).
// Dipakai bersama oleh Beranda, Katalog, dan halaman detail produk.
(function () {
  var W = 'assets/img/warna/';
  // c(nama, hex, keluarga warna untuk filter, foto)
  function c(n, hex, fam, img) { return { n: n, hex: hex, fam: fam, img: (img.indexOf('/') > -1 ? 'assets/img/' + img : W + img) + '.jpg' }; }

  window.YARKA_PRODUCTS = {
    zen: {
      id: 'zen', name: 'Zen Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cottonblended-sandwash', bahanLabel: 'Cottonblended Sandwash',
      price: 429000, priceMax: 449000, priceNote: 'XS–M Rp429.000 • L–XL Rp449.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 13, baru: false,
      tagline: 'Abaya dengan Aksen Cheongsam',
      desc: 'Abaya dengan aksen cheongsam yang cantik dan unik. Cuttingan semi bisht dengan V neck membuatnya longgar, jatuh rapi, dan tetap anggun untuk dipakai harian maupun acara.',
      features: [['Akses Wudhu Loose', 'Lengan longgar sehingga mudah digulung saat berwudhu.'],
        ['Saku Kanan & Kiri', 'Dua saku fungsional untuk ponsel dan barang kecil.'],
        ['Akses Busui Kancing', 'Kancing depan yang ramah ibu menyusui.']],
      material: 'Cottonblended sandwash 80% katun & 20% polyester: adem, lembut, lebih kokoh, tidak nerawang. Tiap warna punya tekstur kain yang berbeda.',
      colors: [
        c('Buttercream', '#E6DCC8', 'krem', 'zen-buttercream'),
        c('Cool Grey', '#CFCBC3', 'abu', 'zen-cool-grey'),
        c('Peach Dust', '#EBCFC6', 'pink', 'zen-peach-dust'),
        c('Baby Blue', '#93AFCB', 'biru', 'zen-baby-blue'),
        c('Sage Green', '#97A784', 'hijau', 'zen-sage-green'),
        c('Soft Orange', '#C98A45', 'oranye', 'zen-soft-orange'),
        c('Cocoa', '#8A5A3B', 'cokelat', 'zen-warna-gelap'),
        c('Hazelnut Brown', '#5C3B2E', 'cokelat', 'zen-warna-gelap'),
        c('Gray White', '#4D4F52', 'abu', 'zen-warna-gelap')],
      gallery: ['zen-semua', 'zen-pastel', 'zen-warna-gelap', 'zen-detail-1', 'zen-detail-2'],
      sizeChart: 'zen-size'
    },
    otba: {
      id: 'otba', name: 'Otba Abaya 2in1', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cotton-sandwash', bahanLabel: 'Cotton Sandwash Embossed',
      price: 479000, priceNote: 'All Size', sizes: ['ALL'], urut: 11, baru: false, mlf: true,
      tagline: 'Outer Abaya 2in1: Casual & Formal',
      desc: 'Otba (Outer Abaya) bisa dipakai sebagai abaya maupun outer, cocok untuk tampilan casual dan formal. Kerah formal, full kancing hidup, dan cuttingan semi batwing dengan detail V di ujung lengan.',
      features: [['Wudhu & Bumil Friendly', 'Lengan berkancing dan potongan longgar, nyaman untuk wudhu dan ibu hamil.'],
        ['Busui Kancing', 'Full kancing hidup di bagian depan, ramah ibu menyusui.'],
        ['Saku Dalam Kanan-Kiri', 'Saku tersembunyi untuk barang kecil.']],
      material: 'Cotton sandwash bertekstur timbul (embossed): lembut, lentur, ketebalan pas, breathable, menyerap keringat, dan tidak menerawang.',
      colors: [
        c('Terracotta', '#C2553F', 'oranye', 'otba-terracotta'),
        c('Burnt Apricot', '#D27A5A', 'oranye', 'otba-burnt-apricot'),
        c('Blue', '#3F6FB5', 'biru', 'otba-blue'),
        c('Black', '#22282B', 'hitam', 'otba-black')],
      gallery: ['otba-semua', 'otba-layer', 'otba-detail-1', 'otba-detail-2'],
      sizeChart: 'otba-size'
    },
    mozaic: {
      id: 'mozaic', name: 'Mozaic Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cupro-jacquard', bahanLabel: 'Cupro Jacquard',
      price: 679000, priceNote: 'XS–XL', sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 12, baru: false,
      tagline: 'Casual Abaya, Simple & Stylish',
      desc: 'Abaya harian yang simple dan stylish. Round neck, zipper busui, lengan loose, tali belt di kanan-kiri, dan cuttingan semi batwing dengan logo rose gold.',
      features: [['Zipper Busui', 'Resleting depan yang ramah ibu menyusui.'],
        ['Tali Belt Kanan-Kiri', 'Siluet bisa disesuaikan, longgar atau sedikit dibentuk.'],
        ['Saku Dalam Kanan-Kiri', 'Saku tersembunyi untuk barang kecil.']],
      material: 'Cupro jacquard bertekstur timbul (embossed): karakter kain kokoh, halus, ketebalan pas, tidak mudah kusut, dan breathable.',
      colors: [
        c('Purple Dove', '#7A6874', 'ungu', 'mozaic-purple-dove'),
        c('Plum Perfect', '#4A3040', 'ungu', 'mozaic-plum-perfect'),
        c('Moza Hot Fudge', '#6A5A50', 'cokelat', 'mozaic-moza-hot-fudge'),
        c('Moza Dessert Taupe', '#8C7B6A', 'cokelat', 'mozaic-moza-dessert-taupe'),
        c('Moza Black', '#2B2B2D', 'hitam', 'mozaic-moza-black'),
        c('Hot Fudge', '#66574E', 'cokelat', 'mozaic-hot-fudge'),
        c('Dessert Taupe', '#9A8A78', 'cokelat', 'mozaic-dessert-taupe'),
        c('Black', '#232325', 'hitam', 'mozaic-black')],
      gallery: ['mozaic-semua', 'mozaic-semua-2', 'mozaic-detail-1', 'mozaic-detail-2'],
      sizeChart: 'mozaic-size'
    },
    zhaa: {
      id: 'zhaa', name: 'Pastan Zhaa', cat: 'bergo-tali', catLabel: 'Bergo Tali',
      bahan: 'yaviya-anti-uv', bahanLabel: 'Yaviya Anti UV',
      price: 189000, priceNote: 'Mini (S) • Medium (M)', sizes: ['S', 'M'], urut: 6, baru: false, mlf: true,
      tagline: 'Bergo Tali Blending (Khimar Bandana)',
      desc: 'Bergo tali blending dengan cuttingan asimetris. Bahan Yaviya Anti UV yang lembut, halus, dan ringan, dengan handfeel dingin dan jatuh cantik saat dipakai.',
      features: [['Anti UV', 'Bahan Yaviya Anti UV untuk aktivitas di luar ruangan.'],
        ['Handfeel Dingin', 'Lembut, halus, ringan, dan flowy.'],
        ['Dua Ukuran', 'Mini (S) dan Medium (M) dengan cuttingan asimetris.']],
      material: 'Yaviya Anti UV: tekstur lembut, halus, dan ringan. Handfeel dingin, flowy, dan bahan lebih kokoh.',
      colors: [
        c('Summer Sand', '#D8C8B4', 'krem', 'zhaa-summer-sand'),
        c('Icy Pink', '#E2BFD0', 'pink', 'zhaa-icy-pink'),
        c('Butter Yellow', '#E9DEC0', 'krem', 'zhaa-butter-yellow'),
        c('Light Gray', '#BFC2CE', 'abu', 'zhaa-light-gray'),
        c('Sage', '#A9B395', 'hijau', 'zhaa-sage'),
        c('Olive', '#A6A26C', 'hijau', 'zhaa-olive'),
        c('Deep Mahogany', '#4E2128', 'cokelat', 'zhaa-deep-mahogany'),
        c('Navy', '#26304A', 'biru', 'zhaa-navy'),
        c('Black', '#1F1F1F', 'hitam', 'zhaa-black')],
      gallery: ['zhaa-semua'],
      sizeChart: 'zhaa-size'
    },
    rubina: {
      id: 'rubina', name: 'French Square Rubina', cat: 'khimar-segi-empat', catLabel: 'Khimar Segi Empat',
      bahan: 'corn-skin-cotton', bahanLabel: 'Corn Skin Cotton',
      price: 189000, priceNote: 'S 140 • M 150 • L 160 cm', sizes: ['S', 'M', 'L'], urut: 9, baru: false, mlf: true,
      tagline: 'Khimar Segi Empat Bandana',
      desc: 'Khimar segi empat bandana dengan bahan corn skin cotton mix. Strukturnya lebih kokoh, minim kusut, adem, serta tahan lama.',
      features: [['Minim Kusut', 'Tidak perlu disetrika berlebihan.'],
        ['Tekstur Cornskin', 'Permukaan kain bergaris yang khas dan kokoh.'],
        ['Tiga Ukuran', 'S 140×140, M 150×150, dan L 160×160 cm.']],
      material: 'Corn skin cotton mix: tekstur permukaan bergaris (cornskin), struktur kain lebih kokoh, minim kusut, adem, tahan lama dan awet.',
      colors: [
        c('Hazelnut', '#B38A72', 'cokelat', 'rubina-hazelnut'),
        c('Wild Ginger', '#6E2E3A', 'cokelat', 'rubina-wild-ginger'),
        c('Plum Caspia', '#4E2740', 'ungu', 'rubina-plum-caspia'),
        c('Serenity Blue', '#6F93BE', 'biru', 'rubina-serenity-blue'),
        c('Polar Night', '#3B4559', 'biru', 'rubina-polar-night'),
        c('Black Meteorite', '#2A2A2C', 'hitam', 'rubina-black-meteorite'),
        c('Black', '#111111', 'hitam', 'rubina-black')],
      gallery: ['rubina-semua', 'rubina-detail-1'],
      sizeChart: 'rubina-size'
    },
    zanera: {
      id: 'zanera', name: 'Berlin Zanera', cat: 'bergo-tali', catLabel: 'Bergo Tali',
      bahan: 'halhena-glitter', bahanLabel: 'Halhena Glitter',
      price: 219000, priceMax: 239000, priceNote: 'Kecil (Shoulder) Rp219.000 • Besar (Berlin) Rp239.000',
      sizes: ['KECIL', 'BESAR'], urut: 8, baru: false, mlf: true,
      tagline: 'Bergo Tali Blending (Khimar Bandana)',
      desc: 'Bergo tali blending dengan dua tipe cuttingan: shoulder (belakang oval, kecil) dan runcing (sedikit lebih besar). Tersedia dalam tampilan glitter dan matte.',
      features: [['Efek Glitter', 'Kilau halus yang tetap elegan.'],
        ['Dua Cuttingan', 'Shoulder (oval) dan Berlin (runcing).'],
        ['Warna Awet', 'Warna tidak mudah kusam.']],
      material: 'Halhena Glitter: efek glitter pada kain, tekstur lembut dan jatuh, medium weight, tidak terlalu kaku, dan warna tidak mudah kusam.',
      colors: [
        c('Navy', '#22324F', 'biru', 'zanera-navy'),
        c('Blush Pink', '#D9A6AE', 'pink', 'zanera-blush-pink'),
        c('Soft Peach', '#E8C8B6', 'pink', 'zanera-soft-peach'),
        c('Soft Blue', '#A9C6E0', 'biru', 'zanera-soft-blue'),
        c('Basil Green', '#7FA88E', 'hijau', 'zanera-basil-green'),
        c('Macchiato', '#9C7656', 'cokelat', 'zanera-macchiato'),
        c('Dove', '#A8A8A6', 'abu', 'zanera-dove'),
        c('Black', '#1F1F1F', 'hitam', 'zanera-black')],
      gallery: ['zanera-semua', 'zanera-detail-1'],
      sizeChart: 'zanera-size'
    },

    // ===== Update Sep–Okt 2026 (Telegram_Assets/08_Update_Sep-Okt_2026) =====
    hawa: {
      id: 'hawa', name: 'Hawa Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cotton-sandwash-tekstur', bahanLabel: 'Cotton Sandwash Tekstur',
      price: 499000, priceMax: 519000, priceNote: 'XS–M Rp499.000 • L–XL Rp519.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 0, baru: true,
      tagline: 'Timeless Elegance • Casual • Versatile',
      desc: 'Abaya V neck dengan fitted sleeves dan sulaman (embroidery) yang anggun. Bahan cotton sandwash bertekstur dengan washed look yang matte, adem, dan jatuh.',
      features: [['Zipper Busui', 'Resleting depan yang ramah ibu menyusui.'],
        ['Detail Embroidery', 'Sulaman cantik yang membuat tampilan lebih istimewa.'],
        ['Saku Kanan', 'Saku praktis untuk barang kecil.']],
      material: 'Cotton sandwash tekstur: lembut dan berbulu halus, washed look, karakter bahan jatuh, matte (tidak mengkilap), adem dan berserat alami, ketebalan pas.',
      colors: [
        c('Peony Pink', '#DFA1A2', 'pink', 'foto/produk-hawa-peony-pink'),
        c('Blue Azure', '#577FB2', 'biru', 'foto/produk-hawa-blue-azure'),
        c('Khaki', '#C7BB95', 'krem', 'foto/produk-hawa-khaki'),
        c('Charcoal', '#2F3237', 'abu', 'foto/produk-hawa-charcoal')],
      gallery: ['foto/look-hawa-grup', 'foto/look-hawa-peony-pink', 'foto/look-hawa-charcoal', 'hawa-semua', 'hawa-detail-1', 'hawa-detail-2'],
      sizeChart: 'hawa-size'
    },
    karaz: {
      id: 'karaz', name: 'Karaz Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cupro-raw-silk', bahanLabel: 'Cupro Raw Silk',
      price: 479000, priceMax: 499000, priceNote: 'XS–M Rp479.000 • L–XL Rp499.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 1, baru: true,
      tagline: 'Elegant & Feminine',
      desc: 'Abaya berkerah formal dengan lengan formal, hidden pocket, dan sulaman embroidery. Cuttingan semi batwing yang elegan dan feminin.',
      features: [['Zipper Busui', 'Resleting depan yang ramah ibu menyusui.'],
        ['Hidden Pocket', 'Saku tersembunyi yang rapi.'],
        ['Detail Embroidery', 'Sulaman yang memberi kesan elegan.']],
      material: 'Cupro raw silk: breathable, nyaman di kulit, halus, ringan, ketebalan pas, tidak menerawang, permukaan kain sedikit mengkilap, dan flowy.',
      colors: [
        c('Moonlight Blue', '#4F6891', 'biru', 'karaz-moonlight-blue'),
        c('Pale Mauve', '#A77F88', 'ungu', 'karaz-pale-mauve'),
        c('Forest Biome', '#0A3E3C', 'hijau', 'karaz-forest-biome')],
      gallery: ['karaz-semua', 'karaz-semua-2', 'karaz-detail-1', 'karaz-detail-2'],
      sizeChart: 'karaz-size'
    },
    hanna: {
      id: 'hanna', name: 'Hanna Abaya V.2', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cotton-mix-rayon', bahanLabel: 'Cotton Mix Rayon',
      price: 319000, priceNote: 'S–M', sizes: ['S', 'M'], urut: 2, baru: true,
      tagline: 'Abaya dengan Ruffle Cantik di Belakang',
      desc: 'Abaya cuttingan dress dengan ruffle (rample) di bagian belakang yang cantik. Round neck, akses busui zipper, akses wudhu loose, dan saku kanan & kiri.',
      features: [['Akses Wudhu Loose', 'Lengan longgar sehingga mudah digulung saat berwudhu.'],
        ['Akses Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'],
        ['Saku Kanan & Kiri', 'Dua saku fungsional.']],
      material: 'Cotton mix rayon: breathable, lembut, ringan, tidak menerawang, dan flowy.',
      colors: [
        c('Laurel Wreath', '#879886', 'hijau', 'foto/produk-hanna-v2-laurel-wreath'),
        c('Navy', '#262A43', 'biru', 'foto/produk-hanna-v2-navy'),
        c('Gray Lilac', '#8E818A', 'ungu', 'foto/produk-hanna-v2-gray-lilac')],
      gallery: ['foto/look-hanna-v2-navy', 'foto/look-hanna-v2-gray-lilac', 'hanna-v2-semua', 'hanna-v2-detail-1', 'hanna-v2-detail-2'],
      sizeChart: 'hanna-v2-size'
    },
    zela: {
      id: 'zela', name: 'Berlin Zela', cat: 'bergo-tali', catLabel: 'Bergo Tali',
      bahan: 'marbella-shopia-crinkle', bahanLabel: 'Marbella, Shopia & Crinkle',
      price: 119000, priceMax: 199000, priceNote: 'Marbella/Shopia S Rp179.000 • M Rp199.000 — Crinkle S Rp119.000 • M Rp139.000',
      sizes: ['S', 'M'], urut: 3, baru: true,
      tagline: 'Bergo Tali Blending (Khimar Bandana)',
      desc: 'Bergo tali blending dalam tiga pilihan bahan: marbella anti UV, shopia anti UV, dan crinkle. Tersedia ukuran S dan M.',
      features: [['Marbella Anti UV', 'Halus, adem, klemer, tidak nerawang.'],
        ['Shopia Anti UV', 'Handfeel dingin, agak stretchy, jatuh, tidak nerawang.'],
        ['Crinkle', 'Ringan, sedikit bertekstur, tidak menerawang.']],
      material: 'Marbella anti UV (halus, adem, klemer), Shopia anti UV (handfeel dingin, agak stretchy, jatuh), dan Crinkle (ringan, sedikit bertekstur). Semuanya tidak menerawang.',
      colors: [
        c('Black (Marbella)', '#201F24', 'hitam', 'berlin-zela-black-marbella'),
        c('Blackberry Glam', '#3E3344', 'ungu', 'berlin-zela-blackberry-glam'),
        c('Khaki', '#CDB9A8', 'krem', 'berlin-zela-khaki'),
        c('Blush Pink', '#D4B5B3', 'pink', 'berlin-zela-blush-pink'),
        c('Burnt Clay', '#904035', 'oranye', 'berlin-zela-burnt-clay'),
        c('Black (Crinkle)', '#232730', 'hitam', 'berlin-zela-black-crinkle'),
        c('White (Crinkle)', '#ECEAEA', 'krem', 'berlin-zela-white-crinkle')],
      gallery: ['berlin-zela-semua', 'berlin-zela-semua-2'],
      sizeChart: 'berlin-zela-size'
    },
    ruwa: {
      id: 'ruwa', name: 'Ruwa Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cotton-mix-nylon', bahanLabel: 'Cotton Mix Nylon',
      price: 399000, priceMax: 419000, priceNote: 'XS–M Rp399.000 • L–XL Rp419.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 4, baru: true,
      tagline: 'Definition of Perfect Comfort',
      desc: 'Abaya round neck dengan lengan loose dan sulaman cornely embroidery. Cuttingan semi batwing yang nyaman dipakai seharian.',
      features: [['Zipper Busui', 'Resleting depan yang ramah ibu menyusui.'],
        ['Cornely Embroidery', 'Detail sulaman yang manis dan rapi.'],
        ['Saku Dalam Kanan', 'Saku tersembunyi untuk barang kecil.']],
      material: 'Cotton mix nylon: kuat dan tahan lama, adem dan nyaman di kulit, halus, ringan dan kokoh, ketebalan pas, tidak mudah kusut, permukaan kain sedikit mengkilap.',
      colors: [
        c('Butterscotch', '#AF7F4F', 'cokelat', 'foto/produk-ruwa-butterscotch'),
        c('Pale Teal', '#687D76', 'hijau', 'foto/produk-ruwa-pale-teal'),
        c('Burnt Olive', '#5D5A49', 'hijau', 'ruwa-burnt-olive'),
        c('Navy', '#1B2735', 'biru', 'foto/produk-ruwa-navy'),
        c('Black', '#1D2527', 'hitam', 'foto/produk-ruwa-black')],
      gallery: ['foto/look-ruwa-grup', 'ruwa-semua', 'ruwa-detail-1', 'ruwa-detail-2'],
      sizeChart: 'ruwa-size'
    },
    ara: {
      id: 'ara', name: 'Ara Abaya', cat: 'abaya', catLabel: 'Abaya',
      bahan: 'cotton-mix-nylon', bahanLabel: 'Cotton Mix Nylon',
      price: 399000, priceMax: 419000, priceNote: 'XS–M Rp399.000 • L–XL Rp419.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'], urut: 5, baru: true,
      tagline: 'Timeless Elegance • Casual • Versatile',
      desc: 'Abaya round neck dengan lengan loose dan sulaman cornely embroidery. Simpel, serbaguna, dan tetap anggun.',
      features: [['Zipper Busui', 'Resleting depan yang ramah ibu menyusui.'],
        ['Cornely Embroidery', 'Detail sulaman yang manis dan rapi.'],
        ['Saku Dalam Kanan', 'Saku tersembunyi untuk barang kecil.']],
      material: 'Cotton mix nylon: kuat dan tahan lama, adem dan nyaman di kulit, halus, ringan dan kokoh, ketebalan pas, tidak mudah kusut, permukaan kain sedikit mengkilap.',
      colors: [
        c('Sage Green', '#8A977B', 'hijau', 'foto/produk-ara-sage-green'),
        c('Almond', '#9C6A45', 'cokelat', 'foto/produk-ara-almond'),
        c('Butter Yellow', '#E5D3A1', 'krem', 'foto/produk-ara-butter-yellow'),
        c('Baby Powder', '#DFDFD7', 'krem', 'ara-baby-powder'),
        c('Black', '#23282C', 'hitam', 'foto/produk-ara-black')],
      gallery: ['foto/look-ara-grup', 'foto/look-ara-kolase', 'ara-semua', 'ara-detail-1', 'ara-detail-2'],
      sizeChart: 'ara-size'
    },

    // ===== Launching Muslim Life Fest 2026 yang belum ada di website =====
    bzhaa: {
      id: 'bzhaa', name: 'Berlin Zhaa', cat: 'bergo-tali', catLabel: 'Bergo Tali',
      bahan: 'yaviya-anti-uv', bahanLabel: 'Yaviya Anti UV',
      price: 219000, priceMax: 259000, priceNote: 'S Rp219.000 • M Rp259.000', sizes: ['S', 'M'], urut: 7, baru: false, mlf: true,
      tagline: 'Bergo Tali Blending (Khimar Bandana)',
      desc: 'Bergo tali blending berbahan Yaviya Anti UV yang lembut, halus, dan ringan, dengan handfeel dingin dan jatuh cantik saat dipakai.',
      features: [['Anti UV', 'Bahan Yaviya Anti UV untuk aktivitas di luar ruangan.'],
        ['Handfeel Dingin', 'Lembut, halus, ringan, dan flowy.'],
        ['Dua Ukuran', 'S dan M.']],
      material: 'Yaviya Anti UV: tekstur lembut, halus, dan ringan. Handfeel dingin, flowy, dan bahan lebih kokoh.',
      colors: [
        c('Navy', '#26304A', 'biru', 'bzhaa-navy'), c('Icy Pink', '#E2BFD0', 'pink', 'bzhaa-icy-pink'),
        c('Black', '#1F1F1F', 'hitam', 'bzhaa-black'), c('Summer Sand', '#D8C8B4', 'krem', 'bzhaa-summer-sand'),
        c('Butter Yellow', '#E9DEC0', 'krem', 'bzhaa-butter-yellow'), c('Sage', '#A9B395', 'hijau', 'bzhaa-sage'),
        c('Deep Mahogany', '#4E2128', 'cokelat', 'bzhaa-deep-mahogany'), c('Olive', '#A6A26C', 'hijau', 'bzhaa-olive'),
        c('Light Gray', '#BFC2CE', 'abu', 'bzhaa-light-gray')],
      gallery: ['bzhaa-semua', 'bzhaa-semua-2'],
      sizeChart: 'bzhaa-size'
    },
    binar: {
      id: 'binar', name: 'Pastan Binar', cat: 'pashmina-instan', catLabel: 'Pashmina Instan',
      bahan: 'cornskin-viscose', bahanLabel: 'Cornskin Viscose',
      price: 189000, priceMax: 219000, priceNote: 'All Size Rp189.000 • Khusus Black Rp219.000', sizes: ['ALL'], urut: 10, baru: false, mlf: true,
      tagline: 'Pashmina Instan Bandana',
      desc: 'Pashmina instan bandana dengan cuttingan asimetris. Bahan cornskin viscose yang jatuh fleksibel, adem, tidak licin, dan tidak perlu disetrika berlebihan.',
      features: [['Cuttingan Asimetris', 'Jatuh cantik dan praktis dipakai.'],
        ['Tidak Licin', 'Mudah dibentuk dan tetap rapi.'],
        ['Minim Setrika', 'Tidak perlu disetrika berlebihan.']],
      material: 'Cornskin viscose: tekstur permukaan bergaris (cornskin), jatuh fleksibel, ketebalan pas, adem, tidak licin.',
      colors: [
        c('Orchid Petal', '#B5A0BF', 'ungu', 'binar-orchid-petal'), c('Dusty Pink', '#DCC3C9', 'pink', 'binar-dusty-pink'),
        c('Candy Pink', '#F1C1CD', 'pink', 'binar-candy-pink'), c('Baked Clay', '#CB7E74', 'oranye', 'binar-baked-clay'),
        c('Apricot Tan', '#D89C68', 'oranye', 'binar-apricot-tan'), c('Black', '#23262B', 'hitam', 'binar-black'),
        c('Black Robe', '#28272C', 'hitam', 'binar-black-robe')],
      gallery: ['binar-semua', 'binar-detail-1', 'binar-detail-2'],
      sizeChart: 'binar-size'
    }
  };

  // ---------- Koleksi arsip (Telegram_Assets/09_Pelengkap + 00_Deskripsi_Produk) ----------
  // sizePrice: harga per ukuran/varian; sizeLabels: label tombol ukuran; sizeTable: tabel ukuran (cm) bila tidak ada gambar size chart.
  var A6 = ['Lingkar Dada', 'Lingkar Lengan', 'Lingkar Pergelangan', 'Panjang Produk', 'Panjang Lengan', 'Lingkar Bawah'];
  var K4 = ['Lingkar Wajah', 'Panjang Depan', 'Panjang Belakang', 'Panjang Samping'];
  var F = 'foto/arsip-';
  // warna tanpa foto sendiri memakai foto utama produk
  function cs(list, def) { return list.map(function (x) { return c(x[0], x[1], x[2], x[3] ? F + x[3] : F + def); }); }
  var ARSIP = {
    zafeera: {
      name: 'Berlin Zafeera', cat: 'bergo-tali', catLabel: 'Bergo Tali', bahan: 'zafeera-anti-uv', bahanLabel: 'Zafeera Anti UV',
      price: 259000, priceMax: 279000, priceNote: 'Shoulder Rp259.000 • Split Rp279.000 • +Cadar Rp29.000',
      sizes: ['SHOULDER', 'SPLIT'], sizeLabels: { SHOULDER: 'Shoulder', SPLIT: 'Split' }, sizePrice: { SHOULDER: 259000, SPLIT: 279000 },
      tagline: 'Berlin 2 Model: Shoulder & Split',
      desc: 'Dua jenis berlin yang siap menemani setiap abayamu. Model Shoulder dengan panjang samping sebahu, model Split lebih panjang dengan cuttingan depan-belakang runcing. Tanpa segitiga dagu.',
      features: [['Anti UV', 'Material Zafeera melindungi saat beraktivitas di luar ruangan.'], ['Tidak Mudah Kusut', 'Flowy, lembut, dan handfeel dingin.'], ['Dua Model', 'Shoulder (sebahu) atau Split (lebih panjang), bisa tambah cadar.']],
      material: 'Zafeera Anti UV: handfeel dingin, flowy, lembut, dan tidak mudah kusut.',
      colors: cs([['Cinnamon', '#6E4433', 'cokelat'], ['Woodrose', '#A8746E', 'pink'], ['Creole Pink', '#E0BDB3', 'pink'], ['Petal Pink', '#E8C6C4', 'pink'], ['Tortilla', '#B99572', 'cokelat'],
        ['Irish Cream', '#E6D5BC', 'krem'], ['Cotton Lilac', '#C7B8D0', 'ungu'], ['Dove', '#B5ADA4', 'abu'], ['Light Grey', '#C9C9C6', 'abu'], ['Blue Marine', '#3E5A7E', 'biru'],
        ['Navy', '#1E2A44', 'biru'], ['Burn Clay', '#9C5A44', 'oranye'], ['Burgundy', '#5E1E2D', 'ungu'], ['Moon Grape', '#584A5C', 'ungu'], ['Black', '#1F1F21', 'hitam']], 'berlin-zafeera-cinnamon'),
      gallery: [F + 'berlin-zafeera-cinnamon'],
      sizeTable: { cols: K4, rows: [['Shoulder', 64, 75, 125, 50], ['Split', 64, 92, 150, 60]] }
    },
    jannah: {
      name: 'Pastan Jannah', cat: 'pashmina-instan', catLabel: 'Pashmina Instan', bahan: 'maheen', bahanLabel: 'Maheen Anti UV',
      price: 159000, priceMax: 189000, priceNote: 'Kecil Rp159.000 • Besar Rp189.000',
      sizes: ['KECIL', 'BESAR'], sizeLabels: { KECIL: 'Kecil', BESAR: 'Besar' },
      tagline: 'Pashmina Instan Bandana',
      desc: 'Pashmina instan model bandana yang praktis, langsung pakai tanpa peniti. Bahan Maheen anti UV yang ringan dan flowy dengan pilihan warna yang sangat lengkap.',
      features: [['Instan', 'Model bandana, langsung pakai tanpa ribet.'], ['Anti UV', 'Lembut, halus, ringan, dan handfeel dingin.'], ['Dua Ukuran', 'Kecil (150 cm) dan Besar (180 cm).']],
      material: 'Maheen Anti UV: lembut, halus, ringan, handfeel dingin, dan flowy.',
      colors: cs([['Cashmere Blue', '#A9B5C6', 'biru', 'pastan-jannah-cashmere-blue'], ['Maroon', '#5E1F27', 'ungu', 'pastan-jannah-maroon'], ['Lint', '#BDB79F', 'krem', 'khimar-earth-tone'],
        ['Dried Herb', '#8A8B6A', 'hijau', 'khimar-earth-tone'], ['Pecan Brown', '#7A5238', 'cokelat', 'khimar-earth-tone'], ['Roasted Coffee', '#5A3F31', 'cokelat', 'khimar-earth-tone'],
        ['Dark Choco', '#3D2B24', 'cokelat', 'khimar-earth-tone'], ['Petal Pink', '#E8C6C4', 'pink'], ['Rose', '#C98D8B', 'pink'], ['Blossom', '#D9A7A6', 'pink'], ['Mauve', '#9E7A82', 'ungu'],
        ['Burgundy', '#5E1E2D', 'ungu'], ['Meringue', '#EDE3D1', 'krem'], ['Oatmilk', '#DCCFB8', 'krem'], ['Tortilla', '#B99572', 'cokelat'], ['Pale Khaki', '#CBBF9E', 'krem'],
        ['Blue Marine', '#3E5A7E', 'biru'], ['Navy', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam']], 'pastan-jannah-warna'),
      gallery: [F + 'khimar-earth-tone', F + 'pastan-jannah-warna', F + 'pastan-jannah-cashmere-blue', F + 'pastan-jannah-maroon'],
      sizeTable: { cols: ['Lingkar Wajah', 'Panjang', 'Lebar'], rows: [['Kecil', 60, 150, 75], ['Besar', 60, 180, 90]] }
    },
    npjannah: {
      name: 'Nonpad Jannah', cat: 'khimar', catLabel: 'Khimar', bahan: 'maheen', bahanLabel: 'Maheen Anti UV',
      price: 219000, priceNote: 'All Size', sizes: ['ALL'],
      tagline: 'Nonpad dengan Cuttingan Runcing',
      desc: 'Nonpad 1 layer dengan 1 jahitan tepi dan cuttingan runcing. Langsung pakai, membuat tampilan terlihat lebih langsing.',
      features: [['Langsung Pakai', 'Nonpad tanpa pad, praktis untuk harian.'], ['Anti UV', 'Bahan Maheen yang ringan dan flowy.'], ['Cuttingan Runcing', 'Membuat siluet tampak lebih ramping.']],
      material: 'Maheen Anti UV: lembut, halus, ringan, handfeel dingin, dan flowy.',
      colors: cs([['Mauve', '#9E7A82', 'ungu'], ['Shell', '#E6D9CC', 'krem'], ['Blossom', '#D9A7A6', 'pink'], ['Cream Sand', '#D8C6AA', 'krem'], ['Pecan Brown', '#7A5238', 'cokelat'],
        ['Lint', '#BDB79F', 'krem'], ['Dried Herb', '#8A8B6A', 'hijau'], ['Maroon', '#5E1F27', 'ungu'], ['Moon Grape', '#584A5C', 'ungu'], ['Navy', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam']], 'np-jannah-mauve'),
      gallery: [F + 'np-jannah-mauve', 'foto/look-khimar-mauve'],
      sizeTable: { cols: K4, rows: [['All Size', 52, 108, 130, 75]] }
    },
    yumna: {
      name: 'FK & Nonpad Yumna', cat: 'khimar', catLabel: 'Khimar', bahan: 'ilyana-silk', bahanLabel: 'Ilyana Silk',
      price: 209000, priceMax: 219000, priceNote: 'French Khimar Rp219.000 • Nonpad Rp209.000',
      sizes: ['FK', 'NONPAD'], sizeLabels: { FK: 'French Khimar', NONPAD: 'Nonpad' }, sizePrice: { FK: 219000, NONPAD: 209000 },
      tagline: 'Khimar Pendamping Yumna Abaya',
      desc: 'Tersedia dalam dua model: French Khimar bertali yang bisa disesuaikan dengan lingkar kepala, dan Nonpad dengan 1 tepi jahitan. Serasi dipadukan dengan Yumna Abaya.',
      features: [['Tali Fleksibel', 'FK dengan tali yang bebas disesuaikan.'], ['Tidak Nerawang', 'Ilyana Silk yang adem dan ringan.'], ['Dua Model', 'Pilih French Khimar atau Nonpad.']],
      material: 'Ilyana Silk: lembut, halus, agak stretchy, handfeel dingin, adem, tidak nerawang, dan ringan.',
      colors: cs([['After Dark', '#6B5F5A', 'cokelat'], ['Burgundy', '#5E1E2D', 'ungu'], ['Chocolate Plum', '#4E3437', 'ungu'], ['Chocolate Brown', '#5B3E2E', 'cokelat'],
        ['Espresso', '#3B2A22', 'cokelat'], ['Black', '#1F1F21', 'hitam'], ['Navy', '#1E2A44', 'biru']], 'fk-yumna-after-dark'),
      gallery: [F + 'fk-yumna-after-dark', F + 'trio-mocca'],
      sizeTable: { cols: K4, rows: [['French Khimar', 64, 105, 145, 60], ['Nonpad', 54, 120, 140, 75]] }
    },
    yumnaabaya: {
      name: 'Yumna Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'ilyana-silk', bahanLabel: 'Ilyana Silk',
      price: 279000, priceMax: 299000, priceNote: 'XS–M Rp279.000 • L–XL Rp289.000 • XXL Rp299.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], sizePrice: { L: 289000, XL: 289000, XXL: 299000 },
      tagline: 'Abaya dengan Kerut Karet di Lengan',
      desc: 'Abaya round neck dengan desain kerut karet di bagian lengan. Akses busui zipper, saku depan kanan-kiri, dan lengan berkancing. Tersedia hingga ukuran XXL.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Lengan Berkancing', 'Kerut karet cantik dan mudah untuk wudhu.'], ['Saku Kanan & Kiri', 'Saku depan untuk barang kecil.']],
      material: 'Ilyana Silk: lembut, halus, agak stretchy, handfeel dingin, adem, tidak nerawang, dan ringan.',
      colors: cs([['Chocolate Brown', '#5B3E2E', 'cokelat'], ['After Dark', '#6B5F5A', 'cokelat', 'trio-mocca'], ['Burgundy', '#5E1E2D', 'ungu'], ['Chocolate Plum', '#4E3437', 'ungu'],
        ['Espresso', '#3B2A22', 'cokelat'], ['Black', '#1F1F21', 'hitam'], ['Navy', '#1E2A44', 'biru']], 'abaya-mocca'),
      gallery: [F + 'abaya-mocca', F + 'trio-mocca'],
      sizeTable: { cols: A6, rows: [['XS', 148, 34, 18, 132, 65, 224], ['S', 152, 38, 18, 135, 65, 232], ['M', 164, 38, 18, 138, 67, 232], ['L', 168, 44, 22, 140, 67, 242], ['XL', 168, 48, 22, 145, 70, 246], ['XXL', 168, 48, 22, 150, 70, 246]] }
    },
    freia: {
      name: 'Freia Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'shiny-cotton-print', bahanLabel: 'Shiny Cotton Print',
      price: 299000, priceNote: 'Semua ukuran Rp299.000',
      sizes: ['XS-S', 'M-L', 'XL'], sizeLabels: { 'XS-S': 'XS–S', 'M-L': 'M–L' },
      tagline: 'Abaya Cotton Silk dengan Printing Tie-dye',
      desc: 'Abaya cotton silk yang mewah dengan printing tie-dye. Cuttingan bisht, akses busui zipper, akses wudhu loose, dan saku kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Wudhu Loose', 'Lengan longgar, mudah digulung saat wudhu.'], ['Motif Tie-dye', 'Agak berkilau saat terkena cahaya.']],
      material: 'Shiny Cotton Print: flowy, adem, dan agak shiny jika terkena cahaya.',
      colors: cs([['Satin Chemise', '#D9C3BC', 'pink'], ['Lavender Gray', '#A9A2B4', 'ungu'], ['Lead Crystal', '#8B8F96', 'abu'], ['Rose Gold', '#C99A8B', 'pink'], ['Golden Eagle', '#B08A52', 'cokelat'],
        ['Eucalyptus', '#8FA393', 'hijau'], ['Shadow Sheen', '#6E6A6B', 'abu'], ['Silver Shadow', '#B9BBBD', 'abu'], ['Glass Sea', '#7FA3A6', 'biru']], 'freia-satin-chemise'),
      gallery: [F + 'freia-satin-chemise', F + 'freia-detail'],
      sizeTable: { cols: A6, rows: [['XS–S', 156, 40, 34, 135, 70, 212], ['M–L', 156, 46, 40, 138, 72, 216], ['XL', 164, 46, 42, 145, 73, 220]] }
    },
    mecca: {
      name: 'Mecca Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'jetblack-mta', bahanLabel: 'Jetblack MTA & Brukat',
      price: 349000, priceMax: 359000, priceNote: 'XS–M Rp349.000 • L–XL Rp359.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya Bisht Hitam dengan Aksen Motif',
      desc: 'Abaya bisht hitam dipadukan dengan brukat atau cotton etnik di bagian lengan dan saku. Round neck, akses busui kancing, dan wudhu friendly zipper.',
      features: [['Busui Kancing', 'Kancing depan yang ramah ibu menyusui.'], ['Wudhu Zipper', 'Resleting di lengan untuk akses wudhu.'], ['Mix Motif', 'Pilihan aksen brukat atau cotton etnik.']],
      material: 'Jetblack MTA hitam pekat, serat padat, ringan, tidak nerawang. Aksen brukat (halus di dalam, bertekstur di luar) atau cotton etnik (stretchy).',
      colors: cs([['Cotton Etnik', '#2A2624', 'hitam'], ['Brukat', '#1F1F21', 'hitam']], 'mecca-nonpad-jeba'),
      gallery: [F + 'mecca-nonpad-jeba'],
      sizeTable: { cols: A6, rows: [['XS', 140, 32, 20, 130, 74, 250], ['S', 144, 36, 20, 135, 74, 256], ['M', 148, 36, 22, 138, 74, 270], ['L', 156, 38, 22, 140, 77, 272], ['XL', 158, 40, 24, 145, 77, 280]] }
    },
    noora: {
      name: 'Noora Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'mazza-cupro', bahanLabel: 'Mazza Cupro',
      price: 529000, priceMax: 549000, priceNote: 'XS–M Rp529.000 • L–XL Rp549.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya Natural Fabric dengan Aksen Opnaisel',
      desc: 'Abaya natural fabric dengan aksen opnaisel yang manis namun tetap simple. Cuttingan bisht, round neck, akses busui zipper, akses wudhu loose dengan kancing cetet, dan saku kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Wudhu Friendly', 'Lengan loose dengan kancing cetet.'], ['Anti UV', 'Handfeel dingin dan menyerap keringat.']],
      material: 'Mazza Cupro: anti UV, handfeel dingin, lembut, dan menyerap keringat.',
      colors: cs([['Plum', '#6E5363', 'ungu'], ['Dark Mocha', '#5A4438', 'cokelat'], ['Nude', '#D6BBA6', 'krem'], ['Beige', '#D9C9AE', 'krem'], ['Blush', '#D9AFA8', 'pink'],
        ['Asphalt', '#4A4A4C', 'abu'], ['Denim', '#4F6680', 'biru'], ['Navy', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam']], 'noora-plum'),
      gallery: [F + 'noora-plum'],
      sizeTable: { cols: A6, rows: [['XS', 132, 42, 34, 130, 69, 184], ['S', 140, 44, 36, 135, 73, 194], ['M', 152, 46, 36, 138, 76, 206], ['L', 156, 48, 38, 142, 78, 212], ['XL', 156, 50, 38, 145, 78, 214]] }
    },
    halia: {
      name: 'Halia Abaya V.3', cat: 'abaya', catLabel: 'Abaya', bahan: 'viscose-sahara', bahanLabel: 'Viscose Sahara',
      price: 429000, priceMax: 449000, priceNote: 'XS–M Rp429.000 • L–XL Rp449.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya Lengan Loose dengan Printing Motif',
      desc: 'Abaya lengan loose dengan printing motif yang cantik. Kerah shanghai, busui zipper, lengan loose dengan kancing cetet, serta saku kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Kerah Shanghai', 'Detail kerah yang rapi dan anggun.'], ['Sangat Adem', 'Viscose yang menyerap keringat.']],
      material: 'Viscose Sahara: sangat adem, menyerap keringat, halus, lembut, dan ringan.',
      colors: cs([['Khaki', '#A8A58A', 'hijau'], ['Quiet Gray', '#9EA3A8', 'abu', 'abaya-motif-grey'], ['Midnight Sky', '#2A3346', 'biru'], ['Denim Blue', '#4F6680', 'biru'], ['Deep Maroon', '#5A1F27', 'ungu'],
        ['Americano', '#5C4033', 'cokelat'], ['Sour', '#4B3F30', 'cokelat'], ['Prussian Blue', '#2E4A62', 'biru'], ['Otter Brown', '#6B4E3A', 'cokelat'], ['Chive Green', '#5E6B4A', 'hijau']], 'abaya-motif-sage'),
      gallery: [F + 'abaya-motif-sage', F + 'abaya-motif-grey'],
      sizeTable: { cols: A6, rows: [['XS', 132, 48, 48, 130, 66, 178], ['S', 136, 48, 48, 135, 70, 188], ['M', 140, 48, 48, 138, 72, 200], ['L', 150, 48, 48, 142, 74, 210], ['XL', 150, 48, 48, 145, 76, 220]] }
    },
    maira: {
      name: 'Maira Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'jeansweet', bahanLabel: 'Jeansweet & Alaska',
      price: 279000, priceMax: 299000, priceNote: 'XS–M Rp279.000 • L–XL Rp289.000 • XXL Rp299.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], sizePrice: { L: 289000, XL: 289000, XXL: 299000 },
      tagline: 'Abaya Jeans dengan Aksen Belt di Lengan',
      desc: 'Abaya bernuansa jeans dengan aksen belt di bagian lengan. Round neck, akses busui zipper, akses wudhu belt, dan saku depan kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Wudhu Belt', 'Belt di lengan memudahkan saat berwudhu.'], ['Kokoh & Ringan', 'Adem dan tidak nerawang.']],
      material: 'Jeansweet & Alaska: cukup ringan, adem, kokoh, dan tidak nerawang.',
      colors: cs([['Dark Denim', '#34465E', 'biru'], ['Navy Blue', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam'], ['Faded Grey', '#8C9196', 'abu']], 'dark-denim-navy'),
      gallery: [F + 'dark-denim-navy'],
      sizeTable: { cols: A6, rows: [['XS', 144, 36, 30, 133, 66, 156], ['S', 152, 38, 30, 135, 68, 160], ['M', 152, 40, 32, 138, 69, 166], ['L', 160, 44, 36, 140, 72, 174], ['XL', 160, 46, 36, 145, 72, 174], ['XXL', 160, 48, 38, 150, 73, 180]] }
    },
    seema: {
      name: 'Seema Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'lady-shafiyyah', bahanLabel: 'Lady Shafiyyah',
      price: 219000, priceMax: 229000, priceNote: 'XS–M Rp219.000 • L–XL Rp229.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya dengan Aksen Rampel Susun',
      desc: 'Abaya dengan aksen rampel susun dan tekstur kain yang unik, membuat penampilan lebih ciamik. Akses busui zipper, saku depan kanan-kiri, dan lengan loose.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Lengan Loose', 'Nyaman dan mudah untuk wudhu.'], ['Rampel Susun', 'Detail bertingkat yang manis.']],
      material: 'Lady Shafiyyah: halus di dalam, bertekstur salur di luar, ringan, adem, dan tidak nerawang.',
      colors: cs([['Black', '#1F1F21', 'hitam'], ['Navy', '#1E2A44', 'biru'], ['Grey', '#8E8F93', 'abu'], ['Caramel', '#A9744A', 'cokelat'], ['Honey Mustard', '#9A9468', 'hijau'], ['Dawn Cream', '#E5D7C0', 'krem']], 'seema-black-navy'),
      gallery: [F + 'seema-black-navy'],
      sizeTable: { cols: A6, rows: [['XS', 144, 38, 32, 130, 69, 160], ['S', 152, 38, 32, 135, 72, 184], ['M', 152, 38, 32, 138, 74, 186], ['L', 160, 42, 36, 140, 76, 188], ['XL', 160, 42, 36, 145, 80, 192]] }
    },
    syuura: {
      name: 'French Khimar Syuura', cat: 'khimar', catLabel: 'Khimar', bahan: 'ceruty-babydoll', bahanLabel: 'Ceruty Baby Doll Luxury',
      price: 179000, priceNote: 'All Size', sizes: ['ALL'],
      tagline: 'French Khimar 2 Layer yang Melangsingkan',
      desc: 'French khimar cantik 2 layer dengan cuttingan yang membuat tampilan terlihat langsing. Bagian belakang oval, bagian depan runcing.',
      features: [['2 Layer', 'Menutup sempurna dan tidak menerawang.'], ['Cuttingan Runcing', 'Depan runcing, belakang oval.'], ['Ceruty Premium', 'Serat lebih padat dari ceruty biasa.']],
      material: 'Ceruty Baby Doll Luxury: serat lebih padat dari ceruty biasa, bertekstur pasir, halus, jatuh, dan lembut.',
      colors: cs([['Mali Brown', '#6A4A3A', 'cokelat'], ['Summer Sand', '#D8C8B4', 'krem'], ['Roasted Cashew', '#B58F6E', 'cokelat'], ['Cream Pink', '#E6C8BE', 'pink'], ['Sunkiss', '#E2B08A', 'oranye'],
        ['Antler', '#8D7766', 'cokelat'], ['Maroon', '#5E1F27', 'ungu'], ['Black', '#1F1F21', 'hitam'], ['Navy', '#1E2A44', 'biru']], 'fk-syuura-mali-brown'),
      gallery: [F + 'fk-syuura-mali-brown'],
      sizeTable: { cols: K4, rows: [['All Size', 60, 103, 142, 65]] }
    },
    liya: {
      name: 'FK, Berlin & Nonpad Liya', cat: 'khimar', catLabel: 'Khimar', bahan: 'marbella-silk', bahanLabel: 'Marbella Silk Anti UV',
      price: 189000, priceMax: 199000, priceNote: 'French Khimar Rp199.000 • Berlin Rp189.000 • Nonpad Rp189.000',
      sizes: ['FK', 'BERLIN', 'NONPAD'], sizeLabels: { FK: 'French Khimar', BERLIN: 'Berlin', NONPAD: 'Nonpad' }, sizePrice: { FK: 199000, BERLIN: 189000, NONPAD: 189000 },
      tagline: 'Satu Bahan, Tiga Model Khimar',
      desc: 'Seri Liya hadir dalam tiga model: French Khimar bertali, Berlin (khimar bandana) dengan depan runcing belakang oval, dan Nonpad dengan cuttingan oval.',
      features: [['Anti UV', 'Marbella Silk yang halus dan ringan.'], ['Tiga Model', 'French Khimar, Berlin, atau Nonpad.'], ['Adem & Klemer', 'Jatuh rapi dan nyaman seharian.']],
      material: 'Marbella Silk Anti UV: halus, ringan, adem, dan klemer.',
      colors: cs([['Grey Maze', '#6E6E70', 'abu'], ['Nirvana', '#A79CB0', 'ungu', 'fk-set-lavender'], ['Cinder', '#5B5654', 'abu'], ['Dark Shadow', '#3E3E41', 'abu'], ['Desert Palm', '#9A8A6A', 'cokelat'],
        ['Coffee Bean', '#4A3529', 'cokelat'], ['Pageant Blue', '#2E3F66', 'biru'], ['Deep Navy', '#1B2236', 'biru'], ['Black Onyx', '#26272A', 'hitam'], ['Black', '#1F1F21', 'hitam']], 'fk-berlin-liya-grey-maze'),
      gallery: [F + 'fk-berlin-liya-grey-maze', F + 'fk-set-lavender'],
      sizeTable: { cols: K4, rows: [['French Khimar', 62, 110, 150, 65], ['Berlin', 64, 95, 150, 72], ['Nonpad', 54, 82, 135, 80]] }
    },
    lily: {
      name: 'Square Hijab Lily', cat: 'khimar', catLabel: 'Khimar', bahan: 'arabian-voile', bahanLabel: 'Arabian Voile',
      price: 159000, priceNote: 'All Size 140 × 140 cm', sizes: ['ALL'],
      tagline: 'Khimar Segiempat dengan Lasercut',
      desc: 'Khimar segiempat berukuran 140 × 140 cm dengan tepi lasercut. Aman dilipat segitiga seperti biasa dan nyaman dipakai seharian.',
      features: [['Lasercut', 'Tepi rapi tanpa jahitan tebal.'], ['Serap Keringat', 'Katun mix polyester yang ringan.'], ['Ukuran Lebar', '140 × 140 cm, menutup dada.']],
      material: 'Arabian Voile (katun mix polyester): halus, lembut, sedikit transparan (aman dilipat segitiga), menyerap keringat, dan ringan.',
      colors: cs([['Black', '#1F1F21', 'hitam'], ['Macchiato', '#B39A80', 'cokelat'], ['Grey', '#9A9A9C', 'abu'], ['Peachy Rose', '#E2B3A5', 'pink'], ['Ice Blue', '#BFD0DC', 'biru'], ['Navy', '#1E2A44', 'biru']], 'lily-square-black'),
      gallery: [F + 'lily-square-black'],
      sizeTable: { cols: ['Panjang', 'Lebar'], rows: [['All Size', 140, 140]] }
    },
    baluna: {
      name: 'Khimar Baluna', cat: 'khimar', catLabel: 'Khimar', bahan: 'shakilla', bahanLabel: 'Shakilla Premium',
      price: 149000, priceNote: 'Feist (FK Instan) & Nonpad Rp149.000 • Free Cadar',
      sizes: ['FEIST', 'NONPAD'], sizeLabels: { FEIST: 'Feist (FK Instan)', NONPAD: 'Nonpad' },
      tagline: 'Khimar Stretchy, Free Cadar',
      desc: 'Khimar berbahan stretchy yang nyaman untuk harian. Pilih Feist Baluna (French Khimar instan dengan karet, cuttingan short cocok untuk petite) atau Nonpad Baluna dengan 1 jahitan. Gratis cadar.',
      features: [['Free Cadar', 'Setiap pembelian mendapat cadar.'], ['Stretchy', 'Lembut, ringan, dan tidak nerawang.'], ['Dua Model', 'Feist (instan karet) atau Nonpad.']],
      material: 'Shakilla Premium: lembut, stretchy, ringan, dan tidak nerawang.',
      colors: cs([['Black', '#1F1F21', 'hitam'], ['Beige Khaki', '#C9B796', 'krem'], ['Eucalyptus', '#8FA393', 'hijau'], ['Coffee Bean', '#4A3529', 'cokelat'], ['Sugar Honey', '#C99B63', 'oranye'],
        ['Twilight Mauve', '#8E7180', 'ungu'], ['Night Wine', '#4E2532', 'ungu'], ['Blue Stone', '#5E7280', 'biru'], ['Ensign Blue', '#3B4B6B', 'biru'], ['Navy', '#1E2A44', 'biru'],
        ['Silver', '#BDBEC0', 'abu'], ['Mineral Green', '#55705F', 'hijau']], 'khimar-baluna-black'),
      gallery: [F + 'khimar-baluna-black'],
      sizeTable: { cols: K4, rows: [['Feist', 62, 75, 118, 52], ['Nonpad', 52, 107, 140, 70]] }
    },
    mishra: {
      name: 'Mishra Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'jacquard', bahanLabel: 'Jacquard',
      price: 389000, priceMax: 399000, priceNote: 'XS–M Rp389.000 • L–XL Rp399.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya dengan Aksen Fold di Lengan',
      desc: 'Abaya cantik dengan aksen fold di lengan dan paduan kancing yang manis. Cuttingan bisht, round neck, akses busui zipper, akses wudhu loose dengan kancing cetet, dan saku kanan-kiri. Serasi dengan Kemko Mishra Kiddy untuk si kecil.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Wudhu Friendly', 'Lengan loose dengan kancing cetet.'], ['Tidak Mudah Kusut', 'Jacquard yang ringan, halus, dan adem.']],
      material: 'Jacquard: ringan, halus, tidak mudah kusut, dan adem.',
      colors: cs([['Black', '#1F1F21', 'hitam'], ['Brown', '#5B3E2E', 'cokelat'], ['Navy', '#1E2A44', 'biru'], ['Dark Eden', '#2F3B33', 'hijau']], 'ibu-anak'),
      gallery: [F + 'ibu-anak'],
      sizeTable: { cols: A6, rows: [['XS', 130, 46, 36, 130, 70, 196], ['S', 140, 46, 40, 135, 72, 210], ['M', 140, 46, 40, 138, 74, 214], ['L', 150, 48, 44, 140, 76, 218], ['XL', 150, 48, 44, 145, 78, 224]] }
    },
    kemkomishra: {
      name: 'Kemko Mishra Kiddy', cat: 'set', catLabel: 'Anak', bahan: 'jacquard', bahanLabel: 'Jacquard',
      price: 179000, priceMax: 199000, priceNote: 'S–M Rp179.000 • L–XL Rp199.000',
      sizes: ['S', 'M', 'L', 'XL'],
      tagline: 'Kemeja Koko Anak, Kembaran dengan Mishra Abaya',
      desc: 'Kemeja koko anak dengan pattern abstrak yang unik. Kerah shanghai, 6 kancing hidup, dan saku depan kiri. Cocok dipakai kembaran dengan Mishra Abaya.',
      features: [['Kerah Shanghai', 'Tampilan rapi untuk acara maupun harian.'], ['6 Kancing Hidup', 'Mudah dipakai dan dilepas.'], ['Adem', 'Jacquard ringan dan tidak mudah kusut.']],
      material: 'Jacquard: ringan, halus, tidak mudah kusut, dan adem.',
      colors: cs([['Black', '#1F1F21', 'hitam'], ['Brown', '#5B3E2E', 'cokelat'], ['Navy', '#1E2A44', 'biru'], ['Dark Eden', '#2F3B33', 'hijau']], 'ibu-anak'),
      gallery: [F + 'ibu-anak'],
      sizeTable: { cols: ['Lingkar Dada', 'Lingkar Lengan', 'Panjang Produk', 'Panjang Lengan'], rows: [['S', 72, 37, 50, 12], ['M', 80, 38, 52, 16], ['L', 84, 40, 55, 16], ['XL', 92, 42, 58, 20]] }
    },
    nayya: {
      name: 'Nayya Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'kaos-katun', bahanLabel: 'Kaos Katun',
      price: 279000, priceNote: 'S, M, L Rp279.000', sizes: ['S', 'M', 'L'],
      tagline: 'Abaya Kaos Katun, Casual & Simple',
      desc: 'Abaya kaos katun yang adem untuk tampilan lebih casual dan simple. Cuttingan bisht, round neck, busui friendly zipper, akses wudhu lengan loose, dan saku depan kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Serap Keringat', 'Berbahan dasar katun, nyaman seharian.'], ['Lengan Loose', 'Mudah digulung saat wudhu.']],
      material: 'Kaos katun: halus, agak stretchy, menyerap keringat. Warna Black & Sage memiliki gramasi lebih ringan.',
      colors: cs([['Maroon', '#5A2430', 'ungu'], ['Sage', '#97A784', 'hijau'], ['Grey', '#C8C9CB', 'abu'], ['Misty Grey', '#9C9D9F', 'abu'], ['Choco Brown', '#7A5E50', 'cokelat'],
        ['Misty Black (Navy)', '#262C3A', 'biru'], ['Navy', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam']], 'khimar-plum'),
      gallery: [F + 'khimar-plum'],
      sizeTable: { cols: A6, rows: [['S', 130, 38, 32, 133, 70, 142], ['M', 130, 40, 34, 138, 72, 144], ['L', 130, 42, 36, 143, 74, 150]] }
    },
    kalaya: {
      name: 'Kalaya Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'linen', bahanLabel: 'Linen',
      price: 289000, priceMax: 299000, priceNote: 'XS–S & M–L Rp289.000 • XL Rp299.000',
      sizes: ['XS-S', 'M-L', 'XL'], sizeLabels: { 'XS-S': 'XS–S', 'M-L': 'M–L' }, sizePrice: { 'XS-S': 289000, 'M-L': 289000, XL: 299000 },
      tagline: 'Abaya Simple dengan 2 Saku Luas',
      desc: 'Abaya linen yang cantik dan simple dengan 2 saku luas di depan. Round neck, busui friendly zipper, akses wudhu loose dengan kancing cetet, dan split di bagian belakang.',
      features: [['Saku Luas', 'Dua saku besar di depan.'], ['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Split Belakang', 'Leluasa bergerak dan melangkah.']],
      material: 'Linen: adem, tidak nerawang, dan ketebalan pas.',
      colors: cs([['Grey Blue', '#A9AEAD', 'abu'], ['Dark Matcha', '#B8BCB0', 'hijau'], ['Caramel', '#D9B9A8', 'krem']], 'khimar-olive'),
      gallery: [F + 'khimar-olive'],
      sizeTable: { cols: A6, rows: [['XS–S', 160, 40, 34, 135, 70, 160], ['M–L', 160, 42, 36, 140, 72, 162], ['XL', 160, 44, 38, 145, 74, 162]] }
    },
    balunaabaya: {
      name: 'Baluna Abaya', cat: 'abaya', catLabel: 'Abaya', bahan: 'spandex-rayon', bahanLabel: 'Spandex Rayon Premium',
      price: 229000, priceMax: 239000, priceNote: 'XS–M Rp229.000 • L–XL Rp239.000',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tagline: 'Abaya dengan Aksen Balon yang Gemas',
      desc: 'Abaya dengan aksen balon yang gemas dan material lembut seperti baju bayi. Round neck, busui friendly zipper, wudhu friendly karet, dan saku kanan-kiri.',
      features: [['Busui Zipper', 'Resleting depan yang ramah ibu menyusui.'], ['Wudhu Karet', 'Lengan berkaret, mudah ditarik saat wudhu.'], ['Lembut & Stretchy', 'Adem seperti baju bayi.']],
      material: 'Spandex Rayon Premium: halus, lembut, stretchy, dan adem seperti baju bayi.',
      colors: cs([['Burnt Olive', '#5D5A49', 'hijau'], ['Navy', '#1E2A44', 'biru'], ['Black', '#1F1F21', 'hitam']], 'baluna-abaya-trio'),
      gallery: [F + 'baluna-abaya-trio', F + 'khimar-baluna-black'],
      sizeTable: { cols: A6, rows: [['XS', 102, 50, 18, 130, 58, 276], ['S', 102, 50, 20, 135, 58, 276], ['M', 106, 50, 20, 138, 62, 278], ['L', 120, 52, 22, 140, 64, 284], ['XL', 130, 54, 22, 145, 66, 296]] }
    }
  };
  var ORDER = ['halia', 'noora', 'zafeera', 'jannah', 'mishra', 'kemkomishra', 'kalaya', 'nayya', 'yumnaabaya', 'yumna', 'mecca', 'freia', 'maira', 'liya', 'syuura', 'npjannah', 'balunaabaya', 'seema', 'lily', 'baluna'];
  ORDER.forEach(function (id, i) {
    var p = ARSIP[id]; p.id = id; p.urut = 14 + i; p.baru = false; p.arsip = true;
    window.YARKA_PRODUCTS[id] = p;
  });

  // Foto per warna (manekin berlabel dari arsip Telegram) untuk produk yang sebelumnya
  // memakai satu foto untuk semua warna: assets/img/warna/<id>-<slug warna>.jpg
  var PER_WARNA = {
    zen: ['Cocoa', 'Hazelnut Brown', 'Gray White'],
    halia: '*', noora: '*', mishra: '*', kalaya: '*', nayya: '*', yumnaabaya: '*',
    mecca: '*', freia: '*', maira: '*', balunaabaya: '*', seema: '*'
  };
  function slugW(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  Object.keys(PER_WARNA).forEach(function (id) {
    var only = PER_WARNA[id];
    window.YARKA_PRODUCTS[id].colors.forEach(function (col) {
      if (only === '*' || only.indexOf(col.n) > -1) col.img = W + id + '-' + slugW(col.n) + '.jpg';
    });
  });

  // Foto flat-lay (hanger) per warna: tampil sebagai foto ke-2 di galeri produk
  var FLAT = {
    hawa: { 'Peony Pink': 'hawa-peony-pink', 'Blue Azure': 'hawa-blue-azure', 'Khaki': 'hawa-khaki', 'Charcoal': 'hawa-charcoal' },
    hanna: { 'Laurel Wreath': 'hanna-v2-laurel-wreath', 'Navy': 'hanna-v2-navy', 'Gray Lilac': 'hanna-v2-gray-lilac' },
    ruwa: { 'Butterscotch': 'ruwa-butterscotch', 'Pale Teal': 'ruwa-pale-teal', 'Navy': 'ruwa-navy', 'Black': 'ruwa-black' },
    ara: { 'Sage Green': 'ara-sage-green', 'Almond': 'ara-almond', 'Butter Yellow': 'ara-butter-yellow', 'Black': 'ara-black' }
  };
  Object.keys(FLAT).forEach(function (id) {
    window.YARKA_PRODUCTS[id].colors.forEach(function (col) { if (FLAT[id][col.n]) col.flat = W + FLAT[id][col.n] + '.jpg'; });
  });

  // Utilitas bersama
  window.YARKA = {
    rp: function (n) { return 'Rp' + Number(n).toLocaleString('id-ID'); },
    priceText: function (p) { return p.priceMax ? this.rp(p.price) + ' – ' + this.rp(p.priceMax).replace('Rp', '') : this.rp(p.price); },
    slug: function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); },
    color: function (p, name) {
      if (!p) return null;
      var s = this.slug(name || '');
      for (var i = 0; i < p.colors.length; i++) if (this.slug(p.colors[i].n) === s) return p.colors[i];
      return p.colors[0];
    },
    url: function (root, p, col) { return root + 'produk.html?p=' + p.id + (col ? '&w=' + this.slug(col.n) : ''); }
  };
})();
