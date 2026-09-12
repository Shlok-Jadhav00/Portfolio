/**
 * screens/contact.js — Screen 8: Let's Connect
 * Contact info rows with icons, CTA to Screen 9
 */

import { mountBackground, unmountBackground } from '../utils/background.js';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-contact');

  const linksHTML = screenConfig.links.map(link => {
    const valueContent = link.href
      ? `<a href="${link.href}" target="_blank" rel="noopener">${link.value}</a>`
      : `<span>${link.value}</span>`;

    return `
      <div class="contact-row">
        <span class="contact-icon">${link.icon}</span>
        <div class="contact-info">
          <div class="contact-label">${link.label}</div>
          <div class="contact-value">${valueContent}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="contact-panel mc-panel">
      <h2 class="mc-panel-title">Let's Connect</h2>
      <p class="contact-tagline">${screenConfig.tagline}</p>
      ${linksHTML}
      <div class="contact-page">Page 1 / 1</div>
      <div class="contact-cta">
        <button class="mc-btn mc-btn--sm" id="contact-cta-btn">
          ${screenConfig.cta.label}
        </button>
      </div>
    </div>
  `;

  mountBackground(container, screenConfig);

  // CTA → Outro
  const ctaBtn = container.querySelector('#contact-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (navigate) navigate(screenConfig.cta.screen);
    });
  }
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-contact');
  container.innerHTML = '';
}
