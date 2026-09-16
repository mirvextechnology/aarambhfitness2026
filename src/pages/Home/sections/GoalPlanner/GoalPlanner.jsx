/**
 * GoalPlanner — pick a goal, get a matched training style, frequency,
 * service and plan category. Fully interactive, data-driven.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, Target } from 'lucide-react';
import { goals } from '../../../../data/fitnessGoals.js';
import { serviceById } from '../../../../data/services.js';
import { planByTier } from '../../../../data/plans.js';
import { ptPlanById } from '../../../../data/ptPlans.js';
import { buildWhatsAppUrl, goalMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './GoalPlanner.css';

export default function GoalPlanner() {
  const [activeId, setActiveId] = useState(goals[0].id);
  const active = useMemo(() => goals.find((g) => g.id === activeId) || goals[0], [activeId]);
  const service = serviceById(active.service);
  const recommendedPlan =
    active.planCategory === 'pt' ? ptPlanById(active.planTier) : planByTier(active.planTier);
  // Never render a blank cell if a plan reference is missing or renamed.

  const whatsapp = buildWhatsAppUrl(
    goalMessage({ ...active, serviceName: service?.name }, { 'Plan Category': recommendedPlan?.name })
  );

  return (
    <section className="goal-planner section bg-800" id="goal-planner" aria-labelledby="goal-planner-title">
      <div className="container">
        <SectionHeading
          index="06 — Goals"
          eyebrow="Goal planner"
          title="Pick the goal. We will match the plan."
          lede="Every goal needs a different programme. Choose yours and see the training style, frequency and service we would start you on."
          className="section-heading--split"
          id="goal-planner-title"
        />

        <div className="goal-planner__layout">
          {/* selector */}
          <div className="goal-planner__selector" role="radiogroup" aria-label="Fitness goal">
            {goals.map((goal) => {
              const isActive = goal.id === activeId;
              return (
                <button
                  key={goal.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  className={`goal-chip ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveId(goal.id)}
                >
                  <span className="goal-chip__dot" aria-hidden="true">
                    <Target size={13} />
                  </span>
                  <span className="goal-chip__label">{goal.label}</span>
                </button>
              );
            })}
          </div>

          {/* detail */}
          <article className="goal-planner__detail" key={active.id}>
            <header className="goal-planner__detail-head">
              <span className="tech-label">Selected goal</span>
              <h3 className="goal-planner__detail-title">{active.label}</h3>
              <p className="goal-planner__detail-desc">{active.description}</p>
            </header>

            <dl className="goal-planner__specs">
              <div>
                <dt>Training style</dt>
                <dd>{active.trainingStyle}</dd>
              </div>
              <div>
                <dt>Suggested frequency</dt>
                <dd>{active.frequency}</dd>
              </div>
              <div>
                <dt>Recommended service</dt>
                <dd>{service?.name}</dd>
              </div>
              <div>
                <dt>Suggested plan</dt>
                <dd>{recommendedPlan?.name || 'Contact for plan details'}</dd>
              </div>
              <div>
                <dt>Typical timeline</dt>
                <dd>{active.timeline}</dd>
              </div>
              <div>
                <dt>First focus</dt>
                <dd>{active.focus}</dd>
              </div>
            </dl>

            <ul className="tick-list tick-list--check">
              {active.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <div className="goal-planner__cta">
              <a href={whatsapp} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                <Send size={16} /> Start with this goal
              </a>
              <Link to="/consultation" className="btn btn--outline">
                Book a consultation <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
