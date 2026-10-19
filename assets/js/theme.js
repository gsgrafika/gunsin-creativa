/**
 * ============================================================
 * SISTEM TEMA DARK/LIGHT MODE
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
    }

    window.GunsinTheme = {
        toggle: toggleTheme,
        get: getCurrentTheme,
        set: (theme) => { applyTheme(theme); saveTheme(theme); },
        refreshIcons: function() {} // Dikosongkan karena CSS yg atur
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();