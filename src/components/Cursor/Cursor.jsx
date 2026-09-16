/**
 * Cursor — desktop-only magnetic ring cursor.
 * Scales over interactive targets; disabled on touch and reduced motion.
 */
import { useEffect, useRef } from 'react';
import { isTouch } from '../../hooks/useMediaQuery.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || isTouch() || !window.matchMedia('(hover: hover)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const interactive = e.target.closest(
        'a, button, input, select, textarea, [data-cursor="hover"], label'
      );
      const next = Boolean(interactive);
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle('is-hovering', hovering);
      }
      if (e.target.closest('[data-cursor="view"]')) {
        ring.classList.add('is-view');
      } else {
        ring.classList.remove('is-view');
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    };
    const onEnter = () => {
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-ring__label">View</span>
      </div>
    </>
  );
}
