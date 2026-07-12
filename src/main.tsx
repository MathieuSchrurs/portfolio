import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { inject } from '@vercel/analytics';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import { ThemeModeProvider } from '@context/ThemeModeContext';
import App from './App.tsx';

inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </ThemeProvider>
  </StrictMode>,
);
