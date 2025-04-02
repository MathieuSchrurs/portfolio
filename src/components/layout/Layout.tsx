import React, { useEffect } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Social from './Social';
import Email from './Email';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.className = savedTheme;
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

        handleExternalLinks();
    }, []);

    return (
        <>
            {}
            <div id="root">
                <a className="skip-to-content" href="#content">
                    Skip to Content
                </a>
                <StyledContent>
                    <Nav isHome={isHome} />
                    <Social isHome={isHome} />
                    <Email isHome={isHome} />
                    <div id="content">{children}</div>
                    <Footer />
                </StyledContent>
            </div>
        </>
    );
};

export default Layout;
