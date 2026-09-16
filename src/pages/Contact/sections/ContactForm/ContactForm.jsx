/**
 * ContactForm — general enquiry form.
 * Validation → loading → EmailJS → success/failure → WhatsApp fallback.
 */
import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { serviceOptions } from '../../../../data/services.js';
import { goalOptions } from '../../../../data/fitnessGoals.js';
import { isEmailjsConfigured, contact } from '../../../../data/siteConfig.js';
import { sendEmail, showSuccess, showFailure, showWhatsAppFallback } from '../../../../utils/emailSender.js';
import { buildWhatsAppUrl, contactMessage } from '../../../../utils/whatsapp.js';
import { isRequired, isValidPhone, isValidEmail, runValidators } from '../../../../utils/bookingHelpers.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './ContactForm.css';

const INITIAL = { name: '', phone: '', email: '', service: '', goal: '', message: '' };

const validators = {
  name: (v) => (!isRequired(v) ? 'Enter your name.' : v.trim().length < 3 ? 'Name looks too short.' : ''),
  phone: (v) => (!isValidPhone(v) ? 'Enter a valid phone number.' : ''),
  email: (v) => (!isValidEmail(v) ? 'Enter a valid email address.' : ''),
  message: (v) => (!isRequired(v) ? 'Please write a short message.' : v.trim().length < 10 ? 'A little more detail helps us help you.' : ''),
};

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched) setErrors(runValidators(next, validators));
  };
  const blur = () => {
    setTouched(true);
    setErrors(runValidators(values, validators));
  };
  const err = (key) => (touched && errors[key] ? errors[key] : '');

  const whatsappHref = buildWhatsAppUrl(contactMessage(values));

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const found = runValidators(values, validators);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById('cf-name')?.focus();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const payload = { ...values, type: 'Website Enquiry' };
    const result = await sendEmail(payload, { context: 'contact' });

    if (result.ok) {
      setStatus('success');
      setValues(INITIAL);
      setTouched(false);
      await showSuccess({
        title: 'Message sent',
        text: 'Thank you for reaching out. Our team will get back to you shortly.',
        whatsappText: contactMessage(payload),
      });
      return;
    }

    /* EmailJS is not set up yet. WhatsApp still delivers the message, so this
       is a handover, not a failure. */
    if (result.reason === 'not-configured') {
      const opened = await showWhatsAppFallback({ whatsappText: contactMessage(payload) });
      if (opened) {
        setStatus('success');
        setValues(INITIAL);
        setTouched(false);
      } else {
        setStatus('idle');
        setErrorMessage('');
      }
      return;
    }

    setStatus('error');
    setErrorMessage('We could not send your message right now. Please try again, or message us on WhatsApp.');

    await showFailure({
      title: 'Could not send',
      text: 'The submission failed. Please try again or continue on WhatsApp.',
      whatsappText: contactMessage(payload),
      onRetry: () => submit(e),
    });
  };

  return (
    <section className="cform section bg-900" id="contact-form" aria-labelledby="cform-title">
      <div className="container">
        <div className="cform__layout">
          <div className="cform__intro">
            <SectionHeading
              index="02 — Enquiry"
              eyebrow="Send a message"
              title={['Tell us what', 'you need.']}
              lede="Fill this in and we will reply. For anything urgent, WhatsApp or a phone call is faster."
              size="sm"
              id="cform-title"
            />

            <ul className="tick-list tick-list--check cform__points">
              <li>Replies usually within one working day</li>
              <li>No obligation, no sales pressure</li>
              <li>Male and female coaches available</li>
              <li>Gym and home training options</li>
            </ul>

            {status === 'success' ? (
              <div className="cform__success" role="status">
                <span className="cform__success-icon">
                  <CheckCircle2 size={22} />
                </span>
                <div>
                  <strong>Message sent</strong>
                  <p>Thank you. We will get back to you shortly.</p>
                  <button type="button" className="cform__again" onClick={() => setStatus('idle')}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <form className="cform__form" onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className={`field ${err('name') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="cf-name">
                  Name<span className="req">*</span>
                </label>
                <input
                  id="cf-name"
                  className="input"
                  value={values.name}
                  onChange={set('name')}
                  onBlur={blur}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(err('name'))}
                />
                {err('name') ? <p className="field__error">{errors.name}</p> : null}
              </div>

              <div className={`field ${err('phone') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="cf-phone">
                  Phone<span className="req">*</span>
                </label>
                <input
                  id="cf-phone"
                  className="input"
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  onBlur={blur}
                  placeholder="98765 43210"
                  autoComplete="tel"
                  aria-invalid={Boolean(err('phone'))}
                />
                {err('phone') ? <p className="field__error">{errors.phone}</p> : null}
              </div>

              <div className={`field span-2 ${err('email') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="cf-email">
                  Email<span className="req">*</span>
                </label>
                <input
                  id="cf-email"
                  className="input"
                  type="email"
                  value={values.email}
                  onChange={set('email')}
                  onBlur={blur}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(err('email'))}
                />
                {err('email') ? <p className="field__error">{errors.email}</p> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="cf-service">
                  Service
                </label>
                <select id="cf-service" className="select" value={values.service} onChange={set('service')}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="cf-goal">
                  Goal
                </label>
                <select id="cf-goal" className="select" value={values.goal} onChange={set('goal')}>
                  <option value="">Select your goal</option>
                  {goalOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`field span-2 ${err('message') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="cf-message">
                  Message<span className="req">*</span>
                </label>
                <textarea
                  id="cf-message"
                  className="textarea"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  onBlur={blur}
                  placeholder="Tell us your goal, the days you are free, and anything we should know."
                  aria-invalid={Boolean(err('message'))}
                />
                {err('message') ? <p className="field__error">{errors.message}</p> : null}
              </div>
            </div>

            {status === 'error' && errorMessage ? (
              <div className="cform__error" role="alert">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <div className="cform__actions">
              <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="anim-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </button>

              <a href={whatsappHref} className="btn btn--outline btn--lg" target="_blank" rel="noopener noreferrer">
                Send on WhatsApp instead
              </a>
            </div>

            {!isEmailjsConfigured ? (
              <p className="cform__hint">
                <AlertCircle size={13} aria-hidden="true" /> Email delivery is not configured yet.
                The WhatsApp option above always works. You can also reach us at {contact.email}.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
