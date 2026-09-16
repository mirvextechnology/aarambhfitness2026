/**
 * Accordion — accessible, animated disclosure group.
 * Height is measured from the panel's scrollHeight, so any content fits.
 */
import { useId, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import './Accordion.css';

function AccordionItem({ item, index, isOpen, onToggle, idBase }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);

  const headingId = `${idBase}-h-${index}`;
  const panelId = `${idBase}-p-${index}`;

  const toggle = () => {
    if (panelRef.current) setHeight(panelRef.current.scrollHeight);
    onToggle(isOpen ? null : index);
  };

  return (
    <div className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
      <h3 className="accordion__heading">
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="accordion__trigger"
        >
          <span className="accordion__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="accordion__question">{item.q}</span>
          <span className="accordion__icon" aria-hidden="true">
            <Plus size={17} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="accordion__panel"
        style={{ maxHeight: isOpen ? `${height || 600}px` : '0px' }}
        hidden={!isOpen && height === 0}
      >
        <div className="accordion__content" ref={panelRef}>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items = [], allowMultiple = false, defaultOpen = null }) {
  const idBase = useId().replace(/:/g, '');
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = (next) => {
    if (allowMultiple) {
      setOpen((prev) => {
        const current = Array.isArray(prev) ? prev : prev === null ? [] : [prev];
        return current.includes(next) ? current.filter((i) => i !== next) : [...current, next];
      });
    } else {
      setOpen(next);
    }
  };

  const isOpenAt = (i) => (Array.isArray(open) ? open.includes(i) : open === i);

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          item={item}
          index={i}
          isOpen={isOpenAt(i)}
          onToggle={handleToggle}
          idBase={idBase}
        />
      ))}
    </div>
  );
}
