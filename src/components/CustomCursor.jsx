import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the outer ring for that smooth lag
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateInputMode = () => setIsTouchDevice(media.matches);
    updateInputMode();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateInputMode);
      return () => media.removeEventListener('change', updateInputMode);
    }

    media.addListener(updateInputMode);
    return () => media.removeListener(updateInputMode);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      if (e.target.closest('a, button, input, textarea, select, [data-cursor="magnetic"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Center SVG Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
        >
          <path d="M0 0L16 6.5L9 9.5L6 16.5Z" fill="url(#cursor-gradient)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
          <defs>
            <linearGradient id="cursor-gradient" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Outer Ring / Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99] border-2 border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          backgroundColor: isHovering ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  );
};
