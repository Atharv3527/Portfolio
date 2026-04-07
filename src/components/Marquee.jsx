import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView
} from 'framer-motion';

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxRow = ({ tags, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false
  });

  // Jiggle / Bounce effects based on scroll velocity
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);
  const bounceY = useTransform(smoothVelocity, [-1000, 1000], [-15, 15]); // Up on scroll up, down on scroll down

  const directionFactor = useRef(1);
  const containerRef = useRef(null);
  
  const isInView = useInView(containerRef, { margin: "0px", amount: 0.1 });
  
  useAnimationFrame((t, delta) => {
    const activeVelocity = isInView ? baseVelocity * 0.5 : baseVelocity;
    let moveBy = directionFactor.current * activeVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const TagList = () => (
    <>
      {tags.map((tag, idx) => (
        <span key={idx} className="flex items-center mr-6 md:mr-32">
          <span className="transition-colors duration-300 hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {tag}
          </span>
          <span className="text-yellow-400 mx-6 md:mx-20 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="#a39f44ff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap" aria-hidden="true">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div ref={containerRef} className="overflow-hidden m-0 w-full whitespace-nowrap flex flex-nowrap leading-[0.8] hover:-translate-y-1 transition-transform duration-500 ease-out">
      <motion.div 
        className="font-['Space_Grotesk'] font-bold uppercase text-5xl md:text-[10rem] flex whitespace-nowrap items-center flex-nowrap tracking-tighter text-gray-500 w-fit" 
        style={{ x, y: bounceY, skewX }}
      >
        <div className="flex items-center">
          <TagList />
          <TagList />
        </div>
        <div className="flex items-center">
          <TagList />
          <TagList />
        </div>
      </motion.div>
    </div>
  );
};

export const Marquee = () => {
  return (
    <section className="relative w-full py-6 md:py-10 mt-10 md:mt-20 bg-white/5 border-y border-white/10 text-gray-500 overflow-hidden backdrop-blur-sm select-none">
      {/* Blur overlays for premium depth effect matching the grey bg */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-40 bg-gradient-to-r from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-40 bg-gradient-to-l from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      
      <div className="relative mix-blend-overlay flex flex-col gap-4 md:gap-8">
        {/* Row 1: Moves Left */}
        <ParallaxRow 
          baseVelocity={-2} 
          tags={["FULL STACK DEV", "PROBLEM SOLVER", "INNOVATIVE CODER"]} 
        />
        {/* Row 2: Moves Right */}
        <ParallaxRow 
          baseVelocity={2} 
          tags={["DSA EXPERT", "TECH ENTHUSIAST", "BUILDING FUTURE"]} 
        />
      </div>
    </section>
  );
};
