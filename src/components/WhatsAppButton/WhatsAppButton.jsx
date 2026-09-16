/**
 * WhatsAppButton — floating, context-aware WhatsApp CTA.
 * Expands a label on hover (desktop) and shows a tooltip nudge once.
 */
import { useEffect, useState } from 'react';
import { buildWhatsAppUrl } from '../../utils/whatsapp.js';
import { WhatsAppGlyph } from '../../assets/icons/index.jsx';
import './WhatsAppButton.css';

export default function WhatsAppButton({ message, label = 'Chat with us' }) {
  const [ready, setReady] = useState(false);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setReady(true), 900);
    const t2 = window.setTimeout(() => setNudge(true), 4200);
    const t3 = window.setTimeout(() => setNudge(false), 11000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const text =
    message || 'Hello Aarambh Fitness, I would like to know more about your services.';

  return (
    <a
      className={`whatsapp-fab ${ready ? 'is-ready' : ''} ${nudge ? 'is-nudging' : ''}`}
      href={buildWhatsAppUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${label} on WhatsApp`}
    >
      <span className="whatsapp-fab__pulse" aria-hidden="true" />
      <span className="whatsapp-fab__icon">
        <WhatsAppGlyph size={26} />
      </span>
      <span className="whatsapp-fab__label" aria-hidden="true">
        {label}
      </span>
      {nudge ? <span className="whatsapp-fab__nudge">Need help starting?</span> : null}
    </a>
  );
}
