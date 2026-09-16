/**
 * ServiceNavigation — sticky jump list.
 * Vertical rail on desktop, horizontal scroll-snap strip on mobile.
 * Tracks the section in view with IntersectionObserver.
 */
import { useEffect, useRef, useState } from 'react';
import { services } from '../../../../data/services.js';
import './ServiceNavigation.css';

export default function ServiceNavigation() {
  const [active, setActive] = useState(services[0].slug);
  const stripRef = useRef(null);

  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.slug))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* keep the active chip in view on mobile */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const chip = strip.querySelector(`[data-slug="${active}"]`);
    if (!chip) return;
    const target = chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const jump = (e, slug) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;
    if (typeof window.scrollToSmooth === 'function') {
      window.scrollToSmooth(`#${slug}`, { offset: -96 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="svc-nav" aria-label="Service sections">
      <div className="svc-nav__inner">
        <span className="svc-nav__label tech-label">Jump to</span>
        <div className="svc-nav__strip" ref={stripRef} id="service-list">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.slug}`}
              data-slug={service.slug}
              className={`svc-nav__link ${active === service.slug ? 'is-active' : ''}`}
              onClick={(e) => jump(e, service.slug)}
              aria-current={active === service.slug ? 'true' : undefined}
            >
              <span className="svc-nav__num">{service.number}</span>
              {service.shortName}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
