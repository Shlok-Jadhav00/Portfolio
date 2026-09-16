/**
 * hud/hotbar.js — 9-slot hotbar with slot numbers, keyboard hints
 * Ref: all reference images — numbered slots 1-9, bottom hint bar
 */

import { showTooltip, hideTooltip } from '../components/tooltip.js';

let hotbarEl = null;
let slots = [];
let onNavigate = null;

export function initHotbar(container, config, navigateFn) {
  onNavigate = navigateFn;
  hotbarEl = document.createElement('div');
  hotbarEl.className = 'hotbar no-select';

  config.hud.hotbarSlots.forEach((slot, i) => {
    const slotEl = document.createElement('div');
    slotEl.className = 'hotbar-slot';
    slotEl.dataset.index = i;

    // Slot number label (1-9)
    const numLabel = document.createElement('span');
    numLabel.className = 'hotbar-slot-num';
    numLabel.textContent = (i + 1).toString();
    slotEl.appendChild(numLabel);

    const img = document.createElement('img');
    img.src = slot.icon;
    img.alt = slot.label;
    img.width = 28;
    img.height = 28;
    // Fallback for missing icons
    img.onerror = () => {
      img.style.display = 'none';
      const fallback = document.createElement('span');
      fallback.textContent = slot.label[0];
      fallback.style.cssText = 'font-size:16px;color:var(--mc-text-dim);';
      slotEl.appendChild(fallback);
    };
    slotEl.appendChild(img);

    // Hover tooltip
    slotEl.addEventListener('mouseenter', (e) => {
      showTooltip(e, { title: slot.label });
    });
    slotEl.addEventListener('mousemove', (e) => {
      showTooltip(e, { title: slot.label });
    });
    slotEl.addEventListener('mouseleave', hideTooltip);

    // Click to navigate
    slotEl.addEventListener('click', () => {
      if (onNavigate) onNavigate(i);
    });

    slots.push(slotEl);
    hotbarEl.appendChild(slotEl);
  });

  container.appendChild(hotbarEl);

  // Keyboard hints bar at very bottom
  const hintsEl = document.createElement('div');
  hintsEl.className = 'hotbar-hints no-select';
  hintsEl.innerHTML = `<span>1-9</span> select &nbsp;|&nbsp; <span>← →</span> cycle &nbsp;|&nbsp; <span>M</span> mine &nbsp;|&nbsp; <span>J</span> jukebox &nbsp;|&nbsp; <span>Esc</span> home &nbsp;|&nbsp; <span>F3</span> debug`;
  container.appendChild(hintsEl);

  setActive(0);
}

export function setActive(index) {
  slots.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
}
