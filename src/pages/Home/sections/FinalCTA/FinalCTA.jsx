/**
 * FinalCTA — cinematic closing call to action.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import ctaImage from '../../../../assets/images/hero-athlete.jpg';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../../../assets/icons/index.jsx';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cta-word]',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power4.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 72%', once: true },
        }
      );
      gsap.fromTo(
        '[data-cta-fade]',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        }
      );
      gsap.fromTo(
        '[data-cta-img]',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="final-cta" ref={rootRef} aria-labelledby="final-cta-title">
      <div className="final-cta__bg">
        <img
          src={ctaImage}
          alt=""
          data-cta-img
          loading="lazy"
          decoding="async"
          width={1800}
          height={1000}
        />
        <span className="final-cta__scrim" aria-hidden="true" />
        <span className="final-cta__grain" aria-hidden="true" />
      </div>

      <div className="container final-cta__content">
        <span className="eyebrow" data-cta-fade>
          Kaurihar / Prayagraj
        </span>

        <h2 className="final-cta__title" id="final-cta-title">
          {['Your Aarambh', 'starts now.'].map((line, i) => (
            <span className="line-mask" key={line}>
              <span data-cta-word>{i === 1 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h2>

        <p className="final-cta__lede" data-cta-fade>
          Take the first step toward a stronger, healthier routine. Tell us your goal and we will
          give you an honest starting point — no pressure, no jargon.
        </p>

        <div className="final-cta__actions" data-cta-fade>
          <Link to="/consultation" className="btn btn--primary btn--lg">
            Start Your Journey <ArrowRight size={17} />
          </Link>
          <a
            href={buildWhatsAppUrl(
              'Hello Aarambh Fitness,\n\nI would like to start my fitness journey. Please guide me on the best way to begin.'
            )}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph size={17} /> WhatsApp Us
          </a>
        </div>

        <ul className="final-cta__meta" role="list" data-cta-fade>
          <li>Free consultation for new members</li>
          <li>Male &amp; female coaches available</li>
          <li>Gym and home training options</li>
        </ul>
      </div>
    </section>
  );
}
