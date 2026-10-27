import { useEffect, useRef, useState } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

// Only the top-most open modal reacts to Escape / traps focus.
const modalStack = [];

/**
 * Modal behaviour shared by the photo tour and the lightbox:
 * - Escape closes the top-most modal
 * - Tab / Shift+Tab are trapped inside `ref`
 * - focus moves into the modal on open and returns to the opener on close
 * - background scroll is locked while at least one modal is open
 */
export function useModal(ref, onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const opener = document.activeElement;
    const token = Symbol('modal');
    modalStack.push(token);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog (the dialog itself if nothing is focusable yet).
    const first = node.querySelector(FOCUSABLE);
    (first || node).focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (modalStack[modalStack.length - 1] !== token) return;
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const head = items[0];
      const tail = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === head || document.activeElement === node)) {
        event.preventDefault();
        tail.focus();
      } else if (!event.shiftKey && document.activeElement === tail) {
        event.preventDefault();
        head.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      const at = modalStack.indexOf(token);
      if (at !== -1) modalStack.splice(at, 1);
      if (modalStack.length === 0) document.body.style.overflow = previousOverflow;
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [ref]);
}

/** True once the page has scrolled past `offset` px. */
export function useScrolled(offset = 4) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
