import type { FC } from 'react';
import { useThemeMode } from '@context/ThemeModeContext';
import AnimatedThemeToggleIcon from './AnimatedThemeToggleIcon';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { themeMode, toggleThemeMode } = useThemeMode();

  const iconSize = '20px';

  return (
    <AnimatedThemeToggleIcon
      theme={themeMode}
      onClick={toggleThemeMode}
      className={className}
          style={{
          width: iconSize,
          height: iconSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(1px)",
        }}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleThemeMode();
        }
      }}
    />
  );
};

export default ThemeToggle;
