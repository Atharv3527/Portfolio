import { BGPattern } from "@/components/ui/bg-pattern";
import { Navbar } from "@/components/Navbar";
import { Hero, ScrollIndicator } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { CustomCursor } from "@/components/CustomCursor";
import { Skills } from "@/components/Skills";
import { ParticleDivider } from "@/components/ParticleDivider";
import { Contact } from "@/components/Contact";

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

      <main className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 w-full">
        <Hero />
      </main>

      {/* Marquee extends full width, so it lives outside the max-w-7xl container */}
      <Marquee />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* About section sits on top of the grid background */}
        <div className="pt-20 sm:pt-24 lg:pt-32 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <About />
        </div>

        {/* Transition into dark background overlapping the About section & grid */}
        <div className="w-full relative z-20 mt-[-72px] sm:mt-[-110px] lg:mt-[-145px] xl:mt-[clamp(-240px,-19vw,-145px)]">
          {/* Smooth gradient overlap effect */}
          <div className="w-full h-20 sm:h-28 lg:h-40 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] pointer-events-none" />
          
          {/* Solid section content */}
          <div className="w-full bg-[#020202] relative z-20" style={{ marginTop: "-1px" }}>
            <div className="pb-0 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-[1400px] mx-auto">
              <Education />
            </div>

            {/* Particle Divider between Education and Skills */}
            <ParticleDivider />

            {/* Skills - Full width, edge to edge */}
            <Skills />

            <div className="pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-[1400px] mx-auto">
              <Projects />
            </div>

            {/* Contact Section - Full width */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
