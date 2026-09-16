/** NotFound — restrained 404. Helpful, not oversized or gimmicky. */
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Search } from 'lucide-react';
import SEO from '../../components/SEO/SEO.jsx';
import { navigation } from '../../data/siteConfig.js';
import { buildWhatsAppUrl } from '../../utils/whatsapp.js';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEO path="/404" title="Page Not Found" description="The page you were looking for does not exist." noindex />

      <section className="nf">
        <div className="container nf__inner">
          <span className="nf__code" aria-hidden="true">
            404
          </span>

          <div className="nf__body">
            <span className="eyebrow eyebrow--plain">Page not found</span>
            <h1 className="nf__title">This page does not exist.</h1>
            <p className="nf__lede">
              The link may be old or mistyped. Here are the places people usually want — or send us a
              message and we will point you in the right direction.
            </p>

            <div className="nf__actions">
              <Link to="/" className="btn btn--primary">
                <Home size={15} /> Back to home
              </Link>
              <Link to="/services" className="btn btn--outline">
                <Search size={15} /> Browse services
              </Link>
              <a
                href={buildWhatsAppUrl('Hello Aarambh Fitness,\n\nI could not find a page on your website. Can you help?')}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>

            <nav className="nf__links" aria-label="Site pages">
              {navigation.map((item) => (
                <Link to={item.path} key={item.path}>
                  {item.label} <ArrowRight size={12} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
