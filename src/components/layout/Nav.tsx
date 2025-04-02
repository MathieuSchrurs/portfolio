import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import config from '@config';
import { useScrollDirection, usePrefersReducedMotion } from '../../hooks';
import AnimatedLogo from '../ui/AnimatedLogo';
import ThemeToggle from '../ui/ThemeToggle';
import CVDownload from '../ui/CVDownload';

interface StyledHeaderProps {
  scrollDirection: 'up' | 'down' | null;
  scrolledToTop: boolean;
  prefersReducedMotion: boolean;
}

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
  transition: background-color 0.3s ease;

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  ${(props) => !props.prefersReducedMotion && css`
      /* Apply motion transitions only if not reduced */
      transition: var(--transition); /* Apply full transition */
      @media (prefers-reduced-motion: no-preference) {
        ${props.scrollDirection === 'up' && !props.scrolledToTop && css`
            height: var(--nav-scroll-height);
            transform: translateY(0px);
            background-color: var(--header-bg-color);
            box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}

        ${props.scrollDirection === 'down' && !props.scrolledToTop && css`
            height: var(--nav-scroll-height);
            transform: translateY(calc(var(--nav-scroll-height) * -1));
            box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}
      }
  `}
`;

const StyledLogoWrapper = styled.div<{ isHovered: boolean; prefersReducedMotion: boolean }>`
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

    .logo-path-static {
      stroke: var(--logo-default-color);
      opacity: ${(props) => (props.isHovered ? 0 : 1)};
      /* Conditional transition */
      transition: ${(props) => props.prefersReducedMotion ? 'none' : `opacity 0.1s ease-in-out ${props.isHovered ? '0s' : '1.2s'}`};
    }

    .logo-path-animated {
      stroke-dasharray: 642.528076171875;
      stroke: var(--logo-hover-color);
      stroke-dashoffset: ${(props) =>
    props.isHovered ? 0 : 642.528076171875};
      /* Conditional transition */
      transition: ${(props) => props.prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.3s linear'};
      opacity: 1;
    }
  }
`;

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
        /* Transitions handled globally or on hover */

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

  .theme-toggle {
    margin-left: 20px;
  }
`;

interface NavProps {
  isHome: boolean;
}

const Nav: React.FC<NavProps> = ({ isHome }) => {
  const scrollDirection = useScrollDirection({ initialDirection: 'down' });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion(); // Call the hook

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

  const Logo = (
    <StyledLogoWrapper
      isHovered={isLogoHovered}
      prefersReducedMotion={prefersReducedMotion} // Pass prop
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
      prefersReducedMotion={prefersReducedMotion} // Pass prop
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
          <div style={{ marginLeft: '5px' }}>
            <CVDownload />
          </div>
          <div>
            <ThemeToggle className="theme-toggle" />
          </div>
        </StyledLinks>
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
