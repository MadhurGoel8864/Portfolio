# Handoff: Portfolio Full Redesign

## Overview

This is a **complete visual and interactive redesign** of Madhur Goel's personal portfolio site. The existing site (React + Tailwind, live at madhurportfolio-seven.vercel.app) has been redesigned with a **terminal/API aesthetic** — the entire portfolio is themed as if the visitor is making an API call to an engineer's profile. The design uses a dark base, gold accent system, Georgia serif for display type, Courier New for code/label elements, and system sans-serif for body prose.

The task is to **replace the existing React components** with new implementations that match this design — using the existing file structure, Tailwind config, Framer Motion, and `global.js` data constants. Do not ship the HTML files directly; they are design references only.

---

## About the Design Files

The files in this bundle (`Portfolio Full.html` + `portfolio-styles.css`) are **high-fidelity HTML prototypes** — they show the exact intended look, typography, colors, spacing, and interactions. They are **not production code**. Your job is to:

1. Read the HTML/CSS to understand the exact visual intent
2. Reimplement each section as a React component using the existing codebase patterns (Framer Motion, Tailwind, `global.js` constants, `GlowCard`, `SectionWrapper`, etc.)
3. Replace the existing component files in `src/components/sections/` and `src/components/ui/`

---

## Fidelity

**High-fidelity.** Match colors, typography, spacing, interactions, and animations pixel-precisely. The design tokens below are exact.

---

## Design Tokens

### Colors (add/update in `src/constants/theme.js` and `src/index.css`)

```js
// New background tone (slightly warmer than current)
bgBase:    '#0e0d0b'   // was '#0e0e0e'
bgSurface: '#131210'   // was '#161616'
bgDeeper:  '#111009'   // footer background

// Gold system (unchanged from existing)
gold:      '#C8A951'
goldMuted: '#a88a3a'
goldDim:   rgba(200,169,81,0.12)
goldGlow:  rgba(200,169,81,0.30)

// Status colors (unchanged)
indigo:    '#818cf8'
green:     '#3ddc84'
red:       '#f87171'

// Text
text:      '#f0ede6'
text2:     rgba(240,237,230,0.70)
muted:     rgba(240,237,230,0.40)

// Borders
border:    rgba(200,169,81,0.14)
borderMd:  rgba(200,169,81,0.22)
```

### Typography

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Display / Name | Georgia, serif | clamp(44px, 5.5vw, 90px) | 800 | Hero name, section titles, card titles |
| Section title | Georgia, serif | clamp(32px, 4vw, 56px) | 700 | All `<h2>` section headers |
| Body prose | system-ui / -apple-system / Segoe UI / Helvetica | 13–14px | 400 | Descriptions, bullet points, bio |
| Mono labels | 'Courier New', Courier, monospace | 9–13px | 400–700 | Nav links, chips/tags, API badge, stat labels, terminal cards, eyebrows, section labels |

**Rule:** Mono is used ONLY for elements that are genuinely code-like — API paths, tech tags, stat labels, eyebrow labels, terminal card content. All prose (bios, descriptions, bullet points) uses system sans-serif.

### Spacing
- Section padding: `100px 5vw` (desktop), `70px 5vw` (mobile)
- Card padding: `24px`
- Gap between cards: `16px`
- Hero two-column gap: `4vw`

### Border Radius
- Cards: `16px`
- Chips/tags: `4px`
- Buttons: `8px`
- Pills/badges: `99px`
- Nav logo box: `7px`

### Shadows
- Card hover: `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(200,169,81,0.14)`
- Card hover gold glow: `0 0 40px rgba(200,169,81,0.08)`
- Button primary hover: `0 8px 28px rgba(200,169,81,0.30)`
- Photo glow: `radial-gradient(circle, rgba(200,169,81,0.22) 0%, transparent 70%)`

---

## New Components to Create / Replace

### 1. `src/components/ui/CustomCursor.jsx` ← NEW

A three-layer custom cursor that replaces the default OS cursor.

