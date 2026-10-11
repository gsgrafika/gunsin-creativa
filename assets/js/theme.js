/**
 * ============================================================
 * SISTEM TEMA DARK/LIGHT MODE
 * ============================================================
 * - Toggle tema saat tombol diklik
 * - Simpan preferensi ke localStorage
 * - Ikuti perubahan preferensi sistem secara real-time
 * ============================================================
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'gunsin-theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    /**
     * Ambil tema yang seharusnya aktif.
     * Prioritas: localStorage > preferensi sistem > default (dark).
     */
    function getCurrentTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === THEME_DARK || saved === THEME_LIGHT) return saved;

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDark ? THEME_DARK : THEME_LIGHT;
    }

    /**
     * Terapkan tema ke <html>.
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcons(theme);
    }

    /**
     * Simpan preferensi ke localStorage.
     */
    function saveTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
    }

    /**
     * Ganti tema saat ini.
     */
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
        const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(next);
        saveTheme(next);
    }

    /**
     * Update semua ikon toggle di halaman.
     * Ikon: matahari saat light mode, bulan saat dark mode.
     */
    function updateToggleIcons(theme) {
        const buttons = document.querySelectorAll('[data-theme-toggle]');
        buttons.forEach(btn => {
            const iconSun = btn.querySelector('.icon-sun');
            const iconMoon = btn.querySelector('.icon-moon');

            if (theme === THEME_DARK) {
                // Sedang gelap → tampilkan ikon matahari (untuk beralih ke terang)
                if (iconSun) iconSun.style.display = 'block';
                if (iconMoon) iconMoon.style.display = 'none';
                btn.setAttribute('aria-label', 'Aktifkan mode terang');
                btn.setAttribute('title', 'Mode terang');
            } else {
                // Sedang terang → tampilkan ikon bulan (untuk beralih ke gelap)
                if (iconSun) iconSun.style.display = 'none';
                if (iconMoon) iconMoon.style.display = 'block';
                btn.setAttribute('aria-label', 'Aktifkan mode gelap');
                btn.setAttribute('title', 'Mode gelap');
            }
        });
    }

    /**
     * Pasang event listener ke semua tombol toggle.
     */
    function bindToggleButtons() {
        const buttons = document.querySelectorAll('[data-theme-toggle]');
        buttons.forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });
    }

    /**
     * Dengarkan perubahan preferensi sistem.
     * Hanya berlaku jika user belum pernah memilih secara manual.
     */
    function watchSystemPreference() {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }

    /**
     * Inisialisasi saat DOM siap.
     */
    function init() {
        const current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
        applyTheme(current);
        bindToggleButtons();
        watchSystemPreference();
    }

    // Ekspos API kecil untuk digunakan dari tempat lain jika perlu
    window.GunsinTheme = {
        toggle: toggleTheme,
        get: getCurrentTheme,
        set: (theme) => { applyTheme(theme); saveTheme(theme); }
    };

    // Jalankan
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();