import { css } from 'styled-components';

// --- Calibre ---
import CalibreRegularWoff from '@fonts/Calibre/Calibre-Regular.woff';
import CalibreRegularWoff2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreMediumWoff from '@fonts/Calibre/Calibre-Medium.woff';
import CalibreMediumWoff2 from '@fonts/Calibre/Calibre-Medium.woff2';
import CalibreSemiboldWoff from '@fonts/Calibre/Calibre-Semibold.woff';
import CalibreSemiboldWoff2 from '@fonts/Calibre/Calibre-Semibold.woff2';

import CalibreRegularItalicWoff from '@fonts/Calibre/Calibre-RegularItalic.woff';
import CalibreRegularItalicWoff2 from '@fonts/Calibre/Calibre-RegularItalic.woff2';
import CalibreMediumItalicWoff from '@fonts/Calibre/Calibre-MediumItalic.woff';
import CalibreMediumItalicWoff2 from '@fonts/Calibre/Calibre-MediumItalic.woff2';
import CalibreSemiboldItalicWoff from '@fonts/Calibre/Calibre-SemiboldItalic.woff';
import CalibreSemiboldItalicWoff2 from '@fonts/Calibre/Calibre-SemiboldItalic.woff2';

// --- SF Mono ---
import SFMonoRegularWoff from '@fonts/SFMono/SFMono-Regular.woff';
import SFMonoRegularWoff2 from '@fonts/SFMono/SFMono-Regular.woff2';
import SFMonoMediumWoff from '@fonts/SFMono/SFMono-Medium.woff';
import SFMonoMediumWoff2 from '@fonts/SFMono/SFMono-Medium.woff2';
import SFMonoSemiboldWoff from '@fonts/SFMono/SFMono-Semibold.woff';
import SFMonoSemiboldWoff2 from '@fonts/SFMono/SFMono-Semibold.woff2';

import SFMonoRegularItalicWoff from '@fonts/SFMono/SFMono-RegularItalic.woff';
import SFMonoRegularItalicWoff2 from '@fonts/SFMono/SFMono-RegularItalic.woff2';
import SFMonoMediumItalicWoff from '@fonts/SFMono/SFMono-MediumItalic.woff';
import SFMonoMediumItalicWoff2 from '@fonts/SFMono/SFMono-MediumItalic.woff2';
import SFMonoSemiboldItalicWoff from '@fonts/SFMono/SFMono-SemiboldItalic.woff';
import SFMonoSemiboldItalicWoff2 from '@fonts/SFMono/SFMono-SemiboldItalic.woff2';

// Define weight-to-file mappings like the target
const calibreNormalWeights = {
  400: [CalibreRegularWoff, CalibreRegularWoff2],
  500: [CalibreMediumWoff, CalibreMediumWoff2],
  600: [CalibreSemiboldWoff, CalibreSemiboldWoff2],
};

const calibreItalicWeights = {
  400: [CalibreRegularItalicWoff, CalibreRegularItalicWoff2],
  500: [CalibreMediumItalicWoff, CalibreMediumItalicWoff2],
  600: [CalibreSemiboldItalicWoff, CalibreSemiboldItalicWoff2],
};

const sfMonoNormalWeights = {
  400: [SFMonoRegularWoff, SFMonoRegularWoff2],
  500: [SFMonoMediumWoff, SFMonoMediumWoff2], // Added Medium based on target files
  600: [SFMonoSemiboldWoff, SFMonoSemiboldWoff2],
};

const sfMonoItalicWeights = {
  400: [SFMonoRegularItalicWoff, SFMonoRegularItalicWoff2],
  500: [SFMonoMediumItalicWoff, SFMonoMediumItalicWoff2], // Added Medium Italic
  600: [SFMonoSemiboldItalicWoff, SFMonoSemiboldItalicWoff2],
};

// Define font families
interface FontFormats {
  [weight: number]: [string, string]; // [woff, woff2]
}

interface FontDefinition {
  name: string;
  normal: FontFormats;
  italic: FontFormats;
}

const calibre: FontDefinition = {
  name: 'Calibre',
  normal: calibreNormalWeights,
  italic: calibreItalicWeights,
};

const sfMono: FontDefinition = {
  name: 'SF Mono',
  normal: sfMonoNormalWeights,
  italic: sfMonoItalicWeights,
};

// Function to create @font-face rules
const createFontFaces = (family: FontDefinition, style = 'normal') => {
  let styles = '';
  const weights = style === 'italic' ? family.italic : family.normal;

  for (const [weight, formats] of Object.entries(weights)) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
             url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

// Generate the CSS strings
const calibreNormal = createFontFaces(calibre);
const calibreItalic = createFontFaces(calibre, 'italic');
const sfMonoNormal = createFontFaces(sfMono);
const sfMonoItalic = createFontFaces(sfMono, 'italic');

// Combine all font faces
const fonts = css`
  ${calibreNormal}
  ${calibreItalic}
  ${sfMonoNormal}
  ${sfMonoItalic}
`;

export default fonts;
