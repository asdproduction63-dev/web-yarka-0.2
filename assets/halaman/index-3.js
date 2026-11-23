// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: index.html
// Countdown Timer Micro-interaction
  function initCountdown() {
    let days = 4;
    let hours = 16;
    let minutes = 42;
    let seconds = 18;

    const dElem = document.getElementById('days');
    const hElem = document.getElementById('hours');
    const mElem = document.getElementById('minutes');
    const sElem = document.getElementById('seconds');

    if (!dElem || !hElem || !mElem || !sElem) return;

    setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;
          if (hours > 0) {
            hours--;
          } else {
            hours = 23;
            if (days > 0) days--;
          }
        }
      }
      dElem.innerText = String(days).padStart(2, '0');
      hElem.innerText = String(hours).padStart(2, '0');
      mElem.innerText = String(minutes).padStart(2, '0');
      sElem.innerText = String(seconds).padStart(2, '0');
    }, 1000);
  }

  // Quick Add To Cart Interaction
  function initQuickAdd() {
    const toast = document.getElementById('quick-toast');
    const toastMsg = document.getElementById('toast-message');
    const quickButtons = document.querySelectorAll('.quick-add-btn');

    quickButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.group');
        const title = card ? card.querySelector('h3').innerText : 'Item';
        
        if (toast && toastMsg) {
          toastMsg.innerText = title + ' berhasil ditambahkan ke keranjang.';
          toast.classList.remove('translate-y-24', 'opacity-0');
          toast.classList.add('translate-y-0', 'opacity-100');
          
          setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-24', 'opacity-0');
          }, 3200);
        }
      });
    });
  }

  // Wishlist Toggle Interaction
  function initWishlist() {
    const wishButtons = document.querySelectorAll('.wishlist-btn');
    wishButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
          if (icon.style.fontVariationSettings.includes("'FILL' 1")) {
            icon.style.fontVariationSettings = "'FILL' 0";
            btn.classList.remove('text-error');
          } else {
            icon.style.fontVariationSettings = "'FILL' 1";
            btn.classList.add('text-error');
          }
        }
      });
    });
  }

  // Initialize scripts on load
  document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
  });
