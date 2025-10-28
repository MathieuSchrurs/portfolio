import React from 'react';
import styled from 'styled-components';

const StyledExperienceCard = styled.div`
  padding: 1.5rem;
  margin-bottom: 3rem;
  border-radius: 0.5rem;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-secondary-color);
  position: relative;
  z-index: 2;
  will-change: transform, opacity;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  &:hover {
    transform: none;
    box-shadow: none;
  }

  animation-timeline: scroll(y);
  animation-name: scrollLift;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;

  @keyframes scrollLift {
    0% {
      transform: translateY(16px);
      opacity: 0.9;
    }
    50% {
      transform: translateY(4px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
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
