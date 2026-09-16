/**
 * FITNESS GOALS — drives the Goal Planner, Assessment and Consultation goal step.
 * Every goal maps to a training style, frequency, service and plan category.
 */

/*
 * `planCategory` + `planTier` point at a recommended plan:
 *   planCategory 'gym' -> planTier is a plans.js `tier` ('start'|'transform'|'elite')
 *   planCategory 'pt'  -> planTier is a ptPlans.js `id` ('one-on-one-pt'|...)
 */
export const goals = [
  {
    id: 'weight-loss',
    label: 'Lose Weight',
    short: 'Weight Loss',
    description: 'Reduce overall body weight with a sustainable calorie and movement plan.',
    trainingStyle: 'Mixed strength + steady cardio',
    frequency: '4–5 sessions per week',
    focus: 'Calorie-aware training, full-body strength, daily step target',
    service: 'gym-training',
    planCategory: 'gym',
    planTier: 'transform',
    timeline: '8–16 weeks',
    dietGoal: 'weight-loss',
    tips: [
      'Strength work first, cardio second',
      'Protein at every meal',
      'Track weekly average, not daily weight',
    ],
  },
  {
    id: 'fat-loss',
    label: 'Lose Fat',
    short: 'Fat Loss',
    description: 'Drop body fat while keeping the muscle you already have.',
    trainingStyle: 'Strength-focused with conditioning finishers',
    frequency: '4–6 sessions per week',
    focus: 'Progressive overload, metabolic conditioning, protein-forward eating',
    service: 'personal-training',
    planCategory: 'pt',
    planTier: 'one-on-one-pt',
    timeline: '10–16 weeks',
    dietGoal: 'weight-loss',
    tips: [
      'Do not skip strength training',
      'Keep rest between hard sets short',
      'Sleep 7+ hours — it matters',
    ],
  },
  {
    id: 'muscle-gain',
    label: 'Build Muscle',
    short: 'Muscle Gain',
    description: 'Add lean muscle through progressive resistance training and enough food.',
    trainingStyle: 'Progressive resistance training, split programming',
    frequency: '4–6 sessions per week',
    focus: 'Compound lifts, progressive overload, calorie surplus, protein intake',
    service: 'personal-training',
    planCategory: 'pt',
    planTier: 'one-on-one-pt',
    timeline: '12–24 weeks',
    dietGoal: 'muscle-gain',
    tips: [
      'Add load or reps every week',
      'Eat slightly more than you burn',
      'Train each muscle twice a week',
    ],
  },
  {
    id: 'strength',
    label: 'Increase Strength',
    short: 'Strength',
    description: 'Get measurably stronger on the main lifts.',
    trainingStyle: 'Low-rep, high-intensity strength blocks',
    frequency: '3–5 sessions per week',
    focus: 'Squat, hinge, press and pull progression with planned deloads',
    service: 'personal-training',
    planCategory: 'pt',
    planTier: 'one-on-one-pt',
    timeline: '12 weeks per block',
    dietGoal: 'maintenance',
    tips: [
      'Technique before load, always',
      'Rest 2–4 min on heavy sets',
      'Plan a deload every 4th week',
    ],
  },
  {
    id: 'endurance',
    label: 'Improve Endurance',
    short: 'Endurance',
    description: 'Build stamina for sport, running or long working days.',
    trainingStyle: 'Aerobic base + interval conditioning',
    frequency: '4–5 sessions per week',
    focus: 'Zone-2 cardio, intervals, circuit strength, breathing control',
    service: 'gym-training',
    planCategory: 'gym',
    planTier: 'transform',
    timeline: '8–12 weeks',
    dietGoal: 'maintenance',
    tips: [
      'Keep easy sessions genuinely easy',
      'One hard interval session per week',
      'Build weekly volume slowly',
    ],
  },
  {
    id: 'general-fitness',
    label: 'General Fitness',
    short: 'General Fitness',
    description: 'Feel healthier, stronger and more energetic day to day.',
    trainingStyle: 'Balanced full-body training',
    frequency: '3–4 sessions per week',
    focus: 'Full-body strength, mobility, moderate cardio, consistency',
    service: 'gym-training',
    planCategory: 'gym',
    planTier: 'start',
    timeline: 'Ongoing',
    dietGoal: 'general-fitness',
    tips: [
      'Consistency beats intensity',
      'Warm up properly every session',
      'Add mobility work twice a week',
    ],
  },
  {
    id: 'beginner',
    label: 'Start Training',
    short: 'Beginner',
    description: 'Never trained before and want a safe, guided start.',
    trainingStyle: 'Guided beginner programme, full-body',
    frequency: '2–3 sessions per week',
    focus: 'Movement patterns, technique, habit building, gradual load increase',
    service: 'personal-training',
    planCategory: 'gym',
    planTier: 'start',
    timeline: 'First 8 weeks',
    dietGoal: 'general-fitness',
    tips: [
      'Learn form before adding weight',
      'Two sessions a week is enough to start',
      'Expect soreness in week one',
    ],
  },
  {
    id: 'transformation',
    label: 'Body Transformation',
    short: 'Transformation',
    description: 'A committed block combining training, diet and tracking.',
    trainingStyle: 'Combined strength + conditioning blocks',
    frequency: '5–6 sessions per week',
    focus: 'Phased training blocks, structured nutrition, fortnightly reviews',
    service: 'personal-training',
    planCategory: 'pt',
    planTier: 'transformation-coaching',
    timeline: '12–24 weeks',
    dietGoal: 'weight-loss',
    tips: [
      'Review photos and measurements monthly',
      'Nutrition decides most of the result',
      'Expect plateaus — the plan adjusts',
    ],
  },
];

