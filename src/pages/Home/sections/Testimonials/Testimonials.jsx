/**
 * Testimonials — horizontal slider for genuine member reviews.
 * When no reviews have been supplied the section shows an honest
 * empty state rather than fabricated names.
 */
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from 'lucide-react';
import { testimonials } from '../../../../data/testimonials.js';
import { format } from 'date-fns';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import useReducedMotion from '../../../../hooks/useReducedMotion.js';
import './Testimonials.css';

export default function Testimonials() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const reduced = useReducedMotion();
  const count = testimonials.length;

  /* autoplay, paused on hover/focus */
  useEffect(() => {
    if (count < 2 || !autoplay || reduced) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6500);
    return () => window.clearInterval(id);
  }, [count, autoplay, reduced]);

  /* move the track */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !count) return;
    const card = track.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  }, [index, count, reduced]);

  const go = (dir) => {
    setAutoplay(false);
    setIndex((i) => (i + dir + count) % count);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  /* ---------------- honest empty state ---------------- */
  if (!count) {
    return (
      <section className="testimonials section bg-800" aria-labelledby="testimonials-title">
        <div className="container">
          <SectionHeading
            index="12 — Members"
            eyebrow="Member reviews"
            title="Reviews from our members"
            className="section-heading--split"
            id="testimonials-title"
          />

          <div className="testimonials__empty">
            <span className="testimonials__empty-icon">
              <MessageSquareQuote size={26} />
            </span>
            <h3 className="testimonials__empty-title">Member stories will appear here</h3>
            <p>
              We only publish reviews that members have actually given us permission to share — so
              this space stays honest. If you train with us and would like your progress featured,
              tell our team and we will add it.
            </p>
            <p className="testimonials__empty-note">
              Want to hear about results first-hand? Visit us in Kaurihar or ask for a walkthrough
              before you join.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- slider ---------------- */
  return (
    <section className="testimonials section bg-800" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          index="12 — Members"
          eyebrow="Member reviews"
          title="What members say"
          className="section-heading--split"
          id="testimonials-title"
          aside={
            <div className="testimonials__controls">
              <button
                type="button"
                className="testimonials__nav"
                onClick={() => go(-1)}
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="testimonials__count mono">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="testimonials__nav"
                onClick={() => go(1)}
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />

        <div
          className="testimonials__viewport"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
          onFocus={() => setAutoplay(false)}
          onBlur={() => setAutoplay(true)}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Member reviews, use arrow keys to navigate"
        >
          <div className="testimonials__track" ref={trackRef}>
            {testimonials.map((item, i) => (
              <article className={`testimonial ${i === index ? 'is-active' : ''}`} key={item.id} aria-hidden={i !== index}>
                <span className="testimonial__quote-mark" aria-hidden="true">
                  <Quote size={30} />
                </span>
                <blockquote className="testimonial__quote">{item.quote}</blockquote>

                <footer className="testimonial__foot">
                  {item.image ? (
                    <img
                      className="testimonial__avatar"
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      loading="lazy"
                      decoding="async"
                      width={72}
                      height={72}
                    />
                  ) : (
                    <span className="testimonial__avatar testimonial__avatar--initial" aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                  )}
                  <div className="testimonial__meta">
                    <strong>{item.name}</strong>
                    <span>
                      {item.goal}
                      {item.result ? ` · ${item.result}` : ''}
                      {item.date ? ` · ${format(new Date(item.date), 'MMM yyyy')}` : ''}
                    </span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Choose review">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Review ${i + 1}`}
              className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => {
                setAutoplay(false);
                setIndex(i);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
