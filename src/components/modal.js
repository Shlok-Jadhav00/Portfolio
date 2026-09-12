/**
 * components/modal.js — Written Book modal for project details
 * MC book overlay with pages: Name, Description, Stack, Links
 */

let overlayEl = null;
let isOpen = false;

export function initModal() {
  overlayEl = document.createElement('div');
  overlayEl.className = 'mc-modal-overlay';
  overlayEl.id = 'project-modal';

  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) closeModal();
  });

  document.body.appendChild(overlayEl);

  // Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeModal();
    }
  });
}

/**
 * Open the modal with project data.
 * @param {Object} project - Project object from config
 */
export function openModal(project) {
  if (!overlayEl) initModal();

  const stackTags = project.stack.map(
    s => `<span class="mc-modal-stack-tag">${s}</span>`
  ).join('');

  const links = [];
  if (project.github && project.github !== '#') {
    links.push(`<a class="mc-modal-link" href="${project.github}" target="_blank" rel="noopener">GitHub →</a>`);
  } else if (project.github === '#') {
    links.push(`<span class="mc-modal-link" style="opacity:0.5;cursor:default;">GitHub (coming soon)</span>`);
  }
  if (project.live && project.live !== '#') {
    links.push(`<a class="mc-modal-link" href="${project.live}" target="_blank" rel="noopener">Live Demo →</a>`);
  } else if (project.live === '#') {
    links.push(`<span class="mc-modal-link" style="opacity:0.5;cursor:default;">Live (coming soon)</span>`);
  }

  const statusText = project.status === 'complete' ? '◆ Complete' : '◇ In Progress';
  const statusColor = project.status === 'complete' ? '#17dd62' : '#ffcc00';

  overlayEl.innerHTML = `
    <div class="mc-modal-book">
      <button class="mc-modal-close" aria-label="Close">✕</button>
      <div class="mc-modal-body">
        <h2 class="mc-modal-title">${project.name}</h2>

        <div class="mc-modal-section">
          <div class="mc-modal-label">Type</div>
          <div class="mc-modal-text">${project.type}</div>
        </div>

        <div class="mc-modal-section">
          <div class="mc-modal-label">Status</div>
          <div class="mc-modal-text" style="color:${statusColor}">${statusText}</div>
        </div>

        <div class="mc-modal-section">
          <div class="mc-modal-label">Description</div>
          <div class="mc-modal-text">${project.desc}</div>
        </div>

        ${project.problem && project.problem !== '[PLACEHOLDER — describe the verified problem this project addresses]' ? `
        <div class="mc-modal-section">
          <div class="mc-modal-label">Problem</div>
          <div class="mc-modal-text">${project.problem}</div>
        </div>
        ` : ''}

        ${project.contribution && project.contribution !== '[PLACEHOLDER — describe your verified contribution]' ? `
        <div class="mc-modal-section">
          <div class="mc-modal-label">Contribution</div>
          <div class="mc-modal-text">${project.contribution}</div>
        </div>
        ` : ''}

        <div class="mc-modal-section">
          <div class="mc-modal-label">Stack</div>
          <div class="mc-modal-stack-list">${stackTags}</div>
        </div>

        ${links.length > 0 ? `
        <div class="mc-modal-links">${links.join('')}</div>
        ` : ''}

        <div class="mc-modal-nav">
          <span class="mc-modal-page-num">Page 1 / 1</span>
        </div>
      </div>
    </div>
  `;

  // Re-attach close button listener
  overlayEl.querySelector('.mc-modal-close').addEventListener('click', closeModal);

  overlayEl.classList.add('open');
  isOpen = true;
}

function closeModal() {
  if (overlayEl) {
    overlayEl.classList.remove('open');
  }
  isOpen = false;
}

export function isModalOpen() {
  return isOpen;
}
