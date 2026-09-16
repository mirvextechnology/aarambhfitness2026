/**
 * PlanComparison — gym plans and PT options compared side by side,
 * with a highlight-following cursor across the rows.
 */
import { useState } from 'react';
import { planComparison, planComparisonRows } from '../../../../data/plans.js';
import { ptComparison, ptComparisonRows } from '../../../../data/ptPlans.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './PlanComparison.css';

function Table({ title, columns, rows, idBase }) {
  const [active, setActive] = useState(columns[0]?.tier || columns[0]?.id);

  return (
    <div className="plan-cmp">
      <h3 className="plan-cmp__title">{title}</h3>

      <div className="plan-cmp__wrap">
        <div className="plan-cmp__row plan-cmp__row--head">
          <span className="plan-cmp__label tech-label">Compare</span>
          {columns.map((col) => (
            <button
              key={col.tier || col.id}
              type="button"
              className={`plan-cmp__col ${active === (col.tier || col.id) ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(col.tier || col.id)}
              onFocus={() => setActive(col.tier || col.id)}
              onClick={() => setActive(col.tier || col.id)}
              aria-pressed={active === (col.tier || col.id)}
            >
              {col.name}
            </button>
          ))}
        </div>

        {rows.map((row, i) => (
          <div className="plan-cmp__row" key={row.key}>
            <span className="plan-cmp__label">
              <em>{String(i + 1).padStart(2, '0')}</em>
              {row.label}
            </span>
            {columns.map((col) => (
              <span
                key={`${idBase}-${col.tier || col.id}-${row.key}`}
                className={`plan-cmp__cell ${active === (col.tier || col.id) ? 'is-active' : ''}`}
              >
                {col[row.key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlanComparison() {
  return (
    <section className="plan-cmp-section section bg-900" id="plan-comparison" aria-labelledby="plan-cmp-title">
      <div className="container">
        <SectionHeading
          index="03 — Comparison"
          eyebrow="Plan comparison"
          title="Side by side, without the fine print."
          className="section-heading--split"
          id="plan-cmp-title"
        />

        <div className="plan-cmp-section__grid">
          <Table title="Gym membership" columns={planComparison} rows={planComparisonRows} idBase="gym" />
          <Table title="Personal training" columns={ptComparison} rows={ptComparisonRows} idBase="pt" />
        </div>
      </div>
    </section>
  );
}
