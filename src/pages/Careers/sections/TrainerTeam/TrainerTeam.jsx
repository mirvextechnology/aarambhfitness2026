/**
 * TrainerTeam — who you would be working alongside.
 * Shows real coaches when they are added to data/trainers.js.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';
import { trainers, coachRoles } from '../../../../data/trainers.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './TrainerTeam.css';

export default function TrainerTeam() {
  const hasTeam = trainers.length > 0;
  const list = hasTeam ? trainers : coachRoles;

  return (
    <section className="trainer-team section bg-900" aria-labelledby="trainer-team-title">
      <div className="container">
        <SectionHeading
          index="03 — The Team"
          eyebrow="Who you would work with"
          title="The people already on the floor."
          lede={
            hasTeam
              ? 'A small team, so everyone knows each member by name.'
              : 'Coach profiles are added once each coach confirms their details. These are the coaching roles currently on the floor.'
          }
          className="section-heading--split"
          id="trainer-team-title"
          aside={
            <Link to="/about" className="btn btn--outline btn--sm">
              About the team <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="trainer-team__grid">
          {list.map((person, i) => (
            <Reveal as="article" variant="scale" delay={i * 0.08} className="trainer-team__card" key={person.id}>
              {person.image ? (
                <span className="trainer-team__media">
                  <img
                    src={person.image}
                    alt={person.imageAlt || person.name}
                    loading="lazy"
                    decoding="async"
                    width={700}
                    height={880}
                  />
                </span>
              ) : (
                <span className="trainer-team__media trainer-team__media--placeholder">
                  <UserRound size={28} />
                </span>
              )}
              <span className="trainer-team__body">
                <span className="tech-label">{person.role}</span>
                <h3 className="trainer-team__name">{person.name || person.title}</h3>
                {person.expertise?.length ? (
                  <span className="trainer-team__tags">
                    {person.expertise.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                ) : null}
                {person.focus?.length ? (
                  <span className="trainer-team__tags">
                    {person.focus.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                ) : null}
                {person.bio ? <p className="trainer-team__bio">{person.bio}</p> : null}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
