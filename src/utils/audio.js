/**
 * utils/audio.js — Global audio manager
 * Handles: background music playlist (looping), UI click sounds
 * Respects browser autoplay policy — music starts on first user interaction.
 */

let clickSound = null;
let musicEl = null;
let playlist = [];
let currentTrackIndex = 0;
let musicStarted = false;
let soundsEnabled = false;

/**
 * Initialize the audio system.
 * @param {Object} config - Full app config
 */
export function initAudio(config) {
  const sounds = config.hud?.sounds;
  if (!sounds || !sounds.enabled) return;

  soundsEnabled = true;
  playlist = sounds.playlist || [];

  // Preload click sound
  if (sounds.click) {
    clickSound = new Audio(sounds.click);
    clickSound.volume = 0.4;
  }

  // Create the music audio element
  musicEl = new Audio();
  musicEl.volume = 0.3;
  musicEl.loop = false; // We handle looping ourselves to advance tracks

  // When a track ends, automatically play the next one
  musicEl.addEventListener('ended', () => {
    nextTrack();
  });

  // Global click sound on every mousedown
  window.addEventListener('mousedown', playClick);

  // Start music on first user interaction (satisfies autoplay policy)
  const startMusic = () => {
    if (musicStarted || playlist.length === 0) return;
    musicStarted = true;
    loadAndPlay(currentTrackIndex);
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
  };

  window.addEventListener('click', startMusic);
  window.addEventListener('keydown', startMusic);
}

/** Play the UI click sound (cloned so rapid clicks overlap). */
function playClick() {
  if (!soundsEnabled || !clickSound) return;
  const clone = clickSound.cloneNode();
  clone.volume = 0.4;
  clone.play().catch(() => {});
}

/** Load and play a specific track by index. */
function loadAndPlay(index) {
  if (!musicEl || playlist.length === 0) return;
  currentTrackIndex = index;
  musicEl.src = playlist[index].path;
  musicEl.play().catch(() => {});
}

/** Advance to the next track, looping back to 0. */
export function nextTrack() {
  if (playlist.length === 0) return;
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadAndPlay(currentTrackIndex);
}

/** Play a specific track by index. */
export function playTrack(index) {
  if (index < 0 || index >= playlist.length) return;
  loadAndPlay(index);
}

/** Get current playlist info for the Jukebox UI. */
export function getPlaylistInfo() {
  return {
    tracks: playlist,
    currentIndex: currentTrackIndex,
    isPlaying: musicStarted && musicEl && !musicEl.paused,
  };
}
