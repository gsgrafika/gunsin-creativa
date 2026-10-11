/**
 * ============================================================
 * HALAMAN KONTAK - Logic form & auto-fill info dari SITE
 * ============================================================
 */

(function () {
    'use strict';

    if (typeof SITE === 'undefined') {
        console.error('[Contact] SITE config tidak ditemukan.');
        return;
    }

    // ---------- ISI INFO DARI SITE CONFIG ----------

    /**
     * Render link WhatsApp (2 nomor)
     */
    function renderWhatsAppLinks() {
        const container = document.getElementById('wa-links');
        if (!container) return;

        container.innerHTML = SITE.whatsappLink.map((wa, i) => {
            const label = SITE.whatsapp[i]?.label || `Admin ${i + 1}`;
            const nomor = SITE.whatsapp[i]?.nomor || wa.nomor;
            const pesan = encodeURIComponent(`Halo ${SITE.nama}, saya ingin konsultasi.`);
            return `
                <a href="https://wa.me/${wa.nomor}?text=${pesan}" 
                   class="contact-link" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    ${label}: ${nomor}
                </a>
            `;
        }).join('');
    }

    /**
     * Isi email
     */
    function renderEmail() {
        const link = document.getElementById('email-link');
        const text = document.getElementById('email-text');
        if (link) link.href = `mailto:${SITE.email}`;
        if (text) text.textContent = SITE.email;
    }

    /**
     * Isi alamat & link Maps
     */
    function renderAlamat() {
        const alamatEl = document.getElementById('alamat-text');
        const mapsLink = document.getElementById('maps-link');
        if (alamatEl) alamatEl.textContent = SITE.alamat;
        if (mapsLink) mapsLink.href = SITE.mapsUrl;
    }

    /**
     * Render jam operasional
     */
    function renderJamOperasional() {
        const container = document.getElementById('op-hours');
        if (!container || !SITE.jamOperasional) return;

        container.innerHTML = SITE.jamOperasional.map(item => `
            <li>
                <span>${item.hari}</span>
                <strong>${item.jam}</strong>
            </li>
        `).join('');
    }

    /**
     * Render link sosial media
     */
    function renderSocialLinks() {
        const container = document.getElementById('social-links');
        if (!container) return;

        const items = [];

        if (SITE.sosial.instagram) {
            items.push(`
                <a href="${SITE.sosial.instagram.url}" class="contact-link" 
                   target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    @${SITE.sosial.instagram.handle}
                </a>
            `);
        }

        if (SITE.sosial.facebook) {
            items.push(`
                <a href="${SITE.sosial.facebook.url}" class="contact-link" 
                   target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    ${SITE.sosial.facebook.handle}
                </a>
            `);
        }

        container.innerHTML = items.join('');
    }

    /**
     * Isi iframe Google Maps
     */
    function renderMaps() {
        const iframe = document.getElementById('maps-iframe');
        if (!iframe) return;

        // Pakai format embed paling simpel: q + output=embed
        const query = encodeURIComponent(SITE.alamat);
        iframe.src = `https://www.google.com/maps?q=${query}&output=embed`;
    }

    // ---------- FORM VALIDASI & SUBMIT ----------

    /**
     * Validasi form. Return true jika valid.
     */
    function validateForm(data) {
        let valid = true;
        const errors = {
            nama: '',
            wa: '',
            layanan: '',
            pesan: ''
        };

        // Nama minimal 3 karakter
        if (!data.nama || data.nama.trim().length < 3) {
            errors.nama = 'Nama minimal 3 karakter.';
            valid = false;
        }

        // Nomor WA: 10-14 digit, boleh diawali 0 atau 62
        const waClean = data.wa.replace(/\D/g, '');
        if (waClean.length < 10 || waClean.length > 14) {
            errors.wa = 'Nomor WhatsApp tidak valid (10-14 digit).';
            valid = false;
        }

        // Layanan harus dipilih
        if (!data.layanan) {
            errors.layanan = 'Pilih salah satu layanan.';
            valid = false;
        }

        // Pesan minimal 10 karakter
        if (!data.pesan || data.pesan.trim().length < 10) {
            errors.pesan = 'Pesan minimal 10 karakter.';
            valid = false;
        }

        // Tampilkan error
        Object.keys(errors).forEach(key => {
            const el = document.getElementById(`error-${key}`);
            if (el) el.textContent = errors[key];
        });

        return valid;
    }

    /**
     * Bersihkan error saat user mulai mengetik.
     */
    function clearErrorOnInput() {
        const fields = ['nama', 'wa', 'layanan', 'pesan'];
        fields.forEach(id => {
            const input = document.getElementById(id);
            const error = document.getElementById(`error-${id}`);
            if (!input || !error) return;
            input.addEventListener('input', () => { error.textContent = ''; });
            input.addEventListener('change', () => { error.textContent = ''; });
        });
    }

    /**
     * Handle submit form → redirect ke WhatsApp
     */
    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            nama: document.getElementById('nama').value,
            wa: document.getElementById('wa').value,
            layanan: document.getElementById('layanan').value,
            pesan: document.getElementById('pesan').value
        };

        if (!validateForm(data)) {
            // Scroll ke error pertama
            const firstError = document.querySelector('.form-error:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Format pesan WhatsApp
        const pesanWA = [
            `Halo ${SITE.nama}, saya ingin konsultasi.`,
            ``,
            `*Nama:* ${data.nama}`,
            `*No. WhatsApp:* ${data.wa}`,
            `*Layanan:* ${data.layanan}`,
            ``,
            `*Pesan:*`,
            data.pesan
        ].join('\n');

        const url = `https://wa.me/${SITE.whatsappLink[0].nomor}?text=${encodeURIComponent(pesanWA)}`;

        // Buka WhatsApp di tab baru
        window.open(url, '_blank', 'noopener');

        // Reset form
        document.getElementById('contact-form').reset();

        // Notifikasi kecil
        alert('Terima kasih! Anda akan diarahkan ke WhatsApp.');
    }

    // ---------- INIT ----------
    function init() {
        renderWhatsAppLinks();
        renderEmail();
        renderAlamat();
        renderJamOperasional();
        renderSocialLinks();
        renderMaps();

        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
            clearErrorOnInput();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();