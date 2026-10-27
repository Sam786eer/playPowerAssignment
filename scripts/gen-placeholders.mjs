// Generates neutral placeholder photos so the app runs without the real assets.
// Usage: npm run photos
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'photos');
mkdirSync(out, { recursive: true });

// slug -> [photo count, hue]
const rooms = {
  'living-room-1': [3, 32],
  'living-room-2': [7, 210],
  'full-kitchen': [2, 24],
  bedroom: [6, 40],
  'full-bathroom': [1, 28],
  gym: [5, 200],
  exterior: [6, 150],
  pool: [3, 195],
  'additional-photos': [10, 215],
};

const title = (slug) => slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

for (const [slug, [count, hue]] of Object.entries(rooms)) {
  for (let n = 1; n <= count; n++) {
    const h = (hue + n * 7) % 360;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h} 38% 78%)"/>
      <stop offset="1" stop-color="hsl(${(h + 25) % 360} 34% 52%)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect x="150" y="470" width="900" height="130" rx="16" fill="rgba(255,255,255,.28)"/>
  <rect x="260" y="250" width="680" height="190" rx="12" fill="rgba(255,255,255,.18)"/>
  <text x="600" y="395" text-anchor="middle" font-family="sans-serif" font-size="54" fill="rgba(0,0,0,.45)">${title(slug)} · ${n}</text>
</svg>`;
    writeFileSync(join(out, `${slug}-${n}.svg`), svg);
  }
}
console.log('Placeholder photos written to', out);
