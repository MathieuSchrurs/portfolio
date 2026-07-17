import { useState, type FC, type ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import StatusBar from './StatusBar';
import Footer from './Footer';
import CommandPalette from '../ui/CommandPalette';

interface LayoutProps {
    children: ReactNode;
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
    const [paletteOpen, setPaletteOpen] = useState(false);

    return (
        <StyledContent>
            <a className="skip-to-content" href="#content">
                Skip to Content
            </a>
            <Nav />
            <div id="content">{children}</div>
            <Footer />
            <StatusBar onOpenPalette={() => setPaletteOpen(true)} />
            <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        </StyledContent>
    );
};

export default Layout;
