/**
 * BMICalculator — professional two-panel screening tool.
 * Left: inputs with unit toggle. Right: live result with a gauge, a category
 * table, the healthy-weight band for the entered height, and a next step.
 * Deliberately reads as an instrument, not a marketing block — no lifestyle
 * photo. Screening only; clear disclaimer retained.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, RotateCcw, Activity } from 'lucide-react';
import { calculateBMI, feetInchesToCm, CATEGORIES, SCALE_MIN, SCALE_MAX, BMI_DISCLAIMER } from '../../../../utils/bmiCalculator.js';
import { buildWhatsAppUrl, bmiMessage } from '../../../../utils/whatsapp.js';
import { goalById } from '../../../../data/fitnessGoals.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './BMICalculator.css';

const TONE_CLASS = { ok: 'is-ok', warn: 'is-warn', danger: 'is-danger' };

const RANGE_TEXT = {
  underweight: 'Below 18.5',
  normal: '18.5 – 24.9',
  overweight: '25.0 – 29.9',
  obese: '30.0 and above',
};

export default function BMICalculator() {
  const [unit, setUnit] = useState('cm');
  const [cm, setCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [touched, setTouched] = useState({});

  const heightCm = unit === 'cm' ? Number(cm) : feetInchesToCm(feet, inches);
  const heightText = unit === 'cm' ? `${cm} cm` : `${feet}'${inches || 0}" (${heightCm} cm)`;

  const fieldErrors = useMemo(() => {
    const next = {};
    if (heightCm && (heightCm < 90 || heightCm > 250)) next.height = 'Height should be between 90 and 250 cm.';
    if (weight && (Number(weight) < 20 || Number(weight) > 400)) next.weight = 'Weight should be between 20 and 400 kg.';
    if (age && (Number(age) < 12 || Number(age) > 90)) next.age = 'Age should be between 12 and 90.';
    return next;
  }, [heightCm, weight, age]);

  /* Live result once the core numbers are present and sane. */
  const result = useMemo(() => {
    if (!heightCm || !weight || fieldErrors.height || fieldErrors.weight) return null;
    const calc = calculateBMI({ heightCm, weightKg: Number(weight), age: Number(age) || undefined, gender });
    return calc.valid ? calc : null;
  }, [heightCm, weight, age, gender, fieldErrors]);

  const recommendedGoal = result ? goalById(result.advice.goal) : null;

  const whatsapp = useMemo(() => {
    if (!result) return '#';
    return buildWhatsAppUrl(
      bmiMessage({
        heightText,
        weight: Number(weight),
        age: Number(age),
        gender: gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Not specified',
        bmi: result.bmi,
        category: result.category,
      })
    );
  }, [result, heightText, weight, age, gender]);

  const reset = () => {
    setCm('');
    setFeet('');
    setInches('');
    setWeight('');
    setAge('');
    setGender('');
    setTouched({});
  };

  const err = (k) => (touched[k] ? fieldErrors[k] : '');

  return (
    <section className="bmi section bg-900" id="bmi-calculator" aria-labelledby="bmi-title">
      <div className="container">
        <SectionHeading
          index="05 — BMI"
          eyebrow="Body Mass Index"
          title="Know your starting number"
          lede="BMI is a rough screening figure. It will not tell you about muscle, bone or body fat — but it is a useful, honest place to begin."
          align="center"
          id="bmi-title"
        />

        <div className="bmi__card">
          {/* ---- inputs ---- */}
          <div className="bmi__inputs">
            <span className="bmi__panel-tag">
              <Activity size={14} aria-hidden="true" /> Your details
            </span>

            <div className="field">
              <span className="field__label" id="bmi-unit-label">Height unit</span>
              <div className="segmented" role="group" aria-labelledby="bmi-unit-label">
                {[
                  { id: 'cm', label: 'Centimetres' },
                  { id: 'ft', label: 'Feet + Inches' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`segmented__btn ${unit === opt.id ? 'is-active' : ''}`}
                    aria-pressed={unit === opt.id}
                    onClick={() => setUnit(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {unit === 'cm' ? (
              <div className={`field ${err('height') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="bmi-cm">
                  Height (cm)<span className="req">*</span>
                </label>
                <input id="bmi-cm" className="input" type="number" inputMode="decimal" min="90" max="250" placeholder="172" value={cm} onChange={(e) => setCm(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, height: true }))} aria-invalid={Boolean(err('height'))} />
                {err('height') ? <p className="field__error">{fieldErrors.height}</p> : null}
              </div>
            ) : (
              <div className={`bmi__row ${err('height') ? 'field--error' : ''}`}>
                <div className="field">
                  <label className="field__label" htmlFor="bmi-ft">Feet<span className="req">*</span></label>
                  <input id="bmi-ft" className="input" type="number" inputMode="numeric" min="3" max="8" placeholder="5" value={feet} onChange={(e) => setFeet(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, height: true }))} />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="bmi-in">Inches</label>
                  <input id="bmi-in" className="input" type="number" inputMode="numeric" min="0" max="11" placeholder="8" value={inches} onChange={(e) => setInches(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, height: true }))} />
                </div>
                {err('height') ? <p className="field__error">{fieldErrors.height}</p> : null}
              </div>
            )}

            <div className={`field ${err('weight') ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="bmi-weight">Weight (kg)<span className="req">*</span></label>
              <input id="bmi-weight" className="input" type="number" inputMode="decimal" min="20" max="400" step="0.5" placeholder="72" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, weight: true }))} aria-invalid={Boolean(err('weight'))} />
              {err('weight') ? <p className="field__error">{fieldErrors.weight}</p> : null}
            </div>

            <div className="bmi__row">
              <div className={`field ${err('age') ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="bmi-age">Age</label>
                <input id="bmi-age" className="input" type="number" inputMode="numeric" min="12" max="90" placeholder="28" value={age} onChange={(e) => setAge(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, age: true }))} aria-invalid={Boolean(err('age'))} />
                {err('age') ? <p className="field__error">{fieldErrors.age}</p> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="bmi-gender">Gender</label>
                <select id="bmi-gender" className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Optional</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
              </div>
            </div>

            <button type="button" className="bmi__reset" onClick={reset}>
              <RotateCcw size={14} /> Clear and start over
            </button>
          </div>

          {/* ---- result ---- */}
          <div className={`bmi__result ${result ? TONE_CLASS[result.tone] : ''}`} role="status" aria-live="polite">
            {result ? (
              <>
                <div className="bmi__score-row">
                  <div className="bmi__score">
                    <span className="bmi__score-value">{result.bmi}</span>
                    <span className="bmi__score-unit">kg/m²</span>
                  </div>
                  <span className="bmi__category">{result.category}</span>
                </div>

                {/* gauge */}
                <div className="bmi__gauge" aria-hidden="true">
                  <span className="bmi__gauge-track">
                    {CATEGORIES.map((cat) => {
                      const width = ((Math.min(cat.max, SCALE_MAX) - Math.max(cat.min, SCALE_MIN)) / (SCALE_MAX - SCALE_MIN)) * 100;
                      return <span key={cat.id} className={`bmi__gauge-seg seg-${cat.id}`} style={{ width: `${width}%` }} />;
                    })}
                  </span>
                  <span className="bmi__gauge-marker" style={{ left: `${result.position}%` }}>
                    <span className="bmi__gauge-pin" />
                  </span>
                </div>

                {/* category table */}
                <div className="bmi__table">
                  {CATEGORIES.map((cat) => (
                    <div className={`bmi__table-row ${cat.id === result.categoryId ? 'is-active' : ''}`} key={cat.id}>
                      <span className={`bmi__dot tone-${cat.tone}`} aria-hidden="true" />
                      <span className="bmi__table-label">{cat.label}</span>
                      <span className="bmi__table-range">{RANGE_TEXT[cat.id]}</span>
                    </div>
                  ))}
                </div>

                <div className="bmi__range">
                  <span className="tech-label">Healthy weight for your height</span>
                  <strong>
                    {result.healthyMin} – {result.healthyMax} kg
                  </strong>
                </div>

                <p className="bmi__summary">{result.advice.summary}</p>

                <div className="bmi__next">
                  <span className="tech-label">Recommended next step</span>
                  <p>{result.advice.nextStep}</p>
                  {recommendedGoal ? (
                    <p className="bmi__goal">
                      Suggested focus: <strong>{recommendedGoal.label}</strong>
                    </p>
                  ) : null}
                </div>

                <div className="bmi__cta">
                  <a href={whatsapp} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                    <MessageSquare size={16} /> Get Personal Guidance
                  </a>
                  <Link to="/consultation" className="btn btn--outline">
                    Book a consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </>
            ) : (
              <div className="bmi__empty">
                <span className="bmi__empty-icon" aria-hidden="true">
                  <Activity size={26} />
                </span>
                <h3>Your result appears here</h3>
                <p>
                  Enter your height and weight and we will show your BMI, where it sits on the scale,
                  the healthy weight band for your height and a sensible next step.
                </p>
                <ul className="bmi__empty-points">
                  <li>BMI value and category</li>
                  <li>Position on the standard scale</li>
                  <li>Healthy weight range for your height</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="bmi__disclaimer">{BMI_DISCLAIMER}</p>
      </div>
    </section>
  );
}
