import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import { ThemeModeProvider } from '@context/ThemeModeContext';
import Resume from './Resume';

/* Second Vite entry (see ADR 0001). Reuses the site's ThemeProvider,
   GlobalStyle and theme mode so the CV shares the exact same design tokens.
   Mounts into #cv-root rather than #root so GlobalStyle's #root layout rules
   (the app shell grid) don't apply here. */
createRoot(document.getElementById('cv-root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeModeProvider>
        <Resume />
      </ThemeModeProvider>
    </ThemeProvider>
  </StrictMode>,
);
