import styled from 'styled-components';
import SectionHeading from '../ui/SectionHeading';
import ExperienceCard from '../ui/ExperienceCard';
import config from '@config';
import Timeline from '../ui/timeline/Timeline';

const Section = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 80px 0;
`;

export default function Experience() {
  const { jobs } = config;

  const items = jobs?.map((job, idx) => ({
    id: `${idx}-${job.company}-${job.title}`,
    content: <ExperienceCard {...job} />,
  })) ?? [];

  return (
    <Section id="experience">
      <SectionHeading sectionNumber="2">Where I've Worked</SectionHeading>
      <Timeline
        items={items}
        vars={{
          midW: '180px',      
          rowMin: '64px',
          cardW: '42%',
          cardMax: '420px', 
          cardStub: '10px',
          trunkW: '2px',
          nodeSize: '15px',
        }}
      />
    </Section>
  );
}
