import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { FileText, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
} from "react-icons/fa";
import {
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiSupabase,
} from "react-icons/si";
import { OrbitingCircles } from "./ui/orbiting-circles";

// Social Icons SVGs - Designed accurately
const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
  const [phase, setPhase] = useState("TYPING"); // TYPING, SHIMMER, ERASING

  const textStr = "<Atharv Waykar />";
  const totalLength = textStr.length;

  useEffect(() => {
    let timeout;
    let isMounted = true;

    const runLoop = () => {
      if (!isMounted) return;

      if (phase === "TYPING") {
        if (displayedCount < totalLength) {
          const char = textStr[displayedCount];
          let delay = Math.random() * 40 + 60; // 60-100ms
          if (char === " ") delay += 80;
          if (["<", ">", "/"].includes(char)) delay += 120;

          timeout = setTimeout(() => setDisplayedCount((c) => c + 1), delay);
        } else {
          timeout = setTimeout(() => setPhase("SHIMMER"), 500); // Small pause before shimmer
        }
      } else if (phase === "SHIMMER") {
        timeout = setTimeout(() => setPhase("ERASING"), 1800); // Wait for shimmer + pause
      } else if (phase === "ERASING") {
        if (displayedCount > 0) {
          timeout = setTimeout(() => setDisplayedCount((c) => c - 1), 30); // Fast erase
        } else {
          timeout = setTimeout(() => setPhase("TYPING"), 500); // Pause before retype
        }
      }
    };

    runLoop();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [displayedCount, phase, totalLength]);

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
        <h1
          className="relative inline-flex w-fit items-center overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{
            fontFamily: "'Oxanium', monospace",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 52px)",
            color: "#ffffff",
            WebkitTextFillColor: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          {textStr
            .split("")
            .slice(0, displayedCount)
            .map((char, i) => (
              <span
                key={i}
                className="inline-block transform-origin-bottom transition-all duration-100"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          {/* Shimmer Overlay (only active during SHIMMER phase) */}
          {phase === "SHIMMER" && (
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
    <div
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 flex items-center justify-center cursor-pointer group"
      onClick={() =>
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <div className="relative w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] md:w-[86px] md:h-[86px] lg:w-[96px] lg:h-[96px] flex items-center justify-center hover:scale-105 transition-transform duration-300">
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
            <text
              className="text-[7px] font-black uppercase fill-white stroke-white stroke-[0.3px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <textPath
                href="#scrollTextPath"
                startOffset="0"
                textLength="220"
                lengthAdjust="spacing"
              >
                SCROLL TO EXPLORE • SCROLL TO EXPLORE •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center filled circle and arrow */}
        <div className="absolute w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] rounded-full border border-white/30 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:border-white/50 backdrop-blur-md bg-black/40 z-10">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-5 sm:h-5 relative z-20 -mt-1.5 sm:-mt-2 drop-shadow-md mix-blend-difference"
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
      className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between w-full min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] xl:min-h-[75vh] pt-2 sm:pt-4 md:pt-6 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-32 overflow-visible group"
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
        className="w-full lg:w-[55%] xl:w-[52%] flex flex-col items-start gap-3 sm:gap-4 md:gap-5 z-10 max-w-3xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border backdrop-blur-md text-xs sm:text-sm md:text-base font-bold tracking-[0.14em] sm:tracking-[0.2em] uppercase mb-4 transition-all duration-500 hover:scale-[1.03] cursor-default group overflow-hidden"
          style={{
            borderColor:
              "color-mix(in srgb, var(--brand-cyan) 45%, transparent)",
            background:
              "color-mix(in srgb, var(--brand-cyan) 10%, transparent)",
            boxShadow:
              "0 0 24px color-mix(in srgb, var(--brand-cyan) 35%, transparent)",
          }}
        >
          {/* Shimmer sweep effect */}
          <div
            className="absolute inset-0 animate-sweep pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--brand-cyan) 20%, transparent), transparent)",
            }}
          />

          {/* Pulsing Dot */}
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></span>
          </span>
          <span
            className="relative z-10 text-[11px] md:text-xs font-medium tracking-[0.16em] drop-shadow-[0_0_10px_rgba(216,180,254,0.8)]"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <span style={{ color: "var(--brand-cyan)" }}>AVAILABLE</span>
            <span className="text-[#94a3b8]"> FOR </span>
            <span style={{ color: "var(--brand-blue)" }}>HIRE</span>
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-medium text-white/70 tracking-tight pl-1">
            Hello, I'm
          </h2>

          <TypewriterText />
        </div>

        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl leading-relaxed mt-3 pl-1">
          I’m a Self-Driven Full Stack Developer focused on building scalable,
          high-performance applications and solving real-world problems through
          intelligent systems.
        </p>

        {/* Buttons tightened up */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 w-full pl-1">
          <MagneticWrapper strength={0.2}>
            <a
              href="#projects"
              className="group relative flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_28px_rgba(0,245,212,0.5)] transition-all duration-300 z-10 overflow-hidden"
              style={{
                color: "#03131a",
                background:
                  "linear-gradient(135deg, var(--brand-cyan), var(--brand-blue))",
                boxShadow:
                  "0 0 15px color-mix(in srgb, var(--brand-cyan) 45%, transparent)",
              }}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.2}>
            <a
              href="#contact"
              className="relative flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border bg-transparent text-white font-medium text-sm hover:scale-105 hover:bg-cyan-400/10 hover:border-cyan-300/60 hover:shadow-[0_0_18px_rgba(0,245,212,0.25)] transition-all overflow-hidden group"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--brand-cyan) 30%, transparent)",
              }}
            >
              Contact Me
            </a>
          </MagneticWrapper>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3 sm:gap-5 pt-3 pl-1 flex-wrap">
          {[
            {
              id: "github",
              icon: GithubIcon,
              href: "https://github.com/Atharv3527",
              label: "🚀 GitHub",
              glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
              bg: "bg-[#1e2330] hover:bg-[#252b3b]",
              borderGlow: "border-white/10 hover:border-white/50",
              color: "text-white",
            },
            {
              id: "linkedin",
              icon: LinkedinIcon,
              href: "https://www.linkedin.com/in/atharv-waykar/",
              label: "👋 Let's Connect",
              glow: "hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]",
              bg: "bg-[#2563eb] hover:bg-[#1d4ed8]",
              borderGlow: "border-blue-400/20 hover:border-blue-400",
              color: "text-white",
            },
            {
              id: "gmail",
              icon: MailIcon,
              href: "mailto:atharvwaykar3@gmail.com",
              label: "📧 Send me an email",
              glow: "hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]",
              bg: "bg-[#dc2626] hover:bg-[#b91c1c]",
              borderGlow: "border-red-400/20 hover:border-red-400",
              color: "text-white",
            },
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
                    "relative w-12 h-12 sm:w-[3.25rem] sm:h-[3.25rem] flex items-center justify-center rounded-[1rem] border transition-all duration-300 group z-10",
                    "hover:scale-110",
                    social.bg,
                    social.borderGlow,
                    social.glow,
                    social.color,
                  )}
                >
                  <social.icon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md transition-transform" />

                  {/* Inner Ripple on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                </a>
              </MagneticWrapper>

              <AnimatePresence>
                {hoveredSocial === social.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: -0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
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
        className="w-full lg:w-[45%] xl:w-[48%] relative flex items-center justify-center lg:justify-end mt-10 md:mt-12 lg:mt-0 xl:translate-x-12 2xl:translate-x-16 origin-right z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[600px] xl:h-[600px] flex items-center justify-center">
          {/* Ambient Glow Background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/12 via-teal-400/6 to-transparent blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Profile Image Container - LARGER */}
          <motion.div className="relative z-20">
            {/* Outer Glow Ring */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f0ff] via-[#00ffa3] to-[#00f0ff] blur-lg opacity-25"
              style={{ padding: "1px" }}
            />

            {/* Profile Image - INCREASED SIZE */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem] rounded-full p-px bg-gradient-to-tr from-[#00f0ff] via-[#00ffa3] to-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] p-px">
                <img
                  src="/atharv-profile.png"
                  alt="Atharv Waykar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Inner Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/15 to-teal-400/15 blur-xl"
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.18, 0.28, 0.18],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Single Orbiting Ring - All Tech Icons - Rounded Square Style */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ "--orbit-radius": "clamp(182px, 39vw, 226px)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[
              {
                Icon: SiExpress,
                color: "text-slate-200",
                name: "Express",
                glow: "rgba(226,232,240,0.45)",
              },
              {
                Icon: SiMysql,
                color: "text-sky-500",
                name: "MySQL",
                glow: "rgba(14,165,233,0.5)",
              },
              {
                Icon: SiMongodb,
                color: "text-emerald-400",
                name: "MongoDB",
                glow: "rgba(52,211,153,0.5)",
              },
              {
                Icon: SiGit,
                color: "text-red-500",
                name: "Git",
                glow: "rgba(239,68,68,0.5)",
              },
              {
                Icon: SiGithub,
                color: "text-white",
                name: "GitHub",
                glow: "rgba(255,255,255,0.5)",
              },
              {
                Icon: SiPostman,
                color: "text-orange-500",
                name: "Postman",
                glow: "rgba(249,115,22,0.5)",
              },
              {
                Icon: SiC,
                color: "text-slate-300",
                name: "C",
                glow: "rgba(203,213,225,0.5)",
              },
              {
                Icon: SiCplusplus,
                color: "text-blue-500",
                name: "C++",
                glow: "rgba(59,130,246,0.5)",
              },
              {
                Icon: FaPython,
                color: "text-green-400",
                name: "Python",
                glow: "rgba(74,222,128,0.5)",
              },
              {
                Icon: SiJavascript,
                color: "text-yellow-300",
                name: "JavaScript",
                glow: "rgba(253,224,71,0.5)",
              },
              {
                Icon: SiTypescript,
                color: "text-blue-400",
                name: "TypeScript",
                glow: "rgba(96,165,250,0.5)",
              },
              {
                Icon: FaHtml5,
                color: "text-orange-500",
                name: "HTML5",
                glow: "rgba(249,115,22,0.5)",
              },
              {
                Icon: FaCss3Alt,
                color: "text-blue-500",
                name: "CSS3",
                glow: "rgba(59,130,246,0.5)",
              },
              {
                Icon: FaReact,
                color: "text-cyan-400",
                name: "React",
                glow: "rgba(34,211,238,0.5)",
              },
              {
                Icon: SiTailwindcss,
                color: "text-cyan-400",
                name: "Tailwind",
                glow: "rgba(34,211,238,0.5)",
              },
              {
                Icon: FaBootstrap,
                color: "text-purple-400",
                name: "Bootstrap",
                glow: "rgba(192,132,252,0.5)",
              },
              {
                Icon: SiRedux,
                color: "text-violet-400",
                name: "Redux",
                glow: "rgba(167,139,250,0.5)",
              },
              {
                Icon: FaNodeJs,
                color: "text-green-500",
                name: "Node.js",
                glow: "rgba(34,197,94,0.5)",
              },
              {
                Icon: SiSupabase,
                color: "text-emerald-400",
                name: "Supabase",
                glow: "rgba(52,211,153,0.5)",
              },
            ].map(({ Icon, color, name, glow }, i, arr) => {
              const angle = (360 / arr.length) * i;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(-${angle}deg)`,
                  }}
                >
                  <motion.div
                    className="relative group/icon flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#060b16]/85 border border-cyan-400/35 rounded-xl lg:rounded-2xl backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.25)]"
                    whileHover={{
                      scale: 1.08,
                      boxShadow: `0 0 25px ${glow}`,
                      borderColor: glow,
                    }}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${color}`}
                    />
                    <div className="absolute -bottom-10 opacity-0 group-hover/icon:opacity-100 transition-opacity bg-black/95 border border-white/20 text-white text-[11px] px-3 py-1.5 rounded-lg whitespace-nowrap backdrop-blur-md shadow-xl font-semibold tracking-wide pointer-events-none z-50">
                      {name}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
