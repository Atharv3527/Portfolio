import React from 'react';
import { motion } from 'framer-motion';

export const Education = () => {
  const timelineData = [
    {
      title: "B.Tech In CSE(Data Science)",
      institution: "Vishwakarma Institute of Information Technology, Kondhwa",
      description: "Specializing in Full Stack Development, Data Structures, and System Architecture.",
      score: "CGPA: 8.92",
      badge: "CURRENT"
    },
    {
      title: "Higher Secondary (11th & 12th)",
      institution: "Mahatma Gandhi Junior College of Science, Manchar",
      description: "Major in Physics, Chemistry, and Mathematics.",
      score: "74.83%",
      badge: "2023"
    },
    {
      title: "Secondary Education (10th)",
      institution: "Mahatma Gandhi Vidyalaya, Manchar",
      description: "Foundation in science and mathematics.",
      score: "91.40%",
      badge: "2021"
    }
  ];

  return (
    <section id="education" className="w-full mx-auto pt-16 md:pt-24">
      {/* Animated Premium Divider Line */}
      <div className="w-full mb-12 md:mb-20 relative h-[1px]">
        {/* Base faint line */}
        <div className="absolute inset-0 bg-white/[0.03]" />
        
        {/* Animated Purple Gradient Line matching Image 1 Color (#a78bfa / purple-400) */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-[#a78bfa] via-[#a78bfa]/40 to-transparent shadow-[0_0_15px_rgba(167,139,250,0.5)]"
        />
        
        {/* Shimmering highlight sweep over the line */}
        <motion.div
           initial={{ x: "-100%", opacity: 0 }}
           whileInView={{ x: "200%", opacity: [0, 1, 1, 0] }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
           className="absolute top-1/2 -translate-y-1/2 w-1/4 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent blur-[2px]"
        />
      </div>

      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-white/5 pb-6">
        <motion.div
           initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col"
        >
          <h3 className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] uppercase text-purple-500 mb-4">
            MY JOURNEY
          </h3>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white m-0">
            Education
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-[500px] mb-1 text-[14px] md:text-[15px] text-[#a1a1aa] leading-[1.8] lg:text-right"
        >
          A timeline of my academic milestones that demonstrate my commitment to continuous learning and excellence.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
        {/* Left Column: Academic History */}
        <motion.div
           initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-6 bg-gradient-to-r from-purple-500/0 to-purple-500/50" />
            <h4 className="text-[16px] xl:text-[17px] font-bold text-white tracking-wide">Academic History</h4>
          </div>
          
          {/* Timeline Wrapper */}
          <div className="relative border-l border-zinc-800/80 ml-[11px] pl-8 py-2 xl:pl-12 space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Line Glow overlay to make it look purple active on hover */}
                <div className="absolute -left-[33px] xl:-left-[49px] top-0 w-[2px] h-full bg-gradient-to-b from-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Dot */}
                <div className="absolute -left-[37px] xl:-left-[53px] top-8 w-[11px] h-[11px] rounded-full bg-[#050505] border border-zinc-700 flex items-center justify-center transition-colors group-hover:border-purple-500/50 z-10">
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover:bg-purple-400 transition-colors" />
                </div>
                
                {/* Card */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0e0e0e]/50 border border-white/5 p-6 md:p-8 rounded-[1.25rem] flex flex-col gap-5 hover:bg-[#111111] transition-all hover:border-white/10"
                >
                  <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-white/95 text-xl md:text-[1.35rem] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 text-[14px] md:text-[15px]">
                        {item.institution}
                      </p>
                    </div>
                    
                    <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between w-full xl:w-auto gap-2 xl:gap-1 mt-2 xl:mt-0">
                      <span className="font-bold text-white text-xl md:text-[1.35rem]">
                        {item.score}
                      </span>
                      <span className="text-purple-500 text-[12px] font-bold uppercase tracking-widest mt-1">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-zinc-500/80 text-[14px] md:text-[15px] xl:text-[16px] leading-relaxed max-w-2xl mt-1">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Who I Am */}
        <motion.div
           initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
           className="lg:pl-8 lg:pt-0 pt-10"
        >
          <h3 className="text-2xl xl:text-3xl font-light text-sky-400 mb-8 tracking-wide">
            Who I Am
          </h3>
          <div className="space-y-8">
            <p className="text-[#a1a1aa] font-light leading-[2.2] xl:leading-[2.4] text-[16px] xl:text-[17px] tracking-wide">
              I'm a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications that solve real-world problems and create exceptional user experiences.
            </p>
            <p className="text-[#a1a1aa] font-light leading-[2.2] xl:leading-[2.4] text-[16px] xl:text-[17px] tracking-wide">
              With a strong foundation in both frontend and backend technologies, I enjoy the entire development process from concept to deployment. I'm always eager to learn new technologies and improve my craft.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
