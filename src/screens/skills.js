/**
 * screens/skills.js — Screen 3: Enchantment Table
 * Enchantment bars with Roman numeral levels and hover tooltips
 */

import { showTooltip, hideTooltip } from '../components/tooltip.js';
import { mountBackground, unmountBackground } from '../utils/background.js';

const GLYPHS = '⍑⊣⋮⍊⋏⊢⍝⊔⊓⋄⋊⊰⊱⊗⊕⊘⊖⊚⊙⊛⋈⋉⊲⊳⋐⋑';

export function mount(container, screenConfig, config, navigate) {
  container.classList.add('screen-skills');

  const skillsHTML = screenConfig.list.map(skill => {
    const levelClass = `skill-bar-fill--${skill.level.toLowerCase()}`;
    return `
      <div class="skill-row" data-tip="${skill.tip}">
        <span class="skill-level">${skill.level}</span>
        <span class="skill-name">${skill.name}</span>
        <div class="skill-bar-container">
          <div class="skill-bar-fill ${levelClass}" style="width: ${skill.bar}%"></div>
        </div>
        <span class="skill-percent">${skill.bar}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="enchant-particles" id="enchant-particles"></div>
    <div class="skills-panel mc-panel">
      <h2 class="mc-panel-title">Enchantments</h2>
      ${skillsHTML}
      <p class="skills-hint">${screenConfig.hint}</p>
    </div>
  `;

  mountBackground(container, screenConfig);

  // Hover tooltips
  container.querySelectorAll('.skill-row').forEach(row => {
    row.addEventListener('mouseenter', (e) => {
      const name = row.querySelector('.skill-name').textContent;
      const tip = row.dataset.tip;
      showTooltip(e, { title: name, desc: tip });
    });
    row.addEventListener('mousemove', (e) => {
      const name = row.querySelector('.skill-name').textContent;
      const tip = row.dataset.tip;
      showTooltip(e, { title: name, desc: tip });
    });
    row.addEventListener('mouseleave', hideTooltip);
  });

  // Spawn enchanting particles
  spawnParticles(container.querySelector('#enchant-particles'));
}

function spawnParticles(particlesContainer) {
  if (!particlesContainer) return;
  for (let i = 0; i < 20; i++) {
    const glyph = document.createElement('span');
    glyph.className = 'enchant-glyph';
    glyph.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    glyph.style.left = `${Math.random() * 100}%`;
    glyph.style.animationDelay = `${Math.random() * 6}s`;
    glyph.style.animationDuration = `${4 + Math.random() * 4}s`;
    glyph.style.fontSize = `${10 + Math.random() * 10}px`;
    particlesContainer.appendChild(glyph);
  }
}

export function unmount(container) {
  unmountBackground(container);
  container.classList.remove('screen-skills');
  container.innerHTML = '';
}
