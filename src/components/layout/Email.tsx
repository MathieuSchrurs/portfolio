import React from 'react';
import styled from 'styled-components';
import config from '@config'; // Import config
import Side from './Side'; // Import Side component

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  /* Style the line like the target */
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
    font-size: var(--fz-xxs); // Use font size variable
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    color: var(--light-slate); // Match color
    text-decoration: none; // Remove underline

    &:hover,
    &:focus {
      transform: translateY(-3px); // Add hover effect
      color: var(--accent-color); // Use theme accent color
    }
  }
`;

interface EmailProps {
  isHome: boolean; // Prop passed from Layout
}

const Email: React.FC<EmailProps> = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${config.email}`}>{config.email}</a>
    </StyledLinkWrapper>
  </Side>
);

export default Email;
