import React from 'react';
import styled from 'styled-components';

interface AnimatedThemeToggleIconProps {
  theme: 'light' | 'dark';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  'aria-label'?: string;
}

const ToggleButton = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: transform 0.2s cubic-bezier(0.4, 0.2, 0.2, 1);

  &:hover,
  &:focus-visible {
    transform: scale(1.15);
  }
`;

const IconContainer = styled.span<{ $rotation: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(p) => p.$rotation}deg);
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
`;

const SunIcon = styled.span<{ $visible: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoonIcon = styled.span<{ $visible: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SunSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--sun-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" fill="var(--sun-color)" />
    <g stroke="var(--sun-color)">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
);

const MoonSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--moon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
      fill="var(--moon-color)"
    />
  </svg>
);

const AnimatedThemeToggleIcon: React.FC<AnimatedThemeToggleIconProps> = ({
  theme,
  onClick,
  style,
  className,
  'aria-label': ariaLabel,
}) => {
  const [rotation, setRotation] = React.useState(0);

  const handleClick = () => {
    setRotation((prev) => prev + 360);
    onClick?.();
  };

  return (
    <ToggleButton
      onClick={handleClick}
      style={style}
      className={className}
      aria-label={ariaLabel}
      type="button"
    >
      <IconContainer $rotation={rotation}>
        <SunIcon $visible={theme === 'light'}>
          <SunSvg />
        </SunIcon>
        <MoonIcon $visible={theme === 'dark'}>
          <MoonSvg />
        </MoonIcon>
      </IconContainer>
    </ToggleButton>
  );
};

export default AnimatedThemeToggleIcon;
