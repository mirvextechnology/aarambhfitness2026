/**
 * consultationFlow — per-service configuration for the booking wizard.
 *
 * The old flow asked every visitor the same two questions ("What is your main
 * goal?" and "Coach preference") regardless of the service. That is wrong for,
 * say, Event & Security Staffing (there is no coach) or Diet & Nutrition (the
 * useful question is eating pattern, not a gym goal).
 *
 * Each service now defines:
 *   goal       — STEP 02. { short, title, copy, options[] }
 *   preference — STEP 03. { id, short, title, copy, options[] }
 *
 * `preference.id === 'coach'` renders the photo-based coach picker; anything
 * else renders compact text options. Every option is { value, label, note }.
 */
import { coachOptions } from './fitnessGoals.js';

const g = (value, label, note) => ({ value, label, note });

/* ---- shared option sets ---- */

const FITNESS_GOALS = [
  g('weight-loss', 'Lose Weight', 'Reduce overall body weight'),
  g('fat-loss', 'Lose Fat', 'Keep muscle, drop body fat'),
  g('muscle-gain', 'Build Muscle', 'Add lean size and shape'),
  g('strength', 'Increase Strength', 'Get stronger on the main lifts'),
  g('endurance', 'Improve Stamina', 'Last longer, recover faster'),
  g('general-fitness', 'General Fitness', 'Stay active and healthy'),
  g('beginner', 'Start Training', 'New to this — need the basics'),
];

const COACH = {
  id: 'coach',
  short: 'Coach',
  title: 'Coach preference',
  copy: 'Choose the coach you would be most comfortable training with.',
  options: coachOptions,
};

const THERAPIST = {
  id: 'coach',
  short: 'Therapist',
  title: 'Therapist preference',
  copy: 'Choose who you would be most comfortable working with.',
  options: coachOptions,
};

/* ---- per-service flows ---- */

const FLOWS = {
  'gym-training': {
    goal: { short: 'Goal', title: 'What is your main goal?', copy: 'Pick the one that matters most right now.', options: FITNESS_GOALS },
    preference: COACH,
  },

  'personal-training': {
    goal: { short: 'Goal', title: 'What should we focus on first?', copy: 'One-to-one coaching is built around this.', options: FITNESS_GOALS },
    preference: COACH,
  },

  'home-fitness': {
    goal: { short: 'Goal', title: 'What is your main goal at home?', copy: 'The home plan is built around this.', options: FITNESS_GOALS },
    preference: COACH,
  },

  'diet-nutrition': {
    goal: {
      short: 'Goal',
      title: 'What should the diet support?',
      copy: 'Food follows the objective.',
      options: [
        g('fat-loss', 'Fat Loss', 'Eat for a gentle deficit'),
        g('weight-loss', 'Weight Loss', 'Steady and sustainable'),
        g('muscle-gain', 'Muscle Gain', 'Eat to build'),
        g('maintenance', 'Maintenance / Health', 'Balanced everyday eating'),
      ],
    },
    preference: {
      id: 'diet',
      short: 'Diet Type',
      title: 'What is your eating pattern?',
      copy: 'So the plan fits what you actually eat.',
      options: [
        g('veg', 'Vegetarian', 'No meat, no eggs'),
        g('egg', 'Eggetarian', 'Vegetarian plus eggs'),
        g('nonveg', 'Non-vegetarian', 'Includes meat or fish'),
        g('vegan', 'Vegan', 'Plant-based only'),
      ],
    },
  },

  'exercise-planning': {
    goal: {
      short: 'Goal',
      title: 'What is the written plan for?',
      copy: 'This sets the structure of your programme.',
      options: [
        g('strength', 'Build Strength', 'Progressive heavy work'),
        g('muscle-gain', 'Build Muscle', 'Volume and progression'),
        g('fat-loss', 'Fat Loss', 'Training plus a deficit'),
        g('endurance', 'Improve Stamina', 'Conditioning focus'),
        g('general-fitness', 'General Fitness', 'A balanced base'),
      ],
    },
    preference: {
      id: 'setup',
      short: 'Setup',
      title: 'Where will you follow the plan?',
      copy: 'So every exercise matches your equipment.',
      options: [
        g('gym', 'Full Gym', 'Machines, bars and weights'),
        g('home-basic', 'Home (basic equipment)', 'Dumbbells, bands or a mat'),
        g('home-none', 'Home (no equipment)', 'Bodyweight only'),
      ],
    },
  },

  physiotherapy: {
    goal: {
      short: 'Focus',
      title: 'What do you need help with?',
      copy: 'This tells us how to structure your recovery.',
      options: [
        g('injury', 'Recover From Injury', 'Return to normal, safely'),
        g('pain', 'Reduce Pain / Stiffness', 'Back, knee, shoulder, neck'),
        g('mobility', 'Improve Mobility', 'Move better, feel looser'),
        g('return', 'Return To Sport', 'Rebuild after time off'),
        g('posture', 'Posture / Desk Strain', 'Comfort at a desk'),
      ],
    },
    preference: THERAPIST,
  },

  'bouncer-services': {
    goal: {
      short: 'Purpose',
      title: 'What is the event or purpose?',
      copy: 'This helps us send the right team and plan.',
      options: [
        g('wedding', 'Wedding / Family Event', 'Crowd and gate management'),
        g('corporate', 'Corporate / Office Event', 'Discreet, presentable staff'),
        g('party', 'Private Party / Concert', 'Entry control and safety'),
        g('venue', 'Shop / Venue Security', 'One-day or regular venue cover'),
        g('other', 'Something Else', 'Describe it in the next steps'),
      ],
    },
    preference: {
      id: 'scale',
      short: 'Scale',
      title: 'How much cover do you need?',
      copy: 'A rough idea is fine — we confirm the details on a call.',
      options: [
        g('single', 'Single Event (1 day)', 'One-off coverage'),
        g('multi', 'Multi-day Event', 'Two to seven days'),
        g('ongoing', 'Ongoing Venue Security', 'Regular weekly cover'),
        g('unsure', 'Not Sure Yet', 'Help me decide'),
      ],
    },
  },

  'fitness-consultation': {
    goal: {
      short: 'Reason',
      title: 'What brings you in?',
      copy: 'The consultation is shaped around this.',
      options: [
        g('not-sure', 'Not Sure Where To Start', 'Help me find a direction'),
        g('plan', 'I Want A Clear Plan', 'Leave with next steps'),
        g('assessment', 'I Want An Assessment', 'Measure where I am'),
        g('stuck', 'I Am Stuck / Plateaued', 'Break through a plateau'),
      ],
    },
    preference: {
      id: 'format',
      short: 'Format',
      title: 'How would you like the consultation?',
      copy: 'Pick whatever is most convenient for you.',
      options: [
        g('gym', 'In Person At The Gym', 'See the floor and meet a coach'),
        g('home', 'At Home', 'We come to you'),
        g('call', 'Phone / Video Call', 'Quick and convenient'),
      ],
    },
  },
};

/** Flow config for a service; falls back to the standard training flow. */
export function getServiceFlow(serviceId) {
  return (
    FLOWS[serviceId] || {
      goal: { short: 'Goal', title: 'What is your main goal?', copy: 'Pick the one that matters most right now.', options: FITNESS_GOALS },
      preference: COACH,
    }
  );
}

export default FLOWS;
