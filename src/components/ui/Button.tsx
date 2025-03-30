import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    download?: boolean;
    target?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    download,
    target
}) => {
    const baseClasses = "font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center";

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
    };

    const sizeClasses = {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4"
    };

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                className={buttonClasses}
                download={download}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
