# Portfolio Content Blueprint
> Temporary content is allowed while the UI is developed. Replace clearly marked placeholders in `portfolio.config.js` later; do not invent personal information.

---

## HOW TO USE THIS FILE
1. Search for every `[PLACEHOLDER]` — these need your input before publishing
2. Edit the pre-filled sections to match your voice exactly
3. Once complete, copy values into `portfolio.config.js`
4. Do NOT change structure — only content

---

## SCREEN 1 — HERO

```
Title:          Shlok Builds
Subtitle:       SURVIVAL · HARD MODE
Version:        v1.0.0
```

**Menu buttons (label → screen it links to):**
```
Enter World       → About (Screen 2)
View Projects     → Projects (Screen 4)
Skills & Tools    → Skills (Screen 3)
Achievements      → Achievements (Screen 6)
Let's Connect     → Contact (Screen 8)
```

---

## SCREEN 2 — ABOUT (Player Profile)

```
Bio (2–3 sentences, written in first person, punchy):
[PLACEHOLDER — example only; replace with your real bio: "IT student building real things — AI desktop apps,
full-stack web systems, and game prototypes. I work at the intersection of
software engineering, embedded systems, and game development. Currently
crafting worlds in code, one project at a time."]

Class (your role tagline):
[PLACEHOLDER — example only: "Builder · AI Dev · Aspiring Game Maker"]

Level (year + degree):
3rd Year — B.Tech Information Technology

Spawn (location):
Nashik, Maharashtra, India

Status (current availability):
[PLACEHOLDER — example only: "Online · Open to internships"]

GitHub URL:
[PLACEHOLDER — use `#` until the real URL is supplied]
```

---

## SCREEN 3 — SKILLS (Enchantments)

> Format: Name | Roman Numeral Level (I–V) | Bar % (0–100) | Tooltip description
> I=Beginner, II=Familiar, III=Competent, IV=Proficient, V=Expert

```
Python          | V   | 88 | "Core language — used for AEIA, data analysis, scikit-learn, PyQt5 desktop apps"
JavaScript      | IV  | 75 | "Full-stack web — Node.js, Express, Chart.js, async/await"
HTML / CSS      | IV  | 78 | "Semantic markup, custom layouts, responsive design"
Node.js         | IV  | 72 | "REST APIs, Express routing, MySQL integration"
C / C++         | III | 55 | "Embedded systems — Arduino, ultrasonic sensors, hardware interfacing"
C#              | III | 50 | "Unity scripting — self-directed game development learning"
Java            | III | 60 | "OOP, threading, collections, Swing GUI, JDBC — academic practicals"
PyQt5           | IV  | 80 | "Desktop app UIs — used extensively in AEIA project"
SQLite          | IV  | 75 | "Schema design, query optimization — core to AEIA architecture"
MySQL           | III | 65 | "Relational databases — used in Cafe Management System"
Git             | IV  | 78 | "Version control, branching, project history management"
Unity           | II  | 38 | "Self-taught game engine — scenes, physics, C# game logic"
AI / ML         | IV  | 72 | "scikit-learn, SciPy, Explainable AI — applied in AEIA and MRO systems"
```

> Add or remove skills as needed. Max ~12 for readability.

---

## SCREEN 4 — PROJECTS (Chest Inventory)

> Format per project: Name | Icon | Type | Stack | Problem | Contribution | Status | Description | GitHub URL | Live URL

### Project 1: AEIA
```
Name:        AI-Powered Engineering Insight Assistant (AEIA)
Icon:        purple-gem.png  (or use 🔮 as placeholder)
Type:        Desktop App
Stack:       Python, PyQt5, Pandas, SciPy, scikit-learn, SQLite, ReportLab
Status:      In Progress
Description: Fully offline Windows desktop app for avionics/aerospace data analysis.
             Ingests engineering datasets, runs Explainable AI analysis (no LLMs, no GPU),
             exports PDF reports. Built with 11 comprehensive documentation files.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        N/A (offline desktop)
