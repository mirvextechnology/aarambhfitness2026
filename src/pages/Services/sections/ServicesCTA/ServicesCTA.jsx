/** ServicesCTA — page-closing conversion block. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../../../assets/icons/index.jsx';
import './ServicesCTA.css';

export default function ServicesCTA() {
  return (
    <section className="svc-cta section bg-800" aria-labelledby="svc-cta-title">
      <span className="svc-cta__glow" aria-hidden="true" />
      <div className="container svc-cta__inner">
        <span className="eyebrow">Pick a starting point</span>
        <h2 className="svc-cta__title" id="svc-cta-title">
          Not sure which service
          <br />
          is right for you?
        </h2>
        <p className="svc-cta__lede">
          Answer a few questions in the assessment and we will point you at the right one — or book a
          consultation and we will work it out together.
        </p>
        <div className="svc-cta__actions">
          <Link to="/consultation" className="btn btn--primary btn--lg">
            Book a consultation <ArrowRight size={16} />
          </Link>
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI looked at your services and I am not sure which one suits me. Please guide me.')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph size={17} /> WhatsApp Us
          </a>
          <Link to="/#fitness-assessment" className="btn btn--ghost btn--lg">
            Take the assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
