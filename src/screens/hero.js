/**
 * screens/hero.js — Screen 1: Main Menu
 * Ref: 01-hero.png — Title+splash, stacked buttons, 
 * Contact+TheEnd side-by-side, hint text, character right
 */

import { mountBackground, unmountBackground } from '../utils/background.js';
import { openMinigame } from '../components/minigame.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-hero');

  // Build button rows: first 3 full-width, then 2 side-by-side, then minigame
  const buttons = screenConfig.buttons;
  let buttonsHTML = '';

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    
    // Contact (3) and The End (4) are side-by-side
    if (i === 3) {
      buttonsHTML += `<div class="hero-menu-row">`;
      buttonsHTML += `<button class="mc-btn mc-btn--lg" data-screen="${btn.screen}">${btn.label}</button>`;
      continue;
    }
    if (i === 4) {
      buttonsHTML += `<button class="mc-btn mc-btn--lg" data-screen="${btn.screen}">${btn.label}</button>`;
      buttonsHTML += `</div>`;
      continue;
    }
    
    // All others are full width
    buttonsHTML += `<button class="mc-btn mc-btn--lg" data-screen="${btn.screen}">${btn.label}</button>`;
  }

  container.innerHTML = `
    <div class="hero-title-wrap">
      <h1 class="hero-title">${screenConfig.title}</h1>
      <p class="hero-subtitle">${screenConfig.subtitle}</p>
    </div>
    <span class="hero-splash">Built in Nashik!</span>
    <nav class="hero-menu">
      ${buttonsHTML}
      <p class="hero-hint">Press 1-9 or click the hotbar : M to mine</p>
    </nav>
    <p class="hero-disclaimer">${screenConfig.disclaimer}</p>
  `;

  mountBackground(container, screenConfig);

  // Button click handlers
  container.querySelectorAll('.mc-btn[data-screen]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetScreen = parseInt(btn.dataset.screen);
      if (targetScreen === 9) {
        openMinigame();
      } else if (navigate) {
        navigate(targetScreen);
      }
    });
  });
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-hero');
  container.innerHTML = '';
}
