/**
 * ScrollProgress — thin orange bar fixed to the top of the viewport.
 * Driven by requestAnimationFrame-throttled scroll + resize listeners.
 */
import { useEffect, useRef, useState } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const barRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setPercent(p);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" role="presentation">
      <div className="scroll-progress__bar" ref={barRef} />
      <span className="sr-only">Page scroll progress: {Math.round(percent * 100)}%</span>
    </div>
  );
}
