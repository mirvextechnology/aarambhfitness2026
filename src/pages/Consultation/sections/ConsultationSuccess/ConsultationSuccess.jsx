/**
 * ConsultationSuccess — the post-submit screen.
 * Deliberately says "request submitted", never "appointment confirmed".
 */
import { CalendarCheck, CheckCircle2, Copy, Send } from 'lucide-react';
import { consultationNotice } from '../../../../data/siteConfig.js';
import { showToast } from '../../../../utils/emailSender.js';

export default function ConsultationSuccess({ summary, whatsappHref, onReset }) {
  const copySummary = async () => {
    const text = [
      'Service: ' + summary.serviceName,
      (summary.goalTitle || 'Goal') + ': ' + summary.goalLabel,
      (summary.prefTitle || 'Preference') + ': ' + summary.prefLabel,
      'Date: ' + summary.dateText,
      'Time: ' + summary.timeText,
      'Name: ' + summary.name,
      'Phone: ' + summary.phone,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      showToast('Summary copied');
    } catch {
      showToast('Could not copy — please note it down', 'info');
    }
  };

  return (
    <div className="cons-step">
      <div className="cons-success">
        <span className="cons-success__icon">
          <CheckCircle2 size={30} />
        </span>

        <h2 className="cons-success__title">Your consultation request has been submitted</h2>

        <p className="cons-success__lede">{consultationNotice}</p>

        <dl className="cons-success__summary">
          <div>
            <dt>Service</dt>
            <dd>{summary.serviceName}</dd>
          </div>
          <div>
            <dt>{summary.goalTitle || 'Goal'}</dt>
            <dd>{summary.goalLabel}</dd>
          </div>
          <div>
            <dt>{summary.prefShort || 'Preference'}</dt>
            <dd>{summary.prefLabel}</dd>
          </div>
          <div>
            <dt>Preferred date</dt>
            <dd>{summary.dateText}</dd>
          </div>
          <div>
            <dt>Preferred time</dt>
            <dd>{summary.timeText}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              {summary.name} · {summary.phone}
            </dd>
          </div>
        </dl>

        <div className="cons-success__actions">
          <a href={whatsappHref} className="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
            <Send size={16} /> Also send on WhatsApp
          </a>
          <button type="button" className="btn btn--outline btn--lg" onClick={copySummary}>
            <Copy size={16} /> Copy summary
          </button>
          <button type="button" className="btn btn--ghost btn--lg" onClick={onReset}>
            <CalendarCheck size={16} /> Book another slot
          </button>
        </div>

        <p className="cons-success__note">
          If you do not hear from us within a working day, message us on WhatsApp — that is usually
          the fastest route.
        </p>
      </div>
    </div>
  );
}
