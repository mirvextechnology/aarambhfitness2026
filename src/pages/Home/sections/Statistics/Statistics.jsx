/**
 * Statistics — oversized pillar numbers.
 * Uses visual storytelling instead of fabricated performance claims.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandPillars } from '../../../../data/siteConfig.js';
import strengthImage from '../../../../assets/images/male-athlete.jpg';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './Statistics.css';

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-stat-row]',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 74%', once: true },
        }
      );
      gsap.fromTo(
        '[data-stat-num]',
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 74%', once: true },
        }
      );
      gsap.fromTo(
        '[data-stat-img]',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="stats section bg-900" ref={rootRef} aria-labelledby="stats-title">
      <div className="stats__bg" aria-hidden="true">
        <img
          src={strengthImage}
          alt=""
          data-stat-img
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
        />
        <span className="stats__bg-scrim" />
      </div>

      <div className="container">
        <h2 className="sr-only" id="stats-title">
          What defines training at Aarambh
        </h2>

        <ol className="stats__list" role="list">
          {brandPillars.map((pillar, i) => (
            <li className="stats__row" key={pillar.id} data-stat-row>
              <span className="stats__num big-number" data-stat-num>
                {pillar.index}
              </span>
              <div className="stats__body">
                <h3 className="stats__title">{pillar.title}</h3>
                <p className="stats__copy">{pillar.copy}</p>
              </div>
              {i < brandPillars.length - 1 ? <span className="stats__sep" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
