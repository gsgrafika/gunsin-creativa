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
            <a href="${item.href}" class="service-card">
                <div class="service-icon">
                    ${item.ikonSvg}
                </div>
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <span class="service-link">Selengkapnya →</span>
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
            '.gallery-item, .price-item, .portfolio-3d-card'
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

    function init() {
        renderServices();
        setupScrollReveal();
        setupSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();