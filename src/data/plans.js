/**
 * GYM MEMBERSHIP PLANS
 * ------------------------------------------------------------
 * PRICING IS INTENTIONALLY LEFT UNSET.
 * Set `price` (a number in INR) and `period` to publish real pricing.
 * While `price` is null, every CTA shows "Contact for plan details".
 * ------------------------------------------------------------
 * ⚠ EDIT ME — fill in price / period / durationOptions.
 */

export const pricingUnavailableText = 'Contact for plan details';

export const plans = [
  {
    id: 'start',
    tier: 'start',
    name: 'START',
    tagline: 'For beginners and people starting their fitness journey.',
    description:
      'Everything you need to build the habit: gym access, a basic plan and floor support while you learn the movements.',
    price: null,          // e.g. 999
    period: 'per month',  // e.g. 'per month'
    durationOptions: ['1 month', '3 months', '6 months'],
    highlight: false,
    badge: '',
    audience: 'First-timers, returners, people rebuilding a routine',
    features: [
      'Gym floor access',
      'Beginner orientation on every machine',
      'Basic weekly training plan',
      'Floor support during gym hours',
      'Diet structure guidance',
      'Progress check every month',
    ],
    notIncluded: ['One-to-one coach', 'Home sessions'],
    bestFor: 'gym',
    cta: { label: 'Start With START', action: 'contact', service: 'Gym Training' },
  },
  {
    id: 'transform',
    tier: 'transform',
    name: 'TRANSFORM',
    tagline: 'For people serious about structured progress.',
    description:
      'A written programme with regular reviews, so your training changes as your body does. Built for visible, measured progress.',
    price: null,
    period: 'per month',
    durationOptions: ['3 months', '6 months', '12 months'],
    highlight: true,
    badge: 'Most Popular',
    audience: 'Anyone who wants real change and has trained before',
    features: [
      'Everything in START',
      'Written, periodised training programme',
      'Progressive load planning',
      'Fortnightly progress reviews',
      'Conditioning and mobility work',
      'Goal-based nutrition structure',
      'Priority floor support',
      'Body measurement tracking',
    ],
    notIncluded: ['Home sessions'],
    bestFor: 'gym',
    cta: { label: 'Choose TRANSFORM', action: 'contact', service: 'Gym Training' },
  },
  {
    id: 'elite',
    tier: 'elite',
    name: 'ELITE',
    tagline: 'For people looking for a more personalised experience.',
    description:
      'The most personalised option. A named coach, tighter programming and reviews that adjust your plan rather than just logging it.',
    price: null,
    period: 'per month',
    durationOptions: ['3 months', '6 months', '12 months'],
    highlight: false,
    badge: 'Limited Slots',
    audience: 'Goal-driven members, competitors, transformation clients',
    features: [
      'Everything in TRANSFORM',
      'Named coach and direct contact',
      'Individually written programming',
      'Weekly plan adjustments',
      'Recovery and mobility guidance',
      'Detailed nutrition structure',
      'Priority slot booking',
      'Monthly in-depth review call',
    ],
    notIncluded: [],
    bestFor: 'pt',
    cta: { label: 'Apply for ELITE', action: 'contact', service: 'Personal Training' },
  },
];

export const planById = (id) => plans.find((p) => p.id === id);
export const planByTier = (tier) => plans.find((p) => p.tier === tier);

/** Criteria used by the plan comparison layout. */
export const planComparisonRows = [
  { key: 'audience', label: 'Best For' },
  { key: 'coach', label: 'Coach Support' },
  { key: 'plan', label: 'Training Plan' },
  { key: 'reviews', label: 'Progress Reviews' },
  { key: 'nutrition', label: 'Nutrition Guidance' },
  { key: 'slots', label: 'Booking' },
];

export const planComparison = [
  {
    tier: 'start',
    name: 'START',
    audience: 'Beginners',
    coach: 'Floor support',
    plan: 'Basic weekly plan',
    reviews: 'Monthly',
    nutrition: 'Diet structure',
    slots: 'Gym timings',
  },
  {
    tier: 'transform',
    name: 'TRANSFORM',
    audience: 'Serious progress',
    coach: 'Floor + plan reviews',
    plan: 'Periodised programme',
    reviews: 'Fortnightly',
    nutrition: 'Goal-based structure',
    slots: 'Priority',
  },
  {
    tier: 'elite',
    name: 'ELITE',
    audience: 'Personalised results',
    coach: 'Named coach',
    plan: 'Individually written',
    reviews: 'Weekly adjustments',
    nutrition: 'Detailed structure',
    slots: 'Priority booking',
  },
];

/** Formats a plan price, or falls back to the "contact us" line. */
export function formatPlanPrice(plan) {
  if (plan?.price === null || plan?.price === undefined || plan?.price === '') {
    return { amount: pricingUnavailableText, period: '', isAvailable: false };
  }
  const amount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(plan.price);
  return { amount, period: plan.period || '', isAvailable: true };
}

export default plans;
