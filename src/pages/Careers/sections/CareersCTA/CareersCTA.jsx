/** CareersCTA — page-closing block for applicants. */
import { Mail, Phone } from 'lucide-react';
import { contact } from '../../../../data/siteConfig.js';
import { buildWhatsAppUrl, getTelHref, getMailHref } from '../../../../utils/whatsapp.js';
import './CareersCTA.css';

export default function CareersCTA() {
  const scrollToForm = () => {
    if (typeof window.scrollToSmooth === 'function') {
      window.scrollToSmooth('#trainer-registration', { offset: -96 });
    } else {
      document.getElementById('trainer-registration')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="careers-cta section bg-900" aria-labelledby="careers-cta-title">
      <span className="careers-cta__glow" aria-hidden="true" />
      <div className="container careers-cta__inner">
        <span className="eyebrow">Join the Aarambh team</span>
        <h2 className="careers-cta__title" id="careers-cta-title">
          Think you are a fit?
          <br />
          Send us your details.
        </h2>
        <p className="careers-cta__lede">
          Fill in the registration form and we will get back to you. If you would rather just talk
          first, call or message us directly.
        </p>

        <div className="careers-cta__actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={scrollToForm}>
            Fill the application
          </button>
          <a href={getTelHref()} className="btn btn--outline btn--lg">
            <Phone size={16} /> {contact.phone}
          </a>
          <a
            href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI am interested in joining your team as a trainer. Please share the process.')}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
          <a href={getMailHref()} className="careers-cta__mail">
            <Mail size={14} /> {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
