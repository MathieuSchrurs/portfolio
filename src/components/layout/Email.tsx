import React from 'react';
import styled, { css } from 'styled-components';
import config from '@config';
import Side from './Side';
import { usePrefersReducedMotion } from '../../hooks';

const StyledLinkWrapper = styled.div<{ prefersReducedMotion: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    color: var(--light-slate);
    text-decoration: none;
    transition: ${(props) => props.prefersReducedMotion ? 'none' : 'var(--transition)'};

    &:hover,
    &:focus {
      color: var(--accent-color);
      ${(props) => !props.prefersReducedMotion && css`
        transform: translateY(-3px);
      `}
    }
  }
`;

const Email: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Side orientation="right">
      <StyledLinkWrapper prefersReducedMotion={prefersReducedMotion}>
        <a href={`mailto:${config.email}`}>{config.email}</a>
      </StyledLinkWrapper>
    </Side>
  );
};

export default Email;
