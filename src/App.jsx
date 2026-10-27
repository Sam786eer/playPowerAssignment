import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import PhotoTour from './components/PhotoTour.jsx';
import Lightbox from './components/Lightbox.jsx';
import {
  Amenities,
  CalendarSection,
  HostSection,
  MapSection,
  Nearby,
  Overview,
  Reviews,
  Sleeping,
  ThingsToKnow,
} from './components/Sections.jsx';
import { ALL_PHOTOS } from './data.js';

export default function App() {
  // `tourRoom` is null when the tour is closed, otherwise the room id to land on.
  const [tourRoom, setTourRoom] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeTour = useCallback(() => setTourRoom(null), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Keep the page behind an overlay out of the tab order and the accessibility tree.
  // Set through the DOM so it behaves the same on React 18 and 19.
  const pageRef = useRef(null);
  const overlayOpen = tourRoom !== null || lightboxIndex !== null;
  useEffect(() => {
    const node = pageRef.current;
    if (!node) return;
    if (overlayOpen) node.setAttribute('inert', '');
    else node.removeAttribute('inert');
  }, [overlayOpen]);

  return (
    <>
      <div className="page" ref={pageRef} aria-hidden={overlayOpen ? 'true' : undefined}>
        <Header />
        <main className="container">
          <Hero onOpenTour={setTourRoom} />
          <Overview />
          <Sleeping />
          <Amenities />
          <CalendarSection />
          <Reviews />
          <MapSection />
          <HostSection />
          <ThingsToKnow />
          <Nearby />
        </main>
      </div>

      {tourRoom !== null && (
        <PhotoTour
          initialRoomId={tourRoom}
          onClose={closeTour}
          onOpenPhoto={setLightboxIndex}
        />
      )}
      {lightboxIndex !== null && (
        <Lightbox
          photos={ALL_PHOTOS}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
