/** OpenPositions — expandable role cards driven by data/trainers.js. */
import { useState } from 'react';
import { Briefcase, ChevronDown, MapPin, Users } from 'lucide-react';
import { openPositions } from '../../../../data/trainers.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './OpenPositions.css';

export default function OpenPositions() {
  const [open, setOpen] = useState(openPositions[0]?.id || null);

  const scrollToForm = () => {
    if (typeof window.scrollToSmooth === 'function') {
      window.scrollToSmooth('#trainer-registration', { offset: -96 });
    } else {
      document.getElementById('trainer-registration')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="positions section bg-800" id="open-positions" aria-labelledby="positions-title">
      <div className="container">
        <SectionHeading
          index="02 — Open Roles"
          eyebrow="Current openings"
          title="Where we need people."
          lede="Each role lists exactly what you would do and what we ask for. If your profile is close but not exact, apply anyway — tell us in your message."
          className="section-heading--split"
          id="positions-title"
          aside={
            <span className="positions__count mono">
              {String(openPositions.length).padStart(2, '0')} roles open
            </span>
          }
        />

        <div className="positions__list">
          {openPositions.map((position) => {
            const isOpen = open === position.id;
            return (
              <article className={`position ${isOpen ? 'is-open' : ''}`} key={position.id}>
                <button
                  type="button"
                  className="position__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`position-${position.id}`}
                  onClick={() => setOpen(isOpen ? null : position.id)}
                >
                  <span className="position__icon">
                    <Briefcase size={17} />
                  </span>
                  <span className="position__main">
                    <strong>{position.title}</strong>
                    <em>{position.summary}</em>
                  </span>
                  <span className="position__tags">
                    <span className="chip">{position.type}</span>
                    <span className="chip">
                      <Users size={11} /> {position.gender}
                    </span>
                    <span className="chip">
                      <MapPin size={11} /> {position.location}
                    </span>
                  </span>
                  <span className="position__chevron" aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div
                  className="position__panel"
                  id={`position-${position.id}`}
                  style={{ maxHeight: isOpen ? '900px' : '0px' }}
                  hidden={!isOpen}
                >
                  <div className="position__body">
                    <div>
                      <h3 className="position__sub">Responsibilities</h3>
                      <ul className="tick-list" role="list">
                        {position.responsibilities.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="position__sub">What we ask for</h3>
                      <ul className="tick-list tick-list--check" role="list">
                        {position.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <button type="button" className="btn btn--primary btn--sm position__apply" onClick={scrollToForm}>
                      Apply for {position.title}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