export const goalById = (id) => goals.find((g) => g.id === id);
export const goalByLabel = (label) =>
  goals.find((g) => g.label.toLowerCase() === String(label || '').toLowerCase());
export const goalOptions = goals.map((g) => ({ value: g.label, label: g.label }));

/** Diet planner objectives. */
export const dietGoals = [
  {
    id: 'weight-loss',
    label: 'Weight Loss',
    note: 'Moderate calorie reduction with high protein and fibre.',
    principle: 'Slightly fewer calories, more protein and vegetables, fewer fried and sugary items.',
  },
  {
    id: 'muscle-gain',
    label: 'Muscle Gain',
    note: 'Calorie surplus with regular protein across the day.',
    principle: 'Slightly more calories, protein at every meal, carbs around training.',
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    note: 'Hold current weight while improving strength and energy.',
    principle: 'Balanced intake, consistent meal timing, steady hydration.',
  },
  {
    id: 'general-fitness',
    label: 'General Fitness',
    note: 'Clean, simple, sustainable everyday eating.',
    principle: 'Home-cooked meals, controlled portions, less processed food.',
  },
];

/**
 * SAMPLE DAY — general eating structure only.
 * Deliberately food-generic and non-medical. Portions are indicative.
 */
export const sampleDay = {
  'weight-loss': [
    { slot: 'Morning', item: 'Warm water + a handful of soaked almonds' },
    { slot: 'Breakfast', item: 'Vegetable poha or 2 egg whites with 1 whole egg + fruit' },
    { slot: 'Mid-morning', item: 'Buttermilk or green tea' },
    { slot: 'Lunch', item: '2 rotis + dal + a bowl of sabzi + salad + curd' },
    { slot: 'Evening', item: 'Roasted chana or sprouts chaat' },
    { slot: 'Pre-workout', item: 'Black coffee or a small banana' },
    { slot: 'Post-workout', item: 'Whey scoop or 3 egg whites / paneer' },
    { slot: 'Dinner', item: '1 roti + dal + sabzi + salad (lighter than lunch)' },
  ],
  'muscle-gain': [
    { slot: 'Morning', item: 'Warm water + banana + soaked almonds and dates' },
    { slot: 'Breakfast', item: '3–4 egg omelette or paneer paratha + a glass of milk' },
    { slot: 'Mid-morning', item: 'Peanut butter sandwich or a fruit smoothie with curd' },
    { slot: 'Lunch', item: '3 rotis + rice + dal + chicken or paneer + sabzi + curd' },
    { slot: 'Evening', item: 'Sprouts bhel or a handful of nuts + fruit' },
    { slot: 'Pre-workout', item: 'Banana + black coffee' },
    { slot: 'Post-workout', item: 'Whey scoop + banana, or 4 egg whites' },
    { slot: 'Dinner', item: '2 rotis + rice + dal + protein source + salad' },
  ],
  maintenance: [
    { slot: 'Morning', item: 'Warm water + soaked almonds' },
    { slot: 'Breakfast', item: 'Idli/dosa with sambar, or oats with milk and fruit' },
    { slot: 'Mid-morning', item: 'A seasonal fruit' },
    { slot: 'Lunch', item: '2 rotis + rice + dal + sabzi + curd + salad' },
    { slot: 'Evening', item: 'Tea/coffee with a small portion of roasted snacks' },
    { slot: 'Pre-workout', item: 'A small banana or dates' },
    { slot: 'Post-workout', item: 'Curd, milk or a protein source of your choice' },
    { slot: 'Dinner', item: '2 rotis + dal + sabzi + salad' },
  ],
  'general-fitness': [
    { slot: 'Morning', item: 'Warm water + a handful of soaked nuts' },
    { slot: 'Breakfast', item: 'Poha, upma or eggs with whole-wheat toast' },
    { slot: 'Mid-morning', item: 'Buttermilk or a fruit' },
    { slot: 'Lunch', item: '2 rotis + dal + sabzi + curd + salad' },
    { slot: 'Evening', item: 'Roasted chana or a small bowl of sprouts' },
    { slot: 'Pre-workout', item: 'A banana or 2 dates' },
    { slot: 'Post-workout', item: 'Milk with a scoop of protein, or paneer' },
    { slot: 'Dinner', item: '1–2 rotis + dal + sabzi + salad' },
  ],
};

