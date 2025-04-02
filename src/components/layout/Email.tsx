import React from 'react';
import styled from 'styled-components';
import config from '@config';
import Side from './Side';

const StyledLinkWrapper = styled.div`
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

    &:hover,
    &:focus {
      transform: translateY(-3px); 
      color: var(--accent-color);
    }
  }
`;

interface EmailProps {
  isHome: boolean;
}

const Email: React.FC<EmailProps> = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${config.email}`}>{config.email}</a>
    </StyledLinkWrapper>
  </Side>
);

export default Email;
