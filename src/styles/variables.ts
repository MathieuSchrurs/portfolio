import { css } from 'styled-components';

const variables = css`
  :root {
    /******************************
     * COLORS — DARK BASE
     ******************************/
    --dark-navy: #020c1b;
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #2f3b52;
    --navy-shadow: rgba(2, 12, 27, 0.7);

    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;

    --green: #64ffda;
    --green-tint: rgba(100, 255, 218, 0.1);

    /******************************
     * COLORS — LIGHT BASE
     ******************************/
    --light-theme-background: #f5f5f5;
    --light-theme-text-primary: #171717;
    --light-theme-text-secondary: #737373;
    --light-theme-card: #ffffff;
    --light-theme-border: #bfbfbf;
    --light-theme-accent: #8b5cf6;
    --light-theme-accent-active: #7c3aed;
    --light-theme-accent-text: #ffffff;
    --light-theme-header-bg: rgba(245, 245, 245, 0.85);
    --light-theme-shadow: rgba(100, 100, 100, 0.1);
    --light-theme-accent-tint: rgba(139, 92, 246, 0.1);

    /******************************
     * TYPOGRAPHY
     ******************************/
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text',
      -apple-system, system-ui, sans-serif;

    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
      monospace;

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
     * TIMELINE
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
    --bg-color: var(--navy);
    --text-primary-color: var(--lightest-slate);
    --text-secondary-color: var(--slate);

    --card-bg-color: var(--light-navy);
    --border-color: var(--lightest-navy);
    --header-bg-color: rgba(10, 25, 47, 0.85);
    --shadow-color: var(--navy-shadow);

    --accent-color: var(--green);
    --accent-active-color: var(--green);
    --accent-text-color: var(--dark-navy);
    --accent-tint-color: var(--green-tint);

    --logo-hover-color: #64ffda;
    --logo-default-color: #ffffff;

    --sun-color: #64ffda;
    --moon-color: #64ffda;

    --gradient-middle-color: #64ffda;
    --gradient-end-color: #005f43;

    --skill-item-hover-bg: var(--light-navy);
    --project-card-bg: var(--light-navy);
    --toggle-bg: #303030;
  }

  /* Light Mode */
  body.light {
    --bg-color: var(--light-theme-background);
    --text-primary-color: var(--light-theme-text-primary);
    --text-secondary-color: var(--light-theme-text-secondary);

    --card-bg-color: var(--light-theme-card);
    --border-color: var(--light-theme-border);
    --header-bg-color: var(--light-theme-header-bg);
    --shadow-color: var(--light-theme-shadow);

    --accent-color: var(--light-theme-accent);
    --accent-active-color: var(--light-theme-accent-active);
    --accent-text-color: var(--light-theme-accent-text);
    --accent-tint-color: var(--light-theme-accent-tint);

    --logo-hover-color: #8b5cf6;
    --logo-default-color: #000000;

    --sun-color: #fbbf24;     /* golden sun */
    --moon-color: #262626;    /* deep grey */

    --gradient-middle-color: #a78bfa;
    --gradient-end-color: var(--slate);

    --skill-item-hover-bg: var(--toggle-background-light);
    --project-card-bg: var(--light-theme-card);
    --toggle-bg: #ebebeb;
  }
`;

export default variables;
