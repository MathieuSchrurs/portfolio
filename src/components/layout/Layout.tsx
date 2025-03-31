import React, { useEffect } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Social from './Social';
import Email from './Email';
import Footer from './Footer';
// Import hooks if needed later for animations/scroll behavior
// import { usePrefersReducedMotion } from '@hooks';

// Define props for Layout component
interface LayoutProps {
    children: React.ReactNode;
    // location prop might be needed if using React Router or similar
    // location: { pathname: string };
}

// Styled component for the main content area
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout: React.FC<LayoutProps> = ({ children /*, location */ }) => {
    // Determine if it's the home page (adjust logic if using router)
    const isHome = typeof window !== 'undefined' && window.location.pathname === '/';
    // const isHome = location.pathname === '/'; // Example if using location prop

    // State for managing loading screen (optional, like target)
    // const [isLoading, setIsLoading] = useState(isHome);

    // Theme switching logic
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.className = savedTheme; // Set class directly
        } else if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            document.body.className = 'dark';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.className = 'light';
            localStorage.setItem('theme', 'light');
        }
    }, []);

    // Handle external links (like target) - Optional
    const handleExternalLinks = () => {
        const allLinks = Array.from(document.querySelectorAll('a'));
        if (allLinks.length > 0) {
            allLinks.forEach((link) => {
                if (link.host !== window.location.host) {
                    link.setAttribute('rel', 'noopener noreferrer');
                    link.setAttribute('target', '_blank');
                }
            });
        }
    };

    useEffect(() => {
        // if (isLoading) return; // Skip if loading screen is active

        // Handle hash links (like target) - Optional
        // if (location.hash) {
        //   const id = location.hash.substring(1); // location.hash without the '#'
        //   setTimeout(() => {
        //     const el = document.getElementById(id);
        //     if (el) {
        //       el.scrollIntoView();
        //       el.focus();
        //     }
        //   }, 0);
        // }

        handleExternalLinks();
    }, [/* isLoading */]); // Add isLoading if using loading screen

    return (
        <>
            {/* <Head /> */}
            <div id="root">
                <a className="skip-to-content" href="#content">
                    Skip to Content
                </a>
                <StyledContent>
                    <Nav isHome={isHome} />
                    <Social isHome={isHome} />
                    <Email isHome={isHome} />
                    {/* This div receives the page content */}
                    <div id="content">{children}</div>
                    <Footer />
                </StyledContent>
            </div>
        </>
    );
};

export default Layout;
