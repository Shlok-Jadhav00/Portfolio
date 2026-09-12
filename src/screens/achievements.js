/**
 * screens/achievements.js — Screen 6: Advancements Panel
 * Achievement list with complete/locked status, CTA button
 */

import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-achievements');

  const rowsHTML = screenConfig.list.map(a => {
    const isLocked = a.status === 'locked';
    const rowClass = isLocked ? 'achievement-row achievement-row--locked' : 'achievement-row';
    const checkIcon = isLocked
      ? '<span class="achievement-check achievement-check--locked">🔒</span>'
      : '<span class="achievement-check achievement-check--done">✓</span>';

    return `
      <div class="${rowClass}">
        <span class="achievement-icon">${a.icon}</span>
        <div class="achievement-info">
          <div class="achievement-title">${a.title}</div>
          <div class="achievement-desc">${a.desc}</div>
        </div>
        ${checkIcon}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="achievements-panel mc-panel">
      <h2 class="mc-panel-title">Advancements</h2>
      ${rowsHTML}
      <div class="achievements-cta">
        <button class="mc-btn mc-btn--sm" id="achievements-cta-btn">
          ${screenConfig.cta.label}
        </button>
      </div>
    </div>
  `;

  mountBackground(container, screenConfig);

  // CTA navigates to Contact
  const ctaBtn = container.querySelector('#achievements-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (navigate) navigate(screenConfig.cta.screen);
    });
  }
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-achievements');
  container.innerHTML = '';
}
