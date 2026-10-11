/**
 * ============================================================
 * KONFIGURASI SITUS GUNSIN CREATIVA
 * ============================================================
 * Edit file INI SAJA untuk mengubah informasi yang muncul
 * di seluruh halaman (header, footer, kontak, tombol WA, dll).
 *
 * Setelah edit, jangan lupa:
 *   git add .
 *   git commit -m "Update info perusahaan"
 *   git push
 * ============================================================
 */

const SITE = {
    // ---------- IDENTITAS ----------
    nama: "Gunsin Creativa",
    tagline: "Solusi Digital untuk Segala Kebutuhan",
    deskripsi: "Melayani jasa web developer, desain grafis, visualisasi 3D, dan merchandise untuk sekolah, UMKM, dan bisnis Anda.",
    tahunBerdiri: 2024,

    // ---------- KONTAK ----------
    whatsapp: [
        { nomor: "085113133060", label: "Admin 1" },
        { nomor: "085855003004", label: "Admin 2" }
    ],
    // Format untuk link wa.me (tanpa 0 di depan, pakai 62)
    whatsappLink: [
        { nomor: "6285113133060", label: "Admin 1" },
        { nomor: "6285855003004", label: "Admin 2" }
    ],
    email: "gunsinbawamanfaat@gmail.com",

    // ---------- LOKASI ----------
    alamat: "Jl. Sunan Ampel III No.24, Rejomulyo, Kec. Kota, Kota Kediri, Jawa Timur 64129",
    alamatSingkat: "Kota Kediri, Jawa Timur",
    mapsUrl: "https://maps.app.goo.gl/PBPjjsSJ7PYVq2gr8",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0!2d112.0!3d-7.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDgnMDAuMCJTIDExMsKwMDAnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000",

    // ---------- MEDIA SOSIAL ----------
    sosial: {
        instagram: {
            handle: "gs.grafika",
            url: "https://instagram.com/gs.grafika"
        },
        facebook: {
            handle: "Gunsin Creativa",
            url: "https://www.facebook.com/profile.php?id=61567481194246"
        }
    },

    // ---------- NAVIGASI ----------
    // Urutan menu di header & footer
    navigasi: [
        { label: "Beranda",       href: "index.html" },
        { label: "Web Develop",   href: "web-develop.html" },
        { label: "Graphic Design",href: "graphic-design.html" },
        { label: "Sketchup 3D",   href: "sketchup.html" },
        { label: "Kontak",        href: "kontak.html" }
    ],

    // ---------- LAYANAN ----------
    // Ditampilkan di beranda & halaman masing-masing
    layanan: [
        {
            id: "web-develop",
            nama: "Web Development",
            ikon: "🌐",
            deskripsi: "Pembuatan website company profile, landing page, toko online, dan sistem informasi sekolah.",
            href: "web-develop.html"
        },
        {
            id: "graphic-design",
            nama: "Graphic Design",
            ikon: "🎨",
            deskripsi: "Desain logo, flyer, banner, standing banner, rombong, dan kebutuhan branding UMKM.",
            href: "graphic-design.html"
        },
        {
            id: "sketchup",
            nama: "Sketchup 3D",
            ikon: "🏠",
            deskripsi: "Visualisasi 3D rumah, gedung, dan interior menggunakan SketchUp untuk presentasi & marketing.",
            href: "sketchup.html"
        },
        {
            id: "merchandise",
            nama: "Merchandise",
            ikon: "👕",
            deskripsi: "Produksi kaos, tote bag, mug, dan merchandise custom untuk sekolah, komunitas, dan perusahaan.",
            href: "kontak.html"
        }
    ],

    // ---------- SEO ----------
    seo: {
        defaultTitle: "Gunsin Creativa - Solusi Digital untuk Sekolah, UMKM & Bisnis",
        defaultDescription: "Jasa web developer, desain grafis, visualisasi 3D Sketchup, dan merchandise custom di Kediri. Melayani sekolah, UMKM, dan bisnis di seluruh Indonesia.",
        keywords: "jasa web kediri, desain grafis kediri, sketchup kediri, merchandise custom, jasa desain logo, banner, umkm, sekolah",
        url: "https://gunsincreativa.com", // ganti setelah punya domain
        ogImage: "assets/img/og-image.jpg"
    }
};

// Ekspor untuk dipakai di file lain (jika modul)
if (typeof module !== 'undefined') module.exports = SITE;