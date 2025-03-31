import { useState, useEffect } from 'react';

interface ThemeToggleProps {
    className?: string;
    theme?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, theme: initialTheme }) => {
    const [theme, setTheme] = useState(initialTheme || 'light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        // Update local storage and apply theme to body whenever the theme changes
        localStorage.setItem('theme', theme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const ballSize = 20; // Slider ball size in pixels
    const toggleWidth = 28; // Toggle width in pixels
    const toggleHeight = 48; // Toggle height in pixels
    const horizontalPadding = 4; // Horizontal padding for the ball inside the toggle
    const verticalPadding = 4; // Vertical padding at the top/bottom

    return (
        <div
            onClick={toggleTheme}
            className={`relative flex items-center rounded-full cursor-pointer transition-colors duration-300 ${className}`}
            style={{
                width: `${toggleWidth}px`,
                height: `${toggleHeight}px`,
                background: `rgba(var(--toggle-background))`,
                border: `1px solid rgba(var(--border))`,
            }}
        >
            {/* Slider Ball */}
            <div
                className={`absolute rounded-full shadow-md flex items-center justify-center transition-transform duration-300`}
                style={{
                    width: `${ballSize}px`,
                    height: `${ballSize}px`,
                    background: `rgba(var(--card))`,
                    left: `${horizontalPadding}px`,
                    top: `${verticalPadding}px`,
                    transform:
                        theme === 'light'
                            ? 'translateY(0)'
                            : `translateY(${toggleHeight - ballSize - 2 * verticalPadding}px)`,
                }}
            >
                {/* Icon Wrapper */}
                <div className="flex items-center justify-center w-full h-full">
                    {/* Sun Icon */}
                    {theme === 'light' && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke={`rgba(var(--sun-color))`}
                            className="w-3 h-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636M12 8a4 4 0 100 8 4 4 0 000-8z"
                            />
                        </svg>
                    )}

                    {/* Moon Icon */}
                    {theme === 'dark' && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke={`rgba(var(--moon-color))`}
                            className="w-3 h-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.58 9.79z"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;
