/** PlansCTA — page-closing conversion block for the plans page. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../../../assets/icons/index.jsx';
import './PlansCTA.css';

export default function PlansCTA() {
  return (
    <section className="plans-cta section bg-900" aria-labelledby="plans-cta-title">
      <span className="plans-cta__glow" aria-hidden="true" />
      <div className="container plans-cta__inner">
        <span className="eyebrow">Ready to start</span>
        <h2 className="plans-cta__title" id="plans-cta-title">
          Pick a plan, or let us
          <br />
          recommend one.
        </h2>
        <p className="plans-cta__lede">
          Pricing and current offers are confirmed on a quick call. Tell us your goal and schedule and
          we will tell you exactly which plan fits — and what it costs.
        </p>
        <div className="plans-cta__actions">
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI would like to know the current pricing for your plans.\n\nMy goal: \nDays available per week: ')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph size={17} /> Ask for pricing
          </a>
          <Link to="/consultation" className="btn btn--primary btn--lg">
            Book a consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
