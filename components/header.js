/**
 * ============================================================
 * HEADER REUSABLE
 * ============================================================
 */

(function () {
    'use strict';

    if (typeof SITE === 'undefined') {
        console.error('[Header] SITE config tidak ditemukan.');
        return;
    }

    const NAV_ICONS = {
        globe: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
        palette: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
        home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        school: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
        store: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18l-1.5 10.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5z"/><path d="M3 9l1.5-5h15L21 9"/><path d="M9 13a3 3 0 0 0 6 0"/></svg>',
        briefcase: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
        user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>'
    };

    function getCurrentPage() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return file;
    }

    function buildNavItem(item, currentPage) {
        const isActive = item.href === currentPage;
        const activeClass = isActive ? ' active' : '';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';
        return `<li class="nav-item"><a href="${item.href}" class="nav-link${activeClass}"${ariaCurrent}>${item.label}</a></li>`;
    }

    function buildNavItemDropdown(item) {
        const dropdownItems = item.dropdown.map(sub => {
            const icon = NAV_ICONS[sub.icon] || NAV_ICONS.globe;
            return `
                <a href="${sub.href}" class="mega-menu-item">
                    <span class="mega-menu-icon">${icon}</span>
                    <span class="mega-menu-text">
                        <strong>${sub.label}</strong>
                        <small>${sub.desc}</small>
                    </span>
                </a>
            `;
        }).join('');

        return `
            <li class="nav-item has-dropdown">
                <button type="button" class="nav-link nav-trigger" aria-expanded="false">
                    ${item.label}
                    <svg class="nav-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
                <div class="mega-menu">
                    <div class="mega-menu-inner">
                        <span class="mega-menu-label">${item.label}</span>
                        <div class="mega-menu-grid">${dropdownItems}</div>
                    </div>
                </div>
            </li>
        `;
    }

    function buildHeaderHTML() {
        const currentPage = getCurrentPage();

        const navItems = SITE.navigasi.map(item => {
            if (item.dropdown) return buildNavItemDropdown(item);
            return buildNavItem(item, currentPage);
        }).join('');

        return `
            <div class="container header-inner">
                <a href="index.html" class="brand" aria-label="${SITE.nama} - Beranda">
                    <span class="brand-logo">
                        <img src="assets/img/brand/logo-light.webp" alt="Logo ${SITE.nama}" class="logo-light" width="42" height="42">
                        <img src="assets/img/brand/logo-dark.webp" alt="Logo ${SITE.nama}" class="logo-dark" width="42" height="42">
                    </span>
                    <span class="brand-text">
                        <span class="brand-name">${SITE.nama}</span>
                        <span class="brand-tagline">${SITE.tagline}</span>
                    </span>
                </a>

                <nav class="main-nav" id="main-nav" aria-label="Navigasi utama">
                    <ul class="nav-list">
                        ${navItems}
                        <!-- Tombol CTA dipindah ke dalam list menu -->
                        <li class="nav-item nav-cta-item">
                            <a href="https://wa.me/${SITE.whatsappLink[0].nomor}?text=Halo%20${encodeURIComponent(SITE.nama)}"
                               class="btn btn-primary btn-sm header-cta" target="_blank" rel="noopener">
                                Hubungi Kami
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="header-actions">
                    <!-- Desain Toggle Switch Baru -->
                    <button class="theme-toggle" data-theme-toggle aria-label="Ganti tema">
                        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="4"/>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                        </svg>
                    </button>

                    <button class="menu-toggle" id="menu-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="main-nav">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        `;
    }

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

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function bindDropdown() {
        const triggers = document.querySelectorAll('.nav-trigger');
        if (!triggers.length) return;

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const parent = trigger.closest('.has-dropdown');
                const isOpen = parent.classList.contains('open');

                document.querySelectorAll('.has-dropdown').forEach(el => {
                    el.classList.remove('open');
                    const t = el.querySelector('.nav-trigger');
                    if (t) t.setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    parent.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.has-dropdown').forEach(el => {
                el.classList.remove('open');
                const t = el.querySelector('.nav-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.has-dropdown').forEach(el => {
                    el.classList.remove('open');
                    const t = el.querySelector('.nav-trigger');
                    if (t) t.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    function init() {
        const headerEl = document.getElementById('site-header');
        if (!headerEl) return;

        headerEl.classList.add('site-header');
        headerEl.innerHTML = buildHeaderHTML();
        bindMenuToggle();
        bindDropdown();

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