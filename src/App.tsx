import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <footer className="w-full py-8 text-sm text-gray-400 flex justify-between items-center px-6 border border-purple-500">
          <div>© 2025 All rights reserved</div>
          <div>Made with ❤️ by Kernemi Kidane</div>
          <div>
            <a href="mailto:kernemikidane63@gmail.com" className="hover:text-gray-200 transition">
              📧 kernemikidane63@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
