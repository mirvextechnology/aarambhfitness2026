/**
 * Consultation — nine-step consultation request flow.
 * Steps 02 and 03 adapt to the service chosen in step 01 (see
 * data/consultationFlow.js), so a diet enquiry is not asked for a coach and a
 * security enquiry is not offered gym goals. Submission via EmailJS with a
 * WhatsApp fallback. This is a REQUEST, never a confirmed booking.
 */
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

import SEO from '../../components/SEO/SEO.jsx';
import ConsultationHero from './sections/ConsultationHero/ConsultationHero.jsx';
import ServiceSelection from './sections/ServiceSelection/ServiceSelection.jsx';
import GoalSelection from './sections/GoalSelection/GoalSelection.jsx';
import CoachSelection from './sections/CoachSelection/CoachSelection.jsx';
import ConsultationCalendar, { TimeSelection } from './sections/ConsultationCalendar/ConsultationCalendar.jsx';
import { DetailsForm, RequirementsForm } from './sections/ConsultationDetails/ConsultationDetails.jsx';
import ConsultationSummary from './sections/ConsultationSummary/ConsultationSummary.jsx';
import ConsultationSuccess from './sections/ConsultationSuccess/ConsultationSuccess.jsx';

import { services, serviceById } from '../../data/services.js';
import { getServiceFlow } from '../../data/consultationFlow.js';
import { sendEmail, showSuccess, showFailure, showWhatsAppFallback } from '../../utils/emailSender.js';
import { buildWhatsAppUrl, consultationMessage } from '../../utils/whatsapp.js';
import {
  fromISODate,
  formatDateShort,
  formatSlot,
  isRequired,
  isValidPhone,
  isValidEmail,
  isValidAge,
  runValidators,
} from '../../utils/bookingHelpers.js';
import './sections/ConsultationCalendar/ConsultationCalendar.css';
import './sections/ConsultationSteps.css';
import './Consultation.css';

const INITIAL = {
  service: '',
  goal: '',
  preference: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  location: '',
  requirements: '',
};

const detailValidators = {
  name: (v) => (!isRequired(v) ? 'Enter your name.' : v.trim().length < 3 ? 'Name looks too short.' : ''),
  phone: (v) => (!isValidPhone(v) ? 'Enter a valid phone number.' : ''),
  email: (v) => (!isValidEmail(v) ? 'Enter a valid email address.' : ''),
  age: (v) => (!isValidAge(v) ? 'Enter an age between 12 and 90.' : ''),
  gender: (v) => (!isRequired(v) ? 'Select your gender.' : ''),
  location: (v) => (!isRequired(v) ? 'Enter your location.' : ''),
};

