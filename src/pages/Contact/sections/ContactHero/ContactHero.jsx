/** ContactHero — page opener with live open/closed state. */
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { contact } from '../../../../data/siteConfig.js';
import { getOpeningStatus, formatTime } from '../../../../utils/openingHours.js';
import { buildWhatsAppUrl, getTelHref } from '../../../../utils/whatsapp.js';
import './ContactHero.css';

export default function ContactHero() {
  const status = getOpeningStatus();

  return (
    <section className="contact-hero">
      <span className="contact-hero__grid" aria-hidden="true" />
      <span className="contact-hero__glow" aria-hidden="true" />

      <div className="container contact-hero__content">
        <span className="eyebrow eyebrow--plain">Contact · Kaurihar, Prayagraj</span>

        <h1 className="contact-hero__title">
          Let&apos;s start
          <br />
          your Aarambh.
        </h1>

        <p className="contact-hero__lede">
          Call, message or drop in. If you tell us your goal and the days you are free, we will tell
          you exactly what to start with.
        </p>

        <div className="contact-hero__actions">
          <a href={getTelHref()} className="btn btn--primary btn--lg">
            <MessageCircle size={16} /> {contact.phone}
          </a>
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI would like to know more about your services.')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
          <Link to="/consultation" className="btn btn--ghost btn--lg">
            Book a consultation <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="contact-hero__facts" role="list">
          <li>
            <MapPin size={15} /> Kaurihar, Prayagraj, Uttar Pradesh
          </li>
          <li>
            <Clock size={15} />
            <span className={`dot-live ${status.isOpen ? '' : 'dot-live--off'}`} aria-hidden="true" />
            {status.isConfigured ? status.statusText : 'Hours on request'}
            {status.isConfigured && status.isOpen ? ` (${formatTime(status.opensAt)}–${formatTime(status.closesAt)})` : ''}
          </li>
        </ul>
      </div>
    </section>
  );
}
