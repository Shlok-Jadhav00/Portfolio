/**
 * screens/projects.js — Screen 4: Chest Inventory
 * Ref: 04-projects.png — 6-column grid, hint text, See Trades CTA
 */

import { showTooltip, hideTooltip } from '../components/tooltip.js';
import { openModal } from '../components/modal.js';
import { mountBackground, unmountBackground } from '../utils/background.js';

const FALLBACK_ICONS = ['🔮', '🧭', '☕', '⚡', '🗺', '⚙'];

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-projects');

  const totalSlots = 12; // 2 rows × 6
  const projectList = screenConfig.list;

  let slotsHTML = '';
  for (let i = 0; i < 6; i++) {
    if (i < projectList.length) {
      const p = projectList[i];
      const fallback = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
      slotsHTML += `
        <div class="chest-slot chest-slot--filled" data-project-index="${i}">
          <img src="${p.icon}" alt="${p.name}"
               onerror="this.style.display='none';this.parentElement.querySelector('.chest-slot-emoji').style.display='block';" />
          <span class="chest-slot-emoji" style="display:none;">${fallback}</span>
        </div>
      `;
    } else {
      slotsHTML += `<div class="chest-slot"></div>`;
    }
  }

  // Second row — remaining projects or empty
  let invHTML = '';
  for (let i = 0; i < 6; i++) {
    invHTML += `<div class="inv-slot"></div>`;
  }

  container.innerHTML = `
    <div class="projects-panel mc-panel">
      <h2 class="mc-panel-title">${screenConfig.chestTitle}</h2>
      <div class="chest-grid">
        ${slotsHTML}
      </div>
      <div class="chest-inventory">
        ${invHTML}
      </div>
      <p class="projects-hint">Hover an item for details</p>
      <div class="projects-cta">
        <button class="mc-btn mc-btn--sm" data-screen="6">See Trades</button>
      </div>
    </div>
  `;

  mountBackground(container, screenConfig);

  // Hover tooltips and click to open modal
  container.querySelectorAll('.chest-slot--filled').forEach(slot => {
    const idx = parseInt(slot.dataset.projectIndex);
    const project = projectList[idx];

    slot.addEventListener('mouseenter', (e) => {
      showTooltip(e, {
        title: project.name,
        type: project.type,
        stack: project.stack.join(', '),
        status: project.status,
        desc: project.desc,
      });
    });

    slot.addEventListener('mousemove', (e) => {
      showTooltip(e, {
        title: project.name,
        type: project.type,
        stack: project.stack.join(', '),
        status: project.status,
        desc: project.desc,
      });
    });

    slot.addEventListener('mouseleave', hideTooltip);

    slot.addEventListener('click', () => {
      hideTooltip();
      openModal(project);
    });
  });

  // "See Trades" CTA
  const ctaBtn = container.querySelector('[data-screen="6"]');
  if (ctaBtn && navigate) {
    ctaBtn.addEventListener('click', () => navigate(6));
  }
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-projects');
  container.innerHTML = '';
}
