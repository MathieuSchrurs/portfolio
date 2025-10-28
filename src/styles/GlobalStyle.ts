import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  ${variables};
  ${fonts};

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
    background-color: var(--selection-bg-color);
    color: var(--selection-text-color);
  }

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

  html {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    background: var(--scrollbar-track-color);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
    border: 3px solid var(--bg-color);
    border-radius: 10px;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg-color);
    color: var(--text-secondary-color);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.3;
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden { overflow: hidden; }
    &.blur {
      overflow: hidden;
      #root > #content > * {
         filter: blur(5px) brightness(0.7);
         transition: var(--transition);
         pointer-events: none;
         user-select: none;
      }
      header {
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

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

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
    max-width: 1000px;
    counter-increment: section;
    padding: var(--section-padding-desktop) 0;

    @media (max-width: 768px) {
      padding: var(--section-padding-tablet) 0;
    }

    @media (max-width: 480px) {
      padding: var(--section-padding-mobile) 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--text-primary-color);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

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
      counter-increment: section;
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
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--border-color);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

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

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:focus {
      color: var(--accent-color);
    }
    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

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
    &:focus-visible {
       outline: 2px dashed var(--accent-color);
       outline-offset: 3px;
    }
  }

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

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul.fancy-list {
     ${({ theme }) => theme.mixins.fancyList};
  }

  p {
    margin: 0 0 15px 0;
    line-height: 1.5;
    &:last-child,
    &:last-of-type {
      margin-bottom: 0;
    }
    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
    & > code {
      background-color: var(--code-inline-bg-color);
      color: var(--code-inline-text-color);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  blockquote {
    border-left: 3px solid var(--accent-color);
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: var(--text-secondary-color);
  }

  hr {
    background-color: var(--border-color);
    height: 1px;
    border: 0;
    margin: 2rem 0;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }
  pre code {
    background-color: transparent;
    padding: 0;
  }

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

  main {
    counter-reset: section;
  }
`;

export default GlobalStyle;
