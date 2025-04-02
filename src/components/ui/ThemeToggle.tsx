import { useState, useEffect } from 'react';
import AnimatedThemeToggleIcon from './AnimatedThemeToggleIcon';

interface ThemeToggleProps {
  className?: string;
  theme?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  theme: initialTheme,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (initialTheme === 'light' || initialTheme === 'dark') return initialTheme;
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const iconSize = '20px';

  return (
    <AnimatedThemeToggleIcon
      theme={theme}
      onClick={toggleTheme}
      className={className}
      style={{ width: iconSize, height: iconSize }}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
    />
  );
};

export default ThemeToggle;