import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  const tools = [
    'React', 'Node.js', 'Python', 'MongoDB', 'TypeScript', 
    'Tailwind', 'Three.js', 'AWS', 'Figma', 'Git'
  ];

  return (
    <section id="about" className="w-full relative">
      {/* Ambient dark background overlay to darken the section against the global grid */}
      <div className="absolute inset-0 bg-[#000000] opacity-60 -z-10 pointer-events-none rounded-[100px] blur-[100px]" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image Card */}
        <motion.div 
          className="relative w-full max-w-md mx-auto lg:mx-0 pl-6 pt-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Offset Background Frame */}
          <div className="absolute top-0 left-0 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-2xl border border-[#27272a] bg-[#050505] z-0" />
          
          {/* Main Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden z-10 shadow-2xl">
            <img 
              src="/profile.png.jpeg" 
              alt="Atharv Waykar"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          className="flex flex-col items-start"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-[2.5rem] font-bold tracking-tight text-white mb-6">
            Who I Am
          </h2>
          
          <div className="space-y-6 text-base text-[#a1a1aa] leading-[1.8] font-normal">
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications that solve real-world problems and create exceptional user experiences.
            </p>
            <p>
              With a strong foundation in both frontend and backend technologies, I enjoy the entire development process from concept to deployment. I'm always eager to learn new technologies and improve my craft.
            </p>
          </div>

          <div className="mt-12 w-full">
            <h3 className="text-[11px] font-bold tracking-[0.05em] uppercase text-white mb-5">
              TECH STACK & TOOLS
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool, idx) => (
                <motion.div 
                  key={tool}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="px-4 py-2 rounded-lg border border-[#27272a] bg-[#121212]/80 text-[#a1a1aa] text-sm hover:text-white hover:border-[#3f3f46] transition-colors cursor-default"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
