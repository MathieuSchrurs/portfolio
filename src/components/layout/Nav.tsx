import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import config from '@config';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import AnimatedLogo from '../ui/AnimatedLogo'; // Your animated logo
import ThemeToggle from '../ui/ThemeToggle'; // Your theme toggle
import CVDownload from '../ui/CVDownload'; // Your CV download button
// Import Menu component later if implementing mobile nav
// import Menu from './Menu';
// Import CSSTransition/TransitionGroup later for animations
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { loaderDelay, navDelay } from '@utils'; // Import delays later

interface StyledHeaderProps {
    scrollDirection: 'up' | 'down' | null;
    scrolledToTop: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11; // Higher than sidebars
  padding: 0px 50px; // Target padding
  width: 100%;
  height: var(--nav-height);
  background-color: var(--header-bg-color); // Use theme variable
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

  /* Apply styles based on scroll direction */
  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
        props.scrollDirection === 'up' &&
        !props.scrolledToTop &&
        css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: var(--header-bg-color);
        box-shadow: 0 10px 30px -10px var(--shadow-color);
      `};

    ${(props) =>
        props.scrollDirection === 'down' &&
        !props.scrolledToTop &&
        css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--shadow-color);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--text-primary-color); // Use primary text color
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12; // Above header background blur

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    a {
      display: block; // Ensure link takes up space
      width: 55px; // Adjust size as needed for your logo
      height: 55px;
      /* Target used a hex container, we use your AnimatedLogo directly */
      &:hover,
      &:focus {
        /* Keep your existing logo hover effect (likely in AnimatedLogo.css) */
        outline: none;
      }
      /* Your AnimatedLogo component will be placed here */
      svg {
        fill: none;
        color: var(--accent-color); // Set SVG color
        user-select: none;
        width: 100%;
        height: 100%;
        transition: var(--transition); // Add transition if needed
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // Hide on mobile, implement Menu component later
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0 10px 0 0; // Add some margin to separate from buttons
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px; // Clickable area
        color: var(--text-primary-color); // Use primary text color
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

  /* Style the CVDownload component like the target's resume button */
  .cv-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }

  /* Adjust ThemeToggle margin if needed */
  .theme-toggle {
    margin-left: 20px;
  }
`;

interface NavProps {
    isHome: boolean;
}

const Nav: React.FC<NavProps> = ({ isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome); // For animations later
    const scrollDirection = useScrollDirection('down');
    const [scrolledToTop, setScrolledToTop] = useState(true);
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50);
    };

    useEffect(() => {
        // Mount animation logic (implement later if needed)
        // const timeout = setTimeout(() => {
        //   setIsMounted(true);
        // }, 100);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call on mount to set initial state

        return () => {
            // clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this runs once on mount

    // Delays for animations (implement later)
    // const timeout = isHome ? loaderDelay : 0;
    // const fadeClass = isHome ? 'fade' : '';
    // const fadeDownClass = isHome ? 'fadedown' : '';

    const { navLinks } = config;

    const Logo = (
        <div className="logo">
            {/* Use a regular link for now, can be Gatsby Link if using Gatsby later */}
            <a href="/" aria-label="home">
                <AnimatedLogo /> {/* Your animated logo component */}
            </a>
        </div>
    );

    return (
        <StyledHeader
            scrollDirection={scrollDirection}
            scrolledToTop={scrolledToTop}
        >
            <StyledNav>
                {/* Add TransitionGroup later for animations */}
                {Logo}

                <StyledLinks>
                    <ol>
                        {/* Add TransitionGroup later for animations */}
                        {navLinks &&
                            navLinks.map(({ url, name }, i) => (
                                <li key={i}>
                                    {/* Use regular links for now */}
                                    <a href={url}>{name}</a>
                                </li>
                            ))}
                    </ol>

                    {/* Add TransitionGroup later for animations */}
                    <div>
                        <CVDownload className="cv-button" /> {/* Apply button styles */}
                    </div>
                    <div>
                        <ThemeToggle className="theme-toggle" /> {/* Your theme toggle */}
                    </div>
                </StyledLinks>

                {/* Mobile Menu (Implement later) */}
                {/* <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu />
            </CSSTransition>
          )}
        </TransitionGroup> */}
            </StyledNav>
        </StyledHeader>
    );
};

export default Nav;
