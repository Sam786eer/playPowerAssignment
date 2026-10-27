import Icon from './Icon.jsx';
import { HERO_PHOTOS, LISTING } from '../data.js';

export default function Hero({ onOpenTour }) {
  return (
    <section aria-labelledby="listing-title" className="hero-wrap">
      <div className="title-row">
        <h1 id="listing-title">{LISTING.title}</h1>
        <div className="title-row__actions">
          <button type="button" className="text-btn">
            <Icon name="share" size={16} strokeWidth={2} />
            <span>Share</span>
          </button>
          <button type="button" className="text-btn">
            <Icon name="heart" size={16} strokeWidth={2} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="hero">
        {HERO_PHOTOS.map((photo, i) => (
          <button
            key={photo.index}
            type="button"
            className={`hero__tile hero__tile--${i}`}
            onClick={() => onOpenTour(photo.roomId)}
            aria-label={i === 0 ? `Open photo tour, starting with ${photo.alt}` : `Open ${photo.alt} in the photo tour`}
          >
            <img src={photo.src} alt={photo.alt} draggable="false" />
          </button>
        ))}
        <button type="button" className="hero__all" onClick={() => onOpenTour(HERO_PHOTOS[0].roomId)}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {[0, 1, 2].flatMap((r) =>
              [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={2.500 + c * 5.500} cy={2.500 + r * 5.500} r="1.300" fill="currentColor" />),
            )}
          </svg>
          Show all photos
        </button>
      </div>
    </section>
  );
}
