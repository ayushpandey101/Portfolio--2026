import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <About />
      <CustomCursor />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
