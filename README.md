# The Descent: 1918–1945

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

### Homepage
- Animated statistics: **6,000,000** Jews murdered · **27** years · **22** key events
- Historical photo with parallax and Ken Burns effect
- Film grain and vignette for a somber, cinematic tone

### Interactive Timeline
22 documented events across 4 phases, in a fishbone/alternating layout:

| Phase | Period | Color | Events |
|-------|--------|-------|--------|
| 1 — The Seeds of Hatred | 1918–1933 | Desaturated blue | 5 |
| 2 — The Persecution | 1933–1939 | Deep red | 6 |
| 3 — The Genocide | 1939–1945 | Near black | 6 |
| 4 — Liberation & Justice | 1944–1946 | Steel gray | 5 |

Each event opens a fullscreen modal with:
- Photo gallery (historical photographs)
- Key facts
- Historical context
- Eyewitness quote
- "Why This Matters" — connecting past to present
- Related events

### Geography of Genocide Map
Interactive dark map of Nazi-occupied Europe with **26 documented camps**:

- 🔴 Death camps — Auschwitz, Treblinka, Bełżec, Sobibór, Chełmno
- 🟠 Concentration camps
- 🟡 Transit camps
- 🟤 Labor camps

Circle size = death toll. Filter by type. Click for full camp details.

### Other Features
- Scroll progress indicator (year + phase name)
- Breadcrumb navigation
- Sound toggle (ambient audio)
- Back-to-top button
- Share individual events
- Keyboard accessible (Tab, Enter, Esc)

---

## Tech Stack

```
Next.js 16        — App Router, Turbopack
React 19          — UI framework
TypeScript 5      — Type safety
Tailwind CSS 4    — Styling
Framer Motion 12  — Animations and parallax
React Simple Maps — Geography of genocide map
Vercel Analytics  — Usage insights (anonymous)
```

**Fonts:** Crimson Text (headings) · Inter (UI) · Source Serif 4 (body)

---

## Project Structure

```
/app
  layout.tsx          — Root layout, metadata, JSON-LD SEO
  page.tsx            — Homepage
  globals.css         — Global styles (film grain, vignette)
  sitemap.ts          — Dynamic sitemap

/components
  /timeline
    timeline.tsx          — Master orchestrator
    hero-section.tsx      — Hero with animated stats
    event-card.tsx        — Timeline cards
    event-modal.tsx       — Fullscreen event detail
    genocide-map.tsx      — Interactive camps map
    phase-section.tsx     — Phase dividers
    progress-indicator.tsx — Scroll progress bar
    sound-toggle.tsx      — Audio control
    back-to-top.tsx       — Scroll button
  Footer.tsx

/lib
  timeline-data.ts    — All 22 events (content + photos)
  camp-data.ts        — 26 camps (coordinates + data)

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

# Environment variables
cp .env.example .env.local
# Add your Mapbox token: NEXT_PUBLIC_MAPBOX_TOKEN=

# Run
npm run dev
# → http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes | Mapbox GL token for the genocide map |
| `NEXT_PUBLIC_SITE_URL` | No | Your production URL |

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

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel
npx vercel --prod
```

Recommended: Vercel + Cloudflare (DDoS protection for a site that may attract bad-faith traffic).

---

## Roadmap

- [ ] Portuguese translation (next-intl)
- [ ] Phase 4 content completion
- [ ] "Faces" section — individual stories (Anne Frank, Sophie Scholl...)
- [ ] "Today" section — modern warning signs
- [ ] Teacher resources — lesson plans, discussion guides
- [ ] WCAG AAA full audit
- [ ] Deportation routes on map

---

## A Note on Security

Holocaust memorial sites attract targeted harassment and DDoS attacks. This project implements:

- Strict Content Security Policy headers
- Rate limiting (100 req/min per IP)
- X-Frame-Options: DENY
- Cloudflare recommended for production

---

## License

Educational and non-commercial use only.

Historical photographs belong to their respective institutions (USHMM, IWM, Bundesarchiv, Library of Congress). All credited in-app.

---

## Developer

Built by **Nery** — junior backend Go developer from Portugal, building frontend skills one meaningful project at a time.

- Email: [nery.thedescent@proton.me](mailto:nery.thedescent@proton.me)
- LinkedIn: [linkedin.com/in/nery-silva](https://linkedin.com/in/nery-silva)

---

*Never Forget. Never Again.*
