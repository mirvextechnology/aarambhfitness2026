/**
 * Hero — the first screen. Cinematic athlete frame, masked headline,
 * orange line draw, floating technical labels and desktop mouse parallax.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Compass } from 'lucide-react';
import heroImage from '../../../../assets/images/hero-athlete.jpg';
import { contact, googleRating } from '../../../../data/siteConfig.js';
import { getOpeningStatus, formatTime } from '../../../../utils/openingHours.js';
import { useMediaQuery } from '../../../../hooks/useMediaQuery.js';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './Hero.css';

export default function Hero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1025px) and (hover: hover)');
  const status = getOpeningStatus();

  /* ---- entrance timeline ---- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    if (reduced) {
      gsap.set(el.querySelectorAll('[data-hero-anim]'), { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('[data-hero-image]', { scale: 1.28, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 1.9 }, 0)
        .fromTo(
          '[data-hero-line]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
          0.35
        )
        .fromTo(
          '[data-hero-word]',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09 },
          0.45
        )
        .fromTo('[data-hero-lede]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85 }, 0.95)
        .fromTo('[data-hero-cta]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.05)
        .fromTo('[data-hero-label]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.2)
        .fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.6);

      // Slow breathing zoom on the frame.
      gsap.to('[data-hero-image]', {
        scale: 1.14,
        duration: 14,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  /* ---- desktop mouse parallax ---- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !isDesktop || reduced) return undefined;

    const layer = imageRef.current;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    };

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (layer) layer.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      gsap.utils.toArray('[data-hero-float]').forEach((node, i) => {
        const depth = (i + 1) * 7;
        node.style.transform = `translate3d(${-cx * depth * 0.06}px, ${-cy * depth * 0.06}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isDesktop, reduced]);

  const headline = ['Start strong.', 'Finish stronger.'];

  return (
    <section className="hero" ref={rootRef}>
      {/* Visual layer */}
      <div className="hero__media" data-hero-float>
        <div className="hero__frame" ref={imageRef}>
          <img
            src={heroImage}
            alt="Athlete training with a barbell inside Aarambh Fitness, Kaurihar"
            data-hero-image
            fetchpriority="high"
            decoding="async"
            width={1600}
            height={1067}
          />
        </div>
        <span className="hero__scrim" aria-hidden="true" />
        <span className="hero__grain" aria-hidden="true" />
        <span className="hero__grid" aria-hidden="true" />
      </div>

      <div className="container hero__container">
        {/* Technical labels — left rail */}
        <div className="hero__rail" aria-hidden="true">
          <span className="hero__rail-line" />
          <span className="hero__rail-text">Kaurihar / Prayagraj</span>
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow" data-hero-label>
            <span className="hero__coords">25.44° N, 81.85° E</span>
            <span className="hero__divider" />
            <span>{contact.tagline}</span>
          </p>

          <h1 className="hero__title">
            {headline.map((line, i) => (
              <span className="line-mask" key={line}>
                <span data-hero-word style={{ transitionDelay: `${i * 60}ms` }}>
                  {i === 1 ? <em>{line}</em> : line}
                </span>
              </span>
            ))}
          </h1>

          <span className="hero__line" data-hero-line aria-hidden="true" />

          <p className="hero__lede" data-hero-lede>
            Premium fitness, personal training and wellness support designed for your goals in{' '}
            {contact.address.city}.
          </p>

          <div className="hero__cta" data-hero-cta>
            <Link to="/consultation" className="btn btn--primary btn--lg">
              Start Your Aarambh
              <ArrowRight size={17} />
            </Link>
            <Link to="/services" className="btn btn--ghost btn--lg">
              Explore Services
              <Compass size={17} />
            </Link>
          </div>

          <ul className="hero__facts" role="list">
            <li data-hero-label>
              <span className="tech-label">Coach options</span>
              <strong>Male &amp; Female</strong>
            </li>
            <li data-hero-label>
              <span className="tech-label">Training modes</span>
              <strong>Gym &amp; Home</strong>
            </li>
            <li data-hero-label>
              <span className="tech-label">Google rating</span>
              <strong>
                <a className="hero__rating" href={googleRating.url} target="_blank" rel="noopener noreferrer">
                  {googleRating.rating.toFixed(1)} ★ ({googleRating.reviews} review)
                </a>
              </strong>
            </li>
            <li data-hero-label>
              <span className="tech-label">Today</span>
              <strong>
                <span className={`dot-live ${status.isOpen ? '' : 'dot-live--off'}`} aria-hidden="true" />
                {status.isOpen ? `Open till ${formatTime(status.closesAt)}` : 'Closed now'}
              </strong>
            </li>
          </ul>
        </div>

        <div className="hero__scroll scroll-cue" data-hero-scroll aria-hidden="true">
          <span className="hero__scroll-line">
            <span />
          </span>
          <span className="tech-label">Scroll</span>
        </div>
      </div>
    </section>
  );
}
