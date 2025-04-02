import React from 'react';
import styled from 'styled-components';

interface AnimatedThemeToggleIconProps {
  theme: 'light' | 'dark';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
}

const transitionDuration = '0.4s';
const transitionEasing = 'ease-out';

const StyledAnimatedSvg = styled.svg<Pick<AnimatedThemeToggleIconProps, 'theme'>>`
  cursor: pointer;
  stroke: ${(props) =>
    props.theme === 'light' ? 'var(--sun-color)' : 'var(--moon-color)'};
  transition: transform ${transitionDuration} ${transitionEasing},
              stroke ${transitionDuration} ${transitionEasing};
  transform: ${(props) =>
    props.theme === 'light' ? 'rotate(90deg)' : 'rotate(40deg)'};

  .icon-circle {
    transition: r ${transitionDuration} ${transitionEasing},
                fill ${transitionDuration} ${transitionEasing};
    r: ${(props) => (props.theme === 'light' ? 5 : 9)};
    fill: ${(props) =>
    props.theme === 'light' ? 'var(--sun-color)' : 'var(--moon-color)'};
  }

  .mask-circle {
    transition: transform ${transitionDuration} ${transitionEasing};
    transform: ${(props) =>
    props.theme === 'light' ? 'translate(18px, -6px)' : 'translate(0px, 0px)'};
  }

  .icon-rays {
    transition: opacity ${transitionDuration} ${transitionEasing};
    opacity: ${(props) => (props.theme === 'light' ? 1 : 0)};
  }
`;

const AnimatedThemeToggleIcon: React.FC<AnimatedThemeToggleIconProps> = ({
  theme,
  onClick,
  style,
  className,
  role,
  tabIndex,
  'aria-label': ariaLabel,
  onKeyDown,
}) => {
  return (
    <StyledAnimatedSvg
      theme={theme}
      onClick={onClick}
      style={style}
      className={className}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={!ariaLabel}
    >
      <mask id="theme-toggle-mask-css">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle className="mask-circle" cx="12" cy="4" r="9" fill="black" />
      </mask>
      <circle
        className="icon-circle"
        cx="12"
        cy="12"
        mask="url(#theme-toggle-mask-css)"
      />
      <g className="icon-rays">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </StyledAnimatedSvg>
  );
};

export default AnimatedThemeToggleIcon;
