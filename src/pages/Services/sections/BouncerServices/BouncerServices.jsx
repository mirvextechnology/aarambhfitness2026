/**
 * BouncerServices — service block 7.
 * Thin wrapper: all markup and behaviour live in the shared
 * <ServiceSection /> renderer, all copy lives in data/services.js.
 * Presentable event and security staffing.
 */
import ServiceSection from '../../../../components/ServiceSection/ServiceSection.jsx';
import './BouncerServices.css';

export default function BouncerServices() {
  return (
    <div className="svc-wrap svc-wrap--bouncer-services">
      <ServiceSection serviceId="bouncer-services" index={6} />
    </div>
  );
}
