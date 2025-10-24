import styled from 'styled-components';
import ExperienceCard from '../ui/ExperienceCard';
import config from '@config';
import SectionHeading from '../ui/SectionHeading';

const StyledExperienceSection = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

const StyledExperiencesGrid = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  z-index: 0;
`;

const StyledTimelineConnector = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: var(--light-slate);
  z-index: -1;

  @media (max-width: 768px) {
    left: 24px;
  }
`;

const StyledTimelineItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin: -4rem 0;
  z-index: 1;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(odd) {
    flex-direction: row;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 2rem 0;
  }
`;

const StyledCardWrapper = styled.div`
  width: 46%;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    width: 90%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 1px;
    background-color: var(--light-slate);
    z-index: 2;
  }

  ${StyledTimelineItem}:nth-child(odd) &::before {
    right: -3rem;
  }

  ${StyledTimelineItem}:nth-child(even) &::before {
    left: -3rem;
  }

  @media (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

const Experience = () => {
  const { jobs } = config;

  return (
    <StyledExperienceSection id="experience">
      <SectionHeading sectionNumber="2">Where I've Worked</SectionHeading>
      <StyledExperiencesGrid>
        <StyledTimelineConnector />
        {jobs &&
          jobs.map((job, index) => (
            <StyledTimelineItem key={index}>
              <StyledCardWrapper>
                <ExperienceCard {...job} />
              </StyledCardWrapper>
            </StyledTimelineItem>
          ))}
      </StyledExperiencesGrid>
    </StyledExperienceSection>
  );
};

export default Experience;
