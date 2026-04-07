import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: "AI Code Synthesizer",
    description: "An intelligent code generation engine built with Next.js and LLMs. Transforms natural language into production-ready React components.",
    tech: ["Next.js", "GPT-4", "Tailwind", "Vercel"],
    link: "https://github.com/atharv",
    color: "from-purple-500/20 to-cyan-400/20",
    borderGlow: "rgba(168,85,247,0.5)",
  },
  {
    id: 2,
    title: "AlgoVis Platform",
    description: "Interactive data structure and algorithm visualizer. Helps computer science students understand complex graph traversals in real-time.",
    tech: ["React", "Framer Motion", "TypeScript", "Vite"],
    link: "https://github.com/atharv",
    color: "from-blue-500/20 to-emerald-400/20",
    borderGlow: "rgba(59,130,246,0.5)",
  },
  {
    id: 3,
    title: "Nexus Neural Network",
    description: "A highly scalable distributed neural network training interface. Features real-time telemetry and beautiful data dashboards.",
    tech: ["Python", "TensorFlow", "React", "AWS"],
    link: "https://github.com/atharv",
    color: "from-rose-500/20 to-orange-400/20",
    borderGlow: "rgba(244,63,94,0.5)",
  },
  {
    id: 4,
    title: "Quantum State Manager",
    description: "Open source state management library for React. Built on immutable data trees guaranteeing zero unnecessary re-renders.",
    tech: ["JavaScript", "React", "NPM", "Jest"],
    link: "https://github.com/atharv",
    color: "from-cyan-500/20 to-indigo-400/20",
    borderGlow: "rgba(34,211,238,0.5)",
  }
];

const TiltCard = ({ project }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Transform mapped to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[340px] sm:h-[380px] lg:h-[400px] rounded-3xl cursor-pointer group perspective-[1000px]"
    >
      {/* 3D Inner Card Container */}
      <div 
        className="absolute inset-0 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-sm transition-colors duration-500 group-hover:border-white/20"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        {/* Abstract Background Gradient based on Project Color */}
        <div className={`absolute -inset-20 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700`} />
        
        {/* Dynamic Inner Glow Border replacing standard hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${project.borderGlow}` }} />

        {/* Content Box */}
        <div className="absolute inset-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
          
          {/* Top Bar */}
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
              <span className="font-bold text-xl">{project.id > 9 ? project.id : `0${project.id}`}</span>
            </div>
            
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
            >
              <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
            </a>
          </div>

          {/* Bottom Info */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-md">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-[95%] sm:max-w-[90%] group-hover:text-zinc-300 transition-colors">
              {project.description}
            </p>
            
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-zinc-300 group-hover:border-white/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 min-h-[70vh]">
      
      {/* Section Header */}
      <div className="mb-16 md:mb-24 flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-cyan-400 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Featured Work
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
          Selected <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl mt-4 px-2 sm:px-0">
          A showcase of scalable applications, intelligent systems, and complex problem solving. Hover over a project to explore the architecture.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-[2000px]">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          >
            <TiltCard project={project} />
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};
