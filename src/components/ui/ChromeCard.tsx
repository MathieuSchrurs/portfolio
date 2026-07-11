import styled, { css } from 'styled-components';

type ChromeCardProps = {
  padding?: string;
  radius?: string;
  popoutOnHover?: boolean;
  accentGlowOnHover?: boolean;
};

const ChromeCard = styled.div<ChromeCardProps>`
  position: relative;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: ${({ radius }) => radius || '0.5rem'};
  padding: ${({ padding }) => padding || '1.5rem'};
  z-index: 2;

  will-change: transform, opacity;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out,
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.3s ease-out;

  &:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--border-color);
  }

  ${({ popoutOnHover }) =>
    popoutOnHover &&
    css`
      &:hover {
        transform: translateY(-2px) scale(1.01);
      }
    `}

  ${({ accentGlowOnHover }) =>
    accentGlowOnHover &&
    css`
      &:hover,
      &:focus-within {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 8px 24px -8px var(--accent-color);
        transform: translateY(-5px);
      }
    `}
`;

export default ChromeCard;
