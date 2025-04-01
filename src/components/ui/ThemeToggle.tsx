// src/components/ui/ThemeToggle.tsx

import { useState, useEffect } from 'react';
// --- Update the import name and path ---
import AnimatedThemeToggleIcon from './AnimatedThemeToggleIcon'; // Adjust path if necessary

interface ThemeToggleProps {
  className?: string; // Allow passing className for positioning/layout
  theme?: string; // Allow initial theme override if needed
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  theme: initialTheme,
}) => {
  // Initialize state (same logic as before)
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

  // Effect to apply theme class and save (same logic as before)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }
  }, [theme]);

  // Toggle function (same logic as before)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Define desired icon size
  const iconSize = '20px'; // Example size (adjust as needed)

  return (
    // --- Update the rendered component name ---
    <AnimatedThemeToggleIcon
      theme={theme}
      onClick={toggleTheme}
      className={className} // Pass className for external styling/layout
      style={{ width: iconSize, height: iconSize }} // Set the size
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent space bar scrolling
          toggleTheme();
        }
      }}
    />
  );
};

export default ThemeToggle;
