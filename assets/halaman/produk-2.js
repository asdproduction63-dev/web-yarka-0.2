// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: produk.html
let currentQuantity = 1;
    let selectedColor = 'Buttercream';
    let selectedSize = 'M';

    function switchImage(index) {
      const thumbs = document.querySelectorAll('#gallery-thumbs .thumb-btn');
      thumbs.forEach((t, i) => {
        if(i === index) {
          t.classList.remove('opacity-60');
          t.classList.add('opacity-100', 'scale-100');
        } else {
          t.classList.remove('opacity-100', 'scale-100');
          t.classList.add('opacity-60');
        }
      });
    }

    function selectColor(btn, colorName) {
      selectedColor = colorName;
      document.getElementById('selected-color-label').innerText = colorName;
      document.querySelectorAll('.color-btn').forEach(b => {
        b.classList.remove('scale-110');
        const indicator = b.querySelector('.color-indicator');
        if(indicator) indicator.classList.add('hidden');
      });
      btn.classList.add('scale-110');
      const activeIndicator = btn.querySelector('.color-indicator');
      if(activeIndicator) activeIndicator.classList.remove('hidden');
    }

    function selectSize(btn, size) {
      selectedSize = size;
      document.querySelectorAll('.size-btn').forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container-low', 'text-primary');
      });
      btn.classList.remove('bg-surface-container-low', 'text-primary');
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
    }

    function adjustQty(amount) {
      currentQuantity = Math.max(1, currentQuantity + amount);
      document.getElementById('qty-val').innerText = currentQuantity;
    }

    function toggleWishlist(btn) {
      const icon = document.getElementById('wishlist-icon');
      if (icon.innerText === 'favorite_border') {
        icon.innerText = 'favorite';
        icon.classList.add('text-error');
      } else {
        icon.innerText = 'favorite_border';
        icon.classList.remove('text-error');
      }
    }

    function switchTab(tabKey) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      const activePanel = document.getElementById('tab-' + tabKey);
      if(activePanel) activePanel.classList.remove('hidden');

      document.querySelectorAll('.tab-trigger').forEach(btn => {
        btn.classList.remove('text-primary', 'font-bold', 'shadow-[0_2px_0_0_currentColor]');
        btn.classList.add('text-on-surface-variant', 'font-medium');
      });

      const activeBtn = document.querySelector(`.tab-trigger[data-target="${tabKey}"]`);
      if(activeBtn) {
        activeBtn.classList.remove('text-on-surface-variant', 'font-medium');
        activeBtn.classList.add('text-primary', 'font-bold', 'shadow-[0_2px_0_0_currentColor]');
      }
    }

    function toggleSizeModal(show) {
      const modal = document.getElementById('size-guide-modal');
      const box = document.getElementById('size-modal-box');
      if(show) {
        modal.classList.remove('hidden');
        setTimeout(() => {
          modal.classList.remove('opacity-0');
          box.classList.remove('scale-95');
          box.classList.add('scale-100');
        }, 10);
      } else {
        modal.classList.add('opacity-0');
        box.classList.remove('scale-100');
        box.classList.add('scale-95');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 300);
      }
    }

    function orderViaWhatsApp() {
      const message = `Halo Yarka, saya ingin memesan Zen Abaya warna ${selectedColor} ukuran ${selectedSize} sejumlah ${currentQuantity} pcs.`;
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/6285282437954?text=${encoded}`, '_blank');
    }

    function handleAddToCart() {
      const toast = document.getElementById('cart-toast');
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3500);
    }
