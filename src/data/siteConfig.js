/**
 * ============================================================
 *  SITE CONFIG — Aarambh Fitness
 * ------------------------------------------------------------
 *  Update business details HERE ONLY.
 *  Components read from this file; no UI edit required.
 *
 *  Anything marked  ⚠ EDIT ME  must be replaced with real
 *  business data before going live.
 * ============================================================
 */

const env = import.meta.env || {};

/** Strip a phone number down to digits for tel:/wa.me links. */
const digits = (value = '') => String(value).replace(/\D/g, '');

/**
 * ⚠ EDIT ME — contact details.
 * Values here are safe defaults; override them with real details,
 * or supply them through .env (VITE_WHATSAPP_NUMBER).
 */
export const contact = {
  businessName: 'Aarambh Fitness',
  legalName: 'Aarambh Fitness',
  tagline: 'Your only competition is you.',

  address: {
    line1: 'Aarambh Fitness, Kaurihar (Near SBI Bank)',
    city: 'Prayagraj',
    state: 'Uttar Pradesh',
    country: 'India',
    postalCode: '229412',
    geoHint: 'Kaurihar (Near SBI Bank), Prayagraj, Uttar Pradesh 229412',
  },

  /** Real phone number (from the live Google listing). */
  phone: '+91 79057 94950',
  /** Real WhatsApp number — overridable via VITE_WHATSAPP_NUMBER. */
  whatsapp: env.VITE_WHATSAPP_NUMBER ? digits(env.VITE_WHATSAPP_NUMBER) : '917905794950',
  /** ⚠ EDIT ME — real email */
  email: 'hello@aarambhfitness.in',

  /**
   * ⚠ EDIT ME — Google Maps embed URL.
   * Supply the full embed link from Google Maps → Share → Embed a map.
   * Leave empty to fall back to a directions link instead of an iframe.
   */
  mapsEmbedUrl: env.VITE_GOOGLE_MAPS_URL || '',

  /** Fallback when no embed URL is configured. */
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Aarambh Fitness Kaurihar Near SBI Bank Prayagraj Uttar Pradesh 229412'),
};

/**
 * Live Google Business Profile snapshot (5.0 from 1 review).
 * Shown verbatim with a link to the listing — never inflated.
 */
export const googleRating = {
  rating: 5.0,
  reviews: 1,
  url: 'https://www.google.com/search?q=aarambh+gym+kaurihar',
};

export const contactAddressText = [
  contact.address.line1,
  contact.address.city,
  contact.address.state,
  contact.address.country,
]
  .filter(Boolean)
  .join(', ');

/** ⚠ EDIT ME — social profiles. Set to '' to hide an entry. */
export const socials = [
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'youtube', label: 'YouTube', url: '' },
  { id: 'x', label: 'X', url: '' },
];

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Plans', path: '/plans' },
  { label: 'Careers', path: '/careers' },
  { label: 'Consultation', path: '/consultation' },
  { label: 'Contact', path: '/contact' },
];

/**
 * ⚠ EDIT ME — opening hours.
 * `open` / `close` are 24h "HH:MM" strings. `null` = closed all day.
 * The Contact page derives a live "Open now / Closed now" state from this.
 */
export const openingHours = [
  { day: 'Monday', open: '05:30', close: '22:00' },
  { day: 'Tuesday', open: '05:30', close: '22:00' },
  { day: 'Wednesday', open: '05:30', close: '22:00' },
  { day: 'Thursday', open: '05:30', close: '22:00' },
  { day: 'Friday', open: '05:30', close: '22:00' },
  { day: 'Saturday', open: '05:30', close: '22:00' },
  { day: 'Sunday', open: '06:00', close: '12:00' },
];

/**
 * Brand statistics.
 * `value: null` renders the label without a fabricated number.
 * ⚠ EDIT ME — replace with genuine, verified figures once available.
 */
export const brandStats = [
  { id: 'members', value: null, suffix: '+', label: 'Members', note: 'Tracked from day one' },
  { id: 'sessions', value: null, suffix: '+', label: 'Training Sessions', note: 'Coached & logged' },
  { id: 'journeys', value: null, suffix: '+', label: 'Fitness Journeys', note: 'Started with us' },
];

/** Pillars shown in the oversized-number section (no invented metrics). */
export const brandPillars = [
  { id: '01', index: '01', title: 'Training', copy: 'Structured strength, conditioning and skill work built around your level.' },
  { id: '02', index: '02', title: 'Personal Attention', copy: 'Small groups and one-to-one coaching, so form and effort are actually watched.' },
  { id: '03', index: '03', title: 'Goal Based Planning', copy: 'Every block of training is written against one clear outcome.' },
  { id: '04', index: '04', title: 'Professional Guidance', copy: 'Coaches who correct, explain and adjust the plan as you progress.' },
];

/** Why people choose us — no unsupported claims. */
export const trustPoints = [
  { title: 'Professional Approach', copy: 'Assessment first, then a written plan. No guesswork on the floor.' },
  { title: 'Goal Based Planning', copy: 'Weight loss, strength, endurance — each gets a different programme.' },
  { title: 'Flexible Training Options', copy: 'Train in the gym, at home, or with a mix of both.' },
  { title: 'Male & Female Coaches', copy: 'Choose the coach you are comfortable training with.' },
  { title: 'Local Convenience', copy: 'Based in Kaurihar — close enough to keep the routine going.' },
  { title: 'Fitness + Recovery', copy: 'Training and mobility/recovery support handled under one roof.' },
];

/** The journey after joining — animated timeline copy. */
export const joinProcess = [
  { step: '01', title: 'Understand Your Goal', copy: 'We talk about what you actually want, your schedule and any injuries or limits.' },
  { step: '02', title: 'Build Your Plan', copy: 'You get a written training plan: sessions per week, focus areas and starting loads.' },
  { step: '03', title: 'Start Training', copy: 'Your coach walks you through the first sessions so every movement is clear.' },
  { step: '04', title: 'Track Your Progress', copy: 'Weight, measurements and session notes are reviewed at regular intervals.' },
  { step: '05', title: 'Keep Improving', copy: 'The plan is adjusted as you get stronger, so progress does not stall.' },
];

/** EmailJS config, read from .env — never hardcode keys here. */
export const emailjs = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
};

export const isEmailjsConfigured = Boolean(
  emailjs.serviceId && emailjs.templateId && emailjs.publicKey
);

export const site = {
  name: 'Aarambh Fitness',
  shortName: 'Aarambh',
  tagline: 'Start strong. Finish stronger.',
  url: env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  locale: 'en_IN',
  currency: 'INR',
  founded: '',
  description:
    'Aarambh Fitness in Kaurihar, Prayagraj offers gym training, personal training, home fitness, diet guidance, exercise planning and physiotherapy support.',
};

/** Consultation slots are static/frontend-only. See data/availability.js. */
export const consultationNotice =
  'This is a consultation request, not a confirmed appointment. Our team will contact you to confirm availability.';

export const disclaimer =
  'Aarambh Fitness provides fitness coaching and general wellness guidance. This is not medical advice, diagnosis or treatment. Consult a qualified doctor before starting any new exercise or diet programme, especially if you have an existing health condition or injury.';

export default {
  site,
  contact,
  googleRating,
  contactAddressText,
  socials,
  navigation,
  openingHours,
  brandStats,
  brandPillars,
  trustPoints,
  joinProcess,
  emailjs,
  isEmailjsConfigured,
  consultationNotice,
  disclaimer,
};
