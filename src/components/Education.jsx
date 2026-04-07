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
    <section id="education" className="w-full max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-white/5 pb-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="flex flex-col"
        >
          <h3 className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-purple-500 mb-4">
            MY JOURNEY
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white m-0">
            Education
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-[420px] mb-1 text-[13px] text-[#a1a1aa] leading-[1.8] lg:text-right"
        >
          A timeline of my academic milestones that demonstrate my commitment to continuous learning and excellence.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
        {/* Left Column: Academic History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-6 bg-gradient-to-r from-purple-500/0 to-purple-500/50" />
            <h4 className="text-[15px] font-bold text-white tracking-wide">Academic History</h4>
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
                      <h3 className="font-bold text-white/95 text-lg md:text-[1.15rem] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 text-[13px] md:text-sm">
                        {item.institution}
                      </p>
                    </div>
                    
                    <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between w-full xl:w-auto gap-2 xl:gap-1">
                      <span className="font-bold text-white text-lg md:text-[1.15rem]">
                        {item.score}
                      </span>
                      <span className="text-purple-500 text-[11px] font-bold uppercase tracking-widest mt-1">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-zinc-500/80 text-[13px] md:text-[14px] leading-relaxed max-w-2xl mt-1">
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
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
           className="lg:pl-8 lg:pt-0 pt-10"
        >
          <h3 className="text-2xl font-light text-sky-400 mb-8 tracking-wide">
            Who I Am
          </h3>
          <div className="space-y-6">
            <p className="text-[#a1a1aa] font-light leading-[2.2] text-[15px] tracking-wide">
              I'm a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications that solve real-world problems and create exceptional user experiences.
            </p>
            <p className="text-[#a1a1aa] font-light leading-[2.2] text-[15px] tracking-wide">
              With a strong foundation in both frontend and backend technologies, I enjoy the entire development process from concept to deployment. I'm always eager to learn new technologies and improve my craft.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
