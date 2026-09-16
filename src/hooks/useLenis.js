/**
 * useLenis — global smooth scroll with GSAP ScrollTrigger sync.
 * Mounted once in App.jsx. Respects prefers-reduced-motion and
 * cleans up both the RAF loop and the ScrollTrigger listener.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from './useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({
      // NOTE: `lerp` and `duration` are mutually exclusive in Lenis — when
      // `lerp` is set, `duration`/`easing` are ignored entirely. Keeping both
      // here previously meant a dead `duration` and a very floaty 0.1 lerp,
      // which read as lag. 0.14 stays smooth but tracks the wheel closely.
      lerp: 0.14,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true, // smooth momentum scrolling on touch devices
      gestureOrientation: 'vertical',
      autoRaf: false,
    });

    // Keep ScrollTrigger positions in sync with Lenis.
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose Lenis so anchor links and buttons can scroll smoothly.
    window.lenis = lenis;

    /** Smooth scroll helper used across the app. */
    window.scrollToSmooth = (target, options = {}) => {
      const offset = options.offset ?? -80;
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (!el) return;
        lenis.scrollTo(el, { offset, duration: options.duration ?? 1.2 });
      } else if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { offset, duration: options.duration ?? 1.2 });
      } else {
        lenis.scrollTo(target, { duration: options.duration ?? 1.2 });
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
      delete window.scrollToSmooth;
    };
  }, [reduced]);

  return reduced;
}