**Layers:**
- `#cursor-dot` — 8px gold filled circle, snaps instantly to mouse position. Expands to 12px on hover over interactive elements. Box shadow: `0 0 10px rgba(200,169,81,0.3), 0 0 20px rgba(200,169,81,0.3)`.
- `#cursor-ring` — 36px circle, gold border `1.5px solid rgba(200,169,81,0.5)`, lerps to mouse at 15% per frame (smooth lag). Expands to 52px on hover.
- `#cursor-trail` — 60px radial gradient blob `rgba(200,169,81,0.07)`, lerps at 8% per frame (slowest).
- `#cursor-label` — 9px Courier New text that appears 16px to the right of the dot on hover, shows `element.title` or `data-cursor` attribute.

**Hover detection:** `element.closest('a, button, .card, .chip, .accordion-header')`

**Body classes:** `cursor-hover` (on hover), `cursor-click` (on mousedown/mouseup)

**CSS:** Hide system cursor everywhere: `*, *::before, *::after { cursor: none !important; }`

**Mount:** Add `<CustomCursor />` at the top of `App.jsx`, outside `<main>`.

---

### 2. `src/components/ui/ParticleCanvas.jsx` ← REPLACE `AnimatedBackground.jsx`

A `<canvas>` fixed behind the entire page (not just the hero). Replaces the CSS-only `AnimatedBackground`.

**Behavior:**
- 100 particles (capped at `min(100, W*H/14000)`)
- Each particle: random position, velocity `±0.35`, radius `0.4–1.8`, alpha `0.08–0.48`
- Mouse repulsion: within 110px radius, particles push away at `dx/dist * 0.12`
- Velocity damping: `*= 0.98` each frame
- Particles that leave viewport reset to random position
- Connections: lines between particles within 150px, opacity `(1 - d/150) * 0.15`, lineWidth `0.7`, color `rgba(200,169,81, alpha)`
- Scanline overlay: fixed `<div>` with `repeating-linear-gradient` every 4px, opacity 0.5

**Canvas position:** `position: fixed; inset: 0; z-index: 0; pointer-events: none`

**Mount:** In `App.jsx`, render before `<Navbar>`, outside `<main>`.

---

### 3. `src/components/ui/BootSequence.jsx` ← NEW

Full-screen black overlay that runs on first load, then fades out.

**Sequence (timed with `setTimeout`):**

```
0ms    > initializing kernel...                          [green]
80ms   > loading [auth] [websocket] [redis] [postgres]   [green]
150ms  > mounting /api/v1 ...                            [green]
220ms  > judge0 executor: ONLINE                         [green]
290ms  > redis: 10 workers connected                     [green]
360ms  (blank line)
400ms  > GET /api/engineer/madhur-goel HTTP/1.1          [gold]
460ms    Accept: application/json                        [indigo]
500ms  (blank line)
540ms  < HTTP/1.1 200 OK                                 [green]
580ms  {                                                 [text]
610ms    "name":     "Madhur Goel",                      [text]
640ms    "role":     "Backend Engineer",                 [text]
670ms    "location": "Gurgaon, India",                   [text]
700ms    "status":   "open_to_work",                     [green]
730ms    "lc_rating": 1880,                              [gold]
760ms    "live_project": "devduel.site"                  [gold]
790ms  }                                                 [text]
820ms  (blank line)
860ms  > rendering portfolio...                          [green]
```

After last line + 380ms: fade out with `opacity: 0` over 650ms, then `display: none`.

**Store completion in `localStorage` as `bootShown: true`** so the sequence only runs once per session (skip on refresh/revisit in same session).

**Font:** Courier New, `clamp(11px, 1.3vw, 14px)`, line-height 1.7

---

### 4. `src/components/sections/Hero.jsx` ← REPLACE

**Layout:** CSS Grid, `grid-template-columns: 1.15fr 1fr`, `align-items: center`, `gap: 4vw`, `min-height: 100vh`, `padding-top: 100px`.

**Left column — top to bottom:**

1. **API badge** — `GET /api/engineer/madhur-goel 200 OK`
   - Font: Courier New 11px
   - Colors: method=green, path=gold, status=green
   - `display: flex; align-items: center; gap: 8px; margin-bottom: 18px`

2. **Status pill** — open to work
   - `border-radius: 99px`, green dim bg + border, green text, Courier New 11px uppercase
   - Pulsing 6px green dot

3. **Name** — two lines, `display: block` each
   - "Madhur" — Georgia 800, `clamp(44px, 5.5vw, 90px)`, `color: var(--text)`
   - "Goel" — same size, gradient gold text (use existing `.gradient-text` class)
   - `letter-spacing: -0.02em`

