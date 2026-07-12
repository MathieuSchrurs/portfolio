import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const StyledTerminalCard = styled.article<{ $tilt?: string }>`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 20px -10px var(--shadow-color);
  overflow: hidden;
  transition: var(--transition);
  ${({ $tilt }) => $tilt && `transform: ${$tilt};`}

  &:hover,
  &:focus-within {
    transform: translateY(-4px) rotate(0deg);
    border-color: color-mix(in srgb, var(--accent-color) 55%, var(--border-color));
    box-shadow: 0 16px 32px -12px var(--shadow-color);
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;

    &:hover,
    &:focus-within {
      transform: none;
    }
  }
`;

const StyledTitleBar = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background-color: color-mix(in srgb, var(--border-color) 30%, transparent);
`;

const StyledDots = styled.span`
  display: flex;
  gap: 6px;
  flex-shrink: 0;

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--border-color);
    transition: background-color 0.25s var(--easing);

    &:nth-child(2) {
      transition-delay: 60ms;
    }

    &:nth-child(3) {
      transition-delay: 120ms;
    }
  }

  ${StyledTerminalCard}:hover &,
  ${StyledTerminalCard}:focus-within & {
    i {
      background-color: var(--accent-color);
    }
  }
`;

const StyledFilename = styled.h3`
  margin: 0;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledBody = styled.div`
  padding: 1.25rem 1.25rem 0;
`;

const StyledDescription = styled.p`
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.6;
  color: var(--text-secondary-color);
`;

const StyledPrompt = styled.span`
  color: var(--accent-color);
  margin-right: 0.5em;
  user-select: none;
`;

const StyledCursor = styled.span`
  color: var(--accent-color);
  margin-left: 0.15em;
  user-select: none;

  ${StyledTerminalCard}:hover &,
  ${StyledTerminalCard}:focus-within & {
    animation: ${blink} 1.1s step-end infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const StyledCardFooter = styled.footer`
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem 1.1rem;
`;

const StyledFlagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.75rem;
  row-gap: 0.25rem;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.5;
    color: var(--accent-color);
  }
`;

const StyledProjectLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

interface WorkCardProps {
  title: string;
  /** Short terminal-style filename incl. extension (e.g. "issue-tracker.cs"). Falls back to a slug of the title. */
  filename?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  $tilt?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  title,
  filename,
  description,
  tags,
  liveUrl,
  codeUrl,
  $tilt,
}) => {
  return (
    <StyledTerminalCard $tilt={$tilt}>
      <StyledTitleBar>
        <StyledDots aria-hidden="true">
          <i />
          <i />
          <i />
        </StyledDots>
        <StyledFilename aria-label={title}>
          {filename ?? `${slugify(title)}.ts`}
        </StyledFilename>
      </StyledTitleBar>

      <StyledBody>
        <StyledDescription>
          <StyledPrompt aria-hidden="true">$</StyledPrompt>
          {description}
          <StyledCursor aria-hidden="true">▍</StyledCursor>
        </StyledDescription>
      </StyledBody>

      <StyledCardFooter>
        {tags && tags.length > 0 && (
          <StyledFlagList>
            {tags.map((tag, i) => (
              <li key={i}>--{slugify(tag)}</li>
            ))}
          </StyledFlagList>
        )}
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
              aria-label="Live Project Website"
            >
              <BsGlobe />
            </StyledIconLink>
          )}
        </StyledProjectLinks>
      </StyledCardFooter>
    </StyledTerminalCard>
  );
};

export default WorkCard;
