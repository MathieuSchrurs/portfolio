import React from 'react';
// Removed styled-components import if not used directly here
import Layout from './components/layout/Layout'; // Import the main Layout
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Work from './components/sections/Work';
import Contact from './components/sections/Contact';
// Removed Header, LeftSidebar, RightSidebar imports

// Removed StyledAppContainer, StyledMainContainer, StyledLeftSidebar, StyledRightSidebar

function App() {
  // Removed theme useEffect logic - it's now in Layout.tsx
  // Removed socialLinks definition - it's now in config.ts and used by Social.tsx

  // Determine location if needed for Layout (e.g., using React Router)
  // const location = useLocation(); // Example if using React Router

  return (
    // Pass location if Layout needs it
    <Layout /* location={location} */ >
      {/* The children passed to Layout are rendered inside its #content div */}
      {/* Add className="fillHeight" to main tag inside Layout for index page */}
      <main className="fillHeight">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
    </Layout>
  );
}

export default App;
