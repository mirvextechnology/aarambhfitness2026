/**
 * FitnessConsultation — service block 8.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * An honest starting point before you commit.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './FitnessConsultation.css';

export default function FitnessConsultation() {
  return (
    <div className="svc-wrap svc-wrap--fitness-consultation">
      <ServiceSection serviceId="fitness-consultation" index={7} />
    </div>
  );
}
