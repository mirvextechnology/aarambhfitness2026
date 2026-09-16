/**
 * CoachSelection — STEP 03.
 * Now a generic "preference" step. For coach-based services it shows the
 * photo picker; for everything else (diet type, event scale, setup, format)
 * it renders compact text options relevant to the chosen service.
 */
import { coachRoles } from '../../../../data/trainers.js';

export default function CoachSelection({ value, onSelect, config }) {
  const isCoach = config?.id === 'coach';
  const options = config?.options || [];

  return (
    <div className="cons-step" role="radiogroup" aria-label={config?.title || 'Select a preference'}>
      <div className={`cons-step__options ${isCoach ? 'cons-step__options--coaches' : 'cons-step__options--goals'}`}>
        {options.map((option) => {
          const active = value === option.value;

          /* Coach picker keeps the photo cards. */
          if (isCoach) {
            const role = coachRoles.find((r) =>
              option.value === 'male' ? r.gender === 'male' : option.value === 'female' ? r.gender === 'female' : false
            );
            return (
              <button
                type="button"
                key={option.value}
                role="radio"
                aria-checked={active}
                className={`cons-option cons-option--coach ${active ? 'is-active' : ''}`}
                onClick={() => onSelect(option.value)}
              >
                {role?.image ? (
                  <span className="cons-option__media">
                    <img src={role.image} alt={role.imageAlt} loading="lazy" decoding="async" width={400} height={500} />
                  </span>
                ) : (
                  <span className="cons-option__media cons-option__media--none" aria-hidden="true" />
                )}
                <span className="cons-option__body">
                  <strong>{option.label}</strong>
                  <em>{option.note}</em>
                </span>
              </button>
            );
          }

          /* Non-coach preferences use the compact text layout. */
          return (
            <button
              type="button"
              key={option.value}
              role="radio"
              aria-checked={active}
              className={`cons-option cons-option--compact ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(option.value)}
            >
              <strong>{option.label}</strong>
              {option.note ? <em>{option.note}</em> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
