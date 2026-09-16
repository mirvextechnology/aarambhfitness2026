/** GymPlans — START / TRANSFORM / ELITE on the plans page. */
import { Link } from 'react-router-dom';
import { Check, MessageSquare, Minus, Sparkles } from 'lucide-react';
import { plans, formatPlanPrice } from '../../../../data/plans.js';
import { buildWhatsAppUrl, planMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './GymPlans.css';

export default function GymPlans() {
  return (
    <section className="gym-plans section bg-900" id="gym-plans" aria-labelledby="gym-plans-title">
      <div className="container">
        <SectionHeading
          index="01 — Gym Membership"
          eyebrow="Monthly, quarterly or yearly"
          title={['Gym membership', 'plans.']}
          lede="All three include gym access, a written training plan and floor support. The difference is how much coaching and how often the plan is reviewed."
          className="section-heading--split"
          id="gym-plans-title"
          aside={
            <a href="#plan-comparison" className="btn btn--outline btn--sm">
              Compare plans
            </a>
          }
        />

        <div className="gym-plans__grid">
          {plans.map((plan, i) => {
            const price = formatPlanPrice(plan);
            return (
              <Reveal
                as="article"
                variant="up"
                delay={i * 0.09}
                className={`gym-plan ${plan.highlight ? 'gym-plan--featured' : ''}`}
                key={plan.id}
              >
                {plan.badge ? (
                  <span className="gym-plan__badge">
                    {plan.highlight ? <Sparkles size={12} /> : null}
                    {plan.badge}
                  </span>
                ) : null}

                <header className="gym-plan__head">
                  <h3 className="gym-plan__name">{plan.name}</h3>
                  <p className="gym-plan__tagline">{plan.tagline}</p>
                  <p className="gym-plan__desc">{plan.description}</p>
                </header>

                <div className="gym-plan__price">
                  {price.isAvailable ? (
                    <>
                      <strong>{price.amount}</strong>
                      <span>{price.period}</span>
                    </>
                  ) : (
                    <span className="gym-plan__contact">Contact for plan details</span>
                  )}
                </div>

                <div className="gym-plan__durations">
                  {plan.durationOptions.map((d) => (
                    <span className="chip" key={d}>
                      {d}
                    </span>
                  ))}
                </div>

                <div className="gym-plan__audience">
                  <span className="tech-label">Best for</span>
                  <p>{plan.audience}</p>
                </div>

                <ul className="gym-plan__features" role="list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={14} aria-hidden="true" /> <span>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((f) => (
                    <li className="gym-plan__feature--off" key={f}>
                      <Minus size={14} aria-hidden="true" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="gym-plan__cta">
                  <a
                    href={buildWhatsAppUrl(planMessage(plan.name, { Plan: plan.name, Audience: plan.audience }))}
                    className="btn btn--whatsapp btn--block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare size={15} /> {plan.cta.label}
                  </a>
                  <Link to="/contact" className="gym-plan__link">
                    Or send an enquiry
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
