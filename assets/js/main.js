/**
 * ============================================================
 * MAIN.JS - Interaksi umum & render data dinamis
 * ============================================================
 */

(function () {
    'use strict';

    /**
     * Render kartu layanan di beranda dari SITE.layanan
     */
    function renderServices() {
        const container = document.getElementById('services-grid');
        if (!container || typeof SITE === 'undefined') return;

        container.innerHTML = SITE.layanan.map(item => `
            <article class="service-card">
                <div class="service-card-bg"
                     style="background-image: url('${item.gambar}')"
                     role="img"
                     aria-label="${item.nama}"></div>

                <div class="service-icon-badge">
                    ${item.ikonSvg}
                </div>

                <div class="service-card-content">
                    <h3 class="service-title">${item.nama}</h3>
                    <p class="service-desc">${item.deskripsi}</p>

                    <div class="service-price-row">
                        <div class="service-price">
                            <span class="price-label">Mulai dari</span>
                            <span class="price-value">Rp ${item.hargaMulai}</span>
                        </div>
                        <a href="${item.href}" class="service-cta" aria-label="Selengkapnya tentang ${item.nama}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
    }

        /**
     * Render kartu portofolio di beranda dari SITE.portofolio
     */
    function renderPortfolio() {
        const container = document.getElementById('portfolio-grid');
        if (!container || typeof SITE === 'undefined' || !SITE.portofolio) return;

        container.innerHTML = SITE.portofolio.map(item => `
            <a href="${item.link}" class="portfolio-item">
                <div class="portfolio-img-wrap">
                    <img class="portfolio-img"
                         src="${item.gambar}"
                         alt="${item.judul}"
                         loading="lazy"
                         width="600" height="450"
                         onerror="this.style.display='none'">
                    <span class="portfolio-tag">${item.kategori}</span>
                </div>
                <div class="portfolio-body">
                    <h3 class="portfolio-title">${item.judul}</h3>
                    <span class="portfolio-arrow" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </span>
                </div>
            </a>
        `).join('');
    }

    /**
     * Animasi fade-in saat elemen masuk viewport
     */
    function setupScrollReveal() {
        const targets = document.querySelectorAll(
            '.section-header, .service-card, .feature-card, .portfolio-card, ' +
            '.testimonial-card, .cta-box, .web-type-card, .process-step, ' +
            '.pricing-card, .faq-item, .page-hero-features, ' +
            '.gallery-item, .price-item, .portfolio-3d-card, ' +
            '.contact-card, .contact-form-card, .map-wrap, ' +
            '.portfolio-item'
        );
        if (!targets.length) return;

        targets.forEach(el => el.classList.add('reveal'));

        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        targets.forEach(el => observer.observe(el));
    }

    /**
     * Smooth scroll untuk anchor link (#layanan, dll)
     */
    function setupSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    }

    /**
     * Handle link internal yang rusak (404)
     * Khusus untuk halaman 404, arahkan ke beranda setelah 10 detik
     */
    function setup404Redirect() {
        if (window.location.pathname !== '/404.html' && 
            !document.title.toLowerCase().includes('tidak ditemukan')) return;

        let countdown = 10;
        const counter = document.createElement('p');
        counter.style.cssText = 'margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;';
        counter.textContent = `Dialihkan otomatis ke Beranda dalam ${countdown} detik...`;
        
        const container = document.querySelector('main .container');
        if (container) container.appendChild(counter);

        const interval = setInterval(() => {
            countdown--;
            counter.textContent = `Dialihkan otomatis ke Beranda dalam ${countdown} detik...`;
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = 'index.html';
            }
        }, 1000);
    }

        /**
     * Tombol "Kembali ke Atas"
     * Muncul saat user scroll melewati threshold tertentu
     */
    function setupBackToTop() {
        // Buat tombol sekali saja
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Kembali ke atas');
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        `;
        document.body.appendChild(btn);

        // Scroll ke atas saat diklik
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Toggle visibility berdasarkan scroll
        let ticking = false;
        function updateVisibility() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const threshold = 400; // muncul setelah 400px scroll

            if (scrollY > threshold) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateVisibility);
                ticking = true;
            }
        }, { passive: true });

        // Cek posisi awal (kalau user buka halaman di tengah)
        updateVisibility();
    }

    function init() {
        renderServices();
        renderPortfolio();
        setupScrollReveal();
        setupSmoothScroll();
        setup404Redirect();
        setupBackToTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();