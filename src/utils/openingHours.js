/**
 * OPENING HOURS — derives a live "Open now / Closed now" state
 * from the configurable schedule in data/siteConfig.js.
 */
import { openingHours } from '../data/siteConfig.js';

const toMinutes = (hhmm) => {
  if (!hhmm) return null;
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + (m || 0);
};

/** "05:30" -> "5:30 AM" */
export function formatTime(hhmm) {
  if (!hhmm) return '—';
  const [h, m] = String(hhmm).split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m || 0).padStart(2, '0')} ${suffix}`;
}

/**
 * @param {Date} [now]
 * @returns {{ isOpen:boolean, today:object|null, opensAt:string|null, closesAt:string|null,
 *            nextOpenDay:string|null, statusText:string, dayName:string }}
 */
export function getOpeningStatus(now = new Date(), schedule = openingHours) {
  const dayIndex = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = schedule[dayIndex] || null;
  const open = toMinutes(today?.open);
  const close = toMinutes(today?.close);

  const isOpen = today && open !== null && close !== null && minutes >= open && minutes < close;

  // Next opening moment, looking ahead 7 days.
  let nextOpenDay = null;
  let nextOpenAt = null;
  if (!isOpen) {
    for (let i = 0; i < 7; i += 1) {
      const idx = (dayIndex + i) % 7;
      const entry = schedule[idx];
      const o = toMinutes(entry?.open);
      if (o === null) continue;
      if (i === 0 && minutes < o) {
        nextOpenDay = entry.day;
        nextOpenAt = entry.open;
        break;
      }
      if (i > 0) {
        nextOpenDay = entry.day;
        nextOpenAt = entry.open;
        break;
      }
    }
  }

  let statusText;
  if (isOpen) {
    statusText = `Open now · closes ${formatTime(today.close)}`;
  } else if (nextOpenDay) {
    statusText =
      nextOpenDay === today?.day
        ? `Closed now · opens ${formatTime(nextOpenAt)}`
        : `Closed now · opens ${nextOpenDay} ${formatTime(nextOpenAt)}`;
  } else {
    statusText = 'Closed now';
  }

  return {
    isOpen,
    today,
    opensAt: open !== null ? today.open : null,
    closesAt: close !== null ? today.close : null,
    nextOpenDay,
    nextOpenAt,
    statusText,
    dayName: dayNames[dayIndex],
    isConfigured: schedule.some((d) => d.open && d.close),
  };
}

/** Is today the given weekday index? Used to highlight the row. */
export const isToday = (index, now = new Date()) => now.getDay() === index;

export default { getOpeningStatus, formatTime, isToday };
