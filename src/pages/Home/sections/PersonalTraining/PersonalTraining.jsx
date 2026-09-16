/**
 * PersonalTraining — "Train with purpose."
 * Role-based coach cards (not invented people) + coach preference CTA.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { coachRoles } from '../../../../data/trainers.js';
import { ptPlans } from '../../../../data/ptPlans.js';
import { coachOptions } from '../../../../data/fitnessGoals.js';
import { buildWhatsAppUrl, coachMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './PersonalTraining.css';

export default function PersonalTraining() {
  return (
    <section className="pt section bg-900" id="personal-training" aria-labelledby="pt-title">
      <div className="container">
        <SectionHeading
          index="09 — Personal Training"
          eyebrow="One coach. One plan."
          title={['Train with purpose.']}
          lede="A dedicated coach writes your programme, watches every rep and adjusts the plan as you improve. Available in the gym or at your home."
          className="section-heading--split"
          id="pt-title"
          aside={
            <Link to="/plans#pt-plans" className="btn btn--outline">
              PT plan options <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="pt__grid">
          {/* coach roles */}
          <div className="pt__coaches">
            {coachRoles.map((coach, i) => (
              <Reveal as="article" variant="scale" delay={i * 0.1} className="pt-coach" key={coach.id}>
                <span className="pt-coach__media">
                  <img
                    src={coach.image}
                    alt={coach.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                  />
                  <span className="pt-coach__scrim" aria-hidden="true" />
                </span>
                <span className="pt-coach__body">
                  <span className="tech-label">{coach.role}</span>
                  <h3 className="pt-coach__title">{coach.title}</h3>
                  <span className="pt-coach__focus">
                    {coach.focus.map((f) => (
                      <span className="chip" key={f}>
                        {f}
                      </span>
                    ))}
                  </span>
                  <a
                    href={buildWhatsAppUrl(coachMessage(coach.title))}
                    className="btn btn--primary btn--sm pt-coach__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Choose {coach.title}
                  </a>
                </span>
              </Reveal>
            ))}
          </div>

          {/* programmes */}
          <div className="pt__programmes">
            <h3 className="pt__subheading">Training programmes</h3>
            <ul className="pt__list" role="list">
              {ptPlans.map((plan, i) => (
                <li className="pt__item" key={plan.id}>
                  <span className="pt__item-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pt__item-body">
                    <h4 className="pt__item-title">{plan.name}</h4>
                    <p className="pt__item-tagline">{plan.tagline}</p>
                    <p className="pt__item-desc">{plan.description}</p>
                    <Link to={`/plans#${plan.id}`} className="pt__item-link">
                      See details <ArrowRight size={13} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt__preference">
              <span className="tech-label">Coach preference</span>
              <div className="pt__preference-options">
                {coachOptions.map((option) => (
                  <a
                    key={option.value}
                    href={buildWhatsAppUrl(coachMessage(option.label))}
                    className="pt__preference-option"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Check size={14} aria-hidden="true" />
                    <span>
                      <strong>{option.label}</strong>
                      <em>{option.note}</em>
                    </span>
                  </a>
                ))}
              </div>

              <Link to="/consultation" className="btn btn--primary btn--lg pt__cta">
                Choose Your Coach <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
