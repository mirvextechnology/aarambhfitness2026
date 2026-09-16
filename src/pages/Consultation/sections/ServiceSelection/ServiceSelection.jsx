/** ServiceSelection — STEP 01. */
import { services } from '../../../../data/services.js';

export default function ServiceSelection({ value, onSelect }) {
  return (
    <div className="cons-step" role="radiogroup" aria-label="Select a service">
      <div className="cons-step__options cons-step__options--services">
        {services.map((service) => {
          const active = value === service.id;
          return (
            <button
              type="button"
              key={service.id}
              role="radio"
              aria-checked={active}
              className={`cons-option ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(service.id)}
            >
              <span className="cons-option__num">{service.number}</span>
              <span className="cons-option__body">
                <strong>{service.name}</strong>
                <em>{service.tagline}</em>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
