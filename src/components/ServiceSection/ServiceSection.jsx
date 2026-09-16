/**
 * ServiceSection — the single renderer used by all eight service blocks
 * on the Services page. Alternates layout side so the page never reads
 * as a repeated card grid. Every field comes from data/services.js.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Clock, MapPin, MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl, serviceMessage } from '../../utils/whatsapp.js';
import { serviceById } from '../../data/services.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './ServiceSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSection({ serviceId, index = 0, id }) {
  const service = serviceById(serviceId);
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const flip = index % 2 === 1;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !service || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-svc-media]',
        { clipPath: 'inset(0 0 100% 0)', scale: 1.15 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo(
        '[data-svc-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 74%', once: true },
        }
      );
      gsap.fromTo(
        '[data-svc-item]',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '[data-svc-body]', start: 'top 84%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [service, reduced]);

  if (!service) return null;

  const whatsapp = buildWhatsAppUrl(serviceMessage(service.name));
  const anchor = id || service.slug;

  return (
    <article
      className={`svc ${flip ? 'svc--flip' : ''}`}
      id={anchor}
      ref={rootRef}
      aria-labelledby={`${anchor}-title`}
    >
      <div className="container svc__inner">
        {/* media */}
        <div className="svc__media">
          <div className="svc__frame" data-svc-media>
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              decoding="async"
              width={1000}
              height={1200}
            />
            <span className="svc__frame-scrim" aria-hidden="true" />
          </div>

          <span className="svc__index big-number" aria-hidden="true">
            {service.number}
          </span>

          <div className="svc__meta">
            <span className="svc__meta-item">
              <Clock size={14} /> {service.duration}
            </span>
            <span className="svc__meta-item">
              <MapPin size={14} /> {service.location}
            </span>
          </div>
        </div>

        {/* copy */}
        <div className="svc__body" data-svc-body>
          <span className="section-index">Service {service.number}</span>

          <h2 className="svc__title" id={`${anchor}-title`}>
            {service.name}
          </h2>
          <span className="svc__rule" data-svc-line aria-hidden="true" />
          <p className="svc__tagline">{service.tagline}</p>
          <p className="svc__description">{service.description}</p>

          <div className="svc__columns">
            <div className="svc__col">
              <h3 className="svc__col-title">Who it is for</h3>
              <ul className="tick-list" role="list">
                {service.forWho.map((item) => (
                  <li key={item} data-svc-item>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc__col">
              <h3 className="svc__col-title">What is included</h3>
              <ul className="tick-list tick-list--check" role="list">
                {service.includes.map((item) => (
                  <li key={item} data-svc-item>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="svc__benefits">
            <h3 className="svc__col-title">Benefits</h3>
            <ul className="svc__benefit-list" role="list">
              {service.benefits.map((benefit) => (
                <li key={benefit} data-svc-item>
                  <Check size={14} aria-hidden="true" /> {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="svc__cta">
            {service.cta.action === 'consultation' ? (
              <Link to="/consultation" className="btn btn--primary">
                {service.cta.label} <ArrowRight size={15} />
              </Link>
            ) : (
              <Link to="/contact" className="btn btn--primary">
                {service.cta.label} <ArrowRight size={15} />
              </Link>
            )}
            <a href={whatsapp} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              <MessageSquare size={15} /> Ask on WhatsApp
            </a>
          </div>

          {service.disclaimer ? <p className="svc__disclaimer">{service.disclaimer}</p> : null}
        </div>
      </div>
    </article>
  );
}