```

### Project 2: MRO Maintenance Data Insight System
```
Name:        MRO Maintenance Data Insight System
Icon:        compass.png
Type:        AI System / Internship Prototype
Stack:       Python, AI/ML, SQLite, JSON config
Status:      In Progress
Description: AI-powered maintenance insight tool for aerospace MRO workflows.
             Built from a 23-document spec with 335 numbered requirements and a
             full traceability matrix. Internship prototype.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        N/A
```

### Project 3: Hangout Cafe Management System v2.0
```
Name:        Hangout Cafe Management System v2.0
Icon:        brewing-stand.png  (or ☕)
Type:        Full-Stack Web App
Stack:       Node.js, Express, MySQL, Chart.js, HTML/CSS
Status:      Complete
Description: Multi-item POS system for cafe management. Covers split payments,
             role-based access, audit logging, MySQL triggers, and CSV exports.
             Debugged real timezone and auth issues in production.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        null
```

### Project 4: Speed Detection System
```
Name:        Speed Detection System (Arduino)
Icon:        redstone.png  (or ⚡)
Type:        Embedded System
Stack:       Arduino, C/C++, Ultrasonic Sensors (HC-SR04)
Status:      Complete
Description: Two-sensor ultrasonic speed detection setup. Measures time-of-flight
             between sensors to compute object speed. Academic mini project.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        N/A (hardware)
```

### Project 5: AI Smart Traffic Management System
```
Name:        AI-Powered Smart Traffic Management System
Icon:        map.png  (or 🗺)
Type:        Business Analysis / Concept
Stack:       AI/ML concepts, business documentation
Status:      Complete (analysis doc)
Description: Engineering Informatics project. Business analysis document for an
             AI-driven traffic management system — formatted as academic template.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        N/A
```

### Project 6: Minecraft Portfolio (This Site)
```
Name:        Minecraft Portfolio
Icon:        command-block.png
Type:        Web — Creative Portfolio
Stack:       Vite, Vanilla JS, GSAP, CSS
Status:      In Progress
Description: A developer portfolio that plays like Minecraft. 9 screens, hotbar
             navigation, enchantment skills, chest projects, What I Build showcase,
             and a minesweeper minigame.
Problem:      [PLACEHOLDER — what problem the project addresses]
Contribution: [PLACEHOLDER — your specific contribution]
GitHub:      #
Live:        #
```

> Add more projects if you have them. Empty chest slots are fine — they look natural.

---

## SCREEN 5 — EXPERIENCE (Crafting — The Journey)

> Format: Date range | Title | Organization | 1–2 line description | Recipe items (3 input icons → 1 output icon)

### Entry 1 (Most Recent)
```
Date:         2024 – Present
Title:        B.Tech Information Technology
Org:          MIT Academy of Engineering, Nashik
Description:  Full-time IT student working across software engineering, embedded
              systems, and AI. Building real projects alongside coursework.
Recipe:       📚 + 💻 + ☕  →  🎓
```

### Entry 2
```
Date:         2024 (Internship period)
Title:        Intern — AI System Developer
Org:          [PLACEHOLDER — company name, or "Not publicly listed"]
Description:  Built the MRO Maintenance Data Insight System prototype from a
              23-document spec. Closed documentation gaps and prepared an AI
              development pipeline for aerospace workflows.
Recipe:       📄 + 🤖 + ✈  →  🔧
```

### Entry 3
```
Date:         2022 – 2023
Title:        Independent Builder
Org:          Self-directed / Personal Projects
Description:  Started building software outside academics. Shipped the Cafe
              Management System, Speed Detection hardware, and began game dev
              learning with Unity and C#.
Recipe:       ⚡ + 🎮 + 🛠  →  🚀
```

---

## SCREEN 6 — ACHIEVEMENTS (Advancements)

> Format: Icon | Title | Description | Status (complete/locked)

```
🗡   First Full-Stack Ship
     "Shipped a working POS system end-to-end."
     Status: Complete ✓

🤖   AI Architect
     "Built a fully offline AI analysis desktop app from scratch."
     Status: Complete ✓

