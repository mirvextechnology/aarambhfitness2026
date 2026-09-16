/**
 * useScrollAnimation — ScrollTrigger helpers.
 *
 * Only `useCountUp` is actually consumed by the app; the entrance animations
 * are handled by the declarative <Reveal /> component and by per-section GSAP
 * contexts. Previously this file also exported useReveal, useClipReveal,
 * useLineReveal, useParallax, useHorizontalRail and useScrollProgress — all
 * unused, one of which registered a redundant window scroll listener. They are
 * gone so nothing dead ships.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from './useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

function formatNumber(value, decimals) {
  return Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Animated number counter driven by ScrollTrigger.
 *
 * IMPORTANT: attach this ref to an element React renders **empty**. The hook
 * owns that element's text content; if React also renders text children there,
 * overwriting `textContent` orphans React's text nodes and its `removeChild`
 * throws when the component unmounts.
 *
 *   const ref = useCountUp({ end: 12, suffix: '+' });
 *   <span ref={ref} />
 */
export function useCountUp({ end = 0, duration = 1.8, suffix = '', decimals = 0 } = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const final = `${formatNumber(end, decimals)}${suffix}`;

    if (reduced) {
      el.textContent = final;
      return undefined;
    }

    el.textContent = formatNumber(0, decimals) + suffix;

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate() {
          el.textContent = `${formatNumber(counter.value, decimals)}${suffix}`;
        },
        onComplete() {
          el.textContent = final;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration, suffix, decimals, reduced]);

  return ref;
}

export default useCountUp;
