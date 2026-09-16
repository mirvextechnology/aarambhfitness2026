/** WhyAarambh — asymmetric visual storytelling grid, deliberately not 3×cards. */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck } from 'lucide-react';
import maleAthlete from '../../../../assets/images/male-athlete.jpg';
import femaleCoach from '../../../../assets/images/female-coach.jpg';
import { trustPoints } from '../../../../data/siteConfig.js';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './WhyAarambh.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhyAarambh() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-why-item]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.why__list', start: 'top 82%', once: true },
        }
      );
      gsap.fromTo(
        '[data-why-img]',
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="why section bg-900" ref={rootRef} aria-labelledby="why-title">
      <div className="container">
        <div className="why__head">
          <div>
            <span className="section-index">04 — Why Aarambh</span>
            <h2 className="why__title" id="why-title">
              Six things you will notice
              <br />
              from your first session.
            </h2>
          </div>
          <p className="why__lede">
            Not awards, not slogans. These are the operational differences members tell us they feel
            in the first few weeks.
          </p>
        </div>

        <div className="why__layout">
          <ol className="why__list" role="list">
            {trustPoints.map((point, i) => (
              <li className="why__item" key={point.title} data-why-item>
                <span className="why__item-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="why__item-body">
                  <strong>{point.title}</strong>
                  <em>{point.copy}</em>
                </span>
                <BadgeCheck size={17} className="why__item-check" aria-hidden="true" />
              </li>
            ))}
          </ol>

          <div className="why__collage">
            <figure className="why__frame why__frame--a">
              <img
                src={maleAthlete}
                alt="Male athlete training at Aarambh Fitness"
                data-why-img
                loading="lazy"
                decoding="async"
                width={700}
                height={900}
              />
            </figure>
            <figure className="why__frame why__frame--b">
              <img
                src={femaleCoach}
                alt="Female fitness coach at Aarambh Fitness"
                loading="lazy"
                decoding="async"
                width={700}
                height={520}
              />
            </figure>
            <span className="why__ring" aria-hidden="true" />
            <span className="why__coords tech-label" aria-hidden="true">
              Kaurihar / Prayagraj / UP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
