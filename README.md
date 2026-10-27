# Listing page clone (desktop)

React 18 + Vite, plain CSS. Three views: listing page, photo tour, lightbox.

## Run
```bash
npm install
npm run photos   # writes placeholder photos to public/photos (skip if you add real ones)
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Use the real photos
Drop files named `<room-slug>-<n>.jpg` into `public/photos` (for example `living-room-1-1.jpg`, `gym-3.jpg`)
and change `PHOTO_EXT` to `'jpg'` at the top of `src/data.js`. Slugs and counts per room:

| Slug | Photos |
| --- | --- |
| living-room-1 | 3 |
| living-room-2 | 7 |
| full-kitchen | 2 |
| bedroom | 6 |
| full-bathroom | 1 |
| gym | 5 |
| exterior | 6 |
| pool | 3 |
| additional-photos | 10 |

If the real gallery has different counts or row layouts, edit `ROOM_DEFS` in `src/data.js`
(`rows` is `big` = one wide photo, `pair` = two half-width photos).

## Behaviour implemented
- Hero tiles and "Show all photos" open the photo tour (hero tiles land on their own room).
- Photo tour: category thumbnails scroll to their room; any photo opens the lightbox.
- Lightbox: ←/→ and arrow buttons, prev/next disabled at the ends, Esc closes, photo counter, slide/fade between photos.
- Overlays: focus moves in, Tab is trapped, Esc closes only the top-most overlay, focus returns to the opener,
  page behind is `inert`, background scroll locked. Motion respects `prefers-reduced-motion`.
- Hover states: hero tile dim, tour photo/thumb dim, button hover/press, search pill shadow.

## Assumptions (not visible in the supplied screenshots; adjust against the live reference)
- Hover dim strength and durations, lightbox slide distance, tour open animation.
- The "Get 10% off your next stay" promo second line, the "Claim" button behaviour.
- Calendar: dates from 15 Nov are shown as unavailable; arrows page months.
- Map is a drawn placeholder, not a real map.
- Logo is a stand-in mark, not the real brand asset. Font falls back to Inter (the reference font is proprietary).
- Co-host name "Amlkha" was hard to read in the screenshot.

## Layout
See `CLAUDE.md`. Architecture diagram: `docs/architecture.png` (source `scripts/gen-architecture.mjs`).
Prompt log: `docs/PROMPTS.md`. Agent and skill configs: `.claude/`.
