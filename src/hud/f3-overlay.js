/**
 * hud/f3-overlay.js — F3 debug panel
 * Shows: Name + version, Biome, Elapsed time
 * Toggle with F3 key
 */

let overlayEl = null;
let nameEl = null;
let biomeEl = null;
let timeEl = null;
let startTime = Date.now();
let timerInterval = null;
let visible = true;

export function initF3Overlay(container, config) {
  overlayEl = document.createElement('div');
  overlayEl.className = 'f3-overlay';
  overlayEl.id = 'f3-overlay';

  const content = document.createElement('div');

  nameEl = document.createElement('div');
  nameEl.textContent = `${config.meta.name} ${config.meta.version}`;

  biomeEl = document.createElement('div');
  biomeEl.textContent = 'Biome: Overworld';

  timeEl = document.createElement('div');
  timeEl.textContent = 'Day 0: 00:00';

  content.appendChild(nameEl);
  content.appendChild(biomeEl);
  content.appendChild(timeEl);
  overlayEl.appendChild(content);
  container.appendChild(overlayEl);

  // Start elapsed timer
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 1000);
  updateTime();

  // F3 toggle listener
  document.addEventListener('keydown', handleF3);
}

function updateTime() {
  if (!timeEl) return;
  const elapsed = Date.now() - startTime;
  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  timeEl.textContent = `Day 0: ${minutes}:${seconds}`;
}

function handleF3(e) {
  if (e.key === 'F3') {
    e.preventDefault();
    visible = !visible;
    overlayEl.classList.toggle('hidden', !visible);
  }
}

export function setBiome(biomeName) {
  if (biomeEl) {
    biomeEl.textContent = `Biome: ${biomeName}`;
  }
}
