import styled from 'styled-components';
import WorkCard from '../ui/WorkCard';
import config from '@config';
import SectionHeading from '../ui/SectionHeading';
import SectionWrapper from '../layout/SectionWrapper';

const StyledProjectsSection = styled(SectionWrapper)`
  max-width: 1200px;
`;


const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  position: relative;
  margin-top: 50px;


  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const cardTilts = [
  'rotate(-0.35deg)',
  'rotate(0.3deg)',
  'rotate(-0.25deg)',
  'rotate(0.4deg)',
  'rotate(-0.3deg)',
  'rotate(0.25deg)',
];

const Work = () => {
  const { projects } = config;

  return (
    <StyledProjectsSection id="work">
      <SectionHeading sectionNumber="4">Things I've Built</SectionHeading>

      <StyledProjectsGrid>
        {projects &&
          projects.map((project, index) => (
            <WorkCard
              key={project.title}
              {...project}
              $tilt={cardTilts[index % cardTilts.length]}
            />
          ))}
      </StyledProjectsGrid>
    </StyledProjectsSection>
  );
};

export default Work;
