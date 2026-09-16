/**
 * Home — 14 sections, each in its own folder.
 * Order is intentional: hook → credibility → services → tools → offers → conversion.
 */
import { useNavigate } from 'react-router-dom';

import SEO from '../../components/SEO/SEO.jsx';
import StartPointCTA from '../../components/StartPointCTA/StartPointCTA.jsx';
import JourneyTimeline from '../../components/JourneyTimeline/JourneyTimeline.jsx';
import TrustBand from '../../components/TrustBand/TrustBand.jsx';
import ProgressTracker from '../../components/ProgressTracker/ProgressTracker.jsx';

import Hero from './sections/Hero/Hero.jsx';
import BrandIntro from './sections/BrandIntro/BrandIntro.jsx';
import ServicesPreview from './sections/ServicesPreview/ServicesPreview.jsx';
import FitnessAssessment from './sections/FitnessAssessment/FitnessAssessment.jsx';
import BMICalculator from './sections/BMICalculator/BMICalculator.jsx';
import GoalPlanner from './sections/GoalPlanner/GoalPlanner.jsx';
import DietPlanner from './sections/DietPlanner/DietPlanner.jsx';
import MembershipPlans from './sections/MembershipPlans/MembershipPlans.jsx';
import PersonalTraining from './sections/PersonalTraining/PersonalTraining.jsx';
import HomeFitness from './sections/HomeFitness/HomeFitness.jsx';
import Physiotherapy from './sections/Physiotherapy/Physiotherapy.jsx';
import Testimonials from './sections/Testimonials/Testimonials.jsx';
import Statistics from './sections/Statistics/Statistics.jsx';
import FinalCTA from './sections/FinalCTA/FinalCTA.jsx';

import { joinProcess, trustPoints, site } from '../../data/siteConfig.js';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        path="/"
        title="Gym, Personal Training & Home Fitness in Kaurihar, Prayagraj"
        description="Aarambh Fitness in Kaurihar, Prayagraj offers gym training, personal training, home fitness, diet guidance and physiotherapy support. Start with a free consultation."
        keywords="gym in Kaurihar, fitness centre Kaurihar, gym in Prayagraj, personal trainer Prayagraj, home fitness trainer, physiotherapy Prayagraj"
      />

      <Hero />
      <BrandIntro />
      <ServicesPreview />
      <StartPointCTA onOpenAssessment target="#fitness-assessment" />
      <FitnessAssessment onOpenConsultation={() => navigate('/consultation')} />
      <BMICalculator />
      <GoalPlanner />
      <DietPlanner />
      <MembershipPlans />
      <PersonalTraining />
      <HomeFitness />
      <Physiotherapy />
      <TrustBand points={trustPoints} />
      <JourneyTimeline steps={joinProcess} />
      <Testimonials />
      <Statistics />
      <ProgressTracker />
      <FinalCTA />
    </>
  );
}
