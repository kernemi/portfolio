import React, { useEffect, useRef, useState } from "react";
import profileImg from "../assets/profile.png"; 
import ParticleBackground from "./ParticleBackground";

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [_mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement | null>(null);

  const texts = [
    'Junior Software Engineer',
    'Frontend Developer',
    'Junior Machine Learning Engineer',
    'UI/UX Enthusiast',
    'Creative Problem Solver'
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 90;
    const pause = 1800;

    const t = setTimeout(() => {
      if (!isDeleting && charIndex < texts[textIndex].length) {
        setCurrentText(texts[textIndex].slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(texts[textIndex].slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else if (!isDeleting && charIndex === texts[textIndex].length) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex(t => (t + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(t);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >

      <ParticleBackground />

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* left section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text">Kernemi Kidane</h1>

          <div className="flex items-center gap-4">
            <span className="text-lg md:text-2xl font-medium">I'm a</span>
            <div className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text gradient-text relative">
              <span>{currentText}</span>
              <span className="ml-2 inline-block w-1 h-6 bg-cyberPurple animate-pulse" />
            </div>
          </div>

          <p className="max-w-xl leading-relaxed">
            Focused on building high-quality, user-centric interfaces while applying machine learning
            techniques to create intelligent, data-driven functionality.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/resumef.pdf"
              download
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6cc3ff]/20 to-[#9b5cff]/20 border border-[#6cc3ff]/20 text-sm font-semibold hover:translate-y-[-2px] transition"
            >
              Download CV
            </a>

            <button
              onClick={scrollToProjects}
              className="generalbtn"
            >
              View Projects
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <a className="social-icon" href="https://github.com/kernemi" target="_blank">💻</a>
            <a className="social-icon" href="https://linkedin.com" target="_blank">💼</a>
            <a className="social-icon" href="mailto:kernemikidane63@gmail.com">📧</a>
          </div>
        </div>

        {/* avatar */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative neon-outline p-2 rounded-xl"
          >
            <div className="clip-hex avatar-size w-80 h-80 overflow-hidden bg-white/5">
              <img src={profileImg} alt="Kernemi" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
        Scroll Down
      </div>
    </section>
  );
};

export default Hero;
