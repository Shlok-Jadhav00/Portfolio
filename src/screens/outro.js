/**
 * screens/outro.js — Screen 9: The End
 * "Thanks for Playing", poem text, Respawn button
 */

import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-outro');

  const bodyLines = screenConfig.body.map(
    line => `<div class="outro-line">${line}</div>`
  ).join('');

  container.innerHTML = `
    <img class="outro-character pixelated" src="${screenConfig.character}" alt="" onerror="this.style.display='none'" />
    <div class="outro-content">
      <p class="outro-eyebrow">${screenConfig.eyebrow}</p>
      <h1 class="outro-title">${screenConfig.title}</h1>
      <div class="outro-body">
        ${bodyLines}
      </div>
      <button class="mc-btn mc-btn--lg" id="outro-respawn-btn">
        ${screenConfig.cta.label}
      </button>
    </div>
  `;

  mountBackground(container, screenConfig);

  // Respawn → Hero
  const respawnBtn = container.querySelector('#outro-respawn-btn');
  if (respawnBtn) {
    respawnBtn.addEventListener('click', () => {
      if (navigate) navigate(screenConfig.cta.screen);
    });
  }
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-outro');
  container.innerHTML = '';
}
