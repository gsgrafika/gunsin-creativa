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

        // ---------- JAM OPERASIONAL ----------
    jamOperasional: [
        { hari: "Senin - Jumat", jam: "08.00 - 20.00" },
        { hari: "Sabtu",         jam: "08.00 - 17.00" },
        { hari: "Minggu",        jam: "By Appointment" }
    ],

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
    layanan: [
        {
            id: "web-develop",
            nama: "Web Development",
            ikonSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
            deskripsi: "Pembuatan website company profile, landing page, toko online, dan sistem informasi sekolah.",
            href: "web-develop.html"
        },
        {
            id: "graphic-design",
            nama: "Graphic Design",
            ikonSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
            deskripsi: "Desain logo, flyer, banner, standing banner, rombong, dan kebutuhan branding UMKM.",
            href: "graphic-design.html"
        },
        {
            id: "sketchup",
            nama: "Sketchup 3D",
            ikonSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            deskripsi: "Visualisasi 3D rumah, gedung, dan interior menggunakan SketchUp untuk presentasi & marketing.",
            href: "sketchup.html"
        },
        {
            id: "merchandise",
            nama: "Merchandise",
            ikonSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
            deskripsi: "Produksi kaos, tote bag, mug, dan merchandise custom untuk sekolah, komunitas, dan perusahaan.",
            href: "kontak.html"
        }
    ],

    // ---------- SEO ----------
    seo: {
        defaultTitle: "Gunsin Creativa - Solusi Digital untuk Sekolah, UMKM & Bisnis",
        defaultDescription: "Jasa web developer, desain grafis, visualisasi 3D Sketchup, dan merchandise custom di Kediri. Melayani sekolah, UMKM, dan bisnis di seluruh Indonesia.",
        keywords: "jasa web kediri, desain grafis kediri, sketchup kediri, merchandise custom, jasa desain logo, banner, umkm, sekolah",
        url: "https://www.gunsincreativa.my.id", // ganti setelah punya domain
        ogImage: "assets/img/og-image.jpg"
    }
};

// Ekspor untuk dipakai di file lain (jika modul)
if (typeof module !== 'undefined') module.exports = SITE;