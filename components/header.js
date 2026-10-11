/**
 * ============================================================
 * HEADER REUSABLE
 * ============================================================
 * Menyuntikkan header ke <header id="site-header"> di setiap
 * halaman. Data diambil dari SITE (data/site-config.js).
 * ============================================================
 */

(function () {
    'use strict';

    if (typeof SITE === 'undefined') {
        console.error('[Header] SITE config tidak ditemukan. Pastikan data/site-config.js dimuat sebelum header.js');
        return;
    }

    /**
     * Tentukan halaman aktif berdasarkan nama file di URL.
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return file;
    }

    /**
     * Bangun HTML untuk satu item navigasi.
     */
    function buildNavItem(item, currentPage) {
        const isActive = item.href === currentPage;
        const activeClass = isActive ? ' active' : '';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';
        return `<li><a href="${item.href}" class="nav-link${activeClass}"${ariaCurrent}>${item.label}</a></li>`;
    }

    /**
     * Bangun HTML header lengkap.
     */
    function buildHeaderHTML() {
        const currentPage = getCurrentPage();

        const navItems = SITE.navigasi
            .map(item => buildNavItem(item, currentPage))
            .join('');

        return `
            <div class="container header-inner">
                <a href="index.html" class="brand" aria-label="${SITE.nama} - Beranda">
                    <span class="brand-logo">
                        <img src="assets/img/brand/logo-light.webp"
                             alt="Logo ${SITE.nama}"
                             class="logo-light"
                             width="42" height="42">
                        <img src="assets/img/brand/logo-dark.webp"
                             alt="Logo ${SITE.nama}"
                             class="logo-dark"
                             width="42" height="42">
                    </span>
                    <span class="brand-text">
                        <span class="brand-name">${SITE.nama}</span>
                        <span class="brand-tagline">${SITE.tagline}</span>
                    </span>
                </a>

                <nav class="main-nav" id="main-nav" aria-label="Navigasi utama">
                    <ul class="nav-list">
                        ${navItems}
                    </ul>
                </nav>

                <div class="header-actions">
                    <button class="theme-toggle" data-theme-toggle aria-label="Ganti tema">
                        <svg class="icon-sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4"/>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                        </svg>
                        <svg class="icon-moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>

                    <a href="https://wa.me/${SITE.whatsappLink[0].nomor}?text=Halo%20${encodeURIComponent(SITE.nama)}%2C%20saya%20ingin%20bertanya"
                       class="btn btn-primary btn-sm header-cta"
                       target="_blank" rel="noopener">
                        Hubungi Kami
                    </a>

                    <button class="menu-toggle" id="menu-toggle"
                            aria-label="Buka menu" aria-expanded="false" aria-controls="main-nav">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Pasang event listener untuk menu mobile.
     */
    function bindMenuToggle() {
        const toggle = document.getElementById('menu-toggle');
        const nav = document.getElementById('main-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
        });

        // Tutup menu saat link diklik
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Tutup menu saat tekan Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Inisialisasi header.
     */
    function init() {
        const headerEl = document.getElementById('site-header');
        if (!headerEl) return;

        headerEl.classList.add('site-header');
        headerEl.innerHTML = buildHeaderHTML();
        bindMenuToggle();

        // ⭐ Update ikon tema setelah tombol di-inject
        if (window.GunsinTheme && window.GunsinTheme.refreshIcons) {
            window.GunsinTheme.refreshIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();