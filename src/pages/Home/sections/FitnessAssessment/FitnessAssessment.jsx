/**
 * FitnessAssessment — the 60-second assessment.
 * Ten questions, live progress, then a written "Aarambh Starting Point"
 * that can be sent straight to WhatsApp.
 */
import { useCallback, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Send, Check } from 'lucide-react';
import { assessmentQuestions } from '../../../../data/fitnessGoals.js';
import { buildAssessmentResult, validateAnswer } from '../../../../utils/fitnessAssessment.js';
import { buildWhatsAppUrl, assessmentMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './FitnessAssessment.css';

const TOTAL = assessmentQuestions.length;

function HeightInput({ value, onChange }) {
  const unit = value?.unit || 'cm';
  return (
    <div className="assessment__height">
      <div className="segmented" role="group" aria-label="Height unit">
        {['cm', 'ft'].map((u) => (
          <button
            key={u}
            type="button"
            className={`segmented__btn ${unit === u ? 'is-active' : ''}`}
            aria-pressed={unit === u}
            onClick={() => onChange({ unit: u, ...(u === 'cm' ? { cm: value?.cm ?? '' } : { feet: value?.feet ?? '', inches: value?.inches ?? 0 }) })}
          >
            {u === 'cm' ? 'Centimetres' : 'Feet + Inches'}
          </button>
        ))}
      </div>

      {unit === 'cm' ? (
        <div className="field">
          <label className="field__label" htmlFor="assessment-height-cm">
            Height in cm
          </label>
          <input
            id="assessment-height-cm"
            className="input"
            type="number"
            inputMode="decimal"
            min="90"
            max="250"
            placeholder="172"
            value={value?.cm ?? ''}
            onChange={(e) => onChange({ unit: 'cm', cm: e.target.value })}
          />
        </div>
      ) : (
        <div className="assessment__height-fields">
          <div className="field">
            <label className="field__label" htmlFor="assessment-height-ft">
              Feet
            </label>
            <input
              id="assessment-height-ft"
              className="input"
              type="number"
              inputMode="numeric"
              min="3"
              max="8"
              placeholder="5"
              value={value?.feet ?? ''}
              onChange={(e) => onChange({ ...value, unit: 'ft', feet: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="assessment-height-in">
              Inches
            </label>
            <input
              id="assessment-height-in"
              className="input"
              type="number"
              inputMode="numeric"
              min="0"
              max="11"
              placeholder="8"
              value={value?.inches ?? ''}
              onChange={(e) => onChange({ ...value, unit: 'ft', inches: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function FitnessAssessment({ onOpenConsultation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const panelRef = useRef(null);

  const question = assessmentQuestions[Math.min(step, TOTAL - 1)];
  const value = answers[question?.id];
  const progress = done ? 100 : Math.round((step / TOTAL) * 100);

  const result = useMemo(() => (done ? buildAssessmentResult(answers) : null), [done, answers]);

  const focusPanel = useCallback(() => {
    window.setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }, []);

  const setAnswer = (next) => {
    setAnswers((prev) => ({ ...prev, [question.id]: next }));
    setError('');
  };

  const goNext = () => {
    const message = validateAnswer(question, value);
    if (message) {
      setError(message);
      return;
    }
    setError('');
    if (step + 1 >= TOTAL) {
      setDone(true);
      focusPanel();
    } else {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setError('');
    if (done) {
      setDone(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setError('');
    setDone(false);
  };

  const selectAnswer = (optionValue) => {
    setAnswer(optionValue);
    // Auto-advance on choice questions for speed.
    window.setTimeout(() => {
      const message = validateAnswer(question, optionValue);
      if (message) return;
      if (step + 1 >= TOTAL) {
        setDone(true);
        focusPanel();
      } else {
        setStep((s) => s + 1);
      }
    }, 170);
  };

  const whatsappHref = result ? buildWhatsAppUrl(assessmentMessage(result)) : '#';

  /* ------------------------------ RESULT ------------------------------ */
  if (done && result) {
    return (
      <section className="assessment section bg-800" id="fitness-assessment" aria-labelledby="assessment-title">
        <div className="container">
          <SectionHeading
            index="04 — Assessment"
            eyebrow="Your result"
            title="Your Aarambh starting point"
            id="assessment-title"
          />

          <div className="assessment__result" ref={panelRef} tabIndex={-1}>
            <div className="assessment__result-head">
              <span className="chip chip--accent">
                <Check size={13} /> Assessment complete
              </span>
              <button type="button" className="assessment__reset" onClick={reset}>
                <RotateCcw size={14} /> Retake
              </button>
            </div>

            <div className="assessment__result-grid">
              <article className="assessment__card assessment__card--lead">
                <span className="tech-label">Recommended goal</span>
                <h3 className="assessment__lead">{result.goalLabel}</h3>
                <p>{result.goal.description}</p>
                {result.targets ? (
                  <dl className="assessment__macros">
                    <div>
                      <dt>Energy</dt>
                      <dd>{result.targets.target.toLocaleString('en-IN')} kcal</dd>
                    </div>
                    <div>
                      <dt>Protein</dt>
                      <dd>{result.targets.protein} g</dd>
                    </div>
                    <div>
                      <dt>Carbs</dt>
                      <dd>{result.targets.carbs} g</dd>
                    </div>
                    <div>
                      <dt>Fat</dt>
                      <dd>{result.targets.fat} g</dd>
                    </div>
                  </dl>
                ) : null}
              </article>

              <div className="assessment__facts">
                {[
                  { label: 'Suggested frequency', value: result.frequency },
                  { label: 'Training focus', value: result.focus },
                  { label: 'Recommended service', value: result.serviceName },
                  { label: 'Coach preference', value: result.coachLabel },
                  { label: 'Typical timeline', value: result.timeline },
                ].map((row) => (
                  <div className="assessment__fact" key={row.label}>
                    <span className="tech-label">{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              </div>

              <div className="assessment__next">
                <span className="tech-label">Suggested next step</span>
                <p>{result.nextStep}</p>
                {result.tips?.length ? (
                  <ul className="tick-list tick-list--check mt-3">
                    {result.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {result.bmi ? (
              <p className="assessment__bmi">
                Screening BMI: <strong>{result.bmi}</strong> ({result.bmiCategory}).
              </p>
            ) : null}

            <div className="assessment__result-cta">
              <a
                href={whatsappHref}
                className="btn btn--whatsapp btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={16} /> Get My Fitness Plan
              </a>
              {onOpenConsultation ? (
                <button type="button" className="btn btn--outline btn--lg" onClick={onOpenConsultation}>
                  Book a consultation instead
                </button>
              ) : null}
            </div>

            <p className="assessment__disclaimer">
              These figures are general estimates from standard equations, not a medical assessment.
              Consult a qualified doctor before starting a new exercise or diet programme.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------ QUESTIONS ------------------------------ */
  return (
    <section className="assessment section bg-800" id="fitness-assessment" aria-labelledby="assessment-title">
      <div className="container">
        <SectionHeading
          index="04 — Assessment"
          eyebrow="60-second fitness assessment"
          title={['Tell us where you are.', 'We will tell you where to start.']}
          lede="Ten quick questions. No sign-up, no email required — you get a written starting point at the end."
          className="section-heading--split"
          id="assessment-title"
        />

        <div className="assessment__panel" ref={panelRef}>
          <div className="assessment__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
            <span className="assessment__progress-bar">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </span>
            <span className="assessment__progress-meta">
              <strong className="mono">
                {String(step + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </strong>
              <span className="tech-label">{question?.label}</span>
            </span>
          </div>

          <div className="assessment__stage">
            <h3 className="assessment__question" key={question.id}>
              {question.label}
            </h3>

            {question.type === 'choice' ? (
              <div className="assessment__options" role="radiogroup" aria-label={question.label}>
                {question.options.map((option) => {
                  const active = value === option.value;
                  return (
                    <button
                      type="button"
                      key={option.value}
                      role="radio"
                      aria-checked={active}
                      className={`assessment__option ${active ? 'is-active' : ''}`}
                      onClick={() => selectAnswer(option.value)}
                    >
                      <span className="assessment__option-dot" aria-hidden="true">
                        {active ? <Check size={13} /> : null}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : question.type === 'height' ? (
              <HeightInput value={value} onChange={setAnswer} />
            ) : (
              <div className="field assessment__field">
                <label className="field__label" htmlFor={`assessment-${question.id}`}>
                  {question.label} {question.unit ? `(${question.unit})` : ''}
                  <span className="req">*</span>
                </label>
                <input
                  id={`assessment-${question.id}`}
                  className="input"
                  type="number"
                  inputMode="decimal"
                  min={question.min}
                  max={question.max}
                  step={question.step || 1}
                  placeholder={question.unit === 'kg' ? '72' : '28'}
                  value={value ?? ''}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            )}

            {error ? (
              <p className="field__error" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="assessment__nav">
            <button type="button" className="btn btn--ghost btn--sm" onClick={goBack} disabled={step === 0}>
              <ArrowLeft size={15} /> Back
            </button>
            <button type="button" className="btn btn--primary" onClick={goNext}>
              {step + 1 >= TOTAL ? 'See my result' : 'Next'}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
