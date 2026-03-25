# The Descent: 1918–1945

<img width="2492" height="1307" alt="image" src="https://github.com/user-attachments/assets/fcb1068d-f035-4161-911b-03680acbe6f0" />


> *"Those who cannot remember the past are condemned to repeat it."*
> — George Santayana

A digital memorial and interactive educational timeline documenting how democracy died and the Holocaust happened — from the ashes of World War I to the liberation of the concentration camps.

**Live:** [the-descent.vercel.app](https://the-descent.vercel.app)

---

## Why This Exists

I visited Bergen-Belsen and Auschwitz. Standing in those places changes you.

Most people know the Holocaust happened. Fewer understand *how* it happened — the gradual erosion of rights, the normalization of hatred, the step-by-step destruction of a people. This project is my attempt to show that descent, event by event, year by year.

This is not a commercial project. It is a memorial.

---

## What It Does

### Hero Section
- Animated statistics: **6,000,000** Jews murdered · **27** years · **17** key events
- Historical photo with parallax and Ken Burns effect
- Film grain and vignette for a somber, cinematic tone

### Interactive Timeline
17 documented events across 4 phases, in a fishbone/alternating layout:

| Phase | Period | Color | Events |
|-------|--------|-------|--------|
| 1 — The Seeds of Hatred | 1918–1933 | Desaturated blue | 6 |
| 2 — The Persecution | 1933–1939 | Deep red | 5 |
| 3 — The Genocide | 1939–1945 | Near black | 4 |
| 4 — Liberation & Justice | 1944–1946 | Steel gray | 4 |

Each event opens a fullscreen modal with:
- Photo gallery (historical photographs with source attribution)
- Key facts and historical context
- Eyewitness quote
- "Why This Matters" — connecting past to present
- Related events navigation

### Geography of Genocide Map
Interactive dark map of Nazi-occupied Europe with **26 documented camps**:

- Death camps — Auschwitz, Treblinka, Bełżec, Sobibór, Chełmno
- Concentration camps
- Transit camps
- Labor camps

Circle size proportional to death toll. Filter by type. Click for full camp details.

### Other Features
- Scroll progress indicator (year + phase name)
- Breadcrumb navigation
- Ambient sound toggle (Web Audio API — no external dependency)
- Back-to-top button
- Bilingual: English / Portuguese (PT-BR)
- Keyboard accessible (Tab, Enter, Esc)
- Content warning modal on first visit

---

## Tech Stack

```
Next.js 16        — App Router, Turbopack
React 19          — UI framework
TypeScript 5      — Type safety
Tailwind CSS 4    — Styling
Framer Motion 12  — Animations and parallax
next-intl         — Internationalisation (EN / PT-BR)
React Simple Maps — Geography of genocide map
```

**Fonts:** Crimson Text (headings) · Inter (UI)

---

## Project Structure

```
/app
  layout.tsx            — Root layout, metadata, JSON-LD SEO
  page.tsx              — Homepage
  globals.css           — Global styles (film grain, vignette)

/components
  /timeline
    timeline.tsx            — Master orchestrator
    hero-section.tsx        — Hero with animated stats
    event-card.tsx          — Timeline cards
    event-modal.tsx         — Fullscreen event detail
    genocide-map.tsx        — Interactive camps map
    phase-section.tsx       — Phase dividers
    progress-indicator.tsx  — Scroll progress bar
    breadcrumb-nav.tsx      — Phase/event breadcrumb
    language-selector.tsx   — EN / PT toggle
    sound-toggle.tsx        — Ambient audio control
    content-warning.tsx     — First-visit age/content modal
    back-to-top.tsx         — Scroll button

/lib
  timeline-data.ts    — All 17 events (content + photos)
  camp-data.ts        — 26 camps (coordinates + data)

/messages
  en.json             — English translations
  pt.json             — Portuguese translations

/public
  /events             — Historical photographs
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/nery93/the-descent.git
cd the-descent

# Install
npm install

# Run
npm run dev
# → http://localhost:3000
```

No environment variables required.

---

## Photo Sources

All historical photographs are public domain or used under educational fair use:

- **USHMM** — United States Holocaust Memorial Museum
- **IWM** — Imperial War Museum, London
- **Bundesarchiv** — German Federal Archives
- **Library of Congress** — Washington D.C.
- **Wikimedia Commons** — Public domain collection

Every photograph is credited in the modal where it appears.

---

## License

Educational and non-commercial use only.

Historical photographs belong to their respective institutions (USHMM, IWM, Bundesarchiv, Library of Congress). All credited in-app.

---

## Developer

Built by **Nery Silva** — junior backend Go developer from Portugal, building frontend skills one meaningful project at a time.

- Email: [guilherme.rp93@hotmail.com](mailto:guilhermerp93@hotmail.com)
- LinkedIn: [linkedin.com/in/guilhermeneryy](https://www.linkedin.com/in/guilhermeneryy/)

---

*Never Forget. Never Again.*
