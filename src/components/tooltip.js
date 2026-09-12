/**
 * components/tooltip.js — Reusable MC-style item tooltip
 * Used by: hotbar, projects, skills, what-i-build
 */

let tooltipEl = null;

function ensureTooltip() {
  if (tooltipEl) return;
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'mc-tooltip';
  tooltipEl.id = 'mc-tooltip';
  document.body.appendChild(tooltipEl);
}

/**
 * Show tooltip near the mouse cursor.
 * @param {MouseEvent} e
 * @param {Object} data - Tooltip content
 * @param {string} data.title - Main title
 * @param {string} [data.type] - Item type line
 * @param {string} [data.stack] - Tech stack line
 * @param {string} [data.status] - Status line
 * @param {string} [data.desc] - Description line
 */
export function showTooltip(e, data) {
  ensureTooltip();

  let html = '';
  if (data.title) {
    html += `<div class="mc-tooltip-title">${data.title}</div>`;
  }

  const hasDetails = data.type || data.stack || data.status || data.desc;
  if (hasDetails) {
    html += '<hr class="mc-tooltip-separator">';
  }

  if (data.type) {
    html += `<div class="mc-tooltip-line mc-tooltip-line--type">Type: ${data.type}</div>`;
  }
  if (data.stack) {
    html += `<div class="mc-tooltip-line mc-tooltip-line--stack">Stack: ${data.stack}</div>`;
  }
  if (data.status) {
    const statusSymbol = data.status === 'complete' ? '◆' : '◇';
    const statusText = data.status === 'complete' ? 'Complete' : 'In Progress';
    html += `<div class="mc-tooltip-line mc-tooltip-line--status">Status: ${statusSymbol} ${statusText}</div>`;
  }
  if (data.desc) {
    html += `<div class="mc-tooltip-line mc-tooltip-line--desc">${data.desc}</div>`;
  }

  tooltipEl.innerHTML = html;

  // Position near cursor
  positionTooltip(e);
  tooltipEl.classList.add('visible');
}

export function hideTooltip() {
  if (tooltipEl) {
    tooltipEl.classList.remove('visible');
  }
}

function positionTooltip(e) {
  if (!tooltipEl) return;

  const offsetX = 16;
  const offsetY = 16;
  let x = e.clientX + offsetX;
  let y = e.clientY + offsetY;

  // Prevent overflow
  const rect = tooltipEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (x + rect.width > vw - 8) {
    x = e.clientX - rect.width - offsetX;
  }
  if (y + rect.height > vh - 8) {
    y = e.clientY - rect.height - offsetY;
  }

  tooltipEl.style.left = `${x}px`;
  tooltipEl.style.top = `${y}px`;
}
