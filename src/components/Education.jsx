import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const Education = () => {
  const timelineData = [
    {
      title: "B.E in Computer Engineering",
      institution: "Dr D.Y Patil Institute of Technology, Pune",
      description: "Specializing in Full Stack Development, Data Structures, and System Architecture.",
      score: "CGPA: 9.71",
      badge: "CURRENT"
    },
    {
      title: "Higher Secondary (11th & 12th)",
      institution: "Deccan Maratha Junior College of Commerce and Science,Manchar",
      description: "Major in Physics, Chemistry, and Mathematics.",
      score: "81%",
      badge: "2023"
    },
    {
      title: "Secondary Education (10th)",
      institution: "New English Medium School,Ghodegaon",
      description: "Foundation in science and mathematics.",
      score: "93.60%",
      badge: "2021"
    }
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sidePanelRef = useRef(null);
  const desktopTimelineSpineRef = useRef(null);
  const mobileTimelineSpineRef = useRef(null);
  const cardsRef = useRef([]);
  // Re-initialize cards ref array
  cardsRef.current = [];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const dividerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create GSAP context for easy cleanup
    const ctx = gsap.context(() => {

      // 0. Section Divider Animation
      if (dividerRef.current) {
        const dividerLine = dividerRef.current.querySelector('.edu-divider-line');
        const dividerGlow = dividerRef.current.querySelector('.edu-divider-glow');
        const dividerDot1 = dividerRef.current.querySelector('.edu-divider-dot-left');
        const dividerDot2 = dividerRef.current.querySelector('.edu-divider-dot-right');

        const divTl = gsap.timeline({
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse"
          }
        });

        // Main line expands from center
        divTl.fromTo(dividerLine,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 2.4, ease: "power4.inOut" },
          0
        );

        // Glow pulses in
        divTl.fromTo(dividerGlow,
          { scaleX: 0, opacity: 0, transformOrigin: "center" },
          { scaleX: 1, opacity: 1, duration: 2.8, ease: "power3.out" },
          0.1
        );

        // Persistent pulse animation on glow
        gsap.to(dividerGlow, {
          opacity: 0.4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2
        });
      }

      // 1. Keep title static (no scroll-triggered motion)

      // 1.1 Left side content panel animation
      if (sidePanelRef.current) {
        gsap.fromTo(
          sidePanelRef.current,
          { opacity: 0, x: -40, y: 20, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sidePanelRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        gsap.to(sidePanelRef.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // 2. Timeline Spine
      [desktopTimelineSpineRef.current, mobileTimelineSpineRef.current].forEach((spineEl) => {
        if (!spineEl) return;
        gsap.fromTo(spineEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: ".edu-layout-container",
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        );
      });

      // 3. Cards Animation
      const setActiveTimelineDot = (activeDot) => {
        cardsRef.current.forEach((itemCard) => {
          const dot = itemCard?.querySelector('.edu-timeline-dot');
          if (dot) dot.classList.remove('edu-timeline-dot-active');
        });
        if (activeDot) activeDot.classList.add('edu-timeline-dot-active');
      };

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const scanLine = card.querySelector('.edu-scan-line');
        const cardBody = card.querySelector('.edu-card-body');
        const instText = card.querySelector('.edu-inst-text');
        const yearText = card.querySelector('.edu-year-text');
        const degreeText = card.querySelector('.edu-degree-text');
        const descText = card.querySelector('.edu-desc-text');
        const timelineDot = card.querySelector('.edu-timeline-dot');
        const sepLine = card.querySelector('.edu-sep-line');
        const internalGlow = card.querySelector('.edu-card-glow');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActiveTimelineDot(timelineDot),
          onEnterBack: () => setActiveTimelineDot(timelineDot),
        });

        // Separator Line
        if (sepLine) {
          tl.fromTo(sepLine,
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 1.6, ease: "power3.out" },
            0
          );
        }

        // Timeline Dot Animation
        tl.fromTo(timelineDot,
           { scale: 0, opacity: 0 },
           { 
             scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)", 
             onComplete: () => {
                 gsap.to(timelineDot, {
                    boxShadow: "0 0 16px var(--brand-cyan), 0 0 24px color-mix(in srgb, var(--brand-blue) 35%, transparent)",
                    duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
                 })
             }
           },
           0
        );

        // Scan Line Sweep
        tl.fromTo(scanLine, 
          { top: "0%" }, 
          { top: "102%", duration: 1.1, ease: "power2.inOut" },
          0
        );

        // Card Body Reveal
        tl.fromTo(cardBody,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power4.inOut" },
          0.1
        );

        // Left Border animated glow on entry
        const scoreColors = [
          "color-mix(in srgb, var(--brand-cyan) 50%, transparent)",
          "color-mix(in srgb, var(--brand-blue) 45%, transparent)",
          "color-mix(in srgb, var(--brand-cyan) 52%, transparent)"
        ];
        const borderColor = scoreColors[index % scoreColors.length];
        tl.fromTo(card.querySelector('.edu-card'), {
            boxShadow: `inset 3px 0 0px transparent`
          }, {
            boxShadow: `inset 3px 0 28px ${borderColor}, 0 0 30px ${borderColor.replace('0.5','0.08')}`,
            duration: 1.2, ease: "power2.out"
        }, 0.6);

        // Continuous border pulse after entry
        gsap.to(card.querySelector('.edu-card'), {
          boxShadow: `inset 3px 0 8px ${borderColor.replace('0.5','0.15')}, 0 0 10px ${borderColor.replace('0.5','0.04')}`,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5
        });

        // Institution text reveals normally without specialized character animations

        // Year counter animation
        const yearAttr = yearText?.getAttribute('data-year');
        const yearVal = parseInt(yearAttr);
        if (!isNaN(yearVal) && yearVal > 0) {
            const counter = { val: 2000 };
            tl.to(counter, {
                val: yearVal,
                duration: 2.4,
                ease: "power2.out",
                onUpdate: () => { 
                  if(yearText) yearText.innerText = Math.round(counter.val) 
                }
            }, 0.5);
        }

        // Degree and Description Reveal
        tl.fromTo(degreeText,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
          0.55
        );

        tl.fromTo(descText,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
          0.7
        );

        // Hover 3D Tilt interaction
        const innerCard = card.querySelector('.edu-card');
        const onMouseMove = (e) => {
           const rect = innerCard.getBoundingClientRect();
           const centerX = rect.left + rect.width / 2;
           const centerY = rect.top + rect.height / 2;
           const offsetX = (e.clientX - centerX) / (rect.width / 2);
           const offsetY = (e.clientY - centerY) / (rect.height / 2);

           gsap.quickTo(innerCard, "rotateX", {duration: 0.4, ease: "power2.out"})(offsetY * -6);
           gsap.quickTo(innerCard, "rotateY", {duration: 0.4, ease: "power2.out"})(offsetX * 6);

           gsap.to(internalGlow, {
               background: `radial-gradient(220px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, color-mix(in srgb, var(--brand-cyan) 11%, transparent), transparent)`,
               duration: 0
           });
        };
        const onMouseLeave = () => {
           gsap.to(innerCard, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
           gsap.to(internalGlow, { background: 'transparent', duration: 0.4 });
        }

        innerCard.addEventListener('mousemove', onMouseMove);
        innerCard.addEventListener('mouseleave', onMouseLeave);
      });

      // Ensure first item is highlighted before any scroll interaction.
      const firstDot = cardsRef.current[0]?.querySelector('.edu-timeline-dot');
      setActiveTimelineDot(firstDot);

    }, sectionRef);

    return () => ctx.revert();
  }, [timelineData]);

  return (
    <section id="education" className="w-full mx-auto bg-[#000000] py-14 sm:py-20 lg:py-24 relative overflow-hidden" ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600&family=DM+Mono&family=Orbitron:wght@500&display=swap');

        .edu-mask { overflow: hidden; display: inline-block; vertical-align: top; }
        
        .edu-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.9rem, 4.5vw, 2.25rem); font-weight: 500; letter-spacing: 0.1em; color: rgba(255,255,255,0.82); line-height: 1; text-shadow: 0 0 14px color-mix(in srgb, var(--brand-cyan) 26%, transparent); }
        .edu-institution { font-family: 'Bebas Neue', cursive; font-size: clamp(1.25rem, 3.2vw, 1.5rem); font-weight: 600; color: rgba(255,255,255,0.9); line-height: 1.1; margin-bottom: 8px; letter-spacing: 0.02em; }
        .edu-degree { font-family: 'Space Grotesk', sans-serif; font-size: clamp(0.98rem, 2.8vw, 1.2rem); font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1.35; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
        
        .edu-year-group { font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 600; color: var(--brand-cyan); letter-spacing: 0.16em; display: flex; align-items: center; gap: 8px; margin-bottom: 1.15rem; text-shadow: 0 0 10px color-mix(in srgb, var(--brand-cyan) 40%, transparent); }
        .edu-ghost-prefix { color: rgba(255,255,255,0.5); font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 600; }
        
        .edu-desc { font-family: 'DM Mono', monospace; font-size: clamp(0.8rem, 2.4vw, 0.9rem); font-weight: 500; color: rgba(255,255,255,0.55); line-height: 1.8; margin-top: 1.1rem; }

        .edu-side-panel {
          position: sticky;
          top: 138px;
          border: 1px solid color-mix(in srgb, var(--brand-cyan) 24%, rgba(255,255,255,0.08));
          background: linear-gradient(160deg, color-mix(in srgb, var(--brand-cyan) 8%, transparent), color-mix(in srgb, var(--brand-blue) 9%, transparent) 45%, rgba(0,0,0,0.34));
          backdrop-filter: blur(14px);
          border-radius: 14px;
          padding: 1.7rem 1.45rem;
          min-height: 350px;
          margin-top: 14px;
          box-shadow: 0 16px 50px color-mix(in srgb, var(--brand-cyan) 13%, transparent), inset 0 0 25px color-mix(in srgb, var(--brand-blue) 8%, transparent);
          overflow: hidden;
        }

        .edu-side-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--brand-cyan) 20%, transparent), transparent 45%);
        }

        .edu-side-tag {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: color-mix(in srgb, var(--brand-cyan) 90%, #ffffff 10%);
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .edu-side-tag::before {
          content: "";
          width: 20px;
          height: 1px;
          background: var(--brand-cyan);
        }

        .edu-side-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
          color: rgba(255,255,255,0.95);
          margin-bottom: 1rem;
        }

        .edu-side-copy {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
        }

        /* ── Divider Styles ── */
        .edu-section-divider {
          position: relative;
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
        }

        .edu-divider-line {
          position: absolute;
          left: 0; right: 0;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            color-mix(in srgb, var(--brand-cyan) 55%, transparent) 10%,
            var(--brand-cyan) 30%,
            var(--brand-blue) 50%,
            var(--brand-cyan) 70%,
            color-mix(in srgb, var(--brand-cyan) 55%, transparent) 90%,
            transparent 100%
          );
          transform-origin: center;
        }

        .edu-divider-glow {
          position: absolute;
          left: 0; right: 0;
          height: 12px;
          border-radius: 8px;
          filter: blur(6px);
          background: linear-gradient(90deg,
            transparent 0%,
            color-mix(in srgb, var(--brand-cyan) 46%, transparent) 20%,
            color-mix(in srgb, var(--brand-blue) 62%, transparent) 50%,
            color-mix(in srgb, var(--brand-cyan) 46%, transparent) 80%,
            transparent 100%
          );
          transform-origin: center;
        }

        .edu-divider-dot-left,
        .edu-divider-dot-right {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00FFD1;
          box-shadow: 0 0 10px #00FFD1, 0 0 20px rgba(0,255,209,0.6);
          z-index: 10;
        }

        .edu-divider-dot-left  { left: 0; }
        .edu-divider-dot-right { right: 0; }
        
        .edu-card-wrapper {
           perspective: 1000px;
        }

        .edu-card {
           background: linear-gradient(145deg, color-mix(in srgb, var(--brand-cyan) 6%, transparent), color-mix(in srgb, var(--brand-blue) 5%, transparent) 60%, rgba(3,8,16,0.7));
           border: 0.5px solid color-mix(in srgb, var(--brand-cyan) 24%, transparent);
           border-left: 2px solid var(--brand-cyan);
           border-radius: 8px;
           padding: 2rem 2.5rem;
           position: relative;
           overflow: hidden;
           transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
           transform-style: preserve-3d;
           will-change: transform;
        }

        .edu-card:hover {
           border-color: color-mix(in srgb, var(--brand-cyan) 62%, transparent);
           box-shadow: 0 0 55px color-mix(in srgb, var(--brand-cyan) 16%, transparent), 0 0 30px color-mix(in srgb, var(--brand-blue) 14%, transparent), inset 3px 0 22px color-mix(in srgb, var(--brand-cyan) 16%, transparent);
        }
        
        /* Specific hover inner gradient */
        .edu-card:hover .edu-violet-gradient {
           opacity: 1;
        }

        .edu-violet-gradient {
           position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s ease;
           background: linear-gradient(135deg, color-mix(in srgb, var(--brand-blue) 16%, transparent) 0%, transparent 60%);
        }
        
        .edu-card-glow {
           position: absolute; inset: 0; pointer-events: none; z-index: 10;
        }

        .edu-timeline-dot {
          border: 1px solid var(--brand-cyan);
          background: rgba(2, 6, 12, 0.95);
          box-shadow: 0 0 8px color-mix(in srgb, var(--brand-cyan) 45%, transparent);
          transition: all 0.3s ease;
        }

        .edu-timeline-dot::after {
          content: "";
          position: absolute;
          inset: -7px;
          border-radius: 9999px;
          border: 1px solid color-mix(in srgb, var(--brand-cyan) 70%, var(--brand-blue) 30%);
          opacity: 0;
          transform: scale(0.72);
          transition: all 0.3s ease;
        }

        .edu-timeline-dot-active {
          background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
          box-shadow:
            0 0 10px color-mix(in srgb, var(--brand-cyan) 85%, transparent),
            0 0 24px color-mix(in srgb, var(--brand-blue) 50%, transparent);
          transform: scale(1.15);
        }

        .edu-timeline-dot-active::after {
          opacity: 1;
          transform: scale(1);
        }

        .edu-scan-line {
           position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--brand-cyan), var(--brand-blue)); z-index: 20;
        }
        
        .edu-card-body {
           /* clip-path prevents flicker before GSAP initializes */
           clip-path: inset(0 100% 0 0);
        }

        @media screen and (max-width: 768px) {
           .edu-card { padding: 1.2rem; }
           .edu-side-panel { position: relative; top: 0; margin-bottom: 1.5rem; }
        }
      `}</style>
      
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Bold Animated Section Divider (no end dots) ── */}
        <div className="edu-section-divider" ref={dividerRef}>
          <div className="edu-divider-line"></div>
          <div className="edu-divider-glow"></div>
        </div>

        {/* Title Block */}
        <div className="relative mb-10 sm:mb-14 lg:mb-20 inline-block">
           <h2 className="edu-title m-0 tracking-widest" ref={titleRef}>EDUCATION</h2>
           <div
             className="edu-title-underline h-[1px] w-full mt-2 origin-left absolute left-0"
             style={{ background: "linear-gradient(90deg, var(--brand-cyan), var(--brand-blue))" }}
           ></div>
        </div>

        {/* 2-Column Layout */}
        <div className="edu-layout-container w-full relative flex flex-col md:flex-row pb-8 sm:pb-12">
           
           {/* Left Column (28%) - Timeline Spine Desktop */}
           <div className="hidden md:block absolute left-[8%] md:left-[28%] top-0 bottom-0 w-[1px] bg-transparent z-0">
              <div className="w-[1px] h-full origin-top opacity-80" style={{ background: "linear-gradient(180deg, var(--brand-cyan), var(--brand-blue))" }} ref={desktopTimelineSpineRef}></div>
           </div>

           {/* Mobile Timeline Spine */}
           <div className="md:hidden absolute left-0 top-4 bottom-0 w-[1px] origin-top opacity-50" style={{ background: "linear-gradient(180deg, var(--brand-cyan), var(--brand-blue))" }} ref={mobileTimelineSpineRef}></div>
           
           {/* Left Column (28%) - Professional content block */}
           <div className="hidden md:block md:w-[28%] flex-shrink-0 pr-6">
             <div className="edu-side-panel relative" ref={sidePanelRef}>
               <div className="edu-side-tag">Focused Growth</div>
               <h3 className="edu-side-title">Building Strong Foundations</h3>
               <p className="edu-side-copy">
                 My academic journey reflects disciplined learning in engineering fundamentals, problem-solving,
                 and practical software development. Each milestone strengthens my ability to deliver reliable,
                 scalable, and production-ready digital solutions.
               </p>
             </div>
           </div>

           {/* Right Column (72%) - Stacked Cards */}
           <div className="w-full md:w-[72%] flex flex-col gap-6 sm:gap-10 pl-6 sm:pl-8 md:pl-12 relative z-10">
              {timelineData.map((item, index) => (
                  <div key={index} className="edu-card-wrapper relative" ref={addToCardsRef}>
                     
                     {/* Timeline Dot located directly over the 1px spine */}
                     <div className="edu-timeline-dot absolute w-2 h-2 bg-black rounded-full top-[2.5rem] -left-[24px] md:-left-[48px] xl:-left-[48px] -translate-x-[50%] z-20" style={{ borderColor: "var(--brand-cyan)" }}></div>

                     {/* Inter-card Sep Line */}
                     {index > 0 && (
                        <div className="edu-sep-line absolute -top-[1.25rem] left-0 md:-left-[1.5rem] w-[80%] max-w-[200px] h-[1px]" style={{ background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-blue), transparent)' }}></div>
                     )}

                     {/* The Card */}
                     <div className="edu-card w-full">
                        <div className="edu-scan-line"></div>
                        <div className="edu-violet-gradient"></div>
                        <div className="edu-card-glow"></div>
                        
                        <div className="edu-card-body w-full relative z-20">
                           {/* Year / Date */}
                           <div className="edu-year-group">
                               <span className="edu-ghost-prefix">›</span>
                               <span className="edu-year-text" data-year={item.badge}>{item.badge}</span>
                           </div>
                           
                           {/* Institution Name */}
                           <h3 className="edu-institution edu-inst-text">{item.institution}</h3>
                           
                           {/* Degree & Score */}
                           <div className="edu-degree edu-degree-text mt-4">
                             <span>{item.title}</span>
                             <span className="text-[15px] sm:text-[17px] font-bold tracking-wider sm:ml-4 whitespace-nowrap" style={{ color: "var(--brand-cyan)", textShadow: "0 0 10px color-mix(in srgb, var(--brand-cyan) 38%, transparent)" }}>{item.score}</span>
                           </div>
                           
                           {/* Description */}
                           <p className="edu-desc edu-desc-text max-w-2xl">{item.description}</p>
                        </div>
                     </div>
                  </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};


