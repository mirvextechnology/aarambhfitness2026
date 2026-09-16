/**
 * TrainerRegistration — trainer application form.
 * Validation → loading → EmailJS → success/failure → WhatsApp fallback.
 * The resume is attached as base64 for EmailJS templates that support it,
 * and the file name is always included so nothing is silently dropped.
 */
import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Paperclip, Send, Trash2 } from 'lucide-react';
import { openPositions, trainerSpecialisations, trainerWorkTypes } from '../../../../data/trainers.js';
import { isEmailjsConfigured, contact } from '../../../../data/siteConfig.js';
import { sendEmail, showSuccess, showFailure, showWhatsAppFallback } from '../../../../utils/emailSender.js';
import { buildWhatsAppUrl, trainerApplicationMessage } from '../../../../utils/whatsapp.js';
import { isRequired, isValidPhone, isValidEmail, runValidators } from '../../../../utils/bookingHelpers.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './TrainerRegistration.css';

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png'];

const INITIAL = {
  fullName: '',
  phone: '',
  email: '',
  gender: '',
  city: '',
  experience: '',
  certification: '',
  specialisation: '',
  role: '',
  workType: '',
  message: '',
};

const validators = {
  fullName: (v) => (!isRequired(v) ? 'Enter your full name.' : v.trim().length < 3 ? 'Name looks too short.' : ''),
  phone: (v) => (!isValidPhone(v) ? 'Enter a valid phone number.' : ''),
  email: (v) => (!isValidEmail(v) ? 'Enter a valid email address.' : ''),
  gender: (v) => (!isRequired(v) ? 'Select your gender.' : ''),
  city: (v) => (!isRequired(v) ? 'Enter your city.' : ''),
  role: (v) => (!isRequired(v) ? 'Select the role you are applying for.' : ''),
};

