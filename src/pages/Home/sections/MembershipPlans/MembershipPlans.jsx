/**
 * MembershipPlans — START / TRANSFORM / ELITE.
 * Pricing is read from data/plans.js; when unset the card shows
 * "Contact for plan details" instead of an invented number.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageSquare, Minus, Sparkles } from 'lucide-react';
import { plans, formatPlanPrice } from '../../../../data/plans.js';
import { buildWhatsAppUrl, planMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './MembershipPlans.css';

function PlanCard({ plan, index }) {
  const price = formatPlanPrice(plan);
  const whatsapp = buildWhatsAppUrl(
    planMessage(plan.name, {
      Plan: plan.name,
      Audience: plan.audience,
      'Price shown on site': price.isAvailable ? `${price.amount} ${price.period}` : 'Not published',
    })
  );

  return (
    <Reveal as="article" variant="up" delay={index * 0.09} className={`plan ${plan.highlight ? 'plan--featured' : ''}`}>
      {plan.badge ? (
        <span className="plan__badge">
          {plan.highlight ? <Sparkles size={12} /> : null}
          {plan.badge}
        </span>
      ) : null}

      <header className="plan__head">
        <h3 className="plan__name">{plan.name}</h3>
        <p className="plan__tagline">{plan.tagline}</p>
      </header>

      <div className="plan__price">
        {price.isAvailable ? (
          <>
            <strong className="plan__amount">{price.amount}</strong>
            <span className="plan__period">{price.period}</span>
          </>
        ) : (
          <span className="plan__contact">Contact for plan details</span>
        )}
      </div>

      {plan.durationOptions?.length ? (
        <div className="plan__durations">
          {plan.durationOptions.map((d) => (
            <span className="chip" key={d}>
              {d}
            </span>
          ))}
        </div>
      ) : null}

      <ul className="plan__features" role="list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={14} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
        {plan.notIncluded?.map((feature) => (
          <li className="plan__feature--off" key={feature}>
            <Minus size={14} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="plan__cta">
        <a href={whatsapp} className="btn btn--whatsapp btn--block" target="_blank" rel="noopener noreferrer">
          <MessageSquare size={15} /> {plan.cta.label}
        </a>
        <Link to="/plans" className="plan__link">
          Compare all plans <ArrowRight size={13} />
        </Link>
      </div>
    </Reveal>
  );
}

export default function MembershipPlans() {
  return (
    <section className="plans section bg-800" id="membership-plans" aria-labelledby="plans-title">
      <div className="container">
        <SectionHeading
          index="08 — Membership"
          eyebrow="Gym membership"
          title={['Three ways to', 'train with us.']}
          lede="Every plan includes a written training plan and floor support. Choose the level of coaching and review you want."
          className="section-heading--split"
          id="plans-title"
          aside={
            <Link to="/plans" className="btn btn--outline">
              Full plan comparison <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="plans__grid">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <p className="plans__note">
          Pricing is shared directly by our team so it always reflects current offers and duration
          discounts. Nothing here is a final quote.
        </p>
      </div>
    </section>
  );
}
