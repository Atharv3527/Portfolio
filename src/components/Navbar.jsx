import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Hexagon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

/** 
 * Optional: Re-use Magnetic Wrapper for the CTA button to add that premium feel.
 * Only triggers if the user hovers exact bounds.
 */
const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:flex flex-col relative overflow-hidden group bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-shadow duration-300 z-10"
    >
      <span className="relative z-10">Let's Talk</span>
      {/* Light sweep effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
    </motion.button>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Navbar visual scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Intersection Observer for precise Scroll Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', // triggers when section crosses upper-middle threshold
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      {/* Actual Content Container - The Oval Pill */}
      <div 
        className={cn(
          "relative w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 pointer-events-auto",
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]" 
            : "bg-transparent border border-transparent backdrop-blur-none"
        )}
      >
        {/* Subtle Oval Glow on Scroll */}
        <div
          className={cn(
            "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
          style={{
            boxShadow: "inset 0px 0px 20px 0px rgba(168,85,247,0.15), 0px 0px 20px 0px rgba(34,211,238,0.1)"
          }}
        />

        {/* Left: Logo/Profile */}
        <motion.a
          onClick={(e) => scrollToSection(e, 'home')}
          href="#home"
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 group cursor-pointer relative z-10"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border border-white/10 group-hover:border-white/30 transition-colors shadow-inner">
            <Hexagon className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-500" />
            <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-xl tracking-tight shadow-white/10 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-colors group-hover:text-white">
            Atharv
          </span>
        </motion.a>

        {/* Center: Navigation Links Desktop */}
        <div className="hidden md:flex items-center gap-6 relative z-10">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a
                key={link.id}
                onClick={(e) => scrollToSection(e, link.id)}
                href={`#${link.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                className="relative group text-sm font-semibold transition-colors px-3 py-2"
                style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                  {link.name}
                </span>
                
                {/* Premium Animated Active Indicator with LayoutId */}
                {isActive && (
                  <motion.span
                    layoutId="desktopNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{
                      boxShadow: '0 0 12px 2px rgba(34,211,238,0.6)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Subtle Hover Underline (only invisible if not active) */}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 rounded-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Right: CTA Button */}
        <MagneticButton onClick={(e) => scrollToSection(e, 'contact')} />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center relative z-10">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white p-2 focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-4 right-4 pointer-events-auto bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden md:hidden z-40"
          >
            <div className="flex flex-col py-4 px-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => scrollToSection(e, link.id)}
                    href={`#${link.id}`}
                    className={cn(
                      "relative px-6 py-4 text-base font-medium transition-colors border-b border-white/[0.05] last:border-b-0",
                      isActive ? "text-cyan-400 bg-white/[0.03]" : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="mobileNavIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <div className="px-4 pt-4 mt-2 border-t border-white/[0.05]">
                <button 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
