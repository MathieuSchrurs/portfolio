import Header from './components/layout/Header'; // Import new Header
import LeftSidebar from './components/layout/LeftSidebar'; // Import LeftSidebar
import RightSidebar from './components/layout/RightSidebar'; // Import RightSidebar
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Work from './components/sections/Work';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="bg-navy font-sans text-slate min-h-screen">
      <Header /> {/* Use new Header */}
      <LeftSidebar /> {/* Add LeftSidebar */}
      <RightSidebar /> {/* Add RightSidebar */}

      <main className="mx-auto min-h-screen max-w-screen-xl px-6 py-0 md:px-12 md:py-20 lg:px-24 lg:py-0">
        {/* Add pt-24 or similar padding top if header overlaps */}
        <div className="pt-24 md:pt-32"> {/* Add padding top to avoid header overlap */}
          <Hero />
          <About />
          <Experience />
          <Work />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
