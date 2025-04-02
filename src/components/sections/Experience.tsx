import styled from 'styled-components';
import ExperienceCard from '../ui/ExperienceCard';
import config from '@config';
import SectionHeading from '../ui/SectionHeading';

const StyledExperienceSection = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 100px 0;
`;

const StyledExperiencesGrid = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTimelineItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: -10rem;
  position: relative;
    &:nth-child(odd) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &:nth-child(even) {
    justify-content: flex-end;
    align-items: flex-end;
  }
   @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    &:nth-child(odd),
    &:nth-child(even) {
      align-items: center;

    }
`;

const StyledCardWrapper = styled.div`
  width: 50%;
  padding: 0 1rem;
  position: relative;

  @media (max-width: 768px) {
    width: 80%;
    padding: 0;
    margin-bottom: 1rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 1px;
    background-color: var(--light-slate);
    right:  0;
  }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2rem;
        height: 1px;
        background-color: var(--light-slate);
        left: 0;
    }
    &:nth-child(even) {
        flex-direction: row-reverse;
        align-items: flex-end;
  }

     @media (max-width: 768px) {
          &::after,
          &::before{
            content: none;
          }

        }

`;

const StyledTimelineConnector = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: var(--light-slate);
  z-index: 1;

   @media (max-width: 768px) {
            display: none;
   }
`;

const Experience = () => {
  const { jobs } = config;

  return (
    <StyledExperienceSection id="experience">
      <SectionHeading sectionNumber="2">Where I've Worked</SectionHeading>
      <StyledExperiencesGrid>
        {jobs &&
          jobs.map((job, index) => (
            <StyledTimelineItem key={index}>
              <StyledCardWrapper>
                <ExperienceCard {...job} />
              </StyledCardWrapper>
              <StyledTimelineConnector />
            </StyledTimelineItem>
          ))}
      </StyledExperiencesGrid>
    </StyledExperienceSection>
  );
};

export default Experience;
