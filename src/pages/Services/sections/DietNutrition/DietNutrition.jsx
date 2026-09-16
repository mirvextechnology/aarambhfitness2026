/**
 * DietNutrition — service block 4.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * Practical eating structure built around Indian food.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './DietNutrition.css';

export default function DietNutrition() {
  return (
    <div className="svc-wrap svc-wrap--diet-nutrition">
      <ServiceSection serviceId="diet-nutrition" index={3} />
    </div>
  );
}
