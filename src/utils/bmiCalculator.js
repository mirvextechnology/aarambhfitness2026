/**
 * BMI + unit helpers.
 * Transparent, standard formulas — presented as screening, never diagnosis.
 */

export const CATEGORIES = [
  { id: 'underweight', label: 'Underweight', min: 0, max: 18.5, tone: 'warn' },
  { id: 'normal', label: 'Normal Range', min: 18.5, max: 25, tone: 'ok' },
  { id: 'overweight', label: 'Overweight', min: 25, max: 30, tone: 'warn' },
  { id: 'obese', label: 'Obese', min: 30, max: 100, tone: 'danger' },
];

/** Scale used by the visual BMI bar (clipped domain). */
export const SCALE_MIN = 14;
export const SCALE_MAX = 40;

/** feet + inches + fraction -> cm */
export function feetInchesToCm(feet, inches) {
  const f = Number(feet) || 0;
  const i = Number(inches) || 0;
  const totalInches = f * 12 + i;
  return Math.round(totalInches * 2.54 * 10) / 10;
}

/** cm -> { feet, inches } */
export function cmToFeetInches(cm) {
  const totalInches = (Number(cm) || 0) / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches - feet * 12) * 10) / 10;
  return { feet, inches: inches >= 12 ? 0 : inches };
}

/** kg -> lb and back */
export const kgToLb = (kg) => Math.round((Number(kg) || 0) * 2.20462 * 10) / 10;
export const lbToKg = (lb) => Math.round((Number(lb) || 0) / 2.20462 * 10) / 10;

/**
 * @param {{heightCm:number, weightKg:number, age?:number, gender?:string}} input
 */
export function calculateBMI({ heightCm, weightKg, age, gender }) {
  const h = Number(heightCm);
  const w = Number(weightKg);

  if (!h || !w || h <= 0 || w <= 0) {
    return { valid: false, error: 'Enter both height and weight.' };
  }
  if (h < 90 || h > 250) {
    return { valid: false, error: 'Height looks out of range. Please re-check it.' };
  }
  if (w < 20 || w > 400) {
    return { valid: false, error: 'Weight looks out of range. Please re-check it.' };
  }

  const metres = h / 100;
  const bmi = Math.round((w / (metres * metres)) * 10) / 10;
  const category =
    CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];

  // Healthy weight band for this height
  const healthyMin = Math.round(18.5 * metres * metres * 10) / 10;
  const healthyMax = Math.round(24.9 * metres * metres * 10) / 10;

  // Position on the visual scale, 0–100%
  const clamped = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX);
  const position = Math.round(((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100);

  return {
    valid: true,
    bmi,
    category: category.label,
    categoryId: category.id,
    tone: category.tone,
    heightCm: h,
    weightKg: w,
    age: age ? Number(age) : undefined,
    gender,
    healthyMin,
    healthyMax,
    position,
    advice: adviceFor(category.id, w, healthyMin, healthyMax),
  };
}

function adviceFor(categoryId, weight, healthyMin, healthyMax) {
  switch (categoryId) {
    case 'underweight':
      return {
        summary: `Your BMI is below the general healthy range. For your height, a weight between ${healthyMin} kg and ${healthyMax} kg falls inside it.`,
        nextStep:
          'A strength-focused plan with a modest calorie increase is usually the right start. A consultation will confirm what suits you.',
        goal: 'muscle-gain',
      };
    case 'normal':
      return {
        summary: `Your BMI sits inside the general healthy range. For your height that is roughly ${healthyMin} kg to ${healthyMax} kg.`,
        nextStep:
          'Good base to build on. A structured training plan will turn this into strength and stamina.',
        goal: 'general-fitness',
      };
    case 'overweight':
      return {
        summary: `Your BMI is above the general healthy range. For your height, ${healthyMin} kg to ${healthyMax} kg falls inside it.`,
        nextStep:
          'Combined strength and conditioning work, with a practical eating structure, is the usual starting point.',
        goal: 'fat-loss',
      };
    default:
      return {
        summary: `Your BMI is well above the general healthy range. For your height, ${healthyMin} kg to ${healthyMax} kg falls inside it.`,
        nextStep:
          'Please start with a consultation. A supervised, gradual plan is far safer and more sustainable at this stage.',
        goal: 'weight-loss',
      };
  }
}

export const BMI_DISCLAIMER =
  'BMI is a general screening indicator and should not be treated as a medical diagnosis. It does not account for muscle mass, bone density or body composition. Consult a qualified doctor for a proper health assessment.';

export default { CATEGORIES, SCALE_MIN, SCALE_MAX, calculateBMI, feetInchesToCm, cmToFeetInches, kgToLb, lbToKg, BMI_DISCLAIMER };
