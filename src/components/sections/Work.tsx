import styled from 'styled-components';
import WorkCard from '../ui/WorkCard';
import config from '@config';
import SectionHeading from '../ui/SectionHeading';

const StyledProjectsSection = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  position: relative;
  margin-top: 50px;
      font-family: var(--font-mono);


  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const Work = () => {
  const { projects } = config;

  return (
    <StyledProjectsSection id="work">
      <SectionHeading sectionNumber="4">Some Things I've Built</SectionHeading>

      <StyledProjectsGrid>
        {projects &&
          projects.map((project, index) => (
            <WorkCard key={index} {...project} />
          ))}
      </StyledProjectsGrid>
    </StyledProjectsSection>
  );
};

export default Work;
