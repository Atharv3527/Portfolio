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
        <React.Fragment key={idx}>
          <span className="text-[#8e8e99] transition-colors duration-300 hover:text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {tag}
          </span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-16 md:h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div ref={containerRef} className="overflow-hidden flex whitespace-nowrap m-0 w-full hover:-translate-y-1 transition-transform duration-500 ease-out">
      <motion.div 
        className="flex whitespace-nowrap gap-12 text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter w-fit leading-none" 
        style={{ x, y: bounceY, skewX }}
      >
        <div className="flex gap-12 items-center pr-12">
          <TagList />
          <TagList />
        </div>
        <div className="flex gap-12 items-center pr-12">
          <TagList />
          <TagList />
        </div>
      </motion.div>
    </div>
  );
};

export const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-4 py-8 mt-4 md:mt-8 mb-10 bg-[#0e0e11] border-y border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] select-none">
      {/* Blur overlays for premium depth effect matching the grey bg */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-40 bg-gradient-to-r from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-40 bg-gradient-to-l from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      
      {/* Row 1: Moves Left */}
      <ParallaxRow 
        baseVelocity={-2} 
        tags={["MERN Stack", "Scalable Apps", "Innovative Coder"]} 
      />
      {/* Row 2: Moves Right */}
      <ParallaxRow 
        baseVelocity={2} 
        tags={["Tech Enthusiast", "Fullstack Dev", "Problem Solver"]} 
      />
    </div>
  );
};
