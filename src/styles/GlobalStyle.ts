import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import fonts from './fonts';
// import TransitionStyles from './TransitionStyles'; // Keep commented for now
// import PrismStyles from './PrismStyles'; // Keep commented for now

const GlobalStyle = createGlobalStyle`
  ${variables}; // Apply CSS variables
  ${fonts}; // Apply @font-face rules

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--lightest-navy); // Or use theme-aware variable
    color: var(--lightest-slate); // Or use theme-aware variable
  }

  /* Basic focus styles - Keep */
  :focus {
    outline: 2px dashed var(--accent-color);
    outline-offset: 3px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }
  :focus-visible {
    outline: 2px dashed var(--accent-color);
    outline-offset: 3px;
  }

  /* Scrollbar Styles - Keep */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) var(--navy); // Adjust for theme if needed
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    background: var(--bg-color);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--dark-slate);
    border: 3px solid var(--bg-color);
    border-radius: 10px;
  }


  body {
    margin: 0; /* Basic reset */
    padding: 0; /* Basic reset */
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg-color);
    color: var(--text-secondary-color); /* Default text color */
    font-family: var(--font-sans); /* Use Calibre */
    font-size: var(--fz-xl); /* Use target's base size */
    line-height: 1.3; /* Use target's base line-height */
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden { overflow: hidden; }
    &.blur {
      overflow: hidden;
      #root > #content > * { // Target content children more specifically
         filter: blur(5px) brightness(0.7);
         transition: var(--transition);
         pointer-events: none;
         user-select: none;
      }
      header { // Ensure header is not blurred
         filter: none;
         pointer-events: auto;
         user-select: auto;
      }
    }
  }

  #root {
     min-height: 100vh;
     display: grid;
     grid-template-rows: 1fr auto;
     grid-template-columns: 100%;
  }

  /* === ADDED LAYOUT RULES === */
  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px; // Default padding for non-index pages (like blog posts later)

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    /* Class for the main index page content area */
    &.fillHeight {
      padding: 0 150px; // No top/bottom padding

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 100px 0; // Vertical padding for sections
    max-width: 1000px; // Default max-width for content sections
    counter-increment: section; // Increment section counter

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }
  /* === END ADDED LAYOUT RULES === */


  /* Basic heading styles */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--text-primary-color);
    line-height: 1.1;
  }

  /* Specific heading styles from target */
  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  /* Numbered heading style from target */
  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    color: var(--text-primary-color);
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section; // Use the section counter
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--accent-color);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px; // Adjust vertical alignment
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--border-color); // Use theme border color

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%; // Take remaining width
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }


  /* Basic image/svg */
  img, svg {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    height: 100%;
    fill: currentColor;
    &.feather { fill: none; }
  }

  /* Basic link styles */
  a {
    display: inline-block; /* Added */
    text-decoration: none;
    text-decoration-skip-ink: auto; /* Added */
    color: inherit; /* Changed from accent-color */
    position: relative; /* Added */
    transition: var(--transition);
    &:hover,
    &:focus {
      color: var(--accent-color); /* Changed from accent-active-color */
    }
    &.inline-link { /* Added */
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  /* Basic button reset */
  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    font-family: inherit;
    font-size: inherit;
    background-color: transparent;
    color: inherit;
    padding: 0;
    &:focus {
       outline: none;
    }
    &:focus-visible { /* Added */
       outline: 2px dashed var(--accent-color);
       outline-offset: 3px;
    }
  }

  /* Input/Textarea styles */
  input, textarea {
    border-radius: var(--border-radius);
    outline: 0;
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    background-color: var(--card-bg-color);
    color: var(--text-primary-color);
    border: 1px solid var(--border-color);
    padding: 0.75rem 1rem;

    &:focus {
      outline: 0;
      border-color: var(--accent-color);
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  /* Basic list reset */
  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul.fancy-list { /* Added */
     ${({ theme }) => theme.mixins.fancyList};
  }

  /* Basic paragraph styles */
  p {
    margin: 0 0 15px 0; /* Changed from 1rem */
    line-height: 1.5; /* Changed from 1.6 */
    &:last-child,
    &:last-of-type {
      margin-bottom: 0;
    }
    & > a { /* Added */
      ${({ theme }) => theme.mixins.inlineLink};
    }
    & > code { /* Added */
      background-color: var(--light-navy);
      color: var(--lightest-slate);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  /* Blockquote */
  blockquote {
    border-left: 3px solid var(--accent-color);
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: var(--text-secondary-color);
  }

  /* HR */
  hr {
    background-color: var(--border-color);
    height: 1px;
    border: 0;
    margin: 2rem 0;
  }

  /* Code */
  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }
  pre code { /* Added */
    background-color: transparent;
    padding: 0;
  }


  /* Keep Skip Link */
  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:focus {
      background-color: var(--accent-color);
      color: var(--accent-text-color);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      padding: 1rem 1.5rem;
      overflow: auto;
      z-index: 100;
      text-decoration: none;
      transform: none;
      box-shadow: none;
    }
  }

  /* Reset section counter for main content area */
  main {
    counter-reset: section;
  }

  /*
   * Logo styles are now handled locally within Nav.tsx
   * using StyledLogoWrapper to avoid global conflicts
   * and manage state via React props.
   */

  // {TransitionStyles};
  // {PrismStyles};
`;

export default GlobalStyle;
