/**
 * JourneyTimeline — "What happens after you join?"
 * Animated horizontal timeline on desktop, stacked on mobile.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './JourneyTimeline.css';

gsap.registerPlugin(ScrollTrigger);

export default function JourneyTimeline({ steps = [] }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced || !steps.length) return undefined;

    const ctx = gsap.context(() => {
      const line = el.querySelector('.journey__line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.querySelector('.journey__track'),
              start: 'top 78%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }
      gsap.fromTo(
        gsap.utils.toArray('.journey__step'),
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.11,
          scrollTrigger: { trigger: el.querySelector('.journey__track'), start: 'top 80%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, steps.length]);

  if (!steps.length) return null;

  return (
    <section className="journey section" ref={rootRef} aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading
          index="Process"
          eyebrow="What happens after you join"
          title="From first session to lasting progress"
          lede="No mystery, no guesswork. This is how every Aarambh member moves through the programme."
          className="section-heading--split"
          id="journey-title"
        />

        <ol className="journey__track" role="list">
          <span className="journey__line" aria-hidden="true">
            <span className="journey__line-fill" />
          </span>

          {steps.map((step) => (
            <li className="journey__step" key={step.step}>
              <span className="journey__node" aria-hidden="true">
                <span>{step.step}</span>
              </span>
              <div className="journey__card">
                <h3 className="journey__title">{step.title}</h3>
                <p className="journey__copy">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
