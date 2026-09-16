/**
 * BackToTop — appears past the first viewport, uses Lenis when available.
 */
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.1);
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

  const toTop = (e) => {
    e.preventDefault();
    if (typeof window.scrollToSmooth === 'function') {
      window.scrollToSmooth(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={17} />
    </button>
  );
}
