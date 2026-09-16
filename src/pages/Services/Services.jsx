/** Services — hero, sticky jump nav, eight service blocks, comparison, FAQ, CTA. */
import SEO from '../../components/SEO/SEO.jsx';
import ServicesHero from './sections/ServicesHero/ServicesHero.jsx';
import ServiceNavigation from './sections/ServiceNavigation/ServiceNavigation.jsx';
import GymTraining from './sections/GymTraining/GymTraining.jsx';
import PersonalTraining from './sections/PersonalTraining/PersonalTraining.jsx';
import HomeFitness from './sections/HomeFitness/HomeFitness.jsx';
import DietNutrition from './sections/DietNutrition/DietNutrition.jsx';
import ExercisePlanning from './sections/ExercisePlanning/ExercisePlanning.jsx';
import Physiotherapy from './sections/Physiotherapy/Physiotherapy.jsx';
import BouncerServices from './sections/BouncerServices/BouncerServices.jsx';
import FitnessConsultation from './sections/FitnessConsultation/FitnessConsultation.jsx';
import ServiceComparison from './sections/ServiceComparison/ServiceComparison.jsx';
import FAQ from './sections/FAQ/FAQ.jsx';
import ServicesCTA from './sections/ServicesCTA/ServicesCTA.jsx';
import './Services.css';

export default function Services() {
  return (
    <>
      <SEO
        path="/services"
        title="Fitness Services in Kaurihar — Gym, Personal Training, Home Fitness & Physiotherapy"
        description="Eight fitness services at Aarambh Fitness, Kaurihar: gym training, personal training, home fitness, diet guidance, exercise planning, physiotherapy support, consultation and event staffing."
        keywords="gym training Kaurihar, personal training Prayagraj, home fitness trainer, diet guidance, physiotherapy Prayagraj, fitness consultation"
      />
      <ServicesHero />
      <ServiceNavigation />
      <GymTraining />
      <PersonalTraining />
      <HomeFitness />
      <DietNutrition />
      <ExercisePlanning />
      <Physiotherapy />
      <BouncerServices />
      <FitnessConsultation />
      <ServiceComparison />
      <FAQ />
      <ServicesCTA />
    </>
  );
}
