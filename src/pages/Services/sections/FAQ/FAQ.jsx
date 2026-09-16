/** FAQ — categorised accordion with a filter rail. */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqCategories } from '../../../../data/faqs.js';
import Accordion from '../../../../components/Accordion/Accordion.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './FAQ.css';

export default function FAQ() {
  const [category, setCategory] = useState(faqCategories[0].id);
  const active = faqCategories.find((c) => c.id === category) || faqCategories[0];

  return (
    <section className="faq section bg-900" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeading
          index="10 — FAQ"
          eyebrow="Questions people ask"
          title="Before you ask, we probably answered it."
          className="section-heading--split"
          id="faq-title"
          aside={
            <Link to="/contact" className="btn btn--outline btn--sm">
              Ask us directly <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="faq__layout">
          <div className="faq__cats" role="tablist" aria-label="FAQ categories">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={cat.id === category}
                className={`faq__cat ${cat.id === category ? 'is-active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
                <span className="faq__cat-count">{cat.items.length}</span>
              </button>
            ))}
          </div>

          <div className="faq__panel">
            <h3 className="faq__panel-title">{active.label}</h3>
            <Accordion items={active.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
