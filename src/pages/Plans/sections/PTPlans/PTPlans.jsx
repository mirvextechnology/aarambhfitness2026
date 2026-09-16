/** PTPlans — personal training options, presented as wide editorial rows. */
import { Check, MessageSquare } from 'lucide-react';
import { ptPlans, formatPlanPrice } from '../../../../data/ptPlans.js';
import { buildWhatsAppUrl, planMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './PTPlans.css';

export default function PTPlans() {
  return (
    <section className="pt-plans section bg-800" id="pt-plans" aria-labelledby="pt-plans-title">
      <div className="container">
        <SectionHeading
          index="02 — Personal Training"
          eyebrow="Coached programmes"
          title={['Personal training', 'options.']}
          lede="Choose based on where you want to train and how structured you want the block to be. Male and female coaches are available for all three."
          className="section-heading--split"
          id="pt-plans-title"
          aside={
            <a href="#plan-comparison" className="btn btn--outline btn--sm">
              Compare options
            </a>
          }
        />

        <div className="pt-plans__list">
          {ptPlans.map((plan, i) => {
            const price = formatPlanPrice(plan);
            return (
              <Reveal as="article" variant="up" delay={i * 0.08} className={`pt-plan ${plan.highlight ? 'pt-plan--featured' : ''}`} key={plan.id} id={plan.id}>
                <div className="pt-plan__left">
                  <span className="pt-plan__num big-number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-plan__id">
                    <h3 className="pt-plan__name">{plan.name}</h3>
                    <p className="pt-plan__tagline">{plan.tagline}</p>
                    <span className="pt-plan__location">{plan.location}</span>
                  </div>
                </div>

                <p className="pt-plan__desc">{plan.description}</p>

                <ul className="pt-plan__features" role="list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={13} aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-plan__right">
                  <div className="pt-plan__price">
                    {price.isAvailable ? (
                      <>
                        <strong>{price.amount}</strong>
                        <span>{price.period}</span>
                      </>
                    ) : (
                      <span className="pt-plan__contact">Contact for details</span>
                    )}
                  </div>

                  <div className="pt-plan__sessions">
                    {plan.sessionOptions.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="pt-plan__ideal">
                    <span className="tech-label">Ideal for</span>
                    {plan.idealFor}
                  </p>

                  <a
                    href={buildWhatsAppUrl(planMessage(plan.name, { Programme: plan.name, Location: plan.location }))}
                    className="btn btn--whatsapp btn--block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare size={15} /> {plan.cta.label}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