✈   Aerospace Pioneer
     "Delivered an internship prototype for aerospace MRO workflows."
     Status: Complete ✓

🎮   Game Dev Hopeful
     "Started self-directed Unity + C# learning for indie game goals."
     Status: Complete ✓

⚡   Hardware Hacker
     "Built and tested an embedded speed detection system with Arduino."
     Status: Complete ✓

📚   Scholar in the Wild
     "Enrolled in B.Tech IT and built real projects alongside coursework."
     Status: Complete ✓

🏆   [PLACEHOLDER — verified milestone]
     "[PLACEHOLDER — verified description]"
     Status: [Complete / Locked]

🌟   Founding a Studio
     "Launch an indie game studio after graduation."
     Status: Locked 🔒
```

> The last one being "locked" is a nice touch — shows your future goal.

---

## SCREEN 7 — WHAT I BUILD (Villager Trades)

```
Profession badge: "Builder: Level [N]"

Stat bar:
     [N] Projects  |  [N] Technologies  |  [N] Years learning/building
     [PLACEHOLDER — use verified numbers only]
```

> Format: Icon | Capability Name | Description | Relevant technologies | Showcase status

```
[🖥]  Desktop Applications
     "Offline Windows applications with data analysis and PDF export."
     Python, PyQt5, SQLite, ReportLab
     Status: Built / Learning / Planned

[🌐]  Full-Stack Web Applications
     "Backend and frontend systems such as POS tools, dashboards, and portals."
     Node.js, Express, MySQL, HTML/CSS
     Status: Built / Learning / Planned

[🤖]  AI / ML Systems
     "Explainable AI pipelines, models, and data insight systems."
     Python, scikit-learn, SciPy, SQLite
     Status: Built / Learning / Planned

[📊]  Data Analysis
     "Python data pipelines, visualizations, and PDF report generation."
     Python, Pandas, SciPy, ReportLab
     Status: Built / Learning / Planned

[🎮]  Game Prototypes
     "Early-stage gameplay prototypes, mechanics, scenes, and basic AI."
     Unity, C#
     Status: Learning

[📋]  Technical Documentation
     "Software specifications, requirements, test cases, and design documents."
     Requirements analysis, traceability, technical writing
     Status: Built / Learning / Planned
```

**CTA button text:** `View Contact`
**CTA link:** → navigates to Screen 8 (Contact)

---

## SCREEN 8 — CONTACT (Let's Connect)

```
Tagline:   "Send one, I'll answer within a day."

Email:     example@email.com
Location:  Nashik, Maharashtra, India
GitHub:    #
LinkedIn:  #
Twitter/X: [PLACEHOLDER — remove if not used]

CTA Button: "To The End"  → navigates to Screen 9
```

---

## SCREEN 9 — THE END (Outro)

```
Eyebrow:     THANKS FOR PLAYING

Title:       The End

Body:
  "You reached the end of this world.
   But every world has another seed.
   So build something nobody expects."

Button:      Respawn  → returns to Screen 1 (Hero)
```

---

## MINIGAME — Ancient Excavation

```
Title:    Ancient Excavation
Subtitle: "Break blocks to sound out the doubt. Numbers are how many blocks away it is."

Grid:     10 × 10

Ore distribution:
  Emerald  (5 pts): 3 hidden
  Diamond  (4 pts): 5 hidden
  Gold     (2 pts): 7 hidden
  Redstone (1 pt):  8 hidden
  Lava     (STRIKE): 12 hidden

Strikes allowed: 10
Starting EP:     0

Bottom button:   "Examine ruins"  (restart)
```

---

## META & SEO

```
Page title:    "Shlok Builds — Portfolio"
Description:   "IT student, software builder & aspiring game developer.
                AI systems, full-stack apps, embedded projects."
OG image:      bg-01-hero.jpg  (use as social preview)
Favicon:       [PLACEHOLDER — use a small pixel-art icon, 32×32]
Domain:        [PLACEHOLDER — where will this be hosted?]
```
