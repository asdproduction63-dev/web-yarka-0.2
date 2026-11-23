// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: checkout.html
// Simple interactive shipping radio toggle micro-interaction
  document.querySelectorAll('input[name="shipping_service"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      document.querySelectorAll('.shipping-indicator').forEach(function(dot) {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-transparent');
      });
      const activeContainer = this.closest('label').querySelector('.shipping-indicator');
      if (activeContainer) {
        activeContainer.classList.remove('bg-transparent');
        activeContainer.classList.add('bg-primary');
      }
    });
  });
