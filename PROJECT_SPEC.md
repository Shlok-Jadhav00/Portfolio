# Minecraft Portfolio — Project Specification
> Student/early-career portfolio specification. The Minecraft-inspired interface is a presentation metaphor, not a commercial marketplace.

---

## 1. Overview

A single-page, browser-based student portfolio that uses Minecraft's game UI as an interactive presentation metaphor across 9 distinct screens. Navigation is driven by keyboard (1–9, arrow keys), mouse interaction, and scroll. A persistent HUD overlays every screen. One config file (`portfolio.config.js`) drives all portfolio content — no personal or portfolio copy is hardcoded in components.

**Live name:** `Shlok Builds`
**Version watermark:** `v1.0.0`
**Mode tag (hero):** `SURVIVAL · HARD MODE`

**Product boundaries:**
- This is a portfolio for a student/early-career developer, not a freelance marketplace or storefront.
- Temporary personal data is allowed during development, but it must be clearly marked as placeholder data and stored only in `portfolio.config.js`.
- Do not invent employers, clients, certifications, achievements, statistics, contact details, or URLs. Use values such as `example@email.com` and `#` until the real values are supplied.
- Use placeholder background, icon, skin, font, and sound assets at the documented paths. They must be replaceable without changing the screen architecture.

---

## 2. Global HUD (Present on Every Screen)

### Hotbar (bottom-center)
- 9 slots, each representing one screen
- Active slot is highlighted (white border glow)
- Hover over slot → tooltip showing screen name
- Press `1`–`9` to jump to that screen
- Arrow keys / scroll to cycle ±1

### Hearts Row (bottom-left of hotbar)
- 10 heart icons (pixel art, red)
- Decorative — always full (or use to represent "energy")

### Hunger Bar (bottom-right of hotbar)
- 10 chicken-leg icons
- Decorative — always full

### XP Bar (above hotbar)
- Fills as user visits more screens
- 0 XP at start → Full at all 9 screens visited
- Level number displayed in center of bar
- Level increments every ~3 screens visited

### F3 Debug Overlay (top-left corner)
- Always visible (or toggled with `F3` key)
- Format (exact, from video):
  ```
  Shlok Builds v1.0.0
  Biome: [Current Screen Biome Name]
  Day 0: [MM:SS elapsed time]
  ```
- Font: monospace, color: white, tiny size
- Semi-transparent dark background strip

---

## 3. Screen Specifications

---

### Screen 1 — HERO (Main Menu)
**Hotbar slot:** 1 | **Biome:** Overworld | **Icon:** Book/Grass Block

**Layout:**
- Full-screen AI-generated background: Overworld village at golden-hour sunset, character standing right side
- Title: **"Shlok Builds"** — large Minecraft-style font, white
- Subtitle: **"SURVIVAL · HARD MODE"** — small caps, below title
- 4–5 menu buttons (centered, stacked vertically):
  - `▶ Enter World` → jumps to Screen 2 (About)
  - `⚔ View Projects` → jumps to Screen 4
  - `📜 What I Build` → jumps to Screen 7 (What I Build)
  - `✦ Achievements` → jumps to Screen 6
  - `✉ Contact` → jumps to Screen 8
- Player character render: right side, standing still (or idle animation)
- Bottom-left watermark: `Not an official Minecraft product. Not affiliated with Mojang.`

**Button Styling:**
- Minecraft stone-button aesthetic
- Dark grey background `#3f3f3f`, 2px border (lighter top/left, darker bottom/right)
- Hover: slightly lighter background + cursor
- Width: ~280px, centered text

---

### Screen 2 — ABOUT (Player Profile)
**Hotbar slot:** 2 | **Biome:** Cherry Grove | **Icon:** Player Head

**Layout (from video — frame 1):**
- Full-screen background: Cherry blossom forest, river, beehives
- Panel (left side): "**Player Profile**" title in MC font
  - Player face avatar (32×32 skin region, pixelated)
  - Bio paragraph (2–3 sentences)
  - Stat rows, label + value:
    | Label   | Value                                |
    |---------|--------------------------------------|
    | Class   | `[role tagline]`                     |
    | Level   | `[year] — B.Tech IT`                 |
    | Spawn   | `Nashik, Maharashtra`                |
    | Status  | `[current status / open to work]`    |
  - CTA button: `View on GitHub` (links to GitHub URL)
- Player character render: right side, large, idle

**Panel Styling:** Dark semi-transparent MC dialog box, white border

---

### Screen 3 — SKILLS (Enchantment Table)
**Hotbar slot:** 3 | **Biome:** Stronghold | **Icon:** Purple Enchanted Book

**Layout (from video — frame 2):**
- Full-screen background: Stronghold library room, enchanting table glowing in center-right
- Panel (left side): "**Enchantments**" title
  - Each row: `[Roman numeral level]  [Skill Name]  [filled bar]`
  - Bar style: filled segment in purple/teal, gradient, rounded ends
  - Hover over row → tooltip: `[Skill Name] — [short description / years / context]`
  - Footer hint (italic): `"Hover an enchantment to inspect it"`