export default function Consultation() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [maxStep, setMaxStep] = useState(0);

  /* Steps 02/03 copy and options follow the selected service. */
  const flow = getServiceFlow(values.service);

  const steps = [
    { id: 'service', label: 'Service' },
    { id: 'goal', label: flow.goal.short },
    { id: 'preference', label: flow.preference.short },
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'details', label: 'Your details' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'review', label: 'Review & submit' },
  ];

  const stepCopy = [
    { title: 'Which service are you interested in?', copy: 'This shapes the next two questions — you can change it any time.' },
    { title: flow.goal.title, copy: flow.goal.copy },
    { title: flow.preference.title, copy: flow.preference.copy },
    { title: 'Pick a preferred date', copy: 'Greyed-out dates have no available request windows.' },
    { title: 'Pick a preferred time', copy: 'Times are shown in IST.' },
    { title: 'Your details', copy: 'So we know who to call back.' },
    { title: 'Anything we should know?', copy: 'Timing constraints, questions or context that helps us prepare.' },
    { title: 'Review and submit', copy: 'Check everything, then send your request.' },
  ];

  const set = (key) => (value) => setValues((prev) => ({ ...prev, [key]: value }));

  /* Choosing a different service invalidates the dependent answers. */
  const selectService = (id) => setValues((prev) => ({ ...prev, service: id, goal: '', preference: '' }));

  const setField = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched) setErrors(runValidators(next, detailValidators));
  };
  const blurField = (key) => () => {
    setTouched(true);
    setErrors(runValidators(values, detailValidators));
  };

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(values.service);
      case 1:
        return Boolean(values.goal);
      case 2:
        return Boolean(values.preference);
      case 3:
        return Boolean(values.date);
      case 4:
        return Boolean(values.time);
      case 5:
        return Object.keys(runValidators(values, detailValidators)).length === 0;
      default:
        return true;
    }
  }, [step, values]);

  const goTo = (next) => {
    const clamped = Math.min(Math.max(next, 0), steps.length - 1);
    setStep(clamped);
    setMaxStep((m) => Math.max(m, clamped));
    window.scrollTo({ top: document.getElementById('consultation-flow')?.offsetTop - 90 || 0, behavior: 'smooth' });
  };

  const next = () => {
    if (step === 5) {
      setTouched(true);
      const found = runValidators(values, detailValidators);
      setErrors(found);
      if (Object.keys(found).length) {
        document.getElementById('cons-name')?.focus();
        return;
      }
    }
    goTo(step + 1);
  };

  const back = () => goTo(step - 1);

  /* ---- human-readable summary ---- */
  const summary = useMemo(() => {
    const service = serviceById(values.service);
    const goalOpt = flow.goal.options.find((o) => o.value === values.goal);
    const prefOpt = flow.preference.options.find((o) => o.value === values.preference);
    const date = fromISODate(values.date);
    return {
      serviceName: service?.name || '',
      goalTitle: flow.goal.short,
      goalLabel: goalOpt?.label || '',
      prefTitle: flow.preference.title,
      prefShort: flow.preference.short,
      prefLabel: prefOpt?.label || '',
      dateText: date ? formatDateShort(date) : '',
      timeText: values.time ? formatSlot(values.time) : '',
      name: values.name,
      phone: values.phone,
      email: values.email,
      age: values.age,
      gender: values.gender,
      location: values.location,
      requirements: values.requirements,
    };
  }, [values, flow]);

  const bookingPayload = {
    ...summary,
    service: summary.serviceName,
    goal: summary.goalLabel,
    preference: summary.prefLabel,
    preferenceTitle: summary.prefShort,
    date: summary.dateText,
    time: summary.timeText,
    type: 'Consultation Request',
  };

  const whatsappHref = buildWhatsAppUrl(consultationMessage(bookingPayload));

  const submit = async () => {
    setStatus('sending');
    setErrorMessage('');

    const result = await sendEmail(bookingPayload, { context: 'consultation' });

    if (result.ok) {
      setStatus('success');
      setSubmitted(true);
      await showSuccess({
        title: 'Request submitted',
        text: 'Your consultation request has been sent. Our team will contact you to confirm availability.',
        whatsappText: consultationMessage(bookingPayload),
      });
      return;
    }

    if (result.reason === 'not-configured') {
      const opened = await showWhatsAppFallback({
        title: 'Send your request on WhatsApp',
        whatsappText: consultationMessage(bookingPayload),
      });
      if (opened) {
        setStatus('success');
        setSubmitted(true);
      } else {
        setStatus('idle');
        setErrorMessage('');
      }
      return;
    }

    setStatus('error');
    setErrorMessage('We could not send your request right now. Please try again, or continue on WhatsApp so nothing is lost.');

    await showFailure({
      title: 'Could not send',
      text: 'The submission failed. Please try again or continue on WhatsApp.',
      whatsappText: consultationMessage(bookingPayload),
      onRetry: submit,
    });
  };

  const reset = () => {
    setValues(INITIAL);
    setStep(0);
    setMaxStep(0);
    setSubmitted(false);
    setStatus('idle');
    setTouched(false);
    setErrors({});
  };

  const progress = submitted ? 100 : Math.round(((step + (stepValid ? 1 : 0)) / steps.length) * 100);

  return (
    <>
      <SEO
        path="/consultation"
        title="Book a Fitness Consultation — Aarambh Fitness Kaurihar, Prayagraj"
        description="Request a fitness consultation with Aarambh Fitness in Kaurihar, Prayagraj. Choose your service, goal, preference, date and time in a few simple steps."
        keywords="fitness consultation Prayagraj, gym consultation Kaurihar, personal training consultation, book fitness assessment"
      />

      <ConsultationHero totalSteps={steps.length} />

      <section className="cons section bg-900" id="consultation-flow" aria-labelledby="cons-flow-title">
        <h2 className="sr-only" id="cons-flow-title">
          Consultation request form
        </h2>

        <div className="container cons-flow">
          {/* rail */}
          <aside className="cons-rail" aria-label="Consultation steps">
            <span className="cons-rail__title">Your progress</span>

            <div className="cons-rail__list">
              {steps.map((item, i) => {
                const isDone = i < maxStep && i < step;
                const reachable = i <= maxStep && !submitted;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`cons-rail__item ${i === step && !submitted ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    onClick={() => reachable && goTo(i)}
                    disabled={!reachable}
                    aria-current={i === step && !submitted ? 'step' : undefined}
                  >
                    <span className="cons-rail__num">{isDone ? <Check size={12} /> : String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="cons-rail__progress">
              <span>
                <span style={{ transform: `scaleX(${progress / 100})` }} />
              </span>
              <strong className="mono">
                {submitted ? 'Complete' : `${Math.min(step + 1, steps.length)} of ${steps.length}`}
              </strong>
            </div>
          </aside>

          {/* panel */}
          <div className="cons-panel">
            {submitted ? (
              <ConsultationSuccess summary={summary} whatsappHref={whatsappHref} onReset={reset} />
            ) : (
              <>
                <header className="cons-step__head">
                  <span className="section-index">
                    Step {String(step + 1).padStart(2, '0')} — {steps[step].label}
                  </span>
                  <h2>{stepCopy[step].title}</h2>
                  <p>{stepCopy[step].copy}</p>
                </header>

                <div className="cons-body" key={steps[step].id}>
                  {step === 0 ? <ServiceSelection value={values.service} onSelect={selectService} /> : null}
                  {step === 1 ? <GoalSelection value={values.goal} onSelect={set('goal')} options={flow.goal.options} /> : null}
                  {step === 2 ? <CoachSelection value={values.preference} onSelect={set('preference')} config={flow.preference} /> : null}
                  {step === 3 ? <ConsultationCalendar value={values.date} onSelect={set('date')} /> : null}
                  {step === 4 ? <TimeSelection dateISO={values.date} value={values.time} onSelect={set('time')} /> : null}
                  {step === 5 ? (
                    <DetailsForm values={values} errors={errors} touched={touched} onChange={setField} onBlur={blurField} />
                  ) : null}
                  {step === 6 ? <RequirementsForm value={values.requirements} onChange={setField} /> : null}
                  {step === 7 ? (
                    <ConsultationSummary summary={summary} onEdit={goTo} onSubmit={submit} status={status} errorMessage={errorMessage} />
                  ) : null}
                </div>

                {step < 7 ? (
                  <div className="cons-nav">
                    <button type="button" className="btn btn--ghost" onClick={back} disabled={step === 0}>
                      <ArrowLeft size={15} /> Back
                    </button>
                    <span className="cons-nav__hint">{stepValid ? 'Ready to continue' : 'Make a selection to continue'}</span>
                    <button type="button" className="btn btn--primary" onClick={next} disabled={!stepValid}>
                      {step === 6 ? 'Review' : 'Continue'} <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="cons-nav">
                    <button type="button" className="btn btn--ghost" onClick={back}>
                      <ArrowLeft size={15} /> Back
                    </button>
                    <a href={whatsappHref} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                      Send on WhatsApp instead
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* quick reference so the page is useful even mid-flow */}
      <section className="cons-services section bg-800" aria-labelledby="cons-services-title">
        <div className="container">
          <h2 className="cons-services__title" id="cons-services-title">
            Not sure which service to pick?
          </h2>
          <ul className="cons-services__list" role="list">
            {services.map((service) => (
              <li key={service.id}>
                <span className="cons-services__num">{service.number}</span>
                <strong>{service.name}</strong>
                <em>{service.tagline}</em>
              </li>
            ))}
          </ul>
          <p className="cons-services__note">
            If you are completely unsure, choose <strong>Fitness Consultation</strong> — that session exists precisely to work this out with you.
          </p>
        </div>
      </section>
    </>
  );
}
