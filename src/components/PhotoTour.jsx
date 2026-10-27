import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { useModal } from '../hooks.js';
import { ROOMS } from '../data.js';

/** Full-screen gallery: category thumbnails, then every room with its photos. */
export default function PhotoTour({ initialRoomId, onClose, onOpenPhoto }) {
  const dialogRef = useRef(null);
  const scrollerRef = useRef(null);
  useModal(dialogRef, onClose);

  const scrollToRoom = (roomId, behavior) => {
    const target = scrollerRef.current?.querySelector(`[data-room="${roomId}"]`);
    target?.scrollIntoView({ behavior, block: 'start' });
  };

  // Opened from a specific hero image: land on that room straight away.
  useEffect(() => {
    if (initialRoomId) scrollToRoom(initialRoomId, 'auto');
  }, [initialRoomId]);

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={dialogRef} className="tour" role="dialog" aria-modal="true" aria-label="Photo tour" tabIndex={-1}>
      <header className="tour__header">
        <button type="button" className="icon-btn tour__back" onClick={onClose} aria-label="Close photo tour">
          <Icon name="chevronLeft" size={20} strokeWidth={2} />
        </button>
        <h2 className="tour__title">Photo tour</h2>
        <div className="tour__actions">
          <button type="button" className="icon-btn" aria-label="Share this place">
            <Icon name="share" size={20} strokeWidth={1.9} />
          </button>
          <button type="button" className="icon-btn" aria-label="Save this place to wishlist">
            <Icon name="heart" size={22} strokeWidth={1.9} />
          </button>
        </div>
      </header>

      <div className="tour__scroller" ref={scrollerRef}>
        <div className="tour__inner">
          <nav className="tour__thumbs" aria-label="Rooms">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                className="tour__thumb"
                onClick={() => scrollToRoom(room.id, reduceMotion ? 'auto' : 'smooth')}
              >
                <img src={room.photos[0].src} alt="" className="tour__thumb-img" />
                <span className="tour__thumb-label">{room.title}</span>
              </button>
            ))}
          </nav>

          {ROOMS.map((room) => (
            <section key={room.id} className="tour__room" data-room={room.id} aria-labelledby={`room-${room.id}`}>
              <div className="tour__room-text">
                <h3 id={`room-${room.id}`}>{room.title}</h3>
                {room.details ? <p>{room.details}</p> : null}
              </div>
              <div className="tour__room-photos">
                {room.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className={`tour__row tour__row--${row.type}`}>
                    {row.photos.map((photo) => (
                      <button
                        key={photo.index}
                        type="button"
                        className="tour__photo"
                        onClick={() => onOpenPhoto(photo.index)}
                        aria-label={`Open ${photo.alt}`}
                      >
                        <img src={photo.src} alt={photo.alt} loading="lazy" draggable="false" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
