import React from 'react';
import styled from 'styled-components';

interface SectionHeadingProps {
  sectionNumber: string;
  children: React.ReactNode;
  className?: string;
}

/*
 * Terminal/systems section heading: a source-comment prefix (`//`) in the
 * accent colour, the title in lowercase mono, a dashed ASCII-style rule, and
 * the section index pinned right like a code-fold / line marker.
 *
 * Deliberately NOT the leading `01.` + solid hairline of the old design — the
 * number moved to the far right and the rule is dashed so it reads as editor
 * chrome, not an editorial underline.
 */
const StyledHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin: 10px 0 40px;
  width: 100%;
  font-family: var(--font-mono);
  font-weight: 600;
  /* Mono runs ~1.5x wider than the old sans at the same size, so the heading
     is dialled back to keep the prefix, title, rule and index on one line
     down to mobile. */
  font-size: clamp(1.1rem, 0.9rem + 1vw, 1.4rem);
  letter-spacing: 0;
  text-transform: lowercase;
  color: var(--text-primary-color);
  white-space: nowrap;

  .comment {
    color: var(--accent-color);
    font-weight: 400;
    /* Tuck the two slashes closer than mono's fixed pitch so the prefix
       reads as one glyph pair, not two spaced characters. */
    letter-spacing: -0.09em;
  }

  /* Dashed rule drawn with a gradient so the dashes stay crisp at any width —
     an ASCII dashed-rule feel without hard-coding glyph counts. */
  .rule {
    flex: 1;
    height: 1px;
    min-width: 24px;
    background-image: repeating-linear-gradient(
      to right,
      var(--border-color) 0 6px,
      transparent 6px 12px
    );
  }

  .index {
    flex-shrink: 0;
    font-weight: 400;
    font-size: var(--fz-sm);
    color: var(--text-secondary-color);
    letter-spacing: 0.03em;
  }
`;

const SectionHeading: React.FC<SectionHeadingProps> = ({
  sectionNumber,
  children,
  className,
}) => {
  return (
    <StyledHeading className={className}>
      <span className="comment" aria-hidden="true">
        //
      </span>
      {children}
      <span className="rule" aria-hidden="true" />
      <span className="index" aria-hidden="true">
        {`0${sectionNumber}`}
      </span>
    </StyledHeading>
  );
};

export default SectionHeading;
