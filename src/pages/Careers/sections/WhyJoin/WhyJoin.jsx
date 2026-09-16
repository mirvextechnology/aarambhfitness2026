/** WhyJoin — what working here actually looks like. No inflated promises. */
import { GraduationCap, Users, CalendarClock, Handshake, TrendingUp, MapPin } from 'lucide-react';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import Reveal from '../../../../components/Reveal/Reveal.jsx';
import './WhyJoin.css';

const REASONS = [
  { icon: GraduationCap, title: 'Coaching, not just floor duty', copy: 'You will run real sessions with real programming, and be reviewed on how well your members progress.' },
  { icon: Users, title: 'Small member load', copy: 'Groups and one-to-one slots are kept small on purpose so your attention is worth something.' },
  { icon: CalendarClock, title: 'Flexible roles', copy: 'Full-time, part-time, weekends only or per-session — tell us what works and we will try to match it.' },
  { icon: TrendingUp, title: 'Skill development', copy: 'Programming, assessment and nutrition structure are taught in-house, not left to you to figure out.' },
  { icon: Handshake, title: 'Clear expectations', copy: 'Responsibilities and requirements are written down for every role. No surprises after you join.' },
  { icon: MapPin, title: 'Based in Kaurihar', copy: 'A local team working in one place, with home fitness routes in nearby Prayagraj.' },
];

export default function WhyJoin() {
  return (
    <section className="why-join section bg-900" aria-labelledby="why-join-title">
      <div className="container">
        <SectionHeading
          index="01 — Why Join"
          eyebrow="Working with us"
          title="What the job actually looks like."
          lede="We would rather be specific than impressive. Here is what you can expect if you join the Aarambh team."
          className="section-heading--split"
          id="why-join-title"
        />

        <ul className="why-join__grid" role="list">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal as="li" variant="up" delay={i * 0.06} className="why-join__item" key={reason.title}>
                <span className="why-join__icon">
                  <Icon size={18} />
                </span>
                <h3 className="why-join__title">{reason.title}</h3>
                <p className="why-join__copy">{reason.copy}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
