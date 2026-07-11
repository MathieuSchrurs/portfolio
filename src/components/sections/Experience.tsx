import SectionHeading from '../ui/SectionHeading';
import ExperienceTimeline from '../ui/ExperienceTimeline';
import config from '@config';
import SectionWrapper from '../layout/SectionWrapper';

export default function Experience() {
  const { jobs } = config;

  return (
    <SectionWrapper id="experience">
      <SectionHeading sectionNumber="2">Where I've Worked</SectionHeading>
      <ExperienceTimeline jobs={jobs} />
    </SectionWrapper>
  );
}
