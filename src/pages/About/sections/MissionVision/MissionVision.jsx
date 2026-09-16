/** MissionVision — two large editorial panels, no card-grid feel. */
import { Target, Eye } from 'lucide-react';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './MissionVision.css';

const BLOCKS = [
  {
    icon: Target,
    index: '02',
    label: 'Mission',
    headline: 'Help people build fitness habits that actually last.',
    body: [
      'Consistency beats intensity every single time. Our job is not to make you destroy yourself for six weeks — it is to make training something you still do a year from now.',
      'That means realistic sessions, a plan you can follow on a normal week, and coaches who adjust it when life gets in the way.',
    ],
    points: ['Realistic weekly sessions', 'Plans that survive a busy week', 'Progress reviewed, not assumed'],
  },
  {
    icon: Eye,
    index: '03',
    label: 'Vision',
    headline: 'Create a trusted local fitness ecosystem in Kaurihar.',
    body: [
      'One place where training, nutrition structure, recovery and coaching sit together, so nobody has to stitch it across four different providers.',
      'Local enough to be convenient, professional enough to be trusted — and honest enough to tell you when something is not the right fit.',
    ],
    points: ['Fitness and recovery under one roof', 'Male and female coaches', 'Local, consistent and accountable'],
  },
];

export default function MissionVision() {
  return (
    <section className="mission section bg-800" aria-labelledby="mission-title">
      <div className="container">
        <SectionHeading
          index="Purpose"
          eyebrow="Mission & vision"
          title="What we are trying to build"
          className="section-heading--split"
          id="mission-title"
        />

        <div className="mission__grid">
          {BLOCKS.map((block) => {
            const Icon = block.icon;
            return (
              <article className="mission__block" key={block.label}>
                <span className="mission__num big-number" aria-hidden="true">
                  {block.index}
                </span>

                <header className="mission__head">
                  <span className="mission__icon">
                    <Icon size={19} />
                  </span>
                  <span className="tech-label">{block.label}</span>
                </header>

                <h3 className="mission__headline">{block.headline}</h3>

                <div className="mission__body">
                  {block.body.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>

                <ul className="tick-list tick-list--check mission__points">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
