/** Contact — details, enquiry form, map, hours, closing CTA. */
import SEO from '../../components/SEO/SEO.jsx';
import ContactHero from './sections/ContactHero/ContactHero.jsx';
import ContactInformation from './sections/ContactInformation/ContactInformation.jsx';
import ContactForm from './sections/ContactForm/ContactForm.jsx';
import Map from './sections/Map/Map.jsx';
import OpeningHours from './sections/OpeningHours/OpeningHours.jsx';
import ContactCTA from './sections/ContactCTA/ContactCTA.jsx';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <SEO
        path="/contact"
        title="Contact Aarambh Fitness — Kaurihar, Prayagraj"
        description="Contact Aarambh Fitness in Kaurihar, Prayagraj. Call, WhatsApp or send an enquiry about gym training, personal training, home fitness and event staffing."
        keywords="contact gym Kaurihar, Aarambh Fitness Prayagraj phone, gym near Kaurihar"
      />
      <ContactHero />
      <ContactInformation />
      <ContactForm />
      <Map />
      <OpeningHours />
      <ContactCTA />
    </>
  );
}