export default function TrainerRegistration() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileRef = useRef(null);

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched) setErrors(runValidators(next, validators));
  };

  const blur = (key) => () => {
    setTouched(true);
    setErrors(runValidators(values, validators));
    if (key) setTouched(true);
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResume(null);
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setResumeError('Please upload a PDF, JPG or PNG.');
      setResume(null);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError('File is larger than 5 MB.');
      setResume(null);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    setResumeError('');
    setResume(file);
  };

  const readAsBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const found = runValidators(values, validators);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById('tr-fullName')?.focus();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const resumeBase64 = resume ? await readAsBase64(resume) : '';

    const payload = {
      ...values,
      resume_name: resume?.name || 'Not attached',
      resume_size: resume ? `${Math.round(resume.size / 1024)} KB` : '',
      resume_base64: resumeBase64,
    };

    const result = await sendEmail(payload, { context: 'trainer-registration' });

    if (result.ok) {
      setStatus('success');
      setValues(INITIAL);
      setResume(null);
      setTouched(false);
      if (fileRef.current) fileRef.current.value = '';
      await showSuccess({
        title: 'Application received',
        text: 'Thank you for applying. Our team will review your details and contact you on the phone number you shared.',
        whatsappText: trainerApplicationMessage(payload),
      });
      return;
    }

    /* EmailJS is not set up yet. WhatsApp still delivers the application, so
       this is a handover, not a failure. */
    if (result.reason === 'not-configured') {
      const opened = await showWhatsAppFallback({
        title: 'Send your application on WhatsApp',
        whatsappText: trainerApplicationMessage(payload),
      });
      if (opened) {
        setStatus('success');
        setValues(INITIAL);
        setResume(null);
        setTouched(false);
        if (fileRef.current) fileRef.current.value = '';
      } else {
        setStatus('idle');
        setErrorMessage('');
      }
      return;
    }

    setStatus('error');
    setErrorMessage(
      'We could not send your application right now. Please try again, or send it to us on WhatsApp so nothing is lost.'
    );

    await showFailure({
      title: 'Could not send',
      text: 'The submission failed. Please try again or continue on WhatsApp.',
      whatsappText: trainerApplicationMessage(payload),
      onRetry: () => submit(e),
    });
  };

  const whatsappHref = buildWhatsAppUrl(
    trainerApplicationMessage({ ...values, fullName: values.fullName || 'Applicant' })
  );

  const fieldError = (key) => (touched && errors[key] ? errors[key] : '');

  return (
    <section
      className="tr-form section bg-800"
      id="trainer-registration"
      aria-labelledby="tr-form-title"
    >
      <div className="container">
        <SectionHeading
          index="04 — Apply"
          eyebrow="Join the Aarambh team"
          title={['Tell us about', 'your experience.']}
          lede="Fill this in and we will get back to you. Fields marked with an asterisk are required."
          className="section-heading--split"
          id="tr-form-title"
          aside={
            !isEmailjsConfigured ? (
              <span className="tr-form__warn">
                <AlertCircle size={14} /> Email delivery not configured — WhatsApp fallback is active
              </span>
            ) : null
          }
        />

        {status === 'success' ? (
          <div className="tr-form__success" role="status">
            <span className="tr-form__success-icon">
              <CheckCircle2 size={26} />
            </span>
            <h3>Application submitted</h3>
            <p>
              Thank you. Our team will review your details and contact you on the phone number you
              shared. If you do not hear from us within a few days, send us a message on WhatsApp.
            </p>
            <div className="tr-form__success-actions">
              <a href={whatsappHref} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                Also send on WhatsApp
              </a>
              <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
                Submit another application
              </button>
            </div>
          </div>
        ) : (
          <form className="tr-form__form" onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className={`field ${fieldError('fullName') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tr-fullName">
                  Full name<span className="req">*</span>
                </label>
                <input
                  id="tr-fullName"
                  className="input"
                  value={values.fullName}
                  onChange={set('fullName')}
                  onBlur={blur('fullName')}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(fieldError('fullName'))}
                />
                {fieldError('fullName') ? <p className="field__error">{errors.fullName}</p> : null}
              </div>

              <div className={`field ${fieldError('phone') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tr-phone">
                  Phone<span className="req">*</span>
                </label>
                <input
                  id="tr-phone"
                  className="input"
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  onBlur={blur('phone')}
                  placeholder="98765 43210"
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldError('phone'))}
                />
                {fieldError('phone') ? <p className="field__error">{errors.phone}</p> : null}
              </div>

              <div className={`field ${fieldError('email') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tr-email">
                  Email<span className="req">*</span>
                </label>
                <input
                  id="tr-email"
                  className="input"
                  type="email"
                  value={values.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldError('email'))}
                />
                {fieldError('email') ? <p className="field__error">{errors.email}</p> : null}
              </div>

              <div className={`field ${fieldError('gender') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tr-gender">
                  Gender<span className="req">*</span>
                </label>
                <select
                  id="tr-gender"
                  className="select"
                  value={values.gender}
                  onChange={set('gender')}
                  onBlur={blur('gender')}
                  aria-invalid={Boolean(fieldError('gender'))}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {fieldError('gender') ? <p className="field__error">{errors.gender}</p> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tr-city">
                  City<span className="req">*</span>
                </label>
                <input
                  id="tr-city"
                  className="input"
                  value={values.city}
                  onChange={set('city')}
                  onBlur={blur('city')}
                  placeholder="Prayagraj"
                  autoComplete="address-level2"
                />
                {fieldError('city') ? <p className="field__error">{errors.city}</p> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tr-experience">
                  Experience
                </label>
                <select id="tr-experience" className="select" value={values.experience} onChange={set('experience')}>
                  <option value="">Select</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Under 1 year">Under 1 year</option>
                  <option value="1–3 years">1–3 years</option>
                  <option value="3–5 years">3–5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tr-certification">
                  Certification
                </label>
                <input
                  id="tr-certification"
                  className="input"
                  value={values.certification}
                  onChange={set('certification')}
                  placeholder="e.g. ACE CPT, K11, Gold's Gym Institute"
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tr-specialisation">
                  Specialisation
                </label>
                <select
                  id="tr-specialisation"
                  className="select"
                  value={values.specialisation}
                  onChange={set('specialisation')}
                >
                  <option value="">Select</option>
                  {trainerSpecialisations.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`field ${fieldError('role') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tr-role">
                  Preferred role<span className="req">*</span>
                </label>
                <select
                  id="tr-role"
                  className="select"
                  value={values.role}
                  onChange={set('role')}
                  onBlur={blur('role')}
                  aria-invalid={Boolean(fieldError('role'))}
                >
                  <option value="">Select</option>
                  {openPositions.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
                {fieldError('role') ? <p className="field__error">{errors.role}</p> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tr-workType">
                  Preferred work type
                </label>
                <select id="tr-workType" className="select" value={values.workType} onChange={set('workType')}>
                  <option value="">Select</option>
                  {trainerWorkTypes.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field span-2">
                <label className="field__label" htmlFor="tr-message">
                  Message
                </label>
                <textarea
                  id="tr-message"
                  className="textarea"
                  rows={4}
                  value={values.message}
                  onChange={set('message')}
                  placeholder="Tell us about your training background, availability and what you are looking for."
                />
                <span className="field__hint">Optional — but it helps us match you to the right role.</span>
              </div>

              <div className="field span-2">
                <span className="field__label">Resume (optional)</span>
                <label className="tr-form__file" htmlFor="tr-resume">
                  <Paperclip size={16} />
                  <span>{resume ? resume.name : 'Attach a PDF, JPG or PNG (max 5 MB)'}</span>
                  {resume ? (
                    <button
                      type="button"
                      className="tr-form__file-clear"
                      onClick={() => {
                        setResume(null);
                        if (fileRef.current) fileRef.current.value = '';
                      }}
                      aria-label="Remove attachment"
                    >
                      <Trash2 size={14} />
                    </button>
                  ) : null}
                </label>
                <input
                  id="tr-resume"
                  ref={fileRef}
                  className="sr-only"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={onFile}
                />
                {resumeError ? <p className="field__error">{resumeError}</p> : null}
                <span className="field__hint">
                  Attaching a resume is optional. You can also send it to us on WhatsApp after applying.
                </span>
              </div>
            </div>

            {status === 'error' && errorMessage ? (
              <div className="tr-form__error" role="alert">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <div className="tr-form__actions">
              <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="anim-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit application
                  </>
                )}
              </button>

              <a href={whatsappHref} className="btn btn--outline btn--lg" target="_blank" rel="noopener noreferrer">
                Apply on WhatsApp instead
              </a>
            </div>

            <p className="tr-form__note">
              By applying you agree to be contacted about this role. Your details are used only for
              recruitment. For anything else, reach us at {contact.email}.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
