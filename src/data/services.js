/**
 * SERVICES — single source of truth for every service offered.
 * Used by: home rail, services page, comparison, consultation, footer, WhatsApp copy.
 */
import gymInterior from '../assets/images/gym-interior.jpg';
import maleAthlete from '../assets/images/male-athlete.jpg';
import femaleAthlete from '../assets/images/female-athlete.jpg';
import maleCoach from '../assets/images/male-coach.jpg';
import femaleCoach from '../assets/images/female-coach.jpg';
import homeFitness from '../assets/images/home-fitness.jpg';
import recovery from '../assets/images/recovery.jpg';
import consultation from '../assets/images/consultation.jpg';
import eventSecurity from '../assets/images/event-security.jpg';
import heroAthlete from '../assets/images/hero-athlete.jpg';

export const services = [
  {
    id: 'gym-training',
    number: '01',
    slug: 'gym-training',
    name: 'Gym Training',
    shortName: 'Gym Training',
    tagline: 'Train properly, in a proper facility.',
    description:
      'Structured gym training in Kaurihar with coached sessions, correct technique and a plan written for your level. Beginners are walked through every machine and movement before they are left to train alone.',
    image: gymInterior,
    imageAlt: 'Dark premium gym interior at Aarambh Fitness, Kaurihar',
    heroImage: heroAthlete,
    duration: '60–90 min per session',
    location: 'In-gym, Kaurihar',
    forWho: [
      'Beginners who have never trained in a gym',
      'People returning after a long break',
      'Anyone who wants a written plan instead of random workouts',
    ],
    includes: [
      'Technique coaching on every exercise',
      'Written weekly training split',
      'Progressive load planning',
      'Strength and conditioning mix',
      'Access guidance for gym timings',
    ],
    benefits: [
      'Build strength and muscle safely',
      'Improve stamina and daily energy',
      'Learn correct form from day one',
      'Stay consistent with a fixed routine',
    ],
    tags: ['Strength', 'Conditioning', 'Technique'],
    cta: { label: 'Start Gym Training', action: 'consultation' },
  },
  {
    id: 'personal-training',
    number: '02',
    slug: 'personal-training',
    name: 'Personal Training',
    shortName: 'Personal Training',
    tagline: 'One coach. One plan. Full attention.',
    description:
      'One-to-one coaching with a dedicated trainer. Your coach tracks every session, corrects your form in real time and adjusts the plan as you improve. Male and female coaches available.',
    image: maleCoach,
    imageAlt: 'Male personal trainer coaching a session at Aarambh Fitness',
    secondaryImage: femaleCoach,
    secondaryImageAlt: 'Female fitness coach at Aarambh Fitness',
    duration: '45–60 min per session',
    location: 'In-gym, Kaurihar',
    forWho: [
      'People who want faster, safer progress',
      'Anyone recovering confidence after injury',
      'Members who need accountability',
      'Clients preparing for a specific goal or event',
    ],
    includes: [
      'Dedicated one-to-one coach',
      'Session-by-session programming',
      'Real-time form correction',
      'Progress tracking and reviews',
      'Male or female coach on request',
    ],
    benefits: [
      'Maximum attention per session',
      'Lower risk of injury',
      'Faster visible progress',
      'A plan that adapts to your week',
    ],
    tags: ['1:1 Coaching', 'Accountability', 'Progress Tracking'],
    cta: { label: 'Book Personal Training', action: 'consultation' },
  },
  {
    id: 'home-fitness',
    number: '03',
    slug: 'home-fitness',
    name: 'Home Fitness',
    shortName: 'Home Fitness',
    tagline: 'Your gym can come home.',
    description:
      'A coach trains you at your place. Same structure, same plan, same attention — without travel. Ideal for busy schedules, families and anyone who prefers privacy.',
    image: homeFitness,
    imageAlt: 'Female coach guiding a home training session in a living room',
    duration: '45–60 min per session',
    location: 'At your home, Kaurihar & nearby Prayagraj',
    forWho: [
      'People who cannot travel to the gym daily',
      'Those who prefer privacy while training',
      'Busy professionals and parents',
      'Seniors who need supervised, gentle training',
    ],
    includes: [
      'Coach visits your home',
      'Male or female coach on request',
      'Equipment-free or minimal-equipment plans',
      'Flexible session timings',
      'Goal-based programming',
    ],
    benefits: [
      'Zero travel time',
      'Train in a comfortable environment',
      'Easy to keep consistent',
      'Full personal attention',
    ],
    tags: ['At Home', 'Flexible', 'Private'],
    cta: { label: 'Book Home Fitness', action: 'consultation' },
  },
  {
    id: 'diet-nutrition',
    number: '04',
    slug: 'diet-nutrition',
    name: 'Diet & Nutrition Guidance',
    shortName: 'Diet Guidance',
    tagline: 'Food that supports the training, not fights it.',
    description:
      'Practical, Indian-food-first eating guidance built around your goal, budget and household kitchen. No crash diets, no imported supplements pushed on you — just a sustainable daily pattern.',
    image: consultation,
    imageAlt: 'Trainer discussing a nutrition plan with a member',
    duration: 'Ongoing guidance',
    location: 'In-person or over call',
    forWho: [
      'People who train but see no change',
      'Anyone confused by conflicting diet advice',
      'Members managing weight alongside training',
    ],
    includes: [
      'Goal-based daily meal structure',
      'Indian-food-friendly options',
      'Portion and timing guidance',
      'Pre and post workout meals',
      'Adjustments based on progress',
    ],
    benefits: [
      'Supports fat loss or muscle gain',
      'Uses food already at home',
      'Realistic and sustainable',
      'Reviewed as your body changes',
    ],
    tags: ['Meal Structure', 'Indian Food', 'Sustainable'],
    disclaimer:
      'This is general nutrition guidance, not medical diet therapy. For diabetes, thyroid, kidney or other medical conditions, consult a qualified doctor or registered dietitian.',
    cta: { label: 'Get Diet Guidance', action: 'consultation' },
  },
  {
    id: 'exercise-planning',
    number: '05',
    slug: 'exercise-planning',
    name: 'Exercise Planning',
    shortName: 'Exercise Planning',
    tagline: 'A written plan you can actually follow.',
    description:
      'A structured exercise programme written for you: exercises, sets, reps, rest and progression across the week. Use it with a coach or follow it independently.',
    image: maleAthlete,
    imageAlt: 'Athlete following a structured barbell training plan',
    duration: 'Weekly programme',
    location: 'In-person or digital',
    forWho: [
      'People who know how to train but not what to do next',
      'Members who train alone and stall often',
      'Anyone preparing for a strength or fitness goal',
    ],
    includes: [
      'Weekly split with exercises and volume',
      'Sets, reps and rest guidance',
      'Progression rules week to week',
      'Warm-up and mobility work',
      'Deload and review points',
    ],
    benefits: [
      'No more guessing in the gym',
      'Progression is planned, not random',
      'Works even without a coach present',
      'Easy to review and adjust',
    ],
    tags: ['Written Plan', 'Progression', 'Self-guided'],
    cta: { label: 'Get an Exercise Plan', action: 'consultation' },
  },
  {
    id: 'physiotherapy',
    number: '06',
    slug: 'physiotherapy',
    name: 'Physiotherapy Support',
    shortName: 'Physiotherapy',
    tagline: 'Train. Recover. Return stronger.',
    description:
      'Movement assessment, mobility work and guided recovery to help you train around niggles and return to full training safely. Handled by trained professionals working within their scope of practice.',
    image: recovery,
    imageAlt: 'Physiotherapy professional guiding a shoulder mobility assessment',
    duration: '45–60 min per session',
    location: 'In-person, Kaurihar',
    forWho: [
      'People with recurring joint or back discomfort',
      'Anyone returning after a break or injury',
      'Athletes who need recovery between hard blocks',
      'Members with poor mobility limiting their training',
    ],
    includes: [
      'Movement and posture assessment',
      'Mobility and flexibility work',
      'Guided exercise rehabilitation support',
      'Recovery guidance between sessions',
      'Return-to-training progression',
    ],
    benefits: [
      'Move better, train longer',
      'Reduce recurring discomfort',
      'Safer return to training',
      'Better posture and joint range',
    ],
    tags: ['Mobility', 'Recovery', 'Assessment'],
    disclaimer:
      'Physiotherapy support is provided by qualified professionals within their scope of practice and is not a substitute for medical diagnosis or hospital treatment. Seek a doctor for acute pain, swelling or suspected injury.',
    cta: { label: 'Book a Physio Session', action: 'consultation' },
  },
  {
    id: 'bouncer-services',
    number: '07',
    slug: 'bouncer-services',
    name: 'Event & Security Staffing',
    shortName: 'Event Security',
    tagline: 'Calm, presentable crowd management.',
    description:
      'Professional, well-groomed event staffing for weddings, private functions, corporate events and venues. Our team manages entry, flow and crowd control with a courteous, non-aggressive approach.',
    image: eventSecurity,
    imageAlt: 'Professional event security staff at a wedding venue entrance',
    duration: 'Per event, shift based',
    location: 'Prayagraj & nearby',
    forWho: [
      'Wedding and function organisers',
      'Corporate event teams',
      'Venues, clubs and banquet halls',
      'Private parties and gatherings',
    ],
    includes: [
      'Entry and guest flow management',
      'Crowd management and queue control',
      'Venue and VIP area support',
      'Shift-based deployment',
      'Uniformed, briefed personnel',
    ],
    benefits: [
      'Smooth, orderly events',
      'Presentable, trained staff',
      'Flexible headcount per event',
      'Clear point of contact on-site',
    ],
    tags: ['Weddings', 'Corporate', 'Crowd Management'],
    cta: { label: 'Request Security Support', action: 'contact' },
  },
  {
    id: 'fitness-consultation',
    number: '08',
    slug: 'fitness-consultation',
    name: 'Fitness Consultation',
    shortName: 'Consultation',
    tagline: 'Start with a clear direction.',
    description:
      'A sit-down session to understand your goal, current fitness, schedule and any health limits. You leave with a clear, honest starting point and the right service recommendation.',
    image: femaleAthlete,
    imageAlt: 'Fitness consultation with a member at Aarambh Fitness',
    duration: '30–45 min',
    location: 'In-person or call',
    forWho: [
      'Complete beginners unsure where to start',
      'People who have tried and stopped before',
      'Anyone unsure which service fits them',
    ],
    includes: [
      'Goal and lifestyle discussion',
      'Current fitness and movement review',
      'Honest service recommendation',
      'A written starting plan',
      'Next-step guidance',
    ],
    benefits: [
      'Clarity before you spend anything',
      'Realistic expectations set early',
      'The right service, first time',
      'A plan you can start immediately',
    ],
    tags: ['Assessment', 'Guidance', 'No Pressure'],
    cta: { label: 'Book a Consultation', action: 'consultation' },
  },
];

