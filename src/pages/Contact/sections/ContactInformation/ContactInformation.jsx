/** ContactInformation — address, phone, WhatsApp, email, hours. All from data. */
import { Clock, Mail, MapPin, MessageCircle, Phone, Navigation } from 'lucide-react';
import { contact, contactAddressText, socials } from '../../../../data/siteConfig.js';
import { getOpeningStatus, formatTime } from '../../../../utils/openingHours.js';
import { buildWhatsAppUrl, getTelHref, getMailHref } from '../../../../utils/whatsapp.js';
import { Instagram, Facebook, Youtube, XSocial } from '../../../../assets/icons/index.jsx';
import './ContactInformation.css';

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube, x: XSocial };
const activeSocials = socials.filter((s) => s.url);

export default function ContactInformation() {
  const status = getOpeningStatus();

  const cards = [
    {
      icon: Phone,
      label: 'Phone',
      primary: contact.phone,
      href: getTelHref(),
      note: 'Call during opening hours for the fastest answer.',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      primary: `+${contact.whatsapp}`,
      href: buildWhatsAppUrl('Hello Aarambh Fitness, I would like to know more about your services.'),
      external: true,
      note: 'Usually the quickest way to reach us.',
    },
    {
      icon: Mail,
      label: 'Email',
      primary: contact.email,
      href: getMailHref(),
      note: 'Good for detailed enquiries and trainer applications.',
    },
    {
      icon: MapPin,
      label: 'Location',
      primary: 'Kaurihar, Prayagraj',
      href: contact.mapsSearchUrl,
      external: true,
      note: contactAddressText,
    },
  ];

  return (
    <section className="cinfo section bg-800" aria-labelledby="cinfo-title">
      <div className="container">
        <header className="cinfo__head">
          <div>
            <span className="section-index">01 — Details</span>
            <h2 className="cinfo__title" id="cinfo-title">
              How to reach us
            </h2>
          </div>
          <p className="cinfo__lede">
            Based in Kaurihar, serving Prayagraj and nearby areas. Home training is available across
            a wider radius.
          </p>
        </header>

        <div className="cinfo__grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                className="cinfo__card"
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
              >
                <span className="cinfo__icon">
                  <Icon size={18} />
                </span>
                <span className="cinfo__body">
                  <span className="tech-label">{card.label}</span>
                  <strong>{card.primary}</strong>
                  <em>{card.note}</em>
                </span>
              </a>
            );
          })}
        </div>

        <div className="cinfo__row">
          <div className="cinfo__status">
            <span className={`dot-live ${status.isOpen ? '' : 'dot-live--off'}`} aria-hidden="true" />
            <div>
              <strong>{status.isOpen ? 'Open now' : 'Closed now'}</strong>
              <span>{status.statusText}</span>
            </div>
          </div>

          <div className="cinfo__hours">
            <span className="cinfo__hours-title">
              <Clock size={14} /> Opening hours
            </span>
            {status.isConfigured ? (
              <span className="cinfo__hours-value">
                Today {status.dayName}: {formatTime(status.opensAt)} – {formatTime(status.closesAt)}
              </span>
            ) : (
              <span className="cinfo__hours-value">Hours available on request</span>
            )}
          </div>

          <a className="cinfo__directions" href={contact.mapsSearchUrl} target="_blank" rel="noopener noreferrer">
            <Navigation size={15} /> Get directions
          </a>

          {activeSocials.length ? (
            <ul className="cinfo__socials" role="list">
              {activeSocials.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <Icon size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
