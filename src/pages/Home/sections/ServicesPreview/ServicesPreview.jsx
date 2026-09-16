/**
 * ServicesPreview — immersive horizontal service rail.
 * Desktop: pinned section, scroll-scrubbed horizontal track.
 * Mobile: native horizontal scroll-snap carousel.
 * Clicking a panel routes to that service on the Services page.
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../../../../data/services.js';
import { useMediaQuery } from '../../../../hooks/useMediaQuery.js';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './ServicesPreview.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 901px)');
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const pinRef = useRef(null);

  /* ---- pinned horizontal scrub (desktop only) ---- */
  useEffect(() => {
    const el = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!el || !pin || !track || !isDesktop || reduced) return undefined;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          // Pin the inner wrapper, never the section itself: ScrollTrigger
          // reparents a pinned element into a `pin-spacer`, and React 18
          // removes DOM nodes before effect cleanups run — pinning the
          // section would make React's own removeChild throw on unmount.
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            const panels = track.querySelectorAll('.service-panel');
            const next = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
            setActiveIndex(next);
          },
        },
      });

      // Re-measure if fonts or images shift the layout.
      const onResize = () => tween.scrollTrigger?.refresh();
      window.addEventListener('resize', onResize);
      const t = window.setTimeout(onResize, 400);

      return () => {
        window.removeEventListener('resize', onResize);
        window.clearTimeout(t);
      };
    }, el);

    return () => ctx.revert();
  }, [isDesktop, reduced]);

  /* ---- mobile: track the snapped panel ---- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || isDesktop) return undefined;
    const onScroll = () => {
      const panels = track.querySelectorAll('.service-panel');
      if (!panels.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      panels.forEach((panel, i) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const dist = Math.abs(panelCenter - center);
        if (dist < best) {
          best = dist;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
      setProgress(nearest / Math.max(1, panels.length - 1));
    };
    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  const scrollToPanel = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const panels = track.querySelectorAll('.service-panel');
    const target = Math.min(Math.max(activeIndex + direction, 0), panels.length - 1);
    const panel = panels[target];
    if (!panel) return;
    if (isDesktop) {
      // On desktop the rail is scroll-scrubbed: nudge the page instead.
      const delta = direction * window.innerHeight * 0.5;
      if (typeof window.lenis?.scrollTo === 'function') {
        window.lenis.scrollTo(window.scrollY + delta, { duration: 0.7 });
      } else {
        window.scrollTo({ top: window.scrollY + delta, behavior: 'smooth' });
      }
    } else {
      track.scrollTo({ left: panel.offsetLeft - 20, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`service-rail section ${isDesktop && !reduced ? 'is-pinned' : ''}`}
      ref={rootRef}
      aria-labelledby="services-preview-title"
    >
      <div className="service-rail__pin" ref={pinRef} data-rail-pin>
      <div className="service-rail__head container">
        <div className="service-rail__heading">
          <span className="section-index">02 — Services</span>
          <h2 className="display-2" id="services-preview-title">
            Eight ways to train with us
          </h2>
          <p className="service-rail__lede">
            Gym, home, one-to-one, nutrition, recovery and event staffing — pick the entry point that
            fits your life.
          </p>
        </div>

        <div className="service-rail__controls">
          <button
            type="button"
            className="service-rail__nav"
            onClick={() => scrollToPanel(-1)}
            aria-label="Previous service"
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="service-rail__count mono">
            {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="service-rail__nav"
            onClick={() => scrollToPanel(1)}
            aria-label="Next service"
            disabled={activeIndex === services.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="service-rail__viewport">
        <div className="service-rail__track" ref={trackRef} data-rail-track>
          {services.map((service) => (
            <Link
              to={`/services#${service.slug}`}
              className="service-panel"
              key={service.id}
              data-cursor="view"
            >
              <span className="service-panel__media">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1200}
                />
                <span className="service-panel__scrim" aria-hidden="true" />
              </span>

              <span className="service-panel__body">
                <span className="service-panel__number">{service.number}</span>
                <span className="service-panel__name">{service.name}</span>
                <span className="service-panel__tagline">{service.tagline}</span>
                <span className="service-panel__meta">
                  {service.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="service-panel__cta">
                  View service <ArrowUpRight size={15} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container service-rail__foot">
        <span className="service-rail__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </span>
        <Link to="/services" className="service-rail__all">
          View all services <ArrowUpRight size={15} />
        </Link>
      </div>
      </div>
    </section>
  );
}
