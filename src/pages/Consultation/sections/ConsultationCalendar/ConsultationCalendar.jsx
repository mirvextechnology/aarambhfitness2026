/**
 * ConsultationCalendar — STEP 04 (date) and STEP 05 (time).
 * Slots come from data/availability.js; there is no backend check.
 */
import { useMemo, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarX2, Clock3 } from 'lucide-react';
import {
  buildCalendarGrid,
  weekDayLabels,
  isDateDisabled,
  groupedSlots,
  toISODate,
  fromISODate,
  formatSlot,
  monthLabel,
  minBookableDate,
  maxBookableDate,
  formatDateShort,
} from '../../../../utils/bookingHelpers.js';

/* ---------------- STEP 04 — DATE ---------------- */
export default function ConsultationCalendar({ value, onSelect }) {
  const [cursor, setCursor] = useState(() => new Date());
  const days = useMemo(() => buildCalendarGrid(cursor), [cursor]);
  const today = new Date();
  const min = minBookableDate();
  const max = maxBookableDate();

  const canPrev = cursor > new Date(today.getFullYear(), today.getMonth(), 1);
  const atMaxMonth =
    cursor.getFullYear() === max.getFullYear() && cursor.getMonth() === max.getMonth();

  return (
    <div className="cons-step">
      <div className="calendar">
        <header className="calendar__head">
          <button
            type="button"
            className="calendar__nav"
            onClick={() => setCursor((d) => subMonths(d, 1))}
            disabled={!canPrev}
            aria-label="Previous month"
          >
            <ChevronLeft size={17} />
          </button>
          <span className="calendar__month">{monthLabel(cursor)}</span>
          <button
            type="button"
            className="calendar__nav"
            onClick={() => setCursor((d) => addMonths(d, 1))}
            disabled={atMaxMonth}
            aria-label="Next month"
          >
            <ChevronRight size={17} />
          </button>
        </header>

        <div className="calendar__weekdays" aria-hidden="true">
          {weekDayLabels.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="calendar__grid" role="grid" aria-label="Choose a date">
          {days.map((day) => {
            const iso = toISODate(day);
            const disabled = isDateDisabled(day);
            const selected = value === iso;
            const isToday = toISODate(today) === iso;
            const outside = day.getMonth() !== cursor.getMonth();

            return (
              <button
                type="button"
                key={iso}
                role="gridcell"
                className={[
                  'calendar__day',
                  selected ? 'is-selected' : '',
                  disabled ? 'is-disabled' : '',
                  isToday ? 'is-today' : '',
                  outside ? 'is-outside' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled}
                aria-selected={selected}
                aria-label={`${formatDateShort(day)}${disabled ? ' — unavailable' : ''}`}
                onClick={() => onSelect(iso)}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>

        <div className="calendar__legend">
          <span>
            <i className="dot is-available" /> Available
          </span>
          <span>
            <i className="dot is-unavailable" /> Unavailable
          </span>
          <span>
            <i className="dot is-chosen" /> Selected
          </span>
        </div>

        <p className="calendar__note">
          Requests can be made up to 30 days ahead. Slots shown are request windows — the team
          confirms the final time with you.
        </p>
      </div>
    </div>
  );
}

/* ---------------- STEP 05 — TIME ---------------- */
export function TimeSelection({ dateISO, value, onSelect }) {
  const date = fromISODate(dateISO);
  const groups = date ? groupedSlots(date) : [];
  const total = groups.reduce((sum, g) => sum + g.slots.length, 0);

  if (!date || total === 0) {
    return (
      <div className="cons-step">
        <div className="slots slots--empty">
          <CalendarX2 size={22} />
          <h3>No slots on this date</h3>
          <p>Go back and pick another day — weekend and early-morning slots fill first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cons-step">
      <p className="slots__date">
        <Clock3 size={14} /> {formatDateShort(date)}
      </p>

      {groups.map((group) => (
        <div className="slots__group" key={group.id}>
          <h3 className="slots__group-title">{group.label}</h3>
          <div className="slots__grid" role="radiogroup" aria-label={`${group.label} slots`}>
            {group.slots.map((slot) => {
              const active = value === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  role="radio"
                  aria-checked={active}
                  className={`slot ${active ? 'is-active' : ''}`}
                  onClick={() => onSelect(slot)}
                >
                  {formatSlot(slot)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <p className="calendar__note">
        Times are in IST. If none of these work, choose the closest one and mention your preferred
        time in the requirements step.
      </p>
    </div>
  );
}
