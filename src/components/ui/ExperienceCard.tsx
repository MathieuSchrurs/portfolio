import React from 'react';
import styled from 'styled-components';

const StyledExperienceCard = styled.div`
    padding: 1.5rem;
    margin-bottom: 4rem; /* Adjusted: less spacing between cards */
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--text-secondary-color);
    border: 1px solid var(--border-color);
    position: relative; /* Required for z-index */
    z-index: 2; /* Ensure cards are above the timeline */

`;

const StyledTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-primary-color);
  margin-bottom: 1rem;
`;

const StyledCompany = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-color); /* Use theme accent color */
  margin-bottom: 0.25rem;
`;

const StyledRange = styled.p`
  font-size: 0.9rem;
  color: var(--light-slate);
  margin-bottom: 1rem;
`;

const StyledDescription = styled.p`
font-family: var(--font-mono); /* Add font family */
font-size: 0.8rem;
line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Show only 3 lines */
  -webkit-box-orient: vertical;
`;

interface ExperienceCardProps {
    title: string;
    company: string;
    range: string;
    description: string;
  }
  
  const ExperienceCard: React.FC<ExperienceCardProps> = ({
    title,
    company,
    range,
    description,
  }) => {
    return (
      <StyledExperienceCard>
        <StyledTitle>{title}</StyledTitle>
        <StyledCompany>{company}</StyledCompany>
        <StyledRange>{range}</StyledRange>
        <StyledDescription>{description}</StyledDescription>
      </StyledExperienceCard>
    );
  };
  
  export default ExperienceCard;