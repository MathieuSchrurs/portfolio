import React from 'react';
import styled from 'styled-components';

const StyledProjectCard = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 2rem 1.75rem;
  transition: var(--transition);
  cursor: default;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Adjust shadow */
  }
`;

const StyledTitle = styled.h3`
  margin-bottom: 5px;
  color: var(--lightest-slate);
  font-size: 1.3rem;
  font-weight: 500;

  a {
    position: relative;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledDescription = styled.div`
  font-size: 1.1rem;
  color: var(--slate);
`;

const StyledTagList = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 12px 0;
  list-style: none;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--light-slate);
    margin-right: 8px;
    margin-bottom: 5px;
    white-space: nowrap;

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
      <header>
        <StyledTitle>
          {title}
        </StyledTitle>
      </header>
      <StyledDescription>
        {description}
      </StyledDescription>
      <footer>
        <StyledTagList>
          {tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </StyledTagList>
      </footer>
          {liveUrl ? <a href={liveUrl}> URL </a> : null}
          {codeUrl ? <a href={codeUrl}> Code </a> : null}
    </StyledProjectCard>
  );
};

export default WorkCard;
