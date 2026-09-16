/**
 * FindYourPlan — three-question interactive recommender.
 * Logic lives in utils (recommendPlan) so it can be tested in isolation.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, RotateCcw, Send, Sparkles } from 'lucide-react';
import { planFinderQuestions, recommendPlan, ptPlanById } from '../../../../data/ptPlans.js';
import { planByTier } from '../../../../data/plans.js';
import { buildWhatsAppUrl, planMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './FindYourPlan.css';

export default function FindYourPlan() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const question = planFinderQuestions[Math.min(step, planFinderQuestions.length - 1)];
  const progress = done ? 100 : Math.round((step / planFinderQuestions.length) * 100);

  const recommendation = useMemo(
    () => (done ? recommendPlan(answers) : null),
    [done, answers]
  );

  const recommended = useMemo(() => {
    if (!recommendation) return null;
    return recommendation.category === 'pt'
      ? { ...ptPlanById(recommendation.tier), category: 'Personal Training' }
      : { ...planByTier(recommendation.tier), category: 'Gym Membership' };
  }, [recommendation]);

  const pick = (value) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step + 1 >= planFinderQuestions.length) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const whatsapp = recommended
    ? buildWhatsAppUrl(
        planMessage(recommended.name, {
          Category: recommended.category,
          'My Goal': planFinderQuestions[0].options.find((o) => o.value === answers.goal)?.label,
          'Training Location': planFinderQuestions[1].options.find((o) => o.value === answers.location)?.label,
          'Attention Needed': planFinderQuestions[2].options.find((o) => o.value === answers.attention)?.label,
        })
      )
    : '#';

  return (
    <section className="finder section bg-800" id="find-your-plan" aria-labelledby="finder-title">
      <div className="container">
        <SectionHeading
          index="04 — Recommender"
          eyebrow="Find your plan"
          title={['Three questions.', 'One honest recommendation.']}
          lede="Tell us your goal, where you want to train and how much attention you need. We will point you at the right category."
          className="section-heading--split"
          id="finder-title"
        />

        <div className="finder__panel">
          {done && recommended ? (
            <div className="finder__result">
              <span className="chip chip--accent">
                <Sparkles size={13} /> Your match
              </span>

              <div className="finder__result-grid">
                <div>
                  <span className="tech-label">{recommended.category}</span>
                  <h3 className="finder__result-name">{recommended.name}</h3>
                  <p className="finder__result-reason">{recommendation.reason}</p>
                  {recommended.tagline ? (
                    <p className="finder__result-tagline">{recommended.tagline}</p>
                  ) : null}
                </div>

                <div className="finder__result-actions">
                  <a href={whatsapp} className="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
                    <Send size={16} /> Enquire about {recommended.name}
                  </a>
                  <Link to="/consultation" className="btn btn--outline btn--lg">
                    Book a consultation <ArrowRight size={15} />
                  </Link>
                  <button type="button" className="finder__reset" onClick={reset}>
                    <RotateCcw size={14} /> Start over
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="finder__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <span>
                  <span style={{ transform: `scaleX(${progress / 100})` }} />
                </span>
                <strong className="mono">
                  {String(step + 1).padStart(2, '0')} / {String(planFinderQuestions.length).padStart(2, '0')}
                </strong>
              </div>

              <div className="finder__stage" key={question.id}>
                <h3 className="finder__question">{question.question}</h3>
                <div className="finder__options" role="radiogroup" aria-label={question.question}>
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={answers[question.id] === option.value}
                      className={`finder__option ${answers[question.id] === option.value ? 'is-active' : ''}`}
                      onClick={() => pick(option.value)}
                    >
                      <Check size={14} aria-hidden="true" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {step > 0 ? (
                <button type="button" className="btn btn--ghost btn--sm finder__back" onClick={() => setStep((s) => s - 1)}>
                  Back
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
