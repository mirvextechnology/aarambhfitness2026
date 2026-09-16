/**
 * BrandIntro — editorial introduction with large numerical storytelling.
 * Numbers come from data/siteConfig.js; `null` renders as a label only,
 * so nothing is ever invented.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import gymInterior from '../../../../assets/images/gym-interior.jpg';
import consultation from '../../../../assets/images/consultation.jpg';
import { brandStats, site } from '../../../../data/siteConfig.js';
import { useCountUp } from '../../../../hooks/useScrollAnimation.js';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './BrandIntro.css';

function StatItem({ stat }) {
  const ref = useCountUp({ end: stat.value || 0, suffix: stat.suffix || '', duration: 2 });
  return (
    <li className="brand-stat">
      {stat.value !== null && stat.value !== undefined ? (
        // Empty on purpose — useCountUp owns this node's text content.
        <span className="brand-stat__value" ref={ref} />
      ) : (
        <span className="brand-stat__value brand-stat__value--empty" aria-hidden="true">
          —
        </span>
      )}
      <span className="brand-stat__label">{stat.label}</span>
      {stat.note ? <span className="brand-stat__note">{stat.note}</span> : null}
    </li>
  );
}

export default function BrandIntro() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  /* line-mask reveal + image parallax */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-intro-word]',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.075,
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo(
        '[data-intro-img]',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        }
      );
      gsap.fromTo(
        '[data-intro-float]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.brand-intro__visual', start: 'top 75%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="brand-intro section bg-900" ref={rootRef} aria-labelledby="brand-intro-title">
      <div className="container">
        <div className="brand-intro__grid">
          {/* Copy column */}
          <div className="brand-intro__copy">
            <span className="section-index">01 — Who We Are</span>

            <h2 className="brand-intro__title" id="brand-intro-title">
              {['More than a gym.', 'A better beginning.'].map((line) => (
                <span className="line-mask" key={line}>
                  <span data-intro-word>{line}</span>
                </span>
              ))}
            </h2>

            <span className="brand-intro__rule" aria-hidden="true" />

            <div className="brand-intro__text">
              <p>
                {site.name} started with a simple problem: most people begin training with no plan,
                no direction and nobody correcting them. They train hard for a month, see no change,
                and stop.
              </p>
              <p>
                We built this place around the opposite of that. Every member begins with an
                assessment, gets a written plan, and trains with a coach who actually watches. Gym
                training, personal training, home fitness, nutrition structure and recovery support —
                all under one roof in Kaurihar.
              </p>
              <p>
                No shortcuts. No exaggerated promises. Just structured work, reviewed regularly, and
                adjusted as you improve.
              </p>
            </div>

            <ul className="brand-intro__stats" role="list">
              {brandStats.map((stat) => (
                <StatItem key={stat.id} stat={stat} />
              ))}
            </ul>

            <p className="brand-intro__note">
              Figures are updated as the business grows. Ask us for the latest numbers directly.
            </p>

            <div className="brand-intro__cta">
              <Link to="/about" className="btn btn--outline">
                Our Story
                <ArrowUpRight size={15} />
              </Link>
              <Link to="/services" className="text-link">
                See all eight services
              </Link>
            </div>
          </div>

          {/* Visual column — editorial collage */}
          <div className="brand-intro__visual">
            <figure className="brand-intro__frame brand-intro__frame--main">
              <div className="brand-intro__img-wrap">
                <img
                  src={gymInterior}
                  alt="Interior of the Aarambh Fitness training floor in Kaurihar"
                  data-intro-img
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1200}
                />
              </div>
              <figcaption className="brand-intro__tag">
                <span className="tech-label">Training Floor</span>
                <strong>Kaurihar, Prayagraj</strong>
              </figcaption>
            </figure>

            <figure className="brand-intro__frame brand-intro__frame--float" data-intro-float>
              <img
                src={consultation}
                alt="Trainer reviewing a training plan with a member"
                loading="lazy"
                decoding="async"
                width={640}
                height={480}
              />
            </figure>

            <div className="brand-intro__badge" data-intro-float>
              <span className="big-number" aria-hidden="true">
                08
              </span>
              <span className="brand-intro__badge-text">
                <strong>Services</strong>
                <em>One location</em>
              </span>
            </div>

            <span className="brand-intro__ring" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
