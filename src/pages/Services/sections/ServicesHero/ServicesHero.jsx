/** ServicesHero — page opener with an oversized service index. */
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import heroImage from '../../../../assets/images/hero-athlete.jpg';
import { services } from '../../../../data/services.js';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './ServicesHero.css';

export default function ServicesHero() {
  return (
    <section className="svc-hero">
      <div className="svc-hero__media">
        <img
          src={heroImage}
          alt="Athlete training at Aarambh Fitness in Kaurihar"
          decoding="async"
          width={1800}
          height={1100}
        />
        <span className="svc-hero__scrim" aria-hidden="true" />
        <span className="svc-hero__grain" aria-hidden="true" />
      </div>

      <div className="container svc-hero__content">
        <Reveal variant="fade">
          <span className="eyebrow eyebrow--plain">
            Services · {String(services.length).padStart(2, '0')} programmes
          </span>
        </Reveal>

        <h1 className="svc-hero__title">
          {['Everything you need', 'to train properly.'].map((line, i) => (
            <Reveal as="span" variant="up" delay={0.12 + i * 0.1} className="line-mask" key={line}>
              <span>{i === 1 ? <em>{line}</em> : line}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal variant="up" delay={0.35}>
          <p className="svc-hero__lede">
            Eight services, one location in Kaurihar. Train in the gym, at home, or with a mix of
            both — with nutrition structure and recovery support handled alongside.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.45} className="svc-hero__actions">
          <a href="#service-list" className="btn btn--primary btn--lg">
            Browse services <ArrowDown size={16} />
          </a>
          <Link to="/consultation" className="btn btn--ghost btn--lg">
            Not sure which one? <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal variant="up" delay={0.55} className="svc-hero__index" aria-hidden="true">
          {services.map((s) => (
            <span key={s.id}>
              {s.number} {s.shortName}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
