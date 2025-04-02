import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Work from './components/sections/Work';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <main className="fillHeight">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
    </Layout>
  );
}

export default App;
