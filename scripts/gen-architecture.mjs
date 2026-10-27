// Generates docs/architecture.svg and docs/architecture.png (PNG needs `sharp` or ImageMagick).
import { writeFileSync } from 'node:fs';

const W = 1700, H = 1080;
const el = [];
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const box = (x, y, w, h, title, lines = [], fill = '#ffffff', stroke = '#c9ced6') => {
  el.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`);
  el.push(`<text x="${x + w / 2}" y="${y + 24}" text-anchor="middle" font-size="15" font-weight="700" fill="#1b1f27">${esc(title)}</text>`);
  lines.forEach((l, i) => el.push(`<text x="${x + w / 2}" y="${y + 44 + i * 16}" text-anchor="middle" font-size="12" fill="#4a5260">${esc(l)}</text>`));
};
const band = (y, h, label, fill) => {
  el.push(`<rect x="20" y="${y}" width="${W - 40}" height="${h}" rx="14" fill="${fill}"/>`);
  el.push(`<text x="40" y="${y + 26}" font-size="13" font-weight="800" letter-spacing="1.5" fill="#6b7380">${esc(label)}</text>`);
};
const arrow = (x1, y1, x2, y2, label) => {
  el.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7a8494" stroke-width="2" marker-end="url(#a)"/>`);
  if (label) el.push(`<text x="${(x1 + x2) / 2 + 8}" y="${(y1 + y2) / 2 - 4}" font-size="11" fill="#6b7380">${esc(label)}</text>`);
};

el.push(`<text x="${W / 2}" y="40" text-anchor="middle" font-size="24" font-weight="800" fill="#1b1f27">Production architecture: vacation-rental marketplace</text>`);
el.push(`<text x="${W / 2}" y="62" text-anchor="middle" font-size="13" fill="#6b7380">Read-heavy (browse/search ≈ 100:1 vs booking), globally distributed, multi-region active-active for reads</text>`);

// 1 Clients + edge
band(80, 140, 'CLIENTS & EDGE', '#eef4ff');
box(60, 112, 200, 90, 'Web & mobile clients', ['Browser, iOS, Android', 'Service worker, lazy images']);
box(330, 112, 260, 90, 'Global CDN + WAF', ['Static assets, HTML cache', 'Bot / DDoS protection, geo-routing']);
box(660, 112, 260, 90, 'Image CDN', ['Responsive WebP/AVIF, lazy-load', 'Cache-Control immutable, 1y']);
box(990, 112, 300, 90, 'Next.js frontend (SSR / ISR)', ['Listing pages ISR, search SSR', 'Deployed on edge runtime per region']);
box(1360, 112, 280, 90, 'Feature flags & A/B', ['Config served from edge KV']);
arrow(260, 157, 330, 157); arrow(590, 157, 660, 157); arrow(920, 157, 990, 157);

// 2 API
band(240, 120, 'API LAYER', '#f3f0ff');
box(60, 270, 260, 74, 'API gateway / GraphQL BFF', ['Auth, rate limit, request shaping']);
box(400, 270, 260, 74, 'L7 load balancer', ['Health checks, zone-aware routing']);
box(740, 270, 260, 74, 'Auth & identity', ['OAuth2/OIDC, sessions in Redis']);
box(1080, 270, 260, 74, 'Edge API cache', ['Listing JSON, 60s stale-while-revalidate']);
arrow(1345, 202, 1345, 270, 'API calls');
arrow(320, 307, 400, 307);

// 3 Services
band(380, 190, 'SERVICES (Kubernetes, stateless, horizontal autoscaling per service)', '#eefaf2');
const svc = [
  ['Listing', 'Content, photos, pricing'],
  ['Search', 'Geo + filters + ranking'],
  ['Availability', 'Calendar, holds, pricing rules'],
  ['Booking', 'Idempotent, saga + outbox'],
  ['Payments', 'PSP integration, payouts'],
  ['Reviews', 'Ratings aggregates'],
  ['Messaging', 'Guest ⇄ host, websockets'],
  ['Notifications', 'Email / push / SMS'],
];
svc.forEach(([t, d], i) => box(50 + i * 204, 415, 190, 80, t + ' service', [d]));
box(50, 508, 800, 54, 'Service mesh', ['mTLS, retries, circuit breakers, canary releases']);
arrow(1267, 344, 1267, 415, 'REST / gRPC');

// 4 Data
band(590, 250, 'DATA & ASYNC (per-region, replicated)', '#fff6ea');
box(50, 625, 260, 100, 'PostgreSQL (primary + replicas)', ['Shard by listing / region id', 'Bookings: strong consistency']);
box(350, 625, 220, 100, 'Redis cluster', ['Hot listings, sessions,', 'availability holds (TTL)']);
box(610, 625, 260, 100, 'OpenSearch / Elasticsearch', ['Geo-indexed listings, facets', 'Fed by CDC from Postgres']);
box(910, 625, 240, 100, 'Object storage (S3)', ['Original photos, tiered lifecycle', 'Resize pipeline → image CDN']);
box(1190, 625, 220, 100, 'Kafka event bus', ['listing.updated, booking.created', 'Outbox / CDC, replay']);
box(1450, 625, 200, 100, 'Data warehouse', ['Analytics, ranking features']);
box(50, 745, 520, 70, 'Read-after-write rules', ['Booking & payments read primary; browse uses replicas / cache']);
box(610, 745, 540, 70, 'Cache strategy', ['CDN → edge API cache → Redis → DB; invalidate on listing.updated events']);
box(1190, 745, 460, 70, 'Async workers', ['Photo processing, search indexing, emails, payouts']);
arrow(1170, 495, 1170, 625, 'reads / writes / events');

// 5 Platform
band(860, 190, 'DEPLOYMENT, SCALING & OPERATIONS', '#f4f5f7');
box(50, 895, 300, 120, 'Multi-region deployment', ['2+ regions active-active (reads)', 'Single-writer per booking shard', 'DNS / anycast failover']);
box(380, 895, 300, 120, 'CI/CD', ['Trunk-based, preview envs', 'Blue/green + canary, auto-rollback', 'IaC (Terraform), GitOps']);
box(710, 895, 300, 120, 'Autoscaling', ['HPA on CPU / RPS / queue depth', 'Scheduled scale for peak travel', 'Load-shedding at gateway']);
box(1040, 895, 300, 120, 'Observability', ['Tracing, metrics, logs, SLOs', 'RUM Core Web Vitals', 'On-call alerts on error budgets']);
box(1370, 895, 280, 120, 'Security & compliance', ['Secrets manager, KMS', 'PCI scope isolated to Payments', 'PII encryption, audit logs']);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Inter, Helvetica, Arial, sans-serif">
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#7a8494"/></marker></defs>
<rect width="${W}" height="${H}" fill="#ffffff"/>
${el.join('\n')}
</svg>`;
writeFileSync(new URL('../docs/architecture.svg', import.meta.url), svg);
console.log('wrote docs/architecture.svg');
