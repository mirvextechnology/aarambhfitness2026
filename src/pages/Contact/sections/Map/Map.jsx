/**
 * Map — Google Maps embed from the configurable URL.
 * Falls back to a styled location card + directions link when no
 * embed URL has been set, so the section is never empty.
 */
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { contact } from '../../../../data/siteConfig.js';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import './Map.css';

export default function Map() {
  const hasEmbed = Boolean(contact.mapsEmbedUrl);

  return (
    <section className="cmap section bg-800" id="location" aria-labelledby="cmap-title">
      <div className="container">
        <SectionHeading
          index="03 — Location"
          eyebrow="Find us"
          title="Kaurihar, Prayagraj"
          lede="We are easy to reach from the main road. Parking is available outside."
          className="section-heading--split"
          id="cmap-title"
          aside={
            <a className="btn btn--outline btn--sm" href={contact.mapsSearchUrl} target="_blank" rel="noopener noreferrer">
              <Navigation size={14} /> Open in Google Maps
            </a>
          }
        />

        {hasEmbed ? (
          <div className="cmap__frame">
            <iframe
              title="Aarambh Fitness location on Google Maps"
              src={contact.mapsEmbedUrl}
              width="100%"
              height="460"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="cmap__placeholder">
            <span className="cmap__placeholder-grid" aria-hidden="true" />
            <div className="cmap__placeholder-body">
              <span className="cmap__pin">
                <MapPin size={22} />
              </span>
              <h3 className="cmap__placeholder-title">{contact.address.line1}</h3>
              <p className="cmap__placeholder-address">
                {contact.address.city}, {contact.address.state}, {contact.address.country}
              </p>
              <a className="btn btn--primary" href={contact.mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                <Navigation size={15} /> Get directions <ExternalLink size={13} />
              </a>
              <p className="cmap__hint">
                Add your Google Maps embed link to <code>VITE_GOOGLE_MAPS_URL</code> in the{' '}
                <code>.env</code> file to show an interactive map here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
