/**
 * TeamPreview — real coaches when they have been added to data/trainers.js,
 * otherwise role-based cards that stay factually accurate.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';
import { trainers, coachRoles } from '../../../../data/trainers.js';
import { buildWhatsAppUrl, coachMessage } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './TeamPreview.css';

export default function TeamPreview() {
  const hasTeam = trainers.length > 0;

  return (
    <section className="team section bg-800" aria-labelledby="team-title">
      <div className="container">
        <SectionHeading
          index="05 — The Team"
          eyebrow="Coaches"
          title={['The people who will', 'actually watch you train.']}
          lede={
            hasTeam
              ? 'Every coach is briefed on your goal and your limits before your first session.'
              : 'Coach profiles are added here once each coach has confirmed their details. In the meantime, choose by the type of coaching you need.'
          }
          className="section-heading--split"
          id="team-title"
          aside={
            <Link to="/careers" className="btn btn--outline btn--sm">
              Join the team <ArrowRight size={14} />
            </Link>
          }
        />

        {hasTeam ? (
          <div className="team__grid">
            {trainers.map((trainer, i) => (
              <Reveal as="article" variant="up" delay={i * 0.08} className="team-card" key={trainer.id}>
                {trainer.image ? (
                  <span className="team-card__media">
                    <img
                      src={trainer.image}
                      alt={trainer.imageAlt || trainer.name}
                      loading="lazy"
                      decoding="async"
                      width={700}
                      height={880}
                    />
                  </span>
                ) : (
                  <span className="team-card__media team-card__media--placeholder">
                    <UserRound size={30} />
                  </span>
                )}

                <span className="team-card__body">
                  <span className="tech-label">{trainer.role}</span>
                  <h3 className="team-card__name">{trainer.name}</h3>

                  {trainer.experience ? (
                    <span className="team-card__meta">Experience · {trainer.experience}</span>
                  ) : null}

                  {trainer.expertise?.length ? (
                    <span className="team-card__tags">
                      {trainer.expertise.map((tag) => (
                        <span className="chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </span>
                  ) : null}

                  {trainer.bio ? <p className="team-card__bio">{trainer.bio}</p> : null}

                  <a
                    href={buildWhatsAppUrl(coachMessage(`${trainer.gender === 'female' ? 'Female' : 'Male'} Coach`))}
                    className="btn btn--outline btn--sm team-card__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Train with {trainer.name.split(' ')[0]}
                  </a>
                </span>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="team__grid">
            {coachRoles.map((role, i) => (
              <Reveal as="article" variant="scale" delay={i * 0.1} className="team-card team-card--role" key={role.id}>
                <span className="team-card__media">
                  <img src={role.image} alt={role.imageAlt} loading="lazy" decoding="async" width={800} height={1000} />
                </span>
                <span className="team-card__body">
                  <span className="tech-label">{role.role}</span>
                  <h3 className="team-card__name">{role.title}</h3>
                  <span className="team-card__tags">
                    {role.focus.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                  <a
                    href={buildWhatsAppUrl(coachMessage(role.title))}
                    className="btn btn--outline btn--sm team-card__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request {role.title}
                  </a>
                </span>
              </Reveal>
            ))}
          </div>
        )}

        <p className="team__note">
          Coach availability changes with schedules and slots. Tell us your preferred timings and we
          will confirm which coach can cover them.
        </p>
      </div>
    </section>
  );
}
