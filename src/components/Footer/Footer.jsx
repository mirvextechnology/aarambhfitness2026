/**
 * Footer — multi-column premium footer.
 * Everything here reads from data/, so nothing needs editing in this file.
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { contact, navigation, socials, disclaimer, googleRating } from '../../data/siteConfig.js';
import { footerServices } from '../../data/services.js';
import { getOpeningStatus, formatTime } from '../../utils/openingHours.js';
import { buildWhatsAppUrl, getTelHref } from '../../utils/whatsapp.js';
import { Instagram, Facebook, Youtube, XSocial, AarambhMark } from '../../assets/icons/index.jsx';
import './Footer.css';

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube, x: XSocial };
const activeSocials = socials.filter((s) => s.url);

export default function Footer() {
  const year = new Date().getFullYear();
  const status = getOpeningStatus();

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />

      <div className="container">
        <div className="footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <AarambhMark size={40} />
              <span>
                <strong>Aarambh Fitness</strong>
                <em>{contact.tagline}</em>
              </span>
            </Link>
            <p className="footer__statement">
              Premium fitness, personal training and wellness support in Kaurihar, Prayagraj —
              built around one clear goal at a time.
            </p>

            <div className="footer__cta">
              <a
                href={buildWhatsAppUrl('Hello Aarambh Fitness, I would like to know more about your services.')}
                className="btn btn--whatsapp btn--sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
              <Link to="/consultation" className="btn btn--outline btn--sm">
                Book Consultation
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {activeSocials.length > 0 ? (
              <ul className="footer__socials" role="list">
                {activeSocials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.id] || ArrowUpRight;
                  return (
                    <li key={s.id}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                        <Icon size={17} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* Link columns */}
          <nav className="footer__col" aria-label="Site">
            <h3 className="footer__heading">Explore</h3>
            <ul role="list">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h3 className="footer__heading">Services</h3>
            <ul role="list">
              {footerServices.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services#${item.slug}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div className="footer__col footer__col--contact">
            <h3 className="footer__heading">Contact</h3>
            <address>
              <p>
                <MapPin size={15} aria-hidden="true" />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.postalCode}
                </span>
              </p>
              <p>
                <Star size={15} aria-hidden="true" className="footer__star" />
                <a href={googleRating.url} target="_blank" rel="noopener noreferrer">
                  {googleRating.rating.toFixed(1)} on Google ({googleRating.reviews} review)
                </a>
              </p>
              <p>
                <Phone size={15} aria-hidden="true" />
                <a href={getTelHref()}>{contact.phone}</a>
              </p>
              <p>
                <Mail size={15} aria-hidden="true" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p>
                <Clock size={15} aria-hidden="true" />
                <span>
                  {status.isConfigured ? `${formatTime(status.opensAt)} – ${formatTime(status.closesAt)}` : 'Hours on request'}
                </span>
              </p>
            </address>

            <Link to="/contact" className="footer__map-link">
              View on map <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Marquee wordmark */}
        <div className="footer__wordmark" aria-hidden="true">
          <div className="marquee">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>
                Aarambh Fitness · Kaurihar · Prayagraj · Train With Purpose ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {year} {contact.legalName}. All rights reserved.</p>
          <p className="footer__disclaimer">{disclaimer}</p>
          <a className="footer__top-link" href="#main">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
