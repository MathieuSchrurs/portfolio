import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readInitialThemeMode(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

interface ThemeModeContextValue {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(readInitialThemeMode);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(themeMode);
    localStorage.setItem(STORAGE_KEY, themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

// Provider + hook + context are one cohesive module; co-locating them here
// is intentional, so the fast-refresh "only export components" rule doesn't
// apply. Splitting the hook out would fragment the unit for no real gain.
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeModeProvider');
  return ctx;
};
