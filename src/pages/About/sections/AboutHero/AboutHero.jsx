/** AboutHero — editorial page opener with masked headline. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gymImage from '../../../../assets/images/gym-interior.jpg';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './AboutHero.css';

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__media">
        <img
          src={gymImage}
          alt="The Aarambh Fitness training floor in Kaurihar, Prayagraj"
          decoding="async"
          width={1800}
          height={1100}
        />
        <span className="about-hero__scrim" aria-hidden="true" />
        <span className="about-hero__grain" aria-hidden="true" />
      </div>

      <div className="container about-hero__content">
        <Reveal variant="fade" className="about-hero__meta">
          <span className="eyebrow eyebrow--plain">About Aarambh Fitness</span>
          <span className="hero__coords">25.44° N, 81.85° E</span>
        </Reveal>

        <h1 className="about-hero__title">
          {['The beginning', 'of something', 'stronger.'].map((line, i) => (
            <Reveal as="span" variant="up" delay={0.1 + i * 0.1} className="line-mask" key={line}>
              <span>{i === 2 ? <em>{line}</em> : line}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal variant="up" delay={0.4}>
          <p className="about-hero__lede">
            Aarambh means beginning. That is the whole idea — a place in Kaurihar where people start
            properly, with a plan, a coach and a reason to come back next week.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.5} className="about-hero__cta">
          <Link to="/services" className="btn btn--primary btn--lg">
            What we offer <ArrowRight size={16} />
          </Link>
          <Link to="/consultation" className="btn btn--ghost btn--lg">
            Book a consultation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
