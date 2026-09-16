/** ConsultationHero — sets expectations before the flow starts. */
import { CalendarCheck, Clock, Info } from 'lucide-react';
import { consultationNotice } from '../../../../data/siteConfig.js';
import './ConsultationHero.css';

export default function ConsultationHero({ totalSteps }) {
  return (
    <section className="cons-hero">
      <span className="cons-hero__grid" aria-hidden="true" />
      <span className="cons-hero__glow" aria-hidden="true" />

      <div className="container cons-hero__content">
        <span className="eyebrow eyebrow--plain">Consultation · {totalSteps} steps</span>

        <h1 className="cons-hero__title">
          Book a fitness
          <br />
          consultation.
        </h1>

        <p className="cons-hero__lede">
          Pick a service, a goal and a time that suits you. The whole form takes about two minutes.
        </p>

        <ul className="cons-hero__facts" role="list">
          <li>
            <Clock size={15} /> 30–45 minute session
          </li>
          <li>
            <CalendarCheck size={15} /> In-person or over a call
          </li>
          <li>
            <Info size={15} /> Free for new members
          </li>
        </ul>

        <p className="cons-hero__notice">
          <Info size={14} aria-hidden="true" />
          <span>{consultationNotice}</span>
        </p>
      </div>
    </section>
  );
}
