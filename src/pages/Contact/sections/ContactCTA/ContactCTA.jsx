/** ContactCTA — page-closing conversion block. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, getTelHref } from '../../../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../../../assets/icons/index.jsx';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section className="ccta section bg-800" aria-labelledby="ccta-title">
      <span className="ccta__glow" aria-hidden="true" />
      <div className="container ccta__inner">
        <span className="eyebrow">One message away</span>
        <h2 className="ccta__title" id="ccta-title">
          Ready when
          <br />
          you are.
        </h2>
        <p className="ccta__lede">
          Send us a message on WhatsApp or book a consultation. Either way, you will get an honest
          starting point rather than a sales pitch.
        </p>
        <div className="ccta__actions">
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI would like to start my fitness journey. Please guide me.')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph size={17} /> WhatsApp Us
          </a>
          <Link to="/consultation" className="btn btn--primary btn--lg">
            Book a consultation <ArrowRight size={16} />
          </Link>
          <a href={getTelHref()} className="btn btn--ghost btn--lg">
            Call us
          </a>
        </div>
      </div>
    </section>
  );
}