4. **Typewriter role** — Courier New, muted prefix `→`, colored role text, gold blinking cursor
   - Roles: `['Backend Engineer', 'System Architect', 'API Designer', 'Real-time Specialist']`
   - Type at 65ms/char, delete at 32ms/char, pause 2000ms at end

5. **Tagline** — system sans 14px, muted, `line-height: 1.75`, `border-left: 2px solid rgba(200,169,81,0.22)`, `padding-left: 14px`
   - Keywords `auth systems`, `real-time sync`, `execution pipelines` in gold

6. **Skill chips** — flex-wrap, gap 6px
   - `chip-gold` style: Courier New 10px, gold text, gold dim bg + border, 4px radius

7. **Stats row** — 4-column grid, top+bottom border `rgba(200,169,81,0.14)`, `padding: 18px 0`
   - Values: Georgia 800, `clamp(18px, 2vw, 26px)`, gold. Labels: Courier New 9px, muted, uppercase
   - Count-up animation on mount (duration 1200ms, ease-out cubic)

8. **CTA buttons** — `btn-primary` + `btn-ghost` (see Design Tokens above)

9. **Social row** — GitHub + LinkedIn icon buttons (34×34px, 8px radius, gold border+icon), divider, location in Courier New 10px muted

10. **Uptime ticker** — `system.uptime: Xs` counting up from mount. Green dot + green value. Courier New 10px muted.

**Right column — Orbit System:**
- Container: `width: clamp(280px, 28vw, 420px); height: same` — centered
- 3 orbit rings: CSS `border-radius: 50%`, centered via `translate(-50%,-50%)`, animated `rotate` CSS keyframe:
  - Ring 1: 84% size, 18s clockwise, `rgba(200,169,81,0.09)`
  - Ring 2: 108% size, 28s counter-clockwise, same color
  - Ring 3: 130% size, 44s clockwise, dashed, `rgba(200,169,81,0.05)`
- 6 orbit tags placed via JS `angle += speed * 16` (rAF loop):
  - Ring 0 (84%): FastAPI (30°), Redis (150°), WebSockets (270°), speed +0.00055 rad/ms
  - Ring 1 (108%): PostgreSQL (60°), Judge0 (180°), GCP (300°), speed −0.00038 rad/ms
  - Each tag: `backdrop-filter: blur(8px)`, gold text+border, dark bg, Courier New 10px
- **Profile photo** centered, circular, `clamp(120px, 12vw, 175px)` diameter:
  - Border: `2px solid rgba(200,169,81,0.4)`
  - Pulsing gold glow behind: `radial-gradient(circle, rgba(200,169,81,0.22) 0%, transparent 70%)`, 3s animation
  - Spinning ring: `inset: -6px`, `border: 1px solid rgba(200,169,81,0.28)`, 8s rotation, with a 6px gold dot at top
  - Magnetic effect: on `mousemove`, if cursor within 200px, shift photo by `dx * (200-d)/200 * 0.1`
- **Terminal card 1** (bottom-right of orbit): `floatA` animation (0→-10px→0, 4s)
  - Content: `system.status` — role, status, p99_latency, stack
- **Terminal card 2** (top-left): `floatB` animation (0→8px→0 + slight rotate, 5s)
  - Content: `last_deploy` — project, branch, infra

**Responsive (< 900px):** Stack vertically, orbit on top, terminal cards hidden.

---

### 5. `src/components/sections/Navbar.jsx` ← UPDATE

**Changes from current:**
- Remove background blur — use `rgba(14,13,11,0.82)` + `backdrop-filter: blur(18px)`
- Change font to Courier New for nav links
- Nav link active state: gold text + `background: rgba(200,169,81,0.12)` + gold border
- Add active section detection via `IntersectionObserver` on all sections (threshold 0.3)
- Right side: replace theme toggle with "Open to work" green status pill

---

### 6. `src/components/sections/About.jsx` ← UPDATE

**Changes:**
- Bio text: system sans-serif 13px, `line-height: 1.8`
- Education cards: two-col, gold accent. GPA displayed as large `Georgia 800 20px gold` number flush right
- Experience cards: left accent border in indigo (`border-top: 2px solid var(--indigo)`), current role has brighter border
- All bullet points: system sans 13px, indigo `▸` prefix
- Tech chips: `chip-indigo` style

