/**
 * utils/background.js — Video / Image background helper
 *
 * Each screen config has:
 *   background: '/bg/bg-01-hero.jpg'       (fallback image)
 *   video:      '/bg/bg-01-hero.mp4'       (optional looping video)
 *
 * If a `video` key is present and the browser can play it,
 * a <video autoplay loop muted playsinline> is injected behind the content.
 * Otherwise the static image is used via CSS background-image.
 */

/**
 * Mount a background (video if available, image fallback) into the container.
 * @param {HTMLElement} container - The screen container element
 * @param {Object} screenConfig - The screen's config object (must have .background, optionally .video)
 */
export function mountBackground(container, screenConfig) {
  // Remove any CSS background — we handle it ourselves
  container.style.backgroundImage = 'none';

  if (screenConfig.video) {
    const video = document.createElement('video');
    video.className = 'screen-bg-video';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('disablePictureInPicture', '');

    const source = document.createElement('source');
    source.src = screenConfig.video;
    source.type = 'video/mp4';
    video.appendChild(source);

    // Fallback: if video fails to load, use the image
    video.addEventListener('error', () => {
      video.remove();
      container.style.backgroundImage = `url('${screenConfig.background}')`;
    }, { once: true });

    // Insert video as first child so content sits on top
    container.insertBefore(video, container.firstChild);
  } else {
    // No video — use static image
    container.style.backgroundImage = `url('${screenConfig.background}')`;
  }
}

/**
 * Unmount: clean up any <video> element.
 * @param {HTMLElement} container
 */
export function unmountBackground(container) {
  const vid = container.querySelector('.screen-bg-video');
  if (vid) {
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    vid.remove();
  }
}
