/**
 * HomeFitness — service block 3.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * Coached sessions delivered at your home.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './HomeFitness.css';

export default function HomeFitness() {
  return (
    <div className="svc-wrap svc-wrap--home-fitness">
      <ServiceSection serviceId="home-fitness" index={2} />
    </div>
  );
}
