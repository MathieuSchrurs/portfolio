import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import config from "@config";
import { useScrollDirection, usePrefersReducedMotion } from "../../hooks";
import AnimatedLogo from "../ui/AnimatedLogo";
import ThemeToggle from "../ui/ThemeToggle";
import CVDownload from "../ui/CVDownload";
import HamburgerButton from "../ui/HamburgerButton";

interface StyledHeaderProps {
  scrollDirection: "up" | "down" | null;
  scrolledToTop: boolean;
  prefersReducedMotion: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--header-bg-color);
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  ${(props) =>
    !props.prefersReducedMotion &&
    css`
      transition: var(--transition);
      @media (prefers-reduced-motion: no-preference) {
        ${props.scrollDirection === "up" &&
        !props.scrolledToTop &&
        css`
          height: var(--nav-scroll-height);
          transform: translateY(0px);
          background-color: var(--header-bg-color);
          box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}
        ${props.scrollDirection === "down" &&
        !props.scrolledToTop &&
        css`
          height: var(--nav-scroll-height);
          transform: translateY(calc(var(--nav-scroll-height) * -1));
          box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}
      }
    `}
`;

const StyledLogoWrapper = styled.div<{
  isHovered: boolean;
  prefersReducedMotion: boolean;
}>`
   display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    display: block;
    user-select: none;

    .logo-path-static {
      stroke: var(--logo-default-color);
      opacity: ${(props) => (props.isHovered ? 0 : 1)};
      transition: ${(props) =>
        props.prefersReducedMotion
          ? "none"
          : `opacity 0.1s ease-in-out ${props.isHovered ? "0s" : "1.2s"}`};
    }

    .logo-path-animated {
      stroke-dasharray: 642.528076171875;
      stroke: var(--logo-hover-color);
      stroke-dashoffset: ${(props) =>
        props.isHovered ? 0 : 642.528076171875};
      transition: ${(props) =>
        props.prefersReducedMotion ? "none" : "stroke-dashoffset 1.3s linear"};
    }
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--text-primary-color);
  font-family: var(--font-mono);
  height: 100%;
  position: relative;

  > * {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;


const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .theme-toggle {
    display: flex;
    align-items: center;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0 10px 0 0;
    list-style: none;

    li {
      margin: 0 5px;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;
        color: var(--text-primary-color);
        text-decoration: none;

        &:before {
          content: "0" counter(item) ".";
          margin-right: 5px;
          color: var(--accent-color);
          font-size: var(--fz-xxs);
        }
        &:hover,
        &:focus {
          color: var(--accent-color);
        }
      }
    }
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 65%;
  background-color: var(--bg-color);
  box-shadow: -2px 0 10px var(--shadow-color);
  transform: translateX(${(props) => (props.$open ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 100px 30px 40px; 
  overflow-y: auto;

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: right;

    li {
      margin: 20px 0;
      font-size: var(--fz-lg);

      a {
        color: var(--text-primary-color);
        text-decoration: none;
        &:hover {
          color: var(--accent-color);
        }
      }
    }
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: flex;
  }
`;


const Nav: React.FC = () => {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleScroll = () => setScrolledToTop(window.pageYOffset < 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { navLinks } = config;

  return (
    <StyledHeader
      scrollDirection={scrollDirection}
      scrolledToTop={scrolledToTop}
      prefersReducedMotion={prefersReducedMotion}
    >
      <StyledNav>
        <StyledLogoWrapper
          isHovered={isLogoHovered}
          prefersReducedMotion={prefersReducedMotion}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <a href="/#hero" aria-label="home">
            <AnimatedLogo />
          </a>
        </StyledLogoWrapper>

      <StyledLinks>
        <ol>
          {navLinks.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </ol>
        <CVDownload />
        <ThemeToggle className="theme-toggle" />
      </StyledLinks>


      <MobileControls>
        <ThemeToggle className="theme-toggle" />
        <HamburgerButton isOpen={isMenuOpen} toggle={toggleMenu} />
      </MobileControls>

      </StyledNav>

      <MobileMenu $open={isMenuOpen}>
        <ol>
          {navLinks.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url} onClick={() => setIsMenuOpen(false)}>
                {name}
              </a>
            </li>
          ))}
        </ol>
      </MobileMenu>
    </StyledHeader>
  );
};

export default Nav;