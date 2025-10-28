import React from 'react';
import styled from 'styled-components';
import ChromeCard from './ChromeCard';

const StyledExperienceCard = styled(ChromeCard).attrs({
  padding: '1.5rem',
  radius: '0.5rem',
  popoutOnHover: true,
})`
  margin-bottom: 3rem;
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

const StyledDescription = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.5;
  color: var(--text-secondary-color);
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
    <StyledTitle>{title}</StyledTitle>
    <StyledCompany>{company}</StyledCompany>
    <StyledDescription>{description}</StyledDescription>
  </StyledExperienceCard>
);

export default ExperienceCard;
