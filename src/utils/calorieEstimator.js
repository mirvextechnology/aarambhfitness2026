/**
 * CALORIE ESTIMATOR
 * Mifflin-St Jeor equation + activity and training multipliers.
 * Standard, transparent, and clearly labelled as an estimate.
 */

const ACTIVITY = {
  sedentary: { label: 'Mostly sitting', factor: 1.2 },
  light: { label: 'Lightly active', factor: 1.375 },
  moderate: { label: 'Moderately active', factor: 1.55 },
  high: { label: 'Very active', factor: 1.725 },
};

/** Extra energy burn per coached session, spread across the week. */
const TRAINING_PER_DAY = { 2: 40, 3: 70, 4: 100, 5: 130 };

export function basalMetabolicRate({ weightKg, heightCm, age, gender }) {
  const w = Number(weightKg);
  const h = Number(heightCm);
  const a = Number(age);
  if (!w || !h || !a) return null;
  const base = 10 * w + 6.25 * h - 5 * a;
  return Math.round(gender === 'female' ? base - 161 : base + 5);
}

export function maintenanceCalories({ weightKg, heightCm, age, gender, activity = 'sedentary', sessionsPerWeek = 3 }) {
  const bmr = basalMetabolicRate({ weightKg, heightCm, age, gender });
  if (!bmr) return null;
  const factor = ACTIVITY[activity]?.factor ?? 1.2;
  const days = Math.min(Math.max(Number(sessionsPerWeek) || 0, 0), 7);
  const training = TRAINING_PER_DAY[days] ?? Math.round((days / 5) * 130);
  return {
    bmr,
    maintenance: Math.round(bmr * factor + training),
    trainingAddition: training,
  };
}

/**
 * Goal-adjusted targets.
 * Uses conservative, widely used deltas — nothing extreme.
 */
export function calorieTargets({ weightKg, heightCm, age, gender, activity, sessionsPerWeek, goal = 'maintenance' }) {
  const base = maintenanceCalories({ weightKg, heightCm, age, gender, activity, sessionsPerWeek });
  if (!base) return null;
  const { bmr, maintenance } = base;
  const w = Number(weightKg) || 70;

  let target = maintenance;
  let label = 'Maintenance';
  switch (goal) {
    case 'weight-loss':
    case 'fat-loss':
      target = Math.round(maintenance * 0.8);
      label = 'Fat Loss';
      break;
    case 'muscle-gain':
      target = Math.round(maintenance + Math.min(350, Math.round(w * 4)));
      label = 'Muscle Gain';
      break;
    default:
      target = maintenance;
      label = 'Maintenance';
  }

  // Protein: 1.6–2.0 g/kg, scaled by goal. Keep it simple and safe.
  const proteinPerKg = goal === 'muscle-gain' ? 1.8 : goal === 'weight-loss' || goal === 'fat-loss' ? 1.8 : 1.4;
  const protein = Math.round(w * proteinPerKg);
  const fat = Math.round((target * 0.25) / 9);
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));

  return {
    bmr,
    maintenance,
    target,
    label,
    protein,
    carbs,
    fat,
    water: `${Math.round((w * 35) / 1000 * 10) / 10} L`,
  };
}

export const CALORIE_DISCLAIMER =
  'These figures are general estimates from standard equations. They are not a prescription or medical advice. Actual needs vary with genetics, health status, sleep and stress. Consult a qualified doctor or registered dietitian for personalised nutrition.';

export default { basalMetabolicRate, maintenanceCalories, calorieTargets, ACTIVITY, CALORIE_DISCLAIMER };
