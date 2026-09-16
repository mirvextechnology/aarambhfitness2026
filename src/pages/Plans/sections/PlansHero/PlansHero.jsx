/** PlansHero — page opener for the pricing/plans page. */
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import image from '../../../../assets/images/gym-interior.jpg';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './PlansHero.css';

export default function PlansHero() {
  return (
    <section className="plans-hero">
      <div className="plans-hero__media">
        <img src={image} alt="The Aarambh Fitness training floor" decoding="async" width={1800} height={1100} />
        <span className="plans-hero__scrim" aria-hidden="true" />
        <span className="plans-hero__grain" aria-hidden="true" />
      </div>

      <div className="container plans-hero__content">
        <Reveal variant="fade">
          <span className="eyebrow eyebrow--plain">Plans &amp; Membership</span>
        </Reveal>

        <h1 className="plans-hero__title">
          {['Choose the level', 'of support', 'you need.'].map((line, i) => (
            <Reveal as="span" variant="up" delay={0.12 + i * 0.1} className="line-mask" key={line}>
              <span>{i === 2 ? <em>{line}</em> : line}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal variant="up" delay={0.4}>
          <p className="plans-hero__lede">
            Gym memberships and personal training, priced by how much coaching and review you want.
            Every option starts with the same assessment.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.5} className="plans-hero__actions">
          <a href="#gym-plans" className="btn btn--primary btn--lg">
            See gym plans <ArrowDown size={16} />
          </a>
          <a href="#find-your-plan" className="btn btn--ghost btn--lg">
            Help me choose <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal variant="up" delay={0.58} className="plans-hero__note">
          Pricing is shared directly by our team so it always reflects current offers and duration
          discounts. Nothing on this page is a final quote.
        </Reveal>
      </div>
    </section>
  );
}
