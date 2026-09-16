/**
 * Navbar — transparent over the hero, compact + dark after scroll.
 * Desktop rail with an animated orange indicator; full-screen mobile menu.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { navigation, contact } from '../../data/siteConfig.js';
import { buildWhatsAppUrl, getTelHref } from '../../utils/whatsapp.js';
import { AarambhMark } from '../../assets/icons/index.jsx';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const indicatorRef = useRef(null);
  const listRef = useRef(null);
  const menuRef = useRef(null);

  /* ---- scroll state ---- */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ---- lock scroll while the mobile menu is open ---- */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* ---- close the menu on route change ---- */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* ---- Esc closes the menu ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---- mobile menu animation ---- */
  useEffect(() => {
    if (!menuRef.current || reduced) return undefined;
    const links = menuRef.current.querySelectorAll('[data-menu-item]');
    if (open) {
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.055, delay: 0.12 }
      );
    }
    return undefined;
  }, [open, reduced]);

  /* ---- animated active-route indicator (desktop) ---- */
  const moveIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const list = listRef.current;
    if (!indicator || !list) return;
    const active = list.querySelector('.nav-link.is-active');
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - listRect.left}px)`;
  }, []);

  useEffect(() => {
    moveIndicator();
    const t = window.setTimeout(moveIndicator, 60);
    window.addEventListener('resize', moveIndicator);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', moveIndicator);
    };
  }, [pathname, moveIndicator]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__brand" aria-label="Aarambh Fitness — home" onClick={() => setOpen(false)}>
            <AarambhMark size={scrolled ? 30 : 34} />
            <span className="navbar__brand-text">
              <strong>Aarambh</strong>
              <em>Fitness</em>
            </span>
          </Link>

          <nav className="navbar__nav" aria-label="Primary">
            <ul className="navbar__list" ref={listRef}>
              {navigation.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span className="navbar__indicator" ref={indicatorRef} aria-hidden="true" />
          </nav>

          <div className="navbar__actions">
            <a href={getTelHref()} className="navbar__call" aria-label={`Call ${contact.phone}`}>
              <Phone size={15} />
              <span>Call</span>
            </a>
            <Link to="/consultation" className="btn btn--primary btn--sm navbar__cta">
              Join Now
              <ArrowRight size={15} />
            </Link>

            <button
              type="button"
              className="navbar__toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ---- full-screen mobile menu ---- */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu" ref={menuRef} aria-hidden={!open}>
        <div className="mobile-menu__bg" aria-hidden="true" />
        <div className="mobile-menu__inner container">
          <nav className="mobile-menu__nav" aria-label="Mobile">
            <ul role="list">
              {navigation.map((item, i) => (
                <li key={item.path} className="line-mask" data-menu-item style={{ transitionDelay: `${i * 40}ms` }}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                  >
                    <span className="mobile-link__index">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__footer">
            <div className="mobile-menu__cta">
              <Link to="/consultation" className="btn btn--primary btn--block" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                Join Now
              </Link>
              <a
                href={buildWhatsAppUrl('Hello Aarambh Fitness, I would like to know more about your services.')}
                className="btn btn--whatsapp btn--block"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
              >
                WhatsApp Us
              </a>
            </div>
            <address className="mobile-menu__contact">
              <a href={getTelHref()}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>Kaurihar, Prayagraj, Uttar Pradesh</span>
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