/** Assessment question set (60-second fitness assessment). */
export const assessmentQuestions = [
  { id: 'age', label: 'What is your age?', type: 'number', unit: 'years', min: 12, max: 90 },
  { id: 'gender', label: 'Gender', type: 'choice', options: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Prefer not to say' },
  ] },
  { id: 'height', label: 'Height', type: 'height' },
  { id: 'weight', label: 'Current weight', type: 'number', unit: 'kg', min: 25, max: 300, step: 0.5 },
  { id: 'activity', label: 'Daily activity level', type: 'choice', options: [
    { value: 'sedentary', label: 'Mostly sitting' },
    { value: 'light', label: 'Lightly active' },
    { value: 'moderate', label: 'Moderately active' },
    { value: 'high', label: 'Very active' },
  ] },
  { id: 'experience', label: 'Training experience', type: 'choice', options: [
    { value: 'none', label: 'Never trained' },
    { value: 'beginner', label: 'Under 6 months' },
    { value: 'intermediate', label: '6 months – 2 years' },
    { value: 'advanced', label: 'Over 2 years' },
  ] },
  { id: 'goal', label: 'Primary goal', type: 'choice', options: goals.map((g) => ({ value: g.id, label: g.label })) },
  { id: 'frequency', label: 'How many days can you train?', type: 'choice', options: [
    { value: '2', label: '2 days a week' },
    { value: '3', label: '3 days a week' },
    { value: '4', label: '4 days a week' },
    { value: '5', label: '5+ days a week' },
  ] },
  { id: 'location', label: 'Where do you want to train?', type: 'choice', options: [
    { value: 'gym', label: 'At the gym' },
    { value: 'home', label: 'At home' },
    { value: 'both', label: 'A mix of both' },
  ] },
  { id: 'coach', label: 'Coach preference', type: 'choice', options: [
    { value: 'male', label: 'Male coach' },
    { value: 'female', label: 'Female coach' },
    { value: 'any', label: 'No preference' },
  ] },
];

export const coachOptions = [
  { value: 'male', label: 'Male Coach', note: 'A male coach will be assigned to your sessions.' },
  { value: 'female', label: 'Female Coach', note: 'A female coach will be assigned to your sessions.' },
  { value: 'any', label: 'No Preference', note: 'We will assign whichever coach fits your slot best.' },
];

export default goals;
