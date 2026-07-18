import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import config from "@config";
import type { NavLink } from "../../types";
import { useScrollDirection, usePrefersReducedMotion } from "../../hooks";
import AnimatedLogo from "../ui/AnimatedLogo";
import ThemeToggle from "../ui/ThemeToggle";
import CommandLink from "../ui/CommandLink";
import HamburgerButton from "../ui/HamburgerButton";

interface StyledHeaderProps {
  $scrollDirection: "up" | "down" | null;
  $scrolledToTop: boolean;
  $prefersReducedMotion: boolean;
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
    !props.$prefersReducedMotion &&
    css`
      transition: var(--transition);
      @media (prefers-reduced-motion: no-preference) {
        ${props.$scrollDirection === "up" &&
        !props.$scrolledToTop &&
        css`
          height: var(--nav-scroll-height);
          transform: translateY(0px);
          background-color: var(--header-bg-color);
          box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}
        ${props.$scrollDirection === "down" &&
        !props.$scrolledToTop &&
        css`
          height: var(--nav-scroll-height);
          transform: translateY(calc(var(--nav-scroll-height) * -1));
          box-shadow: 0 10px 30px -10px var(--shadow-color);
        `}
      }
    `}
`;

const StyledLogoWrapper = styled.div<{
  $isHovered: boolean;
  $prefersReducedMotion: boolean;
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
      opacity: ${(props) => (props.$isHovered ? 0 : 1)};
      transition: ${(props) =>
        props.$prefersReducedMotion
          ? "none"
          : `opacity 0.1s ease-in-out ${props.$isHovered ? "0s" : "1.2s"}`};
    }

    .logo-path-animated {
      stroke-dasharray: 642.528076171875;
      stroke: var(--logo-hover-color);
      stroke-dashoffset: ${(props) =>
        props.$isHovered ? 0 : 642.528076171875};
      transition: ${(props) =>
        props.$prefersReducedMotion ? "none" : "stroke-dashoffset 1.3s linear"};
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


/* Every item spaces itself with the same symmetric 10px side padding the
   nav links already carry, so each neighbour pair (link/link, link/cv,
   cv/toggle) reads as the same 20px visual distance — no flex gap fighting
   the padding. The old pill CV button carried its own chunky padding and
   needed compensating ol/li margins; those went with it. */
const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  .theme-toggle {
    display: flex;
    align-items: center;
    margin-left: 12px;
  }

  /* CV as a bracketed command, same affordance as the Hero actions, sized
     and padded to sit in the links' spacing rhythm. The 1px lift is optical:
     mono brackets descend below the baseline, so a box-centred [ cv ] reads
     slightly lower than the descender-less link labels beside it. */
  .cv-command {
    font-size: var(--fz-xs);
    padding: 10px;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0;
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

/* The header shrinks from --nav-height to --nav-scroll-height once the page
   is scrolled, so the menu and its backdrop take the current header height
   ($compact) and transition with the same easing — otherwise a gap opens
   between the bar and the panel whenever the menu is used mid-page. */
const MobileMenuOverlay = styled.div<{ $open: boolean; $compact: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  top: ${({ $compact }) =>
    $compact ? 'var(--nav-scroll-height)' : 'var(--nav-height)'};
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 14;
`;

const MobileMenu = styled.aside<{ $open: boolean; $compact: boolean }>`
  position: fixed;
  top: ${({ $compact }) =>
    $compact ? 'var(--nav-scroll-height)' : 'var(--nav-height)'};
  right: 0;
  height: ${({ $compact }) =>
    $compact
      ? 'calc(100vh - var(--nav-scroll-height))'
      : 'calc(100vh - var(--nav-height))'};
  width: min(84vw, 360px);
  background-color: var(--bg-color);
  border-left: 1px solid var(--border-color);
  box-shadow: -10px 0 40px var(--shadow-color);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition:
    transform 0.35s cubic-bezier(0.645, 0.045, 0.355, 1),
    top 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
    height 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 15;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem;
  font-family: var(--font-mono);
  overflow-y: auto;

  /* Comment-style label, same idiom as the section headings. */
  .menu-label {
    font-size: var(--fz-sm);
    text-transform: lowercase;
    color: var(--text-primary-color);
    margin-bottom: 1.5rem;

    .comment {
      color: var(--accent-color);
      letter-spacing: -0.09em;
      margin-right: 0.5em;
    }
  }

  ol {
    list-style: none;
    padding: 0;
    /* margin-bottom auto pushes the actions and social row to the bottom. */
    margin: 0 0 auto;
    width: 100%;

    li a {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 0.9rem 0;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-secondary-color);
      text-decoration: none;
      transition: var(--transition);

      .glyph {
        color: var(--accent-color);
        font-size: var(--fz-sm);
        transition: transform 0.25s var(--easing);
      }

      .link-name {
        flex: 1;
        font-size: var(--fz-lg);
        text-transform: lowercase;
        color: var(--text-primary-color);
        transition: var(--transition);
      }

      .index {
        font-size: var(--fz-xs);
        font-variant-numeric: tabular-nums;
        color: var(--text-secondary-color);
      }

      &:hover,
      &:focus {
        .link-name {
          color: var(--accent-color);
        }
        .glyph {
          transform: translateX(3px);
        }
      }
    }

    li:first-child a {
      border-top: 1px solid var(--border-color);
    }
  }

  /* Placement only — the command styling itself lives in CommandLink. */
  .cv-command {
    margin-top: 2rem;
    font-size: var(--fz-md);
    align-self: flex-start;
  }

  .menu-social {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border-color);
    font-size: var(--fz-xs);
    color: var(--text-secondary-color);

    a {
      color: inherit;
      text-decoration: none;
      &:hover,
      &:focus {
        color: var(--accent-color);
      }
    }

    .sep {
      opacity: 0.45;
      user-select: none;
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


/* Signature logo with its own hover state driving the stroke-draw reveal. */
const NavLogo: React.FC<{ prefersReducedMotion: boolean }> = ({
  prefersReducedMotion,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledLogoWrapper
      $isHovered={isHovered}
      $prefersReducedMotion={prefersReducedMotion}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="/#hero" aria-label="home">
        <AnimatedLogo />
      </a>
    </StyledLogoWrapper>
  );
};

/* Desktop-only inline nav: numbered links, CV button, theme toggle. */
const DesktopNavLinks: React.FC<{ navLinks: NavLink[] }> = ({ navLinks }) => (
  <StyledLinks>
    <ol>
      {navLinks.map(({ url, name }) => (
        <li key={url}>
          <a href={url}>{name}</a>
        </li>
      ))}
    </ol>
    <CommandLink
      className="cv-command"
      href="/cv-mathieu-schrurs.pdf"
      download="Mathieu_Schrurs_CV.pdf"
    >
      cv
    </CommandLink>
    <ThemeToggle className="theme-toggle" />
  </StyledLinks>
);

/* Slide-in mobile menu plus its click-catching backdrop. Mirrors the site's
   terminal language: a `//` comment label, command-palette-style rows (accent
   glyph + lowercase label + right-aligned section index), a bracketed CV
   command, and a mono social/email row (the desktop-only status bar's links,
   given back to mobile). */
const MobileNavMenu: React.FC<{
  open: boolean;
  compact: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}> = ({ open, compact, navLinks, onClose }) => (
  <>
    <MobileMenuOverlay $open={open} $compact={compact} onClick={onClose} />
    {/* inert keeps the off-screen menu's links out of the tab order — the
        closed menu is only translated off-canvas, not display:none */}
    <MobileMenu $open={open} $compact={compact} inert={!open}>
      <div className="menu-label">
        <span className="comment" aria-hidden="true">//</span>
        navigation
      </div>

      <ol>
        {navLinks.map(({ url, name }, i) => (
          <li key={url}>
            <a href={url} onClick={onClose}>
              <span className="glyph" aria-hidden="true">→</span>
              <span className="link-name">{name}</span>
              <span className="index" aria-hidden="true">{`0${i + 1}`}</span>
            </a>
          </li>
        ))}
      </ol>

      <CommandLink
        className="cv-command"
        href="/cv-mathieu-schrurs.pdf"
        download="Mathieu_Schrurs_CV.pdf"
        onClick={onClose}
      >
        download cv
      </CommandLink>

      <div className="menu-social">
        {config.socialMedia.map((social, i) => (
          <span key={social.url} style={{ display: 'flex', gap: '0.5rem' }}>
            {i > 0 && <span className="sep">·</span>}
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              {social.name.toLowerCase()}
            </a>
          </span>
        ))}
        <span className="sep">·</span>
        <a href={`mailto:${config.email}`}>mail</a>
      </div>
    </MobileMenu>
  </>
);

const Nav: React.FC = () => {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleScroll = () => setScrolledToTop(window.scrollY < 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('blur', isMenuOpen);
  }, [isMenuOpen]);

  const { navLinks } = config;

  return (
    <StyledHeader
      $scrollDirection={scrollDirection}
      $scrolledToTop={scrolledToTop}
      $prefersReducedMotion={prefersReducedMotion}
    >
      <StyledNav>
        <NavLogo prefersReducedMotion={prefersReducedMotion} />
        <DesktopNavLinks navLinks={navLinks} />
        <MobileControls>
          <ThemeToggle className="theme-toggle" />
          <HamburgerButton isOpen={isMenuOpen} toggle={toggleMenu} />
        </MobileControls>
      </StyledNav>

      <MobileNavMenu
        open={isMenuOpen}
        compact={!scrolledToTop}
        navLinks={navLinks}
        onClose={() => setIsMenuOpen(false)}
      />
    </StyledHeader>
  );
};

export default Nav;