---

### 7. `src/components/sections/SystemOverview.jsx` ← UPDATE

**New name:** Keep `SystemOverview`, but rename section label to "DevDual".

**Changes:**
- Left col: `bullet-section-head` labels in Courier New 10px uppercase gold. Bullet items in system sans 13px.
- Right col: `system-facts-card` — dark surface card with gold border, Live badge top-right, fact rows with Courier New label (muted, min-width 100px) + value (system sans, bold)
- CTA buttons: `btn-primary` + `btn-ghost`

---

### 8. `src/components/sections/WhatIBuild.jsx` ← UPDATE

**Grid:** 4 columns desktop, 2 tablet, 1 mobile.

**Card changes:**
- Title: Georgia 700 13px
- Detail: system sans 11–12px muted
- Icon box: 38px, gold dim bg, gold border
- Tags: `chip-gold`
- Use existing `GlowCard` component

---

### 9. `src/components/sections/Architecture.jsx` ← UPDATE

**Card changes:**
- Layer name: Georgia 700 14px
- Tech badge: Courier New 10px, gold, gold-dim bg
- Description: system sans 11px muted, `line-height: 1.75`
- Bullet points: 4px gold dot, Courier New 11px

**Request Flow diagram** (below grid):
- Dark bg panel, Courier New 11px
- Nodes: `flow-node` — gold bg-dim, gold text+border, 6px radius
- Separators: gold arrows + pipe symbols
- Color each layer node differently: PostgreSQL=gold, Redis=green, WebSocket=indigo, Judge0=red

---

### 10. `src/components/sections/EngineeringSystems.jsx` ← UPDATE

**Accordion changes:**
- Label box: 32px, when closed: gold-dim bg + gold border + gold text. When open: gold gradient bg + dark text
- Title: Georgia 600 14px. Sub-preview: Courier New 11px truncated
- Chevron rotates 180° when open (Framer Motion `animate={{ rotate: isOpen ? 180 : 0 }}`)
- Body: two-column grid — Challenges (left) + Implementation (right)
- Bullet prefix: `▸` in gold-dimmed / gold respectively
- Decision box: gold-dim bg, gold bold label "Decision:"
- `eng-what` description: system sans 13px

**Section dividers** between accordion + realtime/caching subsections:
- `flex` row: `<hr> <pill label> <hr>`
- Pill: Courier New 10px uppercase, border + border-radius 99px

**Caching table:**
- Full-width, `border-radius: 12px` wrapper with border
- `th`: Courier New, gold-dimmed, gold-dim bg
- `td`: Use Case col = gold bold; other cols = system sans muted
- Row hover: `rgba(200,169,81,0.03)` bg

---

### 11. `src/components/sections/Achievements.jsx` ← UPDATE

**Changes:**
- Grid: 3 columns (2 tablet, 1 mobile)
- `border-top: 2px solid {color}66` on each card (use ach.color)
- Icon box: 46px, 14px radius, bg + border from `ach.color` with alpha
- Category: Courier New 9px uppercase, `ach.color` at 73% opacity
- Title: Georgia 700 14px
- Description: system sans 11px muted
- Year chip: Courier New 10px, `ach.color` text + bg + border
- View link: Courier New 10px bold, `ach.color`

---

### 12. `src/components/sections/Footer.jsx` ← UPDATE

**Changes:**
- Background: `var(--bg-deeper)` `#111009`
- Three-column grid: Brand | Navigation | Contact
- Brand: logo box + Georgia name + system sans tagline + social icon buttons
- Nav links: system sans 13px, hover gold
- Contact: Courier New labels (10px muted), system sans values
- Status: green pulse dot + green text "Open to opportunities"
- Bottom bar: Courier New 11px muted, no "Built with React & Tailwind" — replace with "terminal aesthetic"

---

### 13. `src/components/ui/SectionTitle.jsx` ← UPDATE

**New eyebrow pattern:**
```jsx
<div className="sec-eyebrow">  // flex row with decorative lines
  <span>{label}</span>          // gold, Courier New uppercase
</div>
<h2 className="sec-title">{title}</h2>      // Georgia
<div className="sec-underline" />            // 48px gold gradient bar
<p className="sec-subtitle">{subtitle}</p>   // system sans muted
```

