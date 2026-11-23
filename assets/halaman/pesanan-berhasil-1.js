// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: pesanan-berhasil.html
(function() {
      const modalWrapper = document.getElementById('rating-modal-wrapper');
      const closeBtn = document.getElementById('close-rating-modal-btn');
      const dismissBtn = document.getElementById('dismiss-rating-btn');
      const submitBtn = document.getElementById('submit-rating-btn');
      const backdrop = document.getElementById('modal-backdrop');
      const root = document.documentElement;
      let rating = 5;

      // Kunci gulir halaman selama dialog ulasan terbuka
      if (modalWrapper && !modalWrapper.classList.contains('hidden')) root.style.overflow = 'hidden';

      function hideModal() {
        if (modalWrapper) modalWrapper.classList.add('hidden');
        root.style.overflow = '';
      }

      if (closeBtn) closeBtn.addEventListener('click', hideModal);
      if (dismissBtn) dismissBtn.addEventListener('click', hideModal);
      if (backdrop) backdrop.addEventListener('click', hideModal);
      document.addEventListener('keydown', function(e) { if (e.key === 'Escape') hideModal(); });

      const copyBtn = document.getElementById('copy-order-btn');
      if (copyBtn) copyBtn.addEventListener('click', function() {
        const v = (document.getElementById('order-number-val').textContent || '').replace(/^#/, '').trim();
        if (navigator.clipboard) navigator.clipboard.writeText(v).catch(function() {});
        const ic = copyBtn.querySelector('span');
        ic.textContent = 'check';
        setTimeout(function() { ic.textContent = 'content_copy'; }, 1500);
      });

      if (submitBtn) {
        submitBtn.addEventListener('click', function() {
          // Simpan ringkasan ulasan untuk ditampilkan di halaman ulasan-terkirim.html
          try {
            const chipsOn = [].map.call(document.querySelectorAll('.feedback-chip.bg-primary'), function(c) { return c.textContent.replace(/\s+/g, ' ').trim(); });
            localStorage.setItem('yarka_ulasan', JSON.stringify({
              rating: rating,
              label: ratingDescriptions[rating],
              suka: chipsOn,
              catatan: (document.getElementById('feedback-text').value || '').trim(),
              ref: (document.getElementById('order-number-val').textContent || '').trim(),
              waktu: Date.now()
            }));
          } catch (e) {}
          submitBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span><span>Terima Kasih atas Ulasan Anda!</span>';
          submitBtn.classList.replace('bg-primary', 'bg-secondary');
          setTimeout(hideModal, 1200);
        });
      }

      const ratingButtons = document.querySelectorAll('.star-rating-btn');
      const ratingLabel = document.getElementById('star-rating-label');
      const ratingDescriptions = {
        '1': 'Perlu Peningkatan (1/5)',
        '2': 'Cukup Baik (2/5)',
        '3': 'Baik (3/5)',
        '4': 'Memuaskan (4/5)',
        '5': 'Sangat Memuaskan (5/5)'
      };

      ratingButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const selectedVal = parseInt(this.getAttribute('data-val'), 10);
          rating = selectedVal;
          ratingButtons.forEach(innerBtn => {
            const innerVal = parseInt(innerBtn.getAttribute('data-val'), 10);
            const icon = innerBtn.querySelector('span');
            innerBtn.setAttribute('aria-pressed', innerVal === selectedVal ? 'true' : 'false');
            if (innerVal <= selectedVal) {
              icon.style.fontVariationSettings = "'FILL' 1";
              icon.classList.remove('text-outline-variant');
              icon.classList.add('text-primary');
            } else {
              icon.style.fontVariationSettings = "'FILL' 0";
              icon.classList.remove('text-primary');
              icon.classList.add('text-outline-variant');
            }
          });
          if (ratingLabel) {
            ratingLabel.textContent = ratingDescriptions[selectedVal.toString()];
          }
        });
      });

      const chips = document.querySelectorAll('.feedback-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', function() {
          if (this.classList.contains('bg-primary')) {
            this.classList.replace('bg-primary', 'bg-surface-container');
            this.classList.replace('text-on-primary', 'text-on-surface-variant');
            this.classList.add('hover:text-primary');
            this.setAttribute('aria-pressed', 'false');
          } else {
            this.classList.replace('bg-surface-container', 'bg-primary');
            this.classList.replace('text-on-surface-variant', 'text-on-primary');
            this.classList.remove('hover:text-primary');
            this.setAttribute('aria-pressed', 'true');
          }
        });
      });
    })();
