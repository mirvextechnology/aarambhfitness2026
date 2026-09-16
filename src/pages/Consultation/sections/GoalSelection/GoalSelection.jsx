/** GoalSelection — STEP 02. Options come from the selected service's flow. */
export default function GoalSelection({ value, onSelect, options = [] }) {
  return (
    <div className="cons-step" role="radiogroup" aria-label="Select your goal">
      <div className="cons-step__options cons-step__options--goals">
        {options.map((goal) => {
          const active = value === goal.value;
          return (
            <button
              type="button"
              key={goal.value}
              role="radio"
              aria-checked={active}
              className={`cons-option cons-option--compact ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(goal.value)}
            >
              <strong>{goal.label}</strong>
              {goal.note ? <em>{goal.note}</em> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
