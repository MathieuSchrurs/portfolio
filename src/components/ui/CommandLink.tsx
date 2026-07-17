import React from 'react';
import styled from 'styled-components';

/*
 * A link styled as a bracketed terminal command: [ label ]. The site's
 * standard action affordance (Hero actions, nav CV, mobile menu CV), replacing
 * the old outlined-button look. Brackets carry the accent; the label lights
 * accent on hover/focus. Font-size is inherited so each context (nav row,
 * hero actions, menu) sets its own scale.
 */
const StyledCommand = styled.a`
  font-family: var(--font-mono);
  font-size: inherit;
  color: var(--text-primary-color);
  text-decoration: none;
  white-space: nowrap;
  transition: var(--transition);

  .bracket {
    color: var(--accent-color);
  }

  &:hover,
  &:focus-visible {
    color: var(--accent-color);
  }
`;

interface CommandLinkProps {
  href: string;
  children: React.ReactNode;
  download?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
}

const CommandLink: React.FC<CommandLinkProps> = ({
  href,
  children,
  download,
  target,
  rel,
  className,
  onClick,
}) => (
  <StyledCommand
    href={href}
    download={download}
    target={target}
    rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
    className={className}
    onClick={onClick}
  >
    <span className="bracket" aria-hidden="true">
      [
    </span>{' '}
    {children}{' '}
    <span className="bracket" aria-hidden="true">
      ]
    </span>
  </StyledCommand>
);

export default CommandLink;
