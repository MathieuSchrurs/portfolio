import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const StyledProjectCard = styled.div`
  background-color: var(--project-card-bg);
  color: var(--text-secondary-color);
  border-radius: var(--border-radius);
  padding: 1.75rem; /* Adjusted padding slightly */
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;

  &:hover,
  &:focus-within {
    outline: none;
    box-shadow: 0 4px 12px var(--shadow-color);
    transform: translateY(-5px);
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between; /* Pushes title and links apart */
  align-items: flex-start; /* Aligns items to the top */
  margin-bottom: 15px; /* Space below the header area */
`;

const StyledProjectLinks = styled.div`
  /* position: absolute; REMOVED */
  /* top: 1.25rem; REMOVED */
  /* right: 1.75rem; REMOVED */
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0; /* Prevent icons from shrinking if title is very long */
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
  margin: 0; /* Remove default margins */
  margin-right: 10px; /* Add space between title and icons */
  color: var(--text-primary-color);
  font-size: var(--fz-xxl);
  font-weight: 600;
  /* Title will naturally wrap if needed */
`;

const StyledDescription = styled.div`
  font-size: var(--fz-md);
  color: var(--text-secondary-color);
  margin-bottom: 1rem;
`;

const StyledTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: auto;
  padding-top: 1rem;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-secondary-color);
    margin-right: 10px;
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--accent-tint-color);
    padding: 0.15rem 0.5rem;
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

      <footer>
        {tags && tags.length > 0 && (
          <StyledTagList>
            {tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </StyledTagList>
        )}
      </footer>
    </StyledProjectCard>
  );
};

export default WorkCard;
