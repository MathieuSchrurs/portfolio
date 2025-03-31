import { css } from 'styled-components';

const variables = css`
  :root {
    // Dark Theme (matches target's default)
    --dark-navy: #020c1b; // Darkest background
    --navy: #0a192f; // Main background
    --light-navy: #112240; // Lighter background elements (cards)
    --lightest-navy: #233554; // Lightest background elements (hover)
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670; // Darker text/borders
    --slate: #8892b0; // Default text (secondary)
    --light-slate: #a8b2d1; // Lighter text (icons, lines)
    --lightest-slate: #ccd6f6; // Headings/Primary text
    --white: #e6f1ff; // Pure white (rarely used)
    --green: #64ffda; // Accent color
    --green-tint: rgba(100, 255, 218, 0.1); // Accent hover/background
    // --pink: #f57dff; // Optional accent
    // --blue: #57cbff; // Optional accent

    // Add your light theme colors here, mapping them to the same variable names
    // We'll control switching via a class/attribute later in GlobalStyle
    --light-theme-background: #f5f5f5; // Example light background
    --light-theme-text-primary: #171717; // Example light text
    --light-theme-text-secondary: #737373; // Example light secondary text
    --light-theme-card: #ffffff;
    --light-theme-border: #d4d4d4;
    --light-theme-accent: #8b5cf6; // Example light accent (purple)
    --light-theme-accent-active: #7c3aed;
    --light-theme-accent-text: #ffffff;
    --light-theme-header-bg: rgba(245, 245, 245, 0.85);
    --light-theme-shadow: rgba(100, 100, 100, 0.1);

    // Font Stacks - UPDATED
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text',
      -apple-system, system-ui, sans-serif; // Calibre first, Inter as fallback
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace; // SF Mono first

    // Font Sizes
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    // Other Variables
    --border-radius: 4px;
    --nav-height: 100px; // Initial nav height
    --nav-scroll-height: 70px; // Nav height when scrolled
    --tab-height: 42px;
    --tab-width: 120px; // Example for potential tabbed components
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px; // If you add a mobile menu later

    // Add specific theme toggle variables if needed, or derive them
    --toggle-background-dark: #303030;
    --toggle-background-light: #ebebeb;
    --sun-color: #ffcc00;
    --moon-color: #ade8f0;
  }

  // Apply theme-specific variables based on body class
  body.dark {
    --bg-color: var(--navy);
    --text-primary-color: var(--lightest-slate);
    --text-secondary-color: var(--slate);
    --card-bg-color: var(--light-navy);
    --border-color: var(--lightest-navy);
    --header-bg-color: rgba(10, 25, 47, 0.85);
    --shadow-color: var(--navy-shadow);
    --accent-color: var(--green);
    --accent-active-color: var(--green); // Green doesn't have a darker active state here
    --accent-text-color: var(--dark-navy); // Text on green buttons
    --accent-tint-color: var(--green-tint);
    --toggle-bg: var(--toggle-background-dark);
  }

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
    --accent-tint-color: rgba(
      139,
      92,
      246,
      0.1
    ); // Example tint for light purple
    --toggle-bg: var(--toggle-background-light);
  }
`;

export default variables;
