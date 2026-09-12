/**
 * router.js — Screen navigation logic
 * Handles keyboard (1-9, arrows) and hotbar click navigation ONLY
 * No scroll navigation. Manages screen lifecycle (mount/unmount) and transitions.
 */

import gsap from 'gsap';
import { setActive } from './hud/hotbar.js';
import { addVisit } from './hud/xp-bar.js';
import { setBiome } from './hud/f3-overlay.js';
import { showToast } from './hud/toast.js';
import { isModalOpen } from './components/modal.js';
import { isMinigameOpen } from './components/minigame.js';

// Screen modules
import * as hero from './screens/hero.js';
import * as about from './screens/about.js';
import * as skills from './screens/skills.js';
import * as projects from './screens/projects.js';
import * as experience from './screens/experience.js';
import * as achievements from './screens/achievements.js';
import * as whatIBuild from './screens/what-i-build.js';
import * as contact from './screens/contact.js';
import * as outro from './screens/outro.js';

const screens = [hero, about, skills, projects, experience, achievements, whatIBuild, contact, outro];
const screenConfigKeys = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'whatIBuild', 'contact', 'outro'];

let currentScreen = 0;
let visitedScreens = new Set();
let isTransitioning = false;
let config = null;
let containerEl = null;

export function initRouter(container, cfg) {
  config = cfg;
  containerEl = container;

  // Mount first screen
  mountScreen(0, false);
  visitedScreens.add(0);

  // Keyboard navigation only (no scroll)
  document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
  // Don't navigate if modal or minigame is open
  if (isModalOpen() || isMinigameOpen()) return;

  const key = e.key;

  // Number keys 1-9
  if (key >= '1' && key <= '9') {
    e.preventDefault();
    goTo(parseInt(key) - 1);
    return;
  }

  // Arrow keys
  if (key === 'ArrowLeft') {
    e.preventDefault();
    goTo(currentScreen - 1);
    return;
  }
  if (key === 'ArrowRight') {
    e.preventDefault();
    goTo(currentScreen + 1);
    return;
  }
}

export function goTo(index) {
  // Clamp
  index = Math.max(0, Math.min(8, index));
  if (index === currentScreen || isTransitioning) return;

  isTransitioning = true;
  const prevIndex = currentScreen;

  // Create new screen container
  const newScreenEl = document.createElement('div');
  newScreenEl.className = 'screen';
  newScreenEl.id = `screen-${index}`;

  // New screen starts invisible (opacity 0)
  gsap.set(newScreenEl, { opacity: 0 });
  containerEl.appendChild(newScreenEl);

  // Mount new screen content
  const screenModule = screens[index];
  const configKey = screenConfigKeys[index];
  screenModule.mount(newScreenEl, config[configKey], config, goTo);

  // Get current screen element
  const currentEl = containerEl.querySelector(`#screen-${prevIndex}`);

  // Instant snap transition — fade out old, fade in new (like MC inventory open)
  const tl = gsap.timeline({
    onComplete: () => {
      // Unmount old screen
      if (currentEl) {
        screens[prevIndex].unmount(currentEl);
        currentEl.remove();
      }
      isTransitioning = false;
    }
  });

  // Quick crossfade (150ms) — snappy like MC
  tl.to(currentEl, {
    opacity: 0,
    duration: 0.15,
    ease: 'none',
  }, 0);

  tl.to(newScreenEl, {
    opacity: 1,
    duration: 0.15,
    ease: 'none',
  }, 0.05);

  // Update HUD
  setActive(index);
  setBiome(config[configKey].biome);

  // XP and toast on first visit
  if (!visitedScreens.has(index)) {
    addVisit(index, config);
    showToast(config.hud.hotbarSlots[index].label);
    visitedScreens.add(index);
  }

  currentScreen = index;
}

function mountScreen(index) {
  const screenEl = document.createElement('div');
  screenEl.className = 'screen';
  screenEl.id = `screen-${index}`;
  containerEl.appendChild(screenEl);

  const screenModule = screens[index];
  const configKey = screenConfigKeys[index];
  screenModule.mount(screenEl, config[configKey], config, goTo);

  // Update HUD
  setActive(index);
  setBiome(config[configKey].biome);
}
