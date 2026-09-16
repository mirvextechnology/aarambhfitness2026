/**
 * ExercisePlanning — service block 5.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * A written programme with planned progression.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './ExercisePlanning.css';

export default function ExercisePlanning() {
  return (
    <div className="svc-wrap svc-wrap--exercise-planning">
      <ServiceSection serviceId="exercise-planning" index={4} />
    </div>
  );
}
