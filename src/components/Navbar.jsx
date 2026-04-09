import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

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
      rootMargin: '-20% 0px -60% 0px', // triggers when section is in the upper portion of viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    };

    const observerCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio and pick the most visible one
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveSection(mostVisible.target.id);
      }
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
      className="fixed top-2 sm:top-3 md:top-4 lg:top-5 xl:top-6 inset-x-0 z-50 flex justify-center px-2 sm:px-3 md:px-4 pointer-events-none"
    >
      {/* Actual Content Container - The Oval Pill */}
      <div 
        className={cn(
          "relative w-full max-w-3xl flex items-center px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-500 pointer-events-auto",
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
          className="flex items-center gap-2 group cursor-pointer relative z-10"
        >
          <span
            className="brand-gradient-animated text-base sm:text-lg font-extrabold tracking-wide select-none"
            style={{
              fontFamily: "'Oxanium', 'Space Grotesk', sans-serif",
            }}
          >
            Atharv.dev
          </span>
        </motion.a>

        {/* Center: Navigation Links Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 ml-auto relative z-10">
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
                className="relative group text-xs md:text-sm lg:text-sm font-semibold transition-colors px-2 md:px-3 py-2"
                style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                  {link.name}
                </span>
                
                {/* Premium Animated Active Indicator with LayoutId */}
                {isActive && (
                  <motion.span
                    layoutId="desktopNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-blue))',
                      boxShadow: '0 0 12px 2px color-mix(in srgb, var(--brand-cyan) 65%, transparent)'
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center relative z-10 ml-auto">
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
            className="absolute top-14 sm:top-16 md:top-18 lg:top-20 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 pointer-events-auto bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden md:hidden z-40"
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                        style={{
                          background: 'linear-gradient(180deg, var(--brand-cyan), var(--brand-blue))',
                          boxShadow: '0 0 10px color-mix(in srgb, var(--brand-cyan) 80%, transparent)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
