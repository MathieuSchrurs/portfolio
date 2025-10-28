import { css } from 'styled-components';

const variables = css`
  :root {
    /******************************
     * TYPOGRAPHY
     ******************************/
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text',
      -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /******************************
     * SIZING + SPACING
     ******************************/
    --border-radius: 4px;

    --nav-height: 100px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;

    --section-padding-desktop: 100px;
    --section-padding-tablet: 80px;
    --section-padding-mobile: 60px;

    /******************************
     * ANIMATION
     ******************************/
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    /******************************
     * MOBILE NAV
     ******************************/
    --nav-mobile-bg: rgba(10, 10, 25, 0.9);
    --hamburger-width: 30px;

    /******************************
     * TIMELINE DEFAULTS
     ******************************/
    --timeline-mid-w: 140px;
    --timeline-trunk-w: 1px;
    --timeline-node-size: 12px;
    --timeline-connector-w: 1px;
    --timeline-row-min: 120px;
    --timeline-card-max: 450px;
    --timeline-row-overlap: 80px;
  }

  /******************************
   * RESPONSIVE OVERRIDES
   ******************************/
  @media (max-width: 1200px) {
    :root {
      --timeline-mid-w: 100px;
      --timeline-row-overlap: 60px;
    }
  }

  @media (max-width: 900px) {
    :root {
      --timeline-mid-w: 0px;
      --timeline-row-overlap: 0px;
      --timeline-row-min: auto;
      --timeline-trunk-w: 1px;
    }
  }

  /******************************
   * THEMES
   ******************************/

  /* Dark Mode */
  body.dark {
    --bg-color: #0a192f; 
    --text-primary-color: #ccd6f6;  
    --text-secondary-color: #8892b0; 

    --card-bg-color: #112240;
    --border-color: #2f3b52;
    --header-bg-color: rgba(10,25,47,0.85);
    --shadow-color: rgba(2, 12, 27, 0.7);

    --accent-color: #64ffda;
    --accent-active-color: #64ffda;
    --accent-text-color: #020c1b;
    --accent-tint-color: rgba(100, 255, 218, 0.1);

    /* selection & scrollbars */
    --selection-bg-color: #2f3b52;
    --selection-text-color: #ccd6f6;
    --scrollbar-thumb-color: #495670;
    --scrollbar-track-color: var(--bg-color);

    /* inline code */
    --code-inline-bg-color: #112240;
    --code-inline-text-color: #ccd6f6;

    /* icons / theming */
    --logo-hover-color: #64ffda;
    --logo-default-color: #ffffff;
    --sun-color: #64ffda;
    --moon-color: #64ffda;

    /* gradients (used elsewhere) */
    --gradient-middle-color: #64ffda;
    --gradient-end-color: #005f43;
  }

  /* Light Mode */
  body.light {
    --bg-color: #f5f5f5;
    --text-primary-color: #171717;
    --text-secondary-color: #737373;

    --card-bg-color: #ffffff;
    --border-color: #bfbfbf;
    --header-bg-color: rgba(245,245,245,0.85);
    --shadow-color: rgba(100,100,100,0.1);

    --accent-color: #8b5cf6;
    --accent-active-color: #7c3aed;
    --accent-text-color: #ffffff;
    --accent-tint-color: rgba(139, 92, 246, 0.1);

    /* selection & scrollbars */
    --selection-bg-color: rgba(139, 92, 246, 0.18);
    --selection-text-color: var(--text-primary-color);
    --scrollbar-thumb-color: #bfbfbf;
    --scrollbar-track-color: var(--bg-color);

    /* inline code */
    --code-inline-bg-color: #f0f0f0;
    --code-inline-text-color: var(--text-primary-color);

    /* icons / theming */
    --logo-hover-color: #8b5cf6;
    --logo-default-color: #000000;
    --sun-color: #fbbf24;
    --moon-color: #262626;

    --gradient-middle-color: #a78bfa;
    --gradient-end-color: #737373;
  }
`;

export default variables;
