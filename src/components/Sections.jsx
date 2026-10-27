import { useState } from 'react';
import Icon from './Icon.jsx';
import {
  AMENITIES,
  CALENDAR,
  DESCRIPTION,
  HIGHLIGHTS,
  HOST,
  LISTING,
  NEARBY,
  NEIGHBOURHOOD,
  RATING_BREAKDOWN,
  RATING_CATEGORIES,
  REVIEWS,
  REVIEW_TOPICS,
  SLEEPING,
  STAY,
  THINGS_TO_KNOW,
} from '../data.js';

function Section({ id, labelledBy, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section ${className}`}>
      {children}
    </section>
  );
}

const Chevron = () => <Icon name="chevronRight" size={12} strokeWidth={2.600} className="inline-chevron" />;

/* ---------------------------------------------------------------- overview */

export function Overview() {
  return (
    <>
      <div className="overview">
        <div className="overview__text">
          <h2 className="overview__title">{LISTING.subtitle}</h2>
          <p className="overview__facts">{LISTING.facts}</p>
        </div>
        <div className="promo" role="note">
          <span className="promo__icon" aria-hidden="true">
            <Icon name="heart" size={14} filled strokeWidth={0} />
          </span>
          <span className="promo__text">
            <strong>Get 10% off your next stay</strong>
            <span>Applies to your next booking</span>
          </span>
          <button type="button" className="promo__btn">Claim</button>
        </div>
      </div>

      <div className="favourite">
        <div className="favourite__badge">
          <Laurel />
          <span>Guest<br />favourite</span>
          <Laurel flip />
        </div>
        <p className="favourite__copy">One of the most loved homes on Airbnb, according to guests</p>
        <div className="favourite__stat">
          <strong>{LISTING.rating}</strong>
          <span className="stars" aria-label="Rated 4.95 out of 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={9} filled strokeWidth={0} />
            ))}
          </span>
        </div>
        <a className="favourite__stat favourite__stat--link" href="#reviews">
          <strong>{LISTING.reviewCount}</strong>
          <span>Reviews</span>
        </a>
      </div>

      <div className="host-line">
        <span className="avatar avatar--brand" aria-hidden="true">M</span>
        <div>
          <p className="host-line__name">Hosted by {LISTING.host.name}</p>
          <p className="host-line__meta">{LISTING.host.hosting}</p>
        </div>
      </div>

      <ul className="highlights">
        {HIGHLIGHTS.map((item) => (
          <li key={item.title}>
            <Icon name={item.icon} size={24} strokeWidth={1.5} />
            <div>
              <p className="highlights__title">{item.title}</p>
              <p className="highlights__body">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <Description />
    </>
  );
}

function Laurel({ flip = false }) {
  return (
    <svg className={`laurel${flip ? ' laurel--flip' : ''}`} width="26" height="44" viewBox="0 0 26 44" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={i}
            cx={20 - Math.sin((i / 6) * Math.PI) * 9 + 2}
            cy={40 - i * 6}
            rx="2.400"
            ry="4.800"
            transform={`rotate(${-35 + i * 12} ${20 - Math.sin((i / 6) * Math.PI) * 9 + 2} ${40 - i * 6})`}
          />
        ))}
      </g>
    </svg>
  );
}

function Description() {
  return (
    <div className="description">
      <p className="description__note">
        <Icon name="globe" size={16} strokeWidth={1.8} />
        Some info has been automatically translated. <button type="button" className="link-btn">Show original</button>
      </p>
      <p className="description__text">{DESCRIPTION}</p>
      <button type="button" className="link-btn link-btn--strong">
        Show more <Chevron />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------- sleep */

export function Sleeping() {
  return (
    <Section id="sleeping" labelledBy="sleeping-h">
      <h2 id="sleeping-h" className="section__title">Where you’ll sleep</h2>
      <ul className="sleep">
        {SLEEPING.map((room) => (
          <li key={room.id} className="sleep__card">
            <div className="sleep__img">
              <img src={room.photo.src} alt={room.photo.alt} loading="lazy" />
            </div>
            <p className="sleep__title">{room.title}</p>
            <p className="sleep__body">{room.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* --------------------------------------------------------------- amenities */

export function Amenities() {
  return (
    <Section id="amenities" labelledBy="amenities-h">
      <h2 id="amenities-h" className="section__title">What this place offers</h2>
      <ul className="amenities">
        {AMENITIES.map((item) => (
          <li key={item.label} className={item.unavailable ? 'is-unavailable' : undefined}>
            <Icon name={item.icon} size={24} strokeWidth={1.5} />
            <span>{item.label}</span>
            {item.unavailable ? <span className="sr-only"> (not available)</span> : null}
          </li>
        ))}
      </ul>
      <button type="button" className="outline-btn">Show all 50 amenities</button>
    </Section>
  );
}

/* ---------------------------------------------------------------- calendar */

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function Month({ year, month }) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const label = first.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="month" role="grid" aria-label={label}>
      <h3 className="month__title">{label.replace(' ', ' ')}</h3>
      <div className="month__week" role="row">
        {WEEKDAYS.map((d, i) => (
          <span key={i} role="columnheader" className="month__dow">{d}</span>
        ))}
      </div>
      <div className="month__days">
        {cells.map((day, i) => {
          if (!day) return <span key={`b${i}`} role="gridcell" />;
          const date = new Date(year, month, day);
          const isStart = sameDay(date, CALENDAR.start);
          const isEnd = sameDay(date, CALENDAR.end);
          const inRange = date > CALENDAR.start && date < CALENDAR.end;
          const disabled = date >= CALENDAR.unavailableFrom;
          const cls = ['day', isStart || isEnd ? 'is-edge' : '', inRange ? 'is-range' : '', disabled ? 'is-disabled' : '']
            .filter(Boolean)
            .join(' ');
          return (
            <span key={day} role="gridcell" className={cls} aria-selected={isStart || isEnd || inRange || undefined} aria-disabled={disabled || undefined}>
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarSection() {
  const [offset, setOffset] = useState(0);
  const months = CALENDAR.months.map(({ year, month }) => {
    const d = new Date(year, month + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  return (
    <Section id="calendar" labelledBy="calendar-h">
      <h2 id="calendar-h" className="section__title section__title--tight">
        {STAY.nights} nights in {STAY.place}
      </h2>
      <p className="calendar__range">{STAY.range}</p>
      <div className="calendar">
        <button type="button" className="calendar__nav calendar__nav--prev" onClick={() => setOffset((o) => o - 1)} aria-label="Move backward to switch to the previous month">
          <Icon name="chevronLeft" size={14} strokeWidth={2.400} />
        </button>
        <button type="button" className="calendar__nav calendar__nav--next" onClick={() => setOffset((o) => o + 1)} aria-label="Move forward to switch to the next month">
          <Icon name="chevronRight" size={14} strokeWidth={2.400} />
        </button>
        {months.map((m) => (
          <Month key={`${m.year}-${m.month}`} {...m} />
        ))}
      </div>
      <div className="calendar__footer">
        <button type="button" className="icon-btn icon-btn--sm" aria-label="Keyboard shortcuts">
          <Icon name="image" size={18} strokeWidth={1.5} />
        </button>
        <button type="button" className="link-btn link-btn--strong">Clear dates</button>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- reviews */

const AVATAR_COLORS = ['#c9a7a1', '#8fa3ad', '#b6a07a', '#8ea58c', '#a493b3', '#7f8fa8'];

function Review({ review, index }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="review">
      <div className="review__who">
        <span className="avatar" style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }} aria-hidden="true">
          {review.initial || review.name[0]}
        </span>
        <div>
          <p className="review__name">{review.name}</p>
          <p className="review__tenure">{review.tenure}</p>
        </div>
      </div>
      <p className="review__meta">
        <span className="stars stars--sm" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="star" size={8} filled strokeWidth={0} />
          ))}
        </span>
        <span aria-hidden="true">·</span> {review.when}
      </p>
      <p className={`review__text${review.more && !open ? ' is-clamped' : ''}`}>{review.text}</p>
      {review.more ? (
        <button type="button" className="link-btn link-btn--strong" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? 'Show less' : 'Show more'} <Chevron />
        </button>
      ) : null}
    </li>
  );
}

export function Reviews() {
  return (
    <Section id="reviews" labelledBy="reviews-h" className="reviews">
      <div className="reviews__hero">
        <div className="reviews__score">
          <Laurel />
          <h2 id="reviews-h">{LISTING.rating}</h2>
          <Laurel flip />
        </div>
        <p className="reviews__label">Guest favourite</p>
        <p className="reviews__copy">This home is a guest favourite based on ratings, reviews and reliability</p>
        <a className="reviews__how" href="#reviews">How reviews work</a>
      </div>

      <div className="breakdown">
        <div className="breakdown__cell breakdown__cell--overall">
          <p className="breakdown__label">Overall rating</p>
          <ol className="bars" reversed>
            {RATING_BREAKDOWN.map((row) => (
              <li key={row.star}>
                <span>{row.star}</span>
                <span className="bars__track" role="img" aria-label={`${row.pct}% rated ${row.star} stars`}>
                  <span className="bars__fill" style={{ width: `${row.pct}%` }} />
                </span>
              </li>
            ))}
          </ol>
        </div>
        {RATING_CATEGORIES.map((cat) => (
          <div key={cat.label} className="breakdown__cell">
            <p className="breakdown__label">{cat.label}</p>
            <p className="breakdown__value">{cat.value}</p>
            <Icon name={cat.icon} size={26} strokeWidth={1.4} />
          </div>
        ))}
      </div>

      <ul className="chips" aria-label="Review topics">
        {REVIEW_TOPICS.map((topic) => (
          <li key={topic.label}>
            <button type="button" className="chip">
              {topic.label} <span>{topic.count}</span>
            </button>
          </li>
        ))}
      </ul>

      <ul className="review-list">
        {REVIEWS.map((review, i) => (
          <Review key={review.name} review={review} index={i} />
        ))}
      </ul>

      <button type="button" className="outline-btn">Show all {LISTING.reviewCount} reviews</button>
    </Section>
  );
}

/* --------------------------------------------------------------------- map */

export function MapSection() {
  return (
    <Section id="location" labelledBy="location-h">
      <h2 id="location-h" className="section__title section__title--tight">Where you’ll be</h2>
      <p className="map__place">Candolim, Goa, India</p>
      <div className="map" role="img" aria-label="Map showing the approximate area of the listing in Candolim, Goa">
        <svg className="map__art" viewBox="0 0 1120 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <rect width="1120" height="480" fill="#eae6df" />
          <path d="M0 0h470L120 480H0z" fill="#aad3df" />
          <circle cx="360" cy="210" r="34" fill="#c8e0be" />
          <circle cx="640" cy="330" r="52" fill="#c8e5c0" />
          <path d="M470 0L120 480" stroke="#fff" strokeWidth="3" fill="none" opacity=".6" />
        </svg>
        <button type="button" className="map__search" aria-label="Search the map">
          <Icon name="search" size={16} strokeWidth={2} />
        </button>
        <div className="map__zoom">
          <button type="button" aria-label="Zoom in"><Icon name="plus" size={16} strokeWidth={2} /></button>
          <button type="button" aria-label="Zoom out"><Icon name="minus" size={16} strokeWidth={2} /></button>
        </div>
        <span className="map__pin" aria-hidden="true">
          <Icon name="home" size={26} strokeWidth={0} filled />
        </span>
      </div>
      <p className="map__note">Exact location will be provided after booking.</p>
      <h3 className="map__sub">Neighbourhood highlights</h3>
      <p className="map__copy">{NEIGHBOURHOOD}</p>
      <button type="button" className="link-btn link-btn--strong">
        Show more <Chevron />
      </button>
    </Section>
  );
}

/* -------------------------------------------------------------------- host */

export function HostSection() {
  return (
    <Section id="host" labelledBy="host-h">
      <h2 id="host-h" className="section__title">Meet your host</h2>
      <div className="host-card">
        <div className="host-card__who">
          <span className="avatar avatar--xl avatar--brand" aria-hidden="true">M</span>
          <p className="host-card__name">{HOST.name}</p>
          <p className="host-card__role">Host</p>
        </div>
        <dl className="host-card__stats">
          {HOST.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd><strong>{s.value}</strong><span>{s.label}</span></dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="host-facts">
        {HOST.facts.map((f) => (
          <p key={f.text}>
            <Icon name={f.icon} size={24} strokeWidth={1.5} />
            {f.text}
          </p>
        ))}
      </div>

      <h3 className="host-sub">Co-Hosts</h3>
      <ul className="cohosts">
        {HOST.coHosts.map((name, i) => (
          <li key={name}>
            <span className="avatar avatar--sm" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }} aria-hidden="true">
              {name[0]}
            </span>
            {name}
          </li>
        ))}
      </ul>

      <h3 className="host-sub">Host details</h3>
      <p className="host-detail">{HOST.details[0]}</p>
      <p className="host-detail">{HOST.details[1]}</p>
      <button type="button" className="fill-btn">Message host</button>
      <p className="host-note">
        <Icon name="shield" size={18} strokeWidth={1.5} />
        To help protect your payment, always use Airbnb to send money and communicate with hosts.
      </p>
    </Section>
  );
}

/* ----------------------------------------------------------- things to know */

export function ThingsToKnow() {
  return (
    <Section id="know" labelledBy="know-h">
      <h2 id="know-h" className="section__title">Things to know</h2>
      <div className="know">
        {THINGS_TO_KNOW.map((block) => (
          <div key={block.title} className="know__col">
            <Icon name={block.icon} size={24} strokeWidth={1.5} />
            <h3>{block.title}</h3>
            {block.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <button type="button" className="link-btn link-btn--strong">
              {block.title === 'Cancellation policy' ? 'Learn more' : 'Show more'} <Chevron />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ nearby */

export function Nearby() {
  const pages = 3;
  const [page, setPage] = useState(0);
  const shown = NEARBY.map((_, i) => NEARBY[(i + page) % NEARBY.length]);
  return (
    <Section id="nearby" labelledBy="nearby-h">
      <div className="nearby__head">
        <h2 id="nearby-h" className="section__title section__title--flush">More stays nearby</h2>
        <div className="nearby__pager">
          <span aria-live="polite">{page + 1} / {pages}</span>
          <button type="button" className="circle-btn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous stays">
            <Icon name="chevronLeft" size={12} strokeWidth={2.600} />
          </button>
          <button type="button" className="circle-btn" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page === pages - 1} aria-label="Next stays">
            <Icon name="chevronRight" size={12} strokeWidth={2.600} />
          </button>
        </div>
      </div>
      <ul className="nearby">
        {shown.map((stay) => (
          <li key={stay.title} className="stay">
            <a href="#nearby" className="stay__link">
              <span className={`stay__img stay__img--${stay.tone}`} aria-hidden="true" />
              <span className="stay__title">{stay.title}</span>
              <span className="stay__meta">
                {stay.price}
                <span className="stay__rating">
                  <Icon name="star" size={11} filled strokeWidth={0} /> {stay.rating}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
