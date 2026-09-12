/**
 * components/minigame.js — Ancient Excavation canvas game
 * Minesweeper variant with ore types.
 * Press M to open, M or Esc to close.
 * Isolated from core portfolio — no external dependencies except config.
 */

let overlayEl = null;
let canvasEl = null;
let ctx = null;
let isOpen = false;
let config = null;

// Game state
const CELL_SIZE = 44;
let gridSize = 10;
let grid = [];
let strikes = 0;
let maxStrikes = 10;
let ep = 0;
let gameOver = false;
let gameWon = false;
let revealedCount = 0;
let totalSafeCells = 0;
let oreConfig = [];

// Colors
const COLORS = {
  covered: '#6b6b6b',
  coveredBorder: '#8b8b8b',
  coveredDark: '#4b4b4b',
  revealed: '#9b9b9b',
  revealedBorder: '#ababab',
  number: ['', '#4af4f4', '#17dd62', '#ff2020', '#8833ff', '#ffcc00', '#ff6600', '#ff00ff', '#aaaaaa'],
  bg: 'rgba(0, 0, 0, 0.85)',
};

export function initMinigame(cfg) {
  config = cfg;
  if (!config || !config.minigame) return;

  const mg = config.minigame;
  gridSize = mg.gridSize || 10;
  maxStrikes = mg.maxStrikes || 10;
  oreConfig = mg.ores || [];

  createOverlay();

  // Key listeners
  document.addEventListener('keydown', handleKey);
}

function handleKey(e) {
  if (e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    if (isOpen) {
      closeMinigame();
    } else {
      openMinigame();
    }
  }
  if (e.key === 'Escape' && isOpen) {
    e.preventDefault();
    closeMinigame();
  }
}

