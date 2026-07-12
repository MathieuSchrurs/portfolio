import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Social from './Social';
import Email from './Email';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
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
