/**
 * hud/hearts.js — Hearts + Hunger display (decorative)
 * 10 hearts (left) + 10 hunger icons (right)
 * Always full — purely visual
 */

export function initHearts(container) {
  // Hearts row (bottom-left of hotbar)
  const heartsRow = document.createElement('div');
  heartsRow.className = 'hearts-row no-select';

  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-icon';
    heart.textContent = '❤';
    heart.style.color = 'var(--mc-red-hearts)';
    heart.style.filter = 'drop-shadow(1px 1px 0 #3f0000)';
    heartsRow.appendChild(heart);
  }

  // Hunger row (bottom-right of hotbar)
  const hungerRow = document.createElement('div');
  hungerRow.className = 'hunger-row no-select';

  for (let i = 0; i < 10; i++) {
    const leg = document.createElement('span');
    leg.className = 'hunger-icon';
    leg.textContent = '🍗';
    leg.style.filter = 'drop-shadow(1px 1px 0 #3f2000)';
    hungerRow.appendChild(leg);
  }

  container.appendChild(heartsRow);
  container.appendChild(hungerRow);
}
