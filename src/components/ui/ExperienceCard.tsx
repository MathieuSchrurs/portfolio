import React from 'react';
import styled from 'styled-components';
import ChromeCard from './ChromeCard';

const StyledExperienceCard = styled(ChromeCard).attrs({
  padding: '1.25rem 1.5rem',
  radius: 'var(--border-radius)',
  popoutOnHover: true,
})`
  border-left: 1px solid var(--accent-color);

  &:hover {
    border-left-color: var(--accent-color);
  }
`;

const StyledCompany = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 600;
  color: var(--accent-color);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
`;

const StyledTitle = styled.h3`
  font-size: var(--fz-xl);
  font-weight: 600;
  color: var(--text-primary-color);
  margin-bottom: 0.75rem;
  line-height: 1.2;
`;

const StyledDescription = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.6;
  color: var(--text-secondary-color);
  margin-bottom: 0;
`;

interface ExperienceCardProps {
  title: string;
  company: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  description,
}) => (
  <StyledExperienceCard>
    <StyledCompany>{company}</StyledCompany>
    <StyledTitle>{title}</StyledTitle>
    <StyledDescription>{description}</StyledDescription>
  </StyledExperienceCard>
);

export default ExperienceCard;
