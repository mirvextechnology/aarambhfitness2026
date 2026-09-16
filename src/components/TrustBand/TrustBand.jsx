/**
 * TrustBand — honest trust signals. No invented claims, no fake numbers.
 */
import { ShieldCheck } from 'lucide-react';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import Reveal from '../Reveal/Reveal.jsx';
import './TrustBand.css';

export default function TrustBand({ points = [] }) {
  if (!points.length) return null;

  return (
    <section className="trust section bg-800" aria-labelledby="trust-title">
      <div className="container">
        <SectionHeading
          index="Why Aarambh"
          eyebrow="What you can expect"
          title={['Straightforward coaching.', 'No exaggerated promises.']}
          lede="We would rather show you how we work than tell you how many people we have trained. Here is what every member actually gets."
          className="section-heading--split"
          id="trust-title"
          aside={
            <div className="trust__badge">
              <ShieldCheck size={18} />
              <span>Assessment first, plan second</span>
            </div>
          }
        />

        <ul className="trust__grid" role="list">
          {points.map((point, i) => (
            <Reveal as="li" variant="up" delay={i * 0.06} key={point.title} className="trust__item">
              <span className="trust__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="trust__title">{point.title}</h3>
              <p className="trust__copy">{point.copy}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
