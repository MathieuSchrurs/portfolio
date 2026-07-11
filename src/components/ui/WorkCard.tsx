import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import ChromeCard from './ChromeCard';

const StyledProjectCard = styled(ChromeCard).attrs({
  padding: '1.75rem',
  radius: 'var(--border-radius)',
  accentGlowOnHover: true,
})`
  color: var(--text-secondary-color);
  display: flex;
  flex-direction: column;
  min-height: 200px;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: flex-start; 
  margin-bottom: 15px; 
`;

const StyledProjectLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

const StyledIconLink = styled.a`
  color: var(--text-secondary-color);
  padding: 5px;
  z-index: 1;

  &:hover,
  &:focus {
    color: var(--accent-color);
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const StyledTitle = styled.h3`
  margin: 0;
  margin-right: 10px;
  color: var(--text-primary-color);
  font-size: var(--fz-xl);
  font-weight: 600;
`;

const StyledDescription = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.6;
  color: var(--text-secondary-color);
  margin-bottom: 1rem;
`;

const StyledCardFooter = styled.footer`
  margin-top: auto;
`;

const StyledTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  padding-top: 1rem;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--accent-color);
    margin-right: 8px;
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--accent-tint-color);
    padding: 0.2rem 0.55rem;
    border-radius: var(--border-radius);

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

interface WorkCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  title,
  description,
  tags,
  liveUrl,
  codeUrl,
}) => {
  return (
    <StyledProjectCard>
      <StyledCardHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledProjectLinks>
          {codeUrl && (
            <StyledIconLink
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Code Link"
            >
              <FaGithub />
            </StyledIconLink>
          )}
          {liveUrl && (
            <StyledIconLink
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="External Project Link"
            >
              <FiExternalLink />
            </StyledIconLink>
          )}
        </StyledProjectLinks>
      </StyledCardHeader>

      <StyledDescription>{description}</StyledDescription>

      <StyledCardFooter>
        {tags && tags.length > 0 && (
          <StyledTagList>
            {tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </StyledTagList>
        )}
      </StyledCardFooter>
    </StyledProjectCard>
  );
};

export default WorkCard;
