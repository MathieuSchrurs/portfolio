import { useEffect } from 'react';
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
        <StyledContent>
            <a className="skip-to-content" href="#content">
                Skip to Content
            </a>
            <Nav />
            <Social />
            <Email />
            <div id="content">{children}</div>
            <Footer />
        </StyledContent>
    );
};

export default Layout;
