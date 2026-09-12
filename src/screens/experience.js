/**
 * screens/experience.js — Screen 5: Crafting Table
 * Ref: 05-experience.png — Horizontal: recipe slots → arrow → date/title/desc
 */

import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-experience');

  const entriesHTML = screenConfig.list.map(entry => {
    const inputs = entry.recipeInput.map(
      item => `<div class="craft-item">${item}</div>`
    ).join('');

    return `
      <div class="craft-entry">
        <div class="craft-recipe">
          <div class="craft-input">${inputs}</div>
          <span class="craft-arrow">→</span>
        </div>
        <div class="craft-details">
          <div class="craft-date">${entry.dateRange}</div>
          <div class="craft-title">${entry.title}</div>
          <div class="craft-org">${entry.desc}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="experience-panel mc-panel">
      <h2 class="mc-panel-title">${screenConfig.title}</h2>
      ${entriesHTML}
    </div>
  `;

  mountBackground(container, screenConfig);
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-experience');
  container.innerHTML = '';
}
