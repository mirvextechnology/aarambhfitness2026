/**
 * Physiotherapy — "Train. Recover. Return stronger."
 * Recovery-focused, professional tone, no medical claims.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import recoveryImage from '../../../../assets/images/recovery.jpg';
import { serviceBySlug } from '../../../../data/services.js';
import { buildWhatsAppUrl, serviceMessage } from '../../../../utils/whatsapp.js';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './Physiotherapy.css';

export default function Physiotherapy() {
  const service = serviceBySlug('physiotherapy');
  const whatsapp = buildWhatsAppUrl(serviceMessage(service.name));

  const services = [
    { title: 'Movement Assessment', copy: 'How you squat, hinge, press and walk — reviewed before anything is loaded.' },
    { title: 'Mobility Support', copy: 'Targeted work to restore range where it is limiting your training.' },
    { title: 'Exercise Rehabilitation Support', copy: 'Guided progressions to help you train around discomfort safely.' },
    { title: 'Post-Training Recovery', copy: 'Recovery guidance between hard sessions so progress is not interrupted.' },
    { title: 'Return-to-Training Plan', copy: 'A staged progression back to full training, not a sudden jump.' },
  ];

  return (
    <section className="physio section bg-900" id="physiotherapy" aria-labelledby="physio-title">
      <div className="container">
        <div className="physio__grid">
          <Reveal variant="clip" className="physio__visual">
            <img
              src={recoveryImage}
              alt="Physiotherapy professional guiding a shoulder mobility assessment"
              loading="lazy"
              decoding="async"
              width={1000}
              height={1250}
            />
            <span className="physio__visual-tag">
              <span className="tech-label">Service 06</span>
              <strong>Recovery &amp; Mobility</strong>
            </span>
          </Reveal>

          <div className="physio__content">
            <span className="section-index">11 — Physiotherapy</span>
            <h2 className="physio__title" id="physio-title">
              Train. Recover.
              <br />
              <em>Return stronger.</em>
            </h2>

            <p className="physio__lede">
              Most people do not stop training because they are lazy — they stop because something
              hurts and nobody told them what to do about it. Our physiotherapy support focuses on
              assessment, mobility and a staged return to full training.
            </p>

            <ul className="physio__list" role="list">
              {services.map((item, i) => (
                <Reveal as="li" variant="left" delay={i * 0.06} className="physio__item" key={item.title}>
                  <span className="physio__item-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.copy}</em>
                  </span>
                </Reveal>
              ))}
            </ul>

            <div className="physio__cta">
              <a href={whatsapp} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                <MessageSquare size={16} /> Book a Physio Session
              </a>
              <Link to="/consultation" className="btn btn--outline">
                Request an assessment <ArrowRight size={15} />
              </Link>
            </div>

            <p className="physio__disclaimer">{service.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
