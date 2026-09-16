/**
 * StartPointCTA — the reusable "Not sure where to start?" block.
 * Scrolls to the fitness assessment wherever it is used.
 */
import { ArrowRight } from 'lucide-react';
import './StartPointCTA.css';

export default function StartPointCTA({
  target = '#fitness-assessment',
  title = 'Not sure where to start?',
  copy = 'Answer a few questions and we will help you identify the right starting point.',
  ctaLabel = 'Find my starting point',
  onTrigger,
  variant = 'default',
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onTrigger) {
      onTrigger();
      return;
    }
    if (typeof window.scrollToSmooth === 'function') {
      window.scrollToSmooth(target, { offset: -90 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`start-cta start-cta--${variant}`} aria-labelledby="start-cta-title">
      <div className="container">
        <div className="start-cta__inner">
          <div className="start-cta__deco" aria-hidden="true">
            <span className="start-cta__ring" />
            <span className="start-cta__ring start-cta__ring--2" />
          </div>

          <div className="start-cta__body">
            <span className="tech-label">Guided Start</span>
            <h2 className="start-cta__title" id="start-cta-title">
              {title}
            </h2>
            <p className="start-cta__copy">{copy}</p>
          </div>

          <div className="start-cta__action">
            <button type="button" className="btn btn--primary btn--lg" onClick={handleClick}>
              {ctaLabel}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