function createOverlay() {
  overlayEl = document.createElement('div');
  overlayEl.className = 'minigame-overlay';
  overlayEl.id = 'minigame-overlay';

  overlayEl.innerHTML = `
    <div class="minigame-panel">
      <div class="minigame-header">
        <h2 class="minigame-title">${config.minigame.title}</h2>
        <p class="minigame-subtitle">${config.minigame.subtitle}</p>
      </div>
      <div class="minigame-stats" id="minigame-stats">
        <span>STRIKES <strong id="mg-strikes">0</strong>/${maxStrikes}</span>
        <span>EP: <strong id="mg-ep">0</strong></span>
      </div>
      <div class="minigame-legend" id="minigame-legend">
        ${oreConfig.filter(o => !o.isStrike).map(o =>
          `<span style="color:${o.color}">+${o.points} ${o.type}</span>`
        ).join(' | ')}
      </div>
      <canvas id="minigame-canvas" width="${gridSize * CELL_SIZE}" height="${gridSize * CELL_SIZE}"></canvas>
      <div class="minigame-footer">
        <button class="mc-btn mc-btn--sm" id="mg-restart">${config.minigame.restartLabel}</button>
        <button class="mc-btn mc-btn--sm" id="mg-close" style="margin-left:8px;">Close [M]</button>
      </div>
      <div class="minigame-message" id="mg-message" style="display:none;"></div>
    </div>
  `;

  // Style the overlay
  const style = document.createElement('style');
  style.textContent = `
    .minigame-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 5000;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms ease;
      font-family: var(--font-mc, 'Monocraft', monospace);
    }
    .minigame-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .minigame-panel {
      background: var(--mc-panel-bg, rgba(0,0,0,0.72));
      border: 2px solid;
      border-color: #ffffff44 #00000088 #00000088 #ffffff44;
      padding: 20px;
      text-align: center;
      transform: translateY(100%);
      transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .minigame-overlay.open .minigame-panel {
      transform: translateY(0);
    }
    .minigame-title {
      color: #fff;
      font-size: 1.2rem;
      text-shadow: 2px 2px 0 #3f3f3f;
      margin-bottom: 4px;
    }
    .minigame-subtitle {
      color: #aaa;
      font-size: 0.7rem;
      margin-bottom: 12px;
    }
    .minigame-stats {
      color: #fff;
      font-size: 0.8rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 0 4px;
    }
    .minigame-stats strong { color: #ffcc00; }
    .minigame-legend {
      font-size: 0.65rem;
      color: #aaa;
      margin-bottom: 8px;
    }
    #minigame-canvas {
      display: block;
      margin: 0 auto;
      cursor: pointer;
      image-rendering: pixelated;
      border: 2px solid #333;
    }
    .minigame-footer {
      margin-top: 12px;
      display: flex;
      justify-content: center;
    }
    .minigame-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: #fff;
      text-shadow: 2px 2px 0 #000;
      padding: 16px 24px;
      background: rgba(0,0,0,0.8);
      border: 2px solid #ffcc00;
      z-index: 10;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlayEl);

  // Event listeners
  overlayEl.querySelector('#mg-restart').addEventListener('click', restartGame);
  overlayEl.querySelector('#mg-close').addEventListener('click', closeMinigame);

  canvasEl = overlayEl.querySelector('#minigame-canvas');
  ctx = canvasEl.getContext('2d');
  canvasEl.addEventListener('click', handleCanvasClick);
  canvasEl.addEventListener('contextmenu', (e) => e.preventDefault());
}

export function openMinigame() {
  if (!overlayEl) return;
  if (!isOpen) {
    restartGame();
  }
  overlayEl.classList.add('open');
  isOpen = true;
}

export function closeMinigame() {
  if (overlayEl) {
    overlayEl.classList.remove('open');
  }
  isOpen = false;
}

export function isMinigameOpen() {
  return isOpen;
}

function restartGame() {
  strikes = 0;
  ep = 0;
  gameOver = false;
  gameWon = false;
  revealedCount = 0;
  grid = [];

  // Initialize grid
  for (let r = 0; r < gridSize; r++) {
    grid[r] = [];
    for (let c = 0; c < gridSize; c++) {
      grid[r][c] = {
        revealed: false,
        isOre: false,
        oreType: null,
        oreColor: null,
        orePoints: 0,
        isStrike: false,
        adjCount: 0,
        flagged: false,
      };
    }
  }

  // Place ores
  let totalOres = 0;
  for (const ore of oreConfig) {
    for (let i = 0; i < ore.count; i++) {
      let r, c;
      let attempts = 0;
      do {
        r = Math.floor(Math.random() * gridSize);
        c = Math.floor(Math.random() * gridSize);
        attempts++;
        // Avoid top-left 3×3 safe zone
      } while ((grid[r][c].isOre || (r < 3 && c < 3)) && attempts < 200);

      if (attempts < 200) {
        grid[r][c].isOre = true;
        grid[r][c].oreType = ore.type;
        grid[r][c].oreColor = ore.color;
        grid[r][c].orePoints = ore.points;
        grid[r][c].isStrike = !!ore.isStrike;
        totalOres++;
      }
    }
  }

  totalSafeCells = gridSize * gridSize - totalOres;

  // Compute adjacency counts
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c].isOre) {
        grid[r][c].adjCount = countAdjacentOres(r, c);
      }
    }
  }

  updateUI();
  drawGrid();

  // Hide game message
  const msgEl = document.getElementById('mg-message');
  if (msgEl) msgEl.style.display = 'none';
}

function countAdjacentOres(row, col) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
        if (grid[nr][nc].isOre) count++;
      }
    }
  }
  return count;
}

function handleCanvasClick(e) {
  if (gameOver || gameWon) return;

  const rect = canvasEl.getBoundingClientRect();
  const scaleX = canvasEl.width / rect.width;
  const scaleY = canvasEl.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);

  if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return;
  const cell = grid[row][col];
  if (cell.revealed) return;

  if (cell.isOre) {
    cell.revealed = true;
    if (cell.isStrike) {
      strikes++;
    } else {
      ep += cell.orePoints;
    }

    if (strikes >= maxStrikes) {
      gameOver = true;
      revealAll();
      showMessage('GAME OVER');
    }
  } else {
    // Flood-fill reveal
    floodReveal(row, col);
    checkWin();
  }

  updateUI();
  drawGrid();
}

function floodReveal(row, col) {
  if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return;
  const cell = grid[row][col];
  if (cell.revealed || cell.isOre) return;

  cell.revealed = true;
  revealedCount++;

  if (cell.adjCount === 0) {
    // Recursively reveal neighbors
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        floodReveal(row + dr, col + dc);
      }
    }
  }
}

function checkWin() {
  if (revealedCount >= totalSafeCells) {
    gameWon = true;
    showMessage(`YOU WIN! EP: ${ep}`);
  }
}

function revealAll() {
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      grid[r][c].revealed = true;
    }
  }
}

function showMessage(text) {
  const msgEl = document.getElementById('mg-message');
  if (msgEl) {
    msgEl.textContent = text;
    msgEl.style.display = 'block';
  }
}

function updateUI() {
  const strikesEl = document.getElementById('mg-strikes');
  const epEl = document.getElementById('mg-ep');
  if (strikesEl) strikesEl.textContent = strikes;
  if (epEl) epEl.textContent = ep;
}

function drawGrid() {
  if (!ctx) return;
  const w = canvasEl.width;
  const h = canvasEl.height;

  ctx.clearRect(0, 0, w, h);

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const x = c * CELL_SIZE;
      const y = r * CELL_SIZE;
      const cell = grid[r][c];

      if (cell.revealed) {
        if (cell.isOre) {
          // Draw ore
          ctx.fillStyle = 'rgba(40, 40, 40, 0.8)';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

          // Ore glow
          ctx.fillStyle = cell.oreColor || '#ff6600';
          ctx.globalAlpha = 0.3;
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          ctx.globalAlpha = 1;

          // Ore circle
          ctx.beginPath();
          ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, CELL_SIZE / 4, 0, Math.PI * 2);
          ctx.fillStyle = cell.oreColor || '#ff6600';
          ctx.fill();

          // Strike text for lava
          if (cell.isStrike) {
            ctx.fillStyle = '#ff0000';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('X', x + CELL_SIZE / 2, y + CELL_SIZE - 4);
          }
        } else {
          // Revealed safe cell
          ctx.fillStyle = '#a0a0a0';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

          // Number
          if (cell.adjCount > 0) {
            ctx.fillStyle = COLORS.number[cell.adjCount] || '#fff';
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cell.adjCount.toString(), x + CELL_SIZE / 2, y + CELL_SIZE / 2);
          }
        }
      } else {
        // Covered cell — 3D block look
        ctx.fillStyle = COLORS.covered;
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

        // Highlight (top + left)
        ctx.fillStyle = COLORS.coveredBorder;
        ctx.fillRect(x, y, CELL_SIZE, 2);
        ctx.fillRect(x, y, 2, CELL_SIZE);

        // Shadow (bottom + right)
        ctx.fillStyle = COLORS.coveredDark;
        ctx.fillRect(x, y + CELL_SIZE - 2, CELL_SIZE, 2);
        ctx.fillRect(x + CELL_SIZE - 2, y, 2, CELL_SIZE);
      }

      // Grid line
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    }
  }
}
