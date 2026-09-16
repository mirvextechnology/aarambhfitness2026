/**
 * SectionHeading — the standard section header block:
 * oversized index number, eyebrow label, title, optional lede and side slot.
 */
import './SectionHeading.css';

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = 'left',
  size = 'lg',
  aside,
  className = '',
  id,
}) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${size} ${className}`.trim()} id={id}>
      <div className="section-heading__main">
        <div className="section-heading__meta">
          {index ? <span className="section-heading__index">{index}</span> : null}
          {eyebrow ? <span className="eyebrow eyebrow--plain">{eyebrow}</span> : null}
        </div>

        <h2 className="section-heading__title">
          {Array.isArray(title)
            ? title.map((line, i) => (
                <span className="line-mask" key={i}>
                  <span>{line}</span>
                </span>
              ))
            : title}
        </h2>

        {lede ? <p className="section-heading__lede">{lede}</p> : null}
      </div>

      {aside ? <div className="section-heading__aside">{aside}</div> : null}
    </header>
  );
}
