/**
 * MagneticButton — desktop-only magnetic pull + shimmer sweep.
 * Falls back to a plain styled element on touch / reduced motion.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery, isTouch } from '../../hooks/useMediaQuery.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import './MagneticButton.css';

export default function MagneticButton({
  as,
  to,
  href,
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconRight = true,
  magnetic = 0.28,
  ariaLabel,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isSmall = useMediaQuery('(max-width: 1024px)');
  const enabled = !reduced && !isSmall && !isTouch();
  const [active, setActive] = useState(false);

  const handleMove = useCallback(
    (e) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * magnetic;
      const y = (e.clientY - rect.top - rect.height / 2) * magnetic;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const inner = ref.current.querySelector('.magnetic-button__label');
      if (inner) inner.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
    },
    [enabled, magnetic]
  );

  const reset = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = '';
    const inner = ref.current.querySelector('.magnetic-button__label');
    if (inner) inner.style.transform = '';
  }, []);

  useEffect(() => reset, [reset]);

  const classes = `magnetic-button magnetic-button--${variant} magnetic-button--${size} ${className}`.trim();
  const inner = (
    <>
      <span className="magnetic-button__sweep" aria-hidden="true" />
      <span className="magnetic-button__label">
        {!iconRight && icon ? <span className="magnetic-button__icon">{icon}</span> : null}
        <span>{children}</span>
        {iconRight && icon ? <span className="magnetic-button__icon">{icon}</span> : null}
      </span>
    </>
  );

  const handlers = {
    onMouseMove: handleMove,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => {
      setActive(false);
      reset();
    },
    onFocus: () => setActive(true),
    onBlur: () => {
      setActive(false);
      reset();
    },
    onClick,
  };

  // Route link
  if (to) {
    return (
      <Link to={to} ref={ref} className={classes} aria-label={ariaLabel} data-active={active} {...handlers} {...rest}>
        {inner}
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        data-active={active}
        {...handlers}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  // Custom element
  if (as) {
    const CustomTag = as;
    return (
      <CustomTag ref={ref} className={classes} aria-label={ariaLabel} data-active={active} {...handlers} {...rest}>
        {inner}
      </CustomTag>
    );
  }

  return (
    <button ref={ref} type="button" className={classes} aria-label={ariaLabel} data-active={active} {...handlers} {...rest}>
      {inner}
    </button>
  );
}
