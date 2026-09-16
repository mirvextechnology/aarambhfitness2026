/** About — six sections covering story, purpose, team and conversion. */
import SEO from '../../components/SEO/SEO.jsx';
import JourneyTimeline from '../../components/JourneyTimeline/JourneyTimeline.jsx';
import AboutHero from './sections/AboutHero/AboutHero.jsx';
import OurStory from './sections/OurStory/OurStory.jsx';
import MissionVision from './sections/MissionVision/MissionVision.jsx';
import WhyAarambh from './sections/WhyAarambh/WhyAarambh.jsx';
import TeamPreview from './sections/TeamPreview/TeamPreview.jsx';
import AboutCTA from './sections/AboutCTA/AboutCTA.jsx';
import { joinProcess } from '../../data/siteConfig.js';
import './About.css';

export default function About() {
  return (
    <>
      <SEO
        path="/about"
        title="About Aarambh Fitness — Our Story, Mission & Coaches"
        description="Aarambh Fitness in Kaurihar, Prayagraj was built so nobody has to guess how to train. Assessment first, a written plan second, coaching third."
        keywords="about Aarambh Fitness, gym Kaurihar, fitness coaches Prayagraj"
      />
      <AboutHero />
      <OurStory />
      <MissionVision />
      <WhyAarambh />
      <TeamPreview />
      <JourneyTimeline steps={joinProcess} />
      <AboutCTA />
    </>
  );
}
