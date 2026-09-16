/**
 * ServiceComparison — editorial comparison, not a table.
 * Columns you can highlight; criteria run down the left as a rail.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceComparison, comparisonCriteria } from '../../../../data/services.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './ServiceComparison.css';

export default function ServiceComparison() {
  const [active, setActive] = useState(serviceComparison[1].serviceId);

  return (
    <section className="compare section bg-800" id="service-comparison" aria-labelledby="compare-title">
      <div className="container">
        <SectionHeading
          index="09 — Compare"
          eyebrow="Service comparison"
          title={['Which one actually', 'fits your week?']}
          lede="Four ways to train with us, compared on the things that decide whether you keep going."
          className="section-heading--split"
          id="compare-title"
        />

        <div className="compare__wrap">
          {/* column headers */}
          <div className="compare__head">
            <span className="compare__head-label tech-label">Criteria</span>
            {serviceComparison.map((col) => (
              <button
                key={col.serviceId}
                type="button"
                className={`compare__col-head ${active === col.serviceId ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(col.serviceId)}
                onFocus={() => setActive(col.serviceId)}
                onClick={() => setActive(col.serviceId)}
                aria-pressed={active === col.serviceId}
              >
                {col.name}
              </button>
            ))}
          </div>

          {/* criteria rows */}
          <div className="compare__body">
            {comparisonCriteria.map((row, i) => (
              <div className="compare__row" key={row.key}>
                <span className="compare__row-label">
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  {row.label}
                </span>
                {serviceComparison.map((col) => (
                  <span
                    key={col.serviceId}
                    className={`compare__cell ${active === col.serviceId ? 'is-active' : ''}`}
                  >
                    {col[row.key]}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* footer CTA row */}
          <div className="compare__foot">
            <span className="compare__row-label tech-label">Start here</span>
            {serviceComparison.map((col) => (
              <span className="compare__cell compare__cell--cta" key={col.serviceId}>
                <Link
                  to={col.serviceId === 'fitness-consultation' ? '/consultation' : `/services#${col.serviceId}`}
                  className="compare__link"
                >
                  {col.serviceId === 'fitness-consultation' ? 'Book it' : 'Details'} <ArrowRight size={13} />
                </Link>
              </span>
            ))}
          </div>
        </div>

        <p className="compare__note">
          Still unsure? A 30-minute consultation will settle it faster than any comparison chart.
        </p>
      </div>
    </section>
  );
}
