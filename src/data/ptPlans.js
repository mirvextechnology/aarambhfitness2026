/**
 * PERSONAL TRAINING PLANS
 * ------------------------------------------------------------
 * PRICING IS INTENTIONALLY LEFT UNSET — see plans.js note.
 * ⚠ EDIT ME — fill in price / period once confirmed.
 */
import { pricingUnavailableText, formatPlanPrice } from './plans.js';

export const ptPlans = [
  {
    id: 'one-on-one-pt',
    name: '1:1 Personal Training',
    tagline: 'One coach, full attention, every session.',
    description:
      'A dedicated coach for the full session — programming, form correction and tracking included. The fastest way to learn proper training.',
    price: null,
    period: 'per month',
    sessionOptions: ['12 sessions', '16 sessions', '24 sessions'],
    location: 'At the gym, Kaurihar',
    coachPreference: true,
    features: [
      'Dedicated one-to-one coach',
      'Individually written programme',
      'Real-time form correction',
      'Session logging and progress review',
      'Nutrition structure guidance',
      'Male or female coach on request',
    ],
    idealFor: 'Fast progress, technique, accountability',
    cta: { label: 'Enquire About 1:1 PT', action: 'consultation', service: 'Personal Training' },
  },
  {
    id: 'transformation-coaching',
    name: 'Transformation Coaching',
    tagline: 'A committed block with training, diet and tracking.',
    description:
      'A structured 12 to 24 week block combining phased training, a nutrition structure and regular reviews. For people ready to commit to a visible change.',
    price: null,
    period: 'per block',
    sessionOptions: ['12 weeks', '16 weeks', '24 weeks'],
    location: 'At the gym, Kaurihar',
    coachPreference: true,
    highlight: true,
    features: [
      'Phased training blocks',
      'Named coach and direct contact',
      'Structured nutrition guidance',
      'Fortnightly measurements and photos',
      'Weekly plan adjustments',
      'Recovery and mobility work',
      'Review call each month',
    ],
    idealFor: 'Body transformation, competition prep, major lifestyle change',
    cta: { label: 'Start Transformation', action: 'consultation', service: 'Personal Training' },
  },
  {
    id: 'home-pt',
    name: 'Home Personal Training',
    tagline: 'Same coaching, at your doorstep.',
    description:
      'Your coach comes to you. Full programming and attention, with equipment-free or minimal-equipment sessions designed for your space.',
    price: null,
    period: 'per month',
    sessionOptions: ['12 sessions', '16 sessions', '24 sessions'],
    location: 'Your home, Kaurihar & nearby Prayagraj',
    coachPreference: true,
    features: [
      'Coach visits your home',
      'Equipment-free programming',
      'Flexible session timings',
      'Male or female coach on request',
      'Progress tracking and reviews',
      'Nutrition structure guidance',
    ],
    idealFor: 'Busy schedules, privacy, no travel',
    cta: { label: 'Enquire About Home PT', action: 'consultation', service: 'Home Fitness' },
  },
];

export const ptPlanById = (id) => ptPlans.find((p) => p.id === id);

export const ptComparisonRows = [
  { key: 'location', label: 'Location' },
  { key: 'coach', label: 'Coach' },
  { key: 'plan', label: 'Programme' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'ideal', label: 'Ideal For' },
];

export const ptComparison = [
  {
    id: 'one-on-one-pt',
    name: '1:1 PT',
    location: 'At the gym',
    coach: 'Dedicated',
    plan: 'Individually written',
    nutrition: 'Structure guidance',
    reviews: 'Per session',
    ideal: 'Technique & speed',
  },
  {
    id: 'transformation-coaching',
    name: 'Transformation',
    location: 'At the gym',
    coach: 'Named coach',
    plan: 'Phased blocks',
    nutrition: 'Structured + reviewed',
    reviews: 'Fortnightly',
    ideal: 'Visible change',
  },
  {
    id: 'home-pt',
    name: 'Home PT',
    location: 'Your home',
    coach: 'Visiting coach',
    plan: 'Equipment-free',
    nutrition: 'Structure guidance',
    reviews: 'Weekly',
    ideal: 'Convenience & privacy',
  },
];

/** "Find Your Plan" question set. */
export const planFinderQuestions = [
  {
    id: 'goal',
    question: "What's your goal?",
    options: [
      { value: 'lose', label: 'Lose weight or fat' },
      { value: 'build', label: 'Build muscle or strength' },
      { value: 'start', label: 'Just start and get consistent' },
      { value: 'transform', label: 'Complete body transformation' },
    ],
  },
  {
    id: 'location',
    question: 'Where do you want to train?',
    options: [
      { value: 'gym', label: 'At the gym' },
      { value: 'home', label: 'At home' },
      { value: 'either', label: 'Either works' },
    ],
  },
  {
    id: 'attention',
    question: 'How much personal attention do you need?',
    options: [
      { value: 'low', label: 'Floor support is enough' },
      { value: 'medium', label: 'A plan plus regular reviews' },
      { value: 'high', label: 'One-to-one coaching' },
    ],
  },
];

/**
 * Recommendation engine for "Find Your Plan".
 * Returns { category, tier, reason } — pure function, easy to test.
 */
export function recommendPlan({ goal, location, attention }) {
  const oneToOne = attention === 'high';
  const atHome = location === 'home';

  let category;
  let tier;
  let reason;

  if (oneToOne || atHome) {
    category = 'pt';
    if (atHome) {
      tier = 'home-pt';
      reason = 'You want to train at home with a coach present, so Home Personal Training is the fit.';
    } else if (goal === 'transform') {
      tier = 'transformation-coaching';
      reason = 'A full transformation needs phased blocks, nutrition structure and reviews — that is Transformation Coaching.';
    } else {
      tier = 'one-on-one-pt';
      reason = 'One-to-one attention means 1:1 Personal Training, with a coach on every session.';
    }
  } else {
    category = 'gym';
    if (attention === 'medium' || goal === 'lose' || goal === 'build' || goal === 'transform') {
      tier = 'transform';
      reason = 'You want a written plan with regular reviews — the TRANSFORM membership covers that.';
    } else if (goal === 'start') {
      tier = 'start';
      reason = 'Starting out is best kept simple. The START membership builds the habit first.';
    } else {
      tier = 'elite';
      reason = 'For maximum personalisation inside the gym, the ELITE membership gives you a named coach.';
    }
  }

  return { category, tier, reason };
}

export { pricingUnavailableText, formatPlanPrice };
export default ptPlans;
