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
    }
  };
  var ORDER = ['halia', 'noora', 'zafeera', 'jannah', 'mishra'];
  ORDER.forEach(function (id, i) {
    var p = ARSIP[id]; p.id = id; p.urut = 14 + i; p.baru = false; p.arsip = true;
    window.YARKA_PRODUCTS[id] = p;
  });

  // Foto per warna (manekin berlabel dari arsip Telegram) untuk produk yang sebelumnya
  // memakai satu foto untuk semua warna: assets/img/warna/<id>-<slug warna>.jpg
  var PER_WARNA = {
    zen: ['Cocoa', 'Hazelnut Brown', 'Gray White'],
    halia: '*', noora: '*', mishra: '*'
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
    // Harga satuan per produk/warna/ukuran. Dipakai keranjang (toko.js) DAN server pembayaran
    // (api/_lib/yarka.js) untuk memeriksa total pesanan, jadi ubah harga cukup di file ini.
    harga: function (p, warna, s) {
      if (p.id === 'zela') { var cr = /crinkle/i.test(warna || ''); return s === 'M' ? (cr ? 139000 : 199000) : (cr ? 119000 : 179000); }
      if (p.id === 'binar') return /^black/i.test(warna || '') ? 219000 : 189000;
      if (p.sizePrice) return p.sizePrice[s] || p.price;
      if (!p.priceMax) return p.price;
      if (s === 'L' || s === 'XL' || s === 'BESAR') return p.priceMax;
      if (p.sizes.length === 2 && p.sizes[0] === 'S' && s === 'M') return p.priceMax;
      return p.price;
    },
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
