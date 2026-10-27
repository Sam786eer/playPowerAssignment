// Small stroke-icon set (24x24 grid). Decorative by default: aria-hidden.
const PATHS = {
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  chevronDown: 'M5 9l7 7 7-7',
  share: 'M12 15V3m0 0L8 7m4-4l4 4M6 11v8a2 2 0 002 2h8a2 2 0 002-2v-8',
  heart:
    'M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.900 3.800 4.800 7 4.800c2 0 3.500 1.100 5 3 1.500-1.900 3-3 5-3 3.200 0 5.400 3.100 4.200 6.400C19.500 15.900 12 20.500 12 20.500z',
  close: 'M5 5l14 14M19 5L5 19',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zm9 16l-4-4',
  globe:
    'M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c-2.500 2.400-3.800 5.400-3.800 9s1.300 6.600 3.800 9m0-18c2.500 2.400 3.800 5.400 3.800 9s-1.300 6.600-3.800 9M3 12h18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9c0-3.900 3.100-6 7-6s7 2.100 7 6',
  star: 'M12 3l2.700 5.800 6.300.7-4.700 4.300 1.300 6.200L12 16.800 6.400 20l1.300-6.200L3 9.500l6.300-.7z',
  tv: 'M3 6h18v12H3zM8 21h8',
  snow: 'M12 3v18M4.200 7.500l15.600 9M4.200 16.500l15.600-9',
  door: 'M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17M4 21h16M14 12h.01',
  kitchen: 'M6 3v8a2 2 0 002 2v8M10 3v8M8 3v5M17 3c-2 2-2 6 0 8v10',
  wifi: 'M3 9a14 14 0 0118 0M6 12.500a10 10 0 0112 0M9 16a5.500 5.500 0 016 0M12 19.500h.01',
  workspace: 'M3 5h18v10H3zM8 19h8M12 15v4',
  parking: 'M5 3h14v18H5zM9 17V8h4a3 3 0 010 6H9',
  pool: 'M3 17c2 0 2-1.500 4.500-1.500S10 17 12 17s2.500-1.500 4.500-1.500S19 17 21 17M8 14V6a2 2 0 014 0M14 14V6a2 2 0 014 0M8 9h6',
  hottub: 'M3 12h18v3a5 5 0 01-5 5H8a5 5 0 01-5-5zM8 8c0-1.500 1.500-1.500 1.500-3M13 8c0-1.500 1.500-1.500 1.500-3',
  pets: 'M6 11a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4zM9.500 7a2 2 0 100-4 2 2 0 000 4zm5 0a2 2 0 100-4 2 2 0 000 4zM12 12c-3 0-5 3-5 5.500 0 2 2 2.500 5 2.500s5-.5 5-2.500C17 15 15 12 12 12z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.500 3.500 0 100-7 3.500 3.500 0 000 7z',
  alarm: 'M12 4a7 7 0 100 14 7 7 0 000-14zm0 4v4l2.500 1.500M4 4l3 2M20 4l-3 2',
  clean: 'M12 3l1.600 4.400L18 9l-4.400 1.600L12 15l-1.600-4.400L6 9l4.400-1.600zM19 15l.8 2.200L22 18l-2.200.8L19 21l-.8-2.200L16 18l2.200-.8z',
  check: 'M12 3a9 9 0 100 18 9 9 0 000-18zm-4 9l3 3 5-6',
  key: 'M14 10a4 4 0 11-3-3.900M11 10l10 0M17 10v3M20 10v2',
  chat: 'M4 5h16v11H9l-5 4z',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  tag: 'M3 12V4h8l10 10-8 8zM7.500 8h.01',
  cake: 'M4 20h16v-7H4zM4 16c2 1.500 4 1.500 6 0s4-1.500 6 0 3 1 4 0M8 10V7m4 3V6m4 4V7',
  school: 'M2 9l10-5 10 5-10 5zM6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 5v5l3 2',
  shield: 'M12 3l8 3v6c0 4.500-3.200 7.800-8 9-4.800-1.200-8-4.500-8-9V6z',
  info: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 8v5m0-8h.01',
  minus: 'M5 12h14',
  plus: 'M12 5v14M5 12h14',
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01',
};

export default function Icon({ name, size = 24, strokeWidth = 1.7, filled = false, className, title }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  );
}
