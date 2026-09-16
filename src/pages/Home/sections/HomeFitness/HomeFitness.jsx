/**
 * HomeFitness — "Your gym can come home."
 * Full-bleed split with the home-training photograph and feature list.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Home as HomeIcon, Clock, Target, UserCheck, Users, Zap } from 'lucide-react';
import homeImage from '../../../../assets/images/home-fitness.jpg';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './HomeFitness.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Users, title: 'Male & Female Coaches', copy: 'Choose the coach you are most comfortable training with.' },
  { icon: Clock, title: 'Flexible Sessions', copy: 'Early morning, evening or weekend slots around your routine.' },
  { icon: Target, title: 'Goal-Based Training', copy: 'Fat loss, strength, mobility or general fitness — the plan follows the goal.' },
  { icon: UserCheck, title: 'Personal Attention', copy: 'One coach, one member, full focus for the entire session.' },
  { icon: HomeIcon, title: 'Home Convenience', copy: 'No travel, no waiting for equipment, no changing rooms.' },
  { icon: Zap, title: 'Minimal Equipment', copy: 'Programmes written for a mat, bands or whatever you already own.' },
];

export default function HomeFitness() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-home-img]',
        { scale: 1.18, clipPath: 'inset(0 0 100% 0)' },
        {
          scale: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 72%', once: true },
        }
      );
      gsap.fromTo(
        '[data-home-item]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.home-fit__features', start: 'top 82%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="home-fit section bg-800" id="home-fitness" ref={rootRef} aria-labelledby="home-fit-title">
      <div className="container">
      <div className="home-fit__grid">
      <div className="home-fit__visual" aria-hidden="false">
        <img
          src={homeImage}
          alt="Coach guiding a home training session in a modern living room"
          data-home-img
          loading="lazy"
          decoding="async"
          width={1200}
          height={1500}
        />
        <span className="home-fit__scrim" aria-hidden="true" />
        <span className="home-fit__label" aria-hidden="true">
          <span className="tech-label">Service 03</span>
          <strong>Home Fitness</strong>
        </span>
      </div>

      <div className="home-fit__content">
        <span className="section-index">10 — Home Fitness</span>
        <h2 className="home-fit__title" id="home-fit-title">
          Your gym can
          <br />
          come home.
        </h2>
        <p className="home-fit__lede">
          Your coach arrives, sets up, and runs the same structured session you would get in the gym.
          Same plan, same attention, zero travel — useful for busy schedules, families and anyone who
          prefers privacy.
        </p>

        <ul className="home-fit__features" role="list">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <li className="home-fit__feature" key={feature.title} data-home-item>
                <span className="home-fit__feature-icon">
                  <Icon size={17} />
                </span>
                <span>
                  <strong>{feature.title}</strong>
                  <em>{feature.copy}</em>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="home-fit__cta">
          <a
            href={buildWhatsAppUrl(
              'Hello Aarambh Fitness,\n\nI am interested in Home Fitness training.\n\nPlease share the available slots and coverage area.'
            )}
            className="btn btn--primary btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Home Fitness <ArrowRight size={16} />
          </a>
          <Link to="/services#home-fitness" className="btn btn--ghost btn--lg">
            Service details
          </Link>
        </div>

        <p className="home-fit__note">
          Home sessions cover Kaurihar and nearby areas of Prayagraj. Share your locality when you
          enquire and we will confirm coverage before booking.
        </p>
      </div>
      </div>
      </div>
    </section>
  );
}
