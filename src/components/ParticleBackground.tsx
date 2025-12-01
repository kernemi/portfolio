import React, { useEffect, useState } from "react";

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 6 + 2,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.6 + 0.2
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y > 105 ? -5 : p.y + (0.15 + Math.random() * 0.6),
          x: (p.x + Math.sin((p.y + p.id) * 0.02) * 0.3) % 100
        }))
      );
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            opacity: p.opacity,
            position: "absolute",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(155,92,255,0.9), rgba(96,165,250,0.6))`,
            filter: "blur(1px)"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
