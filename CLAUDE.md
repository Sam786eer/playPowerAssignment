# Project guide

Desktop-only React + Vite clone of a vacation-rental listing page with two overlays
(photo tour, lightbox). Plain CSS, no UI framework.

## Structure
- `src/data.js` – all copy, rooms, photo manifest. Components stay presentational.
- `src/components/` – `Header`, `Hero`, `Sections` (page sections), `PhotoTour`, `Lightbox`, `Icon`.
- `src/hooks.js` – `useModal` (Esc, focus trap, focus restore, scroll lock), `useScrolled`.
- `src/styles/` – `tokens.css` (design tokens), `base.css`, `listing.css`, `overlays.css`.
- `scripts/gen-placeholders.mjs` – writes placeholder photos to `public/photos`.

## Rules
- Reference is the source of truth; never copy its source, only match what it looks and behaves like.
- Every colour, radius, duration comes from `tokens.css`. No magic numbers repeated in components.
- Overlays must use `useModal`. Every interactive element is a real `<button>`/`<a>` with an accessible name.
- Respect `prefers-reduced-motion`.
- Keep components small and presentational; content belongs in `data.js`.

## Agents and skills (see `.claude/`)
- `ui-fidelity-reviewer` – compares the build to reference screenshots.
- `a11y-auditor` – keyboard, focus and ARIA review.
- `code-quality-reviewer` – structure and consistency review.
- `/pixel-match` skill – the loop for closing visual gaps one section at a time.
