import React from 'react';
import styled from 'styled-components';

const StyledExperienceCard = styled.div`
  padding: 1.5rem;
  margin-bottom: 4rem;
  border-radius: 0.5rem;
  background-color: var(--card-bg-color);
  color: var(--text-secondary-color);
  border: 1px solid var(--border-color);
  position: relative;
  z-index: 2;
  transition: var(--transition), box-shadow 0.35s ease, transform 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    border-color: var(--accent-color);
    box-shadow: 0 0 12px 2px var(--accent-tint-color);
    color: var(--text-primary-color);
    z-index: 10; /* lifted above connectors and line */
  }

  &:active {
    transform: scale(0.995);
    box-shadow: 0 0 6px 1px var(--accent-tint-color);
  }
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

const StyledDescription = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.5;
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
