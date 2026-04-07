import { BGPattern } from "@/components/ui/bg-pattern";
import { Navbar } from "@/components/Navbar";
import { Hero, ScrollIndicator } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { CustomCursor } from "@/components/CustomCursor";

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-white/20 overflow-x-hidden">
      {/* Global Magnetic Custom Cursor */}
      <CustomCursor />
      
      {/* Global Scroll Indicator */}
      <ScrollIndicator />

      {/* 
        Full-page static ShapeGrid equivalent using BGPattern 
      */}
      <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
        <BGPattern 
          variant="grid" 
          size={30} 
          mask="fade-bottom" 
          fill="rgba(255,255,255,0.08)" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-16 w-full">
        <Hero />
      </main>

      {/* Marquee extends full width, so it lives outside the max-w-7xl container */}
      <Marquee />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* About section sits on top of the grid background */}
        <div className="pt-32 pb-4 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <About />
        </div>

        {/* Transition into dark background overlapping the About section & grid */}
        <div 
          className="w-full relative z-20"
          style={{ marginTop: "clamp(-250px, -20vw, -150px)" }}
        >
          {/* Smooth gradient overlap effect */}
          <div className="w-full h-32 sm:h-40 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] pointer-events-none" />
          
          {/* Solid section content */}
          <div className="w-full bg-[#020202] relative z-20" style={{ marginTop: "-1px" }}>
            <div className="pb-24 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto space-y-48">
              <Education />
              
              <Projects />
  
              <section id="contact" className="min-h-[50vh] py-20">
                <h2 className="text-3xl font-bold mb-10 text-center">Let's build something together.</h2>
                <div className="flex justify-center">
                  <button className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    Start a project
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
