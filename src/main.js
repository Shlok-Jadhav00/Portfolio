/**
 * main.js — Boot: imports config, initializes router + HUD
 * Entry point for the Minecraft Portfolio
 */

// ── Styles ──
import './styles/tokens.css';
import './styles/reset.css';
import './styles/panels.css';
import './styles/hud.css';
import './styles/tooltip.css';
import './styles/toast.css';
import './styles/modal.css';

// Screen styles
import './styles/screens/hero.css';
import './styles/screens/about.css';
import './styles/screens/skills.css';
import './styles/screens/projects.css';
import './styles/screens/experience.css';
import './styles/screens/achievements.css';
import './styles/screens/what-i-build.css';
import './styles/screens/contact.css';
import './styles/screens/outro.css';

// ── Config ──
import config from '../portfolio.config.js';

// ── HUD ──
import { initHotbar } from './hud/hotbar.js';
import { initXpBar } from './hud/xp-bar.js';
import { initHearts } from './hud/hearts.js';
import { initF3Overlay } from './hud/f3-overlay.js';
import { initToast } from './hud/toast.js';

// ── Components ──
import { initModal } from './components/modal.js';
import { initMinigame } from './components/minigame.js';
import { initJukebox } from './components/jukebox.js';

// ── Audio ──
import { initAudio } from './utils/audio.js';

// ── Router ──
import { initRouter, goTo } from './router.js';

// ── Boot ──
function boot() {
  const app = document.getElementById('app');
  const screenContainer = document.getElementById('screen-container');
  const hud = document.getElementById('hud');

  if (!app || !screenContainer || !hud) {
    console.error('Missing #app, #screen-container, or #hud element.');
    return;
  }

  // Set page title from config
  document.title = config.meta.siteTitle;

  // Initialize HUD components
  initHotbar(hud, config, goTo);
  initXpBar(hud, config);
  initHearts(hud);
  initF3Overlay(app, config);
  initToast(app);

  // Initialize modal
  initModal();

  // Initialize minigame
  initMinigame(config);

  // Initialize audio (music playlist + click sounds)
  initAudio(config);

  // Initialize jukebox UI (J key)
  initJukebox();

  // Initialize router (mounts first screen)
  initRouter(screenContainer, config);

  console.log(`${config.meta.name} ${config.meta.version} loaded.`);
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
