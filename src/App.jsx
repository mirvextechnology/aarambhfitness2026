/**
 * App — route table, global chrome and smooth scroll.
 * Routes are lazy-loaded so each page ships its own chunk.
 */
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx';
import PageTransition from './components/PageTransition/PageTransition.jsx';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import MobileStickyBar from './components/MobileStickyBar/MobileStickyBar.jsx';
import Cursor from './components/Cursor/Cursor.jsx';
import useLenis from './hooks/useLenis.js';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Services = lazy(() => import('./pages/Services/Services.jsx'));
const Plans = lazy(() => import('./pages/Plans/Plans.jsx'));
const Careers = lazy(() => import('./pages/Careers/Careers.jsx'));
const Consultation = lazy(() => import('./pages/Consultation/Consultation.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <span className="route-loader__ring" aria-hidden="true" />
      <span className="route-loader__text">Loading</span>
    </div>
  );
}

/** Restores scroll position on navigation and honours #hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (typeof window.scrollToSmooth === 'function') {
          window.scrollToSmooth(hash, { offset: -90 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => window.clearTimeout(id);
    }
    if (typeof window.lenis?.scrollTo === 'function') {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    return undefined;
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useLenis();
  const location = useLocation();

  return (
    <div className="app">
      {/* Single film-grain layer for the whole app. Replaces 30 per-section
          mix-blend-mode overlays that each forced compositing work per frame. */}
      <span className="grain-layer" aria-hidden="true" />

      <ScrollProgress />
      <PageTransition />
      <Cursor />

      <Navbar />
      <ScrollManager />

      <main className="main" id="main">
        {/* Keyed to the pathname so the boundary resets whenever the route
            changes — a failure on one page must not poison the next. */}
        <ErrorBoundary label="This page" key={location.pathname}>
        <Suspense fallback={<RouteLoader />}>
          <div className="route-view">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />

      <div className="app__chrome">
        <WhatsAppButton />
        <BackToTop />
        <MobileStickyBar />
      </div>
    </div>
  );
}
