import { css } from 'styled-components';

const variables = css`
  :root {
    /* Dark Theme Colours */
    --dark-navy: #020c1b;
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #2f3b52; /* darkened for better border & line contrast */
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --green: #64ffda;
    --green-tint: rgba(100, 255, 218, 0.1);

    /* Light Theme Colours */
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

    /* Logo Colors */
    --logo-color-default-light: #000000;
    --logo-color-default-dark: #ffffff;
    --logo-color-hover-light: #8b5cf6;
    --logo-color-hover-dark: #64ffda;

    /* Font Stacks */
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text',
      -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* Font Sizes */
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /* Other Variables */
    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --hamburger-width: 30px;

    /* Layout & Section Spacing */
    --section-padding-desktop: 100px;
    --section-padding-tablet: 80px;
    --section-padding-mobile: 60px;

    /* Navigation & Global UI */
    --nav-mobile-bg: rgba(10, 10, 25, 0.9);


    /* Theme Toggle Variables */
    --toggle-background-dark: #303030;
    --toggle-background-light: #ebebeb;
    --sun-color: #ffcc00;
    --moon-color: #ade8f0;
  }

  /* Dark Mode Variables */
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
    --toggle-bg: var(--toggle-background-dark);
    --logo-hover-color: var(--logo-color-hover-dark);
    --logo-default-color: var(--logo-color-default-dark);
    --gradient-middle-color: #64ffda;
    --gradient-end-color: #005F43;
    --skill-item-hover-bg: var(--light-navy);
    --project-card-bg: var(--light-navy);
  }

  /* Light Mode Variables */
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
    --toggle-bg: var(--toggle-background-light);
    --logo-hover-color: var(--logo-color-hover-light);
    --logo-default-color: var(--logo-color-default-light);
    --gradient-middle-color: #a78bfa;
    --gradient-end-color: var(--slate);
    --skill-item-hover-bg: var(--toggle-background-light);
    --project-card-bg: var(--light-theme-card);
  }
`;

export default variables;
