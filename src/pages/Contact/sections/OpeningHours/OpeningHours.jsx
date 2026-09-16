/**
 * OpeningHours — live schedule table with a real "open now" indicator.
 * Everything derives from openingHours in data/siteConfig.js.
 */
import { useEffect, useState } from 'react';
import { Clock, MapPin, Phone, Navigation } from 'lucide-react';
import { openingHours, contact, contactAddressText } from '../../../../data/siteConfig.js';
import { getTelHref, buildWhatsAppUrl } from '../../../../utils/whatsapp.js';
import { getOpeningStatus, formatTime } from '../../../../utils/openingHours.js';
import './OpeningHours.css';

export default function OpeningHours() {
  const [now, setNow] = useState(() => new Date());

  /* re-evaluate every minute so the state stays honest */
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const status = getOpeningStatus(now);

  if (!status.isConfigured) {
    return (
      <section className="hours section--tight bg-900" aria-labelledby="hours-title">
        <div className="container">
          <div className="hours__empty">
            <Clock size={18} />
            <div>
              <h2 id="hours-title">Opening hours</h2>
              <p>
                Hours are not configured yet. Add them to <code>openingHours</code> in{' '}
                <code>src/data/siteConfig.js</code> and this table fills itself in.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hours section--tight bg-900" aria-labelledby="hours-title">
      <div className="container">
        <div className="hours__layout">
        <div className="hours__panel">
          <header className="hours__head">
            <span className="tech-label">
              <Clock size={13} aria-hidden="true" /> Opening hours
            </span>
            <span className={`hours__badge ${status.isOpen ? 'is-open' : 'is-closed'}`}>
              <span className={`dot-live ${status.isOpen ? '' : 'dot-live--off'}`} aria-hidden="true" />
              {status.isOpen ? 'Open now' : 'Closed now'}
            </span>
          </header>

          <ul className="hours__list" role="list">
            {openingHours.map((day, i) => {
              const isToday = now.getDay() === i;
              return (
                <li className={`hours__row ${isToday ? 'is-today' : ''}`} key={day.day}>
                  <span className="hours__day">
                    {day.day}
                    {isToday ? <em>Today</em> : null}
                  </span>
                  <span className="hours__dots" aria-hidden="true" />
                  <span className="hours__time">
                    {day.open && day.close ? `${formatTime(day.open)} – ${formatTime(day.close)}` : 'Closed'}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="hours__note">{status.statusText}. Timings may change on public holidays.</p>
        </div>

        <aside className="hours__visit">
          <span className="tech-label">Plan your visit</span>
          <h3 className="hours__visit-title">Come in and see the floor.</h3>
          <p className="hours__visit-copy">
            Walk in during opening hours and we will show you around, answer your questions and
            suggest a starting point. No appointment needed.
          </p>

          <ul className="hours__visit-list" role="list">
            <li>
              <MapPin size={15} aria-hidden="true" />
              <span>{contactAddressText}</span>
            </li>
            <li>
              <Phone size={15} aria-hidden="true" />
              <a href={getTelHref()}>{contact.phone}</a>
            </li>
          </ul>

          <div className="hours__visit-actions">
            <a
              className="btn btn--whatsapp"
              href={buildWhatsAppUrl(
                'Hello Aarambh Fitness,\n\nI would like to visit and see the gym. Please share the best time to come in.'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask before visiting
            </a>
            <a
              className="btn btn--ghost"
              href={contact.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={14} /> Directions
            </a>
          </div>
        </aside>
        </div>
      </div>
    </section>
  );
}
