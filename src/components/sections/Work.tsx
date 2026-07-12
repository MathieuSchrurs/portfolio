import styled from 'styled-components';
import WorkCard from '../ui/WorkCard';
import config from '@config';
import SectionHeading from '../ui/SectionHeading';
import SectionWrapper from '../layout/SectionWrapper';

const StyledProjectsSection = styled(SectionWrapper)`
  max-width: 1200px;
`;


/* minmax(400px) caps the row at two columns inside the 1200px section, so
   four projects sit as a balanced 2×2 instead of 3+1 with an orphan. */
const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
  gap: 24px;
  position: relative;
  margin-top: 50px;
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
