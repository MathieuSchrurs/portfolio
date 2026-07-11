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
  gap: 15px;
  position: relative;
  margin-top: 50px;


  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const Work = () => {
  const { projects } = config;

  return (
    <StyledProjectsSection id="work">
      <SectionHeading sectionNumber="4">Things I've Built</SectionHeading>

      <StyledProjectsGrid>
        {projects &&
          projects.map((project) => (
            <WorkCard key={project.title} {...project} />
          ))}
      </StyledProjectsGrid>
    </StyledProjectsSection>
  );
};

export default Work;
