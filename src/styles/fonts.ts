import { css } from "styled-components";

// --- Calibre ---
import CalibreRegularWoff2 from "@fonts/Calibre/Calibre-Regular.woff2";
import CalibreMediumWoff2 from "@fonts/Calibre/Calibre-Medium.woff2";
import CalibreSemiboldWoff2 from "@fonts/Calibre/Calibre-Semibold.woff2";

// --- SF Mono ---
import SFMonoRegularWoff2 from "@fonts/SFMono/SFMono-Regular.woff2";
import SFMonoMediumWoff2 from "@fonts/SFMono/SFMono-Medium.woff2";
import SFMonoSemiboldWoff2 from "@fonts/SFMono/SFMono-Semibold.woff2";

/* woff2-only: universal browser support since 2016, and the .woff duplicates
   doubled the emitted font payload for nothing. Italic faces are not loaded —
   no italic text is rendered anywhere on the site. */
const families: Record<string, Record<number, string>> = {
  Calibre: {
    400: CalibreRegularWoff2,
    500: CalibreMediumWoff2,
    600: CalibreSemiboldWoff2,
  },
  "SF Mono": {
    400: SFMonoRegularWoff2,
    500: SFMonoMediumWoff2,
    600: SFMonoSemiboldWoff2,
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
