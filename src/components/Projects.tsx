import React, { useMemo, useState } from "react";
import ParticleBackground from "./ParticleBackground";

interface Project {
  title: string;
  description: string;
  link?: string;
  repo?: string;
  preview?: string;
  category: "Web" | "Mobile" | "Java" | "Game" | "ML";
  tags: string[];
}

const allProjects: Project[] = [
  // ------------------ WEB ------------------
  {
    title: "Portfolio Website",
    description: "Modern personal website built with React, Vite & Tailwind.",
    link: "#",
    repo: "https://github.com/kernemi/portfolio",
    preview: "/previews/portfolio.png",
    category: "Web",
    tags: ["React", "Tailwind"]
  },
  {
    title: "Task Tracker",
    description: "Simple task manager with filtering and persistence.",
    link: "https://tasktracker-theta-nine.vercel.app/",
    repo: "https://github.com/kernemi/task_tracker",
    preview: "/previews/task.png",
    category: "Web",
    tags: ["React", "UX"]
  },

  // ------------------ JAVA ------------------
  {
    title: "Resturant Management System(In Progress)",
    description: "Java console application with CRUD operations.",
    repo: "https://github.com/kernemi/restaurant_system",
    preview: "/previews/java.png",
    category: "Java",
    tags: ["Java", "OOP"]
  },

  // ------------------ FLUTTER ------------------
  /*{
    title: "Coming Soon",
    description: "A new mobile app built with Flutter is on the way.",
    category: "Mobile",
    tags: ["Flutter", "Dart"]
  },
*/
  // ------------------ GAME (GODOT) ------------------
  {
    title: "data defender (In Progress)",
    description: "A Godot 2D game currently under development.",
    repo: "https://github.com/kernemi/godot-platformer",
    preview: "/previews/game.png",
    category: "Game",
    tags: ["Godot", "GDScript"]
  },

  // ------------------ ML / DATA ------------------
 /* {
    title: "Coming Soon",
    description: "ML data analysis project is being prepared.",
    category: "ML",
    tags: ["Python", "Pandas"]
  }
    */
];

const categories = ["All", "Web", "Java", "Game"];/*"Mobile" , "ML"*/

const Projects: React.FC = () => {
  const [active, setActive] = useState<typeof categories[number]>("All");

  const projects = useMemo(
    () =>
      active === "All"
        ? allProjects
        : allProjects.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="projects" className="py-0 px-0 relative overflow-hidden">
      <ParticleBackground />
      <div className="w-full h-12 mb-5 bg-gradient-to-r from-purple-900 to-blue-800"></div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold gradient-text text-center mb-6">
          Projects
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                active === c
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "generalbtn"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div
              key={p.title + idx}
              className="group block p-6 rounded-2xl border border-purple-500 transition relative"
            >
              {/* Hover Preview Image */}
              {p.preview && (
                <img
                  src={p.preview}
                  className="absolute top-3 right-3 w-24 h-16 object-cover rounded opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg"
                />
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500">
                  {p.category}
                </span>
              </div>

              <h3 className="text-2xl font-semibold mt-4">
                {p.title}
              </h3>

              <p className="text-gray-500 mt-2">{p.description}</p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 bg-white/5 rounded-md text-sm">
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub Repo Button */}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  className="inline-block mt-4 text-blue-400 underline text-sm hover:text-blue-300"
                >
                  GitHub Repo →
                </a>
              )}

              {/* Demo Link */}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  className="inline-block ml-4 mt-4 text-purple-400 underline text-sm hover:text-purple-300"
                >
                  Live Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-72"></div>
    </section>
  );
};

export default Projects;
