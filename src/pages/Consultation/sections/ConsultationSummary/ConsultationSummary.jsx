/**
 * ConsultationSummary — STEP 08 (review) and STEP 09 (submit).
 * Shows every selection, then sends through EmailJS with a WhatsApp fallback.
 */
import { AlertCircle, Check, Loader2, Pencil, Send } from 'lucide-react';
import { isEmailjsConfigured } from '../../../../data/siteConfig.js';

export default function ConsultationSummary({ summary, onEdit, onSubmit, status, errorMessage }) {
  const rows = [
    { label: 'Service', value: summary.serviceName, step: 0 },
    { label: summary.goalTitle || 'Goal', value: summary.goalLabel, step: 1 },
    { label: summary.prefShort || 'Preference', value: summary.prefLabel, step: 2 },
    { label: 'Preferred date', value: summary.dateText, step: 3 },
    { label: 'Preferred time', value: summary.timeText, step: 4 },
    { label: 'Name', value: summary.name, step: 5 },
    { label: 'Phone', value: summary.phone, step: 5 },
    { label: 'Email', value: summary.email, step: 5 },
    { label: 'Age', value: summary.age, step: 5 },
    { label: 'Gender', value: summary.gender, step: 5 },
    { label: 'Location', value: summary.location, step: 5 },
    { label: 'Requirements', value: summary.requirements, step: 6, long: true },
  ];

  return (
    <div className="cons-step">
      <div className="review">
        <dl className="review__list">
          {rows.map((row) => (
            <div className={`review__row ${row.long ? 'review__row--long' : ''}`} key={row.label}>
              <dt>
                {row.label}
                <button
                  type="button"
                  className="review__edit"
                  onClick={() => onEdit(row.step)}
                  aria-label={`Edit ${row.label}`}
                >
                  <Pencil size={12} />
                </button>
              </dt>
              <dd>{row.value || '—'}</dd>
            </div>
          ))}
        </dl>

        {!isEmailjsConfigured ? (
          <div className="review__warn" role="status">
            <AlertCircle size={15} />
            <span>
              Email delivery is not configured yet. Your request will still open on WhatsApp so the
              team receives it immediately.
            </span>
          </div>
        ) : null}

        {status === 'error' && errorMessage ? (
          <div className="review__error" role="alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn--primary btn--lg review__submit"
          onClick={onSubmit}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={16} className="anim-spin" /> Sending request…
            </>
          ) : (
            <>
              <Send size={16} /> Submit consultation request
            </>
          )}
        </button>

        <p className="review__note">
          <Check size={13} aria-hidden="true" />
          This sends a consultation <strong>request</strong>. It is not a confirmed appointment — our
          team will contact you to confirm availability.
        </p>
      </div>
    </div>
  );
}
