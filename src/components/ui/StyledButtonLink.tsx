import React from 'react';
import styled from 'styled-components';

interface StyledButtonLinkProps {
    href: string;
    children: React.ReactNode;
    showIcon?: boolean;
    download?: string | boolean;
    target?: string;
    rel?: string;
    className?: string;
    /** Filled accent variant for the page's one primary action; default is the ghost outline. */
    primary?: boolean;
}

const StyledLink = styled.a<{ $primary?: boolean }>`
  ${({ theme }) => theme.mixins.smallButton};

  /* Primary shares the exact ghost skeleton and hover of its sibling;
     hierarchy comes from the heavier text alone. */
  ${({ $primary }) =>
    $primary &&
    `
    font-weight: 600;
  `}

  svg {
    display: inline-block;
    width: 0.8em;
    height: 0.8em;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    vertical-align: middle;
    stroke-width: 2.5;
    stroke: currentColor;
    transform: scale(1.5);
    transform-origin: center;
  }
`;

const StyledButtonLink: React.FC<StyledButtonLinkProps> = ({
    href,
    children,
    showIcon = false,
    download,
    target,
    rel,
    className = '',
    primary = false,
}) => {
    return (
        <StyledLink
            $primary={primary}
            href={href}
            download={typeof download === 'string' ? download : undefined}
            target={target}
            rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
            className={className}
        >
            {children}
            {showIcon && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                </svg>
            )}
        </StyledLink>
    );
};

export default StyledButtonLink;