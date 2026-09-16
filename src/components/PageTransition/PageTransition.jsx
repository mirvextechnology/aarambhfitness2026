/**
 * PageTransition — cinematic orange wipe between routes (300–600ms).
 * Panels cover, the route swaps underneath, panels clear. Never blocks
 * the browser's back button or delays navigation meaningfully.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './PageTransition.css';

const PANELS = 4;

export default function PageTransition() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('idle'); // idle | cover | reveal
  const first = useRef(true);
  const timer = useRef(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    if (reduced) return undefined;

    setPhase('cover');
    window.clearTimeout(timer.current);
    // Route content swaps while panels are up; then they clear.
    timer.current = window.setTimeout(() => setPhase('reveal'), 260);
    const end = window.setTimeout(() => setPhase('idle'), 760);

    return () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(end);
    };
  }, [pathname, reduced]);

  if (reduced) return null;

  return (
    <div className={`page-transition page-transition--${phase}`} aria-hidden="true">
      {Array.from({ length: PANELS }).map((_, i) => (
        <span key={i} style={{ transitionDelay: `${i * 45}ms` }} />
      ))}
    </div>
  );
}
