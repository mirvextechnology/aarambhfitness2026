/**
 * MobileStickyBar — fixed CALL / WHATSAPP / BOOK conversion bar.
 * Rendered only on small screens; content is padded above it globally.
 */
import { Link } from 'react-router-dom';
import { Phone, CalendarCheck } from 'lucide-react';
import { buildWhatsAppUrl, getTelHref } from '../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../assets/icons/index.jsx';
import './MobileStickyBar.css';

export default function MobileStickyBar({ whatsappMessage }) {
  const text =
    whatsappMessage || 'Hello Aarambh Fitness, I would like to know more about your services.';

  return (
    <div className="mobile-bar" role="region" aria-label="Quick contact">
      <a href={getTelHref()} className="mobile-bar__item">
        <Phone size={17} />
        <span>Call</span>
      </a>
      <a
        href={buildWhatsAppUrl(text)}
        className="mobile-bar__item mobile-bar__item--accent"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppGlyph size={18} />
        <span>WhatsApp</span>
      </a>
      <Link to="/consultation" className="mobile-bar__item">
        <CalendarCheck size={17} />
        <span>Book</span>
      </Link>
    </div>
  );
}
