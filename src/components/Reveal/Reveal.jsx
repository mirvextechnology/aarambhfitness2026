/**
 * Reveal — declarative GSAP + ScrollTrigger entrance wrapper.
 * Renders `as`, applies [data-reveal], and cleans up its context.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './Reveal.css';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = {
  up: { from: { opacity: 0, y: 34 } },
  down: { from: { opacity: 0, y: -34 } },
  left: { from: { opacity: 0, x: -44 } },
  right: { from: { opacity: 0, x: 44 } },
  fade: { from: { opacity: 0 } },
  scale: { from: { opacity: 0, scale: 0.94 } },
  clip: { from: { clipPath: 'inset(0 0 100% 0)' } },
  mask: { from: { clipPath: 'inset(0 100% 0 0)' } },
};

export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.9,
  stagger,
  start = 'top 85%',
  once = true,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const ctx = gsap.context(() => {
      const from = VARIANTS[variant]?.from || VARIANTS.up.from;
      // Stagger children when a value is supplied.
      const targets = stagger ? gsap.utils.toArray('[data-reveal-child]', el) : el;
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...Object.fromEntries(Object.keys(from).map((k) => [k, k === 'opacity' ? 1 : k === 'clipPath' ? 'inset(0 0 0% 0)' : 0])),
          opacity: 1,
          clipPath: from.clipPath ? 'inset(0 0 0% 0)' : undefined,
          scale: from.scale ? 1 : undefined,
          duration,
          delay,
          ease: 'power3.out',
          stagger: stagger ? { each: stagger, from: 'start' } : undefined,
          scrollTrigger: { trigger: el, start, once },
          clearProps: 'transform',
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, start, once, reduced]);

  return (
    <Tag ref={ref} className={`reveal reveal--${variant} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
