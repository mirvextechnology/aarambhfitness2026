/** Plans — gym plans, PT options, comparison, interactive recommender, CTA. */
import SEO from '../../components/SEO/SEO.jsx';
import StartPointCTA from '../../components/StartPointCTA/StartPointCTA.jsx';
import PlansHero from './sections/PlansHero/PlansHero.jsx';
import GymPlans from './sections/GymPlans/GymPlans.jsx';
import PTPlans from './sections/PTPlans/PTPlans.jsx';
import PlanComparison from './sections/PlanComparison/PlanComparison.jsx';
import FindYourPlan from './sections/FindYourPlan/FindYourPlan.jsx';
import PlansCTA from './sections/PlansCTA/PlansCTA.jsx';
import './Plans.css';

export default function Plans() {
  return (
    <>
      <SEO
        path="/plans"
        title="Membership & Personal Training Plans — Aarambh Fitness Kaurihar"
        description="Compare Aarambh Fitness gym memberships (START, TRANSFORM, ELITE) and personal training options including 1:1 PT, transformation coaching and home personal training."
        keywords="gym membership Kaurihar, personal training plans Prayagraj, home personal training, gym plans"
      />
      <PlansHero />
      <GymPlans />
      <PTPlans />
      <PlanComparison />
      <FindYourPlan />
      <StartPointCTA target="/#fitness-assessment" />
      <PlansCTA />
    </>
  );
}
