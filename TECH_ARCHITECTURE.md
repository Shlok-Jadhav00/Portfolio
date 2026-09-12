# Technical Architecture

This architecture describes a student/early-career portfolio. The Minecraft-inspired UI is a presentation metaphor, and the site is not a commercial marketplace or storefront.

---

## 1. Stack Decision

| Layer         | Choice                  | Why                                                              |
|---------------|-------------------------|------------------------------------------------------------------|
| Build tool    | **Vite**                | Zero-config, instant dev server, small static output            |
| Language      | **Vanilla JS (ES6+)**   | Full DOM control — no VDOM overhead for canvas/CSS animations    |
| Animations    | **GSAP (free tier)**    | Screen slides, tooltip fades, XP bar easing                     |
| Font          | **Monocraft**           | Open-source pixel font, exact Minecraft look                     |
| Canvas        | **Native Canvas API**   | Minigame grid — no library needed                                |
| CSS           | **Plain CSS + variables**| Minecraft palette via custom properties, `image-rendering: pixelated` |
| Hosting       | **GitHub Pages / Vercel**| Free, static, no backend needed                                 |

**No React, no Vue, no Svelte.** Minecraft UI is CSS/DOM-driven. A virtual DOM adds complexity with no benefit here.

---

## 2. File Structure

```
minecraft-portfolio/
│
├── index.html                  ← Single HTML entry point
├── package.json                ← Vite + GSAP
├── vite.config.js              ← Static output config
│
├── portfolio.config.js         ← ★ THE ONLY FILE YOU EDIT ★
│
├── public/                     ← Copied as-is to dist/
│   ├── bg/                     ← 9 background images
│   │   ├── bg-01-hero.jpg
│   │   ├── bg-02-about.jpg
│   │   ├── bg-03-skills.jpg
│   │   ├── bg-04-projects.jpg
│   │   ├── bg-05-experience.jpg
│   │   ├── bg-06-achievements.jpg
│   │   ├── bg-07-what-i-build.jpg
│   │   ├── bg-08-contact.jpg
│   │   └── bg-09-outro.jpg
│   ├── icons/
│   │   ├── hotbar/             ← 9 icons, one per screen slot
│   │   │   ├── 01-book.png
│   │   │   ├── 02-head.png
│   │   │   ├── 03-enchbook.png
│   │   │   ├── 04-chest.png
│   │   │   ├── 05-clock.png
│   │   │   ├── 06-star.png
│   │   │   ├── 07-emerald.png
│   │   │   ├── 08-quill.png
│   │   │   └── 09-endereye.png
│   │   ├── projects/           ← One icon per project
│   │   └── achievements/       ← One icon per achievement
│   ├── skin/
│   │   ├── character.png       ← Full-body render (~200px tall, transparent bg)
│   │   └── face.png            ← 32×32 face from skin file
│   └── sounds/                 ← Optional
│       ├── click.mp3
│       ├── chest-open.mp3
│       ├── enchant.mp3
│       ├── levelup.mp3
│       └── toast.mp3
│
└── src/
    ├── main.js                 ← Boot: imports config, initialises router + HUD
    ├── router.js               ← Screen navigation logic (keyboard + scroll)
    │
    ├── hud/
    │   ├── hotbar.js           ← Renders 9-slot hotbar, handles slot click
    │   ├── xp-bar.js           ← XP fill + level counter
    │   ├── hearts.js           ← Hearts + hunger display (decorative)
    │   ├── f3-overlay.js       ← F3 debug panel, updates per screen
    │   └── toast.js            ← Advancement toast popup
    │
    ├── screens/
    │   ├── hero.js
    │   ├── about.js
    │   ├── skills.js
    │   ├── projects.js
    │   ├── experience.js
    │   ├── achievements.js
    │   ├── what-i-build.js
    │   ├── contact.js
    │   └── outro.js
    │
    ├── components/
    │   ├── tooltip.js          ← MC-style item tooltip (hover utility)
    │   ├── modal.js            ← Written book modal (project detail)
    │   └── minigame.js         ← Ancient Excavation canvas game
    │
    └── styles/
        ├── tokens.css          ← CSS custom properties (colours, fonts, spacing)
        ├── reset.css           ← Box-sizing, margin reset
        ├── panels.css          ← Reusable MC panel / button / border classes
        ├── hud.css             ← Hotbar, XP bar, hearts, F3 overlay
        ├── tooltip.css         ← Item tooltip
        ├── toast.css           ← Advancement toast
        ├── modal.css           ← Book modal
        └── screens/
            ├── hero.css
            ├── about.css
            ├── skills.css
            ├── projects.css
            ├── experience.css
            ├── achievements.css
            ├── what-i-build.css
            ├── contact.css
            └── outro.css
```

