/**
 * portfolio.config.js
 * =====================================================
 * THIS IS THE ONLY FILE YOU EDIT.
 * Every screen, skill, project, and link lives here.
 * Replace clearly marked temporary values before publishing.
 * =====================================================
 */

const config = {

  // ─────────────────────────────────────────────────
  // META
  // ─────────────────────────────────────────────────
  meta: {
    name:        'Shlok Builds',
    version:     'v1.0.0',
    subtitle:    'SURVIVAL · HARD MODE',
    siteTitle:   'Shlok Builds — Portfolio',
    description: 'IT student, software builder & aspiring game developer. AI systems, full-stack apps, embedded projects.',
    ogImage:     '/bg/bg-01-hero.jpg',
    favicon:     '/icons/hotbar/01-book.png',
    domain:      '#',
  },

  // ─────────────────────────────────────────────────
  // SCREEN 1 — HERO
  // ─────────────────────────────────────────────────
  hero: {
    title:      'Shlok Builds',
    subtitle:   'SURVIVAL · HARD MODE',
    background: '/bg/bg-01-hero.jpg',
    video:      '/bg/bg-01-hero.mp4',       // Drop your .mp4 here for live bg
    character:  '/skin/character.png',
    biome:      'Overworld',
    buttons: [
      { label: 'Enter World',         screen: 1 },
      { label: 'View Builds',         screen: 3 },
      { label: 'Villager Trades',     screen: 6 },
      { label: 'Contact',             screen: 7 },
      { label: 'The End',             screen: 8 },
      { label: 'Mine For the Amulet', screen: 9 } // placeholder for minigame
    ],
    disclaimer: 'Not an official Minecraft product. Not affiliated with Mojang or Microsoft.',
  },

  // ─────────────────────────────────────────────────
  // SCREEN 2 — ABOUT (Player Profile)
  // ─────────────────────────────────────────────────
  about: {
    background: '/bg/bg-02-about.jpg',
    video:      '/bg/bg-02-about.mp4',
    biome:      'Cherry Grove',
    face:       '/skin/face.png',
    character:  '/skin/character.png',

    bio: '[PLACEHOLDER — replace with a verified 2-3 sentence bio]',

    stats: [
      { label: 'Class',  value: 'Frontend developer, Game devs and AI creater. I build digital experience that are funcational with memoriable impact.' },
      { label: 'Level',  value: '3rd Year — B.Tech Information Technology' },
      { label: 'Spawn',  value: 'Nashik, Maharashtra, India' },
      { label: 'Status', value: 'Student at MIT AOE ' },
    ],

    cta: {
      label: 'View on GitHub',
      url:   '#',
    },
  },

  // ─────────────────────────────────────────────────
  // SCREEN 3 — SKILLS (Enchantments)
  // ─────────────────────────────────────────────────
  skills: {
    background: '/bg/bg-03-skills.jpg',
    video:      '/bg/bg-03-skills.mp4',
    biome:      'Stronghold',
    hint:       'Hover an enchantment to inspect it',

    // level: Roman numeral shown (I–V)
    // bar:   Fill percentage (0–100)
    // tip:   Tooltip shown on hover
    list: [
      { name: 'Python',      level: 'V',   bar: 88, tip: 'Core language — AEIA, data analysis, scikit-learn, PyQt5 desktop apps' },
      { name: 'JavaScript',  level: 'IV',  bar: 75, tip: 'Full-stack web — Node.js, Express, Chart.js, async/await' },
      { name: 'HTML / CSS',  level: 'IV',  bar: 78, tip: 'Semantic markup, custom layouts, responsive design' },
      { name: 'Node.js',     level: 'IV',  bar: 72, tip: 'REST APIs, Express routing, MySQL integration' },
      { name: 'C / C++',     level: 'III', bar: 55, tip: 'Embedded systems — Arduino, ultrasonic sensors, hardware interfacing' },
      { name: 'C#',          level: 'III', bar: 50, tip: 'Unity scripting — self-directed game development learning' },
      { name: 'Java',        level: 'III', bar: 60, tip: 'OOP, threading, collections, Swing GUI, JDBC — academic practicals' },
      { name: 'PyQt5',       level: 'IV',  bar: 80, tip: 'Desktop app UIs — used extensively in AEIA project' },
      { name: 'SQLite',      level: 'IV',  bar: 75, tip: 'Schema design, query optimization — core to AEIA architecture' },
      { name: 'MySQL',       level: 'III', bar: 65, tip: 'Relational databases — used in Cafe Management System' },
      { name: 'Git',         level: 'IV',  bar: 78, tip: 'Version control, branching, project history management' },
      { name: 'Unity',       level: 'II',  bar: 38, tip: 'Self-taught game engine — scenes, physics, C# game logic' },
      { name: 'AI / ML',     level: 'IV',  bar: 72, tip: 'scikit-learn, SciPy, Explainable AI — applied in AEIA and MRO systems' },
    ],
  },

  // ─────────────────────────────────────────────────
  // SCREEN 4 — PROJECTS (Chest Inventory)
  // ─────────────────────────────────────────────────
  projects: {
    background: '/bg/bg-04-projects.jpg',
    video:      '/bg/bg-04-projects.mp4',
    biome:      'Mineshaft',
    chestTitle: 'Chest — Completed Builds',

    // icon: path to pixel-art icon in /public/icons/projects/
    // status: 'complete' | 'in-progress'
    // pages: array of strings — content for the written book modal
    list: [
      {
        name:   'AEIA — AI Engineering Insight Assistant',
        icon:   '/icons/projects/purple-gem.png',
        type:   'Desktop App',
        stack:  ['Python', 'PyQt5', 'Pandas', 'SciPy', 'scikit-learn', 'SQLite', 'ReportLab'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'in-progress',
        desc:   'Fully offline Windows desktop app for avionics/aerospace data analysis. Ingests engineering datasets, runs Explainable AI (no LLMs, no GPU), exports PDF reports.',
        github: '#',
        live:   null,
      },
      {
        name:   'MRO Maintenance Data Insight System',
        icon:   '/icons/projects/compass.png',
        type:   'AI System — Internship Prototype',
        stack:  ['Python', 'AI/ML', 'SQLite', 'JSON'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'in-progress',
        desc:   'AI-powered maintenance insight tool for aerospace MRO workflows. Built from a 23-document spec with 335 numbered requirements and a full traceability matrix.',
        github: '#',
        live:   null,
      },
      {
        name:   'Hangout Cafe Management System v2.0',
        icon:   '/icons/projects/brewing-stand.png',
        type:   'Full-Stack Web App',
        stack:  ['Node.js', 'Express', 'MySQL', 'Chart.js', 'HTML/CSS'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'complete',
        desc:   'Multi-item POS for cafe management. Split payments, role-based access, audit logging, MySQL triggers, CSV exports. Debugged real timezone and auth issues.',
        github: '#',
        live:   null,
      },
      {
        name:   'Speed Detection System (Arduino)',
        icon:   '/icons/projects/redstone.png',
        type:   'Embedded System',
        stack:  ['Arduino', 'C/C++', 'Ultrasonic Sensors'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'complete',
        desc:   'Two-sensor ultrasonic speed detection. Measures time-of-flight to compute object speed. Academic mini project co-authored with four classmates.',
        github: '#',
        live:   null,
      },
      {
        name:   'AI Smart Traffic Management (Analysis)',
        icon:   '/icons/projects/map.png',
        type:   'Business Analysis',
        stack:  ['AI/ML Concepts', 'Technical Documentation'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'complete',
        desc:   'Engineering Informatics project. Full business analysis document for an AI-driven traffic management system, formatted to academic template specification.',
        github: '#',
        live:   null,
      },
      {
        name:   'Minecraft Portfolio (This Site)',
        icon:   '/icons/projects/command-block.png',
        type:   'Creative Web Portfolio',
        stack:  ['Vite', 'Vanilla JS', 'GSAP', 'CSS'],
        problem: '[PLACEHOLDER — describe the verified problem this project addresses]',
        contribution: '[PLACEHOLDER — describe your verified contribution]',
        status: 'in-progress',
        desc:   'A developer portfolio that plays like Minecraft. 9 screens, hotbar nav, enchantment skills, chest projects, a What I Build showcase, and an ore-mining minigame.',
        github: '#',
        live:   '#',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // SCREEN 5 — EXPERIENCE (Crafting — The Journey)
  // ─────────────────────────────────────────────────
  experience: {
    background: '/bg/bg-05-experience.jpg',
    video:      '/bg/bg-05-experience.mp4',
    biome:      'Snowy Peaks',
    title:      'Crafting — The Journey',

    // recipeInput: 3 emoji/icon strings shown as crafting input
    // recipeOutput: 1 emoji/icon shown as result
    list: [
      {
        dateRange:     '2024 – Present',
        title:         'B.Tech Information Technology',
        org:           'MIT Academy of Engineering, Nashik',
        desc:          'Full-time IT student working across software engineering, embedded systems, and AI. Building real projects alongside coursework.',
        recipeInput:   ['📚', '💻', '☕'],
        recipeOutput:  '🎓',
      },
      {
        dateRange:     '2024',
        title:         'Intern — AI System Developer',
        org:           '[PLACEHOLDER — company name, or Not publicly listed]',
        desc:          'Built the MRO Maintenance Data Insight System from a 23-document spec. Closed documentation gaps and prepared an AI pipeline for aerospace workflows.',
        recipeInput:   ['📄', '🤖', '✈'],
        recipeOutput:  '🔧',
      },
      {
        dateRange:     '2022 – 2023',
        title:         'Independent Builder',
        org:           'Self-directed / Personal Projects',
        desc:          'Started building software outside academics. Shipped the Cafe Management System, Speed Detection hardware, and began game dev learning with Unity and C#.',
        recipeInput:   ['⚡', '🎮', '🛠'],
        recipeOutput:  '🚀',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // SCREEN 6 — ACHIEVEMENTS (Advancements)
  // ─────────────────────────────────────────────────
  achievements: {
    background: '/bg/bg-06-achievements.jpg',
    video:      '/bg/bg-06-achievements.mp4',
    biome:      'Deep Dark',

    // status: 'complete' | 'locked'
    list: [
      { icon: '⚔',  title: 'First Full-Stack Ship',  desc: 'Shipped a working POS system end-to-end.',                        status: 'complete' },
      { icon: '🤖', title: 'AI Architect',            desc: 'Built a fully offline AI analysis desktop app from scratch.',      status: 'complete' },
      { icon: '✈',  title: 'Aerospace Pioneer',       desc: 'Delivered an internship prototype for aerospace MRO workflows.',   status: 'complete' },
      { icon: '🎮', title: 'Game Dev Hopeful',        desc: 'Started self-directed Unity + C# learning for indie game goals.',  status: 'complete' },
      { icon: '⚡',  title: 'Hardware Hacker',         desc: 'Built and tested an embedded speed detection system with Arduino.',status: 'complete' },
      { icon: '📚', title: 'Scholar in the Wild',     desc: 'Enrolled in B.Tech IT and shipped real projects alongside it.',    status: 'complete' },
      { icon: '🏆', title: '[PLACEHOLDER]',           desc: '[PLACEHOLDER — your own milestone]',                               status: 'complete' },
      { icon: '🌟', title: 'Founding a Studio',       desc: 'Launch an indie game studio after graduation.',                    status: 'locked'   },
    ],

    cta: {
      label: 'Send a Message',
      screen: 7,   // → Contact (Screen 8, index 7)
    },
  },

  // ─────────────────────────────────────────────────
  // SCREEN 7 — WHAT I BUILD (Villager Trades)
  // ─────────────────────────────────────────────────
  whatIBuild: {
    background:  '/bg/bg-07-what-i-build.jpg',
    video:       '/bg/bg-07-what-i-build.mp4',
    biome:       'Village',
    villager:    '/icons/villager.png',
    character:   '/skin/character.png',
    profession:  'Builder',
    level:       '[N]',

    stats: [
      { value: '[N]',  label: 'Projects'              },
      { value: '[N]',  label: 'Technologies'          },
      { value: '[N]',  label: 'Years learning/building'},
    ],

    // status: 'built' | 'learning' | 'planned'
    capabilities: [
      {
        icon:   '🖥',
        name:   'Desktop Applications',
        desc:   'Offline Windows applications with data analysis and PDF export.',
        stack:  ['Python', 'PyQt5', 'SQLite', 'ReportLab'],
        status: 'built',
      },
      {
        icon:   '🌐',
        name:   'Full-Stack Web Applications',
        desc:   'Backend and frontend systems such as POS tools, dashboards, and portals.',
        stack:  ['Node.js', 'Express', 'MySQL', 'HTML/CSS'],
        status: 'built',
      },
      {
        icon:   '🤖',
        name:   'AI / ML Systems',
        desc:   'Explainable AI pipelines, models, and data insight systems.',
        stack:  ['Python', 'scikit-learn', 'SciPy', 'SQLite'],
        status: 'built',
      },
      {
        icon:   '📊',
        name:   'Data Analysis',
        desc:   'Python data pipelines, visualizations, and PDF report generation.',
        stack:  ['Python', 'Pandas', 'SciPy', 'ReportLab'],
        status: 'built',
      },
      {
        icon:   '🎮',
        name:   'Game Prototypes',
        desc:   'Early-stage gameplay prototypes, mechanics, scenes, and basic AI.',
        stack:  ['Unity', 'C#'],
        status: 'learning',
      },
      {
        icon:   '📋',
        name:   'Technical Documentation',
        desc:   'Software specifications, requirements, test cases, and design documents.',
        stack:  ['Requirements analysis', 'Traceability', 'Technical writing'],
        status: 'built',
      },
    ],
  },

  // ─────────────────────────────────────────────────
  // SCREEN 8 — CONTACT (Let's Connect)
  // ─────────────────────────────────────────────────
  contact: {
    background: '/bg/bg-08-contact.jpg',
    video:      '/bg/bg-08-contact.mp4',
    biome:      'Lush Caves',
    tagline:    "Send one, I'll answer within a day.",

    links: [
      { icon: '✉',  label: 'Email',     value: 'example@email.com',                                    href: 'mailto:example@email.com' },
      { icon: '📍', label: 'Location',  value: 'Nashik, Maharashtra, India',                           href: null },
      { icon: '🐙', label: 'GitHub',    value: 'GitHub profile placeholder',                            href: '#' },
      { icon: '💼', label: 'LinkedIn',  value: 'LinkedIn profile placeholder',                          href: '#' },
      { icon: '🐦', label: 'Twitter/X', value: '[PLACEHOLDER — remove if not used]',                    href: '#' },
    ],

    cta: {
      label: 'To The End',
      screen: 8,   // → Outro (Screen 9, index 8)
    },
  },

  // ─────────────────────────────────────────────────
  // SCREEN 9 — THE END (Outro)
  // ─────────────────────────────────────────────────
  outro: {
    background: '/bg/bg-09-outro.jpg',
    video:      '/bg/bg-09-outro.mp4',
    biome:      'The End',
    character:  '/skin/character.png',   // back-facing version if available

    eyebrow:    'THANKS FOR PLAYING',
    title:      'The End',
    body: [
      'You reached the end of this world.',
      'But every world has another seed.',
      'So build something nobody expects.',
    ],

    cta: {
      label: 'Respawn',
      screen: 0,   // → Hero (Screen 1, index 0)
    },
  },

  // ─────────────────────────────────────────────────
  // MINIGAME — Ancient Excavation
  // ─────────────────────────────────────────────────
  minigame: {
    title:    'Ancient Excavation',
    subtitle: 'Break blocks to sound out the doubt. Numbers are how many blocks away it is.',
    gridSize: 10,       // 10×10
    maxStrikes: 10,

    ores: [
      { type: 'emerald',  points: 5, count: 3,  color: '#17dd62' },
      { type: 'diamond',  points: 4, count: 5,  color: '#4af4f4' },
      { type: 'gold',     points: 2, count: 7,  color: '#ffcc00' },
      { type: 'redstone', points: 1, count: 8,  color: '#ff2020' },
      { type: 'lava',     points: 0, count: 12, color: '#ff6600', isStrike: true },
    ],

    restartLabel: 'Examine ruins',
  },

  // ─────────────────────────────────────────────────
  // HUD
  // ─────────────────────────────────────────────────
  hud: {
    // One entry per screen (9 total, in order)
    hotbarSlots: [
      { icon: '/icons/hotbar/01-book.svg',     label: 'Home'         },
      { icon: '/icons/hotbar/02-head.svg',     label: 'About'        },
      { icon: '/icons/hotbar/03-enchbook.svg', label: 'Skills'       },
      { icon: '/icons/hotbar/04-chest.svg',    label: 'Projects'     },
      { icon: '/icons/hotbar/05-clock.svg',    label: 'Experience'   },
      { icon: '/icons/hotbar/06-star.svg',     label: 'Achievements' },
      { icon: '/icons/hotbar/07-emerald.svg',  label: 'What I Build' },
      { icon: '/icons/hotbar/08-quill.svg',    label: 'Contact'      },
      { icon: '/icons/hotbar/09-endereye.svg', label: 'The End'      },
    ],

    xp: {
      pointsPerScreen: 11,    // 9 screens × 11 = 99 XP ≈ full bar
      levelThreshold:  33,    // Level up every 33 XP (gives levels 0 → 1 → 2 → 3)
    },

    sounds: {
      enabled: false,         // Set true once you add sound files
      click:   '/sounds/click.mp3',
      levelup: '/sounds/levelup.mp3',
      toast:   '/sounds/toast.mp3',
    },
  },

};

export default config;
