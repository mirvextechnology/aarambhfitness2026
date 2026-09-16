/**
 * FITNESS ASSESSMENT — turns 10 answers into an honest starting point.
 * Pure functions: no side effects, easy to reason about and test.
 */
import { goals, goalById, coachOptions } from '../data/fitnessGoals.js';
import { services, serviceById } from '../data/services.js';
import { calculateBMI } from './bmiCalculator.js';
import { calorieTargets } from './calorieEstimator.js';

export const activityLabels = {
  sedentary: 'Mostly sitting',
  light: 'Lightly active',
  moderate: 'Moderately active',
  high: 'Very active',
};

export const experienceLabels = {
  none: 'Never trained',
  beginner: 'Under 6 months',
  intermediate: '6 months – 2 years',
  advanced: 'Over 2 years',
};

export const locationLabels = {
  gym: 'At the gym',
  home: 'At home',
  both: 'A mix of both',
};

export const genderLabels = {
  male: 'Male',
  female: 'Female',
  other: 'Prefer not to say',
};

export const coachLabelMap = Object.fromEntries(coachOptions.map((c) => [c.value, c.label]));

/** Validate a single answer. Returns an error string or null. */
export function validateAnswer(question, value) {
  if (value === undefined || value === null || value === '') return 'This field is required.';

  if (question.type === 'number') {
    const n = Number(value);
    if (Number.isNaN(n)) return 'Enter a number.';
    if (question.min !== undefined && n < question.min) return `Minimum is ${question.min}.`;
    if (question.max !== undefined && n > question.max) return `Maximum is ${question.max}.`;
    return null;
  }

  if (question.type === 'height') {
    const cm = heightToCm(value);
    if (!cm) return 'Enter a valid height.';
    if (cm < 90 || cm > 250) return 'Height looks out of range.';
    return null;
  }

  if (question.type === 'choice') {
    const ok = question.options.some((o) => o.value === value);
    return ok ? null : 'Select one option.';
  }

  return null;
}

/** Normalise the height answer ({unit, cm} or {unit, feet, inches}) to cm. */
export function heightToCm(value) {
  if (!value) return null;
  if (value.unit === 'ft') {
    const f = Number(value.feet);
    const i = Number(value.inches) || 0;
    if (!f) return null;
    const total = f * 12 + i;
    return Math.round(total * 2.54 * 10) / 10;
  }
  const cm = Number(value.cm);
  return cm ? Math.round(cm * 10) / 10 : null;
}

export function heightToText(value) {
  if (!value) return '';
  if (value.unit === 'ft') {
    return `${value.feet}'${Number(value.inches) || 0}"`;
  }
  return `${value.cm} cm`;
}

/**
 * Build the result object shown on the "YOUR AARAMBH STARTING POINT" screen.
 * @param {Record<string, any>} answers  keyed by question id
 */
export function buildAssessmentResult(answers) {
  const a = answers || {};
  const cm = heightToCm(a.height);
  const weight = Number(a.weight) || 0;
  const age = Number(a.age) || 0;

  // Resolve the goal, allowing BMI to inform it if the user picked a generic one.
  const bmi = cm && weight ? calculateBMI({ heightCm: cm, weightKg: weight, age, gender: a.gender }) : null;
  const chosenGoal = goalById(a.goal);
  const effectiveGoal = chosenGoal || goals[0];

  // Recommended service — goal-driven, then location-aware.
  let serviceId = effectiveGoal.service;
  if (a.location === 'home') serviceId = 'home-fitness';
  if (a.location === 'gym' && a.experience === 'none') serviceId = 'personal-training';
  if (a.frequency && Number(a.frequency) <= 2 && a.location === 'gym') serviceId = 'gym-training';

  const service = serviceById(serviceId) || services[0];

  // Suggested frequency: respect what they can actually commit to.
  const availableDays = Number(a.frequency) || 3;
  const idealDays = parseInt(effectiveGoal.frequency, 10) || 4;
  const suggestedDays = Math.max(2, Math.min(availableDays, idealDays));
  const frequency = `${suggestedDays} sessions per week`;

  // Focus line: goal focus, softened for total beginners.
  let focus = effectiveGoal.focus;
  if (a.experience === 'none') {
    focus = 'Learn the basic movement patterns first, then add load gradually. ' + focus;
  }

  const nextStep = nextStepFor({ service, location: a.location, experience: a.experience });

  const targets =
    cm && weight && age
      ? calorieTargets({
          weightKg: weight,
          heightCm: cm,
          age,
          gender: a.gender,
          activity: a.activity,
          sessionsPerWeek: suggestedDays,
          goal: effectiveGoal.dietGoal,
        })
      : null;

  return {
    valid: true,
    goal: effectiveGoal,
    goalLabel: effectiveGoal.label,
    goalId: effectiveGoal.id,
    service,
    serviceId: service.id,
    serviceName: service.name,
    frequency,
    suggestedDays,
    focus,
    timeline: effectiveGoal.timeline,
    dietGoal: effectiveGoal.dietGoal,
    coach: a.coach || 'any',
    coachLabel: coachLabelMap[a.coach] || 'No Preference',
    location: a.location,
    locationLabel: locationLabels[a.location] || '',
    activityLabel: activityLabels[a.activity] || '',
    experienceLabel: experienceLabels[a.experience] || '',
    gender: genderLabels[a.gender] || '',
    age: a.age,
    weight,
    heightText: heightToText(a.height),
    heightCm: cm,
    bmi: bmi?.valid ? bmi.bmi : null,
    bmiCategory: bmi?.valid ? bmi.category : null,
    targets,
    tips: effectiveGoal.tips,
    nextStep,
  };
}

function nextStepFor({ service, location, experience }) {
  if (experience === 'none') {
    return 'Book a consultation so your first sessions are supervised and your form is set correctly from day one.';
  }
  if (location === 'home') {
    return `Request a ${service.name.toLowerCase()} slot. Share your locality and preferred timings so we can confirm a visiting coach.`;
  }
  return `Request a ${service.name.toLowerCase()} consultation. We will confirm the slot and walk you through your first session.`;
}

export default { buildAssessmentResult, validateAnswer, heightToCm, heightToText };
