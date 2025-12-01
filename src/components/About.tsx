import React, { useEffect, useRef, useState } from 'react';
import Skills from './SkillsCarousel';
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";


const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills'>('about');
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const [_skillsInView, setSkillsInView] = useState(false);

  useEffect(() => {
    if (!skillsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSkillsInView(true);
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-0 px-0 relative overflow-hidden">
      <ParticleBackground />
      <div className="w-full h-12 mb-5 transition-colors duration-300 bg-gradient-to-r from-purple-900 to-blue-800"></div>
      <div className="max-w-7xl mx-auto text-white relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold gradient-text mb-1">About Me</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-1 gap-2">
          {[
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'about' | 'skills')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'clickedbtn'
                  : 'generalbtn'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 px-2">

                <h3 className="text-3xl font-bold mb-6">My Story</h3>
                <p className="text-ml leading-relaxed">
                  I'm a Software Engineering student and frontend developer passionate about creating beautiful, functional, and user-friendly web applications. I specialize in React, TypeScript, and modern web technologies, and I enjoy writing clean, maintainable code. I also have experience with C++, Python, Java, PHP, GDScript, and Figma.                </p>
                <p className="text-ml leading-relaxed">
                  Alongside frontend development, I'm an active AI/ML learner exploring machine learning, data analysis, and intelligent systems. I love combining software engineering principles with AI-driven solutions to build smarter and more impactful applications.                </p>
                <div className="flex flex-wrap gap-2">
                  {['Frontend Developer', 'Game Dev Enthusiast', 'Software Engineer'].map((trait, idx) => (
                    <span
                      key={idx}
                      className="generalbtn"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
                 {[
                  {
                    title: "3+",
                    text: "Years Experience",
                  },
                  {
                    title: "7+",
                    text: "Completed Projects",
                  },
                  {
                    title: "10K+",
                    text: "Hour worked",
                  },
                  {
                    title: "100%",
                    text: "Dedicated learner",
                  },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-purple/10 backdrop-blur-sm rounded-2xl border border-purple-500 
                              text-center transition-shadow shadow-md hover:shadow-purple-500/40"
                  >
                    <h4 className="text-xl font-bold mb-2 skill-title">{card.title}</h4>
                    <p className="text-sm skill-title text-gray-300">{card.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && <Skills/>}
        </div>
      </div>
    </section>
  );
};

export default About;
