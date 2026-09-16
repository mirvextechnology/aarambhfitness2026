/**
 * useReducedMotion — live `prefers-reduced-motion` subscription.
 */
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