---

## 3. Data Flow

```
portfolio.config.js   (source of truth — you write this)
        │
        ▼
    main.js           (imports config, passes to each module)
        │
        ├──▶ router.js          (knows how many screens exist)
        ├──▶ hud/hotbar.js      (reads config.hud.hotbarSlots for icons + labels)
        ├──▶ hud/f3-overlay.js  (reads the active screen's biome)
        └──▶ screens/*.js       (each reads its own config slice)
                │
                └──▶ components/*.js  (tooltip, modal, minigame — stateless utilities)
```

**Rules:**
- `portfolio.config.js` is the source of truth for all screen copy, labels, links, asset paths, and temporary personal/project data.
- No screen file reads another screen's config slice.
- Do not hardcode portfolio content or personal information in screen modules, HUD modules, components, or styles.
- Use clearly identifiable placeholders such as `example@email.com` and `#` until real information is supplied. Do not invent employers, clients, achievements, statistics, or URLs.
- Placeholder assets must use the documented paths and be replaceable without restructuring the UI.

Project entries should support `name`, `icon`, `type`, `stack`, `problem`, `contribution`, `status`, `description`, `github`, and `live`. Links may use `#` or `null` until verified.

---

## 4. CSS Architecture

### Custom Properties (tokens.css)

```css
:root {
  /* Backgrounds */
  --mc-panel-bg:        rgba(0, 0, 0, 0.72);
  --mc-panel-border-lt: #ffffff44;
  --mc-panel-border-dk: #00000088;

  /* Text */
  --mc-text:            #ffffff;
  --mc-text-dim:        #aaaaaa;
  --mc-text-shadow:     #3f3f3f;

  /* Minecraft palette */
  --mc-green-xp:        #7af850;
  --mc-red-hearts:      #ff0000;
  --mc-hunger:          #da7a00;
  --mc-emerald:         #17dd62;
  --mc-diamond:         #4af4f4;
  --mc-gold:            #ffcc00;
  --mc-redstone:        #ff2020;
  --mc-enchant-purple:  #8833ff;
  --mc-enchant-teal:    #20b2aa;

  /* Hotbar */
  --hotbar-slot-size:   44px;
  --hotbar-slot-gap:    4px;
  --hotbar-active:      #ffffffcc;

  /* Typography */
  --font-mc:            'Monocraft', monospace;
  --font-size-title:    clamp(2rem, 5vw, 4rem);
  --font-size-panel:    clamp(0.75rem, 1.5vw, 1rem);
  --font-size-f3:       0.65rem;
}
```

### Panel Class Pattern (panels.css)

All dialog/panel elements share one base class:
```css
.mc-panel {
  background: var(--mc-panel-bg);
  border: 2px solid;
  border-color: var(--mc-panel-border-lt) var(--mc-panel-border-dk)
                var(--mc-panel-border-dk) var(--mc-panel-border-lt);
  padding: 12px 16px;
  font-family: var(--font-mc);
  color: var(--mc-text);
  image-rendering: pixelated;
}
```

### Button Class Pattern

```css
.mc-btn {
  background: #3f3f3f;
  border: 2px solid;
  border-color: #9f9f9f #1f1f1f #1f1f1f #9f9f9f;
  color: var(--mc-text);
  font-family: var(--font-mc);
  cursor: pointer;
  text-shadow: 2px 2px 0 var(--mc-text-shadow);
}
.mc-btn:hover { background: #4f4f5f; }
```

---

## 5. Screen Module Interface

Every screen file exports the same three functions:

```js
// screens/about.js — example

export function mount(container, config) {
  // Build HTML, attach to container
  container.innerHTML = buildAboutHTML(config.about);
  attachListeners(container, config);
}

export function unmount(container) {
  // Clean up listeners, reset state
  container.innerHTML = '';
}

export function getBiome(screenConfig) {
  return screenConfig.biome;
}
```

`router.js` calls `unmount` on the leaving screen, then `mount` on the arriving screen, then runs the GSAP transition.

---

## 6. Router Logic

