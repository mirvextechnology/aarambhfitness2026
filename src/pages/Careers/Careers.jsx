/** Careers — recruitment page: roles, team, application form. */
import SEO from '../../components/SEO/SEO.jsx';
import CareersHero from './sections/CareersHero/CareersHero.jsx';
import WhyJoin from './sections/WhyJoin/WhyJoin.jsx';
import OpenPositions from './sections/OpenPositions/OpenPositions.jsx';
import TrainerTeam from './sections/TrainerTeam/TrainerTeam.jsx';
import TrainerRegistration from './sections/TrainerRegistration/TrainerRegistration.jsx';
import CareersCTA from './sections/CareersCTA/CareersCTA.jsx';
import './Careers.css';

export default function Careers() {
  return (
    <>
      <SEO
        path="/careers"
        title="Careers at Aarambh Fitness — Trainer & Coach Jobs in Kaurihar, Prayagraj"
        description="Join the Aarambh Fitness team in Kaurihar, Prayagraj. Open roles for gym trainers, personal trainers, male and female fitness coaches, home fitness coaches and physiotherapy professionals."
        keywords="gym trainer jobs Prayagraj, personal trainer jobs Kaurihar, fitness coach vacancy, physiotherapy jobs Prayagraj"
      />
      <CareersHero />
      <WhyJoin />
      <OpenPositions />
      <TrainerTeam />
      <TrainerRegistration />
      <CareersCTA />
    </>
  );
}
