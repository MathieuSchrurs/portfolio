import styled from 'styled-components';
import ExperienceCard from '../ui/ExperienceCard';
import config from '@config';

const StyledExperienceSection = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 100px 0;
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
    content: '02.';
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

const StyledExperiencesGrid = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; /* Add positioning context */
`;

const StyledTimelineItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: -10rem; /* Negative margin to bring cards closer/overlap */
  position: relative;
    &:nth-child(odd) {
    justify-content: flex-start; /* Left-align odd cards */
    align-items: flex-start;
  }
  &:nth-child(even) {
    justify-content: flex-end; /* Right-align even cards */
    align-items: flex-end;
  }
   @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Center on smaller screens */
    margin-bottom: 1rem; /* Give space */
    &:nth-child(odd),
    &:nth-child(even) {
      align-items: center;
      
    }
`;

const StyledCardWrapper = styled.div`
  width: 50%;
  padding: 0 1rem;
  position: relative; /* Needed for connector line positioning */

  @media (max-width: 768px) {
    width: 80%; /* Adjusted width for smaller screens */
    padding: 0;
    margin-bottom: 1rem; /* Some space after cards */
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem; /* Length of the horizontal line */
    height: 1px;
    background-color: var(--light-slate);
    /* Place the connector according to which side the card is on */
    right:  0; /* For odd cards (left side) */
  }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2rem; /* Width of the horizontal line */
        height: 1px;
        background-color: var(--light-slate);
        /* Place the connector according to which side the card is on */
        left: 0; /* For even cards (right side) */
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
            <StyledHeading>Where I've Worked</StyledHeading>
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
