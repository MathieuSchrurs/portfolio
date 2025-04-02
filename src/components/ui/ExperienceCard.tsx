import React from 'react';
import styled from 'styled-components';

const StyledExperienceCard = styled.div`
    padding: 1.5rem;
    margin-bottom: 4rem;
    border-radius: 0.5rem;
    background-color: transparent; /* Ensure background doesn't obscure timeline */
    color: var(--text-secondary-color);
    border: 1px solid var(--border-color);
    position: relative;
    z-index: 2;
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
  color: var(--accent-color);
  margin-bottom: 0.25rem;
`;

const StyledRange = styled.p`
  font-size: 0.9rem;
  color: var(--light-slate);
  margin-bottom: 1rem;
`;

// --- Updated StyledDescription ---
const StyledDescription = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-sm); /* Increased from 0.8rem (14px) */
  line-height: 1.5; /* Adjusted line-height slightly for readability */
  /* Removed truncation styles */
  /* overflow: hidden; */
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 4; */
  /* -webkit-box-orient: vertical; */
`;
// --- End Update ---

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
