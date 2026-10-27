import Icon from './Icon.jsx';
import { useScrolled } from '../hooks.js';

export default function Header() {
  const scrolled = useScrolled();
  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        {/* Stand-in wordmark: swap for the real brand asset if you have the licence. */}
        <a className="brand" href="/" aria-label="Home">
          <svg width="30" height="32" viewBox="0 0 30 32" aria-hidden="true" focusable="false">
            <path
              d="M15 2c-2 0-3.200 1.300-4.400 3.700L3.400 20.500C2.600 22.300 2 23.800 2 25.300 2 28 4 30 6.700 30c2.300 0 4.600-1.400 8.300-5.600 3.700 4.200 6 5.600 8.300 5.600 2.700 0 4.700-2 4.700-4.700 0-1.500-.6-3-1.400-4.800L19.400 5.700C18.200 3.300 17 2 15 2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.400"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="17" r="3.400" fill="none" stroke="currentColor" strokeWidth="2.400" />
          </svg>
          <span>airbnb</span>
        </a>

        <div className="search-pill" role="search">
          <button type="button" className="search-pill__home" aria-label="Homes">
            <Icon name="home" size={26} strokeWidth={1.5} />
          </button>
          <button type="button" className="search-pill__seg">Anywhere</button>
          <span className="search-pill__sep" aria-hidden="true" />
          <button type="button" className="search-pill__seg">Anytime</button>
          <span className="search-pill__sep" aria-hidden="true" />
          <button type="button" className="search-pill__seg search-pill__seg--muted">Add guests</button>
          <button type="button" className="search-pill__go" aria-label="Search">
            <Icon name="search" size={14} strokeWidth={3} />
          </button>
        </div>

        <div className="header-right">
          <button type="button" className="header-right__host">Become a host</button>
          <button type="button" className="header-right__globe" aria-label="Choose a language and currency">
            <Icon name="globe" size={18} strokeWidth={1.7} />
          </button>
          <button type="button" className="menu-pill" aria-label="Main menu" aria-haspopup="menu">
            <Icon name="menu" size={16} strokeWidth={2} />
            <span className="menu-pill__avatar">
              <Icon name="user" size={18} strokeWidth={0} filled />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
