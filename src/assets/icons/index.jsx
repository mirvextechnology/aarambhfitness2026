/**
 * Custom brand + specialty icons.
 * lucide-react dropped brand marks in v1, so social icons live here.
 * All follow the lucide contract: 24×24 viewBox, currentColor, 1.5 stroke.
 */

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function Instagram({ size = 24, ...props }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({ size = 24, ...props }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
      <path d="M14.5 21v-7.2h2.6l.4-3h-3V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H8.5v3h2.8V21" />
    </svg>
  );
}

export function Youtube({ size = 24, ...props }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
      <rect x="2.2" y="5.2" width="19.6" height="13.6" rx="4" />
      <path d="M10.2 9.4l4.8 2.6-4.8 2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XSocial({ size = 24, ...props }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
      <path d="M4 4l7.3 9.1L4.4 20" />
      <path d="M20 4l-7.1 7.9L20.2 20h-3.4L4.6 4h3.5" />
    </svg>
  );
}

/** WhatsApp glyph — filled, brand-accurate. */
export function WhatsAppGlyph({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.35c0-4.51 3.67-8.18 8.19-8.18a8.18 8.18 0 0 1 8.18 8.19c0 4.51-3.67 8.18-8.18 8.18Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

/** Concentric performance ring — used as a decorative mark. */
export function PerformanceRing({ size = 24, ...props }) {
  return (
    <svg {...base} width={size} height={size} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.2" />
      <circle cx="12" cy="12" r="5.4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 2.8v3.2M12 18v3.2M2.8 12h3.2M18 12h3.2" />
    </svg>
  );
}

/** Aarambh wordmark "A" mark used in the logo. */
export function AarambhMark({ size = 34, ...props }) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="Aarambh Fitness"
      aria-hidden="true"
      style={{ objectFit: 'contain' }}
      {...props}
    />
  );
}

export default {
  Instagram,
  Facebook,
  Youtube,
  XSocial,
  WhatsAppGlyph,
  PerformanceRing,
  AarambhMark,
};