```
State:
  currentScreen  : 0–8  (zero-based index; user-facing screens are 1–9)
  visitedScreens : Set()

Navigation triggers:
  keydown 1–9  → goTo(n-1)
  keydown ←    → goTo(currentScreen - 1)
  keydown →    → goTo(currentScreen + 1)
  wheel event  → debounced goTo(±1)
  hotbar click → goTo(slotIndex)

goTo(index):
  1. clamp index to 0–8
  2. screens[currentScreen].unmount()
  3. screens[index].mount()
  4. GSAP slide transition (direction based on index delta)
  5. hotbar.setActive(index)
  6. f3.setBiome(screens[index].getBiome())
  7. xp.addVisit(index)   ← adds XP only if not visited before
  8. if (!visitedScreens.has(index)) toast.show(screenName)
  9. visitedScreens.add(index)
  10. currentScreen = index

User-facing mapping: 1 Home, 2 About, 3 Skills, 4 Projects, 5 Experience, 6 Achievements, 7 What I Build, 8 Contact, 9 The End.
```

---

## 7. XP System Logic

```
Total screens: 9
XP per new screen visit: Math.floor(100 / 9) = 11 XP
Full XP bar: 99 XP (approx)
Level-up threshold: every 33 XP → Level 0 → 1 → 2 → 3

Display: "Level N" shown in center of XP bar
Bar fill: xpPoints / 99 * 100 %
```

---

## 8. Minigame: Ancient Excavation — Implementation Notes

```
Canvas size: 500×500px (50px per cell, 10×10 grid)

State object:
  grid[10][10]: { revealed: bool, isOre: bool, oreType: string|null, adjCount: int }

On init:
  1. Place ores randomly (avoid top-left 3×3 safe zone)
  2. Compute adjCount for each cell (like Minesweeper)

On cell click:
  if revealed: return
  if isOre:
    strikes++
    reveal ore cell (show ore icon, flash red)
    if strikes >= 10: gameOver()
    else: continue
  else:
    reveal cell
    if adjCount === 0: flood-fill reveal neighbors
    ep += scoreForOreType  ← Wait, safe cells don't score
    check winCondition

Score: ep increases only when you reveal a cell adjacent to an ore
  (or optionally: small ep for any revealed safe cell)

Win: all non-ore cells revealed
Lose: strikes >= 10
```

---

## 9. Build & Deploy

### Install & Dev
```bash
npm create vite@latest minecraft-portfolio -- --template vanilla
cd minecraft-portfolio
npm install gsap
npm run dev
```

### Add Monocraft Font
```bash
# Download from: https://github.com/IdreesInc/Monocraft/releases
# Place in: public/fonts/Monocraft.ttf
```

In `tokens.css`:
```css
@font-face {
  font-family: 'Monocraft';
  src: url('/fonts/Monocraft.ttf') format('truetype');
}
```

### Build for Production
```bash
npm run build
# Output: dist/ folder — deploy this
```

### Deploy Options
| Platform       | Command / Steps                        |
|----------------|----------------------------------------|
| GitHub Pages   | Push `dist/` to `gh-pages` branch      |
| Vercel         | `vercel --prod` from project root       |
| Netlify        | Drag-drop `dist/` folder               |

---

## 10. Development Order (Build in This Sequence)

```
Phase 1 — Shell & HUD
  1. index.html skeleton + Vite config
  2. tokens.css + reset.css + panels.css
  3. portfolio.config.js (filled with your data)
  4. main.js + router.js (basic screen switching, no content yet)
  5. hud/hotbar.js (9 slots, keyboard nav working)
  6. hud/xp-bar.js + hud/hearts.js
  7. hud/f3-overlay.js

Phase 2 — Screens (in order 1–9)
  8.  screens/hero.js + hero.css
  9.  screens/about.js + about.css
  10. screens/skills.js + skills.css       (enchantment bars)
  11. screens/projects.js + projects.css   (chest grid + tooltip)
  12. components/tooltip.js               (reusable, used by projects + what-i-build)
  13. components/modal.js                 (project detail book)
  14. screens/experience.js + experience.css
  15. screens/achievements.js + achievements.css
  16. hud/toast.js                        (advancement notification)
  17. screens/what-i-build.js + what-i-build.css
  18. screens/contact.js + contact.css
  19. screens/outro.js + outro.css

Phase 3 — Polish & Minigame
  20. components/minigame.js (canvas game)
  21. GSAP screen transitions
  22. Sounds (optional)
  23. Responsive / mobile check
  24. SEO meta tags + OG image
  25. Deploy
```

---

## 11. package.json

```json
{
  "name": "minecraft-portfolio",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev":   "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```
