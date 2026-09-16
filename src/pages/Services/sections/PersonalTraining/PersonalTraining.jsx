/**
 * PersonalTraining — service block 2.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * One coach, full attention, for the entire session.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './PersonalTraining.css';

export default function PersonalTraining() {
  return (
    <div className="svc-wrap svc-wrap--personal-training">
      <ServiceSection serviceId="personal-training" index={1} />
    </div>
  );
}
