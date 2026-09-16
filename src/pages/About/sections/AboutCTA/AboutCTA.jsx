/** AboutCTA — page-closing conversion block. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../../../assets/icons/index.jsx';
import './AboutCTA.css';

export default function AboutCTA() {
  return (
    <section className="about-cta section bg-900" aria-labelledby="about-cta-title">
      <span className="about-cta__glow" aria-hidden="true" />
      <div className="container about-cta__inner">
        <span className="eyebrow">Ready when you are</span>
        <h2 className="about-cta__title" id="about-cta-title">
          Come see the floor
          <br />
          before you decide.
        </h2>
        <p className="about-cta__lede">
          A consultation is a conversation, not a sales pitch. Tell us your goal and schedule and we
          will give you an honest starting point — whether or not you join.
        </p>
        <div className="about-cta__actions">
          <Link to="/consultation" className="btn btn--primary btn--lg">
            Book a consultation <ArrowRight size={16} />
          </Link>
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI read about you on the About page. I would like to visit and understand how training works.')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph size={17} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
