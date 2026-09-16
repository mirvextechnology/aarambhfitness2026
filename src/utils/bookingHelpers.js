/**
 * BOOKING HELPERS — calendar generation, slot filtering, validation
 * and the localStorage progress tracker.
 */
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  parseISO,
  differenceInMinutes,
} from 'date-fns';
import { getSlotsForDate, blockedDates, bookingWindowDays, leadTimeMinutes, slotGroups } from '../data/availability.js';

/* ------------------------------------------------------------------
   CALENDAR
   ------------------------------------------------------------------ */

/** 6-row × 7-col grid of dates covering the given month. */
export function buildCalendarGrid(monthDate, today = new Date()) {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  const days = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

export const weekDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Earliest selectable date (start of tomorrow, respecting lead time). */
export function minBookableDate(now = new Date()) {
  const lead = addDays(now, 0);
  const minsUntilMidnight = 24 * 60 - (now.getHours() * 60 + now.getMinutes());
  return minsUntilMidnight < leadTimeMinutes ? addDays(lead, 1) : lead;
}

export function maxBookableDate(now = new Date()) {
  return addDays(now, bookingWindowDays);
}

export function isDateDisabled(date, now = new Date()) {
  const iso = format(date, 'yyyy-MM-dd');
  if (blockedDates.includes(iso)) return true;
  if (isBefore(startOfDay(date), startOfDay(minBookableDate(now)))) return true;
  if (isAfter(date, maxBookableDate(now))) return true;
  // Must use the same lead-time-filtered list the time step renders from.
  // Using raw getSlotsForDate() here let a late-in-the-day "today" look
  // bookable while offering zero slots on the next screen.
  return availableSlots(date, now).length === 0;
}

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Slots for a date, minus ones already past today. */
export function availableSlots(date, now = new Date()) {
  const slots = getSlotsForDate(date);
  if (!isSameDay(date, now)) return slots;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slots.filter((s) => {
    const [h, m] = s.split(':').map(Number);
    return h * 60 + m >= nowMinutes + leadTimeMinutes;
  });
}

export function groupedSlots(date, now = new Date()) {
  const slots = availableSlots(date, now);
  return slotGroups
    .map((group) => ({
      ...group,
      slots: slots.filter((s) => {
        const h = Number(s.split(':')[0]);
        return h >= group.from && h < group.to;
      }),
    }))
    .filter((g) => g.slots.length > 0);
}

/* ------------------------------------------------------------------
   FORMATTING
   ------------------------------------------------------------------ */

export const formatDateShort = (date) => (date ? format(date, 'EEE, dd MMM yyyy') : '');
export const formatDateLong = (date) => (date ? format(date, 'EEEE, d MMMM yyyy') : '');
export const toISODate = (date) => (date ? format(date, 'yyyy-MM-dd') : '');
export const fromISODate = (iso) => (iso ? parseISO(`${iso}T00:00:00`) : null);

/** "18:00" -> "6:00 PM" */
export function formatSlot(slot) {
  if (!slot) return '';
  const [h, m] = slot.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m || 0).padStart(2, '0')} ${suffix}`;
}

export const monthLabel = (date) => format(date, 'MMMM yyyy');

/* ------------------------------------------------------------------
   VALIDATION
   ------------------------------------------------------------------ */

export const isRequired = (v) => String(v ?? '').trim().length > 0;

export const isValidPhone = (v) => {
  const digits = String(v ?? '').replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v ?? '').trim());

export const isValidAge = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 12 && n <= 90;
};

/** Indian mobile, displayed. */
export const formatPhone = (v) => {
  const d = String(v ?? '').replace(/\D/g, '').slice(-10);
  return d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : String(v ?? '');
};

/** Runs a { field: validator } map, returning { field: errorMessage }. */
export function runValidators(values, validators) {
  const errors = {};
  Object.entries(validators).forEach(([field, validator]) => {
    const message = validator(values[field], values);
    if (message) errors[field] = message;
  });
  return errors;
}

/* ------------------------------------------------------------------
   LOCAL PROGRESS TRACKER (localStorage, frontend-only)
   ------------------------------------------------------------------ */

const STORAGE_KEY = 'aarambh.progress.v1';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveProgress(entry) {
  try {
    const existing = loadProgress();
    const records = [...(existing?.records || []), { id: `r_${Date.now()}`, date: format(new Date(), 'yyyy-MM-dd'), ...entry }];
    const next = {
      goal: entry.goal ?? existing?.goal ?? '',
      startWeight: existing?.startWeight ?? entry.weight ?? null,
      targetWeight: entry.targetWeight ?? existing?.targetWeight ?? null,
      frequency: entry.frequency ?? existing?.frequency ?? '',
      notes: entry.notes ?? existing?.notes ?? '',
      records,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
}

export function updateProgressMeta(meta) {
  try {
    const existing = loadProgress() || { records: [] };
    const next = { ...existing, ...meta, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
}

export function deleteRecord(id) {
  try {
    const existing = loadProgress();
    if (!existing) return null;
    const next = { ...existing, records: (existing.records || []).filter((r) => r.id !== id) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

/* ------------------------------------------------------------------
   MISC
   ------------------------------------------------------------------ */

export { differenceInMinutes, isSameDay, isSameMonth, addMonths, addDays };

export default {
  buildCalendarGrid,
  weekDayLabels,
  minBookableDate,
  maxBookableDate,
  isDateDisabled,
  availableSlots,
  groupedSlots,
  formatDateShort,
  formatDateLong,
  toISODate,
  fromISODate,
  formatSlot,
  monthLabel,
  runValidators,
  loadProgress,
  saveProgress,
  clearProgress,
};
