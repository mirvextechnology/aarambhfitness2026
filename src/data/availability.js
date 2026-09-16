/**
 * AVAILABILITY — static, frontend-only consultation slots.
 * ------------------------------------------------------------
 * There is NO backend availability check. Slots shown here are
 * request windows; the team confirms the actual booking.
 *
 * `day` uses the JS weekday index (0 = Sunday … 6 = Saturday).
 * ⚠ EDIT ME — change the slot windows or add `closed: true`.
 */

const MORNING = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
const EVENING = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export const weeklyAvailability = [
  { day: 0, label: 'Sunday', slots: ['07:00', '08:00', '09:00', '10:00', '11:00'] },
  { day: 1, label: 'Monday', slots: [...MORNING, ...EVENING] },
  { day: 2, label: 'Tuesday', slots: [...MORNING, ...EVENING] },
  { day: 3, label: 'Wednesday', slots: [...MORNING, ...EVENING] },
  { day: 4, label: 'Thursday', slots: [...MORNING, ...EVENING] },
  { day: 5, label: 'Friday', slots: [...MORNING, ...EVENING] },
  { day: 6, label: 'Saturday', slots: [...MORNING, ...EVENING] },
];

/** How many days ahead a request can be made. */
export const bookingWindowDays = 30;

/** Minimum lead time before the next bookable slot (minutes). */
export const leadTimeMinutes = 120;

/**
 * Dates the team cannot take requests.
 * ISO 'YYYY-MM-DD' strings. ⚠ EDIT ME — add holidays / off days.
 */
export const blockedDates = [
  // '2026-08-15',
];

/** Grouping used to split the day into two columns on the time step. */
export const slotGroups = [
  { id: 'morning', label: 'Morning', from: 0, to: 12 },
  { id: 'evening', label: 'Evening', from: 12, to: 24 },
];

/**
 * Slots offered for a given date.
 * @param {Date|string} date
 * @returns {string[]} e.g. ['06:00', '07:00', …]
 */
export function getSlotsForDate(date) {
  const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return [];
  const entry = weeklyAvailability.find((w) => w.day === d.getDay());
  return entry ? [...entry.slots] : [];
}

export default {
  weeklyAvailability,
  bookingWindowDays,
  leadTimeMinutes,
  blockedDates,
  slotGroups,
  getSlotsForDate,
};
