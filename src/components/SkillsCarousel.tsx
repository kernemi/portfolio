import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "JavaScript", level: 90 },
  { name: "Flutter", level: 80 },
  { name: "Dart", level: 75 },
  { name: "HTML & CSS", level: 95 },
  { name: "TailwindCSS", level: 90 },
  { name: "Figma", level: 70 },
  {name: "Java", level: 70},
  { name: "Python", level: 80 },
  { name: "C++", level: 70 },
  { name: "GDScript", level: 75 },
  { name: "Git", level: 85 },
  { name: "MySQL", level: 75 },
];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mt-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold gradient-text mb-6">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-0.5">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm font-medium">{skill.level}%</span>
              </div>

              <div className="skill-bar-bg h-2 rounded-full overflow-hidden bg-gray-700">
                <div
                  className="skill-bar-fill h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: visible ? `${skill.level}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
