import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useModal } from '../hooks.js';

/**
 * Single-photo viewer. ←/→ navigate, Esc closes, focus is trapped.
 * `index` is controlled by the parent so the tour can resume where it was.
 */
export default function Lightbox({ photos, index, onIndexChange, onClose }) {
  const dialogRef = useRef(null);
  const [direction, setDirection] = useState(1);
  useModal(dialogRef, onClose);

  const last = photos.length - 1;
  const go = useCallback(
    (step) => {
      const next = index + step;
      if (next < 0 || next > last) return;
      setDirection(step);
      onIndexChange(next);
    },
    [index, last, onIndexChange],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [go]);

  // Warm the cache for neighbouring photos so arrow navigation feels instant.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      if (photos[i]) new Image().src = photos[i].src;
    });
  }, [index, photos]);

  const photo = photos[index];

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      tabIndex={-1}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close photo viewer">
        <Icon name="close" size={18} strokeWidth={2} />
      </button>
      <p className="lightbox__count" aria-live="polite">
        {index + 1} / {photos.length}
      </p>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--prev"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous photo"
      >
        <Icon name="chevronLeft" size={14} strokeWidth={2.4} />
      </button>

      <div className="lightbox__stage" onClick={onClose}>
        <img
          key={photo.index}
          className={`lightbox__img lightbox__img--${direction > 0 ? 'next' : 'prev'}`}
          src={photo.src}
          alt={photo.alt}
          draggable="false"
          onClick={(event) => event.stopPropagation()}
        />
      </div>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--next"
        onClick={() => go(1)}
        disabled={index === last}
        aria-label="Next photo"
      >
        <Icon name="chevronRight" size={14} strokeWidth={2.4} />
      </button>
    </div>
  );
}
