// src/components/layout/Nav.tsx
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import config from '@config';
import { useScrollDirection, usePrefersReducedMotion } from '../../hooks';
import AnimatedLogo from '../ui/AnimatedLogo';
import ThemeToggle from '../ui/ThemeToggle';
import CVDownload from '../ui/CVDownload';

// --- StyledHeader remains the same ---
interface StyledHeaderProps {
  scrollDirection: 'up' | 'down' | null;
  scrolledToTop: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  /* ... existing styles ... */
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--header-bg-color);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
    props.scrollDirection === 'up' &&
    !props.scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: var(--header-bg-color);
        box-shadow: 0 10px 30px -10px var(--shadow-color);
      `}

    ${(props) =>
    props.scrollDirection === 'down' &&
    !props.scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--shadow-color);
      `}
  }
`;

// Styled Wrapper - "Erase on Unhover" Logic
const StyledLogoWrapper = styled.div<{ isHovered: boolean }>`
  display: block;
  width: 55px;
  height: 55px;
  cursor: pointer;
  position: relative; /* Needed for absolute positioning if used */

  a {
    display: block;
    width: 100%;
    height: 100%;
    &:hover,
    &:focus {
      outline: none;
    }
  }

  svg {
    width: 100%;
    height: 100%;
    user-select: none;
    /* Ensure SVGs overlap if needed, though opacity should handle it */
    /* position: absolute;
       top: 0;
       left: 0; */

    .logo-path-static {
      stroke: var(--logo-default-color);
      /* Fade in/out based on hover */
      opacity: ${(props) => (props.isHovered ? 0 : 1)};
      /* Add a slight delay on fade-in during unhover */
      transition: opacity 0.1s ease-in-out ${(props) => (props.isHovered ? '0s' : '1.2s')};
    }

    .logo-path-animated {
      stroke-dasharray: 642.528076171875;
      /* Always use hover color */
      stroke: var(--logo-hover-color);
      /* Animate offset based on hover */
      stroke-dashoffset: ${(props) =>
    props.isHovered ? 0 : 642.528076171875};
      /* Only transition the offset */
      transition: stroke-dashoffset 1.3s linear;
      /* Control visibility via offset, but ensure it's potentially visible */
      opacity: 1;
    }
  }
`;

// --- StyledNav, StyledLinks remain the same ---
const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--text-primary-color);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0 10px 0 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;
        color: var(--text-primary-color);
        text-decoration: none;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--accent-color);
          font-size: var(--fz-xxs);
          text-align: right;
        }
        &:hover,
        &:focus {
          color: var(--accent-color);
        }
      }
    }
  }

  .cv-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }

  .theme-toggle {
    margin-left: 20px;
  }
`;

// --- Nav Component remains the same (state, handlers, rendering) ---
interface NavProps {
  isHome: boolean;
}

const Nav: React.FC<NavProps> = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection({ initialDirection: 'down' });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // State and handlers for logo hover
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const handleLogoEnter = () => setIsLogoHovered(true);
  const handleLogoLeave = () => setIsLogoHovered(false);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { navLinks } = config;

  // Logo rendering using the wrapper and state
  const Logo = (
    <StyledLogoWrapper
      isHovered={isLogoHovered}
      onMouseEnter={handleLogoEnter}
      onMouseLeave={handleLogoLeave}
    >
      <a href="/" aria-label="home">
        {/* AnimatedLogo is purely structural */}
        <AnimatedLogo />
      </a>
    </StyledLogoWrapper>
  );

  return (
    <StyledHeader
      scrollDirection={scrollDirection}
      scrolledToTop={scrolledToTop}
    >
      <StyledNav>
        {Logo}
        <StyledLinks>
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <a href={url}>{name}</a>
                </li>
              ))}
          </ol>
          <div>
            <CVDownload className="cv-button" />
          </div>
          <div>
            <ThemeToggle className="theme-toggle" />
          </div>
        </StyledLinks>
        {/* Mobile Menu Placeholder */}
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