- Enchanting particles: floating glyphs / rune letters (CSS animation or canvas)

**Enchantment bar colors (from reference):**
- Purple gradient for high-level (IV–V)
- Teal/cyan gradient for mid-level (III–IV)
- Grey/blue for lower (I–II)

**Skills to list:** defined in `portfolio.config.js` — see Content Blueprint

---

### Screen 4 — PROJECTS (Chest Inventory)
**Hotbar slot:** 4 | **Biome:** Mineshaft | **Icon:** Chest

**Layout:**
- Full-screen background: Underground cave / mineshaft, torches, ores visible
- Top panel: "**Chest — Completed Builds**" title
  - Grid: 3 rows × 9 columns = 27 slots (double chest)
  - Filled slots = projects; empty slots = grey
  - Each slot: pixel-art icon representing the project
  - Hover over slot → MC item tooltip appears:
    ```
    [Project Name]
    ─────────────────────────
    Type: [Web App / Desktop / AI / Embedded]
    Stack: [tech1, tech2, tech3]
    Status: ◆ Complete  /  ◇ In Progress
    
    [1-line description]
    ```
  - Click → opens a "written book" modal with full project details
- Bottom of panel: Player inventory row (decorative, 9 slots, empty or with misc items)

**Modal (on project click):**
- MC written book overlay
- Pages: Name, Description, Stack, Links (GitHub / Live)
- `←` `→` page navigation
- `X` to close

---

### Screen 5 — EXPERIENCE (Crafting Table)
**Hotbar slot:** 5 | **Biome:** Snowy Peaks | **Icon:** Clock/Compass

**Layout (from video — frame 3):**
- Full-screen background: Snowy mountain range, campfire, character standing right
- Panel (left): "**Crafting — The Journey**"
  - Each experience entry is a crafting "recipe row":
    ```
    [item] [item] [item]  →  [output item]
    YYYY – YYYY
    Title / Role
    Short description (2 lines max)
    ```
  - 3 entries stacked vertically
  - Items are pixel-art icons relevant to the role

---

### Screen 6 — ACHIEVEMENTS (Advancements Panel)
**Hotbar slot:** 6 | **Biome:** Deep Dark | **Icon:** Star / Command Block

**Layout (from video — frame 4):**
- Full-screen background: Deep Dark biome, sculk sensors, darkness with blue glow
- Panel (right side): "**Advancements**"
  - List of achievement rows:
    ```
    [icon]  Achievement Title          [✓]
            Short description
    ```
  - Completed = checkmark + brighter text
  - Locked / upcoming = dim + lock icon
  - CTA button at bottom: `Send a Message` → links to Screen 8 (Contact)
- Character stands in the scene (left/center)

**Toast Notification:**
- First time a user visits each screen: "**Advancement Made!**" toast slides in from top-right
- MC golden advancement toast style
- Auto-dismiss after 3s

---

### Screen 7 — WHAT I BUILD (Villager Trades)
**Hotbar slot:** 7 | **Biome:** Village | **Icon:** Emerald

**Layout (from video — frame 5):**
- Full-screen background: Village interior (blacksmith / librarian building, warm lighting)
- Villager NPC sprite: right side, facing left
- Player character: interacting with villager (left)
- Panel (left-center): "**What I Build**" — `[Name]: Builder Level [N]`
  - Each trade row:
    ```
    [icon]  [Capability Name]
            [Short description / relevant technologies]
            [showcase status]
    ```
  - Rows describe systems and capabilities the student has built or is learning. They do not show prices, emerald costs, clients, packages, or sales availability.
  - Optional showcase badges: `Built` (green) | `Learning` (orange) | `Planned` (dim)
  - Hover over row → tooltip with more detail
  - Stats bar at bottom: `[N] projects | [N] technologies | [N] years learning/building`; use clearly marked placeholders until verified.
- Profession badge under panel title: e.g. `Builder: Level [N]`

---

### Screen 8 — CONTACT (Written Book)
**Hotbar slot:** 8 | **Biome:** Lush Caves | **Icon:** Book & Quill

**Layout (from video — frame 6):**
- Full-screen background: Lush Caves biome — moss, glow berries, waterfall, shafts of light
- Panel (center-left): "**Let's Connect**"
  - Subtitle: `"Send one, I'll answer within a day."`
  - Contact rows (icon + link/text):
    ```
    ✉  [email address]
    📍  Nashik, Maharashtra, India
    🐙  [github url]
    🐦  [twitter/x handle]  ← if applicable
    💼  [linkedin url]      ← if applicable
    ```
  - Page indicator: `Page 1 / 1`
  - CTA button: `To The End` → navigates to Screen 9

---

### Screen 9 — THE END (Outro)
**Hotbar slot:** 9 | **Biome:** The End | **Icon:** Ender Eye / Eye of Ender

