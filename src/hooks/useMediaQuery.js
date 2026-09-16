/**
 * useMediaQuery — reactive CSS media query.
 *   useMediaQuery('(max-width: 768px)')
 * Exported both as default and as a named export.
 */
import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on viewports at or below 768px. */
export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(max-width: 768px)').matches
    : false;

/** True when the device has no hover capability (touch-first). */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(hover: none)').matches || 'ontouchstart' in window);

export default useMediaQuery;
