/**
 * TRAINERS / COACHES
 * ------------------------------------------------------------
 * ⚠ IMPORTANT: This array ships EMPTY on purpose.
 * We do not publish invented trainer names or credentials.
 *
 * Add real coaches using this exact shape and the Team Preview,
 * Coach Selection and Careers pages pick them up automatically:
 *
 * {
 *   id: 'coach-01',
 *   name: 'Full Name',
 *   role: 'Head Trainer',
 *   gender: 'male' | 'female',
 *   expertise: ['Strength Training', 'Fat Loss'],
 *   certifications: ['ACE CPT'],
 *   experience: '6 years',
 *   bio: 'One or two honest lines about their approach.',
 *   image: importedImage,       // optional
 *   imageAlt: 'Descriptive alt text',
 *   accepting: true,            // shown in coach selection
 * }
 * ------------------------------------------------------------
 */
import maleCoach from '../assets/images/male-coach.jpg';
import femaleCoach from '../assets/images/female-coach.jpg';

export const trainers = [
  // ⚠ EDIT ME — add real coaches here.
];

/**
 * Role-based coach cards.
 * These describe the *type* of coach available, not named individuals,
 * so they stay accurate even before real profiles are added.
 */
export const coachRoles = [
  {
    id: 'male-coach',
    title: 'Male Coach',
    role: 'Strength & Conditioning',
    gender: 'male',
    image: maleCoach,
    imageAlt: 'Male fitness coach at Aarambh Fitness',
    focus: ['Strength training', 'Muscle gain', 'Beginner guidance'],
  },
  {
    id: 'female-coach',
    title: 'Female Coach',
    role: 'Fat Loss & Home Fitness',
    gender: 'female',
    image: femaleCoach,
    imageAlt: 'Female fitness coach at Aarambh Fitness',
    focus: ['Fat loss', 'Home fitness', 'Mobility and recovery'],
  },
];

/** Options for the consultation coach step + all coach dropdowns. */
export const coachPreferenceOptions = [
  { value: 'male', label: 'Male Coach' },
  { value: 'female', label: 'Female Coach' },
  { value: 'any', label: 'No Preference' },
];

export const coachLabel = (value) =>
  ({ male: 'Male Coach', female: 'Female Coach', any: 'No Preference' }[value] || 'No Preference');

/** Roles the Careers page recruits for. */
export const openPositions = [
  {
    id: 'gym-trainer',
    title: 'Gym Trainer',
    type: 'Full-time',
    location: 'Kaurihar, Prayagraj',
    gender: 'Open to all',
    summary: 'Coach members on the floor, teach technique and keep sessions safe and structured.',
    responsibilities: [
      'Guide members through workouts and correct form',
      'Maintain equipment and floor safety',
      'Support new member orientation',
      'Track member progress notes',
    ],
    requirements: ['Basic fitness certification preferred', 'Good communication in Hindi and English', 'Reliable and punctual'],
  },
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    type: 'Full-time / Part-time',
    location: 'Kaurihar, Prayagraj',
    gender: 'Open to all',
    summary: 'Deliver one-to-one sessions with written programming and regular client reviews.',
    responsibilities: [
      'Write and deliver individual programmes',
      'Run 1:1 and small-group sessions',
      'Review client progress every fortnight',
      'Coordinate nutrition structure guidance',
    ],
    requirements: ['Certified personal trainer', '1+ year client-facing experience', 'Programming knowledge'],
  },
  {
    id: 'male-coach',
    title: 'Male Fitness Coach',
    type: 'Full-time / Part-time',
    location: 'Kaurihar, Prayagraj',
    gender: 'Male',
    summary: 'Strength and conditioning focused coaching for gym and personal training clients.',
    responsibilities: [
      'Coach strength and hypertrophy sessions',
      'Support conditioning blocks',
      'Maintain session logs',
    ],
    requirements: ['Fitness certification', 'Strength training background', 'Client-facing experience'],
  },
  {
    id: 'female-coach',
    title: 'Female Fitness Coach',
    type: 'Full-time / Part-time',
    location: 'Kaurihar, Prayagraj',
    gender: 'Female',
    summary: 'Coaching for female members, with a focus on fat loss, mobility and home fitness.',
    responsibilities: [
      'Coach female members in-gym and at home',
      'Deliver fat-loss and mobility programmes',
      'Support beginner orientation',
    ],
    requirements: ['Fitness certification', 'Experience coaching female clients', 'Comfortable with home sessions'],
  },
  {
    id: 'home-fitness-coach',
    title: 'Home Fitness Coach',
    type: 'Part-time / Flexible',
    location: 'Kaurihar & nearby Prayagraj',
    gender: 'Open to all',
    summary: 'Deliver in-home training sessions across a defined service area.',
    responsibilities: [
      'Travel to client homes on schedule',
      'Deliver equipment-free programmes',
      'Report session progress',
    ],
    requirements: ['Own transport preferred', 'Punctual and professional', 'Home-session experience a plus'],
  },
  {
    id: 'physio',
    title: 'Physiotherapy Professional',
    type: 'Full-time / Part-time',
    location: 'Kaurihar, Prayagraj',
    gender: 'Open to all',
    summary: 'Movement assessment, mobility work and guided recovery support for members.',
    responsibilities: [
      'Run movement and posture assessments',
      'Deliver mobility and rehab support sessions',
      'Advise safe return-to-training progression',
    ],
    requirements: ['Recognised physiotherapy qualification', 'Clinical experience', 'Registered where required'],
  },
];

export const trainerSpecialisations = [
  'Strength Training',
  'Fat Loss',
  'Muscle Gain',
  'Functional Training',
  'Home Fitness',
  'Physiotherapy',
  'Mobility & Recovery',
  'Beginner Coaching',
  'Sports Conditioning',
];

export const trainerWorkTypes = ['Full-time', 'Part-time', 'Weekends only', 'Flexible / per session'];

export default trainers;
