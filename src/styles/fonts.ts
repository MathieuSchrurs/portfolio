import { css } from "styled-components";

// --- IBM Plex Mono ---
// The site's single typeface. Mono is the primary voice, not an accent: the
// whole identity is a terminal/systems look, so headings, body, and UI all
// share one monospaced family (see variables.ts, where --font-sans and
// --font-mono both resolve here).
import IBMPlexMonoRegularWoff2 from "@fonts/IBMPlexMono/IBMPlexMono-400.woff2";
import IBMPlexMonoMediumWoff2 from "@fonts/IBMPlexMono/IBMPlexMono-500.woff2";
import IBMPlexMonoSemiboldWoff2 from "@fonts/IBMPlexMono/IBMPlexMono-600.woff2";

/* woff2-only: universal browser support since 2016. Italic faces are not
   loaded — no italic text is rendered anywhere on the site. */
const families: Record<string, Record<number, string>> = {
  "IBM Plex Mono": {
    400: IBMPlexMonoRegularWoff2,
    500: IBMPlexMonoMediumWoff2,
    600: IBMPlexMonoSemiboldWoff2,
  },
};

const fontFaces = Object.entries(families)
  .flatMap(([name, weights]) =>
    Object.entries(weights).map(
      ([weight, woff2]) => `
      @font-face {
        font-family: '${name}';
        src: url(${woff2}) format('woff2');
        font-weight: ${weight};
        font-style: normal;
        font-display: swap;
      }
    `,
    ),
  )
  .join("");

const fonts = css`
  ${fontFaces}
`;

export default fonts;
