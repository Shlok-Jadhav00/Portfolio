/**
 * components/jukebox.js — Jukebox music selector modal
 * Press J to open/close. Displays playlist tracks, highlights the
 * currently playing track, and lets the user click to switch.
 */

import { getPlaylistInfo, playTrack } from '../utils/audio.js';
import { isModalOpen } from './modal.js';
import { isMinigameOpen } from './minigame.js';

let overlayEl = null;
let isOpen = false;

export function initJukebox() {
  createOverlay();
  document.addEventListener('keydown', handleKey);
}

function handleKey(e) {
  if (e.key === 'j' || e.key === 'J') {
    // Don't open if another modal is active
    if (!isOpen && (isModalOpen() || isMinigameOpen())) return;
    e.preventDefault();
    if (isOpen) {
      closeJukebox();
    } else {
      openJukebox();
    }
  }
  if (e.key === 'Escape' && isOpen) {
    e.preventDefault();
    closeJukebox();
  }
}

function createOverlay() {
  overlayEl = document.createElement('div');
  overlayEl.className = 'jukebox-overlay';
  overlayEl.id = 'jukebox-overlay';

  // Close on backdrop click
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) closeJukebox();
  });

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .jukebox-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 4500;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms ease;
      font-family: var(--font-mc, 'Monocraft', monospace);
    }
    .jukebox-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .jukebox-panel {
      background: var(--mc-panel-bg, rgba(0,0,0,0.72));
      border: 2px solid;
      border-color: #ffffff44 #00000088 #00000088 #ffffff44;
      padding: 24px 28px;
      min-width: 320px;
      max-width: 420px;
      transform: translateY(100%);
      transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .jukebox-overlay.open .jukebox-panel {
      transform: translateY(0);
    }
    .jukebox-header {
      text-align: center;
      margin-bottom: 16px;
    }
    .jukebox-title {
      color: #fff;
      font-size: 1.1rem;
      text-shadow: 2px 2px 0 #3f3f3f;
      margin: 0 0 4px;
    }
    .jukebox-subtitle {
      color: #aaa;
      font-size: 0.65rem;
    }
    .jukebox-track-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .jukebox-track {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 150ms ease, border-color 150ms ease;
      color: #ccc;
      font-size: 0.85rem;
    }
    .jukebox-track:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.1);
    }
    .jukebox-track.playing {
      background: rgba(122, 248, 80, 0.1);
      border-color: var(--mc-green-xp, #7af850);
      color: var(--mc-green-xp, #7af850);
    }
    .jukebox-track-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    .jukebox-track-name {
      flex: 1;
    }
    .jukebox-track-badge {
      font-size: 0.6rem;
      color: var(--mc-green-xp, #7af850);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .jukebox-footer {
      text-align: center;
      margin-top: 14px;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlayEl);
}

function openJukebox() {
  renderTracks();
  overlayEl.classList.add('open');
  isOpen = true;
}

function closeJukebox() {
  overlayEl.classList.remove('open');
  isOpen = false;
}

export function isJukeboxOpen() {
  return isOpen;
}

function renderTracks() {
  const info = getPlaylistInfo();

  const tracksHTML = info.tracks.map((track, i) => {
    const isPlaying = i === info.currentIndex && info.isPlaying;
    const activeClass = isPlaying ? 'playing' : '';
    const badge = isPlaying ? '<span class="jukebox-track-badge">♫ Now Playing</span>' : '';
    const icon = isPlaying ? '🎵' : '🎶';

    return `
      <li class="jukebox-track ${activeClass}" data-index="${i}">
        <span class="jukebox-track-icon">${icon}</span>
        <span class="jukebox-track-name">${track.name}</span>
        ${badge}
      </li>
    `;
  }).join('');

  overlayEl.innerHTML = `
    <div class="jukebox-panel">
      <div class="jukebox-header">
        <h2 class="jukebox-title">🎵 Jukebox</h2>
        <p class="jukebox-subtitle">Select a track to play</p>
      </div>
      <ul class="jukebox-track-list">
        ${tracksHTML}
      </ul>
      <div class="jukebox-footer">
        <button class="mc-btn mc-btn--sm" id="jukebox-close">Close [J]</button>
      </div>
    </div>
  `;

  // Attach click handlers
  overlayEl.querySelectorAll('.jukebox-track').forEach(el => {
    el.addEventListener('click', () => {
      const index = parseInt(el.dataset.index, 10);
      playTrack(index);
      // Re-render to update the "Now Playing" badge
      setTimeout(() => renderTracks(), 50);
    });
  });

  overlayEl.querySelector('#jukebox-close').addEventListener('click', closeJukebox);
}