---

## Interactions & Behavior

### Boot Sequence
- Runs once per session (localStorage gate)
- Full-screen black overlay
- Lines appear sequentially with delays (see BootSequence.jsx above)
- Fades out in 650ms, then hidden

### Particle Network
- Canvas fixed behind entire page, always visible while scrolling
- Mouse repulsion updates on every `mousemove` event
- 60fps via `requestAnimationFrame`

### Custom Cursor
- Three-layer lerp system: dot (instant), ring (15%), trail (8%)
- Hover class expands ring; click class shrinks dot+ring
- Label text appears on hover

### Orbit Tags (Hero)
- Pure JS `requestAnimationFrame` loop
- Tag positions computed from `angle += speed * 16` each frame
- Independent speeds per ring; ring 1 reverses direction

### Magnetic Photo (Hero)
- `mousemove` listener on window
- If cursor within 200px of photo center, apply `translate(dx * pull * 0.1, dy * pull * 0.1)`
- Pull = `(200 - dist) / 200`
- Resets to `translate(0,0)` outside 200px

### Scroll Animations
- `IntersectionObserver` on all `.card`, `.fact-row`, `.bullet-list li`, `.exp-bullets li`
- On intersect: `opacity: 0 → 1`, `translateY(16px → 0)`, duration 500ms ease
- Use `whileInView` from Framer Motion in React

### Accordion (Engineering)
- Only one open at a time
- Height animates via Framer Motion `AnimatePresence` + `height: 'auto'`
- Keep existing pattern from `EngineeringSystems.jsx`

### Typewriter (Hero)
- Custom hook `useTypewriter` already exists — update roles array

### Count-up Stats (Hero)
- On mount, count from 0 to target over 1200ms with cubic ease-out
- Existing `useCountUp` hook pattern in Hero.jsx can be reused

### Nav Active Highlight
- `IntersectionObserver` with `threshold: 0.3, rootMargin: '-60px 0px 0px 0px'`
- On intersect, add `.active` to matching nav link

---

## State Management

No new global state needed. All data comes from `src/constants/global.js` (unchanged).

Local state per component:
- `BootSequence`: `shown` boolean (localStorage)
- `Hero`: typewriter state, uptime ticker, orbit rAF ref
- `EngineeringSystems`: `openIdx` accordion state (existing pattern)
- `CustomCursor`: cursor position via refs (not state — avoid re-renders)
- `ParticleCanvas`: particle array, mouse position via refs

---

## Assets

- `public/profile.jpg` — Madhur's profile photo, used in Hero orbit system (already exists)
- `public/resume.pdf` — linked from CTA button (already exists)
- No new images or icons needed — all icons are inline SVGs

---

## Files in This Bundle

| File | Purpose |
|------|---------|
| `Portfolio Full.html` | Complete hi-fi prototype of the full redesigned page |
| `portfolio-styles.css` | All CSS tokens, animations, and component styles used in the prototype |
| `README.md` | This document |

**Reference the HTML prototype** for exact pixel measurements, spacing, color values, and animation feel. When in doubt about a specific value, inspect the HTML/CSS directly.

---

## Implementation Order (Suggested)

1. Update `src/index.css` CSS variables (background tones, font stacks)
2. Create `CustomCursor.jsx` + mount in `App.jsx`
3. Create `ParticleCanvas.jsx` + mount in `App.jsx` (replace `AnimatedBackground`)
4. Create `BootSequence.jsx` + mount in `App.jsx`
5. Update `Navbar.jsx`
6. Update `Hero.jsx` (largest change — orbit system, magnetic photo, typewriter, stats)
7. Update `SectionTitle.jsx`
8. Update remaining sections: `About`, `SystemOverview`, `WhatIBuild`, `Architecture`, `EngineeringSystems`, `Achievements`, `Footer`
9. Update `tailwind.config.js` to add `fontFamily` entries if needed

---

## Tailwind Config Updates

Add to `tailwind.config.js`:

```js
theme: {
  extend: {
    fontFamily: {
      display: ['Georgia', 'Times New Roman', 'serif'],
      mono: ['"Courier New"', 'Courier', 'monospace'],
      sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
    },
  }
}
```

Then use `font-display`, `font-mono`, `font-sans` Tailwind classes in components.
