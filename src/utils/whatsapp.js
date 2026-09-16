/**
 * WHATSAPP — builds contextual deep links for every CTA on the site.
 * Each builder returns a ready-to-open https://wa.me/<number>?text=<encoded> URL.
 */
import { contact } from '../data/siteConfig.js';

/** Normalise a number to international digits-only format. */
export function normalizePhone(input) {
  if (!input) return '';
  const digits = String(input).replace(/\D/g, '');
  if (!digits) return '';
  // Bare 10-digit Indian numbers get the country code.
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

/** Business WhatsApp number, digits only. */
export function getBusinessNumber() {
  return normalizePhone(contact.whatsapp);
}

/** Human readable tel: href. */
export function getTelHref() {
  return `tel:+${getBusinessNumber()}`;
}

/** Human readable mailto: href. */
export function getMailHref() {
  return `mailto:${contact.email}`;
}

/**
 * Core builder.
 * @param {string} message  Plain text, may contain newlines.
 * @param {string} [number] Optional override number.
 * @returns {string}
 */
export function buildWhatsAppUrl(message, number) {
  const target = normalizePhone(number) || getBusinessNumber();
  const text = encodeURIComponent(String(message || '').trim());
  return `https://wa.me/${target}?text=${text}`;
}

/** Open WhatsApp in a new tab (used by non-anchor handlers). */
export function openWhatsApp(message, number) {
  const url = buildWhatsAppUrl(message, number);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url; // popup blocked fallback
  return url;
}

/* ---------------------------------------------------------------
   Message builders — one per journey.
   Blank fields are dropped so the message stays clean.
   ------------------------------------------------------------- */

const compact = (obj) =>
  Object.entries(obj || {})
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${v}`);

/** Generic "I'm interested in X" message. */
export function serviceMessage(serviceName, extra = {}) {
  const lines = [
    `Hello ${contact.businessName},`,
    '',
    `I am interested in ${serviceName}.`,
    ...compact(extra),
  ];
  return lines.filter((l) => l !== undefined).join('\n');
}

export function planMessage(planName, extra = {}) {
  return [
    `Hello ${contact.businessName},`,
    '',
    `I would like details about the ${planName} plan.`,
    ...compact(extra),
  ].join('\n');
}

export function assessmentMessage(result) {
  const r = result || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I completed the 60-second fitness assessment.',
    '',
    ...compact({
      Age: r.age && `${r.age} years`,
      Gender: r.gender,
      Height: r.heightText,
      Weight: r.weight && `${r.weight} kg`,
      'Primary Goal': r.goalLabel,
      'Activity Level': r.activityLabel,
      Experience: r.experienceLabel,
      'Available Days': r.frequency && `${r.frequency} days/week`,
      'Training Location': r.locationLabel,
      'Coach Preference': r.coachLabel,
    }),
    '',
    'Recommended starting point:',
    ...compact({
      'Training Focus': r.focus,
      'Suggested Frequency': r.frequency,
      'Recommended Service': r.serviceName,
      'Next Step': r.nextStep,
    }),
    '',
    'Please help me with the next step.',
  ].join('\n');
}

export function bmiMessage(input) {
  const i = input || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I used the BMI calculator on your website.',
    '',
    ...compact({
      Height: i.heightText,
      Weight: i.weight && `${i.weight} kg`,
      Age: i.age && `${i.age} years`,
      Gender: i.gender,
      BMI: i.bmi && `${i.bmi} (${i.category})`,
    }),
    '',
    'I would like personal guidance on this.',
  ].join('\n');
}

export function goalMessage(goal, extra = {}) {
  const g = goal || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    `My main fitness goal is: ${g.label}.`,
    '',
    ...compact({
      'Training Style': g.trainingStyle,
      'Suggested Frequency': g.frequency,
      'Suggested Service': g.serviceName,
      ...extra,
    }),
    '',
    'Please guide me on how to start.',
  ].join('\n');
}

export function coachMessage(coachLabel, serviceName = 'Personal Training') {
  return [
    `Hello ${contact.businessName},`,
    '',
    `I would like to book ${serviceName} with a ${coachLabel.toLowerCase()}.`,
    '',
    'Please share the available slots.',
  ].join('\n');
}

export function consultationMessage(booking) {
  const b = booking || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I have submitted a consultation request on your website.',
    '',
    ...compact({
      Service: b.serviceName,
      [b.goalTitle || 'Goal']: b.goalLabel,
      [b.preferenceTitle || b.prefTitle || 'Preference']: b.prefLabel,
      'Preferred Date': b.dateText,
      'Preferred Time': b.time,
      Name: b.name,
      Phone: b.phone,
      Email: b.email,
      Age: b.age,
      Location: b.location,
    }),
    '',
    'Requirements:',
    b.requirements || '—',
    '',
    'Please confirm the slot.',
  ].join('\n');
}

export function contactMessage(payload) {
  const p = payload || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I am reaching out from your website.',
    '',
    ...compact({
      Name: p.name,
      Phone: p.phone,
      Email: p.email,
      Service: p.service,
      Goal: p.goal,
    }),
    '',
    'Message:',
    p.message || '—',
  ].join('\n');
}

export function trainerApplicationMessage(payload) {
  const p = payload || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I have applied for a trainer position on your website.',
    '',
    ...compact({
      Name: p.fullName,
      Phone: p.phone,
      Email: p.email,
      Gender: p.gender,
      City: p.city,
      Experience: p.experience,
      Certification: p.certification,
      Specialisation: p.specialisation,
      'Preferred Role': p.role,
      'Work Type': p.workType,
    }),
    '',
    'Note:',
    p.message || '—',
  ].join('\n');
}

export function securityMessage(payload) {
  const p = payload || {};
  return [
    `Hello ${contact.businessName},`,
    '',
    'I need event and security staffing support.',
    '',
    ...compact({
      'Event Type': p.eventType,
      Date: p.date,
      Venue: p.venue,
      'Staff Required': p.headcount,
      Name: p.name,
      Phone: p.phone,
    }),
    '',
    'Please share availability and details.',
  ].join('\n');
}

/** Generic CTA message used by hero/footer buttons. */
export function generalMessage(topic = 'your services') {
  return [
    `Hello ${contact.businessName},`,
    '',
    `I would like to know more about ${topic}.`,
  ].join('\n');
}

export default {
  normalizePhone,
  getBusinessNumber,
  getTelHref,
  getMailHref,
  buildWhatsAppUrl,
  openWhatsApp,
  serviceMessage,
  planMessage,
  assessmentMessage,
  bmiMessage,
  goalMessage,
  coachMessage,
  consultationMessage,
  contactMessage,
  trainerApplicationMessage,
  securityMessage,
  generalMessage,
};
