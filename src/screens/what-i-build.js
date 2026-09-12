/**
 * screens/what-i-build.js — Screen 7: Villager Trades
 * Capability list, status badges, stats bar, villager NPC
 */

import { showTooltip, hideTooltip } from '../components/tooltip.js';
import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-what-i-build');

  const capsHTML = screenConfig.capabilities.map(cap => {
    const badgeClass = `mc-badge mc-badge--${cap.status}`;
    const statusLabel = cap.status.charAt(0).toUpperCase() + cap.status.slice(1);

    return `
      <div class="wib-capability" data-tip-name="${cap.name}" data-tip-desc="${cap.desc}" data-tip-stack="${cap.stack.join(', ')}">
        <span class="wib-cap-icon">${cap.icon}</span>
        <div class="wib-cap-info">
          <div class="wib-cap-name">${cap.name}</div>
          <div class="wib-cap-desc">${cap.desc}</div>
          <div class="wib-cap-stack">${cap.stack.join(' · ')}</div>
        </div>
        <span class="${badgeClass}">${statusLabel}</span>
      </div>
    `;
  }).join('');

  const statsHTML = screenConfig.stats.map(s =>
    `<span class="wib-stat"><span class="wib-stat-value">${s.value}</span> ${s.label}</span>`
  ).join('');

  container.innerHTML = `
    <div class="wib-panel mc-panel">
      <h2 class="mc-panel-title">What I Build</h2>
      <div class="wib-profession">${screenConfig.profession}: Level ${screenConfig.level}</div>
      ${capsHTML}
      <div class="wib-stats-bar">${statsHTML}</div>
    </div>
    <img class="wib-villager pixelated" src="${screenConfig.villager}" alt="Villager NPC"
         onerror="this.style.display='none';" />
    <img class="wib-character pixelated" src="${screenConfig.character}" alt="" onerror="this.style.display='none'" />
  `;

  mountBackground(container, screenConfig);

  // Hover tooltips on capabilities
  container.querySelectorAll('.wib-capability').forEach(row => {
    row.addEventListener('mouseenter', (e) => {
      showTooltip(e, {
        title: row.dataset.tipName,
        desc: row.dataset.tipDesc,
        stack: row.dataset.tipStack,
      });
    });
    row.addEventListener('mousemove', (e) => {
      showTooltip(e, {
        title: row.dataset.tipName,
        desc: row.dataset.tipDesc,
        stack: row.dataset.tipStack,
      });
    });
    row.addEventListener('mouseleave', hideTooltip);
  });
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-what-i-build');
  container.innerHTML = '';
}
