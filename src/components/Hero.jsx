import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { FileText, Mail, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Social Icons SVGs - Designed accurately
const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
  </svg>
);

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// --- Custom Typewriter Component ---
const TypewriterText = () => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [phase, setPhase] = useState('TYPING'); // TYPING, SHIMMER, ERASING
  
  const textStr = "<Atharv Waykar />";
  const totalLength = textStr.length;

  useEffect(() => {
    let timeout;
    let isMounted = true;

    const runLoop = () => {
      if (!isMounted) return;

      if (phase === 'TYPING') {
        if (displayedCount < totalLength) {
          const char = textStr[displayedCount];
          let delay = Math.random() * 40 + 60; // 60-100ms
          if (char === ' ') delay += 80;
          if (['<', '>', '/'].includes(char)) delay += 120;
          
          timeout = setTimeout(() => setDisplayedCount(c => c + 1), delay);
        } else {
          timeout = setTimeout(() => setPhase('SHIMMER'), 500); // Small pause before shimmer
        }
      } 
      else if (phase === 'SHIMMER') {
        timeout = setTimeout(() => setPhase('ERASING'), 1800); // Wait for shimmer + pause
      } 
      else if (phase === 'ERASING') {
        if (displayedCount > 0) {
          timeout = setTimeout(() => setDisplayedCount(c => c - 1), 30); // Fast erase
        } else {
          timeout = setTimeout(() => setPhase('TYPING'), 500); // Pause before retype
        }
      }
    };

    runLoop();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [displayedCount, phase, totalLength]);

  const getColorClasses = (i) => {
    // <
    if (i === 0) return "million-gradient-text drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]";
    // Atharv (1-6) and Waykar (8-13)
    if ((i >= 1 && i <= 6) || (i >= 8 && i <= 13)) return "dotted-text drop-shadow-[0_0_10px_rgba(192,132,252,0.4)]";
    // /> (15-16)
    if (i >= 15) return "million-gradient-text drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]";
    return "million-gradient-text";
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-purple-500/10 blur-[40px] rounded-full scale-110 pointer-events-none" />

      {/* Floating container for the text */}
      <motion.div 
        className="relative flex items-center h-16 md:h-20 max-w-full group"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <h1 className="flex items-center text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tight whitespace-nowrap transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ letterSpacing: "-0.02em" }}>
          {textStr.split("").slice(0, displayedCount).map((char, i) => (
            <span key={i} className={cn("inline-block transform-origin-bottom transition-all duration-100", getColorClasses(i))}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          {/* Shimmer Overlay (only active during SHIMMER phase) */}
          {phase === 'SHIMMER' && (
            <motion.div 
              className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-overlay pointer-events-none"
              initial={{ x: "-100%", skewX: "-20deg" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </h1>

        {/* Blinking Cursor */}
        <motion.span 
          className="text-[clamp(1.8rem,5vw,3.5rem)] font-light text-white/40 ml-1 inline-flex items-center whitespace-nowrap leading-none"
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
        >
          |
        </motion.span>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Global Mouse Parallax State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleGlobalMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx * 20); // Very subtle displacement
    mouseY.set(ny * 20);
  };

  return (
    <section 
      id="home" 
      className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-[75vh] pt-24 pb-12 px-[clamp(1.5rem,5vw,6rem)] 2xl:px-32 overflow-visible group"
      onMouseMove={handleGlobalMouseMove}
    >
      {/* Edge Fade Gradients for Ultra-wide Support */}
      <div className="absolute inset-y-0 left-0 w-[5vw] bg-gradient-to-r from-[#0a0a0a] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[5vw] bg-gradient-to-l from-[#0a0a0a] to-transparent z-0 pointer-events-none" />

      {/* Background ambient lighting localized to hero */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* --- LEFT COLUMN: CONTENT (55%) --- */}
      <motion.div 
        className="w-full lg:w-[55%] flex flex-col items-start gap-4 z-10 max-w-3xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Available for Opportunities
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-medium text-white/70 tracking-tight pl-1">
            Hello, I'm
          </h2>
          
          <TypewriterText />
        </div>

        <p className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mt-2 pl-1">
          A self-driven <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Full-Stack Developer</span> passionate about solving real-world problems with clean, scalable, and modern web applications.
        </p>

        {/* Buttons tightened up */}
        <div className="flex flex-wrap items-center gap-4 pt-3 w-full pl-1">
          <MagneticWrapper strength={0.2}>
            <a href="#projects" className="group relative flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] z-10 overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.2}>
            <a href="#contact" className="relative flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent text-white font-medium text-sm hover:bg-white/5 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all overflow-hidden group">
              Contact Me
            </a>
          </MagneticWrapper>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 pt-3 pl-1">
          {[
            { id: 'github', icon: GithubIcon, href: "https://github.com/Atharv3527", label: "🚀 GitHub", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]", bg: "bg-[#1e2330] hover:bg-[#252b3b]", borderGlow: "border-white/10 hover:border-white/50", color: "text-white" },
            { id: 'linkedin', icon: LinkedinIcon, href: "https://www.linkedin.com/in/atharv-waykar/", label: "👋 Let's Connect", glow: "hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]", bg: "bg-[#2563eb] hover:bg-[#1d4ed8]", borderGlow: "border-blue-400/20 hover:border-blue-400", color: "text-white" },
            { id: 'gmail', icon: MailIcon, href: "mailto:atharvwaykar3@gmail.com", label: "📧 Send me an email", glow: "hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]", bg: "bg-[#dc2626] hover:bg-[#b91c1c]", borderGlow: "border-red-400/20 hover:border-red-400", color: "text-white" }
          ].map((social) => (
            <div 
              key={social.id} 
              className="relative flex items-center justify-center p-1" 
              onMouseEnter={() => setHoveredSocial(social.id)} 
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <MagneticWrapper strength={0.4}>
                <a 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative w-[3.25rem] h-[3.25rem] flex items-center justify-center rounded-[1rem] border transition-all duration-300 group z-10",
                    "hover:scale-110",
                    social.bg,
                    social.borderGlow,
                    social.glow,
                    social.color
                  )}
                >
                  <social.icon className="w-7 h-7 drop-shadow-md transition-transform" />
                  
                  {/* Inner Ripple on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDuration: '2s' }} />
                </a>
              </MagneticWrapper>

              <AnimatePresence>
                {hoveredSocial === social.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: -0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
                    className="absolute top-0 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-full bg-black/90 border border-white/10 text-white text-[0.7rem] font-semibold tracking-wide shadow-xl z-50 backdrop-blur-md"
                  >
                    {social.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- RIGHT COLUMN: VISUAL (45%) --- */}
      <motion.div 
        className="w-full lg:w-[45%] relative hidden lg:flex items-center justify-center lg:justify-end xl:translate-x-6 lg:scale-105 xl:scale-110 origin-right hover:scale-125 transition-transform duration-700 ease-out z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Core Profile Frame */}
        <div className="relative w-52 h-52 rounded-full border border-white/20 p-2 z-20 shadow-[0_0_50px_rgba(168,85,247,0.2)] bg-black/40 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-xl" />
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Atharv&backgroundColor=transparent" 
            alt="Atharv Waykar"
            className="w-full h-full rounded-full object-cover border border-white/10"
          />
        </div>

        {/* Orbital Ring 1 */}
        <div className="absolute w-[280px] h-[280px] border border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
        
        {/* Nodes for Orbit 1 */}
        <div className="absolute w-[280px] h-[280px] animate-[spin_30s_linear_infinite]">
          {[
            { angle: 0, icon: 'React', color: 'text-cyan-400' },
            { angle: 120, icon: 'Node.js', color: 'text-green-400' },
            { angle: 240, icon: 'Next.js', color: 'text-white' },
          ].map((stack, idx) => (
            <div 
              key={idx}
              className="absolute w-10 h-10 bg-black border border-white/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md hover:scale-110 transition-transform cursor-pointer"
              style={{
                top: `calc(50% - 20px + 140px * ${Math.sin(stack.angle * (Math.PI / 180))})`,
                left: `calc(50% - 20px + 140px * ${Math.cos(stack.angle * (Math.PI / 180))})`,
              }}
            >
              <span className={cn("font-bold text-[9px] animate-[spin_30s_linear_infinite_reverse]", stack.color)}>
                {stack.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Orbital Ring 2 */}
        <div className="absolute w-[380px] h-[380px] border border-white/[0.05] rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Nodes for Orbit 2 */}
        <div className="absolute w-[380px] h-[380px] animate-[spin_40s_linear_infinite_reverse]">
          {[
            { angle: 45, icon: 'Python', color: 'text-blue-400' },
            { angle: 165, icon: 'AWS', color: 'text-orange-400' },
            { angle: 285, icon: 'Docker', color: 'text-blue-500' },
          ].map((stack, idx) => (
            <div 
              key={idx}
              className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer"
              style={{
                top: `calc(50% - 24px + 190px * ${Math.sin(stack.angle * (Math.PI / 180))})`,
                left: `calc(50% - 24px + 190px * ${Math.cos(stack.angle * (Math.PI / 180))})`,
              }}
            >
              <span className={cn("font-bold text-[10px] animate-[spin_40s_linear_infinite]", stack.color)}>
                {stack.icon}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

