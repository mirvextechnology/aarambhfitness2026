/**
 * SEO — one place for every page's head metadata.
 * Titles, descriptions, canonical, robots, Open Graph and Twitter.
 */
import { Helmet } from 'react-helmet-async';
import { site, contact } from '../../data/siteConfig.js';

export default function SEO({
  title,
  description = site.description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  keywords,
}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const canonical = `${site.url.replace(/\/$/, '')}${path === '/' ? '/' : path}`;
  const ogImage = image ? new URL(image, site.url).href : undefined;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={contact.businessName} />
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content={`${contact.address.city}, ${contact.address.state}`} />
      <meta name="theme-color" content="#0A0A0A" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  );
}
