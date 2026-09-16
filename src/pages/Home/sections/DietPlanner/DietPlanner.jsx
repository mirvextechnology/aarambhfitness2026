/**
 * DietPlanner — general eating structure by objective.
 * Deliberately non-medical: sample meals, no dosages, no claims.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Utensils } from 'lucide-react';
import { dietGoals, sampleDay } from '../../../../data/fitnessGoals.js';
import { calorieTargets, CALORIE_DISCLAIMER } from '../../../../utils/calorieEstimator.js';
import { buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './DietPlanner.css';

export default function DietPlanner() {
  const [goalId, setGoalId] = useState(dietGoals[0].id);
  const goal = dietGoals.find((g) => g.id === goalId) || dietGoals[0];
  const meals = sampleDay[goalId] || [];

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');

  const targets =
    weight && height && age
      ? calorieTargets({
          weightKg: Number(weight),
          heightCm: Number(height),
          age: Number(age),
          gender,
          activity,
          sessionsPerWeek: 4,
          goal: goalId === 'weight-loss' ? 'fat-loss' : goalId,
        })
      : null;

  const whatsapp = buildWhatsAppUrl(
    [
      'Hello Aarambh Fitness,',
      '',
      `I would like diet and nutrition guidance for: ${goal.label}.`,
      targets
        ? `\nEstimated target: ${targets.target} kcal (protein ${targets.protein} g, carbs ${targets.carbs} g, fat ${targets.fat} g)`
        : '',
      '',
      'Please guide me on a sustainable plan.',
    ]
      .filter(Boolean)
      .join('\n')
  );

  return (
    <section className="diet section bg-900" id="diet-planner" aria-labelledby="diet-title">
      <div className="container">
        <SectionHeading
          index="07 — Diet"
          eyebrow="Diet planner"
          title={['Food that supports the training, not fights it.']}
          lede="This is a general sample structure built around everyday Indian meals. Use it as a starting framework, not a prescription."
          className="section-heading--split"
          id="diet-title"
        />

        <div className="diet__layout">
          {/* left: objective + estimate */}
          <div className="diet__side">
            <div className="diet__goals" role="radiogroup" aria-label="Diet objective">
              {dietGoals.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={item.id === goalId}
                  className={`diet__goal ${item.id === goalId ? 'is-active' : ''}`}
                  onClick={() => setGoalId(item.id)}
                >
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </button>
              ))}
            </div>

            <form className="diet__estimate" onSubmit={(e) => e.preventDefault()} noValidate>
              <span className="tech-label">Optional: estimate your daily targets</span>
              <div className="diet__estimate-grid">
                <div className="field">
                  <label className="field__label" htmlFor="diet-weight">
                    Weight (kg)
                  </label>
                  <input
                    id="diet-weight"
                    className="input"
                    type="number"
                    inputMode="decimal"
                    min="25"
                    max="300"
                    placeholder="72"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="diet-height">
                    Height (cm)
                  </label>
                  <input
                    id="diet-height"
                    className="input"
                    type="number"
                    inputMode="decimal"
                    min="90"
                    max="250"
                    placeholder="172"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="diet-age">
                    Age
                  </label>
                  <input
                    id="diet-age"
                    className="input"
                    type="number"
                    inputMode="numeric"
                    min="12"
                    max="90"
                    placeholder="28"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="diet-gender">
                    Gender
                  </label>
                  <select
                    id="diet-gender"
                    className="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="field span-2">
                  <label className="field__label" htmlFor="diet-activity">
                    Daily activity
                  </label>
                  <select
                    id="diet-activity"
                    className="select"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  >
                    <option value="sedentary">Mostly sitting</option>
                    <option value="light">Lightly active</option>
                    <option value="moderate">Moderately active</option>
                    <option value="high">Very active</option>
                  </select>
                </div>
              </div>

              {targets ? (
                <div className="diet__targets" role="status">
                  <div>
                    <span className="tech-label">Daily energy</span>
                    <strong className="mono">{targets.target.toLocaleString('en-IN')} kcal</strong>
                  </div>
                  <div>
                    <span className="tech-label">Protein</span>
                    <strong className="mono">{targets.protein} g</strong>
                  </div>
                  <div>
                    <span className="tech-label">Carbs</span>
                    <strong className="mono">{targets.carbs} g</strong>
                  </div>
                  <div>
                    <span className="tech-label">Fat</span>
                    <strong className="mono">{targets.fat} g</strong>
                  </div>
                </div>
              ) : null}
            </form>
          </div>

          {/* right: sample day */}
          <div className="diet__day">
            <header className="diet__day-head">
              <span className="chip chip--accent">
                <Utensils size={13} /> {goal.label}
              </span>
              <h3 className="diet__day-title">Sample Day</h3>
              <p className="diet__principle">{goal.principle}</p>
            </header>

            <ol className="diet__meals" role="list">
              {meals.map((meal, i) => (
                <li className="diet__meal" key={meal.slot}>
                  <span className="diet__meal-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="diet__meal-slot">{meal.slot}</span>
                  <span className="diet__meal-item">{meal.item}</span>
                </li>
              ))}
            </ol>

            <div className="diet__cta">
              <a href={whatsapp} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
                <MessageSquare size={16} /> Talk to a Fitness Professional
              </a>
              <Link to="/services#diet-nutrition" className="btn btn--outline">
                Diet &amp; nutrition service <ArrowRight size={15} />
              </Link>
            </div>

            <p className="diet__disclaimer">
              {CALORIE_DISCLAIMER} Portions shown are indicative and should be adjusted to your body,
              activity and any medical condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
