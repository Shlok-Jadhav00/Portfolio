/**
 * screens/about.js — Screen 2: Player Profile
 * Face avatar, bio, stat rows, GitHub CTA
 */

import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-about');

  const statsHTML = screenConfig.stats.map(stat => `
    <div class="mc-stat-row">
      <span class="mc-stat-label">${stat.label}</span>
      <span class="mc-stat-value">${stat.value}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="about-panel mc-panel">
      <h2 class="mc-panel-title">Player Profile</h2>
      <div class="about-layout-grid">
        <div class="about-avatar-box">
          <img class="about-face pixelated" src="${screenConfig.face}" alt="Player Face"
               onerror="this.style.background='#1a1a1a';this.alt='';" />
        </div>
        <div class="about-content">
          <p class="about-bio">${screenConfig.bio}</p>
          <div class="about-stats">
            ${statsHTML}
          </div>
          <a class="mc-btn mc-btn--sm about-cta" href="${screenConfig.cta.url}" target="_blank" rel="noopener">
            ${screenConfig.cta.label}
          </a>
        </div>
      </div>
    </div>
    <img class="about-character pixelated" src="${screenConfig.character}" alt="" onerror="this.style.display='none'" />
  `;

  mountBackground(container, screenConfig);
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-about');
  container.innerHTML = '';
}
