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
    --hamburger-width: 30px;
  }

  /******************************
   * THEMES
   ******************************/

  /* Dark Mode */
  body.dark {
    --bg-color: #111111;
    --text-primary-color: #ededed;
    --text-secondary-color: #909090;

    --card-bg-color: #1a1a1a;
    --border-color: #2e2e2e;
    --header-bg-color: rgba(17, 17, 17, 0.85);
    --shadow-color: rgba(0, 0, 0, 0.5);

    --accent-color: #a78bfa;
    --accent-active-color: #c4b5fd;
    --accent-text-color: #111111;
    --accent-tint-color: rgba(167, 139, 250, 0.1);
    /* Accent as "ink": for accent-colored text and drawn strokes sitting on
       dark surfaces. Chroma is cut (~0.18 -> 0.105) and lightness nudged up
       relative to --accent-color so small type doesn't halate on near-black
       while keeping ~7:1 contrast on var(--card-bg-color). */
    --accent-ink: oklch(74% 0.105 294);

    /* selection & scrollbars */
    --selection-bg-color: rgba(167, 139, 250, 0.2);
    --selection-text-color: #ededed;
    --scrollbar-thumb-color: #3d3d3d;
    --scrollbar-track-color: var(--bg-color);

    /* inline code */
    --code-inline-bg-color: #1f1f1f;
    --code-inline-text-color: #ededed;

    /* icons / theming */
    --logo-hover-color: #a78bfa;
    --logo-default-color: #ededed;
    --sun-color: #a78bfa;
    --moon-color: #a78bfa;

    /* mobile nav */
    --nav-mobile-bg: rgba(17, 17, 17, 0.97);

    /* gradients (used elsewhere) */
    --gradient-middle-color: #a78bfa;
    --gradient-end-color: #5b4b8a;
  }

  /* Light Mode */
  body.light {
    --bg-color: #f5f5f5;
    --text-primary-color: #171717;
    --text-secondary-color: #606060;

    --card-bg-color: #ffffff;
    --border-color: #e0e0e0;
    --header-bg-color: rgba(245, 245, 245, 0.85);
    --shadow-color: rgba(0, 0, 0, 0.08);

    --accent-color: #8b5cf6;
    --accent-active-color: #7c3aed;
    --accent-text-color: #ffffff;
    --accent-tint-color: rgba(139, 92, 246, 0.1);
    /* Accent as "ink" on light surfaces: deeper and slightly desaturated
       relative to --accent-color so small type clears 4.5:1 on white
       (base #8b5cf6 only just passes at ~4.6:1). */
    --accent-ink: oklch(46.5% 0.19 293);

    /* selection & scrollbars */
    --selection-bg-color: rgba(139, 92, 246, 0.15);
    --selection-text-color: var(--text-primary-color);
    --scrollbar-thumb-color: #c0c0c0;
    --scrollbar-track-color: var(--bg-color);

    /* inline code */
    --code-inline-bg-color: #efefef;
    --code-inline-text-color: var(--text-primary-color);

    /* icons / theming */
    --logo-hover-color: #8b5cf6;
    --logo-default-color: #171717;
    --sun-color: #f59e0b;
    --moon-color: #262626;

    /* mobile nav */
    --nav-mobile-bg: rgba(245, 245, 245, 0.97);

    /* gradients (used elsewhere) */
    --gradient-middle-color: #a78bfa;
    --gradient-end-color: #606060;
  }
`;

export default variables;
