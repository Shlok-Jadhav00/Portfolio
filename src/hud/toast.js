/**
 * hud/toast.js — Advancement toast notification
 * "Advancement Made!" golden toast, slides in from top-right
 * Auto-dismiss after 3s
 */

let toastEl = null;
let toastTimeout = null;

export function initToast(container) {
  toastEl = document.createElement('div');
  toastEl.className = 'mc-toast';
  toastEl.id = 'advancement-toast';

  toastEl.innerHTML = `
    <span class="mc-toast-icon">🏆</span>
    <div class="mc-toast-content">
      <span class="mc-toast-label">Advancement Made!</span>
      <span class="mc-toast-title"></span>
    </div>
  `;

  container.appendChild(toastEl);
}

export function showToast(screenName) {
  if (!toastEl) return;

  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastEl.classList.remove('show');
  }

  // Set screen name
  toastEl.querySelector('.mc-toast-title').textContent = screenName;

  // Small delay for re-trigger animation reset
  requestAnimationFrame(() => {
    toastEl.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3000);
  });
}
