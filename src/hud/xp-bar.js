/**
 * hud/xp-bar.js — XP bar fill + level counter
 * 11 XP per new screen visit, level up every 33 XP
 */

import gsap from 'gsap';

let xpBarEl = null;
let fillEl = null;
let levelEl = null;
let xpPoints = 0;
let level = 0;
const MAX_XP = 99;

export function initXpBar(container, config) {
  const xpConfig = config.hud.xp;

  xpBarEl = document.createElement('div');
  xpBarEl.className = 'xp-bar-container no-select';

  fillEl = document.createElement('div');
  fillEl.className = 'xp-bar-fill';

  levelEl = document.createElement('div');
  levelEl.className = 'xp-bar-level';
  levelEl.textContent = `${level}`;

  xpBarEl.appendChild(fillEl);
  xpBarEl.appendChild(levelEl);
  container.appendChild(xpBarEl);
}

export function addVisit(screenIndex, config) {
  const xpConfig = config.hud.xp;
  xpPoints = Math.min(xpPoints + xpConfig.pointsPerScreen, MAX_XP);

  const newLevel = Math.floor(xpPoints / xpConfig.levelThreshold);
  const leveledUp = newLevel > level;
  level = newLevel;

  // Animate XP bar fill
  const percent = (xpPoints / MAX_XP) * 100;
  gsap.to(fillEl, {
    width: `${percent}%`,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Update level text
  levelEl.textContent = `${level}`;

  // Glow effect on level up
  if (leveledUp) {
    gsap.fromTo(levelEl, {
      scale: 1.5,
      color: '#ffcc00',
    }, {
      scale: 1,
      color: '#7af850',
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    });
  }

  return leveledUp;
}
