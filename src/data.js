// All content for the listing lives here so components stay presentational.

// Swap the placeholder photos for real ones by dropping files named
// `<room-slug>-<n>.jpg` into /public/photos and changing PHOTO_EXT to 'jpg'.
const PHOTO_EXT = 'png';
const photoUrl = (slug, n) => `${import.meta.env.BASE_URL}photos/${slug}-${n}.${PHOTO_EXT}`;

// `rows` describes the photo-tour layout: 'big' = one full-width photo,
// 'pair' = two half-width photos.
const ROOM_DEFS = [
  { id: 'living-room-1', title: 'Living room 1', details: 'Sofa · Air conditioning · Ceiling fan · TV', rows: ['big', 'pair'] },
  { id: 'living-room-2', title: 'Living room 2', details: 'Ceiling fan · Hot tub', rows: ['big', 'pair', 'big', 'pair', 'big'] },
  {
    id: 'full-kitchen',
    title: 'Full kitchen',
    details:
      'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
    rows: ['pair'],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    details:
      'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    rows: ['big', 'pair', 'big', 'pair'],
  },
  { id: 'full-bathroom', title: 'Full bathroom', details: 'Hairdryer · Hot water · Shampoo · Shower gel', rows: ['big'] },
  { id: 'gym', title: 'Gym', details: 'Air conditioning · Gym · Exercise equipment · Ceiling fan', rows: ['big', 'pair', 'pair'] },
  { id: 'exterior', title: 'Exterior', details: '', rows: ['big', 'pair', 'big', 'pair'] },
  { id: 'pool', title: 'Pool', details: 'Pool', rows: ['big', 'pair'] },
  { id: 'additional-photos', title: 'Additional photos', details: '', rows: ['big', 'pair', 'big', 'big', 'pair', 'big', 'pair'] },
];

let globalIndex = 0;
export const ROOMS = ROOM_DEFS.map((room) => {
  const count = room.rows.reduce((sum, row) => sum + (row === 'pair' ? 2 : 1), 0);
  const photos = Array.from({ length: count }, (_, i) => ({
    index: globalIndex++,
    src: photoUrl(room.id, i + 1),
    alt: `${room.title}, photo ${i + 1}`,
    roomId: room.id,
  }));
  // Group photos into display rows, e.g. [[p0], [p1, p2]]
  let cursor = 0;
  const rows = room.rows.map((type) => {
    const size = type === 'pair' ? 2 : 1;
    const row = { type, photos: photos.slice(cursor, cursor + size) };
    cursor += size;
    return row;
  });
  return { ...room, photos, rows };
});

export const ALL_PHOTOS = ROOMS.flatMap((room) => room.photos);

const photoOf = (roomId, n) => ROOMS.find((r) => r.id === roomId).photos[n];
// Order: large left photo, then top-middle, top-right, bottom-middle, bottom-right.
export const HERO_PHOTOS = [
  photoOf('living-room-2', 0),
  photoOf('living-room-1', 0),
  photoOf('additional-photos', 0),
  photoOf('bedroom', 0),
  photoOf('exterior', 0),
];

export const LISTING = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  facts: '3 guests · 1 bedroom · 1 bed · 1 bathroom',
  rating: '4.95',
  reviewCount: 19,
  host: { name: 'Mirashya Homes', hosting: '2 years hosting' },
};

export const HIGHLIGHTS = [
  { icon: 'tv', title: 'Outdoor entertainment', body: 'The pool and alfresco dining are great for summer trips.' },
  { icon: 'snow', title: 'Designed for staying cool', body: 'Beat the heat with the A/C and ceiling fan.' },
  { icon: 'door', title: 'Self check-in', body: 'You can check in with the building staff.' },
];

export const DESCRIPTION =
  '🏆 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! 🌴 Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife. 🍸 It’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. 🌅🍷';

export const SLEEPING = [
  { id: 'bedroom', title: 'Bedroom', body: '1 double bed', photo: photoOf('bedroom', 0) },
  { id: 'living-room-1', title: 'Living room', body: '1 sofa', photo: photoOf('living-room-1', 0) },
];

