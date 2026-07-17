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
      /* No transform here: an inline transform would override both the
         nav's alignment nudges and the button's own hover scale. */
      style={{
        width: iconSize,
        height: iconSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
    />
  );
};

export default ThemeToggle;