**Layout (from video — frame 7):**
- Full-screen background: End dimension — end stone islands, void sky, purple end crystals, ender pillars with beams
- Character: standing with back to camera, looking at The End
- Center text (stacked):
  ```
  THANKS FOR PLAYING
  
  The End
  
  You reached the end of this world.
  But every world has another seed.
  So build something nobody expects.
  ```
- Button: `Respawn` → returns to Screen 1 (Home)
- XP bar: should be full / maxed out by this point

---

## 4. Minigame — Ancient Excavation (Press `M`)

**Trigger:** Press `M` on any screen → overlay appears
**Dismiss:** Press `M` again or `Esc`

**UI (from video — frame 8):**
- Title: "**Ancient Excavation**"
- Subtitle: `"Break blocks to sound out the doubt. Numbers are how many blocks away it is."`
- Stats row: `STRIKES N/10  EP: N`
- Score legend (top-right): `+5` emerald | `+4` diamond | `+2` gold | `+1` redstone
- Grid: 10×10 blocks, all initially grey/covered
- Click a block → reveals:
  - A number (1–8) if adjacent to an ore
  - Empty (no number) if safe zone
  - Ore emoji/icon if it was an ore (STRIKE! — lose 1 strike)
  - Special ore (emerald) if lucky (bonus EP)
- Win condition: reveal all non-ore blocks
- Lose condition: 10 strikes
- Revealed safe cells: lighter grey
- Revealed ore: animated (glow effect)
- Bottom: `Examine ruins` button (submit / restart)
- Background: hero biome (game plays over current screen)

**Ore types (from score legend):**
| Ore      | Points | Color    |
|----------|--------|----------|
| Emerald  | +5     | Green    |
| Diamond  | +4     | Cyan     |
| Gold     | +2     | Yellow   |
| Redstone | +1     | Red      |
| Lava     | STRIKE | Orange   |

---

## 5. Transitions & Animations

| Trigger              | Animation                          |
|----------------------|------------------------------------|
| Screen change        | Slide left/right (GSAP, 400ms)     |
| Screen first visit   | Advancement toast slides in        |
| XP gain              | XP bar fills with easing           |
| Hotbar slot select   | White border pulse                 |
| Project hover        | Tooltip fade-in (150ms)            |
| Minigame open        | Panel slides up from bottom        |
| Minigame block click | Pixelated reveal animation         |
| Achievement unlock   | Toast + ding sound (if audio on)   |

---

## 6. Keyboard Shortcuts Summary

| Key     | Action                          |
|---------|---------------------------------|
| `1`–`9` | Jump to screen N                |
| `←` `→` | Previous / next screen          |
| Scroll  | Previous / next screen          |
| `F3`    | Toggle F3 debug overlay         |
| `M`     | Open / close Ancient Excavation |
| `Esc`   | Close minigame / modal          |

---

## 7. Asset Checklist

### Backgrounds (9 images, 1920×1080, JPG)
Generate with AI (Midjourney / Stable Diffusion) using the geometry-lock technique:

| File               | Scene Description                                          |
|--------------------|------------------------------------------------------------|
| `bg-01-hero.jpg`       | Overworld village, golden sunset, flat horizon, character right |
| `bg-02-about.jpg`      | Cherry blossom forest, river, beehives, daytime             |
| `bg-03-skills.jpg`     | Stronghold library room, bookshelves, enchanting table glow |
| `bg-04-projects.jpg`   | Underground mineshaft, torches, ore veins, cave depth       |
| `bg-05-experience.jpg` | Snowy mountain peaks, campfire, pine trees, dusk            |
| `bg-06-achievements.jpg` | Deep Dark biome, sculk, blue-green glow, darkness          |
| `bg-07-what-i-build.jpg` | Village interior, trading hall, warm wood tones           |
| `bg-08-contact.jpg`    | Lush Caves, waterfall, glow berries, shafts of light        |
| `bg-09-outro.jpg`      | The End dimension, end stone, void, ender crystals, pillars |

### Icons (32×32 or 64×64, PNG, transparent)
- [ ] 9 hotbar icons (one per screen)
- [ ] 5–6 project icons (unique item per project)
- [ ] 4–6 service icons
- [ ] 6–8 achievement icons
- [ ] Villager NPC sprite
- [ ] Player character render (full body, facing forward, ~200px tall)
- [ ] Player face avatar (64×64, from skin file)

### Fonts
- [ ] **Monocraft** — open-source Minecraft font (download from GitHub: IdreesInc/Monocraft)

### Sounds (Optional)
- [ ] `click.mp3` — UI button click
- [ ] `chest-open.mp3` — projects screen open
- [ ] `enchant.mp3` — skills screen enter
- [ ] `levelup.mp3` — XP level increase
- [ ] `toast.mp3` — advancement notification

### Minecraft Skin
- [ ] Create at `namemc.com` or `minecraftskins.com`
- [ ] Render full-body PNG at `minecraftskins.com/render`
- [ ] Save as `public/skin/character.png` and `public/skin/face.png`
