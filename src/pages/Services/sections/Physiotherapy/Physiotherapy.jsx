/**
 * Physiotherapy — service block 6.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * Assessment, mobility and a staged return to training.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './Physiotherapy.css';

export default function Physiotherapy() {
  return (
    <div className="svc-wrap svc-wrap--physiotherapy">
      <ServiceSection serviceId="physiotherapy" index={5} />
    </div>
  );
}
