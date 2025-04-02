// src/components/layout/Nav.tsx

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import config from '@config'; // Assuming '@config' resolves to your config file
import { useScrollDirection, usePrefersReducedMotion } from '../../hooks'; // Assuming '@hooks' resolves correctly
import AnimatedLogo from '../ui/AnimatedLogo'; // Adjust path if necessary
import ThemeToggle from '../ui/ThemeToggle'; // Adjust path if necessary
// Import the refactored CVDownload component (which now uses StyledButtonLink)
import CVDownload from '../ui/CVDownload'; // Adjust path if necessary

// Interface for the styled header props (used for scroll effects)
interface StyledHeaderProps {
  scrollDirection: 'up' | 'down' | null;
  scrolledToTop: boolean;
}

// Styled component for the main header element
const StyledHeader = styled.header<StyledHeaderProps>`
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

  /* Scroll effects */
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

// Styled component for the logo wrapper (handles hover animation state)
const StyledLogoWrapper = styled.div<{ isHovered: boolean }>`
  display: block;
  width: 55px;
  height: 55px;
  cursor: pointer;
  position: relative;

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

    /* Styles for the logo paths, controlled by isHovered prop */
    .logo-path-static {
      stroke: var(--logo-default-color);
      opacity: ${(props) => (props.isHovered ? 0 : 1)};
      transition: opacity 0.1s ease-in-out ${(props) => (props.isHovered ? '0s' : '1.2s')};
    }

    .logo-path-animated {
      stroke-dasharray: 642.528076171875;
      stroke: var(--logo-hover-color);
      stroke-dashoffset: ${(props) =>
    props.isHovered ? 0 : 642.528076171875};
      transition: stroke-dashoffset 1.3s linear;
      opacity: 1;
    }
  }
`;

// Styled component for the <nav> element itself
const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--text-primary-color);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;
`;

// Styled component for the links section (nav items, buttons)
const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Hide links on smaller screens for mobile menu */
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0 10px 0 0; /* Space between links and buttons */
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

        /* Numbered prefix for nav links */
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

  /* --- Removed .cv-button CSS definition --- */
  /* Styling is now handled by the StyledButtonLink component used within CVDownload */

  /* Styling for the theme toggle wrapper if needed */
  .theme-toggle {
    margin-left: 20px; /* Space before theme toggle */
  }
`;

// Props for the Nav component
interface NavProps {
  isHome: boolean; // Passed from Layout to potentially adjust behavior/animations
}

// The Nav component
const Nav: React.FC<NavProps> = ({ isHome }) => {
  // State for animations/mounting (can be expanded later)
  const [isMounted, setIsMounted] = useState(!isHome);
  // Custom hook to detect scroll direction
  const scrollDirection = useScrollDirection({ initialDirection: 'down' });
  // State to track if scrolled to the very top
  const [scrolledToTop, setScrolledToTop] = useState(true);
  // Custom hook to check user's preference for reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // State for logo hover effect
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const handleLogoEnter = () => setIsLogoHovered(true);
  const handleLogoLeave = () => setIsLogoHovered(false);

  // Effect to handle scroll events and update scrolledToTop state
  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get navigation links from the config file
  const { navLinks } = config;

  // Memoize or define the Logo component part
  const Logo = (
    <StyledLogoWrapper
      isHovered={isLogoHovered}
      onMouseEnter={handleLogoEnter}
      onMouseLeave={handleLogoLeave}
    >
      <a href="/#hero" aria-label="home">
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
        {Logo} {/* Render the logo */}

        <StyledLinks>
          {/* Render the numbered navigation links */}
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <a href={url}>{name}</a>
                </li>
              ))}
          </ol>

          {/* --- START: Updated Button Section --- */}
          {/* Render the CVDownload button */}
          {/* Add margin using a wrapper div or pass a className if needed */}
          <div style={{ marginLeft: '5px' }}> {/* Add spacing before CV button */}
            <CVDownload /> {/* No className needed for styling */}
          </div>

          {/* Render the ThemeToggle button */}
          <div>
            <ThemeToggle className="theme-toggle" />
          </div>
          {/* --- END: Updated Button Section --- */}

        </StyledLinks>

        {/* Placeholder for potential Mobile Menu component */}
        {/* <MobileMenu /> */}
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
