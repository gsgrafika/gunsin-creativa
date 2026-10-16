/**
 * ============================================================
 * SISTEM TEMA DARK/LIGHT MODE
 * ============================================================
 * - Toggle tema saat tombol diklik (via event delegation)
 * - Simpan preferensi ke localStorage
 * - Ikuti perubahan preferensi sistem secara real-time
 * ============================================================
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'gunsin-theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    function getCurrentTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === THEME_DARK || saved === THEME_LIGHT) return saved;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDark ? THEME_DARK : THEME_LIGHT;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcons(theme);
    }

    function saveTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
        const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(next);
        saveTheme(next);
    }

    function updateToggleIcons(theme) {
        if (!theme) {
            theme = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
        }

        const buttons = document.querySelectorAll('[data-theme-toggle]');
        buttons.forEach(btn => {
            const iconSun = btn.querySelector('.icon-sun');
            const iconMoon = btn.querySelector('.icon-moon');

            if (theme === THEME_DARK) {
                if (iconSun) iconSun.style.display = 'block';
                if (iconMoon) iconMoon.style.display = 'none';
                btn.setAttribute('aria-label', 'Aktifkan mode terang');
                btn.setAttribute('title', 'Mode terang');
            } else {
                if (iconSun) iconSun.style.display = 'none';
                if (iconMoon) iconMoon.style.display = 'block';
                btn.setAttribute('aria-label', 'Aktifkan mode gelap');
                btn.setAttribute('title', 'Mode gelap');
            }
        });
    }

    function bindGlobalClick() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-theme-toggle]');
            if (btn) {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    function watchSystemPreference() {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }

    function init() {
        const current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
        applyTheme(current);
        bindGlobalClick();
        watchSystemPreference();

        setTimeout(() => updateToggleIcons(), 0);
        setTimeout(() => updateToggleIcons(), 100);
    }

    window.GunsinTheme = {
        toggle: toggleTheme,
        get: getCurrentTheme,
        set: (theme) => { applyTheme(theme); saveTheme(theme); },
        refreshIcons: updateToggleIcons
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();