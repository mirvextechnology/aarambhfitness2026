/** OurStory — the why, told plainly, with a supporting image column. */
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import consultationImage from '../../../../assets/images/consultation.jpg';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './OurStory.css';

export default function OurStory() {
  const beats = [
    {
      label: 'The problem',
      copy: 'Most people in Kaurihar had one option: join a gym, get handed a machine list, and figure it out alone. Form suffered, progress stalled, and within a month the routine was gone.',
    },
    {
      label: 'Our answer',
      copy: 'Aarambh was built so that nobody has to guess. Assessment first, a written plan second, and a coach watching the actual work third.',
    },
    {
      label: 'How it works today',
      copy: 'Eight services under one roof — gym training, personal training, home fitness, nutrition structure, exercise planning, physiotherapy support, consultation, and event staffing.',
    },
    {
      label: 'What we care about',
      copy: 'Whether you are still training in six months. Everything else — equipment, plan, coach — is just a means to that.',
    },
  ];

  return (
    <section className="story section bg-900" aria-labelledby="story-title">
      <div className="container">
        <div className="story__grid">
          <div className="story__copy">
            <SectionHeading
              index="01 — Our Story"
              eyebrow="Where this came from"
              title={['Built around the', 'part most people skip.']}
              id="story-title"
              size="sm"
            />

            <ol className="story__beats" role="list">
              {beats.map((beat, i) => (
                <Reveal as="li" variant="up" delay={i * 0.07} className="story__beat" key={beat.label}>
                  <span className="story__beat-label">{beat.label}</span>
                  <p>{beat.copy}</p>
                </Reveal>
              ))}
            </ol>

            <Link to="/services" className="story__link">
              See the full service list <ArrowUpRight size={14} />
            </Link>
          </div>

          <Reveal variant="clip" className="story__visual">
            <figure className="story__frame">
              <img
                src={consultationImage}
                alt="A coach and member reviewing a written training plan together"
                loading="lazy"
                decoding="async"
                width={1000}
                height={1250}
              />
            </figure>
            <div className="story__stat">
              <span className="tech-label">Approach</span>
              <strong>Assessment → Plan → Coaching → Review</strong>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