export const AMENITIES = [
  { icon: 'kitchen', label: 'Kitchen' },
  { icon: 'wifi', label: 'Wifi' },
  { icon: 'workspace', label: 'Dedicated workspace' },
  { icon: 'parking', label: 'Free parking on premises' },
  { icon: 'pool', label: 'Pool' },
  { icon: 'hottub', label: 'Hot tub' },
  { icon: 'pets', label: 'Pets allowed' },
  { icon: 'camera', label: 'Exterior security cameras on property' },
  { icon: 'alarm', label: 'Carbon monoxide alarm', unavailable: true },
  { icon: 'alarm', label: 'Smoke alarm', unavailable: true },
];

export const STAY = { nights: 5, place: 'Candolim', range: '18 Oct 2026 - 23 Oct 2026' };
// 0-indexed month, matching Date. Selected range 18 Oct → 23 Oct 2026.
export const CALENDAR = {
  months: [
    { year: 2026, month: 9 },
    { year: 2026, month: 10 },
  ],
  start: new Date(2026, 9, 18),
  end: new Date(2026, 9, 23),
  unavailableFrom: new Date(2026, 10, 15),
};

export const RATING_BREAKDOWN = [
  { star: 5, pct: 98 },
  { star: 4, pct: 2 },
  { star: 3, pct: 0 },
  { star: 2, pct: 0 },
  { star: 1, pct: 0 },
];

export const RATING_CATEGORIES = [
  { icon: 'clean', label: 'Cleanliness', value: '5.0' },
  { icon: 'check', label: 'Accuracy', value: '5.0' },
  { icon: 'key', label: 'Check-in', value: '5.0' },
  { icon: 'chat', label: 'Communication', value: '5.0' },
  { icon: 'map', label: 'Location', value: '4.8' },
  { icon: 'tag', label: 'Value', value: '4.8' },
];

export const REVIEW_TOPICS = [
  { label: 'Comfort', count: 5 },
  { label: 'Accuracy', count: 5 },
  { label: 'Hot tub', count: 5 },
  { label: 'Condition', count: 4 },
  { label: 'Hospitality', count: 8 },
  { label: 'Cleanliness', count: 6 },
];

export const REVIEWS = [
  {
    name: 'Amit',
    initial: 'A',
    tenure: '3 months on Airbnb',
    when: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
  },
  {
    name: 'Aheesh',
    tenure: '3 years on Airbnb',
    when: '2 weeks ago',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    more: true,
  },
  { name: 'Samiksha', tenure: '8 months on Airbnb', when: 'May 2026', text: 'the host nitish was really great help' },
  {
    name: 'Vedant',
    initial: 'V',
    tenure: '4 years on Airbnb',
    when: 'May 2026',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring.',
    more: true,
  },
  {
    name: 'Vaibhav S',
    tenure: '3 years on Airbnb',
    when: 'May 2026',
    text: 'Great great experience living out there , can’t expect more , will always look for it in the future and will recommend my friends too.',
  },
  { name: 'Mohd', tenure: '5 years on Airbnb', when: 'May 2026', text: 'Great place. Exactly as described in the listing.' },
];

export const NEIGHBOURHOOD =
  'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.';

export const HOST = {
  name: 'Mirashya Homes',
  stats: [
    { value: '1,463', label: 'Reviews' },
    { value: '4.68★', label: 'Rating' },
    { value: '2', label: 'Years hosting' },
  ],
  facts: [
    { icon: 'cake', text: 'Born in the 80s' },
    { icon: 'school', text: 'Where I went to school: NICMAR GOA' },
  ],
  coHosts: ['Sharath', 'Aman Dev Pahwa', 'Maria Karen Priyanka', 'Simran', 'Pallavi', 'Sanyukta', 'Shruti', 'Amlkha'],
  details: ['Response rate: 100%', 'Responds within an hour'],
};

export const THINGS_TO_KNOW = [
  {
    icon: 'calendar',
    title: 'Cancellation policy',
    lines: [
      'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
      'Review this host’s full policy for details.',
    ],
  },
  {
    icon: 'clock',
    title: 'House rules',
    lines: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'],
  },
  {
    icon: 'shield',
    title: 'Safety & property',
    lines: ['Carbon monoxide alarm not reported', 'Smoke alarm not reported', 'Exterior security cameras on property'],
  },
];

export const NEARBY = [
  { title: 'Beautiful Studio with a view to die for', price: '₹23,600', rating: '4.91', tone: 0 },
  { title: 'NAQAB - 1bhk with private pool', price: '₹12,218', rating: '4.95', tone: 1 },
  { title: 'Greentique Luxury Flat with plunge pool, Calangute', price: '₹44,506', rating: '4.94', tone: 2 },
];
