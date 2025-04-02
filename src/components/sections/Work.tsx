import React from 'react';
import styled from 'styled-components';
import WorkCard from '../ui/WorkCard'; // Make sure this component uses styled-components too
import config from '@config'; // Import config

const StyledProjectsSection = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const StyledHeading = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, var(--fz-heading));
  color: var(--text-primary-color);
  white-space: nowrap;

  &:before {
    position: relative;
    bottom: 4px;
    content: '04.';
    margin-right: 10px;
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
    font-weight: 400;
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    top: -5px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--border-color);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-left: 10px;
    }
  }
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
      <StyledHeading>Some Things I've Built</StyledHeading>

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
