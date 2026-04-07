import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence, useScroll } from 'framer-motion';
import { FileText, Mail, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { FaReact, FaNodeJs, FaAws, FaDocker, FaPython } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { OrbitingCircles } from './ui/orbiting-circles';

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

const Particles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20 blur-[1px]"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

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

  const getColorClasses = () => {
    return "dotted-text";
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
        <h1 className="relative inline-flex w-fit items-center overflow-hidden text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tight whitespace-nowrap transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ letterSpacing: "-0.02em" }}>
          {textStr.split("").slice(0, displayedCount).map((char, i) => (
            <span key={i} className={cn("inline-block transform-origin-bottom transition-all duration-100", getColorClasses())}>
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

export const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 hidden sm:flex items-center justify-center cursor-pointer group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}>
      <div className="relative w-[96px] h-[96px] flex items-center justify-center hover:scale-105 transition-transform duration-300">
        {/* Outer rotating text */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path
              id="scrollTextPath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
              stroke="none"
            />
            <text className="text-[7px] font-black uppercase fill-white stroke-white stroke-[0.3px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <textPath href="#scrollTextPath" startOffset="0" textLength="220" lengthAdjust="spacing">
                SCROLL TO EXPLORE • SCROLL TO EXPLORE • 
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center filled circle and arrow */}
        <div className="absolute w-[48px] h-[48px] rounded-full border border-white/30 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:border-white/50 backdrop-blur-md bg-black/40 z-10">
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5 relative z-20 -mt-2 drop-shadow-md mix-blend-difference"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-white opacity-90 z-0" 
            style={{ height: fillHeight }}
          />
        </div>

        {/* Top-left small circle widget */}
        <div className="absolute top-1 left-1 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border border-white/20 flex items-center justify-center bg-[#0e0e0e] shadow-xl z-20">
          <div className="w-2.5 h-2.5 bg-white rounded-full -translate-x-[2px] -translate-y-[2px]" />
        </div>
      </div>
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
      className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-[75vh] pt-1 pb-16 px-[clamp(1.5rem,5vw,6rem)] 2xl:px-32 overflow-visible group"
      onMouseMove={handleGlobalMouseMove}
    >
      {/* Edge Fade Gradients for Ultra-wide Support */}
      <div className="absolute inset-y-0 left-0 w-[5vw] bg-gradient-to-r from-[#0a0a0a] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[5vw] bg-gradient-to-l from-[#0a0a0a] to-transparent z-0 pointer-events-none" />

      {/* Layer 1: Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Layer 2: Particle Field */}
      <Particles />

      {/* --- LEFT COLUMN: CONTENT (55%) --- */}
      <motion.div 
        className="w-full lg:w-[55%] flex flex-col items-start gap-4 z-10 max-w-3xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 backdrop-blur-md text-sm md:text-base font-bold text-purple-300 tracking-[0.2em] uppercase mb-4 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:border-purple-400/60 transition-all duration-500 hover:scale-[1.03] cursor-default group overflow-hidden">
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-sweep pointer-events-none" />
          
          {/* Pulsing Dot */}
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></span>
          </span>
          <span className="relative z-10 font-black drop-shadow-[0_0_10px_rgba(216,180,254,0.8)]">Available for Opportunities</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-medium text-white/70 tracking-tight pl-1">
            Hello, I'm
          </h2>
          
          <TypewriterText />
        </div>


        <p className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mt-3 pl-1">
          I’m a Self-Driven Full Stack Developer focused on building scalable, high-performance applications and solving real-world problems through intelligent systems.
        </p>

        {/* Buttons tightened up */}
        <div className="flex flex-wrap items-center gap-4 pt-3 w-full pl-1">
          <MagneticWrapper strength={0.2}>
            <a href="#projects" className="group relative flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] z-10 overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.2}>
            <a href="#contact" className="relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-transparent text-white font-medium text-sm hover:scale-105 hover:bg-white/5 hover:border-white/40 shadow-none hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all overflow-hidden group">
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
        className="w-full lg:w-[45%] relative hidden lg:flex items-center justify-center lg:justify-end xl:translate-x-6 lg:scale-105 xl:scale-110 origin-right transition-transform duration-700 ease-out z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          {/* Core Profile Frame */}
          <div className="relative w-48 h-48 rounded-full border border-white/20 p-2 z-20 shadow-[0_0_50px_rgba(168,85,247,0.2)] bg-black/40 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 blur-xl" 
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Atharv&backgroundColor=transparent" 
              alt="Atharv Waykar"
              className="w-full h-full rounded-full object-cover border border-white/10 relative z-10"
            />
          </div>

          {/* Inner Orbit (React, Node, Next.js) */}
          <OrbitingCircles duration={30} delay={0} radius={140}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-black border border-white/20 rounded-xl hover:scale-125 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md transition-all cursor-pointer">
              <FaReact size={24} className="text-cyan-400" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">React</div>
            </div>
          </OrbitingCircles>
          
          <OrbitingCircles duration={30} delay={10} radius={140} path={false}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-black border border-white/20 rounded-xl hover:scale-125 hover:border-green-500/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] backdrop-blur-md transition-all cursor-pointer">
              <FaNodeJs size={24} className="text-green-500" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">Node.js</div>
            </div>
          </OrbitingCircles>

          <OrbitingCircles duration={30} delay={20} radius={140} path={false}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-black border border-white/20 rounded-xl hover:scale-125 hover:border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] backdrop-blur-md transition-all cursor-pointer">
              <SiNextdotjs size={24} className="text-white" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">Next.js</div>
            </div>
          </OrbitingCircles>

          {/* Outer Orbit (Python, AWS, Docker) */}
          <OrbitingCircles reverse duration={40} delay={0} radius={190}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-full hover:scale-125 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] backdrop-blur-sm transition-all cursor-pointer">
              <FaPython size={24} className="text-blue-400" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">Python</div>
            </div>
          </OrbitingCircles>

          <OrbitingCircles reverse duration={40} delay={13.33} radius={190} path={false}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-full hover:scale-125 hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] backdrop-blur-sm transition-all cursor-pointer">
              <FaAws size={24} className="text-orange-400" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">AWS</div>
            </div>
          </OrbitingCircles>

          <OrbitingCircles reverse duration={40} delay={26.66} radius={190} path={false}>
            <div className="relative group/icon flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-full hover:scale-125 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-sm transition-all cursor-pointer">
              <FaDocker size={24} className="text-blue-500" />
              <div className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md drop-shadow-xl font-medium tracking-wide pointer-events-none">Docker</div>
            </div>
          </OrbitingCircles>
        </div>
      </motion.div>
    </section>
  );
};

