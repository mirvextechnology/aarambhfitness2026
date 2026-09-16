/** CareersHero — page opener for recruitment. */
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import image from '../../../../assets/images/male-coach.jpg';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './CareersHero.css';

export default function CareersHero() {
  return (
    <section className="careers-hero">
      <div className="careers-hero__media">
        <img src={image} alt="Coaches running a group training session at Aarambh Fitness" decoding="async" width={1800} height={1100} />
        <span className="careers-hero__scrim" aria-hidden="true" />
        <span className="careers-hero__grain" aria-hidden="true" />
      </div>

      <div className="container careers-hero__content">
        <Reveal variant="fade">
          <span className="eyebrow eyebrow--plain">Careers · Kaurihar, Prayagraj</span>
        </Reveal>

        <h1 className="careers-hero__title">
          {['Turn your passion', 'into your profession.'].map((line, i) => (
            <Reveal as="span" variant="up" delay={0.12 + i * 0.1} className="line-mask" key={line}>
              <span>{i === 1 ? <em>{line}</em> : line}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal variant="up" delay={0.35}>
          <p className="careers-hero__lede">
            We are looking for trainers and coaches who care about how people move, not just how
            heavy they lift. Full-time, part-time and flexible roles across the gym, personal
            training, home fitness and physiotherapy.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.45} className="careers-hero__actions">
          <a href="#trainer-registration" className="btn btn--primary btn--lg">
            Apply now <ArrowDown size={16} />
          </a>
          <a href="#open-positions" className="btn btn--ghost btn--lg">
            See open roles <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
