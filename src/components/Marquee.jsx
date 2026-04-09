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
    damping: 80,
    stiffness: 300
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false
  });

  // Reduced scroll-responsive motion for smoother effect
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [0.5, -0.5]);
  const bounceY = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]);
  const scale = useTransform(smoothVelocity, [-1000, 0, 1000], [0.995, 1, 0.995]);

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
        <span key={idx} className="flex items-center mr-2 sm:mr-3 md:mr-8 lg:mr-12 xl:mr-16">
          <span className="transition-colors duration-300 hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {tag}
          </span>
          <span className="text-yellow-400 mx-2 sm:mx-3 md:mx-6 lg:mx-8 xl:mx-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="#a39f44ff" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap" aria-hidden="true">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div ref={containerRef} className="overflow-hidden m-0 w-full whitespace-nowrap flex flex-nowrap leading-[0.85]">
      <motion.div 
        className="font-['Space_Grotesk'] font-bold uppercase text-[1.8rem] sm:text-[2.4rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.85rem] flex whitespace-nowrap items-center flex-nowrap tracking-tight text-gray-500 w-fit" 
        style={{ x, y: bounceY, skewX, scale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
    <section className="relative w-full py-3 sm:py-4 md:py-5 mt-4 sm:mt-6 md:mt-8 lg:mt-10 bg-white/5 border-y border-white/10 text-gray-500 overflow-hidden backdrop-blur-sm select-none">
      <style>{`
        /* Responsive adjustments for Marquee */
        @media (max-width: 768px) {
          .font-\\[\\'Space_Grotesk\\'\\] {
            font-size: clamp(1.8rem, 6vw, 2.4rem) !important;
          }
        }
        
        @media (max-width: 480px) {
          .font-\\[\\'Space_Grotesk\\'\\] {
            font-size: clamp(1.4rem, 7vw, 1.8rem) !important;
          }
        }
      `}</style>
      
      {/* Blur overlays for premium depth effect matching the grey bg */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-28 md:w-32 lg:w-40 bg-gradient-to-r from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-28 md:w-32 lg:w-40 bg-gradient-to-l from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none" />
      
      <div className="relative mix-blend-overlay flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {/* Row 1: Moves Left */}
        <ParallaxRow 
          baseVelocity={-1.2} 
          tags={["FULL STACK DEV", "PROBLEM SOLVER", "INNOVATIVE CODER"]} 
        />
        {/* Row 2: Moves Right */}
        <ParallaxRow 
          baseVelocity={1.2} 
          tags={["FRONTEND DEV", "TECH ENTHUSIAST", "BUILDING FUTURE"]} 
        />
      </div>
    </section>
  );
};
