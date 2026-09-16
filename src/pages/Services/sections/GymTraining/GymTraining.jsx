/**
 * GymTraining — service block 1.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * Strength, conditioning and technique coaching on the training floor.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './GymTraining.css';

export default function GymTraining() {
  return (
    <div className="svc-wrap svc-wrap--gym-training">
      <ServiceSection serviceId="gym-training" index={0} />
    </div>
  );
}