export const serviceById = (id) => services.find((s) => s.id === id);
export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);

/** Options used in every service dropdown across the site. */
export const serviceOptions = services.map((s) => ({ value: s.name, label: s.name }));

/** Compact list for footer + mobile menus. */
export const footerServices = [
  { label: 'Gym Training', slug: 'gym-training' },
  { label: 'Personal Training', slug: 'personal-training' },
  { label: 'Home Fitness', slug: 'home-fitness' },
  { label: 'Diet Guidance', slug: 'diet-nutrition' },
  { label: 'Physiotherapy', slug: 'physiotherapy' },
  { label: 'Event & Security Staffing', slug: 'bouncer-services' },
];

/** Criteria used by the service comparison block. */
export const comparisonCriteria = [
  { key: 'attention', label: 'Personal Attention' },
  { key: 'location', label: 'Location' },
  { key: 'coach', label: 'Coach Involvement' },
  { key: 'flexibility', label: 'Flexibility' },
  { key: 'planning', label: 'Goal Planning' },
  { key: 'ideal', label: 'Ideal For' },
];

export const serviceComparison = [
  {
    serviceId: 'gym-training',
    name: 'Gym Training',
    attention: 'Floor support + group',
    location: 'At the gym, Kaurihar',
    coach: 'Coach on the floor',
    flexibility: 'Fixed gym timings',
    planning: 'Structured weekly split',
    ideal: 'Consistency, full equipment access',
  },
  {
    serviceId: 'personal-training',
    name: 'Personal Training',
    attention: 'One-to-one, full focus',
    location: 'At the gym, Kaurihar',
    coach: 'Dedicated coach',
    flexibility: 'Slot-based booking',
    planning: 'Written, tracked plan',
    ideal: 'Faster progress, accountability',
  },
  {
    serviceId: 'home-fitness',
    name: 'Home Fitness',
    attention: 'One-to-one at your place',
    location: 'Your home',
    coach: 'Dedicated visiting coach',
    flexibility: 'Most flexible timings',
    planning: 'Written, tracked plan',
    ideal: 'Busy schedules, privacy',
  },
  {
    serviceId: 'fitness-consultation',
    name: 'Consultation',
    attention: 'One-to-one discussion',
    location: 'In-person or call',
    coach: 'Trainer assessment',
    flexibility: 'Single session',
    planning: 'Starting-point roadmap',
    ideal: 'Deciding where to begin',
  },
];

export default services;
